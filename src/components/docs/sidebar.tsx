"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { HomeIcon, InputMethodIcon, LayoutLeftIcon, PaletteIcon } from "@/icons"
import { cn } from "@/lib/utils"

const navSections = [
  {
    title: "Overview",
    items: [
      {
        label: "Welcome",
        href: "/docs",
        icon: HomeIcon,
      },
    ],
  },
  {
    title: "Tokens",
    items: [
      { label: "Colors", href: "/docs/tokens/colors", icon: PaletteIcon },
      {
        label: "Spacing & Radius",
        href: "/docs/tokens/spacing",
        icon: LayoutLeftIcon,
      },
      {
        label: "Typography",
        href: "/docs/tokens/typography",
        icon: InputMethodIcon,
      },
    ],
  },
  {
    title: "Components",
    items: [{ label: "Button", href: "/docs/button" }],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden h-screen w-[280px] shrink-0 flex-col bg-surface-canvas md:flex">
      <div className="flex h-full flex-col gap-[var(--space-16)] p-[var(--space-12)]">
        <nav className="flex flex-1 flex-col gap-[var(--space-12)]">
          {navSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-[var(--space-2)]">
              <div className="flex h-[32px] items-center text-[12px] uppercase leading-[20px] font-[var(--font-weight-semibold)] text-content-strong">
                {section.title}
              </div>
              <div className="flex flex-col gap-[var(--space-2)]">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = "icon" in item ? item.icon : null
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex h-[32px] w-full items-center rounded-[var(--radius-10)] px-[var(--space-12)] text-[14px] leading-[20px] font-[var(--font-weight-default)] transition",
                        isActive
                          ? "bg-surface-interactive-default text-content-strong font-[var(--font-weight-medium)]"
                          : "text-content-subtle hover:text-content-strong"
                      )}
                    >
                      {Icon ? <Icon className="mr-[var(--space-6)] size-4" /> : null}
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
