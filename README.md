# FounderIn

Early-access community app for founders, investors, associates and mentors.
Google sign-in → short onboarding (role) → member home with a members-only link to the WhatsApp community.

**Stack:** Next.js 16 (App Router, Cache Components, `proxy.ts`) · Supabase (Auth + Postgres + RLS) · Tailwind CSS v4 · shadcn/ui (Radix) · Hugeicons · zod

## Project structure

```
src/
  app/
    (marketing)/page.tsx        Landing — Google sign-in only (static)
    (app)/layout.tsx            Authed shell: header + user menu
    (app)/onboarding/           Role picker (first login)
    (app)/home/                 Member home: WhatsApp CTA, membership, roadmap
    (app)/profile/              Edit role
    auth/callback/route.ts      OAuth code → session; routes to onboarding or home
    auth/error/                 Friendly sign-in error
    community/join/route.ts     Members-only: stamps community_joined_at → 303 to WhatsApp
  components/
    ui/                         shadcn primitives (Hugeicons icon library)
    brand/ marketing/ auth/     Landing building blocks
    app/ home/ onboarding/      Authed UI
  features/
    profile/queries.ts          Data Access Layer (getCurrentProfile, requireProfile, …)
    profile/actions.ts          Server actions (completeOnboarding, updateRole)
    profile/schema.ts           zod validation
    auth/actions.ts             signOut
  lib/
    supabase/{server,client,proxy}.ts
    env.ts / server-env.ts      Validated env
    routes.ts                   Route constants + safe redirect helper
    constants.ts                Roles, options, copy
  proxy.ts                      Session refresh + optimistic route gating
supabase/migrations/            SQL schema, trigger, RLS
```

Security model: the proxy only does *optimistic* redirects. Every page/action/route re-checks the session (`getClaims()`), and Postgres RLS limits each member to their own row with column-level update grants.

## Setup

### 1. Install

```bash
pnpm install
cp .env.example .env.local
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → run `supabase/migrations/0001_profiles.sql`.
3. **Project Settings → API** → copy URL + publishable/anon key into `.env.local`.
4. **Authentication → URL Configuration**
   - Site URL: `http://localhost:3000` (your production URL later)
   - Redirect URLs: `http://localhost:3000/auth/callback`, `https://YOUR_DOMAIN/auth/callback`

### 3. Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → **Create credentials → OAuth client ID → Web application**.
2. Authorized redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. Supabase → **Authentication → Sign In / Providers → Google** → enable, paste Client ID + Secret.

### 4. WhatsApp

Set `WHATSAPP_COMMUNITY_URL` in `.env.local` to your invite link (`https://chat.whatsapp.com/...`).

### 5. Run

```bash
pnpm dev
```

## Scripts

| Script | What |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript |
| `pnpm db:types` | Regenerate `src/types/database.ts` (needs Supabase CLI, linked project) |

## Data

`public.profiles` — one row per user (created by trigger on signup from Google metadata):
`role`, `investor_type`, `specialty`, `onboarded_at`, `community_joined_at`.
See who joined: `select full_name, email, role, community_joined_at from profiles order by created_at desc;`
