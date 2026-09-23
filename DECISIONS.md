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

**D-023 — Nobody picks their own role; every account needs an invite code.**
The `auth.users` insert trigger always creates a `student` profile, and refuses the insert unless it carries a valid invite code (`user_metadata.invite_code`). The tutor's own "Créer le compte" also goes through a code (D-025). The only exception is the seed, which writes `auth.users` directly with `app_metadata.provisioned_by = 'seed'`. Magic-link sign-in passes `shouldCreateUser: false`. A trigger also blocks students from changing their own role, status, level or email.

**D-024 — Bootstrapping the real tutor.**
There's no self-signup for the tutor. On a fresh project: create a one-use invite code in SQL, sign up with it, then `update public.profiles set role = 'tutor', level_code = null where email = '…'`. A partial unique index guarantees there is only ever one tutor. Steps are in the README.

**D-025 — Tutor-created students: a one-use code, then a set-password link we send ourselves.**
"Créer le compte" first inserts a one-use invite code as the tutor (through RLS), carrying the chosen level and group. It then calls `auth.admin.createUser` with that code in `user_metadata`, and the trigger consumes it, setting the level and group atomically. It can't use `app_metadata` instead: Supabase Auth's admin API writes `app_metadata` in a separate UPDATE after the INSERT, so the trigger never sees it. That was the original design, and it made every tutor-created account fail; the phase 0 review caught it. The code is deleted if account creation fails.

The action then calls `auth.admin.generateLink({ type: 'recovery' })` and emails the link through Resend in French. Supabase's built-in SMTP is rate-limited to a few emails an hour, only reaches team members, and its templates aren't ours. Inviting an address again re-sends a link, provided that account has never signed in. `tests/rls/provisioning.test.ts` runs this path against the real Auth server when `SUPABASE_SECRET_KEY` is set.

**D-026 — Session statuses.**
`en_attente` (requested), `planifiee`, `terminee`, `annulee`, `absent`, `refusee` (declined). The brief's lifecycle plus the two states a request needs.

**D-027 — Overlaps are impossible in the database.**
An exclusion constraint on `tstzrange(starts_at, ends_at)` covers `planifiee`, `terminee` and `absent` sessions. Pending requests don't block a slot. Confirming one that now overlaps fails with a constraint error the action turns into a sentence.

**D-028 — Seed accounts use the `.test` domain and a password from `.env.local`.**
The seed inserts users directly into `auth.users` (the approach Supabase documents for seed files), so it needs no secret key. The password comes from `SEED_PASSWORD` in `.env.local`, never from the repo, because the hosted project is reachable from the internet and a committed password would be a committed tutor login. `.test` addresses can't receive mail, so seed accounts sign in with a password only.

Because the raw file holds a `{{SEED_PASSWORD}}` placeholder, `[db.seed]` is disabled in `supabase/config.toml` and `seed.sql` raises an error if the placeholder was not substituted. `supabase db reset` therefore never creates accounts whose password is the placeholder. Re-seeding is idempotent: it re-applies the current password to seed accounts and resets the trial invite code `BACPC2K7` (usage count, level, group, expiry) that the tests rely on.

**D-029 — What the Supabase advisors reported after phase 0, and what was done.**

- _`public.invite_code_is_valid` is a security-definer function callable by anon._ Intentional: it's how the sign-up form checks a code without exposing `invite_codes`. It returns a boolean only, and 32⁸ codes make guessing impractical. The auth trigger re-checks the code atomically.
- _`public.rls_auto_enable()` is callable by anon._ Not created by this project; it came with the Supabase project and is left untouched.
- _Leaked password protection is disabled._ An Auth setting, not a migration — turn it on in the dashboard (Authentication › Providers › Email) before real students sign up.
- _22 unused indexes (info)._ Expected on a new database; they back the queries in the brief (§5) and the foreign keys policies join on.

**D-030 — Email links work on any device and point only at this site.**
`/auth/confirm` accepts both the PKCE `code` parameter and the `token_hash` parameter. PKCE links only work in the browser that asked for them, which fails when a student requests a link on a laptop and opens it on a phone. The README therefore switches the Supabase templates to `token_hash` links.

Those links are built from `{{ .SiteURL }}`, not `{{ .RedirectTo }}`. Anyone can call the Auth API with a `redirect_to` of their choosing. Templates built on it would let a caller pick the scheme, host or port a victim's token travels to, and would break emails sent from the Supabase dashboard, whose RedirectTo is the bare Site URL. A review of the phase 0 fixes caught this in an earlier draft.

