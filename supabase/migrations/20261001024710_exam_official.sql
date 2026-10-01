-- Official papers (D-099): the ministry's own subjects and « éléments de réponse », published
-- as the Centre national des examens et de l'évaluation published them, with their source.
-- A paper is in French or in Arabic: several streams sat theirs in Arabic only.
alter table public.national_exams
  add column language text not null default 'fr' check (language in ('fr', 'ar')),
  add column official boolean not null default false,
  add column subject_source_url text check (subject_source_url is null or subject_source_url ~ '^https://cnee\.men\.gov\.ma/'),
  add column solution_source_url text check (solution_source_url is null or solution_source_url ~ '^https://cnee\.men\.gov\.ma/'),
  -- An official paper says where it comes from.
  add constraint national_exams_official_source check (not official or subject_source_url is not null);
