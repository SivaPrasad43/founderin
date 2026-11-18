import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "FounderIn — A place for what you're building",
    template: "%s · FounderIn",
  },
  description:
    "FounderIn is building a new home for founders to document their journey, showcase their startups, and be discovered.",
  openGraph: {
    title: "FounderIn — A place for what you're building",
    description:
      "Join the founding community of FounderIn — for people who build, back, and believe in startups.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#2548C6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
