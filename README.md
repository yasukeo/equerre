# Équerre

A single-tutor workspace for a private maths teacher in Morocco: lessons, homework and corrections, sessions and bookings, chat and payment tracking for her and her students, a read-only view for parents, and a public site with a blog. French first, built to take Arabic later.

- **Brief:** [`tutoring-saas-agent-prompt.md`](tutoring-saas-agent-prompt.md)
- **Design system:** [`DESIGN.md`](DESIGN.md)
- **Every decision and why:** [`DECISIONS.md`](DECISIONS.md)
- **Database schema and access rules:** [`docs/schema.md`](docs/schema.md)

**Status:** the five phases of the brief (§9) are built and deployed at <https://equerre.vercel.app>. What is left before real students use it is in [Going live](#going-live).

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
| `SUPABASE_SECRET_KEY`                  | `sb_secret_…` — to invite a student or a parent, and for reminders            |
| `SUPABASE_DB_URL`                      | Session pooler connection string — needed for `db:seed`                       |
| `RESEND_API_KEY`                       | Optional. Without it, emails are printed and invitations show their link      |
| `EMAIL_FROM`                           | Sender shown to students                                                      |
| `CRON_SECRET`                          | Random, 32+ characters; Supabase Cron sends it to `/api/cron/rappels`         |
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

This loads 1 tutor, 8 students, 1 parent, 3 groups, 12 lessons, 30 exercises, 40 sessions around the current week, 4 plans, 9 payments and 3 blog posts. Every seed account uses `SEED_PASSWORD`:

| Account                        | Role                             |
| ------------------------------ | -------------------------------- |
| `prof@equerre.test`            | Tutor                            |
| `salma.alaoui@equerre.test`    | Student, 2BAC PC, Tuesday group  |
| `imane.chraibi@equerre.test`   | Student, 2BAC SM A               |
| `yassine.bennani@equerre.test` | Student, 1BAC SM, Saturday group |
| `karim.alaoui@equerre.test`    | Parent, follows Salma            |

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

  `/auth/confirm` does not spend a `token_hash` link on the spot: it opens a « Continuer » page whose button does, so a mail scanner that opens the link cannot use it up first. After that, people land on their own home, or on the set-password page for a reset link.

- **Emails › SMTP:** send through Resend. Supabase's built-in mail only reaches your own team and a few messages an hour.
- **Providers › Email:** keep _Confirm email_ and _Secure email change_ on, so nobody can take an address they cannot read. The tutor links an existing parent account by its address (D-091). Set the email OTP expiry to 24 hours so a set-password link survives until the student opens it. Leaked-password protection needs the Pro plan (D-064).
- **Rate limits:** keep the defaults for sign-ins and sign-ups, or lower them. Messages and booking requests are limited in the database itself.

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
| `pnpm test`                 | Unit tests: dates and time zones, grading, homework rules, payments, typography   |
| `pnpm test:rls`             | Row-level security tests against the Supabase project, signed in as seed accounts |
| `pnpm test:e2e`             | Playwright on an Android phone profile and desktop Chrome                         |
| `pnpm db:push`              | Apply migrations to the linked project                                            |
| `pnpm db:types`             | Regenerate `src/types/database.ts` (needs `supabase login`)                       |
| `pnpm db:seed`              | Load `supabase/seed.sql`                                                          |
| `pnpm storage:sweep`        | List lesson files nothing refers to any more; `--delete` removes them (D-054)     |

## Project layout

```
src/
  app/
    (site)/          public site: home, tariffs, blog (/conseils)
    cours/           public lessons
    (auth)/          sign in, sign up, password reset and the actions behind them
    auth/confirm/    landing route for every email link
    prof/            tutor workspace
    eleve/           student workspace
    parent/          parent view, read-only
    recus/[id]/      PDF receipts, for whoever may read the payment
    api/cron/        reminders and email digests, called by Supabase Cron
  components/        shell, form fields, status chips (ui/ holds shadcn primitives)
  config/site.ts     brand, tutor name, locale, time zone
  i18n/              next-intl request config
  lib/               auth (data access layer), dates, Supabase clients, email, and one
                     folder per area (homework, sessions, chat, payments, parents, site…)
  proxy.ts           refreshes the Supabase session on every request
messages/fr.json     every string in the interface
docs/schema.md       tables, who reads what, functions, storage
supabase/
  migrations/        schema, policies, triggers
  seed.sql           development data
  cron.sql           the reminders job, run once by hand when going live
tests/
  rls/               access-control tests through the API
  e2e/               Playwright
```

Unit tests sit next to the code they test (`src/lib/**/*.test.ts`).

## Deploying to Vercel

1. Import the repository in Vercel.
2. Set **Node.js version** to 24.x and the **function region** to `dub1` (Dublin), next to the Supabase project.
3. Add every variable from `.env.local` except `SUPABASE_DB_URL` and `SEED_PASSWORD`, with `NEXT_PUBLIC_SITE_URL` set to the deployment URL.
4. Add `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel uses pnpm 12 (DECISIONS.md, D-013).
5. Add `https://<deployment-host>/auth/confirm**` to Supabase's redirect URLs, with the trailing `**` (see "Supabase Auth settings").

## Going live

The app runs, but a few settings wait for the domain and the Pro plan (DECISIONS.md, D-064). In order:

1. **A fresh Supabase project for real students**, or at least: delete the seed accounts and the development invite code `BACPC2K7`. Run the RLS tests (`pnpm test:rls`) only against a development project or a Supabase branch: they create and remove data.
2. **The domain.** Point it at the Vercel project, set `NEXT_PUBLIC_SITE_URL` to it, and add it to Supabase Auth's site URL and redirect list (see "Supabase Auth settings").
3. **Email.** Verify the domain in Resend, set `EMAIL_FROM` to an address on it, and point Supabase Auth's SMTP at Resend (`smtp.resend.com`, port 465, user `resend`).
4. **Secrets in Vercel:** `SUPABASE_SECRET_KEY`, `RESEND_API_KEY` (a fresh one) and `CRON_SECRET`, then redeploy. Without the secret key, inviting a student or a parent answers that account creation is not configured.
5. **Reminders.** Run [`supabase/cron.sql`](supabase/cron.sql) once in the SQL editor, with the same `CRON_SECRET` and the site's address filled in. It calls `/api/cron/rappels` every 15 minutes.
6. **On Pro:** turn on leaked-password protection.
7. **The real tutor:** see "Setting up the real tutor". She then fills in her public profile and WhatsApp number at `/prof/site`, and her plans at `/prof/paiements/formules`.
