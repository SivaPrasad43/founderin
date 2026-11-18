import { cn } from "@/lib/utils"

/** Mono uppercase label with a leading rule, e.g. "— FOUNDING COMMUNITY". */
export function Eyebrow({
  children,
  className,
  rule = true,
}: {
  children: React.ReactNode
  className?: string
  rule?: boolean
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-brand-blue", className)}>
      {rule && <span aria-hidden className="h-px w-6 bg-current" />}
      {children}
    </p>
  )
}
