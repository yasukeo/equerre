# DECISIONS.md

Every assumption and non-obvious choice, with the reason. Newest entries at the bottom of each section.

## Project and brief

**D-001 — Project lives in `Desktop/Tutoring`, brief kept alongside.**
The brief (`tutoring-saas-agent-prompt.md`, revision 2) sits at the repo root, with the original kept as `tutoring-saas-agent-prompt.v1-original.md`. Why: the brief is the source of truth for scope, and it was updated in place (versions, data-model fixes) before any code was written.

**D-002 — Brand: Équerre.**
The brief left the brand empty. Three options:

1. **Équerre** (set square) — every Moroccan student owns one from primary school on; it stands for construction, precision and right angles; short; works in French and reads cleanly in Arabic transliteration.
2. **Quadrillé** (squared paper) — ties directly to the exercise book she's replacing, but it's an adjective and weaker as a name.
3. **Pas à pas** (step by step) — describes the teaching well, but it's a generic phrase already used by many tutoring services and hard to own.

Picked **Équerre**: the most ownable, the most concrete object, and it anchors the design language (construction, rulers, graduated scales). Domain suggestion: `equerre.ma`. Rename by changing `siteConfig.brand`.

**D-003 — Levels: all of them, as data.**
The brief's "levels she teaches" was empty. Every level in §4.2 is seeded into a `levels` table rather than an enum, so she can add or retire a track without a migration. 1BAC SVT is kept separate from SE because the brief lists it.

**D-004 — Tutor name and city are placeholders.**
`siteConfig.tutorName = "Prénom Nom"`. No city is invented; public copy that needs one waits for phase 4.

## Stack and tooling

**D-010 — Versions pinned on 2026-09-15.**
Exact versions in `package.json`, verified against the npm registry the same day. See the brief §2 for the table.

**D-011 — TypeScript 7 for type-checking, TypeScript 6 for linting.**
TypeScript 7.0 ships no JavaScript API, and `typescript-eslint` requires TypeScript < 6.1. `typescript` is aliased to `@typescript/typescript6` (what ESLint and editors import) and `@typescript/native` to `typescript@7.0.2` (whose `tsc` binary runs `pnpm typecheck` and `next build`). Remove the alias once `typescript-eslint` supports TypeScript 7.

**D-012 — ESLint 9, not 10.**
ESLint 10 is out, but `eslint-plugin-react`, `eslint-plugin-import` and `eslint-plugin-jsx-a11y` (all inside `eslint-config-next` 16.3.5) cap their peer range at 9.

**D-013 — pnpm 12 through `npx pnpm@12.4.1` locally.**
The Corepack bundled with Node 22.21 (0.34) looks for `bin/pnpm.cjs`, which pnpm 12 no longer ships, so `corepack pnpm@12` fails. `packageManager` still pins 12.4.1. On Vercel, set `ENABLE_EXPERIMENTAL_COREPACK=1`; if that build image's Corepack has the same problem, pin pnpm 10 for deploys and log it here.

**D-014 — `@parcel/watcher` and `@swc/core` build scripts disabled.**
pnpm 12 blocks install scripts by default. Both come from `next-intl`'s optional message extractor, which we don't use, and both ship prebuilt binaries as optional dependencies.

**D-015 — shadcn/ui on Base UI, with RTL.**
`shadcn init --base base --rtl`. Base UI is the CLI v4 default and the actively developed primitive library; the `--rtl` flag makes generated components use logical classes, which the brief requires. (The brief said "Radix primitives"; updated to match.)

**D-016 — Next.js flags.**
`cacheComponents`, `partialPrefetching`, `reactCompiler`, and `experimental.useOffline` are on from day one (brief §2). `useTypeScriptCli` is already the default in 16.3.5.

**D-017 — next-intl without `setRequestLocale`.**
next-intl only reads request headers when the request config asks for `requestLocale`, and it exposes that as a lazy getter. `src/i18n/request.ts` returns a fixed `fr` and never touches it, so pages stay prerenderable under Cache Components with no per-page calls. When Arabic arrives with a `[locale]` segment, switch to `next/root-params` or `setRequestLocale`.

