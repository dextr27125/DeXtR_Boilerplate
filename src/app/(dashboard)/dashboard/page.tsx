import { createClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { aiUsage, subscriptions } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { Bot, CreditCard, Activity, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get subscription status
  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, user!.id))
    .limit(1);

  // Get AI usage stats for current month
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const usageStats = await db
    .select({
      totalRequests: sql<number>`count(*)`,
      totalTokens: sql<number>`coalesce(sum(${aiUsage.totalTokens}), 0)`,
    })
    .from(aiUsage)
    .where(
      sql`${aiUsage.userId} = ${user!.id} AND ${aiUsage.usageDate}::text LIKE ${currentMonth + '%'}`
    );

  const stats = usageStats[0] || { totalRequests: 0, totalTokens: 0 };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Subscription"
          value={subscription?.status === 'active' ? 'Pro' : 'Free'}
          description={subscription?.status === 'active' ? 'Active subscription' : 'Upgrade for more'}
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          title="AI Requests"
          value={stats.totalRequests.toString()}
          description="This month"
          icon={<Bot className="h-4 w-4" />}
        />
        <StatCard
          title="Tokens Used"
          value={stats.totalTokens.toLocaleString()}
          description="This month"
          icon={<Activity className="h-4 w-4" />}
        />
        <StatCard
          title="Status"
          value="Healthy"
          description="All systems operational"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started with common tasks
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <QuickAction
            title="Try AI Chat"
            description="Test the Gemini AI integration"
            href="/dashboard/chat"
          />
          <QuickAction
            title="Manage Billing"
            description="View and update your subscription"
            href="/billing"
          />
          <QuickAction
            title="Settings"
            description="Configure your account"
            href="/settings"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold">{value}</span>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function QuickAction({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-lg border p-4 transition-colors hover:bg-accent"
    >
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </a>
  );
}
