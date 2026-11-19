import { Suspense } from "react"
import type { Metadata } from "next"
import { PageIntro } from "@/components/app/page-intro"
import { CommunityCard } from "@/components/home/community-card"
import { RoadmapList } from "@/components/home/roadmap-list"
import { Skeleton } from "@/components/ui/skeleton"
import { requireOnboardedProfile } from "@/features/profile/queries"

export const metadata: Metadata = { title: "Member home" }

export default function HomePage() {
  return (
    <div className="grid gap-10 sm:gap-12">
      <Suspense fallback={<HomeSkeleton />}>
        <MemberArea />
      </Suspense>
      <RoadmapList />
    </div>
  )
}

async function MemberArea() {
  const profile = await requireOnboardedProfile()
  const firstName = profile.full_name?.split(" ")[0]
  return (
    <div>
      <PageIntro
        eyebrow="Founding member / Early access"
        title={
          <>
            Welcome{firstName ? `, ${firstName}` : ""}
            <span className="text-brand-orange">.</span>
          </>
        }
        description="You're one of the first people here. Join the community and help shape what FounderIn becomes."
      />
      <CommunityCard joinedAt={profile.community_joined_at} />
    </div>
  )
}

function HomeSkeleton() {
  return (
    <div>
      <Skeleton className="mb-4 h-3 w-48" />
      <Skeleton className="mb-3 h-12 w-72 max-w-full" />
      <Skeleton className="mb-10 h-4 w-96 max-w-full" />
      <Skeleton className="h-64 rounded-[6px]" />
    </div>
  )
}
