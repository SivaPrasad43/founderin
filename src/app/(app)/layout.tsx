import { AppHeader } from "@/components/app/app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-brand-canvas">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {children}
      </main>
      <footer className="pb-safe mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-t border-brand-stroke px-4 py-5 font-mono text-[9px] tracking-[0.015em] text-[#888B90] sm:px-6 lg:px-8">
        <span>FOUNDERIN © 2026</span>
        <span>BUILT FOR THE BUILDERS.</span>
      </footer>
    </div>
  )
}
