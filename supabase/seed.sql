-- Development seed for Équerre:
-- 1 tutor, 8 students, 3 groups, 9 chapters, 12 lessons, 30 exercises, 40 sessions.
--
-- Run it with `pnpm db:seed`, which replaces {{SEED_PASSWORD}} with SEED_PASSWORD from
-- .env.local. Seed accounts use the reserved .test domain: sign in with the password.
--
-- Safe to re-run. Fixed rows use fixed ids and are updated in place; the sessions of seed
-- accounts are rebuilt around the current week. If a real tutor already exists, the
-- unique-tutor index makes the whole seed fail rather than create a second one.

begin;

-- Refuse to run the raw file (for example from `supabase db reset`): every seed account would
-- get the placeholder as its password. `pnpm db:seed` substitutes both occurrences below.
do $$
begin
  if '{{SEED_PASSWORD}}' like '{{%' then
    raise exception 'Run pnpm db:seed: SEED_PASSWORD was not substituted into seed.sql.';
  end if;
end;
$$;

-- ─────────────────────────────────────────────────────────────── helpers (this session only)

create or replace function pg_temp.uid(prefix text, n integer)
returns uuid
language sql
immutable
as $$
  select (prefix || '-0000-4000-8000-' || lpad(n::text, 12, '0'))::uuid;
$$;

-- Splits "text $latex$ text" into Tiptap text and inlineMath nodes.
create or replace function pg_temp.inline(src text)
returns jsonb
language plpgsql
immutable
as $$
declare
  parts text[] := string_to_array(src, '$');
  nodes jsonb := '[]'::jsonb;
begin
  for i in 1 .. coalesce(array_length(parts, 1), 0) loop
    continue when parts[i] = '';
    if i % 2 = 1 then
      nodes := nodes || jsonb_build_array(jsonb_build_object('type', 'text', 'text', parts[i]));
    else
      nodes := nodes || jsonb_build_array(
        jsonb_build_object('type', 'inlineMath', 'attrs', jsonb_build_object('latex', parts[i]))
      );
    end if;
  end loop;
  return nodes;
end;
$$;

create or replace function pg_temp.p(src text)
returns jsonb
language sql
immutable
as $$
  select jsonb_build_object('type', 'paragraph', 'content', pg_temp.inline(src));
$$;

create or replace function pg_temp.h(src text)
returns jsonb
language sql
immutable
as $$
  select jsonb_build_object(
    'type', 'heading',
    'attrs', jsonb_build_object('level', 2),
    'content', pg_temp.inline(src)
  );
$$;

create or replace function pg_temp.m(latex text)
returns jsonb
language sql
immutable
as $$
  select jsonb_build_object('type', 'blockMath', 'attrs', jsonb_build_object('latex', latex));
$$;

create or replace function pg_temp.box(kind text, variadic blocks jsonb[])
returns jsonb
language sql
immutable
as $$
  select jsonb_build_object(
    'type', 'callout',
    'attrs', jsonb_build_object('kind', kind),
    'content', to_jsonb(blocks)
  );
$$;

create or replace function pg_temp.doc(variadic blocks jsonb[])
returns jsonb
language sql
immutable
as $$
  select jsonb_build_object('type', 'doc', 'content', to_jsonb(blocks));
$$;

create or replace function pg_temp.choices(variadic labels text[])
returns jsonb
language sql
immutable
as $$
  select jsonb_agg(jsonb_build_object('id', chr(96 + i), 'label', labels[i]) order by i)
  from generate_subscripts(labels, 1) as i;
$$;

create or replace function pg_temp.seed_user(p_n integer, p_email text, p_full_name text, p_level text)
returns void
language plpgsql
as $$
declare
  v_id uuid := pg_temp.uid('00000000', p_n);
begin
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new, email_change,
    email_change_token_current, phone_change, phone_change_token, reauthentication_token
  )
  values (
    '00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated', p_email,
    extensions.crypt('{{SEED_PASSWORD}}', extensions.gen_salt('bf')), now(),
    jsonb_build_object(
      'provider', 'email',
      'providers', jsonb_build_array('email'),
      'provisioned_by', 'seed',
      'level_code', p_level
    ),
    jsonb_build_object('full_name', p_full_name),
    now(), now(),
    '', '', '', '', '', '', '', ''
  )
  -- Re-seeding applies the current SEED_PASSWORD and metadata to existing accounts.
  on conflict (id) do update set
    email = excluded.email,
    encrypted_password = excluded.encrypted_password,
    raw_app_meta_data = excluded.raw_app_meta_data,
    raw_user_meta_data = excluded.raw_user_meta_data,
    updated_at = now();

  insert into auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values (
    gen_random_uuid(), v_id::text, v_id,
    jsonb_build_object('sub', v_id::text, 'email', p_email, 'email_verified', true),
    'email', now(), now(), now()
  )
  on conflict (provider_id, provider) do nothing;
end;
$$;

create or replace function pg_temp.seed_exercise(
  p_n integer,
  p_chapter integer,
  p_title text,
  p_difficulty integer,
  p_type public.answer_type,
  p_statement jsonb,
  p_solution jsonb,
  p_tags text[],
  p_numeric numeric default null,
  p_tolerance numeric default null,
  p_choices jsonb default null,
  p_correct text[] default null
)
returns void
language plpgsql
as $$
begin
  insert into public.exercises (id, chapter_id, title, statement, difficulty, answer_type, choices, tags)
  values (
    pg_temp.uid('40000000', p_n), pg_temp.uid('20000000', p_chapter),
    p_title, p_statement, p_difficulty, p_type, p_choices, p_tags
  )
  on conflict (id) do update set
    chapter_id = excluded.chapter_id,
    title = excluded.title,
    statement = excluded.statement,
    difficulty = excluded.difficulty,
    answer_type = excluded.answer_type,
    choices = excluded.choices,
    tags = excluded.tags;

  insert into public.exercise_solutions (exercise_id, solution, correct_numeric, tolerance, correct_choice_ids)
  values (pg_temp.uid('40000000', p_n), p_solution, p_numeric, p_tolerance, p_correct)
  on conflict (exercise_id) do update set
    solution = excluded.solution,
    correct_numeric = excluded.correct_numeric,
    tolerance = excluded.tolerance,
    correct_choice_ids = excluded.correct_choice_ids;
