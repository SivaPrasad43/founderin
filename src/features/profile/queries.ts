import "server-only"
import { cache } from "react"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { ROUTES } from "@/lib/routes"
import type { Profile } from "@/types/database"

/**
 * Data Access Layer for the signed-in member.
 * `cache` dedupes calls within a single request render.
 */
export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  // Session reads are per-request and Supabase checks token expiry with
  // Date.now(), so opt out of prerendering explicitly (Cache Components).
  await connection()
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub
  if (!userId) return null

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle()
  if (error) throw new Error(`Failed to load profile: ${error.message}`)
  return data
})

/** Signed-in member, or redirect to landing. */
export async function requireProfile(): Promise<Profile> {
  const profile = await getCurrentProfile()
  if (!profile) redirect(ROUTES.landing)
  return profile
}

/** Signed-in member who has finished onboarding, or redirect. */
export async function requireOnboardedProfile(): Promise<Profile> {
  const profile = await requireProfile()
  if (!profile.onboarded_at) redirect(ROUTES.onboarding)
  return profile
}
