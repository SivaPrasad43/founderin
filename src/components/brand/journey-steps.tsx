import { JOURNEY_STEPS } from "@/lib/constants"

export function JourneySteps() {
  return (
    <div>
      <div className="mb-5 h-px bg-white/28" />
      <div className="eyebrow mb-5 flex justify-between text-white/55">
        <span>The FounderIn journey</span>
        <span>01 — 03</span>
      </div>
      <ol className="grid grid-cols-3 gap-2.5">
        {JOURNEY_STEPS.map((step, i) => (
          <li key={step.number} className="grid gap-2">
            <span
              className={
                i === JOURNEY_STEPS.length - 1
                  ? "text-[39px] leading-none font-light tracking-[-0.065em] text-brand-orange"
                  : "text-[39px] leading-none font-light tracking-[-0.065em] text-white/48"
              }
            >
              {step.number}
            </span>
            <span className="text-[11px] font-medium tracking-[-0.02em] text-white/88">
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
