"use client"

import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import { cva, type VariantProps } from "class-variance-authority"
import { RiErrorWarningFill } from "@remixicon/react"

import { cn } from "@/lib/utils"

// ============================================================================
// Variants
// ============================================================================

const labelVariants = cva("flex w-full flex-col items-start gap-[var(--space-2)]", {
  variants: {
    size: {
      s: "",
      m: "",
      l: "",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

// ============================================================================
// Types
// ============================================================================

type FieldSize = "s" | "m" | "l"

type FieldProps = VariantProps<typeof labelVariants> & {
  /** Label text displayed above the control */
  label?: string
  /** Description text displayed below the label */
  description?: string
  /** Error message displayed below the control */
  error?: string
  /** Disabled state - affects label/description styling */
  disabled?: boolean
  /** Children (the form control) */
  children: React.ReactNode
  /** Additional class name */
  className?: string
}

// ============================================================================
// Field Component
// ============================================================================

function Field({
  className,
  size,
  label,
  description,
  error,
  disabled,
  children,
}: FieldProps) {
  const resolvedSize: FieldSize = size ?? "m"
  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)
  const hasError = Boolean(error)

  const labelSection = (hasLabel || hasDescription) && (
    <div
      data-slot="label-container"
      className={cn(labelVariants({ size: resolvedSize }))}
    >
      {hasLabel && (
        <FieldPrimitive.Label
          data-slot="label"
          className={cn(
            "font-[var(--font-weight-medium)]",
            resolvedSize === "s"
              ? "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]"
              : "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
            disabled ? "text-content-muted" : "text-content-strong"
          )}
        >
          {label}
        </FieldPrimitive.Label>
      )}
      {hasDescription && (
        <FieldPrimitive.Description
          data-slot="description"
          className={cn(
            "font-[var(--font-weight-default)]",
            "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
            disabled ? "text-content-muted" : "text-content-subtle"
          )}
        >
          {description}
        </FieldPrimitive.Description>
      )}
    </div>
  )

  return (
    <FieldPrimitive.Root
      data-slot="field"
      data-size={resolvedSize}
      disabled={disabled}
      invalid={hasError}
      className={cn("flex w-full flex-col gap-[var(--space-8)]", className)}
    >
      {/* Label section */}
      {labelSection}

      {/* Form control (children) */}
      {children}

      {/* Error message */}
      {hasError && (
        <div
          data-slot="error"
          className="flex w-full items-center gap-[var(--space-4)]"
        >
          <RiErrorWarningFill className="size-[16px] shrink-0 text-content-feedback-danger-strong" />
          <span className="flex-1 text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-feedback-danger-strong">
            {error}
          </span>
        </div>
      )}
    </FieldPrimitive.Root>
  )
}

export { Field }
export type { FieldProps, FieldSize }
