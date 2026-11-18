import Link from "next/link"
import { Eyebrow } from "@/components/brand/eyebrow"
import { ROUTES } from "@/lib/routes"

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <Eyebrow className="mb-4 justify-center">Error / 404</Eyebrow>
        <h1 className="tracking-display mb-3 text-[44px] leading-[1.05] font-[450] text-brand-ink">
          Page not found<span className="text-brand-orange">.</span>
        </h1>
        <p className="mb-7 text-[14px] text-brand-muted">This page doesn&apos;t exist (yet).</p>
        <Link
          href={ROUTES.landing}
          className="inline-flex h-11 items-center rounded-[3px] bg-brand-blue px-5 text-[13px] font-semibold text-white hover:bg-brand-blue-dark"
        >
          Go to FounderIn
        </Link>
      </div>
    </main>
  )
}
