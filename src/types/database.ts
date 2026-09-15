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
      exercise_solutions: {
        Row: {
          correct_choice_ids: string[] | null
          correct_numeric: number | null
          exercise_id: string
          solution: Json
          tolerance: number | null
          updated_at: string
        }
        Insert: {
          correct_choice_ids?: string[] | null
          correct_numeric?: number | null
          exercise_id: string
          solution?: Json
          tolerance?: number | null
          updated_at?: string
        }
        Update: {
          correct_choice_ids?: string[] | null
          correct_numeric?: number | null
          exercise_id?: string
          solution?: Json
          tolerance?: number | null
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
          group_id: string
          joined_at: string
          student_id: string
        }
        Insert: {
          group_id: string
          joined_at?: string
          student_id: string
        }
        Update: {
          group_id?: string
          joined_at?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      invite_code_is_valid: { Args: { p_code: string }; Returns: boolean }
    }
    Enums: {
      answer_type: "upload" | "numeric" | "mcq"
      attendance_status: "present" | "absent" | "excuse"
      lesson_visibility: "public" | "enrolled" | "specific"
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
      lesson_visibility: ["public", "enrolled", "specific"],
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
      user_role: ["tutor", "student", "parent"],
    },
  },
} as const
