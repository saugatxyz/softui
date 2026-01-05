"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CheckboxControl, type CheckboxControlProps } from "./checkbox-control"

type CheckboxProps = Omit<CheckboxControlProps, "className"> & {
  label?: string
  description?: string
  className?: string
}

function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate,
  disabled,
  className,
  ...props
}: CheckboxProps) {
  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)

  return (
    <label
      data-slot="checkbox"
      data-disabled={disabled || undefined}
      className={cn(
        "group inline-flex cursor-pointer items-start gap-[var(--space-12)]",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      {/* Checkbox control wrapper for vertical alignment */}
      <span className="flex h-[20px] shrink-0 items-center">
        <CheckboxControl
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          indeterminate={indeterminate}
          disabled={disabled}
          {...props}
        />
      </span>

      {/* Label and description */}
      {(hasLabel || hasDescription) && (
        <span className="flex min-w-0 flex-col gap-[var(--space-2)]">
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
    </label>
  )
}

export { Checkbox }
export type { CheckboxProps }
