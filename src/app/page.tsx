import Link from 'next/link';
import { ArrowRight, Zap, Shield, CreditCard, Bot } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <Zap className="h-6 w-6" />
            <span>Boilerplate</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Ship faster with our
            <span className="text-primary"> Next.js Boilerplate</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Production-ready starter with authentication, payments, database, and AI integration.
            Focus on building your product, not the infrastructure.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Start Building <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-md border px-8 text-sm font-medium hover:bg-accent"
            >
              View Demo
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold">Everything you need</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Built with modern technologies and best practices
            </p>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Shield className="h-8 w-8" />}
                title="Authentication"
                description="Secure auth with Supabase. Email, OAuth, and magic links out of the box."
              />
              <FeatureCard
                icon={<CreditCard className="h-8 w-8" />}
                title="Payments"
                description="Stripe integration with subscriptions, one-time payments, and customer portal."
              />
              <FeatureCard
                icon={<Bot className="h-8 w-8" />}
                title="AI Integration"
                description="Gemini API proxy with rate limiting. Your API keys stay secure on the server."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Type-Safe"
                description="Drizzle ORM for type-safe database access. Zod for runtime validation."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold">Simple pricing</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Choose the plan that works for you
            </p>

            <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
              <PricingCard
                name="Free"
                price="$0"
                description="Perfect for getting started"
                features={['Up to 100 AI requests/month', 'Basic analytics', 'Community support']}
              />
              <PricingCard
                name="Pro"
                price="$19"
                description="For serious builders"
                features={[
                  'Unlimited AI requests',
                  'Advanced analytics',
                  'Priority support',
                  'Custom integrations',
                ]}
                featured
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="text-primary">{icon}</div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  featured,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-8 ${featured ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-card'}`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={`mt-8 block w-full rounded-md py-2 text-center text-sm font-medium ${
          featured
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border hover:bg-accent'
        }`}
      >
        Get started
      </Link>
    </div>
  );
}
