import { Eyebrow } from "@/components/brand/eyebrow"

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h1 className="tracking-display mb-3 text-[clamp(34px,8vw,52px)] leading-[1.04] font-[450] text-brand-ink">
        {title}
      </h1>
      {description && (
        <p className="max-w-xl text-[14px] leading-[1.7] text-brand-muted">{description}</p>
      )}
    </div>
  )
}
