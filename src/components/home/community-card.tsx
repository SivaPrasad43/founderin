import { CheckmarkCircle02Icon, UserGroupIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@/components/icon"
import { JoinCommunityButton } from "./join-community-button"

export function CommunityCard({ joinedAt }: { joinedAt: string | null }) {
  const joined = Boolean(joinedAt)
  return (
    <section
      aria-labelledby="community-heading"
      className="relative isolate overflow-hidden rounded-[6px] bg-brand-blue p-6 text-white sm:p-8 lg:p-10"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full border border-white/15 sm:size-80"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -bottom-28 size-56 rounded-full border border-white/10"
      />

      <p className="eyebrow mb-5 flex items-center gap-3 text-white/75">
        <span aria-hidden className="size-[7px] bg-brand-orange" />
        Founding community
      </p>

      <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2
            id="community-heading"
            className="tracking-display mb-3 text-[clamp(30px,6vw,44px)] leading-[1.05] font-normal"
          >
            {joined ? "You're in the room" : "Your seat is ready"}
            <span className="text-brand-orange">.</span>
          </h2>
          <p className="max-w-md text-[14px] leading-[1.7] text-white/78">
            {joined
              ? "Thanks for joining. Jump back into the conversation anytime — introductions, feedback and early previews happen there first."
              : "Meet other founding members, share what you're building and help shape FounderIn. The community lives on WhatsApp for now."}
          </p>
        </div>
        <JoinCommunityButton joined={joined} />
      </div>

      <div className="relative z-10 mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-5 text-[12px] text-white/70">
        <span className="inline-flex items-center gap-2">
          <Icon icon={UserGroupIcon} size={16} />
          Members only invite
        </span>
        {joined && (
          <span className="inline-flex items-center gap-2 text-white">
            <Icon icon={CheckmarkCircle02Icon} size={16} className="text-brand-orange" />
            Joined{" "}
            {new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(
              new Date(joinedAt!),
            )}
          </span>
        )}
      </div>
    </section>
  )
}
