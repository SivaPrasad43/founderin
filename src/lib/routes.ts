export const ROUTES = {
  landing: "/",
  home: "/home",
  onboarding: "/onboarding",
  profile: "/profile",
  authCallback: "/auth/callback",
  authError: "/auth/error",
  communityJoin: "/community/join",
} as const

/** Paths that require a signed-in user (checked optimistically in proxy). */
export const PROTECTED_PREFIXES = [
  ROUTES.home,
  ROUTES.onboarding,
  ROUTES.profile,
  "/community",
] as const

/** Only allow same-origin relative redirects (prevents open redirects). */
export function safeNextPath(next: string | null | undefined, fallback: string = ROUTES.home) {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return fallback
  }
  return next
}
