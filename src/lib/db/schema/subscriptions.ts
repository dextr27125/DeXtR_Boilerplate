import { pgTable, text, uuid, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { prices } from './products';

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey(), // Stripe subscription ID
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  status: text('status')
    .$type<
      'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid'
    >()
    .notNull(),
  priceId: text('price_id').references(() => prices.id),
  quantity: integer('quantity').default(1),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  currentPeriodStart: timestamp('current_period_start', { withTimezone: true }).notNull(),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }).notNull(),
  canceledAt: timestamp('canceled_at', { withTimezone: true }),
  trialStart: timestamp('trial_start', { withTimezone: true }),
  trialEnd: timestamp('trial_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