end;
$$;

-- ─────────────────────────────────────────────────────────────── people

select pg_temp.seed_user(1, 'prof@equerre.test', 'Prénom Nom', null);

update public.profiles
set role = 'tutor', level_code = null, phone = '+212 600 000 001'
where id = pg_temp.uid('00000000', 1);

delete from public.student_settings where student_id = pg_temp.uid('00000000', 1);

select pg_temp.seed_user(101, 'salma.alaoui@equerre.test', 'Salma Alaoui', '2BAC-PC');
select pg_temp.seed_user(102, 'omar.elidrissi@equerre.test', 'Omar El Idrissi', '2BAC-PC');
select pg_temp.seed_user(103, 'rayane.amrani@equerre.test', 'Rayane Amrani', '2BAC-SVT');
select pg_temp.seed_user(104, 'imane.chraibi@equerre.test', 'Imane Chraibi', '2BAC-SMA');
select pg_temp.seed_user(105, 'yassine.bennani@equerre.test', 'Yassine Bennani', '1BAC-SM');
select pg_temp.seed_user(106, 'nour.fassi@equerre.test', 'Nour Fassi', '1BAC-SM');
select pg_temp.seed_user(107, 'hiba.tazi@equerre.test', 'Hiba Tazi', 'TC');
select pg_temp.seed_user(108, 'adam.berrada@equerre.test', 'Adam Berrada', '3AC');

update public.profiles as p
set
  phone = v.phone,
  school = v.school,
  guardian_name = v.guardian_name,
  guardian_phone = v.guardian_phone,
  status = v.status::public.student_status
from (
  values
    (101, '+212 611 000 101', 'Lycée Ibn Sina', 'Karim Alaoui', '+212 661 000 101', 'actif'),
    (102, '+212 611 000 102', 'Lycée Al Farabi', 'Nadia El Idrissi', '+212 661 000 102', 'actif'),
    (103, null, 'Lycée Ibn Sina', 'Samir Amrani', '+212 661 000 103', 'actif'),
    (104, '+212 611 000 104', 'Lycée Al Khawarizmi', 'Leila Chraibi', '+212 661 000 104', 'actif'),
    (105, '+212 611 000 105', 'Lycée Al Farabi', 'Hassan Bennani', '+212 661 000 105', 'actif'),
    (106, null, 'Lycée Moulay Ismail', 'Zineb Fassi', '+212 661 000 106', 'actif'),
    (107, '+212 611 000 107', 'Lycée Ibn Khaldoun', 'Rachid Tazi', '+212 661 000 107', 'actif'),
    (108, null, 'Collège Al Massira', 'Fatima Berrada', '+212 661 000 108', 'en_pause')
) as v (n, phone, school, guardian_name, guardian_phone, status)
where p.id = pg_temp.uid('00000000', v.n);

update public.student_settings as s
set auto_confirm_bookings = v.auto_confirm, objectives = v.objectives
from (
  values
    (101, true, 'Viser 16 à l''examen national. Consolider limites et dérivation.'),
    (104, true, 'Préparer les concours des classes préparatoires.'),
    (107, false, 'Reprendre confiance en calcul algébrique.')
) as v (n, auto_confirm, objectives)
where s.student_id = pg_temp.uid('00000000', v.n);

insert into public.student_notes (id, student_id, body)
values
  (pg_temp.uid('60000000', 1), pg_temp.uid('00000000', 101),
   'Très à l''aise à l''oral, perd des points à la rédaction. Insister sur les justifications.'),
  (pg_temp.uid('60000000', 2), pg_temp.uid('00000000', 108),
   'Pause demandée par sa mère jusqu''aux vacances. Relancer mi-octobre.')
on conflict (id) do update set body = excluded.body;

-- ─────────────────────────────────────────────────────────────── groups

insert into public.groups (id, name, level_code, schedule_label)
values
  (pg_temp.uid('10000000', 1), '2BAC sciences — mardi 18h', '2BAC-PC', 'Mardi 18:00 – 20:00'),
  (pg_temp.uid('10000000', 2), '1BAC SM — samedi 10h', '1BAC-SM', 'Samedi 10:00 – 12:00'),
  (pg_temp.uid('10000000', 3), '3AC et tronc commun — mercredi 15h', null, 'Mercredi 15:00 – 17:00')
on conflict (id) do update set
  name = excluded.name,
  level_code = excluded.level_code,
  schedule_label = excluded.schedule_label;

insert into public.group_members (group_id, student_id)
select pg_temp.uid('10000000', g), pg_temp.uid('00000000', s)
from (values (1, 101), (1, 102), (1, 103), (2, 105), (2, 106), (3, 107), (3, 108)) as m (g, s)
on conflict do nothing;

-- A reusable code for trying self sign-up: joins 2BAC-PC and the Tuesday group.
insert into public.invite_codes (code, level_code, group_id, max_uses, expires_at)
values ('BACPC2K7', '2BAC-PC', pg_temp.uid('10000000', 1), 5, now() + interval '30 days')
on conflict (code) do update set
  level_code = excluded.level_code,
  group_id = excluded.group_id,
  max_uses = excluded.max_uses,
  used_count = 0,
  expires_at = excluded.expires_at;

-- ─────────────────────────────────────────────────────────────── chapters

insert into public.chapters (id, level_code, title, slug, position, description)
values
  (pg_temp.uid('20000000', 1), '2BAC-PC', 'Limites et continuité', 'limites-et-continuite', 1,
   'Limites, opérations, formes indéterminées, continuité et théorème des valeurs intermédiaires.'),
  (pg_temp.uid('20000000', 2), '2BAC-PC', 'Dérivation et étude de fonctions', 'derivation', 2,
   'Nombre dérivé, tangente, signe de la dérivée et variations.'),
  (pg_temp.uid('20000000', 3), '2BAC-PC', 'Suites numériques', 'suites-numeriques', 3,
   'Suites arithmétiques et géométriques, récurrence, convergence.'),
  (pg_temp.uid('20000000', 4), '2BAC-SMA', 'Nombres complexes', 'nombres-complexes', 1,
   'Forme algébrique, conjugué, module et équations du second degré dans ℂ.'),
  (pg_temp.uid('20000000', 5), '1BAC-SM', 'Barycentre dans le plan', 'barycentre', 1,
   'Barycentre de deux ou trois points pondérés et lignes de niveau.'),
  (pg_temp.uid('20000000', 6), '1BAC-SM', 'Produit scalaire', 'produit-scalaire', 2,
   'Définitions, expression analytique, Al-Kashi et équations de cercles.'),
  (pg_temp.uid('20000000', 7), 'TC', 'Arithmétique dans ℕ', 'arithmetique', 1,
   'Divisibilité, nombres premiers, PGCD et PPCM.'),
  (pg_temp.uid('20000000', 8), '3AC', 'Théorème de Thalès', 'theoreme-de-thales', 1,
   'Le théorème, sa réciproque et les calculs de longueurs.'),
  (pg_temp.uid('20000000', 9), '3AC', 'Équations et inéquations', 'equations-et-inequations', 2,
   'Équations et inéquations du premier degré à une inconnue.')
