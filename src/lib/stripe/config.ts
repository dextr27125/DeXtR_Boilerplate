export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
  popular?: boolean;
}

// Configure your pricing plans here
// Update stripePriceId with your actual Stripe price IDs
export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      'Up to 100 AI requests/month',
      'Basic analytics',
      'Community support',
    ],
    stripePriceId: '', // No Stripe price for free tier
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious builders',
    price: 1900, // in cents
    currency: 'USD',
    interval: 'month',
    features: [
      'Unlimited AI requests',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    stripePriceId: process.env.STRIPE_PRICE_ID_PRO || 'price_xxx',
    popular: true,
  },
];

export function getPlanByPriceId(priceId: string): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.stripePriceId === priceId);
}

export function getFreePlan(): PricingPlan {
  return pricingPlans.find((plan) => plan.id === 'free')!;
}
