import { pgTable, text, boolean, timestamp, jsonb, integer } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: text('id').primaryKey(), // Stripe product ID
  name: text('name').notNull(),
  description: text('description'),
  active: boolean('active').default(true).notNull(),
  metadata: jsonb('metadata').$type<Record<string, string>>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const prices = pgTable('prices', {
  id: text('id').primaryKey(), // Stripe price ID
  productId: text('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  active: boolean('active').default(true).notNull(),
  currency: text('currency').notNull(),
  unitAmount: integer('unit_amount'), // in cents
  interval: text('interval').$type<'month' | 'year' | null>(), // null for one-time
  intervalCount: integer('interval_count'),
  trialPeriodDays: integer('trial_period_days'),
  type: text('type').$type<'recurring' | 'one_time'>().notNull(),
  metadata: jsonb('metadata').$type<Record<string, string>>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Price = typeof prices.$inferSelect;
export type NewPrice = typeof prices.$inferInsert;