on conflict (id) do update set
  level_code = excluded.level_code,
  title = excluded.title,
  slug = excluded.slug,
  position = excluded.position,
  description = excluded.description;

-- ─────────────────────────────────────────────────────────────── lessons

insert into public.lessons (id, chapter_id, title, slug, summary, content, position, status, visibility, published_at)
values
  (
    pg_temp.uid('30000000', 1), pg_temp.uid('20000000', 1),
    'Limite d''une fonction', 'limite-d-une-fonction',
    'Limite finie en un point, opérations sur les limites et formes indéterminées.',
    pg_temp.doc(
      pg_temp.h('Limite finie en un point'),
      pg_temp.box('definition',
        pg_temp.p('Soit $f$ une fonction définie au voisinage de $a$. On dit que $f$ admet pour limite le réel $\ell$ en $a$ si $f(x)$ devient aussi proche que l''on veut de $\ell$ dès que $x$ est assez proche de $a$. On note :'),
        pg_temp.m('\lim_{x \to a} f(x) = \ell')),
      pg_temp.h('Opérations sur les limites'),
      pg_temp.box('propriete',
        pg_temp.p('Si $\lim_{x \to a} f(x) = \ell$ et $\lim_{x \to a} g(x) = \ell''$, alors $\lim_{x \to a} (f + g)(x) = \ell + \ell''$ et $\lim_{x \to a} (fg)(x) = \ell\,\ell''$.')),
      pg_temp.box('attention',
        pg_temp.p('Les formes $\infty - \infty$, $0 \times \infty$, $\dfrac{0}{0}$ et $\dfrac{\infty}{\infty}$ sont indéterminées : transformez l''expression avant de conclure.')),
      pg_temp.box('exemple',
        pg_temp.p('Pour $x \neq 1$, $\dfrac{x^2 - 1}{x - 1} = x + 1$, donc :'),
        pg_temp.m('\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2'))
    ),
    1, 'published', 'enrolled', now() - interval '21 days'
  ),
  (
    pg_temp.uid('30000000', 2), pg_temp.uid('20000000', 1),
    'Continuité et théorème des valeurs intermédiaires', 'continuite-et-tvi',
    'Continuité en un point, sur un intervalle, et existence de solutions d''une équation.',
    pg_temp.doc(
      pg_temp.h('Continuité en un point'),
      pg_temp.box('definition',
        pg_temp.p('Une fonction $f$ définie sur un intervalle $I$ contenant $a$ est continue en $a$ si $\lim_{x \to a} f(x) = f(a)$.')),
      pg_temp.h('Théorème des valeurs intermédiaires'),
      pg_temp.box('theoreme',
        pg_temp.p('Si $f$ est continue sur $[a\,;b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, l''équation $f(x) = k$ admet au moins une solution dans $[a\,;b]$.')),
      pg_temp.box('propriete',
        pg_temp.p('Si de plus $f$ est strictement monotone sur $[a\,;b]$, cette solution est unique.')),
      pg_temp.box('exemple',
        pg_temp.p('$f(x) = x^3 + x - 1$ est continue et strictement croissante sur $[0\,;1]$, avec $f(0) = -1$ et $f(1) = 1$. L''équation $f(x) = 0$ admet donc une unique solution dans $]0\,;1[$.'))
    ),
    2, 'published', 'public', now() - interval '18 days'
  ),
  (
    pg_temp.uid('30000000', 3), pg_temp.uid('20000000', 2),
    'Dérivabilité et nombre dérivé', 'nombre-derive',
    'Taux d''accroissement, nombre dérivé et équation de la tangente.',
    pg_temp.doc(
      pg_temp.h('Nombre dérivé'),
      pg_temp.box('definition',
        pg_temp.p('La fonction $f$ est dérivable en $a$ si son taux d''accroissement admet une limite finie quand $h$ tend vers 0. Cette limite est le nombre dérivé :'),
        pg_temp.m('f''(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}')),
      pg_temp.h('Tangente à la courbe'),
      pg_temp.box('propriete',
        pg_temp.p('La tangente à $\mathcal{C}_f$ au point d''abscisse $a$ a pour équation :'),
        pg_temp.m('y = f''(a)(x - a) + f(a)')),
      pg_temp.box('exemple',
        pg_temp.p('Pour $f(x) = x^2$ en $a = 3$ : $f(3) = 9$ et $f''(3) = 6$, donc la tangente a pour équation $y = 6x - 9$.'))
    ),
    1, 'published', 'enrolled', now() - interval '14 days'
  ),
  (
    pg_temp.uid('30000000', 4), pg_temp.uid('20000000', 2),
    'Étude des variations d''une fonction', 'etude-des-variations',
    'Signe de la dérivée, tableau de variations et extremums.',
    pg_temp.doc(
      pg_temp.h('Signe de la dérivée et variations'),
      pg_temp.box('theoreme',
        pg_temp.p('Soit $f$ dérivable sur un intervalle $I$. Si $f''(x) > 0$ pour tout $x$ de $I$, sauf en des points isolés, alors $f$ est strictement croissante sur $I$.')),
      pg_temp.p('À compléter : étude complète de $f(x) = \dfrac{x^2}{x - 1}$.')
    ),
    2, 'draft', 'enrolled', null
  ),
  (
    pg_temp.uid('30000000', 5), pg_temp.uid('20000000', 3),
    'Suites arithmétiques et géométriques', 'suites-arithmetiques-et-geometriques',
    'Définitions, termes généraux et sommes de termes consécutifs.',
    pg_temp.doc(
      pg_temp.h('Suites arithmétiques'),
      pg_temp.box('definition',
        pg_temp.p('Une suite $(u_n)$ est arithmétique de raison $r$ si, pour tout $n$, $u_{n+1} = u_n + r$. Son terme général est :'),
        pg_temp.m('u_n = u_0 + nr')),
      pg_temp.h('Suites géométriques'),
      pg_temp.box('definition',
        pg_temp.p('Une suite $(v_n)$ est géométrique de raison $q$ si, pour tout $n$, $v_{n+1} = q\,v_n$. Son terme général est :'),
        pg_temp.m('v_n = v_0\,q^n')),
      pg_temp.box('propriete',
        pg_temp.p('Pour $q \neq 1$ :'),
        pg_temp.m('1 + q + q^2 + \dots + q^n = \frac{1 - q^{n+1}}{1 - q}'))
    ),
    1, 'published', 'enrolled', now() - interval '10 days'
  ),
  (
    pg_temp.uid('30000000', 6), pg_temp.uid('20000000', 3),
    'Limite d''une suite', 'limite-d-une-suite',
    'Convergence, suites monotones et bornées.',
    pg_temp.doc(
      pg_temp.h('Suites convergentes'),
      pg_temp.box('definition',
        pg_temp.p('Une suite $(u_n)$ converge vers $\ell$ si tout intervalle ouvert contenant $\ell$ contient tous les termes de la suite à partir d''un certain rang.')),
      pg_temp.box('theoreme',
        pg_temp.p('Toute suite croissante et majorée converge. Toute suite décroissante et minorée converge.')),
      pg_temp.box('attention',
        pg_temp.p('Une suite bornée n''est pas forcément convergente : $u_n = (-1)^n$ est bornée mais diverge.'))
    ),
    2, 'published', 'specific', now() - interval '4 days'
  ),
  (
    pg_temp.uid('30000000', 7), pg_temp.uid('20000000', 4),
    'Forme algébrique d''un nombre complexe', 'forme-algebrique',
    'Partie réelle, partie imaginaire, conjugué et module.',
    pg_temp.doc(
      pg_temp.h('L''ensemble $\mathbb{C}$'),
      pg_temp.box('definition',
        pg_temp.p('Tout nombre complexe $z$ s''écrit de manière unique $z = a + ib$ avec $a, b \in \mathbb{R}$ et $i^2 = -1$. On note $a = \operatorname{Re}(z)$ et $b = \operatorname{Im}(z)$.')),
      pg_temp.box('definition',
        pg_temp.p('Le conjugué de $z = a + ib$ est $\bar{z} = a - ib$, et son module est :'),
        pg_temp.m('|z| = \sqrt{a^2 + b^2}')),
      pg_temp.box('exemple',
        pg_temp.p('Pour écrire $\dfrac{1}{2 + i}$ sous forme algébrique, on multiplie par le conjugué du dénominateur :'),
        pg_temp.m('\frac{1}{2 + i} = \frac{2 - i}{(2 + i)(2 - i)} = \frac{2}{5} - \frac{1}{5}i'))
    ),
    1, 'published', 'enrolled', now() - interval '12 days'
  ),
  (
    pg_temp.uid('30000000', 8), pg_temp.uid('20000000', 5),
    'Barycentre de deux points', 'barycentre-de-deux-points',
    'Définition, construction et réduction d''une somme vectorielle.',
    pg_temp.doc(
      pg_temp.h('Définition'),
      pg_temp.box('definition',
        pg_temp.p('Soient $A$ et $B$ deux points et $\alpha$, $\beta$ deux réels tels que $\alpha + \beta \neq 0$. Il existe un unique point $G$ tel que :'),
        pg_temp.m('\alpha\,\overrightarrow{GA} + \beta\,\overrightarrow{GB} = \vec{0}')),
      pg_temp.box('propriete',
        pg_temp.p('Pour tout point $M$ du plan :'),
        pg_temp.m('\alpha\,\overrightarrow{MA} + \beta\,\overrightarrow{MB} = (\alpha + \beta)\,\overrightarrow{MG}')),
      pg_temp.box('exemple',
        pg_temp.p('Le barycentre de $(A, 1)$ et $(B, 1)$ est le milieu du segment $[AB]$.'))
    ),
    1, 'published', 'enrolled', now() - interval '9 days'
  ),
  (
    pg_temp.uid('30000000', 9), pg_temp.uid('20000000', 6),
    'Produit scalaire dans le plan', 'produit-scalaire-dans-le-plan',
    'Expression analytique, orthogonalité et théorème d''Al-Kashi.',
    pg_temp.doc(
      pg_temp.h('Expression analytique'),
      pg_temp.box('definition',
        pg_temp.p('Dans un repère orthonormé, si $\vec{u}(x\,;y)$ et $\vec{v}(x''\,;y'')$, alors :'),
        pg_temp.m('\vec{u} \cdot \vec{v} = xx'' + yy''')),
      pg_temp.box('propriete',
        pg_temp.p('Deux vecteurs non nuls sont orthogonaux si et seulement si $\vec{u} \cdot \vec{v} = 0$.')),
      pg_temp.box('theoreme',
        pg_temp.p('Théorème d''Al-Kashi : dans un triangle $ABC$,'),
        pg_temp.m('BC^2 = AB^2 + AC^2 - 2\,AB \cdot AC \cos\widehat{BAC}'))
    ),
    1, 'published', 'enrolled', now() - interval '7 days'
  ),
  (
    pg_temp.uid('30000000', 10), pg_temp.uid('20000000', 7),
    'Nombres premiers et PGCD', 'nombres-premiers-et-pgcd',
    'Décomposition en facteurs premiers et calcul du PGCD.',
    pg_temp.doc(
      pg_temp.h('Nombres premiers'),
      pg_temp.box('definition',
        pg_temp.p('Un entier naturel $p$ est premier s''il admet exactement deux diviseurs : $1$ et $p$.')),
      pg_temp.box('propriete',
        pg_temp.p('Tout entier naturel $n \geq 2$ se décompose de manière unique en produit de facteurs premiers.')),
      pg_temp.h('Calcul du PGCD'),
      pg_temp.box('exemple',
        pg_temp.p('Comme $84 = 2^2 \times 3 \times 7$ et $126 = 2 \times 3^2 \times 7$, on obtient $\operatorname{PGCD}(84\,;126) = 2 \times 3 \times 7 = 42$.'))
    ),
    1, 'published', 'public', now() - interval '25 days'
  ),
  (
    pg_temp.uid('30000000', 11), pg_temp.uid('20000000', 8),
    'Théorème de Thalès et sa réciproque', 'thales-et-reciproque',
    'Calculer une longueur, montrer que deux droites sont parallèles.',
    pg_temp.doc(
      pg_temp.h('Le théorème'),
      pg_temp.box('theoreme',
        pg_temp.p('Soient $(d)$ et $(d'')$ deux droites sécantes en $A$, $B$ et $M$ deux points de $(d)$, $C$ et $N$ deux points de $(d'')$. Si $(MN) \parallel (BC)$, alors :'),
        pg_temp.m('\frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}')),
      pg_temp.h('La réciproque'),
      pg_temp.box('theoreme',
        pg_temp.p('Si les points $A$, $M$, $B$ et $A$, $N$, $C$ sont alignés dans le même ordre et si $\dfrac{AM}{AB} = \dfrac{AN}{AC}$, alors $(MN) \parallel (BC)$.')),
      pg_temp.box('attention',
        pg_temp.p('Vérifiez l''ordre des points avant d''appliquer la réciproque.'))
    ),
    1, 'published', 'enrolled', now() - interval '16 days'
  ),
  (
    pg_temp.uid('30000000', 12), pg_temp.uid('20000000', 9),
    'Équations du premier degré', 'equations-du-premier-degre',
    'Résoudre une équation et une inéquation à une inconnue.',
    pg_temp.doc(
      pg_temp.h('Équations'),
      pg_temp.box('definition',
        pg_temp.p('Une équation du premier degré à une inconnue s''écrit $ax + b = 0$ avec $a \neq 0$. Sa solution unique est $x = -\dfrac{b}{a}$.')),
      pg_temp.box('exemple',
        pg_temp.p('Pour résoudre $3x - 7 = 2x + 5$, on regroupe les termes en $x$ d''un côté : $x = 12$.')),
      pg_temp.h('Inéquations'),
      pg_temp.box('attention',
        pg_temp.p('Quand on multiplie ou divise les deux membres d''une inéquation par un nombre négatif, le sens de l''inégalité change.'))
    ),
    1, 'published', 'enrolled', now() - interval '2 days'
  )
