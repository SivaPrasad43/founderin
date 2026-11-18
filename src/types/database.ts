/**
 * Supabase types. Regenerate after schema changes:
 *   pnpm db:types
 * Hand-written to match supabase/migrations/0001_profiles.sql.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          role: Database["public"]["Enums"]["member_role"] | null
          investor_type: string | null
          specialty: string | null
          onboarded_at: string | null
          community_joined_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: Database["public"]["Enums"]["member_role"] | null
          investor_type?: string | null
          specialty?: string | null
          onboarded_at?: string | null
          community_joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: Database["public"]["Enums"]["member_role"] | null
          investor_type?: string | null
          specialty?: string | null
          onboarded_at?: string | null
          community_joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      member_role: "founder" | "investor" | "associate" | "mentor"
    }
    CompositeTypes: Record<string, never>
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
