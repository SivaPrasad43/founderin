"use client"

import { useState } from "react"
import { ArrowUpRight01Icon, Loading03Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import { GoogleLogo } from "@/components/brand/google-logo"
import { Icon } from "@/components/icon"
import { createClient } from "@/lib/supabase/client"
import { ROUTES, safeNextPath } from "@/lib/routes"
import { cn } from "@/lib/utils"

export function GoogleSignInButton({ className }: { className?: string }) {
  const [pending, setPending] = useState(false)

  async function handleClick() {
    setPending(true)
    try {
      const next = safeNextPath(new URLSearchParams(window.location.search).get("next"))
      const redirectTo = new URL(ROUTES.authCallback, window.location.origin)
      redirectTo.searchParams.set("next", next)

      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo.toString(),
          queryParams: { prompt: "select_account" },
        },
      })
      if (error) throw error
      // Browser is navigating to Google — keep the pending state.
    } catch {
      setPending(false)
      toast.error("Couldn't reach Google sign-in. Please try again.")
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-busy={pending}
      className={cn(
        "group flex h-14 w-full items-center justify-between gap-3 rounded-[3px] border border-brand-blue bg-brand-blue pr-4 pl-2.5 text-[14px] font-semibold text-white transition-[background-color,transform] duration-200",
        "hover:-translate-y-px hover:bg-brand-blue-dark active:translate-y-0 disabled:cursor-wait disabled:opacity-90 disabled:hover:translate-y-0",
        className,
      )}
    >
      <span className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-[3px] bg-white text-brand-blue">
          {pending ? (
            <Icon icon={Loading03Icon} size={18} className="animate-spin" />
          ) : (
            <GoogleLogo size={18} />
          )}
        </span>
        {pending ? "Redirecting to Google…" : "Continue with Google"}
      </span>
      <Icon
        icon={ArrowUpRight01Icon}
        size={20}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
  )
}
