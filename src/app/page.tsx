'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, CreditCard, Bot, Zap, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      {/* Floating Header */}
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto mt-4 max-w-5xl px-4">
          <nav className="flex items-center justify-between rounded-full border border-white/20 bg-white/70 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-black/50">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Starter</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-32 pt-40">
          {/* Background Gradient */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-r from-violet-200 via-purple-200 to-pink-200 opacity-30 blur-3xl dark:from-violet-900/30 dark:via-purple-900/30 dark:to-pink-900/30" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Now with Gemini AI integration
            </div>

            {/* Main Headline */}
            <h1 className="animate-fade-in-up text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
              Build your next
              <span className="relative mx-3">
                <span className="relative z-10 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  big idea
                </span>
              </span>
              faster
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up animation-delay-100 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
              A beautifully crafted starter kit with authentication, payments, and AI —
              so you can focus on what makes your product unique.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animation-delay-200 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gray-900 px-8 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:hover:shadow-white/20"
              >
                Start for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 text-sm font-medium text-gray-900 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:border-gray-700"
              >
                View live demo
              </Link>
            </div>

            {/* Social Proof */}
            <p className="animate-fade-in animation-delay-300 mt-12 text-sm text-gray-500 dark:text-gray-500">
              Trusted by developers from
              <span className="mx-2 font-medium text-gray-700 dark:text-gray-300">Google</span>•
              <span className="mx-2 font-medium text-gray-700 dark:text-gray-300">Meta</span>•
              <span className="mx-2 font-medium text-gray-700 dark:text-gray-300">Stripe</span>•
              <span className="mx-2 font-medium text-gray-700 dark:text-gray-300">Vercel</span>
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative px-4 py-32">
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need,
                <br />
                nothing you don&apos;t
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Carefully selected technologies that work beautifully together
              </p>
            </div>

            {/* Feature Grid */}
            <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Authentication"
                description="Secure login with email, OAuth providers, and magic links via Supabase"
                gradient="from-blue-500 to-cyan-500"
              />
              <FeatureCard
                icon={<CreditCard className="h-6 w-6" />}
                title="Payments"
                description="Stripe subscriptions, one-time payments, and customer billing portal"
                gradient="from-green-500 to-emerald-500"
              />
              <FeatureCard
                icon={<Bot className="h-6 w-6" />}
                title="AI Ready"
                description="Gemini API integration with built-in rate limiting and usage tracking"
                gradient="from-violet-500 to-purple-500"
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Type-Safe"
                description="End-to-end type safety with TypeScript, Drizzle ORM, and Zod validation"
                gradient="from-orange-500 to-amber-500"
              />
            </div>

            {/* Tech Stack */}
            <div className="mt-20 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 sm:p-12">
              <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Built with
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <TechLogo name="Next.js" />
                <TechLogo name="Tailwind" />
                <TechLogo name="Supabase" />
                <TechLogo name="Stripe" />
                <TechLogo name="Drizzle" />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative px-4 py-32">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-transparent" />

          <div className="relative mx-auto max-w-5xl">
            {/* Section Header */}
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Start free, upgrade when you&apos;re ready
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              <PricingCard
                name="Starter"
                price="0"
                description="Perfect for side projects and experimentation"
                features={[
                  '100 AI requests per month',
                  'Email authentication',
                  'Basic analytics dashboard',
                  'Community support',
                ]}
              />
              <PricingCard
                name="Pro"
                price="19"
                description="For professionals and growing teams"
                features={[
                  'Unlimited AI requests',
                  'All authentication providers',
                  'Advanced analytics & insights',
                  'Priority email support',
                  'Custom integrations',
                  'API access',
                ]}
                featured
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-32">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-20 text-center dark:from-gray-800 dark:to-gray-900 sm:px-16">
              {/* Decorative elements */}
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to build something amazing?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
                  Join thousands of developers who ship faster with our starter kit.
                </p>
                <div className="mt-10">
                  <Link
                    href="/signup"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-gray-900 transition-all hover:shadow-xl hover:shadow-white/20"
                  >
                    Get started for free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-4 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Starter</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50">
      {/* Gradient hover effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

      <div className={`relative mb-4 inline-flex rounded-xl bg-gradient-to-br ${gradient} p-3 text-white shadow-lg`}>
        {icon}
      </div>
      <h3 className="relative text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
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
      className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 sm:p-10 ${
        featured
          ? 'bg-gray-900 text-white shadow-2xl dark:bg-white dark:text-gray-900'
          : 'border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50'
      }`}
    >
      {featured && (
        <div className="absolute right-6 top-6">
          <span className="rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-3 py-1 text-xs font-medium text-white">
            Popular
          </span>
        </div>
      )}

      <div>
        <h3 className={`text-lg font-semibold ${featured ? '' : 'text-gray-900 dark:text-white'}`}>
          {name}
        </h3>
        <p className={`mt-1 text-sm ${featured ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-bold tracking-tight">${price}</span>
        <span className={featured ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}>
          /month
        </span>
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              featured
                ? 'bg-violet-500/20 text-violet-400 dark:bg-violet-500/20 dark:text-violet-600'
                : 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400'
            }`}>
              <Check className="h-3 w-3" />
            </div>
            <span className={`text-sm ${featured ? 'text-gray-300 dark:text-gray-600' : 'text-gray-600 dark:text-gray-400'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/signup"
        className={`mt-10 flex h-12 w-full items-center justify-center rounded-full text-sm font-medium transition-all ${
          featured
            ? 'bg-white text-gray-900 hover:shadow-lg dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
            : 'border border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600'
        }`}
      >
        Get started
      </Link>
    </div>
  );
}

function TechLogo({ name }: { name: string }) {
  return (
    <span className="text-lg font-semibold text-gray-900 dark:text-white">
      {name}
    </span>
  );
}
