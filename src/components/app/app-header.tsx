import { Suspense } from "react"
import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentProfile } from "@/features/profile/queries"
import { ROUTES } from "@/lib/routes"
import { UserMenu } from "./user-menu"

export function AppHeader() {
  return (
    <header className="pt-safe sticky top-0 z-40 border-b border-brand-stroke bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={ROUTES.home} aria-label="FounderIn home" className="flex items-center">
          <Logo tone="brand" width={132} />
        </Link>
        <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
          <HeaderUser />
        </Suspense>
      </div>
    </header>
  )
}

async function HeaderUser() {
  const profile = await getCurrentProfile()
  if (!profile) return null
  return (
    <UserMenu
      name={profile.full_name || profile.email || "Member"}
      email={profile.email}
      avatarUrl={profile.avatar_url}
      onboarded={Boolean(profile.onboarded_at)}
    />
  )
}
