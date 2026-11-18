import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { PageIntro } from "@/components/app/page-intro"
import { MemberAvatar } from "@/components/app/user-menu"
import { Icon } from "@/components/icon"
import { RoleForm } from "@/components/onboarding/role-form"
import { Skeleton } from "@/components/ui/skeleton"
import { updateRole } from "@/features/profile/actions"
import { requireOnboardedProfile } from "@/features/profile/queries"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = { title: "Your profile" }

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={ROUTES.home}
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-brand-muted transition-colors hover:text-brand-blue"
      >
        <Icon icon={ArrowLeft01Icon} size={16} />
        Member home
      </Link>
      <PageIntro
        eyebrow="Account / Profile"
        title={
          <>
            Your profile<span className="text-brand-orange">.</span>
          </>
        }
        description="Your name and photo come from your Google account. Update how you take part below."
      />
      <Suspense fallback={<Skeleton className="h-[480px] rounded-[6px]" />}>
        <ProfileContent />
      </Suspense>
    </div>
  )
}

async function ProfileContent() {
  const profile = await requireOnboardedProfile()
  const name = profile.full_name || profile.email || "Member"
  return (
    <div className="grid gap-4">
      <section
        aria-label="Google account"
        className="flex items-center gap-4 rounded-[6px] border border-brand-stroke bg-white p-5 sm:p-6"
      >
        <MemberAvatar name={name} avatarUrl={profile.avatar_url} className="size-14" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium text-brand-ink">{name}</p>
          <p className="truncate text-[13px] text-brand-muted">{profile.email}</p>
        </div>
      </section>
      <section aria-label="Role" className="rounded-[6px] border border-brand-stroke bg-white p-5 sm:p-8">
        <RoleForm
          action={updateRole}
          submitLabel="Save changes"
          defaults={{
            role: profile.role,
            investorType: profile.investor_type,
            specialty: profile.specialty,
          }}
        />
      </section>
    </div>
  )
}
