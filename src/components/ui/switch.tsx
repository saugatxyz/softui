"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { SwitchControl, type SwitchControlProps } from "./switch-control"

const switchVariants = cva(
  "group inline-flex cursor-pointer items-start gap-[var(--space-12)]",
  {
    variants: {
      position: {
        right: "flex-row",
        left: "flex-row-reverse",
      },
      isCard: {
        true: "rounded-[var(--radius-12)] bg-surface-interactive-default p-[var(--space-16)]",
        false: "",
      },
    },
    defaultVariants: {
      position: "right",
      isCard: false,
    },
  }
)

type SwitchProps = Omit<SwitchControlProps, "className"> &
  VariantProps<typeof switchVariants> & {
    label?: string
    description?: string
    className?: string
  }

function Switch({
  label,
  description,
  position = "right",
  isCard = false,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
  ...props
}: SwitchProps) {
  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)

  return (
    <label
      data-slot="switch"
      data-position={position}
      data-card={isCard || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        switchVariants({ position, isCard }),
        disabled && "cursor-not-allowed",
        className
      )}
    >
      {/* Label and description */}
      {(hasLabel || hasDescription) && (
        <span className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]">
          {hasLabel && (
            <span
              data-slot="label"
              className={cn(
                "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
                disabled ? "text-content-muted" : "text-content-strong"
              )}
            >
              {label}
            </span>
          )}
          {hasDescription && (
            <span
              data-slot="description"
              className={cn(
                "text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
                disabled ? "text-content-muted" : "text-content-subtle"
              )}
            >
              {description}
            </span>
          )}
        </span>
      )}

      {/* Switch control wrapper for vertical alignment */}
      <span className="flex h-[20px] shrink-0 items-center">
        <SwitchControl
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          {...props}
        />
      </span>
    </label>
  )
}

export { Switch, switchVariants }
export type { SwitchProps }