**D-018 — Versions resolved by tooling are pinned as installed.**
`shadcn init` added `@base-ui/react`, `class-variance-authority`, `cn` (shadcn's own clsx + tailwind-merge replacement, published from the shadcn-ui organisation) and `lucide-react` with caret ranges. They're pinned to the versions pnpm resolved: `lucide-react` stays at 1.45.0 rather than 1.46.0, respecting pnpm 12's minimum-release-age policy. `shadcn` moved to devDependencies — only its CSS is imported, at build time.

**D-019 — Seed and test scripts are `.mts`.**
`package.json` has no `"type": "module"`, so ESM scripts and configs use the `.mts` extension (`scripts/seed.mts`, `vitest.config.mts`) and `tsconfig.json` includes them.

## Data and security

**D-020 — Develop against the hosted Supabase project.**
Docker Desktop isn't running on this machine, so `supabase start` isn't available. Migrations are applied to project `sharzrtzesqofwpogvii` (eu-west-1) and kept in `supabase/migrations/` with the versions the server recorded.

**D-021 — Policy helpers live in a `private` schema.**
`private.is_tutor()`, `private.my_level()`, `private.is_group_member()` are `security definer`, `stable`, `search_path = ''`. Supabase exposes `public` over the Data API; keeping helpers in `private` means they can't be called as RPCs. The brief's `is_tutor()` is this function.

**D-022 — Column-level secrets get their own tables.**
RLS filters rows, not columns. Anything a row's reader must not see is split out:

- tutor-only notes → `student_notes` (not a column on `profiles`);
- answers and worked solutions → `exercise_solutions` (not columns on `exercises`);
- the shared session recap stays on `sessions.recap`; her private remarks about a session go to `student_notes.session_id`.

**D-023 — Nobody picks their own role; sign-up needs an invite code or the tutor.**
The `auth.users` insert trigger always creates a `student` profile, and refuses the insert unless it carries a valid invite code (`user_metadata.invite_code`) or was provisioned by the tutor (`app_metadata.provisioned_by`, which only the secret key can set). Magic-link sign-in passes `shouldCreateUser: false`. A trigger also blocks students from changing their own role, status, level or email.

**D-024 — Bootstrapping the real tutor.**
There's no self-signup for the tutor. On a fresh project: create a one-use invite code in SQL, sign up with it, then `update public.profiles set role = 'tutor', level_code = null where email = '…'`. A partial unique index guarantees there is only ever one tutor. Steps are in the README.

**D-025 — Tutor-provisioned students get a set-password link we send ourselves.**
The tutor's "add a student" action calls `auth.admin.createUser` (with `app_metadata.provisioned_by = 'tutor'`) and `auth.admin.generateLink({ type: 'recovery' })`, then emails the link through Resend in French. Why: Supabase's built-in SMTP is rate-limited to a few emails an hour and only reaches team members, and its templates aren't ours.

**D-026 — Session statuses.**
`en_attente` (requested), `planifiee`, `terminee`, `annulee`, `absent`, `refusee` (declined). The brief's lifecycle plus the two states a request needs.

**D-027 — Overlaps are impossible in the database.**
An exclusion constraint on `tstzrange(starts_at, ends_at)` covers `planifiee`, `terminee` and `absent` sessions. Pending requests don't block a slot. Confirming one that now overlaps fails with a constraint error the action turns into a sentence.

**D-028 — Seed accounts use the `.test` domain and a password from `.env.local`.**
The seed inserts users directly into `auth.users` (the approach Supabase documents for seed files), so it needs no secret key. The password comes from `SEED_PASSWORD` in `.env.local`, never from the repo, because the hosted project is reachable from the internet and a committed password would be a committed tutor login. `.test` addresses can't receive mail, so seed accounts sign in with a password only.

**D-029 — What the Supabase advisors reported after phase 0, and what was done.**

- _`public.invite_code_is_valid` is a security-definer function callable by anon._ Intentional: it's how the sign-up form checks a code without exposing `invite_codes`. It returns a boolean only, and 32⁸ codes make guessing impractical. The auth trigger re-checks the code atomically.
- _`public.rls_auto_enable()` is callable by anon._ Not created by this project; it came with the Supabase project and is left untouched.
- _Leaked password protection is disabled._ An Auth setting, not a migration — turn it on in the dashboard (Authentication › Providers › Email) before real students sign up.
- _22 unused indexes (info)._ Expected on a new database; they back the queries in the brief (§5) and the foreign keys policies join on.

**D-030 — Email links work on any device.**
`/auth/confirm` accepts both the PKCE `code` parameter and the `token_hash` parameter. PKCE links only work in the browser that asked for them, which fails when a student requests a link on a laptop and opens it on a phone. The README explains how to switch the Supabase email templates to `token_hash` links. The tutor's set-password links already use `token_hash`.

**D-031 — When email isn't configured, the tutor gets the set-password link on screen.**
Without `RESEND_API_KEY`, "Créer le compte" shows the link with a copy button. That matches how she works today (WhatsApp), and it keeps development free of a mail provider. The link is only ever shown to the tutor.

**D-032 — RLS is tested through the real API.**
`pnpm test:rls` signs in as seed accounts with the publishable key and asserts what each role can and can't read or write, on the hosted project. A pgTAP suite (`supabase test db`) is the next step once a local Supabase (Docker) is available; the API tests already cover the brief's requirement of testing "through the API, not just the UI".

## Content

**D-030 — Tiptap JSON vocabulary.**
Lessons, exercise statements and solutions use Tiptap's JSON with these node types: `doc`, `paragraph`, `heading` (levels 2–3), `bulletList`, `orderedList`, `listItem`, `text` (marks `bold`, `italic`), `inlineMath` and `blockMath` (attr `latex`, from `@tiptap/extension-mathematics`), `callout` (attr `kind`: `definition` · `theoreme` · `propriete` · `exemple` · `attention`), `image` (attrs `src`, `alt`) and `fileAttachment` (attrs `path`, `name`, `size`). The server renderer (phase 1) handles exactly this set.

## Secret key usage

Every server-side use of `SUPABASE_SECRET_KEY`, and why the publishable key plus RLS isn't enough.

| Where                                    | What for                                                           | Why it needs the secret key                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Tutor "add a student" action (phase 0/1) | `auth.admin.createUser`, `auth.admin.generateLink`                 | Creating another person's account and marking it `provisioned_by` is an admin operation by definition. |
| `/api/cron/*` route handlers (phase 2)   | Read upcoming sessions and stamp `reminder_*_sent_at` for everyone | A cron job has no signed-in user, so no RLS identity.                                                  |

The seed script does not use it (D-028).
