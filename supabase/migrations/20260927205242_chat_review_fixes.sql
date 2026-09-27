-- What the review of the chat found (DECISIONS.md, D-083).
--
--  * A file's sender could delete it, then write other content under its name, once she had
--    lost sight of the message that holds it: the "held" check read messages with her own
--    rights. It is now made with the function's, and a held name is never written again.
--  * A student added back to a group read everything said while she was away: the chat reads
--    a group from `chat_from`, the day she joined or came back.
--  * mark_conversation_read stamped now(), and Realtime told the other side each time the page
--    was opened. The mark is now the newest message from the others she has on screen, and
--    it moves only when that changes.
--  * Files had a count per minute but no weight: 60 MB a day for a student, 300 for the tutor.
--    The ceiling on files no message holds counts in her folder of that conversation.
--  * An empty message made of line breaks passed; Realtime published deletions, whose keys it
--    sends to every subscriber whatever the policies say.
--  * Sending marked the sender as having read everything up to it, messages she never saw
--    included, and two sends of one id at once failed on the key instead of agreeing.
--  * Files given up before sending counted against her forever: only the last day's count, and
--    a job removes them after a day.

-- ─────────────────────────────────────────────────────────────── held files

create function private.message_file_is_held(p_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.messages m
    -- CASE keeps the cast from running on a name that is not an id.
    where m.conversation_id = (
        case when private.is_message_file_name(p_name) then split_part(p_name, '/', 1)::uuid end
      )
      and m.attachments @> jsonb_build_array(jsonb_build_object('path', p_name))
  );
$function$;

create or replace function private.can_upload_message_file(p_name text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $function$
begin
  if not private.is_message_file_name(p_name)
     or split_part(p_name, '/', 2) <> (select auth.uid())::text
     or private.conversation_access(split_part(p_name, '/', 1)::uuid) is null
     -- A name a message holds is never written again, even when its object is gone.
     or private.message_file_is_held(p_name) then
    return false;
  end if;
  return (
    select count(*)
    from storage.objects o
    where o.bucket_id = 'message-files'
      and o.name like split_part(p_name, '/', 1) || '/' || split_part(p_name, '/', 2) || '/%'
      and o.created_at > now() - interval '1 day'
      and not private.message_file_is_held(o.name)
  ) < 20;
end;
$function$;

drop policy "message files: the sender removes what no message holds" on storage.objects;

create policy "message files: the sender removes what no message holds"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'message-files'
    and private.is_message_file_name(name)
    and split_part(name, '/', 2) = (select auth.uid())::text
    and not private.message_file_is_held(name)
  );

-- ─────────────────────────────────────────────────────────────── back in a group

alter table public.group_members add column chat_from timestamptz;

update public.group_members set chat_from = joined_at;

alter table public.group_members
  alter column chat_from set default now(),
  alter column chat_from set not null;

create function private.reset_chat_from()
returns trigger
language plpgsql
set search_path = ''
as $function$
begin
  -- Back after leaving: the homework and sessions of her first period stay hers (D-070), but
  -- what the group said while she was away does not.
  if old.left_at is not null and new.left_at is null then
    new.chat_from := now();
  end if;
  return new;
end;
$function$;

create trigger group_members_reset_chat_from
  before update of left_at on public.group_members
  for each row execute function private.reset_chat_from();

create or replace function private.conversation_access(p_conversation_id uuid)
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
      select greatest(gm.joined_at, gm.chat_from)
      from public.group_members gm
      where gm.group_id = c.group_id
        and gm.student_id = (select auth.uid())
        and gm.left_at is null
    )
  end
  from public.conversations c
  where c.id = p_conversation_id;
$function$;

-- ─────────────────────────────────────────────────────────────── read marks

drop function public.mark_conversation_read(uuid);

-- Read up to the newest message of the others that she has on screen (`p_up_to`), and no
-- further: the mark says what she has read, not when she last looked, and it moves only
-- forward, so opening a conversation again tells the other side nothing.
create function public.mark_conversation_read(p_conversation_id uuid, p_up_to timestamptz)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_me uuid := (select auth.uid());
  v_from timestamptz;
  v_newest timestamptz;
