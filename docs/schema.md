# Schema

The database after phase 4 and the programmes (D-094), read from the live project (38 tables in
`public`, one in `private`, four storage buckets). Every table has RLS enabled and a policy per operation; a table with no
policy for an operation refuses it. The reasons behind each rule are in `DECISIONS.md`.

One diagram per area, with the columns that carry the relations. The generated types in
`src/types/database.ts` list every column.

## Identity, levels and groups

```mermaid
erDiagram
  AUTH_USERS ||--|| PROFILES : "trigger creates"
  PROGRAMMES ||--o{ LEVELS : "programme_code"
  LEVELS ||--o{ PROFILES : "level_code"
  LEVELS ||--o{ GROUPS : "level_code"
  LEVELS ||--o{ INVITE_CODES : "level_code"
  GROUPS ||--o{ INVITE_CODES : "group_id"
  PROFILES ||--o| STUDENT_SETTINGS : "student_id"
  PROFILES ||--o{ STUDENT_NOTES : "student_id (tutor only)"
  PROFILES ||--o{ GROUP_MEMBERS : "student_id"
  GROUPS ||--o{ GROUP_MEMBERS : "group_id"
  PROFILES ||--o{ GUARDIAN_LINKS : "parent_id"
  PROFILES ||--o{ GUARDIAN_LINKS : "student_id"
  PROFILES ||--o{ PARENT_INVITES : "student_id"

  PROGRAMMES {
    text code PK "2BAC-SEXP"
    text slug UK
    text label
    text cycle
  }
  LEVELS {
    text code PK "stream: 2BAC-PC"
    text label
    text programme_code FK
  }
  PROFILES {
    uuid id PK
    user_role role "tutor | student | parent"
    text full_name
    text email
    text level_code FK
    student_status status "actif | en_pause | arrete"
    text guardian_name
    text guardian_phone
  }
  GROUP_MEMBERS {
    uuid group_id PK
    uuid student_id PK
    timestamptz joined_at
    timestamptz left_at "a membership is a period"
    timestamptz chat_from
  }
  GUARDIAN_LINKS {
    uuid parent_id PK
    uuid student_id PK
  }
  PARENT_INVITES {
    text token PK "made by the database"
    uuid student_id FK
    text email
    timestamptz expires_at "at most a day"
    timestamptz used_at
  }
  INVITE_CODES {
    text code PK
    int max_uses
    int used_count
    timestamptz expires_at
  }
```

## Lessons, exercises and homework

```mermaid
erDiagram
  PROGRAMMES ||--o{ CHAPTERS : "programme_code"
  PROGRAMMES ||--o{ NATIONAL_EXAMS : "programme_code"
  CHAPTERS ||--o{ LESSONS : "chapter_id"
  LESSONS ||--o{ LESSON_ACCESS : "lesson_id"
  PROFILES ||--o{ LESSON_ACCESS : "student_id"
  CHAPTERS ||--o{ EXERCISES : "chapter_id"
  EXERCISES ||--|| EXERCISE_SOLUTIONS : "exercise_id"
  ASSIGNMENTS ||--o{ ASSIGNMENT_ITEMS : "assignment_id"
  EXERCISES ||--o{ ASSIGNMENT_ITEMS : "exercise_id"
  PROFILES ||--o{ ASSIGNMENTS : "student_id"
  GROUPS ||--o{ ASSIGNMENTS : "group_id"
  ASSIGNMENT_ITEMS ||--o{ SUBMISSIONS : "assignment_id, exercise_id"
  PROFILES ||--o{ SUBMISSIONS : "student_id"
  SUBMISSIONS ||--o{ SUBMISSION_COMMENTS : "submission_id"
  ASSIGNMENT_ITEMS ||--o{ EXERCISE_REVEALS : "assignment_id, exercise_id"
  PROFILES ||--o{ EXERCISE_REVEALS : "student_id"

  CHAPTERS {
    uuid id PK
    text programme_code FK
    text slug "unique in its programme"
    smallint semester
    int position
  }
  LESSONS {
    uuid id PK
    uuid chapter_id FK
    text slug UK
    document_kind kind "cours | resume | serie | devoir"
    jsonb content
    publication_status status
    lesson_visibility visibility "public | enrolled | specific"
  }
  EXERCISES {
    uuid id PK
    uuid chapter_id FK
    jsonb statement
    answer_type answer_type
    jsonb choices
    text_array tags
  }
  EXERCISE_SOLUTIONS {
    uuid exercise_id PK
    jsonb solution
    numeric correct_numeric
    numeric tolerance
    text_array correct_choice_ids
  }
  ASSIGNMENTS {
    uuid id PK
    uuid student_id FK "one student or one group"
    uuid group_id FK
    timestamptz due_at
  }
  SUBMISSIONS {
    uuid id PK
    uuid assignment_id FK
    uuid exercise_id FK
    uuid student_id FK
    submission_status status
    jsonb answer
    text_array file_paths
    numeric grade "0 to 20"
  }
  NATIONAL_EXAMS {
    uuid id PK
    text programme_code FK
    smallint year
    exam_session session "normale, rattrapage"
    text track "null: the whole programme"
    text subject_path "id/file.pdf in national-exams"
    text solution_path
    text language "fr, ar"
    boolean official "the ministry's own, D-099"
    text subject_source_url
    publication_status status
  }
```