The trade-off: a link opened from such an email lands on the person's own home (or the set-password page for a reset) rather than on the page they were trying to reach. The route also refuses a repeated `code`, `token_hash`, `type` or `suite` parameter, and still passes `suite` through `safeRedirectPath` for the PKCE flow. The tutor's set-password links already use `token_hash`.

**D-031 — When email can't go out, the tutor gets the set-password link on screen.**
Without `RESEND_API_KEY`, or when Resend rejects a message, "Créer le compte" shows the link with a copy button instead of failing. That matches how she works today (WhatsApp). The link is shown only to the tutor and never logged: outside local development, `sendEmail` logs only the subject of an unsent email, since anyone reading deployed logs could otherwise take over the account.

**D-032 — RLS is tested through the real API.**
`pnpm test:rls` signs in as seed accounts with the publishable key and asserts what each role can and can't read or write, on the hosted project. A pgTAP suite (`supabase test db`) is the next step once a local Supabase (Docker) is available; the API tests already cover the brief's requirement of testing "through the API, not just the UI".

**D-033 — Redirects are parsed, not prefix-matched.**
`safeRedirectPath` rejects any value with a control character or a backslash, then parses it against a fixed origin and keeps only path, query and fragment. A prefix check alone let `/\t/evil.test` through: browsers strip the tab and read it as `//evil.test`. The same helper guards `?suite=` on sign-in, magic links and `/auth/confirm`.

**D-034 — Contact details are collected at sign-up.**
Brief §4.1 asks for phone, school and guardian contact on the new profile. Both sign-up and the tutor's form have optional fields for them, validated by one zod schema (`src/lib/contact.ts`) that matches the database check constraints. The trigger copies them from `user_metadata`. Since a student controls that metadata, the trigger drops a malformed phone number instead of letting a check constraint fail the whole sign-up. Editing them afterwards arrives with the student CRM (phase 2).

**D-035 — French error and not-found pages.**
`app/not-found.tsx`, `app/error.tsx` and `app/global-error.tsx` replace Next's English defaults. The workspaces have their own `error.tsx`, so the navigation stays on screen when a page fails. `global-error.tsx` replaces the root layout and has no translation provider, so it imports the dictionary file directly.

**D-036 — The trial invite code is development data.**
The seed's `BACPC2K7` (5 uses, 30 days) exists for trying self sign-up. The sign-up hint no longer quotes it, and the README says to delete it before real students use the project.

**D-037 — Automatic correction runs in Postgres, never in the browser or the server action.**
A student must never read the expected answer, and must never be able to write her own grade. Both follow from one move: `public.submit_exercise_answer` is a `security definer` RPC that reads `exercise_solutions` — a table students cannot select — compares, and writes the grade itself. Numeric answers are compared with `numeric` arithmetic, so a tolerance of zero means what it says and the comparison never passes through a JavaScript double, where `parseFloat("4,8")` silently returns 4. The expected answer never reaches a variable the browser could observe.

**D-038 — A corrected submission is final.**
The upsert in `submit_exercise_answer` carries `where s.status = 'rendu'`, so a second send after a correction changes nothing and the function raises `submission_already_corrected`. Without it a student could send a wrong numeric answer, read her 0/20, and immediately send the right one. Photographed pages stay `rendu` until the tutor grades them, so a student can still replace a blurred page. The solution opens once the work is corrected, or when the student asks for it — which records a row in `exercise_reveals` and forfeits the exercise (`solution_already_revealed`), since anything she sent afterwards could only copy the answer. An exercise whose expected answer was never written refuses the submission (`exercise_not_ready`) rather than stamp a machine-made 0/20 that she could never replace. The forfeit also covers a correction in another assignment holding the same exercise (`exercise_done_elsewhere`): the solution policy is keyed by exercise, so failing one assignment on purpose would otherwise hand over the answer for the other. And nothing may fail once the grade is computed. A NULL page list used to fail the INSERT at that point, and Postgres's error detail printed the would-be row, grade included, before rolling back — an unlimited, invisible oracle. The inputs are now made whole first, and the write is wrapped so no error can carry the row (`20260923200502`).

