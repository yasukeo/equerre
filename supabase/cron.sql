-- Reminders and email digests every 15 minutes (DECISIONS.md, D-064, D-078).
--
-- Not a migration: it holds a secret and the site's address, so it is run once, by hand, in
-- the Supabase SQL editor, when the app goes live. Before running it:
--
--   1. Put the same random string (32+ characters) in Vercel as CRON_SECRET, and redeploy.
--   2. Replace <CRON_SECRET> and <SITE_URL> below (SITE_URL without a trailing slash, e.g.
--      https://equerre.ma). Never commit the file with the secret in it.
--
-- The secret goes into Vault, so it never sits in the job's text, which any database role
-- that can read cron.job would see.

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

select vault.create_secret('<CRON_SECRET>', 'cron_secret', 'Bearer token for /api/cron/rappels');

select cron.schedule(
  'equerre-rappels',
  '*/15 * * * *',
  $job$
  select net.http_post(
    url := '<SITE_URL>/api/cron/rappels',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (
        select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'
      )
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
  $job$
);

-- To check it runs (each call's answer, 200 when all is well):
--   select status_code, content, created from net._http_response order by created desc limit 5;
-- To change the secret later:
--   select vault.update_secret(
--     (select id from vault.secrets where name = 'cron_secret'), '<NEW_CRON_SECRET>'
--   );
-- To stop it:
--   select cron.unschedule('equerre-rappels');
