"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { DocsSidebar } from "@/components/docs/sidebar"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { navSections } from "@/components/docs/nav-sections"
import { cn } from "@/lib/utils"

type DocsShellProps = {
  children: React.ReactNode
}

type SpringControls = {
  bounce: number
  duration: number
  delay?: number
}

const springFromControls = ({ bounce, duration, delay = 0 }: SpringControls) => {
  const clampedBounce = Math.min(Math.max(bounce, 0), 1)
  const clampedDuration = Math.max(duration, 0.15)
  const mass = 1
  const dampingRatio = 1 - clampedBounce * 0.9
  const angularFrequency = 4 / (dampingRatio * clampedDuration)
  const stiffness = mass * angularFrequency * angularFrequency
  const damping = 2 * dampingRatio * angularFrequency * mass

  return { type: "spring" as const, stiffness, damping, mass, delay }
}

export function DocsShell({ children }: DocsShellProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const sheetSpring = springFromControls({
    bounce: 0.1,
    duration: 0.1,
    delay: 0,
  })
  const sheetContentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.04 },
    },
  }
  const sheetItemVariants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }
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

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-[color:rgb(var(--darken-40))]"
              initial={{
                opacity: 0,
                backdropFilter: "blur(0px)",
              }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                backdropFilter: "blur(0px)",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <motion.div
              id="docs-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="absolute bottom-[var(--space-8)] left-[var(--space-8)] right-[var(--space-8)] max-h-[80vh] rounded-[16px] bg-surface-overlay"
              initial={{ y: "100%", opacity: 0, filter: "blur(20px)" }}
              animate={{
                y: dragOffset,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{ y: "100%", opacity: 0, filter: "blur(20px)" }}
              transition={
                isDragging ? { duration: 0 } : sheetSpring
              }
            >
              <motion.div
                className="flex flex-col gap-[var(--space-16)] p-[var(--space-8)]"
                variants={sheetContentVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <motion.div
                  variants={sheetItemVariants}
                  className="flex items-center justify-center py-[var(--space-8)] touch-none"
                  onPointerDown={handleDragStart}
                  onPointerMove={handleDragMove}
                  onPointerUp={handleDragEnd}
                  onPointerCancel={handleDragEnd}
                >
                  <span className="h-[4px] w-[40px] rounded-full bg-border-muted" />
                </motion.div>
                {navSections.map((section) => (
                  <motion.div
                    key={section.title}
                    variants={sheetItemVariants}
                    className="flex flex-col gap-[var(--space-2)]"
                  >
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
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