on conflict (id) do update set
  chapter_id = excluded.chapter_id,
  title = excluded.title,
  slug = excluded.slug,
  summary = excluded.summary,
  content = excluded.content,
  position = excluded.position,
  status = excluded.status,
  visibility = excluded.visibility,
  published_at = excluded.published_at;

insert into public.lesson_access (lesson_id, student_id)
values (pg_temp.uid('30000000', 6), pg_temp.uid('00000000', 101))
on conflict do nothing;

-- ─────────────────────────────────────────────────────────────── exercises

-- Limites et continuité
select pg_temp.seed_exercise(1, 1, 'Limite à l''infini', 1, 'numeric',
  pg_temp.doc(pg_temp.p('Calculer $\lim_{x \to +\infty} \dfrac{2x^2 - 3x + 1}{x^2 + 5}$.')),
  pg_temp.doc(pg_temp.p('On factorise par $x^2$ au numérateur et au dénominateur : la limite vaut $\dfrac{2}{1} = 2$.')),
  array['limites', 'infini'], p_numeric => 2, p_tolerance => 0);

select pg_temp.seed_exercise(2, 1, 'Forme indéterminée en un point', 3, 'upload',
  pg_temp.doc(pg_temp.p('Calculer $\lim_{x \to 1} \dfrac{x^2 - 1}{x - 1}$, puis justifier que la fonction se prolonge par continuité en $1$.')),
  pg_temp.doc(pg_temp.p('Pour $x \neq 1$, l''expression vaut $x + 1$, donc la limite est $2$. On pose $f(1) = 2$.')),
  array['limites', 'forme indéterminée', 'continuité']);

