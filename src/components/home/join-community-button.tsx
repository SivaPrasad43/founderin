"use client"

import { useRouter } from "next/navigation"
import { ArrowUpRight01Icon, WhatsappIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@/components/icon"
import { ROUTES } from "@/lib/routes"
import { cn } from "@/lib/utils"

/**
 * Opens the members-only join route in a new tab (WhatsApp app on mobile),
 * then refreshes this page so the "joined" state shows.
 */
export function JoinCommunityButton({ joined }: { joined: boolean }) {
  const router = useRouter()
  return (
    <a
      href={ROUTES.communityJoin}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => setTimeout(() => router.refresh(), 1500)}
      className={cn(
        "group inline-flex h-13 w-full items-center justify-between gap-6 rounded-[3px] px-4 text-[14px] font-semibold transition-[background-color,transform] hover:-translate-y-px active:translate-y-0 sm:w-auto sm:min-w-[300px]",
        joined
          ? "border border-white/40 bg-white/10 text-white hover:bg-white/15"
          : "bg-white text-brand-blue hover:bg-brand-pale-blue",
      )}
    >
      <span className="flex items-center gap-3">
        <Icon icon={WhatsappIcon} size={20} />
        {joined ? "Open WhatsApp community" : "Join the WhatsApp community"}
      </span>
      <Icon
        icon={ArrowUpRight01Icon}
        size={20}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
