import Image from "next/image"
import { cn } from "@/lib/utils"

const LOGO_SRC = "/brand/founderin-logo.png"
const RATIO = 278 / 1370

type LogoProps = {
  /** "light" = white logo for blue surfaces; "brand" = blue logo for light surfaces */
  tone?: "light" | "brand"
  width?: number
  className?: string
  priority?: boolean
}

export function Logo({ tone = "light", width = 160, className, priority }: LogoProps) {
  const height = Math.round(width * RATIO)

  if (tone === "light") {
    return (
      <Image
        src={LOGO_SRC}
        alt="FounderIn"
        width={width}
        height={height}
        priority={priority}
        className={cn("h-auto select-none", className)}
      />
    )
  }

  // Tint the white PNG to brand blue via CSS mask.
  return (
    <span
      role="img"
      aria-label="FounderIn"
      className={cn("inline-block bg-brand-blue", className)}
      style={{
        width,
        height,
        maskImage: `url(${LOGO_SRC})`,
        WebkitMaskImage: `url(${LOGO_SRC})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  )
}