select pg_temp.seed_exercise(3, 1, 'Théorème des valeurs intermédiaires', 4, 'upload',
  pg_temp.doc(pg_temp.p('Montrer que l''équation $x^3 + x - 1 = 0$ admet une unique solution $\alpha$ dans $]0\,;1[$, puis donner un encadrement de $\alpha$ d''amplitude $10^{-1}$.')),
  pg_temp.doc(pg_temp.p('$f$ est continue et strictement croissante, $f(0) = -1 < 0$ et $f(1) = 1 > 0$. Par dichotomie, $0{,}6 < \alpha < 0{,}7$.')),
  array['continuité', 'TVI']);

select pg_temp.seed_exercise(4, 1, 'Continuité d''une fonction définie par morceaux', 2, 'mcq',
  pg_temp.doc(pg_temp.p('On définit $f(x) = x + a$ si $x < 1$ et $f(x) = 2x$ si $x \geq 1$. Pour quelle valeur de $a$ la fonction $f$ est-elle continue en $1$ ?')),
  pg_temp.doc(pg_temp.p('Il faut $\lim_{x \to 1^-} f(x) = f(1)$, soit $1 + a = 2$, donc $a = 1$.')),
  array['continuité'],
  p_choices => pg_temp.choices('$a = 0$', '$a = 1$', '$a = 2$'), p_correct => array['b']);

select pg_temp.seed_exercise(5, 1, 'Limite avec une racine', 5, 'numeric',
  pg_temp.doc(pg_temp.p('Calculer $\lim_{x \to +\infty} \left(\sqrt{x^2 + x} - x\right)$.')),
  pg_temp.doc(pg_temp.p('On multiplie par la quantité conjuguée : $\dfrac{x}{\sqrt{x^2 + x} + x} \to \dfrac{1}{2}$.')),
  array['limites', 'quantité conjuguée'], p_numeric => 0.5, p_tolerance => 0.001);

-- Dérivation
select pg_temp.seed_exercise(6, 2, 'Nombre dérivé', 1, 'numeric',
  pg_temp.doc(pg_temp.p('Soit $f(x) = x^3 - 2x$. Calculer $f''(2)$.')),
  pg_temp.doc(pg_temp.p('$f''(x) = 3x^2 - 2$, donc $f''(2) = 10$.')),
  array['dérivation'], p_numeric => 10, p_tolerance => 0);

