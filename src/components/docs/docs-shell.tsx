"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { DocsSidebar } from "@/components/docs/sidebar"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { navSections } from "@/components/docs/nav-sections"
import { cn } from "@/lib/utils"

type DocsShellProps = {
  children: React.ReactNode
}

export function DocsShell({ children }: DocsShellProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const dragStartY = React.useRef(0)
  const dragOffsetRef = React.useRef(0)
  const dragThreshold = 96
  const pathname = usePathname()

  React.useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  React.useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  React.useEffect(() => {
    if (menuOpen) return
    setDragOffset(0)
    setIsDragging(false)
  }, [menuOpen])

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!menuOpen) return
    dragStartY.current = event.clientY
    dragOffsetRef.current = 0
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const nextOffset = Math.max(0, event.clientY - dragStartY.current)
    dragOffsetRef.current = nextOffset
    setDragOffset(nextOffset)
  }

  const handleDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    const shouldClose = dragOffsetRef.current > dragThreshold
    setIsDragging(false)
    setDragOffset(0)
    if (shouldClose) {
      setMenuOpen(false)
    }
  }

  return (
    <div className="flex h-screen bg-surface-page">
      <DocsSidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <ThemeSwitcher onMenuOpen={() => setMenuOpen(true)} menuOpen={menuOpen} />
        <main className="flex-1 overflow-y-auto pt-0 md:pt-[80px]">
          {children}
        </main>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-[color:rgb(var(--darken-40))] transition-opacity",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          id="docs-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={cn(
            "absolute bottom-[var(--space-8)] left-[var(--space-8)] right-[var(--space-8)] max-h-[80vh] rounded-[16px] bg-surface-overlay",
            isDragging
              ? "transition-none"
              : "transition-transform duration-200 ease-out"
          )}
          style={{
            transform: menuOpen ? `translateY(${dragOffset}px)` : "translateY(100%)",
          }}
        >
          <div className="flex flex-col gap-[var(--space-16)] p-[var(--space-8)]">
            <div
              className="flex items-center justify-center pb-[var(--space-8)] touch-none"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <span className="h-[4px] w-[40px] rounded-full bg-border-muted" />
            </div>
            {navSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-[var(--space-4)]">
                <div className="px-[var(--space-12)] text-[12px] uppercase leading-[20px] font-[var(--font-weight-semibold)] tracking-[0.75px] text-content-muted">
                  {section.title}
                </div>
                <div className="flex flex-col gap-[var(--space-4)]">
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
                        {Icon ? <Icon className="mr-[var(--space-6)] size-4" /> : null}
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
