-- Chat: one conversation between the tutor and each student, one per group (DECISIONS.md,
-- D-080, D-081).
--
-- Who reads a conversation is decided by private.conversation_access(), which gives the moment
-- from which she reads it, or null:
--   * the tutor reads every conversation;
--   * a student reads her own, while her follow-up is active or paused (D-060);
--   * a group's current member reads its conversation from the day she joined (D-070): what
--     was said before she came, about other students, is not hers.
-- Every write goes through a function: send_message (a client-made id, so a retry after a
-- dropped connection never doubles a message; a rate limit; attachments checked against
-- storage) and mark_conversation_read. Realtime publishes messages and read marks, and applies
-- the same select policies to each subscriber.

-- ─────────────────────────────────────────────────────────────── conversations

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid unique references public.profiles (id) on delete cascade,
  -- A group with a conversation that holds messages has a history: it is not deleted.
  group_id uuid unique references public.groups (id) on delete restrict,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  check ((student_id is null) <> (group_id is null))
);

create index conversations_last_message_at_idx on public.conversations (last_message_at desc);

alter table public.conversations enable row level security;

-- Every student and every group has one, from the start.
create function private.create_student_conversation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if new.role = 'student' then
    insert into public.conversations (student_id) values (new.id) on conflict do nothing;
  end if;
  return new;
end;
$function$;

create trigger profiles_create_conversation
  after insert or update of role on public.profiles
  for each row execute function private.create_student_conversation();

create function private.create_group_conversation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  insert into public.conversations (group_id) values (new.id) on conflict do nothing;
  return new;
end;
$function$;

create trigger groups_create_conversation
  after insert on public.groups
  for each row execute function private.create_group_conversation();

-- A group deleted before anyone wrote in it takes its empty conversation along.
create function private.drop_empty_group_conversation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  delete from public.conversations c
  where c.group_id = old.id
    and not exists (select 1 from public.messages m where m.conversation_id = c.id);
  return old;
end;
$function$;

insert into public.conversations (student_id)
select p.id from public.profiles p where p.role = 'student'
on conflict do nothing;

insert into public.conversations (group_id)
select g.id from public.groups g
on conflict do nothing;

-- ─────────────────────────────────────────────────────────────── messages

create table public.messages (
  -- Made by the sender's device: the same message sent twice is one message.
  id uuid primary key,
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  -- Written when it is sent: in a group, students cannot read one another's profiles.
  sender_name text not null check (char_length(sender_name) <= 120),
  body text not null default '' check (char_length(body) <= 4000),
  -- [{path, name, type, size}], built by send_message from the stored objects.
  attachments jsonb not null default '[]'::jsonb
    check (jsonb_typeof(attachments) = 'array' and jsonb_array_length(attachments) <= 5),
  created_at timestamptz not null default now(),
  check (body <> '' or jsonb_array_length(attachments) > 0)
);

create index messages_conversation_created_idx on public.messages (conversation_id, created_at);
create index messages_sender_id_idx on public.messages (sender_id);
create index messages_attachments_idx on public.messages using gin (attachments jsonb_path_ops);

alter table public.messages enable row level security;

create trigger groups_drop_empty_conversation
  before delete on public.groups
  for each row execute function private.drop_empty_group_conversation();

-- ─────────────────────────────────────────────────────────────── read marks

create table public.conversation_reads (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  last_read_at timestamptz not null,
  primary key (conversation_id, profile_id)
);

create index conversation_reads_profile_id_idx on public.conversation_reads (profile_id);

alter table public.conversation_reads enable row level security;

-- ─────────────────────────────────────────────────────────────── access

create function private.conversation_access(p_conversation_id uuid)
returns timestamptz
language sql
stable
security definer
set search_path = ''
as $function$
  select case
    when (select private.is_tutor()) then '-infinity'::timestamptz
    when (select private.my_student_status()) is distinct from 'actif'
      and (select private.my_student_status()) is distinct from 'en_pause' then null
    when c.student_id is not null then
      case when c.student_id = (select auth.uid()) then '-infinity'::timestamptz end
    else (
      select gm.joined_at
      from public.group_members gm
      where gm.group_id = c.group_id
        and gm.student_id = (select auth.uid())
        and gm.left_at is null
    )
  end
  from public.conversations c
  where c.id = p_conversation_id;
$function$;

create policy "conversations: select who takes part"
  on public.conversations for select to authenticated
  using (private.conversation_access(id) is not null);

create policy "messages: select what she may read"
  on public.messages for select to authenticated
  using (created_at >= private.conversation_access(conversation_id));

-- Her own marks; the tutor's mark on a student's own conversation, for « Lu »; the tutor
-- reads them all. A group's members do not learn from here who else is in it.
create policy "conversation_reads: select own, or the other side of a direct conversation"
  on public.conversation_reads for select to authenticated
  using (
    private.conversation_access(conversation_id) is not null
    and (
      profile_id = (select auth.uid())
      or (select private.is_tutor())
      or exists (
        select 1 from public.conversations c
        where c.id = conversation_id and c.student_id is not null
      )
    )
  );

