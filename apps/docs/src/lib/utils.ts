import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Hook to detect user's preference for reduced motion.
 * Returns true if user prefers reduced motion, false otherwise.
 * Uses matchMedia for efficient change detection.
 */
export function usePrefersReducedMotion(): boolean {
  // Initialize with actual value on client to avoid flash of animation
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    // Sync in case SSR value differs
    setPrefersReducedMotion(mql.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}
