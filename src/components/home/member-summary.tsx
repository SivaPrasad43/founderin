import Link from "next/link"
import { PencilEdit02Icon } from "@hugeicons/core-free-icons"
import { MemberAvatar } from "@/components/app/user-menu"
import { Icon } from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { INVESTOR_TYPES, ROLE_META, SPECIALTIES } from "@/lib/constants"
import { ROUTES } from "@/lib/routes"
import type { Profile } from "@/types/database"

export function MemberSummary({ profile }: { profile: Profile }) {
  const name = profile.full_name || profile.email || "Member"
  const detail =
    INVESTOR_TYPES.find((t) => t.value === profile.investor_type)?.label ??
    SPECIALTIES.find((s) => s.value === profile.specialty)?.label

  return (
    <section
      aria-label="Your membership"
      className="flex flex-col gap-5 rounded-[6px] border border-brand-stroke bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <div className="flex min-w-0 items-center gap-4">
        <MemberAvatar name={name} avatarUrl={profile.avatar_url} className="size-12" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium text-brand-ink">{name}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {profile.role && (
              <Badge className="rounded-[3px] bg-brand-pale-blue px-2 font-mono text-[10px] tracking-[0.08em] text-brand-blue uppercase">
                {ROLE_META[profile.role].short}
              </Badge>
            )}
            {detail && <span className="truncate text-[12px] text-brand-muted">{detail}</span>}
          </div>
        </div>
      </div>
      <Link
        href={ROUTES.profile}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-[3px] border border-brand-stroke px-4 text-[13px] text-brand-ink transition-colors hover:border-brand-blue hover:text-brand-blue"
      >
        <Icon icon={PencilEdit02Icon} size={16} />
        Edit profile
      </Link>
    </section>
  )
}