-- ─────────────────────────────────────────────────────────────── rate limits
-- Counters in fixed windows, touched only by functions: no role reads or writes them.

create table private.rate_limits (
  key text not null,
  window_start timestamptz not null,
  count integer not null,
  primary key (key, window_start)
);

revoke all on private.rate_limits from public, anon, authenticated;

create function private.take_rate_limit(p_key text, p_window_seconds integer, p_max integer)
returns boolean
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_start timestamptz :=
    to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  v_count integer;
begin
  insert into private.rate_limits (key, window_start, count)
  values (p_key, v_start, 1)
  on conflict (key, window_start) do update set count = private.rate_limits.count + 1
  returning count into v_count;
  delete from private.rate_limits where key = p_key and window_start < now() - interval '1 day';
  return v_count <= p_max;
end;
$function$;

-- ─────────────────────────────────────────────────────────────── files

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'message-files', 'message-files', false, 10485760,
  array['image/jpeg', 'image/webp', 'image/png', 'application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- `<conversation_id>/<sender_id>/<file_id>.<ext>`: ids only (D-052).
create function private.is_message_file_name(p_name text)
returns boolean
language sql
immutable
set search_path = ''
as $function$
  select coalesce(p_name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(webp|jpg|png|pdf)$', false);
$function$;

-- She uploads into her own folder of a conversation she takes part in, and leaves at most
-- twenty files that no message holds.
create function private.can_upload_message_file(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $function$
begin
  if not private.is_message_file_name(p_name)
     or split_part(p_name, '/', 2) <> (select auth.uid())::text
     or private.conversation_access(split_part(p_name, '/', 1)::uuid) is null then
    return false;
  end if;
  return (
    select count(*)
    from storage.objects o
    where o.bucket_id = 'message-files'
      and split_part(o.name, '/', 2) = (select auth.uid())::text
      and not exists (
        select 1 from public.messages m
        where m.attachments @> jsonb_build_array(jsonb_build_object('path', o.name))
      )
  ) < 20;
end;
$function$;

-- A file is read by whoever may read the message that holds it, and by its sender.
create function private.can_read_message_file(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $function$
declare
  v_from timestamptz;
begin
  if not private.is_message_file_name(p_name) then
    return false;
  end if;
  v_from := private.conversation_access(split_part(p_name, '/', 1)::uuid);
  if v_from is null then
    return false;
  end if;
  return split_part(p_name, '/', 2) = (select auth.uid())::text
    or exists (
      select 1
      from public.messages m
      where m.conversation_id = split_part(p_name, '/', 1)::uuid
        and m.created_at >= v_from
        and m.attachments @> jsonb_build_array(jsonb_build_object('path', p_name))
    );
end;
$function$;

create policy "message files: a participant uploads into her own folder"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'message-files' and private.can_upload_message_file(name));

create policy "message files: readable with the message that holds them"
  on storage.objects for select to authenticated
  using (bucket_id = 'message-files' and private.can_read_message_file(name));

-- A file she gave up before sending goes; one a message holds stays.
create policy "message files: the sender removes what no message holds"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'message-files'
    and private.is_message_file_name(name)
    and split_part(name, '/', 2) = (select auth.uid())::text
    and not exists (
      select 1 from public.messages m
      where m.attachments @> jsonb_build_array(jsonb_build_object('path', objects.name))
    )
  );

-- ─────────────────────────────────────────────────────────────── writing

create function public.send_message(
  p_id uuid,
  p_conversation_id uuid,
  p_body text default '',
  p_attachments text[] default '{}'
)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_me uuid := (select auth.uid());
  v_existing public.messages;
  v_body text := btrim(coalesce(p_body, ''));
  v_paths text[] := coalesce(p_attachments, '{}');
  v_files jsonb;
  v_student uuid;
  v_created timestamptz;
begin
  if v_me is null or p_id is null then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  -- Sent already, and the answer lost on the way: the same message, once.
  select * into v_existing from public.messages m where m.id = p_id;
  if found then
    if v_existing.sender_id = v_me and v_existing.conversation_id = p_conversation_id then
      return v_existing.created_at;
    end if;
    raise exception 'id_taken' using errcode = 'P0001';
  end if;

  if private.conversation_access(p_conversation_id) is null then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  -- A stopped student reads nothing: writing to her is writing to no one.
  select c.student_id into v_student from public.conversations c where c.id = p_conversation_id;
  if v_student is not null and not exists (
    select 1 from public.profiles p where p.id = v_student and p.status in ('actif', 'en_pause')
  ) then
    raise exception 'recipient_inactive' using errcode = 'P0001';
  end if;

  if char_length(v_body) > 4000 then
    raise exception 'body_too_long' using errcode = 'P0001';
  end if;
  if cardinality(v_paths) > 5
     or cardinality(v_paths) <> (select count(distinct x) from unnest(v_paths) as u (x)) then
    raise exception 'attachments_invalid' using errcode = 'P0001';
  end if;
  if v_body = '' and cardinality(v_paths) = 0 then
    raise exception 'empty' using errcode = 'P0001';
  end if;

  -- Each file: in her folder of this conversation, stored, and held by no other message.
  -- Its type and size are read from storage, not from what the page says.
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'path', o.name,
      'type', o.metadata ->> 'mimetype',
      'size', (o.metadata ->> 'size')::bigint,
      'name', coalesce(nullif(left(o.user_metadata ->> 'filename', 120), ''), 'fichier')
    )
    order by u.ordinality
  ), '[]'::jsonb)
  into v_files
  from unnest(v_paths) with ordinality as u (path, ordinality)
  join storage.objects o on o.bucket_id = 'message-files' and o.name = u.path
  where private.is_message_file_name(u.path)
    and split_part(u.path, '/', 1) = p_conversation_id::text
    and split_part(u.path, '/', 2) = v_me::text
    and not exists (
      select 1 from public.messages m
      where m.attachments @> jsonb_build_array(jsonb_build_object('path', u.path))
    );
  if jsonb_array_length(v_files) <> cardinality(v_paths) then
    raise exception 'attachments_invalid' using errcode = 'P0001';
  end if;

  -- Twenty a minute and two hundred an hour: more than anyone types, less than a script.
  if not private.take_rate_limit('message:minute:' || v_me, 60, 20)
     or not private.take_rate_limit('message:hour:' || v_me, 3600, 200) then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  insert into public.messages (id, conversation_id, sender_id, sender_name, body, attachments)
  values (
    p_id,
    p_conversation_id,
    v_me,
    coalesce((select p.full_name from public.profiles p where p.id = v_me), ''),
    v_body,
    v_files
  )
  returning created_at into v_created;

  update public.conversations set last_message_at = v_created where id = p_conversation_id;

  -- What she wrote, she has read.
  insert into public.conversation_reads (conversation_id, profile_id, last_read_at)
  values (p_conversation_id, v_me, v_created)
  on conflict (conversation_id, profile_id)
  do update set last_read_at = greatest(public.conversation_reads.last_read_at, excluded.last_read_at);

  return v_created;
