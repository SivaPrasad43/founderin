import { CheckmarkCircle02Icon, Clock01Icon, SparklesIcon } from "@hugeicons/core-free-icons"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Icon } from "@/components/icon"
import { ROADMAP } from "@/lib/constants"
import { cn } from "@/lib/utils"

const STATUS = {
  live: { label: "Live", icon: CheckmarkCircle02Icon, className: "bg-brand-blue text-white" },
  next: { label: "Up next", icon: SparklesIcon, className: "bg-brand-orange/10 text-brand-orange" },
  planned: { label: "Planned", icon: Clock01Icon, className: "bg-brand-canvas text-brand-muted" },
} as const

export function RoadmapList() {
  return (
    <section aria-labelledby="roadmap-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <Eyebrow className="mb-3">What&apos;s coming</Eyebrow>
          <h2 id="roadmap-heading" className="text-[22px] font-medium tracking-[-0.04em] text-brand-ink">
            FounderIn, taking shape
          </h2>
        </div>
        <span className="font-mono text-[10px] tracking-[0.1em] text-brand-muted">
          01 — {String(ROADMAP.length).padStart(2, "0")}
        </span>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {ROADMAP.map((item, i) => {
          const status = STATUS[item.status]
          return (
            <li
              key={item.title}
              className="flex flex-col gap-4 rounded-[6px] border border-brand-stroke bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-[32px] leading-none font-light tracking-[-0.065em]",
                    item.status === "live" ? "text-brand-blue" : "text-brand-ink/25",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                    status.className,
                  )}
                >
                  <Icon icon={status.icon} size={13} />
                  {status.label}
                </span>
              </div>
              <div>
                <h3 className="mb-1 text-[15px] font-medium text-brand-ink">{item.title}</h3>
                <p className="text-[13px] leading-[1.6] text-brand-muted">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
