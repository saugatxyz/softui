"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { navSections } from "@/components/docs/nav-sections"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden h-full w-[280px] shrink-0 flex-col overflow-y-auto md:flex">
      <div className="flex flex-col gap-[var(--space-16)] px-[var(--space-12)] pb-[var(--space-32)]">
        <nav className="flex flex-1 flex-col gap-[var(--space-20)]">
          {navSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-[var(--space-2)]">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = "icon" in item ? item.icon : null
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex w-full items-center"
                  >
                    <span
                      className={cn(
                        "flex h-[32px] w-fit items-center rounded-[var(--radius-10)] px-[var(--space-12)] text-[14px] leading-[20px] font-[var(--font-weight-default)] transition",
                        isActive
                          ? "bg-surface-interactive-default text-content-strong font-[var(--font-weight-medium)]"
                          : "text-content-subtle group-hover:bg-surface-interactive-hover"
                      )}
                    >
                      {Icon ? <Icon className="mr-[var(--space-6)] size-4" /> : null}
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