end;
$function$;

create function public.mark_conversation_read(p_conversation_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if (select auth.uid()) is null or private.conversation_access(p_conversation_id) is null then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  insert into public.conversation_reads (conversation_id, profile_id, last_read_at)
  values (p_conversation_id, (select auth.uid()), now())
  on conflict (conversation_id, profile_id)
  do update set last_read_at = greatest(public.conversation_reads.last_read_at, excluded.last_read_at);
end;
$function$;

-- The conversations she takes part in, the latest first, with their last message and how many
-- she has not read. It runs with her own rights: the policies above decide every row.
create function public.my_inbox()
returns table (
  conversation_id uuid,
  student_id uuid,
  student_name text,
  student_status public.student_status,
  group_id uuid,
  group_name text,
  last_message_at timestamptz,
  last_body text,
  last_sender_id uuid,
  last_sender_name text,
  last_files integer,
  unread integer
)
language sql
stable
security invoker
set search_path = ''
as $function$
  select
    c.id,
    c.student_id,
    p.full_name,
    p.status,
    c.group_id,
    g.name,
    lm.created_at,
    lm.body,
    lm.sender_id,
    lm.sender_name,
    coalesce(jsonb_array_length(lm.attachments), 0),
    (
      select count(*)::integer
      from public.messages m
      where m.conversation_id = c.id
        and m.sender_id <> (select auth.uid())
        and m.created_at > coalesce(r.last_read_at, '-infinity'::timestamptz)
    )
  from public.conversations c
  left join public.profiles p on p.id = c.student_id
  left join public.groups g on g.id = c.group_id
  left join public.conversation_reads r
    on r.conversation_id = c.id and r.profile_id = (select auth.uid())
  left join lateral (
    select m.created_at, m.body, m.sender_id, m.sender_name, m.attachments
    from public.messages m
    where m.conversation_id = c.id
    order by m.created_at desc
    limit 1
  ) lm on true
  order by lm.created_at desc nulls last, coalesce(p.full_name, g.name);
$function$;

revoke execute on function public.send_message(uuid, uuid, text, text[]) from public, anon;
grant execute on function public.send_message(uuid, uuid, text, text[]) to authenticated;
revoke execute on function public.mark_conversation_read(uuid) from public, anon;
grant execute on function public.mark_conversation_read(uuid) to authenticated;
revoke execute on function public.my_inbox() from public, anon;
grant execute on function public.my_inbox() to authenticated;

-- ─────────────────────────────────────────────────────────────── realtime

alter publication supabase_realtime add table public.messages, public.conversation_reads;

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
