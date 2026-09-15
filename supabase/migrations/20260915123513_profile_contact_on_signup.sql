-- Sign-up now stores the contact details the brief lists for a new profile (§4.1): the
-- student's phone, school and guardian contact, taken from user_metadata.
--
-- It also narrows `provisioned_by` to the seed. Supabase Auth's admin API writes app_metadata
-- only after the auth.users INSERT, so the trigger never sees a marker set that way; accounts
-- the tutor creates are proved by a one-use invite code in user_metadata instead
-- (DECISIONS.md, D-025). The seed writes auth.users directly, so its marker is present.

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_code text := upper(nullif(trim(v_meta ->> 'invite_code'), ''));
  v_seeded boolean := coalesce(new.raw_app_meta_data ->> 'provisioned_by', '') = 'seed';
  v_invite public.invite_codes;
  v_level text;
  v_phone text := nullif(trim(v_meta ->> 'phone'), '');
  v_guardian_phone text := nullif(trim(v_meta ->> 'guardian_phone'), '');
begin
  if v_code is not null then
    select * into v_invite
    from public.invite_codes
    where code = v_code
    for update;

    if not found
       or v_invite.used_count >= v_invite.max_uses
       or (v_invite.expires_at is not null and v_invite.expires_at <= now()) then
      raise exception 'invite_code_invalid' using errcode = 'P0001';
    end if;

    update public.invite_codes
    set used_count = used_count + 1
    where code = v_code;

    v_level := v_invite.level_code;
  elsif v_seeded then
    v_level := nullif(new.raw_app_meta_data ->> 'level_code', '');
  else
    raise exception 'invite_code_required' using errcode = 'P0001';
  end if;

  -- Contact details come from the person signing up, so a malformed value is dropped rather
  -- than failing the whole sign-up on a check constraint.
  if v_phone !~ '^\+?[0-9 ]{6,20}$' then
    v_phone := null;
  end if;
  if v_guardian_phone !~ '^\+?[0-9 ]{6,20}$' then
    v_guardian_phone := null;
  end if;

  insert into public.profiles (
    id, role, full_name, email, level_code, phone, school, guardian_name, guardian_phone
  )
  values (
    new.id,
    'student',
    left(coalesce(v_meta ->> 'full_name', ''), 120),
    new.email,
    v_level,
    v_phone,
    left(nullif(trim(v_meta ->> 'school'), ''), 120),
    left(nullif(trim(v_meta ->> 'guardian_name'), ''), 120),
    v_guardian_phone
  );

  insert into public.student_settings (student_id) values (new.id);

  if v_invite.group_id is not null then
    insert into public.group_members (group_id, student_id)
    values (v_invite.group_id, new.id)
    on conflict do nothing;
  end if;

  return new;
end;
$$;
