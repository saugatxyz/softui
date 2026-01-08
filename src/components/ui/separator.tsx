"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ============================================================================
// Variants
// ============================================================================

const separatorVariants = cva("shrink-0 bg-border-muted", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

// ============================================================================
// Types
// ============================================================================

type SeparatorProps = SeparatorPrimitive.Props &
  VariantProps<typeof separatorVariants>

// ============================================================================
// Separator Component
// ============================================================================

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
export type { SeparatorProps }