select pg_temp.seed_exercise(7, 2, 'Équation de la tangente', 2, 'upload',
  pg_temp.doc(pg_temp.p('Déterminer l''équation de la tangente à la courbe de $f(x) = \sqrt{x}$ au point d''abscisse $4$.')),
  pg_temp.doc(pg_temp.p('$f(4) = 2$ et $f''(4) = \dfrac{1}{4}$, donc $y = \dfrac{1}{4}x + 1$.')),
  array['dérivation', 'tangente']);

select pg_temp.seed_exercise(8, 2, 'Tableau de variations', 3, 'upload',
  pg_temp.doc(pg_temp.p('Étudier les variations de $f(x) = \dfrac{x^2}{x - 1}$ sur $]1\,;+\infty[$.')),
  pg_temp.doc(pg_temp.p('$f''(x) = \dfrac{x(x - 2)}{(x - 1)^2}$ : $f$ décroît sur $]1\,;2]$ et croît sur $[2\,;+\infty[$, avec un minimum $f(2) = 4$.')),
  array['dérivation', 'variations']);

select pg_temp.seed_exercise(9, 2, 'Dérivée d''un quotient', 2, 'mcq',
  pg_temp.doc(pg_temp.p('La dérivée de $f(x) = \dfrac{1}{x^2 + 1}$ est :')),
  pg_temp.doc(pg_temp.p('$\left(\dfrac{1}{u}\right)'' = -\dfrac{u''}{u^2}$ avec $u = x^2 + 1$.')),
  array['dérivation'],
  p_choices => pg_temp.choices('$\dfrac{-2x}{(x^2+1)^2}$', '$\dfrac{2x}{(x^2+1)^2}$', '$\dfrac{-1}{(x^2+1)^2}$'),
  p_correct => array['a']);

select pg_temp.seed_exercise(10, 2, 'Problème d''optimisation', 4, 'upload',
  pg_temp.doc(pg_temp.p('Dans un carré de carton de $12$ cm de côté, on découpe aux quatre coins un carré de côté $x$ pour former une boîte sans couvercle. Déterminer $x$ pour que le volume soit maximal.')),
  pg_temp.doc(pg_temp.p('$V(x) = x(12 - 2x)^2$ sur $]0\,;6[$, $V''(x) = 12(x - 2)(x - 6)$ : le volume est maximal pour $x = 2$, avec $V(2) = 128$ cm³.')),
  array['dérivation', 'optimisation']);

-- Suites numériques
select pg_temp.seed_exercise(11, 3, 'Terme général d''une suite arithmétique', 1, 'numeric',
  pg_temp.doc(pg_temp.p('$(u_n)$ est arithmétique de premier terme $u_0 = 3$ et de raison $r = 4$. Calculer $u_{10}$.')),
  pg_temp.doc(pg_temp.p('$u_{10} = u_0 + 10r = 3 + 40 = 43$.')),
  array['suites'], p_numeric => 43, p_tolerance => 0);

select pg_temp.seed_exercise(12, 3, 'Somme de termes géométriques', 2, 'numeric',
  pg_temp.doc(pg_temp.p('Calculer $S = 1 + 2 + 4 + \dots + 2^{9}$.')),
  pg_temp.doc(pg_temp.p('$S = \dfrac{1 - 2^{10}}{1 - 2} = 1023$.')),
  array['suites', 'somme'], p_numeric => 1023, p_tolerance => 0);

select pg_temp.seed_exercise(13, 3, 'Suite récurrente', 3, 'upload',
  pg_temp.doc(pg_temp.p('Soit $u_0 = 1$ et $u_{n+1} = \dfrac{1}{2}u_n + 3$. Montrer que $v_n = u_n - 6$ définit une suite géométrique, puis en déduire la limite de $(u_n)$.')),
  pg_temp.doc(pg_temp.p('$v_{n+1} = \dfrac{1}{2}v_n$ avec $v_0 = -5$, donc $v_n \to 0$ et $u_n \to 6$.')),
  array['suites', 'récurrence']);

select pg_temp.seed_exercise(14, 3, 'Raisonnement par récurrence', 4, 'upload',
  pg_temp.doc(pg_temp.p('Montrer par récurrence que, pour tout $n \in \mathbb{N}$, $2^n \geq n + 1$.')),
  pg_temp.doc(pg_temp.p('Initialisation : $2^0 = 1 \geq 1$. Hérédité : $2^{n+1} = 2 \cdot 2^n \geq 2n + 2 \geq n + 2$.')),
  array['suites', 'récurrence']);

-- Nombres complexes
select pg_temp.seed_exercise(15, 4, 'Forme algébrique d''un quotient', 2, 'upload',
  pg_temp.doc(pg_temp.p('Écrire sous forme algébrique $z = \dfrac{1 + 2i}{3 - i}$.')),
  pg_temp.doc(pg_temp.p('On multiplie par $3 + i$ : $z = \dfrac{1 + 7i}{10} = \dfrac{1}{10} + \dfrac{7}{10}i$.')),
  array['complexes']);

select pg_temp.seed_exercise(16, 4, 'Module d''un nombre complexe', 1, 'mcq',
  pg_temp.doc(pg_temp.p('Le module de $z = 3 - 4i$ est :')),
  pg_temp.doc(pg_temp.p('$|z| = \sqrt{3^2 + 4^2} = 5$.')),
  array['complexes', 'module'],
  p_choices => pg_temp.choices('$5$', '$7$', '$\sqrt{7}$'), p_correct => array['a']);

select pg_temp.seed_exercise(17, 4, 'Équation du second degré dans ℂ', 3, 'upload',
  pg_temp.doc(pg_temp.p('Résoudre dans $\mathbb{C}$ l''équation $z^2 - 2z + 5 = 0$.')),
  pg_temp.doc(pg_temp.p('$\Delta = -16 = (4i)^2$, donc $z = 1 + 2i$ ou $z = 1 - 2i$.')),
  array['complexes', 'équations']);

-- Barycentre
select pg_temp.seed_exercise(18, 5, 'Construction d''un barycentre', 2, 'upload',
  pg_temp.doc(pg_temp.p('$A$ et $B$ sont deux points distincts. Construire le barycentre $G$ de $(A, 2)$ et $(B, -1)$.')),
  pg_temp.doc(pg_temp.p('$\overrightarrow{AG} = -\overrightarrow{AB}$ : $G$ est le symétrique de $B$ par rapport à $A$.')),
  array['barycentre', 'construction']);

