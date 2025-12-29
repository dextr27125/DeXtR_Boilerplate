# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
## IMPORTANT RULES
0. **USE ONLY ENGLISH LANGUAGE TO THINK**

1. **Whenever you create new files, significantly change a folder structure, or change the logic inside a folder**, you must **create or update a `LOGIC.md` file in that folder**. Keep it short and practical: describe the folder’s purpose, what the files inside it do, and why they exist. `LOGIC.md` must also **link to the key files** in that folder (or closely related files) that implement **critical functionality**.

2. **If you’re unsure about any project details or edge cases**, first check the nearest `LOGIC.md` at the **same folder level**. Read it to quickly restore context and understand the intended behavior (including the logic you previously documented).

3. In the code, add **console logging** in **complex flows** and in places where errors are likely. Logs should be **brief but step-by-step**, explaining what’s happening and what decision/branch is being taken, so future debugging is fast and straightforward.

4. Everytime if you fix some bug briefly describe how to check if it is fixed.

5. **THINK ONLY ON ENGLISH LANGUAGE!**

6. **YOU CAN USE MCP SUPABASE IF YOU NEED**

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run lint         # Run ESLint
npm run format       # Prettier formatting
npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:migrate   # Apply pending migrations
npm run db:push      # Push schema directly (dev only)
npm run db:studio    # Open Drizzle Studio
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Database**: Supabase (PostgreSQL) with Drizzle ORM
- **Auth**: Supabase Auth
- **Payments**: Stripe subscriptions
- **AI**: Google Gemini
- **Rate Limiting**: Upstash Redis
- **Styling**: TailwindCSS

## Architecture

### Route Groups
- `(auth)/` - Login, signup pages
- `(dashboard)/` - Protected dashboard pages (wrapped by middleware)
- `api/` - API routes (ai, stripe, webhooks, quiz, creatures)

### Core Systems

**Progression System** (`src/components/dashboard/progression/`):
- Manages user XP, levels, and MenteCoins
- `ProgressionProvider` wraps dashboard, exposes `useProgression()` hook
- Level-ups trigger modal with unlocked creature display

**Creature Evolution** (`src/components/dashboard/creature-evolution/`):
- 24 creatures with 9 evolution stages each (3x3 sprite sheets)
- Evolution stages are cosmetic only, separate from user level
- `CreatureProvider` manages selection, persists to localStorage
- Sprite images served via signed URLs from `/api/creatures/`

**Quiz System** (`src/components/quiz/`):
- File upload (PDF, DOCX, images, text) → AI generates quiz
- Per-answer XP/coin rewards + creature evolution
- Progress persists to localStorage (24h expiry)
- Public sharing via `/quiz/[slug]`

### Context Hierarchy
```
DashboardClient
  └─ ProgressionProvider
       └─ CreatureProvider
            └─ Page content
```

### Key API Endpoints
- `POST /api/ai/quiz` - Generate quiz from files (rate limited)
- `POST /api/quiz/answer` - Process answer, award XP/coins
- `POST /api/quiz/complete` - Save final results
- `/api/creatures/urls` - Signed URLs for creature sprites
- `/api/creatures/data` - Creature configuration

### Database
Schema in `src/lib/db/schema.ts`. Tables: users, products, prices, subscriptions, ai_usage.

### Supabase Auth
- Server auth: use `supabase.auth.getUser()` not just session
- Protected routes via middleware
- OAuth configured in Supabase Dashboard
