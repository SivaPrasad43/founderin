import { Suspense } from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { PageIntro } from "@/components/app/page-intro"
import { RoleForm } from "@/components/onboarding/role-form"
import { Skeleton } from "@/components/ui/skeleton"
import { completeOnboarding } from "@/features/profile/actions"
import { requireProfile } from "@/features/profile/queries"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = { title: "Welcome" }

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageIntro
        eyebrow="Step 01 / 02 — Your role"
        title={
          <>
            Tell us how you&apos;ll
            <br className="hidden sm:block" /> take part<span className="text-brand-orange">.</span>
          </>
        }
        description="This helps us shape the community and what we build next. You can change it anytime."
      />
      <div className="rounded-[6px] border border-brand-stroke bg-white p-5 sm:p-8">
        <Suspense fallback={<FormSkeleton />}>
          <OnboardingForm />
        </Suspense>
      </div>
    </div>
  )
}

async function OnboardingForm() {
  const profile = await requireProfile()
  if (profile.onboarded_at) redirect(ROUTES.home)
  return <RoleForm action={completeOnboarding} submitLabel="Continue to community" />
}

function FormSkeleton() {
  return (
    <div className="grid gap-3">
      <Skeleton className="h-4 w-20" />
      <div className="grid gap-2.5 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[88px] rounded-[4px]" />
        ))}
      </div>
      <Skeleton className="mt-3 h-13 w-full rounded-[3px] sm:w-[260px]" />
    </div>
  )
}
