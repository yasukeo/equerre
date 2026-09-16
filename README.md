# Équerre

A single-tutor workspace for a private maths teacher in Morocco: lessons, homework and corrections, sessions and bookings, chat and payment tracking, for her and her students. French first, built to take Arabic later.

- **Brief:** [`tutoring-saas-agent-prompt.md`](tutoring-saas-agent-prompt.md)
- **Design system:** [`DESIGN.md`](DESIGN.md)
- **Every decision and why:** [`DECISIONS.md`](DECISIONS.md)
- **Database schema and access rules:** [`docs/schema.md`](docs/schema.md)

**Status:** phase 0 — scaffold, database, auth and roles, workspaces, seed data.

## Stack

Next.js 16.3 (App Router, Cache Components) · React 19.3 · TypeScript 7 · Tailwind CSS 4.3 · shadcn/ui on Base UI · Supabase (Postgres, Auth, Storage, Realtime) · next-intl · date-fns 4 with `@date-fns/tz` · Resend · Vitest 5 · Playwright · pnpm 12. Exact versions and the reasons behind them are in the brief (§2) and `DECISIONS.md`.

## From a clean machine to a running app

### 1. Install the tools

- **Node.js 24 LTS** (anything from 22.12 works): <https://nodejs.org>
- **Git**
- **pnpm 12.** The project pins it in `package.json`. If `pnpm --version` shows something older, either run every command below as `npx pnpm@12.4.1 …`, or install it once with `npm install -g pnpm@12.4.1`.

### 2. Get the code and dependencies

```bash
git clone <this repository> equerre
cd equerre
pnpm install
```

### 3. Create a Supabase project

1. Create a project at <https://supabase.com/dashboard> (region: _West EU (Ireland)_, closest to Morocco among the standard regions).
2. In **Settings › API Keys**, open **Publishable and secret API keys** and copy both keys. Don't use the legacy `anon` / `service_role` keys.
3. In **Settings › Database**, copy the **Session pooler** connection string.

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable                               | Where it comes from                                                           |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | `http://localhost:3000` locally                                               |
| `NEXT_PUBLIC_SUPABASE_URL`             | Settings › API                                                                |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_…`                                                            |
| `SUPABASE_SECRET_KEY`                  | `sb_secret_…` — needed for "Inviter un élève"                                 |
| `SUPABASE_DB_URL`                      | Session pooler connection string — needed for `db:seed` and `db:types`        |
| `RESEND_API_KEY`                       | Optional. Without it, emails are printed in the terminal                      |
| `EMAIL_FROM`                           | Sender shown to students                                                      |
| `CRON_SECRET`                          | Any random string of 32+ characters (used from phase 2)                       |
| `SEED_PASSWORD`                        | A password for every seed account: letters, digits and dashes, 12+ characters |

### 5. Create the database

```bash
pnpm exec supabase login
pnpm exec supabase link --project-ref <your-project-ref>
pnpm db:push
```

This applies everything in `supabase/migrations/`.

### 6. Load the seed data

```bash
pnpm db:seed
```

This loads 1 tutor, 8 students, 3 groups, 12 lessons, 30 exercises and 40 sessions around the current week. Every seed account uses `SEED_PASSWORD`:

| Account                        | Role                             |
| ------------------------------ | -------------------------------- |
| `prof@equerre.test`            | Tutor                            |
| `salma.alaoui@equerre.test`    | Student, 2BAC PC, Tuesday group  |
| `imane.chraibi@equerre.test`   | Student, 2BAC SM A               |
| `yassine.bennani@equerre.test` | Student, 1BAC SM, Saturday group |

The invite code `BACPC2K7` lets you try self sign-up. It is development data: delete that row before real students sign up on the same project.

### 7. Run it

```bash
pnpm dev
```

Open <http://localhost:3000> and sign in.

### 8. Supabase Auth settings

In the Supabase dashboard, under **Authentication**:

- **URL Configuration:** set _Site URL_ to your site, on https in production. Add `https://<your-domain>/auth/confirm**` to _Redirect URLs_; the `**` lets a `?suite=` query through. Add `http://localhost:3000/auth/confirm**` only on a development project, never on the one real students use.
- **Emails › Templates:** make links work when opened on a different device than the one that asked for them (DECISIONS.md, D-030). The links are anchored to the Site URL on purpose, so nobody calling the Auth API can point a student's link at another scheme, host or port:
  - _Magic link:_ `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
  - _Confirm sign up:_ `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
  - _Reset password:_ `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery`

  After verifying, `/auth/confirm` sends people to their own home, or to the set-password page for a reset link.

- **Emails › SMTP:** send through Resend. Supabase's built-in mail only reaches your own team and a few messages an hour.
- **Providers › Email:** turn on leaked password protection, and set the email OTP expiry to 24 hours so a set-password link survives until the student opens it.

## Setting up the real tutor

There is no sign-up for the tutor (DECISIONS.md, D-024). On a fresh project, in the SQL editor:

```sql
insert into public.invite_codes (code, max_uses, expires_at)
values ('PRFSTRT2', 1, now() + interval '1 day');
```

Codes are exactly 8 characters from A–Z and 2–9, without I, O, 0 or 1; the database rejects anything else. Sign up at `/inscription` with that code, then:

```sql
update public.profiles
set role = 'tutor', level_code = null
where email = 'her-address@example.com';
```

The database allows only one tutor.

## Scripts

| Command                     | What it does                                                                      |
| --------------------------- | --------------------------------------------------------------------------------- |
| `pnpm dev`                  | Development server on port 3000                                                   |
| `pnpm build` / `pnpm start` | Production build (includes the TypeScript 7 check) and server                     |
| `pnpm lint`                 | ESLint                                                                            |
| `pnpm typecheck`            | Route types, then `tsc` (TypeScript 7)                                            |
| `pnpm format`               | Prettier                                                                          |
| `pnpm test`                 | Unit tests: dates and time zones, redirects, invite codes                         |
| `pnpm test:rls`             | Row-level security tests against the Supabase project, signed in as seed accounts |
| `pnpm test:e2e`             | Playwright on an Android phone profile and desktop Chrome                         |
| `pnpm db:push`              | Apply migrations to the linked project                                            |
| `pnpm db:types`             | Regenerate `src/types/database.ts` from `SUPABASE_DB_URL`                         |
| `pnpm db:seed`              | Load `supabase/seed.sql`                                                          |

## Project layout

```
src/
  app/
    (auth)/          sign in, sign up, password reset and the actions behind them
    auth/confirm/    landing route for every email link
    prof/            tutor workspace
    eleve/           student workspace
  components/        shell, form fields, status chips (ui/ holds shadcn primitives)
  config/site.ts     brand, tutor name, locale, time zone
  i18n/              next-intl request config
  lib/               auth (data access layer), dates, Supabase clients, email
  proxy.ts           refreshes the Supabase session on every request
messages/fr.json     every string in the interface
supabase/
  migrations/        schema, policies, triggers
  seed.sql           development data
tests/
  rls/               access-control tests through the API
  e2e/               Playwright
```

## Deploying to Vercel

1. Import the repository in Vercel.
2. Set **Node.js version** to 24.x and the **function region** to `dub1` (Dublin), next to the Supabase project.
3. Add every variable from `.env.local` except `SUPABASE_DB_URL` and `SEED_PASSWORD`, with `NEXT_PUBLIC_SITE_URL` set to the deployment URL.
4. Add `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel uses pnpm 12 (DECISIONS.md, D-013).
5. Add `https://<deployment-host>/auth/confirm**` to Supabase's redirect URLs, with the trailing `**` (see "Supabase Auth settings").
