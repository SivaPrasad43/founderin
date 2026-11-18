import { CheckmarkCircle02Icon, LockIcon } from "@hugeicons/core-free-icons"
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Icon } from "@/components/icon"
import { InfoDialog } from "./info-dialog"

const PERKS = [
  "Founding member access to the WhatsApp community",
  "Early say in what FounderIn builds next",
  "One account for founders, investors, associates & mentors",
]

export function AuthPanel() {
  return (
    <section
      aria-label="Join or sign in"
      className="relative flex flex-1 flex-col bg-brand-paper px-6 pt-6 pb-6 sm:px-10 sm:pt-8 lg:px-[60px] lg:pt-12 lg:pb-8"
    >
      <nav aria-label="Secondary" className="flex items-center justify-end gap-5 sm:gap-7">
        <InfoDialog kind="platform">
          <button type="button" className="py-1 text-[11px] text-brand-ink transition-colors hover:text-brand-blue">
            The platform
          </button>
        </InfoDialog>
        <span aria-hidden className="h-2.5 w-px bg-[#D5D6D9]" />
        <InfoDialog kind="investors">
          <button type="button" className="py-1 text-[11px] text-brand-ink transition-colors hover:text-brand-blue">
            For investors
          </button>
        </InfoDialog>
      </nav>

      <div className="mx-auto my-auto w-full max-w-[480px] py-8 sm:py-14 lg:py-10">
        <Eyebrow className="mb-5 sm:mb-6">Founding community / Early access</Eyebrow>
        <h2 className="tracking-display mb-4 text-[clamp(40px,10vw,56px)] leading-[1.05] font-[450] text-brand-ink lg:text-[clamp(46px,4.2vw,65px)]">
          Be here from
          <br />
          the beginning.
        </h2>
        <p className="mb-6 max-w-[425px] sm:mb-8 text-[13px] leading-[1.7] text-brand-muted sm:text-sm">
          We&apos;re building FounderIn for people who build, back, and believe in startups. Join the
          early community as the platform takes shape.
        </p>

        <ul className="mb-7 grid gap-3 border-t border-brand-stroke pt-5 sm:mb-8 sm:pt-6">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-start gap-3 text-[13px] leading-snug text-brand-ink">
              <Icon icon={CheckmarkCircle02Icon} size={18} className="mt-px shrink-0 text-brand-blue" />
              {perk}
            </li>
          ))}
        </ul>

        <GoogleSignInButton />

        <p className="mt-4 flex items-start gap-2 text-[11px] leading-[1.6] text-[#8B8E95]">
          <Icon icon={LockIcon} size={14} className="mt-0.5 shrink-0" />
          <span>
            We only use your Google name, email and photo to set up your membership.{" "}
            <strong className="font-medium text-brand-ink">No investment opportunity is guaranteed.</strong>
          </span>
        </p>
      </div>

      <footer className="pb-safe flex items-center justify-between gap-4 border-t border-brand-stroke pt-5 font-mono text-[9px] tracking-[0.015em] text-[#888B90]">
        <span>FOUNDERIN © 2026</span>
        <span className="text-[#6D717A]">BUILT FOR THE BUILDERS.</span>
      </footer>
    </section>
  )
}
