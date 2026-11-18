import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react"

/** Consistent Hugeicons wrapper. Decorative by default (aria-hidden). */
export function Icon({ size = 18, strokeWidth = 1.8, ...props }: HugeiconsIconProps) {
  return <HugeiconsIcon size={size} strokeWidth={strokeWidth} aria-hidden focusable={false} {...props} />
}
