import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { publicEnv } from "@/lib/env"
import type { Database } from "@/types/database"
import { PROTECTED_PREFIXES, ROUTES } from "@/lib/routes"

/**
 * Refreshes the Supabase session cookie and performs optimistic
 * route gating. Real authorization still happens in the DAL / RLS.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value))
        },
      },
    },
  )

  // Do not run code between createServerClient and getClaims().
  const { data } = await supabase.auth.getClaims()
  const isAuthed = Boolean(data?.claims?.sub)
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  if (!isAuthed && isProtected) {
    return redirectWithCookies(request, response, ROUTES.landing, { next: pathname })
  }

  if (isAuthed && pathname === ROUTES.landing) {
    return redirectWithCookies(request, response, ROUTES.home)
  }

  return response
}

function redirectWithCookies(
  request: NextRequest,
  source: NextResponse,
  pathname: string,
  params?: Record<string, string>,
) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  url.search = ""
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const redirect = NextResponse.redirect(url)
  // Carry over refreshed auth cookies + no-cache headers.
  source.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie))
  source.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "location") redirect.headers.set(key, value)
  })
  return redirect
}
