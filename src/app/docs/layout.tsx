import { DocsSidebar } from "@/components/docs/sidebar"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-surface-page">
      <DocsSidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <ThemeSwitcher />
        <main className="flex-1 overflow-y-auto pt-[80px]">
          {children}
        </main>
      </div>
    </div>
  )
}
