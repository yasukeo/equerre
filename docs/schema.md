# Schema

Tables that exist after phase 0. Phase 1 adds assignments and submissions, phase 2 availability
and booking policies, phase 3 conversations, messages and notifications, phase 4 payments, posts
and guardian links (see the brief, §5).

Every table has RLS enabled. 🔒 marks tables only the tutor can read.

```mermaid
erDiagram
  AUTH_USERS ||--|| PROFILES : "trigger creates"
  LEVELS ||--o{ PROFILES : "level_code"
  LEVELS ||--o{ GROUPS : "level_code"
  LEVELS ||--o{ CHAPTERS : "level_code"
  LEVELS ||--o{ INVITE_CODES : "level_code"

  PROFILES ||--o| STUDENT_SETTINGS : "student_id"
  PROFILES ||--o{ STUDENT_NOTES : "student_id 🔒"
  PROFILES ||--o{ GROUP_MEMBERS : "student_id"
  GROUPS ||--o{ GROUP_MEMBERS : "group_id"
  GROUPS ||--o{ INVITE_CODES : "group_id"

  CHAPTERS ||--o{ LESSONS : "chapter_id"
  LESSONS ||--o{ LESSON_ACCESS : "lesson_id"
  PROFILES ||--o{ LESSON_ACCESS : "student_id"
  CHAPTERS ||--o{ EXERCISES : "chapter_id"
  EXERCISES ||--|| EXERCISE_SOLUTIONS : "exercise_id 🔒"

  SESSION_TYPES ||--o{ SESSIONS : "session_type_id"
  SESSION_SERIES ||--o{ SESSIONS : "series_id"
  PROFILES ||--o{ SESSIONS : "student_id"
  GROUPS ||--o{ SESSIONS : "group_id"
  CHAPTERS ||--o{ SESSIONS : "covered_chapter_id"
  SESSIONS ||--o{ SESSION_ATTENDANCE : "session_id"
  PROFILES ||--o{ SESSION_ATTENDANCE : "student_id"
  SESSIONS ||--o{ STUDENT_NOTES : "session_id"

  PROFILES {
    uuid id PK
    user_role role
    text full_name
    text email
    text phone
    text level_code FK
    text school
    text guardian_name
    text guardian_phone
    student_status status
  }
  LESSONS {
    uuid id PK
    uuid chapter_id FK
    text slug UK
    jsonb content
    publication_status status
    lesson_visibility visibility
    timestamptz published_at
  }
  EXERCISES {
    uuid id PK
    uuid chapter_id FK
    jsonb statement
    smallint difficulty
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
  SESSIONS {
    uuid id PK
    uuid student_id FK
    uuid group_id FK
    timestamptz starts_at
    timestamptz ends_at
    session_status status
    session_mode mode
    text recap
    timestamptz reminder_24h_sent_at
    timestamptz reminder_2h_sent_at
  }
  INVITE_CODES {
    text code PK
    int max_uses
    int used_count
    timestamptz expires_at
  }
```

## Who can read what

| Table                                | Signed out                        | Student                                                                  | Tutor       |
| ------------------------------------ | --------------------------------- | ------------------------------------------------------------------------ | ----------- |
| `levels`, `chapters`                 | all                               | all                                                                      | all, writes |
| `lessons`                            | published + public                | published + public, own level (`enrolled`), or listed in `lesson_access` | all, writes |
| `profiles`                           | —                                 | own row; may edit contact fields only                                    | all, writes |
| `student_settings`                   | —                                 | own row                                                                  | all, writes |
| `student_notes` 🔒                   | —                                 | —                                                                        | all, writes |
| `groups`, `group_members`            | —                                 | groups they belong to, own memberships                                   | all, writes |
| `invite_codes`                       | via `invite_code_is_valid()` only | via `invite_code_is_valid()` only                                        | all, writes |
| `exercises`, `exercise_solutions` 🔒 | —                                 | — (phase 1 opens exercises through assignments)                          | all, writes |
| `session_types`                      | active ones                       | active ones                                                              | all, writes |
| `sessions`                           | —                                 | own and own groups'                                                      | all, writes |
| `session_attendance`                 | —                                 | own rows                                                                 | all, writes |
| `session_series`                     | —                                 | —                                                                        | all, writes |

## Invariants the database enforces

- Exactly one tutor (`profiles_single_tutor` partial unique index).
- A new account is always a student, and needs a valid invite code or tutor provisioning (`private.handle_new_user`).
- Students can't change their role, status, level or email (`private.guard_profile_update`).
- A session belongs to one student or one group, never both.
- Confirmed sessions never overlap (`sessions_no_overlap` exclusion constraint).
- Every timestamp is `timestamptz`.
