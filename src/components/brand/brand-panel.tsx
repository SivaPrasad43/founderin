import { Logo } from "./logo"
import { JourneySteps } from "./journey-steps"

export function BrandPanel() {
  return (
    <section
      aria-label="About FounderIn"
      className="relative isolate flex flex-col overflow-hidden bg-brand-blue px-6 pt-5 pb-7 text-white sm:px-10 sm:pt-9 sm:pb-10 lg:px-14 lg:pt-10 lg:pb-11 xl:px-[61px]"
    >
      {/* decorative ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[12%] -right-36 size-56 rounded-full border border-white/17 sm:-right-40 sm:size-72 lg:top-[35%] lg:-right-56 lg:size-[410px]"
      />

      <header className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col items-start gap-1.5">
          <Logo tone="light" width={190} priority className="w-[150px] -translate-x-1 sm:w-[190px] lg:w-[213px]" />
          <span className="max-w-[250px] text-[10px] leading-snug tracking-[-0.014em] text-white/80 sm:max-w-none sm:text-[11px]">
            From Hashir usman Universe for founders
          </span>
        </div>
        <span className="hidden font-mono text-[10px] tracking-[0.1em] whitespace-nowrap text-white/60 xl:block">
          FI / 001—2026
        </span>
      </header>

      <div className="relative z-10 mt-8 mb-0 sm:mt-14 lg:my-auto lg:py-12">
        <p className="eyebrow mb-4 flex items-center gap-3 text-white/78 sm:mb-7">
          <span aria-hidden className="size-[7px] shrink-0 bg-brand-orange" />
          The startup ecosystem, in progress
        </p>
        <h1 className="tracking-display mb-4 text-[clamp(40px,11vw,64px)] leading-[1.02] font-normal sm:mb-7 md:text-[68px] lg:text-[clamp(56px,5.7vw,91px)] lg:leading-[0.99]">
          Every startup
          <br />
          has a story.
          <br />
          Make it seen<span className="text-brand-orange">.</span>
        </h1>
        <p className="hidden max-w-[440px] text-[13px] min-[400px]:block leading-[1.7] tracking-[-0.012em] text-white/78 sm:text-[15px] lg:text-base">
          A space to show what you&apos;re building, document the progress behind it, and create
          opportunities for the right people to discover it.
        </p>
      </div>

      <footer className="relative z-10 mt-10 hidden md:block lg:mt-0">
        <JourneySteps />
      </footer>
    </section>
  )
}