select pg_temp.seed_exercise(19, 5, 'Ligne de niveau', 3, 'upload',
  pg_temp.doc(pg_temp.p('$AB = 3$. Déterminer l''ensemble des points $M$ tels que $\left\|2\overrightarrow{MA} + \overrightarrow{MB}\right\| = 6$.')),
  pg_temp.doc(pg_temp.p('Avec $G$ barycentre de $(A, 2)$ et $(B, 1)$, on obtient $3MG = 6$ : c''est le cercle de centre $G$ et de rayon $2$.')),
  array['barycentre', 'lieu de points']);

select pg_temp.seed_exercise(20, 5, 'Coordonnées d''un barycentre', 1, 'numeric',
  pg_temp.doc(pg_temp.p('On donne $A(1\,;2)$ et $B(4\,;-1)$. Calculer l''abscisse du barycentre de $(A, 1)$ et $(B, 2)$.')),
  pg_temp.doc(pg_temp.p('$x_G = \dfrac{1 \times 1 + 2 \times 4}{3} = 3$.')),
  array['barycentre', 'coordonnées'], p_numeric => 3, p_tolerance => 0);

-- Produit scalaire
select pg_temp.seed_exercise(21, 6, 'Produit scalaire et coordonnées', 1, 'numeric',
  pg_temp.doc(pg_temp.p('On donne $\vec{u}(2\,;-3)$ et $\vec{v}(4\,;1)$. Calculer $\vec{u} \cdot \vec{v}$.')),
  pg_temp.doc(pg_temp.p('$\vec{u} \cdot \vec{v} = 2 \times 4 + (-3) \times 1 = 5$.')),
  array['produit scalaire'], p_numeric => 5, p_tolerance => 0);

select pg_temp.seed_exercise(22, 6, 'Théorème d''Al-Kashi', 3, 'upload',
  pg_temp.doc(pg_temp.p('Dans un triangle $ABC$, $AB = 5$, $AC = 7$ et $\widehat{BAC} = 60^\circ$. Calculer $BC$.')),
  pg_temp.doc(pg_temp.p('$BC^2 = 25 + 49 - 2 \times 5 \times 7 \times \dfrac{1}{2} = 39$, donc $BC = \sqrt{39}$.')),
  array['produit scalaire', 'Al-Kashi']);

select pg_temp.seed_exercise(23, 6, 'Équation d''un cercle', 4, 'upload',
  pg_temp.doc(pg_temp.p('Déterminer une équation du cercle de diamètre $[AB]$, avec $A(1\,;3)$ et $B(5\,;-1)$.')),
  pg_temp.doc(pg_temp.p('$M$ est sur le cercle si $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$, soit $(x - 3)^2 + (y - 1)^2 = 8$.')),
  array['produit scalaire', 'cercle']);

-- Arithmétique
select pg_temp.seed_exercise(24, 7, 'Calcul d''un PGCD', 1, 'numeric',
  pg_temp.doc(pg_temp.p('Calculer $\operatorname{PGCD}(84\,;126)$.')),
  pg_temp.doc(pg_temp.p('$84 = 2^2 \times 3 \times 7$ et $126 = 2 \times 3^2 \times 7$, donc le PGCD vaut $42$.')),
  array['arithmétique', 'PGCD'], p_numeric => 42, p_tolerance => 0);

select pg_temp.seed_exercise(25, 7, 'Reconnaître un nombre premier', 2, 'mcq',
  pg_temp.doc(pg_temp.p('Lequel de ces nombres est premier ?')),
  pg_temp.doc(pg_temp.p('$91 = 7 \times 13$ et $111 = 3 \times 37$, alors que $97$ n''est divisible par aucun premier inférieur à $\sqrt{97}$.')),
  array['arithmétique', 'nombres premiers'],
  p_choices => pg_temp.choices('$91$', '$97$', '$111$'), p_correct => array['b']);

select pg_temp.seed_exercise(26, 7, 'Parité', 3, 'upload',
  pg_temp.doc(pg_temp.p('Montrer que, pour tout entier naturel $n$, le nombre $n^2 + n$ est pair.')),
  pg_temp.doc(pg_temp.p('$n^2 + n = n(n + 1)$ est le produit de deux entiers consécutifs, dont l''un est pair.')),
  array['arithmétique', 'parité']);

-- Thalès
select pg_temp.seed_exercise(27, 8, 'Calculer une longueur avec Thalès', 2, 'numeric',
  pg_temp.doc(pg_temp.p('Les droites $(MN)$ et $(BC)$ sont parallèles, avec $M \in [AB]$ et $N \in [AC]$. On donne $AM = 3$, $AB = 5$ et $AC = 8$. Calculer $AN$.')),
  pg_temp.doc(pg_temp.p('$\dfrac{AN}{AC} = \dfrac{AM}{AB}$, donc $AN = \dfrac{3 \times 8}{5} = 4{,}8$.')),
  array['Thalès', 'longueurs'], p_numeric => 4.8, p_tolerance => 0.01);

select pg_temp.seed_exercise(28, 8, 'Réciproque de Thalès', 3, 'upload',
  pg_temp.doc(pg_temp.p('Les points $A$, $E$, $B$ et $A$, $F$, $C$ sont alignés dans cet ordre, avec $AE = 2$, $AB = 5$, $AF = 3$ et $AC = 7{,}5$. Les droites $(EF)$ et $(BC)$ sont-elles parallèles ?')),
  pg_temp.doc(pg_temp.p('$\dfrac{AE}{AB} = \dfrac{2}{5}$ et $\dfrac{AF}{AC} = \dfrac{3}{7{,}5} = \dfrac{2}{5}$ : d''après la réciproque, $(EF) \parallel (BC)$.')),
  array['Thalès', 'parallélisme']);

-- Équations
select pg_temp.seed_exercise(29, 9, 'Équation du premier degré', 1, 'numeric',
  pg_temp.doc(pg_temp.p('Résoudre $3x - 7 = 2x + 5$.')),
  pg_temp.doc(pg_temp.p('$3x - 2x = 5 + 7$, donc $x = 12$.')),
  array['équations'], p_numeric => 12, p_tolerance => 0);