A past national exam (D-097) is one paper of one session of one year, for a programme or the
part of its streams that sat it. Its PDFs live in the paper's own folder of the public
`national-exams` bucket; one paper per programme, year, session and track.

## Sessions and bookings

```mermaid
erDiagram
  SESSION_TYPES ||--o{ SESSIONS : "session_type_id"
  SESSION_TYPES ||--o{ AVAILABILITY : "session_type_id"
  SESSION_TYPES ||--o{ AVAILABILITY_EXCEPTIONS : "session_type_id"
  SESSION_SERIES ||--o{ SESSIONS : "series_id"
  PROFILES ||--o{ SESSIONS : "student_id"
  GROUPS ||--o{ SESSIONS : "group_id"
  CHAPTERS ||--o{ SESSIONS : "covered_chapter_id"
  SESSIONS ||--o{ SESSION_ATTENDANCE : "session_id"
  PROFILES ||--o{ SESSION_ATTENDANCE : "student_id"
  SESSIONS ||--o{ STUDENT_NOTES : "session_id"

  SESSIONS {
    uuid id PK
    uuid student_id FK "one student or one group"
    uuid group_id FK
    timestamptz starts_at
    timestamptz ends_at
    session_status status
    session_mode mode
    text meeting_url
    uuid requested_by FK
    timestamptz reminder_24h_sent_at
    timestamptz reminder_2h_sent_at
  }
  SESSION_TYPES {
    uuid id PK
    int duration_min
    session_mode mode
    numeric price_mad
    bool is_group
  }
  AVAILABILITY {
    uuid id PK
    smallint weekday
    time start_time
    time end_time
  }
  BOOKING_SETTINGS {
    bool id PK "singleton"
    int cancellation_window_hours
    int min_notice_hours
    int horizon_days
  }
```

## Chat and notifications

```mermaid
erDiagram
  PROFILES ||--o{ CONVERSATIONS : "student_id (direct)"
  GROUPS ||--o| CONVERSATIONS : "group_id (group)"
  CONVERSATIONS ||--o{ MESSAGES : "conversation_id"
  PROFILES ||--o{ MESSAGES : "sender_id"
  CONVERSATIONS ||--o{ CONVERSATION_READS : "conversation_id"
  PROFILES ||--o{ CONVERSATION_READS : "profile_id"
  PROFILES ||--o{ NOTIFICATIONS : "profile_id"
  PROFILES ||--o| MESSAGE_DIGESTS : "profile_id"

  MESSAGES {
    uuid id PK "made by the client"
    uuid conversation_id FK
    uuid sender_id FK
    text body
    jsonb attachments
    timestamptz created_at
  }
  NOTIFICATIONS {
    uuid id PK
    uuid profile_id FK
    notification_type type
    jsonb payload
    timestamptz read_at
    timestamptz emailed_at
  }
```

## Payments, public site and blog

```mermaid
erDiagram
  PLANS ||--o{ PAYMENTS : "plan_id"
  PROFILES ||--o{ PAYMENTS : "student_id"

  PLANS {
    uuid id PK
    plan_kind kind "hour_pack | subscription"
    numeric hours
    smallint period_months
    plan_scope scope
    numeric price_mad
    bool is_active
  }
  PAYMENTS {
    uuid id PK
    text receipt_number UK "YYYY-NNNN"
    uuid student_id FK
    numeric amount_mad
    payment_method method
    date paid_on
    numeric hours_credited
    date covers_from
    date covers_to
    timestamptz voided_at "voided, never deleted"
  }
  RECEIPT_COUNTERS {
    smallint year PK
    int last
  }
  POSTS {
    uuid id PK
    text slug UK
    post_category category
    publication_status status
    jsonb content
  }
  SITE_PROFILE {
    bool id PK "singleton"
    text tagline
    text bio
    text whatsapp
  }
```

## Who can read what

Parents read their linked children through checked functions (below) rather than through the
table policies, except for the three rows marked.

