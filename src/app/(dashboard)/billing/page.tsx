'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { pricingPlans } from '@/lib/stripe/config';

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  async function handleSubscribe(priceId: string) {
    if (!priceId) {
      toast.info('This is the free tier - no payment needed!');
      return;
    }

    setIsLoading(priceId);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(null);
    }
  }

  async function handleManageSubscription() {
    setIsLoading('portal');

    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open billing portal');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(null);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Current Plan</h2>
            <p className="text-sm text-muted-foreground">
              Manage your subscription
            </p>
          </div>
          <button
            onClick={handleManageSubscription}
            disabled={isLoading === 'portal'}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
          >
            {isLoading === 'portal' ? 'Loading...' : 'Manage Subscription'}
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div>
        <h2 className="text-lg font-semibold">Available Plans</h2>
        <p className="text-sm text-muted-foreground">
          Choose the plan that works for you
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border p-6 ${
                plan.popular ? 'border-primary ring-1 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${(plan.price / 100).toFixed(0)}
                </span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.stripePriceId)}
                disabled={isLoading !== null}
                className={`mt-6 w-full rounded-md py-2 text-sm font-medium ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border hover:bg-accent'
                } disabled:opacity-50`}
              >
                {isLoading === plan.stripePriceId
                  ? 'Loading...'
                  : plan.price === 0
                    ? 'Current Plan'
                    : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
