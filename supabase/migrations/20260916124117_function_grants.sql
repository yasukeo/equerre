-- Takes EXECUTE away from roles that have no reason to call these functions.
-- The security advisor flags every `security definer` function reachable through
-- the REST API, and two of the three were reachable without signing in at all.

-- Every submission comes from a signed-in student. The function already refuses
-- an anonymous caller, but the endpoint should not exist for `anon` in the first place.
revoke execute on function public.submit_exercise_answer(uuid, uuid, jsonb, text[]) from anon;

-- Supabase's own event trigger, which turns row level security on for every new table
-- in `public`. Event triggers fire on DDL whatever the grants say, so the safety net
-- survives untouched; this only takes the function out of the exposed REST API.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

-- public.invite_code_is_valid keeps both of its grants on purpose: the sign-up form
-- calls it as `anon` before the account exists, and the tutor checks a code she has
-- just created while signed in (tests/rls/provisioning.test.ts).
