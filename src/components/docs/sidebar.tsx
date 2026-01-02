"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { navSections } from "@/components/docs/nav-sections"

export function DocsSidebar() {
  const pathname = usePathname()
  const navRef = React.useRef<HTMLDivElement | null>(null)
  const [indicatorTop, setIndicatorTop] = React.useState<number | null>(null)
  const [indicatorMotion, setIndicatorMotion] = React.useState(false)
  const previousTop = React.useRef<number | null>(null)

  const updateIndicator = React.useCallback(() => {
    const nav = navRef.current
    if (!nav) return
    const activeItem = nav.querySelector(
      '[data-sidebar-item="true"][data-active="true"]'
    ) as HTMLElement | null
    if (!activeItem) {
      setIndicatorTop(null)
      return
    }
    const navRect = nav.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    const indicatorHeight = 12
    const nextTop =
      itemRect.top - navRect.top + (itemRect.height - indicatorHeight) / 2
    const prevTop = previousTop.current
    const distance = prevTop === null ? 0 : Math.abs(nextTop - prevTop)
    setIndicatorMotion(distance > 0 && distance <= 160)
    setIndicatorTop(nextTop)
    previousTop.current = nextTop
  }, [])

  React.useLayoutEffect(() => {
    updateIndicator()
  }, [pathname, updateIndicator])

  React.useEffect(() => {
    const handleResize = () => updateIndicator()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateIndicator])

  return (
    <aside className="hidden h-screen w-[280px] shrink-0 flex-col bg-surface-canvas md:flex">
      <div className="flex h-full flex-col gap-[var(--space-16)] px-[var(--space-12)] pb-[var(--space-12)] pt-[var(--space-20)]">
        <div className="flex h-[36px] items-center px-[var(--space-12)] text-body-xl-semibold text-content-strong">
          SoftUI
        </div>
        <nav
          ref={navRef}
          className="relative flex flex-1 flex-col gap-[var(--space-20)]"
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-[calc(var(--space-12)*-1-0.75px)] top-0 h-[12px] w-[1.5px] rounded-full bg-[var(--color-border-interactive-active)]",
              indicatorMotion
                ? "transition-transform duration-200 ease-out"
                : "transition-none"
            )}
            style={{
              transform:
                indicatorTop === null
                  ? "translateY(0)"
                  : `translateY(${indicatorTop}px)`,
              opacity: indicatorTop === null ? 0 : 1,
            }}
          />
          {navSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-[var(--space-2)]">
              <div className="flex h-[32px] items-center px-[var(--space-12)] text-[12px] uppercase leading-[20px] font-[var(--font-weight-semibold)] tracking-[0.75px] text-content-muted">
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
                      data-sidebar-item="true"
                      data-active={isActive ? "true" : "false"}
                      className={cn(
                        "relative flex h-[32px] w-full items-center rounded-[var(--radius-10)] px-[var(--space-12)] text-[14px] leading-[20px] font-[var(--font-weight-default)] transition",
                        isActive
                          ? "bg-surface-interactive-default text-content-strong font-[var(--font-weight-medium)]"
                          : "text-content-subtle hover:bg-surface-interactive-hover"
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
