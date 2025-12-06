import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe/client';
import { db } from '@/lib/db';
import { subscriptions, products, prices, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'product.created':
      case 'product.updated':
        await handleProductUpsert(event.data.object as Stripe.Product);
        break;

      case 'price.created':
      case 'price.updated':
        await handlePriceUpsert(event.data.object as Stripe.Price);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleProductUpsert(product: Stripe.Product) {
  await db
    .insert(products)
    .values({
      id: product.id,
      name: product.name,
      description: product.description,
      active: product.active,
      metadata: product.metadata,
    })
    .onConflictDoUpdate({
      target: products.id,
      set: {
        name: product.name,
        description: product.description,
        active: product.active,
        metadata: product.metadata,
        updatedAt: new Date(),
      },
    });
}

async function handlePriceUpsert(price: Stripe.Price) {
  await db
    .insert(prices)
    .values({
      id: price.id,
      productId: typeof price.product === 'string' ? price.product : price.product.id,
      active: price.active,
      currency: price.currency,
      unitAmount: price.unit_amount,
      interval: price.recurring?.interval as 'month' | 'year' | null,
      intervalCount: price.recurring?.interval_count,
      trialPeriodDays: price.recurring?.trial_period_days,
      type: price.type,
      metadata: price.metadata,
    })
    .onConflictDoUpdate({
      target: prices.id,
      set: {
        active: price.active,
        currency: price.currency,
        unitAmount: price.unit_amount,
        interval: price.recurring?.interval as 'month' | 'year' | null,
        intervalCount: price.recurring?.interval_count,
        type: price.type,
        metadata: price.metadata,
      },
    });
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  if (!userId) {
    console.error('No userId in subscription metadata');
    return;
  }

  await db
    .insert(subscriptions)
    .values({
      id: subscription.id,
      userId,
      status: subscription.status,
      priceId: subscription.items.data[0]?.price.id,
      quantity: subscription.items.data[0]?.quantity,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
      trialStart: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
      trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
    })
    .onConflictDoUpdate({
      target: subscriptions.id,
      set: {
        status: subscription.status,
        priceId: subscription.items.data[0]?.price.id,
        quantity: subscription.items.data[0]?.quantity,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
        updatedAt: new Date(),
      },
    });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await db
    .update(subscriptions)
    .set({
      status: 'canceled',
      canceledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.id, subscription.id));
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error('No userId in checkout session metadata');
    return;
  }

  // Update user with Stripe customer ID
  if (session.customer) {
    await db
      .update(users)
      .set({
        stripeCustomerId: typeof session.customer === 'string' ? session.customer : session.customer.id,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  }
}
