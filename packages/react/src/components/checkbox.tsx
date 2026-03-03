"use client"

import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"

import { cn } from "../lib/utils"
import { CheckboxControl, type CheckboxControlProps } from "./checkbox-control"

type CheckboxProps = CheckboxControlProps & {
  label?: React.ReactNode
  description?: React.ReactNode
  containerClassName?: string
}

function Checkbox({
  label,
  description,
  containerClassName,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)

  if (!hasLabel && !hasDescription) {
    return <CheckboxControl className={className} disabled={disabled} {...props} />
  }

  return (
    <FieldPrimitive.Root
      data-slot="checkbox"
      data-disabled={disabled || undefined}
      disabled={disabled}
      className={cn(containerClassName)}
    >
      <FieldPrimitive.Label
        data-slot="checkbox-label"
        className={cn(
          "group flex cursor-pointer gap-[var(--space-12)] select-none",
          hasDescription ? "items-start" : "items-center",
          disabled && "cursor-not-allowed"
        )}
      >
        <span className="flex h-[var(--space-20)] shrink-0 items-center">
          <CheckboxControl className={className} disabled={disabled} {...props} />
        </span>
        <span
          data-slot="label-text"
          className={cn(
            "flex min-w-0 flex-1 flex-col",
            hasLabel && hasDescription && "gap-[var(--space-2)]"
          )}
        >
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
            <FieldPrimitive.Description
              data-slot="description"
              className={cn(
                "text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
                disabled ? "text-content-muted" : "text-content-subtle"
              )}
            >
              {description}
            </FieldPrimitive.Description>
          )}
        </span>
      </FieldPrimitive.Label>
    </FieldPrimitive.Root>
  )
}

export { Checkbox }
export type { CheckboxProps }
