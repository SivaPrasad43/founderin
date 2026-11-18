import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getServerEnv } from "@/lib/server-env"
import { ROUTES } from "@/lib/routes"

/**
 * Members-only redirect to the WhatsApp community.
 * Records the first click so we know who has joined. The invite URL is
 * never rendered into HTML, so it can't be scraped from a public page.
 */
export async function GET(request: NextRequest) {
  const { origin } = request.nextUrl
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub
  if (!userId) return NextResponse.redirect(new URL(ROUTES.landing, origin))

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarded_at, community_joined_at")
    .eq("id", userId)
    .maybeSingle()

  if (!profile?.onboarded_at) {
    return NextResponse.redirect(new URL(ROUTES.onboarding, origin))
  }

  if (!profile.community_joined_at) {
    await supabase
      .from("profiles")
      .update({ community_joined_at: new Date().toISOString() })
      .eq("id", userId)
  }

  const { WHATSAPP_COMMUNITY_URL } = getServerEnv()
  const response = NextResponse.redirect(WHATSAPP_COMMUNITY_URL, { status: 303 })
  response.headers.set("Cache-Control", "private, no-store")
  return response
}
