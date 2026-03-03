"use client"

import * as React from "react"
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset"

import { cn } from "../lib/utils"

// ============================================================================
// Types
// ============================================================================

type FieldsetRootProps = FieldsetPrimitive.Root.Props & {
  className?: string
}

type FieldsetLegendProps = FieldsetPrimitive.Legend.Props & {
  className?: string
}

// ============================================================================
// Fieldset Root
// ============================================================================

function FieldsetRoot({ className, children, ...props }: FieldsetRootProps) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset"
      className={cn(
        "flex flex-col gap-[var(--space-24)] border-0 p-0 m-0",
        className
      )}
      {...props}
    >
      {children}
    </FieldsetPrimitive.Root>
  )
}

// ============================================================================
// Fieldset Legend
// ============================================================================

function FieldsetLegend({ className, children, ...props }: FieldsetLegendProps) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="fieldset-legend"
      className={cn(
        "text-[length:var(--font-size-l)] font-[var(--font-weight-semibold)] leading-[var(--line-height-l)] text-content-strong p-0",
        className
      )}
      {...props}
    >
      {children}
    </FieldsetPrimitive.Legend>
  )
}

// ============================================================================
// Compound Component
// ============================================================================

const Fieldset = Object.assign(FieldsetRoot, {
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
})

export { Fieldset, FieldsetRoot, FieldsetLegend }
export type { FieldsetRootProps, FieldsetLegendProps }
