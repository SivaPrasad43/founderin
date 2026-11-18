import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { ROUTES, safeNextPath } from "@/lib/routes"

/** OAuth (PKCE) return URL. Exchanges the code for a session cookie. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get("code")
  const oauthError = searchParams.get("error_description") ?? searchParams.get("error")

  if (oauthError || !code) {
    const url = new URL(ROUTES.authError, origin)
    url.searchParams.set("reason", oauthError ? "provider" : "missing_code")
    return NextResponse.redirect(url)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  if (error || !data.user) {
    const url = new URL(ROUTES.authError, origin)
    url.searchParams.set("reason", "exchange")
    return NextResponse.redirect(url)
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarded_at")
    .eq("id", data.user.id)
    .maybeSingle()

  const destination = profile?.onboarded_at
    ? safeNextPath(searchParams.get("next"), ROUTES.home)
    : ROUTES.onboarding

  return NextResponse.redirect(new URL(destination, origin))
}
