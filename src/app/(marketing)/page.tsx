import { BrandPanel } from "@/components/brand/brand-panel"
import { AuthPanel } from "@/components/marketing/auth-panel"

/**
 * Public landing. Fully static — signed-in users are redirected to /home
 * by the proxy before this renders.
 */
export default function LandingPage() {
  return (
    <div className="flex min-h-dvh items-stretch justify-center lg:items-center lg:p-4 xl:p-6">
      <main
        aria-label="FounderIn welcome and access page"
        className="flex w-full max-w-[1460px] flex-col overflow-hidden bg-brand-paper lg:grid lg:min-h-[min(900px,calc(100dvh-32px))] lg:grid-cols-2 lg:rounded-[7px] lg:shadow-[0_2px_30px_rgba(38,39,45,0.035)] xl:min-h-[min(900px,calc(100dvh-48px))]"
      >
        <BrandPanel />
        <AuthPanel />
      </main>
    </div>
  )
}
