import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const kbdVariants = cva(
  [
    // Layout
    "inline-flex items-center justify-center shrink-0",
    // Sizing
    "min-w-[var(--space-20)] h-[var(--space-20)] px-[var(--space-4)]",
    // Appearance
    "rounded-[var(--radius-6)] overflow-clip",
    // Typography - use system font for better unicode support (⌘, ⇧, etc.)
    "font-[family-name:system-ui] text-[length:var(--font-size-xs)] font-medium leading-[var(--line-height-xs)]",
    "text-center whitespace-nowrap",
    // Shadow (utility/shortcut effect)
    "shadow-[0_0_0_1px_var(--color-utility-kbd-border),0_0_1px_0_var(--color-utility-shadow-l4),0_1px_2px_0_var(--color-utility-shadow-l4)]",
  ],
  {
    variants: {
      variant: {
        tertiary: [
          "bg-actions-tertiary-default",
          "text-content-subtle",
        ],
        inverted: [
          "bg-utility-kbd",
          "text-content-inverse-strong",
        ],
      },
    },
    defaultVariants: {
      variant: "tertiary",
    },
  }
)

type KbdProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof kbdVariants>

function Kbd({ className, variant, children, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      data-variant={variant}
      className={cn(kbdVariants({ variant }), className)}
      {...props}
    >
      {children}
    </kbd>
  )
}

// ============================================================================
// KbdGroup - renders multiple keyboard keys with proper spacing
// ============================================================================

type KbdGroupProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof kbdVariants> & {
    keys: string[]
  }

function KbdGroup({ className, variant, keys, ...props }: KbdGroupProps) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-[var(--space-4)]", className)}
      {...props}
    >
      {keys.map((key, index) => (
        <Kbd key={index} variant={variant}>
          {key}
        </Kbd>
      ))}
    </span>
  )
}

export { Kbd, KbdGroup, kbdVariants }
export type { KbdProps, KbdGroupProps }
