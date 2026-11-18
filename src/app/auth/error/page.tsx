import type { Metadata } from "next"
import Link from "next/link"
import { Alert02Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Icon } from "@/components/icon"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = { title: "Sign-in problem" }

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[6px] bg-white p-8 shadow-[0_2px_30px_rgba(38,39,45,0.05)] sm:p-10">
        <span className="mb-6 grid size-11 place-items-center rounded-[4px] bg-brand-orange/10 text-brand-orange">
          <Icon icon={Alert02Icon} size={22} />
        </span>
        <Eyebrow className="mb-4">Sign-in / Error</Eyebrow>
        <h1 className="tracking-display mb-3 text-[34px] leading-[1.08] font-[450] text-brand-ink">
          We couldn&apos;t sign you in<span className="text-brand-orange">.</span>
        </h1>
        <p className="mb-7 text-[14px] leading-[1.7] text-brand-muted">
          The Google sign-in was cancelled or the link expired. Please try again — if it keeps
          happening, make sure cookies are enabled for this site.
        </p>
        <Link
          href={ROUTES.landing}
          className="inline-flex h-11 items-center gap-2 rounded-[3px] bg-brand-blue px-4 text-[13px] font-semibold text-white transition-colors hover:bg-brand-blue-dark"
        >
          <Icon icon={ArrowLeft01Icon} size={16} />
          Back to sign in
        </Link>
      </div>
    </main>
  )
}
