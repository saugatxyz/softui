"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ScrollFadeContainerProps = {
  /** Maximum height before scrolling (default: 320px) */
  maxHeight?: number
  /** Custom className for the outer container */
  className?: string
  /** Custom className for the scroll container */
  scrollClassName?: string
  /** Border radius for fade corners (default: var(--radius-12)) */
  borderRadius?: string
  children: React.ReactNode
}

function ScrollFadeContainer({
  maxHeight = 320,
  className,
  scrollClassName,
  borderRadius = "var(--radius-12)",
  children,
}: ScrollFadeContainerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const topFadeRef = React.useRef<HTMLDivElement>(null)
  const bottomFadeRef = React.useRef<HTMLDivElement>(null)
  const [needsScroll, setNeedsScroll] = React.useState(false)

  const updateFades = React.useCallback(() => {
    const el = scrollRef.current
    const topFade = topFadeRef.current
    const bottomFade = bottomFadeRef.current
    if (!el || !topFade || !bottomFade) return

    const hasOverflow = el.scrollHeight > el.clientHeight
    const scrollTop = el.scrollTop
    const scrollBottom = el.scrollHeight - el.clientHeight - scrollTop

    setNeedsScroll(hasOverflow)

    // Direct DOM updates for immediate visual feedback
    topFade.style.opacity = scrollTop > 1 ? "1" : "0"
    bottomFade.style.opacity = scrollBottom > 1 ? "1" : "0"
  }, [])

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Initial check after render
    const timer = setTimeout(updateFades, 0)

    // Check on scroll - use passive for performance
    el.addEventListener("scroll", updateFades, { passive: true })

    // Check on resize/mutation
    const resizeObserver = new ResizeObserver(updateFades)
    resizeObserver.observe(el)

    // Check when focus moves within container (keyboard nav scrolls items into view)
    const handleFocusIn = () => {
      // Small delay to let browser finish scrolling focused element into view
      setTimeout(updateFades, 50)
    }
    el.addEventListener("focusin", handleFocusIn)

    // Also check on mouseenter (in case scroll happened while menu was animating)
    el.addEventListener("mouseenter", updateFades)

    return () => {
      clearTimeout(timer)
      el.removeEventListener("scroll", updateFades)
      el.removeEventListener("focusin", handleFocusIn)
      el.removeEventListener("mouseenter", updateFades)
      resizeObserver.disconnect()
    }
  }, [updateFades])

  return (
    <div className={cn("relative flex flex-col", className)}>
      {/* Top fade */}
      <div
        ref={topFadeRef}
        data-slot="scroll-fade-top"
        className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[var(--space-16)] bg-gradient-to-b from-surface-overlay to-transparent transition-opacity duration-150 opacity-0"
        style={{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}
      />

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        data-slot="scroll-container"
        className={cn(
          "flex flex-col gap-[var(--space-2)] p-[var(--space-4)] scroll-p-[var(--space-4)]",
          needsScroll ? "overflow-y-auto" : "overflow-y-visible",
          scrollClassName
        )}
        style={{ maxHeight }}
      >
        {children}
      </div>

      {/* Bottom fade */}
      <div
        ref={bottomFadeRef}
        data-slot="scroll-fade-bottom"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[var(--space-16)] bg-gradient-to-t from-surface-overlay to-transparent transition-opacity duration-150 opacity-0"
        style={{ borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }}
      />
    </div>
  )
}

export { ScrollFadeContainer }
export type { ScrollFadeContainerProps }