begin
  v_from := private.conversation_access(p_conversation_id);
  if v_me is null or v_from is null then
    raise exception 'not_allowed' using errcode = '42501';
  end if;

  select max(m.created_at) into v_newest
  from public.messages m
  where m.conversation_id = p_conversation_id
    and m.sender_id <> v_me
    and m.created_at >= v_from
    and m.created_at <= p_up_to;
  if v_newest is null then
    return;
  end if;

  insert into public.conversation_reads (conversation_id, profile_id, last_read_at)
  values (p_conversation_id, v_me, v_newest)
  on conflict (conversation_id, profile_id)
  do update set last_read_at = excluded.last_read_at
  where public.conversation_reads.last_read_at < excluded.last_read_at;
end;
$function$;

revoke execute on function public.mark_conversation_read(uuid, timestamptz) from public, anon;
grant execute on function public.mark_conversation_read(uuid, timestamptz) to authenticated;

-- ─────────────────────────────────────────────────────────────── sending

create or replace function public.send_message(
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
  v_body text := btrim(coalesce(p_body, ''), E' \t\r\n\f');
  v_paths text[] := coalesce(p_attachments, '{}');
  v_files jsonb;
  v_student uuid;
  v_created timestamptz;
  v_bytes bigint;
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

  -- One sender at a time: two sends cannot attach the same file, nor both pass the budget.
  perform pg_advisory_xact_lock(hashtext('public.send_message:' || v_me::text));

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
    and not private.message_file_is_held(u.path);
  if jsonb_array_length(v_files) <> cardinality(v_paths) then
    raise exception 'attachments_invalid' using errcode = 'P0001';
  end if;

  -- Twenty a minute and two hundred an hour: more than anyone types, less than a script.
  if not private.take_rate_limit('message:minute:' || v_me, 60, 20)
     or not private.take_rate_limit('message:hour:' || v_me, 3600, 200) then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  -- And a weight a day: files stay as long as their messages, which stay for good.
  if jsonb_array_length(v_files) > 0 then
    select coalesce(sum((f ->> 'size')::bigint), 0) into v_bytes
    from public.messages m, jsonb_array_elements(m.attachments) f
    where m.sender_id = v_me and m.created_at > now() - interval '1 day';
    v_bytes := v_bytes + (select coalesce(sum((f ->> 'size')::bigint), 0) from jsonb_array_elements(v_files) f);
    if v_bytes > (case when (select private.is_tutor()) then 300 else 60 end) * 1024 * 1024 then
      raise exception 'too_heavy_today' using errcode = 'P0001';
    end if;
  end if;

  insert into public.messages (id, conversation_id, sender_id, sender_name, body, attachments, created_at)
  values (
    p_id,
    p_conversation_id,
    v_me,
    coalesce((select p.full_name from public.profiles p where p.id = v_me), ''),
    v_body,
    v_files,
    -- The moment it is written, not the start of the call: an order readers can rely on.
    clock_timestamp()
  )
  on conflict (id) do nothing
  returning created_at into v_created;

  -- Two tabs sent it at once: the other one wrote it, and the answer is the same.
  if v_created is null then
    select * into v_existing from public.messages m where m.id = p_id;
    if v_existing.sender_id = v_me and v_existing.conversation_id = p_conversation_id then
      return v_existing.created_at;
    end if;
    raise exception 'id_taken' using errcode = 'P0001';
  end if;

  update public.conversations set last_message_at = v_created where id = p_conversation_id;

  -- Her read mark does not move: messages that came while she wrote are still unread.
  return v_created;
end;
$function$;

-- Files given up before sending, a day on: for the scheduled job, with the secret key only.
create function public.stale_message_files(p_limit integer default 200)
returns setof text
language sql
stable
security definer
set search_path = ''
as $function$
  select o.name
  from storage.objects o
  where o.bucket_id = 'message-files'
    and o.created_at < now() - interval '1 day'
    and not private.message_file_is_held(o.name)
  order by o.created_at
  limit least(greatest(p_limit, 1), 1000);
$function$;

revoke execute on function public.stale_message_files(integer) from public, anon, authenticated;
grant execute on function public.stale_message_files(integer) to service_role;

-- ─────────────────────────────────────────────────────────────── realtime

-- A deletion's old keys reach every subscriber whatever the policies say: only inserts and
-- updates are published.
alter publication supabase_realtime set (publish = 'insert, update');

revoke execute on all functions in schema private from public;
grant execute on all functions in schema private to anon, authenticated, service_role;
