export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assignment_items: {
        Row: {
          assignment_id: string
          exercise_id: string
          position: number
        }
        Insert: {
          assignment_id: string
          exercise_id: string
          position?: number
        }
        Update: {
          assignment_id?: string
          exercise_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "assignment_items_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_items_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          created_at: string
          created_by: string
          due_at: string
          group_id: string | null
          id: string
          instructions: string | null
          student_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          due_at: string
          group_id?: string | null
          id?: string
          instructions?: string | null
          student_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          due_at?: string
          group_id?: string | null
          id?: string
          instructions?: string | null
          student_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      availability: {
        Row: {
          created_at: string
          end_time: string
          id: string
          session_type_id: string | null
          start_time: string
          weekday: number
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          session_type_id?: string | null
          start_time: string
          weekday: number
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          session_type_id?: string | null
          start_time?: string
          weekday?: number
        }
        Relationships: [
          {
            foreignKeyName: "availability_session_type_id_fkey"
            columns: ["session_type_id"]
            isOneToOne: false
            referencedRelation: "session_types"
            referencedColumns: ["id"]
          },
        ]
      }
      availability_exceptions: {
        Row: {
          created_at: string
          end_time: string | null
          ends_on: string
          id: string
          is_blocked: boolean
          note: string | null
          session_type_id: string | null
          start_time: string | null
          starts_on: string
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          ends_on: string
          id?: string
          is_blocked?: boolean
          note?: string | null
          session_type_id?: string | null
          start_time?: string | null
          starts_on: string
        }
        Update: {
          created_at?: string
          end_time?: string | null
          ends_on?: string
          id?: string
          is_blocked?: boolean
          note?: string | null
          session_type_id?: string | null
          start_time?: string | null
          starts_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_exceptions_session_type_id_fkey"
            columns: ["session_type_id"]
            isOneToOne: false
            referencedRelation: "session_types"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_settings: {
        Row: {
          cancellation_window_hours: number
          horizon_days: number
          id: boolean
          min_notice_hours: number
          updated_at: string
        }
        Insert: {
          cancellation_window_hours?: number
          horizon_days?: number
          id?: boolean
          min_notice_hours?: number
          updated_at?: string
        }
        Update: {
          cancellation_window_hours?: number
          horizon_days?: number
          id?: boolean
          min_notice_hours?: number
          updated_at?: string
        }
        Relationships: []
      }
      chapters: {
        Row: {
          created_at: string
          description: string | null
          id: string
          level_code: string
          position: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          level_code: string
          position?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          level_code?: string
          position?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_level_code_fkey"
            columns: ["level_code"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["code"]
          },
        ]
      }
      conversation_reads: {
        Row: {
          conversation_id: string
          last_read_at: string
          profile_id: string
        }
        Insert: {
          conversation_id: string
          last_read_at: string
          profile_id: string
        }
        Update: {
          conversation_id?: string
          last_read_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_reads_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_reads_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          group_id: string | null
          id: string
          last_message_at: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string
          group_id?: string | null
          id?: string
          last_message_at?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string
          group_id?: string | null
          id?: string
          last_message_at?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: true
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_reveals: {
        Row: {
          assignment_id: string
          exercise_id: string
          revealed_at: string
          student_id: string
        }
        Insert: {
          assignment_id: string
          exercise_id: string
          revealed_at?: string
          student_id: string
        }
        Update: {
          assignment_id?: string
          exercise_id?: string
          revealed_at?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_reveals_assignment_id_exercise_id_fkey"
            columns: ["assignment_id", "exercise_id"]
            isOneToOne: false
            referencedRelation: "assignment_items"
            referencedColumns: ["assignment_id", "exercise_id"]
          },
          {
            foreignKeyName: "exercise_reveals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_solutions: {
        Row: {
          correct_choice_ids: string[] | null
          correct_numeric: number | null
          exercise_id: string
          solution: Json
          tolerance: number | null
          tolerance_kind: Database["public"]["Enums"]["tolerance_kind"]
          updated_at: string
        }
        Insert: {
          correct_choice_ids?: string[] | null
          correct_numeric?: number | null
          exercise_id: string
          solution?: Json
          tolerance?: number | null
          tolerance_kind?: Database["public"]["Enums"]["tolerance_kind"]
          updated_at?: string
        }
        Update: {
          correct_choice_ids?: string[] | null
          correct_numeric?: number | null
          exercise_id?: string
          solution?: Json
          tolerance?: number | null
          tolerance_kind?: Database["public"]["Enums"]["tolerance_kind"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_solutions_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: true
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          answer_type: Database["public"]["Enums"]["answer_type"]
          chapter_id: string
          choice_mode: Database["public"]["Enums"]["choice_mode"] | null
          choices: Json | null
          created_at: string
          difficulty: number
          figure_path: string | null
          id: string
          statement: Json
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          answer_type?: Database["public"]["Enums"]["answer_type"]
          chapter_id: string
          choice_mode?: Database["public"]["Enums"]["choice_mode"] | null
          choices?: Json | null
          created_at?: string
          difficulty: number
          figure_path?: string | null
          id?: string
          statement: Json
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          answer_type?: Database["public"]["Enums"]["answer_type"]
          chapter_id?: string
          choice_mode?: Database["public"]["Enums"]["choice_mode"] | null
          choices?: Json | null
          created_at?: string
          difficulty?: number
          figure_path?: string | null
          id?: string
          statement?: Json
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          chat_from: string
          group_id: string
          joined_at: string
          left_at: string | null
          student_id: string
        }
        Insert: {
          chat_from?: string
          group_id: string
          joined_at?: string
          left_at?: string | null
          student_id: string
        }
        Update: {
          chat_from?: string
          group_id?: string
          joined_at?: string
          left_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          id: string
          level_code: string | null
          name: string
          schedule_label: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          level_code?: string | null
          name: string
          schedule_label?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          level_code?: string | null
          name?: string
          schedule_label?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_level_code_fkey"
            columns: ["level_code"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["code"]
          },
        ]
      }
      invite_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          group_id: string | null
          level_code: string | null
          max_uses: number
          used_count: number
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string | null
          group_id?: string | null
          level_code?: string | null
          max_uses?: number
          used_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string | null
          group_id?: string | null
          level_code?: string | null
          max_uses?: number
          used_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "invite_codes_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invite_codes_level_code_fkey"
            columns: ["level_code"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["code"]
          },
        ]
      }
      lesson_access: {
        Row: {
          granted_at: string
          lesson_id: string
          student_id: string
        }
        Insert: {
          granted_at?: string
          lesson_id: string
          student_id: string
        }
        Update: {
          granted_at?: string
          lesson_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_access_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_access_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          chapter_id: string
          content: Json
          created_at: string
          id: string
          position: number
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["publication_status"]
          summary: string | null
          title: string
          updated_at: string
          visibility: Database["public"]["Enums"]["lesson_visibility"]
        }
        Insert: {
          chapter_id: string
          content?: Json
          created_at?: string
          id?: string
          position?: number
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["publication_status"]
          summary?: string | null
          title: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["lesson_visibility"]
        }
        Update: {
          chapter_id?: string
          content?: Json
          created_at?: string
          id?: string
          position?: number
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["publication_status"]
          summary?: string | null
          title?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["lesson_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          code: string
          cycle: string
          label: string
          position: number
        }
        Insert: {
          code: string
          cycle: string
          label: string
          position: number
        }
        Update: {
          code?: string
          cycle?: string
          label?: string
          position?: number
        }
        Relationships: []
      }
      message_digests: {
        Row: {
          profile_id: string
          sent_at: string | null
          sent_up_to: string
        }
        Insert: {
          profile_id: string
          sent_at?: string | null
          sent_up_to: string
        }
        Update: {
          profile_id?: string
          sent_at?: string | null
          sent_up_to?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_digests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json
          body: string
          conversation_id: string
          created_at: string
          id: string
          sender_id: string
          sender_name: string
        }
        Insert: {
          attachments?: Json
          body?: string
          conversation_id: string
          created_at?: string
          id: string
          sender_id: string
          sender_name: string
        }
        Update: {
          attachments?: Json
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender_id?: string
          sender_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          emailed_at: string | null
          id: string
          payload: Json
          profile_id: string
          read_at: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          created_at?: string
          emailed_at?: string | null
          id?: string
          payload?: Json
          profile_id: string
          read_at?: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          created_at?: string
          emailed_at?: string | null
          id?: string
          payload?: Json
          profile_id?: string
          read_at?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_mad: number
          covers_from: string | null
          covers_scope: Database["public"]["Enums"]["plan_scope"] | null
          covers_to: string | null
          created_at: string
          hours_credited: number
          id: string
          label: string
          method: Database["public"]["Enums"]["payment_method"]
          note: string | null
          paid_on: string
          plan_id: string | null
          receipt_number: string
          student_id: string
          void_reason: string | null
          voided_at: string | null
        }
        Insert: {
          amount_mad: number
          covers_from?: string | null
          covers_scope?: Database["public"]["Enums"]["plan_scope"] | null
          covers_to?: string | null
          created_at?: string
          hours_credited?: number
          id?: string
          label: string
          method: Database["public"]["Enums"]["payment_method"]
          note?: string | null
          paid_on: string
          plan_id?: string | null
          receipt_number: string
          student_id: string
          void_reason?: string | null
          voided_at?: string | null
        }
        Update: {
          amount_mad?: number
          covers_from?: string | null
          covers_scope?: Database["public"]["Enums"]["plan_scope"] | null
          covers_to?: string | null
          created_at?: string
          hours_credited?: number
          id?: string
          label?: string
          method?: Database["public"]["Enums"]["payment_method"]
          note?: string | null
          paid_on?: string
          plan_id?: string | null
          receipt_number?: string
          student_id?: string
          void_reason?: string | null
          voided_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string
          hours: number | null
          id: string
          is_active: boolean
          kind: Database["public"]["Enums"]["plan_kind"]
          name: string
          period_months: number | null
          price_mad: number
          scope: Database["public"]["Enums"]["plan_scope"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          hours?: number | null
          id?: string
          is_active?: boolean
          kind: Database["public"]["Enums"]["plan_kind"]
          name: string
          period_months?: number | null
          price_mad: number
          scope?: Database["public"]["Enums"]["plan_scope"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          hours?: number | null
          id?: string
          is_active?: boolean
          kind?: Database["public"]["Enums"]["plan_kind"]
          name?: string
          period_months?: number | null
          price_mad?: number
          scope?: Database["public"]["Enums"]["plan_scope"]
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          category: Database["public"]["Enums"]["post_category"]
          content: Json
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["publication_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["post_category"]
          content?: Json
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["publication_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["post_category"]
          content?: Json
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["publication_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          guardian_name: string | null
          guardian_phone: string | null
          id: string
          level_code: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          school: string | null
          status: Database["public"]["Enums"]["student_status"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          guardian_name?: string | null
          guardian_phone?: string | null
          id: string
          level_code?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school?: string | null
          status?: Database["public"]["Enums"]["student_status"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: string
          level_code?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school?: string | null
          status?: Database["public"]["Enums"]["student_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_level_code_fkey"
            columns: ["level_code"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["code"]
          },
        ]
      }
      receipt_counters: {
        Row: {
          last: number
          year: number
        }
        Insert: {
          last: number
          year: number
        }
        Update: {
          last?: number
          year?: number
        }
        Relationships: []
      }
      session_attendance: {
        Row: {
          session_id: string
          status: Database["public"]["Enums"]["attendance_status"]
          student_id: string
        }
        Insert: {
          session_id: string
          status: Database["public"]["Enums"]["attendance_status"]
          student_id: string
        }
        Update: {
          session_id?: string
          status?: Database["public"]["Enums"]["attendance_status"]
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      session_series: {
        Row: {
          created_at: string
          ends_on: string | null
          id: string
          rule: string
          starts_on: string
        }
        Insert: {
          created_at?: string
          ends_on?: string | null
          id?: string
          rule?: string
          starts_on: string
        }
        Update: {
          created_at?: string
          ends_on?: string | null
          id?: string
          rule?: string
          starts_on?: string
        }
        Relationships: []
      }
      session_types: {
        Row: {
          created_at: string
          duration_min: number
          id: string
          is_active: boolean
          is_group: boolean
          mode: Database["public"]["Enums"]["session_mode"]
          name: string
          price_mad: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_min: number
          id?: string
          is_active?: boolean
          is_group?: boolean
          mode: Database["public"]["Enums"]["session_mode"]
          name: string
          price_mad: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_min?: number
          id?: string
          is_active?: boolean
          is_group?: boolean
          mode?: Database["public"]["Enums"]["session_mode"]
          name?: string
          price_mad?: number
          updated_at?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          covered_chapter_id: string | null
          created_at: string
          ends_at: string
          group_id: string | null
          homework: string | null
          id: string
          location: string | null
          meeting_url: string | null
          mode: Database["public"]["Enums"]["session_mode"]
          recap: string | null
          reminder_24h_sent_at: string | null
          reminder_2h_sent_at: string | null
          request_note: string | null
          requested_by: string | null
          series_id: string | null
          session_type_id: string
          starts_at: string
          status: Database["public"]["Enums"]["session_status"]
          student_id: string | null
          updated_at: string
        }
        Insert: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          covered_chapter_id?: string | null
          created_at?: string
          ends_at: string
          group_id?: string | null
          homework?: string | null
          id?: string
          location?: string | null
          meeting_url?: string | null
          mode: Database["public"]["Enums"]["session_mode"]
          recap?: string | null
          reminder_24h_sent_at?: string | null
          reminder_2h_sent_at?: string | null
          request_note?: string | null
          requested_by?: string | null
          series_id?: string | null
          session_type_id: string
          starts_at: string
          status?: Database["public"]["Enums"]["session_status"]
          student_id?: string | null
          updated_at?: string
        }
        Update: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          covered_chapter_id?: string | null
          created_at?: string
          ends_at?: string
          group_id?: string | null
          homework?: string | null
          id?: string
          location?: string | null
          meeting_url?: string | null
          mode?: Database["public"]["Enums"]["session_mode"]
          recap?: string | null
          reminder_24h_sent_at?: string | null
          reminder_2h_sent_at?: string | null
          request_note?: string | null
          requested_by?: string | null
          series_id?: string | null
          session_type_id?: string
          starts_at?: string
          status?: Database["public"]["Enums"]["session_status"]
          student_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_covered_chapter_id_fkey"
            columns: ["covered_chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "session_series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_session_type_id_fkey"
            columns: ["session_type_id"]
            isOneToOne: false
            referencedRelation: "session_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      site_profile: {
        Row: {
          areas: string | null
          bio: string | null
          city: string | null
          id: boolean
          tagline: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          areas?: string | null
          bio?: string | null
          city?: string | null
          id?: boolean
          tagline?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          areas?: string | null
          bio?: string | null
          city?: string | null
          id?: boolean
          tagline?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      student_notes: {
        Row: {
          body: string
          created_at: string
          id: string
          session_id: string | null
          student_id: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          session_id?: string | null
          student_id: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          session_id?: string | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_notes_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_notes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_settings: {
        Row: {
          auto_confirm_bookings: boolean
          objectives: string | null
          student_id: string
          updated_at: string
        }
        Insert: {
          auto_confirm_bookings?: boolean
          objectives?: string | null
          student_id: string
          updated_at?: string
        }
        Update: {
          auto_confirm_bookings?: boolean
          objectives?: string | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_settings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_comments: {
        Row: {
          anchor: Json | null
          author_id: string
          body: string
          created_at: string
          id: string
          submission_id: string
          updated_at: string
        }
        Insert: {
          anchor?: Json | null
          author_id: string
          body: string
          created_at?: string
          id?: string
          submission_id: string
          updated_at?: string
        }
        Update: {
          anchor?: Json | null
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          submission_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_comments_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          answer: Json
          assignment_id: string
          auto_graded: boolean
          corrected_at: string | null
          corrected_by: string | null
          exercise_id: string
          feedback: string | null
          file_paths: string[]
          grade: number | null
          id: string
          status: Database["public"]["Enums"]["submission_status"]
          student_id: string
          submitted_at: string
          updated_at: string
        }
        Insert: {
          answer?: Json
          assignment_id: string
          auto_graded?: boolean
          corrected_at?: string | null
          corrected_by?: string | null
          exercise_id: string
          feedback?: string | null
          file_paths?: string[]
          grade?: number | null
          id?: string
          status?: Database["public"]["Enums"]["submission_status"]
          student_id: string
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          answer?: Json
          assignment_id?: string
          auto_graded?: boolean
          corrected_at?: string | null
          corrected_by?: string | null
          exercise_id?: string
          feedback?: string | null
          file_paths?: string[]
          grade?: number | null
          id?: string
          status?: Database["public"]["Enums"]["submission_status"]
          student_id?: string
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_exercise_id_fkey"
            columns: ["assignment_id", "exercise_id"]
            isOneToOne: false
            referencedRelation: "assignment_items"
            referencedColumns: ["assignment_id", "exercise_id"]
          },
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_corrected_by_fkey"
            columns: ["corrected_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      assignment_hand_in_counts: {
        Row: {
          assignment_id: string | null
          students: number | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      account_statement: {
        Args: { p_student_id: string }
        Returns: {
          at: string
          balance_minutes: number
          covered: boolean
          minutes: number
          payment_id: string
          seq: number
          session_id: string
        }[]
      }
      add_session_reminder: {
        Args: { p_session_id: string }
        Returns: undefined
      }
      booking_calendar: {
        Args: { p_from: string; p_to: string }
        Returns: Json
      }
      cancel_my_session: {
        Args: { p_reason?: string; p_session_id: string }
        Returns: Database["public"]["Enums"]["session_status"]
      }
      cancel_sessions: {
        Args: { p_following?: boolean; p_reason?: string; p_session_id: string }
        Returns: string[]
      }
      claim_message_digest: {
        Args: { p_profile_id: string; p_up_to: string }
        Returns: string
      }
      claim_notification_email: {
        Args: { p_id: string }
        Returns: {
          assignment_id: string
          count: number
          due_at: string
          email: string
          full_name: string
          send: boolean
          stamp: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }[]
      }
      close_session: {
        Args: {
          p_attendance?: Json
          p_covered_chapter_id?: string
          p_homework?: string
          p_recap?: string
          p_session_id: string
          p_status: Database["public"]["Enums"]["session_status"]
        }
        Returns: undefined
      }
      create_assignment: {
        Args: {
          p_due_at: string
          p_exercise_ids: string[]
          p_group_id?: string
          p_instructions?: string
          p_student_id?: string
          p_title: string
        }
        Returns: string
      }
      delete_assignment: { Args: { p_id: string }; Returns: undefined }
      invite_code_is_valid: { Args: { p_code: string }; Returns: boolean }
      mark_conversation_read: {
        Args: { p_conversation_id: string; p_up_to: string }
        Returns: undefined
      }
      mark_notifications_read: { Args: { p_up_to: string }; Returns: undefined }
      message_digests_due: {
        Args: never
        Returns: {
          conversations: Json
          email: string
          full_name: string
          is_tutor: boolean
          newest: string
          profile_id: string
        }[]
      }
      my_inbox: {
        Args: never
        Returns: {
          conversation_id: string
          group_id: string
          group_name: string
          last_body: string
          last_files: number
          last_message_at: string
          last_sender_id: string
          last_sender_name: string
          student_id: string
          student_name: string
          student_status: Database["public"]["Enums"]["student_status"]
          unread: number
        }[]
      }
      notifications_to_email: { Args: { p_limit?: number }; Returns: string[] }
      plan_sessions: {
        Args: {
          p_group_id?: string
          p_location?: string
          p_meeting_url?: string
          p_mode?: Database["public"]["Enums"]["session_mode"]
          p_session_type_id: string
          p_starts_at: string[]
          p_student_id?: string
        }
        Returns: string
      }
      record_payment: {
        Args: {
          p_amount_mad: number
          p_covers_from?: string
          p_hours?: number
          p_label?: string
          p_method: Database["public"]["Enums"]["payment_method"]
          p_note?: string
          p_paid_on: string
          p_plan_id?: string
          p_student_id: string
        }
        Returns: {
          id: string
          receipt_number: string
        }[]
      }
      release_message_digest: {
        Args: { p_previous: string; p_profile_id: string; p_up_to: string }
        Returns: undefined
      }
      remove_test_payments: { Args: { p_ids: string[] }; Returns: number }
      request_session: {
        Args: {
          p_note?: string
          p_session_type_id: string
          p_starts_at: string
        }
        Returns: string
      }
      save_exercise: {
        Args: {
          p_answer_type: Database["public"]["Enums"]["answer_type"]
          p_chapter_id: string
          p_choice_mode: Database["public"]["Enums"]["choice_mode"]
          p_choices: Json
          p_correct_choice_ids: string[]
          p_correct_numeric: string
          p_difficulty: number
          p_id: string
          p_solution: Json
          p_statement: Json
          p_tags: string[]
          p_title: string
          p_tolerance: string
          p_tolerance_kind: Database["public"]["Enums"]["tolerance_kind"]
        }
        Returns: undefined
      }
      send_message: {
        Args: {
          p_attachments?: string[]
          p_body?: string
          p_conversation_id: string
          p_id: string
        }
        Returns: string
      }
      stale_message_files: { Args: { p_limit?: number }; Returns: string[] }
      student_accounts: {
        Args: { p_student_id?: string }
        Returns: {
          balance_minutes: number
          coverage: Json
          covered_until: string
          credited_minutes: number
          last_paid_on: string
          overdue_since: string
          student_id: string
          used_minutes: number
        }[]
      }
      submit_exercise_answer: {
        Args: {
          p_answer?: Json
          p_assignment_id: string
          p_exercise_id: string
          p_file_paths?: string[]
        }
        Returns: {
          answer: Json
          assignment_id: string
          auto_graded: boolean
          corrected_at: string | null
          corrected_by: string | null
          exercise_id: string
          feedback: string | null
          file_paths: string[]
          grade: number | null
          id: string
          status: Database["public"]["Enums"]["submission_status"]
          student_id: string
          submitted_at: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "submissions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      void_payment: {
        Args: { p_payment_id: string; p_reason: string }
        Returns: undefined
      }
    }
    Enums: {
      answer_type: "upload" | "numeric" | "mcq"
      attendance_status: "present" | "absent" | "excuse"
      choice_mode: "unique" | "multiple"
      lesson_visibility: "public" | "enrolled" | "specific"
      notification_type:
        | "booking_requested"
        | "booking_made"
        | "booking_cancelled"
        | "booking_confirmed"
        | "booking_declined"
        | "session_planned"
        | "session_cancelled"
        | "session_moved"
        | "session_reminder"
        | "assignment_new"
        | "correction_ready"
      payment_method: "especes" | "virement" | "cheque" | "transfert"
      plan_kind: "hour_pack" | "subscription"
      plan_scope: "tous" | "individuel" | "groupe"
      post_category: "methode" | "examens" | "erreurs" | "orientation"
      publication_status: "draft" | "published"
      session_mode: "en_ligne" | "domicile" | "chez_prof"
      session_status:
        | "en_attente"
        | "planifiee"
        | "terminee"
        | "annulee"
        | "absent"
        | "refusee"
      student_status: "actif" | "en_pause" | "arrete"
      submission_status: "rendu" | "corrige"
      tolerance_kind: "absolue" | "relative"
      user_role: "tutor" | "student" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      answer_type: ["upload", "numeric", "mcq"],
      attendance_status: ["present", "absent", "excuse"],
      choice_mode: ["unique", "multiple"],
      lesson_visibility: ["public", "enrolled", "specific"],
      notification_type: [
        "booking_requested",
        "booking_made",
        "booking_cancelled",
        "booking_confirmed",
        "booking_declined",
        "session_planned",
        "session_cancelled",
        "session_moved",
        "session_reminder",
        "assignment_new",
        "correction_ready",
      ],
      payment_method: ["especes", "virement", "cheque", "transfert"],
      plan_kind: ["hour_pack", "subscription"],
      plan_scope: ["tous", "individuel", "groupe"],
      post_category: ["methode", "examens", "erreurs", "orientation"],
      publication_status: ["draft", "published"],
      session_mode: ["en_ligne", "domicile", "chez_prof"],
      session_status: [
        "en_attente",
        "planifiee",
        "terminee",
        "annulee",
        "absent",
        "refusee",
      ],
      student_status: ["actif", "en_pause", "arrete"],
      submission_status: ["rendu", "corrige"],
      tolerance_kind: ["absolue", "relative"],
      user_role: ["tutor", "student", "parent"],
    },
  },
} as const