| Table                                                       | Signed out                        | Student                                                                  | Parent                   | Tutor                                              |
| ----------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------ | ------------------------ | -------------------------------------------------- |
| `programmes`, `levels`, `chapters`                          | all                               | all                                                                      | all                      | all, writes                                        |
| `lessons`, `lesson_access`                                  | published + public                | published + public, own level (`enrolled`), or listed in `lesson_access` | published + public       | all, writes                                        |
| `national_exams`                                            | published ones                    | published ones                                                           | published ones           | all, writes                                        |
| `profiles`                                                  | —                                 | own row; edits contact fields only                                       | own row, linked children | all, writes                                        |
| `student_settings`                                          | —                                 | own row                                                                  | —                        | all, writes                                        |
| `student_notes`                                             | —                                 | —                                                                        | —                        | all, writes                                        |
| `groups`, `group_members`                                   | —                                 | groups they belong to, own memberships                                   | —                        | all, writes                                        |
| `invite_codes`                                              | via `invite_code_is_valid()` only | via `invite_code_is_valid()` only                                        | —                        | all, writes                                        |
| `exercises`                                                 | —                                 | those in homework that reaches them                                      | —                        | all, writes                                        |
| `exercise_solutions`                                        | —                                 | once corrected or revealed                                               | —                        | all, writes                                        |
| `assignments`, `assignment_items`                           | —                                 | homework that reaches them (by their standing, D-060)                    | —                        | all, writes                                        |
| `submissions`                                               | —                                 | own; written only through `submit_exercise_answer()`                     | —                        | all, corrects                                      |
| `submission_comments`                                       | —                                 | own, once corrected                                                      | —                        | all, writes                                        |
| `exercise_reveals`                                          | —                                 | own; adds one for assigned work                                          | —                        | all                                                |
| `session_types`                                             | active ones                       | active ones                                                              | active ones              | all, writes                                        |
| `sessions`                                                  | —                                 | own and own groups' (by their standing, D-060)                           | —                        | all, writes                                        |
| `session_attendance`                                        | —                                 | own rows                                                                 | —                        | all, writes                                        |
| `session_series`, `availability`, `availability_exceptions` | —                                 | — (free slots through `booking_calendar()`)                              | —                        | all, writes                                        |
| `booking_settings`                                          | —                                 | read                                                                     | read                     | read, writes                                       |
| `conversations`, `messages`, `conversation_reads`           | —                                 | conversations they take part in; sends through `send_message()`          | —                        | all hers                                           |
| `notifications`                                             | —                                 | own                                                                      | own                      | own                                                |
| `message_digests`, `receipt_counters`                       | —                                 | — (functions only)                                                       | —                        | — (functions only)                                 |
| `plans`                                                     | offered ones                      | offered ones                                                             | offered ones             | all, writes                                        |
| `payments`                                                  | —                                 | own                                                                      | linked children's        | all, through `record_payment()` / `void_payment()` |
| `posts`                                                     | published                         | published                                                                | published                | all, writes                                        |
| `site_profile`                                              | read                              | read                                                                     | read                     | read, writes                                       |
| `guardian_links`                                            | —                                 | —                                                                        | own links                | all, writes                                        |
| `parent_invites`                                            | —                                 | —                                                                        | —                        | all; writes who and for which student only         |
| `private.rate_limits`                                       | —                                 | —                                                                        | —                        | —                                                  |

## Functions the app calls

Each one is `security definer`, checks who is calling before anything else, and is refused to
signed-out visitors unless noted.

| Area          | Functions                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sign-up       | `invite_code_is_valid()` (signed-out visitors too)                                                                                                                   |
| Exercises     | `save_exercise()`, `create_assignment()`, `delete_assignment()`, `submit_exercise_answer()`                                                                          |
| Sessions      | `booking_calendar()`, `request_session()`, `cancel_my_session()`, `plan_sessions()`, `cancel_sessions()`, `close_session()`, `add_session_reminder()`                |
| Chat          | `send_message()`, `my_inbox()`, `mark_conversation_read()`, `stale_message_files()`                                                                                  |
| Notifications | `mark_notifications_read()`, `notifications_to_email()`, `claim_notification_email()`, `message_digests_due()`, `claim_message_digest()`, `release_message_digest()` |
| Payments      | `record_payment()`, `void_payment()`, `student_accounts()`, `account_statement()`, `remove_test_payments()` (secret key only)                                        |
| Parents       | `my_children()`, `child_sessions()`, `child_homework()`                                                                                                              |
| Documents     | `take_print_quota()` before a PDF of a document that is not public, `take_public_print_quota()` (signed-out visitors too) before one of a public document (D-096)    |

## Storage

| Bucket           | Reads                                                    | Writes                                                |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------- |
| `lesson-assets`  | public (images inside lessons, unguessable paths)        | the tutor                                             |
| `lesson-files`   | whoever may read the lesson                              | the tutor                                             |
| `submissions`    | the student their own pages, the tutor all (signed URLs) | the student, inside their own folder, until handed in |
| `message-files`  | whoever may read the message that holds the file         | a participant, inside their own folder                |
| `national-exams` | public (past papers, unguessable paths for drafts)       | the tutor, PDFs only                                  |

## Invariants the database enforces

- Exactly one tutor (`profiles_single_tutor` partial unique index).
- Nobody chooses their own role. A new account is a student, and needs a valid invite code, or a parent, with an unused, unexpired invitation made for its very address (`private.handle_new_user`). Only the seed, which writes `auth.users` directly, bypasses both.
- Students can't change their role, status, level or email (`private.guard_profile_update`).
- A session, an assignment and a conversation belong to one student or one group, never both.
- Confirmed sessions never overlap (`sessions_no_overlap` exclusion constraint).
- A handed-in page is never replaced, and a corrected submission always has a grade between 0 and 20.
- Booking requests and messages are rate-limited in the database (`too_many_requests`, `private.rate_limits`).
- A payment is voided with a reason, never deleted; receipt numbers run per year and are never reused.
- Every timestamp is `timestamptz`; days are counted in Africa/Casablanca.
