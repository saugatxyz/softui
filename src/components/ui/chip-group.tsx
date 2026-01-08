"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChipContext, type ChipContextValue } from "./chip"

const chipGroupVariants = cva("flex flex-wrap gap-[var(--space-4)]", {
  variants: {
    size: {
      s: "",
      m: "",
    },
  },
  defaultVariants: {
    size: "s",
  },
})

type ChipGroupProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof chipGroupVariants> & {
    label?: string
    description?: string
  }

function ChipGroup({
  className,
  size = "s",
  label,
  description,
  children,
  ...props
}: ChipGroupProps) {
  const contextValue = React.useMemo<ChipContextValue>(
    () => ({ size: size ?? "s" }),
    [size]
  )

  const hasHeader = label || description

  return (
    <ChipContext.Provider value={contextValue}>
      <div
        data-slot="chip-group"
        data-size={size}
        className={cn("flex flex-col", hasHeader && "gap-[var(--space-8)]")}
      >
        {hasHeader && (
          <div data-slot="header" className="flex flex-col gap-[var(--space-2)]">
            {label && (
              <span
                data-slot="label"
                className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong"
              >
                {label}
              </span>
            )}
            {description && (
              <span
                data-slot="description"
                className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle"
              >
                {description}
              </span>
            )}
          </div>
        )}
        <div
          role="group"
          className={cn(chipGroupVariants({ size }), className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </ChipContext.Provider>
  )
}

export { ChipGroup, chipGroupVariants }
export type { ChipGroupProps }
