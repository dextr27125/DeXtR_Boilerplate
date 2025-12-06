# Next.js Full-Stack Boilerplate

A production-ready Next.js 15 boilerplate with authentication, payments, database, and AI integration. Built with modern technologies and best practices.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [TailwindCSS](https://tailwindcss.com/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| Auth | [Supabase Auth](https://supabase.com/auth) |
| Payments | [Stripe](https://stripe.com/) |
| AI | [Google Gemini](https://ai.google.dev/) |
| Rate Limiting | [Upstash](https://upstash.com/) |
| Validation | [Zod](https://zod.dev/) |

## Features

- **Authentication** - Email/password and OAuth (Google, GitHub) via Supabase
- **Database** - PostgreSQL with Drizzle ORM for type-safe queries
- **Payments** - Stripe subscriptions with webhook handling
- **AI Integration** - Gemini API proxy with rate limiting
- **Protected Routes** - Middleware-based route protection
- **Type Safety** - Full TypeScript with strict mode
- **Modern UI** - TailwindCSS with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account
- Google AI Studio account (for Gemini API)
- Upstash account (for rate limiting)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd nextjs-boilerplate
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings > API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service role key → `SUPABASE_SERVICE_ROLE_KEY`
3. Go to **Settings > Database** and copy:
   - Connection string (Transaction mode) → `DATABASE_URL`
4. Enable OAuth providers in **Authentication > Providers** (optional)

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to **Developers > API keys** and copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
3. Create your products and prices in the Stripe Dashboard
4. Set up a webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen: `customer.subscription.*`, `checkout.session.completed`, `product.*`, `price.*`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

### 4. Set Up Google Gemini

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key → `GOOGLE_GENERATIVE_AI_API_KEY`

### 5. Set Up Upstash (Rate Limiting)

1. Create an account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy REST URL → `UPSTASH_REDIS_REST_URL`
4. Copy REST Token → `UPSTASH_REDIS_REST_TOKEN`

### 6. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in all the values in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Database
DATABASE_URL=postgresql://...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Gemini
GOOGLE_GENERATIVE_AI_API_KEY=AIza...

# Upstash
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 7. Run Database Migrations

```bash
npm run db:generate  # Generate migration files
npm run db:migrate   # Apply migrations to database
```

### 8. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   │   ├── ai/            # AI proxy endpoint
│   │   ├── stripe/        # Stripe checkout/portal
│   │   └── webhooks/      # Webhook handlers
│   ├── auth/              # Auth callback
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── auth/              # Auth forms
│   ├── dashboard/         # Dashboard layout
│   └── ui/                # Base UI components
├── lib/                   # Core utilities
│   ├── ai/                # Gemini client & rate limiter
│   ├── db/                # Drizzle ORM & schema
│   ├── stripe/            # Stripe client & config
│   ├── supabase/          # Supabase clients
│   ├── env.ts             # Environment validation
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── config/                # App configuration
```

## Database Schema

### Tables

| Table | Description |
|-------|-------------|
| `users` | User profiles linked to Supabase Auth |
| `products` | Products synced from Stripe |
| `prices` | Prices synced from Stripe |
| `subscriptions` | User subscriptions |
| `ai_usage` | AI request tracking for analytics |

### Commands

```bash
npm run db:generate   # Generate migration from schema changes
npm run db:migrate    # Apply pending migrations
npm run db:push       # Push schema directly (dev only)
npm run db:studio     # Open Drizzle Studio
```

## API Endpoints

### Authentication
Routes are protected by middleware. Unauthenticated users are redirected to `/login`.

### AI Chat
```
POST /api/ai/chat
Body: { "message": "Hello", "history": [] }
Headers: Cookie (auth session)
Rate Limit: 10 requests/minute per user
```

### Stripe Checkout
```
POST /api/stripe/checkout
Body: { "priceId": "price_xxx" }
Returns: { "url": "https://checkout.stripe.com/..." }
```

### Stripe Customer Portal
```
POST /api/stripe/portal
Returns: { "url": "https://billing.stripe.com/..." }
```

### Stripe Webhooks
```
POST /api/webhooks/stripe
Handles: subscription changes, checkout completion, product/price sync
```

## Customization

### Adding OAuth Providers

1. Enable the provider in Supabase Dashboard
2. Add provider credentials
3. The OAuth buttons in `src/components/auth/oauth-buttons.tsx` will work automatically

### Modifying Pricing Plans

Edit `src/lib/stripe/config.ts`:

```typescript
export const pricingPlans: PricingPlan[] = [
  {
    id: 'pro',
    name: 'Pro',
    price: 1900, // cents
    stripePriceId: 'price_xxx', // from Stripe Dashboard
    // ...
  },
];
```

### Changing AI Model

Edit `src/lib/ai/gemini.ts`:

```typescript
export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp', // or 'gemini-1.5-pro', etc.
});
```

### Adjusting Rate Limits

Edit `src/lib/ai/rate-limiter.ts`:

```typescript
export const aiRateLimiter = new Ratelimit({
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables for Production

Update these values:
- `NEXT_PUBLIC_APP_URL` → Your production URL
- Stripe keys → Use live keys (not test)
- Update Stripe webhook URL to production

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |

## Security Best Practices

This boilerplate implements:

- **Server-side auth verification** - Uses `supabase.auth.getUser()` not just session
- **Webhook signature verification** - Validates Stripe webhook signatures
- **Rate limiting** - Protects AI endpoints from abuse
- **Environment validation** - Fails fast on missing/invalid env vars
- **Input validation** - Zod schemas for API requests
- **Protected routes** - Middleware-based route protection

## Troubleshooting

### "Invalid signature" on Stripe webhooks
- Ensure `STRIPE_WEBHOOK_SECRET` is correct
- Use raw request body (not parsed JSON)

### Auth redirect loop
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verify OAuth callback URL in Supabase matches your domain

### Rate limit always failing
- Verify Upstash credentials
- Check Redis connection in Upstash console

### Database connection errors
- Use Transaction mode URL with `?pgbouncer=true` for serverless
- Ensure `prepare: false` in postgres client options

## License

MIT License - feel free to use this boilerplate for your projects!

---

Built with modern web technologies. Happy coding!
