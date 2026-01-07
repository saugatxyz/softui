"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { DocsSidebar } from "@/components/docs/sidebar"
import { SoftLogo } from "@/components/docs/soft-logo"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { navSections } from "@/components/docs/nav-sections"
import { Dialog } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type DocsShellProps = {
  children: React.ReactNode
}

export function DocsShell({ children }: DocsShellProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-dvh flex-col bg-surface-page">
      <ThemeSwitcher onMenuOpen={() => setMenuOpen(true)} menuOpen={menuOpen} />
      <div className="flex flex-1 overflow-hidden">
        <DocsSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup position="sheet">
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title><SoftLogo /></Dialog.Title>
                <Dialog.Close />
              </Dialog.Header>
              <Dialog.Body className="p-0">
                <div className="flex flex-col gap-[var(--space-16)] overflow-y-auto px-[var(--space-12)] py-[var(--space-16)]">
                  {navSections.map((section) => (
                    <div
                      key={section.title}
                      className="flex flex-col gap-[var(--space-2)]"
                    >
                      {section.items.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = "icon" in item ? item.icon : null
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "flex h-[36px] items-center rounded-[var(--radius-10)] px-[var(--space-12)] text-[14px] leading-[20px] font-[var(--font-weight-default)] transition",
                              isActive
                                ? "bg-surface-interactive-default text-content-strong font-[var(--font-weight-medium)]"
                                : "text-content-subtle hover:bg-surface-interactive-hover"
                            )}
                          >
                            {Icon ? (
                              <Icon className="mr-[var(--space-6)] size-4" />
                            ) : null}
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