**D-039 — The REST API exposes only what each role has to call.**
A student writes a submission through `submit_exercise_answer` and nowhere else: `submissions` has no insert or update policy for her, and `private.guard_submission_write()` refuses every write that is neither the grading function's — which steps past it through a transaction-scoped `set_config('equerre.grading', …)` — nor the tutor's. The first version let her write her own rows directly, and an adversarial review showed what that cost: a bare insert counted as having answered, which opened the solution, and the RPC then replaced the still-`rendu` row with the answer she had just read, for 20/20 with no reveal on record. The same door let a direct update point `file_paths` at another student's objects. Both closed in `20260923151501`, and `tests/rls/phase-1.test.ts` attacks them through the API. On top of that, `20260916124117_function_grants.sql` revokes `execute` on `submit_exercise_answer` from `anon`, and on Supabase's `rls_auto_enable` event trigger from everyone — event triggers fire on DDL whatever the grants say, so that safety net is untouched. Two advisor warnings survive on purpose: a signed-in student must be able to submit, and `invite_code_is_valid` must answer before the account exists.

## Content

**D-040 — Tiptap JSON vocabulary.**
Lessons, exercise statements and solutions use Tiptap's JSON with these node types: `doc`, `paragraph`, `heading` (levels 2–3), `bulletList`, `orderedList`, `listItem`, `text` (marks `bold`, `italic`), `inlineMath` and `blockMath` (attr `latex`, from `@tiptap/extension-mathematics`), `callout` (attr `kind`: `definition` · `theoreme` · `propriete` · `exemple` · `attention`), `image` (attrs `src`, `alt`) and `fileAttachment` (attrs `path`, `name`, `size`). The server renderer (phase 1) handles exactly this set.

## Files and storage

**D-050 — Lesson images are public; lesson files follow the lesson.**
`lesson-assets` is a public bucket, because a published public lesson has to prerender and be indexable and a signed URL cannot live in a static page. A bucket is public for everything in it, so an image inside an `enrolled` or `specific` lesson is protected only by an unguessable path. That is the price of prerendering, and it is why attachments go to a separate private `lesson-files` bucket where `private.can_read_lesson_file()` applies the lesson's own visibility rule. The rule itself moved into `private.can_read_lesson()`, which the `lessons` select policy now calls, so a file and a lesson can never drift apart. SVG is allowed in neither bucket: it can carry script, and a figure does not need it. The select policy on `lesson-files` includes `anon`: a public lesson's attachments are for the visitors it was published to, and `private.can_read_lesson()` already answers correctly for them.

**D-051 — A photographed page never passes through the server.**
The browser asks a server action for a signed upload URL, resizes the photo itself, and sends the bytes straight to Storage. A server action would cap the request at 1 MB, report no progress to show the student, and pay for the same bytes twice. The signed URL lives two hours independently of the session, so a page taken on a weak connection can be retried after a reload. Resizing uses `createImageBitmap` and a canvas rather than a library: `createImageBitmap` already applies the EXIF rotation, and re-encoding drops EXIF altogether, which also removes the GPS tag from a photo taken by a minor. Supabase's own image transformations would make the thumbnail server-side, but they need the Pro plan and this project is on Free.

**D-052 — Object names are ids, never titles.**
Storage does not accept accented characters in an object name, so `Séance 1 — corrigé.pdf` cannot be a path. Every object is named with a uuid and the readable name lives in a column. A submission page is `<student_id>/<submission_ref>/<page_id>.webp`, where the middle segment is generated by the browser: the submission row does not exist yet when the photo is uploaded. The first segment is checked by the storage policy and again by `submit_exercise_answer`, because the tutor's correction view signs whatever path the row holds. A handed-in page is immutable. Students have no update policy on the bucket and may delete only pages that no submission holds, and `submit_exercise_answer` refuses a path whose object does not exist yet (`page_not_uploaded`), so bytes cannot be filled in or swapped after a reveal or a grade. Replacing a blurred page means uploading a new one and handing the new list in.

## Secret key usage

Every server-side use of `SUPABASE_SECRET_KEY`, and why the publishable key plus RLS isn't enough.

| Where                                    | What for                                                                     | Why it needs the secret key                                                                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Tutor "add a student" action (phase 0/1) | `auth.admin.createUser`, `auth.admin.getUserById`, `auth.admin.generateLink` | Creating another person's account, checking whether it was ever used, and issuing its set-password link are admin operations by definition. |
| `/api/cron/*` route handlers (phase 2)   | Read upcoming sessions and stamp `reminder_*_sent_at` for everyone           | A cron job has no signed-in user, so no RLS identity.                                                                                       |

The seed script does not use it (D-028).