select pg_temp.seed_exercise(30, 9, 'Inéquation', 2, 'upload',
  pg_temp.doc(pg_temp.p('Résoudre l''inéquation $2(x - 3) \leq 5x + 3$ et représenter les solutions sur une droite graduée.')),
  pg_temp.doc(pg_temp.p('$-3x \leq 9$, donc $x \geq -3$ : les solutions forment l''intervalle $[-3\,;+\infty[$.')),
  array['inéquations']);

-- ─────────────────────────────────────────────────────────────── session types

insert into public.session_types (id, name, duration_min, mode, price_mad, is_group)
values
  (pg_temp.uid('50000000', 1), 'Cours particulier chez le professeur', 90, 'chez_prof', 200, false),
  (pg_temp.uid('50000000', 2), 'Cours particulier en ligne', 60, 'en_ligne', 150, false),
  (pg_temp.uid('50000000', 3), 'Cours particulier à domicile', 90, 'domicile', 250, false),
  (pg_temp.uid('50000000', 4), 'Séance de groupe', 120, 'chez_prof', 100, true)
on conflict (id) do update set
  name = excluded.name,
  duration_min = excluded.duration_min,
  mode = excluded.mode,
  price_mad = excluded.price_mad,
  is_group = excluded.is_group;

-- ─────────────────────────────────────────────────────────────── sessions
-- 8 weekly slots over 5 weeks (3 past, this one, next) = 40 sessions, in Casablanca wall-clock
-- time. Postgres converts each local time to UTC with the zone's rules, Ramadan included.

delete from public.sessions
where student_id in (select pg_temp.uid('00000000', n) from generate_series(101, 108) as n)
   or group_id in (select pg_temp.uid('10000000', n) from generate_series(1, 3) as n);

with week as (
  select date_trunc('week', now() at time zone 'Africa/Casablanca')::date as monday
),
slot (slot, day_offset, start_local, type_n, student_n, group_n, chapter_n) as (
  values
    (1, 0, time '18:00', 1, 101, null::integer, 1),
    (2, 1, time '18:00', 4, null, 1, 3),
    (3, 2, time '15:00', 4, null, 3, 8),
    (4, 2, time '17:30', 2, 105, null, 5),
    (5, 3, time '19:00', 1, 104, null, 4),
    (6, 4, time '18:00', 2, 102, null, 3),
    (7, 5, time '10:00', 4, null, 2, 6),
    (8, 6, time '11:00', 3, 107, null, 7)
),
planned as (
  select
    w,
    s.slot,
    s.type_n,
    s.student_n,
    s.group_n,
    s.chapter_n,
    st.duration_min,
    st.mode,
    ((select monday from week) + w * 7 + s.day_offset + s.start_local) at time zone 'Africa/Casablanca' as starts_at,
    (w = -2 and s.slot = 5) as is_cancelled,
    (w = -1 and s.slot = 6) as is_no_show,
    (w = 1 and s.slot = 6) as is_request
  from generate_series(-3, 1) as w
  cross join slot as s
  join public.session_types as st on st.id = pg_temp.uid('50000000', s.type_n)
)
insert into public.sessions (
  student_id, group_id, session_type_id, starts_at, ends_at, status, mode, location, meeting_url,
  covered_chapter_id, homework, recap, requested_by, cancelled_at, cancelled_by, cancellation_reason
)
select
  case when student_n is not null then pg_temp.uid('00000000', student_n) end,
  case when group_n is not null then pg_temp.uid('10000000', group_n) end,
  pg_temp.uid('50000000', type_n),
  starts_at,
  starts_at + make_interval(mins => duration_min),
  (case
    when is_cancelled then 'annulee'
    when is_no_show then 'absent'
    when is_request then 'en_attente'
    when starts_at < now() then 'terminee'
    else 'planifiee'
  end)::public.session_status,
  mode,
  case mode
    when 'chez_prof' then 'Chez le professeur'
    when 'domicile' then 'Au domicile de l''élève'
  end,
  case when mode = 'en_ligne' then 'https://meet.jit.si/equerre-' || coalesce(student_n, group_n) end,
  case when starts_at < now() and not is_cancelled and not is_no_show then pg_temp.uid('20000000', chapter_n) end,
  case when starts_at < now() and not is_cancelled and not is_no_show
    then 'Exercices 2 et 3 de la série du chapitre.' end,
  case when starts_at < now() and not is_cancelled and not is_no_show
    then 'Méthode revue ensemble. Refaire les exemples du cours avant la prochaine séance.' end,
  case when is_request then pg_temp.uid('00000000', student_n) end,
  case when is_cancelled then starts_at - interval '2 days' end,
  case when is_cancelled then pg_temp.uid('00000000', student_n) end,
  case when is_cancelled then 'Examen blanc au lycée le même soir.' end
from planned;

insert into public.session_attendance (session_id, student_id, status)
select
  s.id,
  gm.student_id,
  (case
    when gm.student_id = pg_temp.uid('00000000', 108) then 'excuse'
    when gm.student_id = pg_temp.uid('00000000', 103) and s.starts_at > now() - interval '8 days' then 'absent'
    else 'present'
  end)::public.attendance_status
from public.sessions as s
join public.group_members as gm on gm.group_id = s.group_id
where s.status = 'terminee'
on conflict do nothing;

-- ─────────────────────────────────────────────────────────────── clean up

drop function pg_temp.seed_exercise(integer, integer, text, integer, public.answer_type, jsonb, jsonb, text[], numeric, numeric, jsonb, text[]);
drop function pg_temp.seed_user(integer, text, text, text);
drop function pg_temp.choices(text[]);
drop function pg_temp.doc(jsonb[]);
drop function pg_temp.box(text, jsonb[]);
drop function pg_temp.m(text);
drop function pg_temp.h(text);
drop function pg_temp.p(text);
drop function pg_temp.inline(text);
drop function pg_temp.uid(text, integer);

commit;

select
  (select count(*) from public.profiles where role = 'tutor') as tutors,
  (select count(*) from public.profiles where role = 'student') as students,
  (select count(*) from public.groups) as groups,
  (select count(*) from public.lessons) as lessons,
  (select count(*) from public.exercises) as exercises,
  (select count(*) from public.sessions) as sessions;
