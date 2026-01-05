"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { RadioControl, type RadioControlProps } from "./radio-control"

const radioGroupItemTypes = ["simple", "list", "card-small", "card-big"] as const
type RadioGroupItemType = (typeof radioGroupItemTypes)[number]

const radioGroupItemVariants = cva(
  "group relative flex items-start gap-[var(--space-12)] transition-[background-color] duration-200 ease-out",
  {
    variants: {
      type: {
        simple: "px-0 py-[var(--space-8)]",
        list: "border-b border-border-subtle px-0 py-[var(--space-10)] last:border-b-0",
        "card-small":
          "items-center rounded-[var(--radius-12)] bg-surface-interactive-default p-[var(--space-10)] hover:bg-surface-interactive-hover",
        "card-big":
          "items-center rounded-[var(--radius-12)] bg-surface-interactive-default p-[var(--space-12)] hover:bg-surface-interactive-hover",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      // Disabled cards don't change bg on hover
      {
        type: "card-small",
        disabled: true,
        className: "hover:bg-surface-interactive-default",
      },
      {
        type: "card-big",
        disabled: true,
        className: "hover:bg-surface-interactive-default",
      },
    ],
    defaultVariants: {
      type: "simple",
      disabled: false,
    },
  }
)

type RadioGroupItemProps = Omit<RadioControlProps, "className" | "prefix"> & {
  type?: RadioGroupItemType
  label: string
  description?: string
  badge?: React.ReactNode
  prefix?: React.ReactNode
  className?: string
}

// Context for RadioGroup to pass down the type
type RadioGroupContextValue = {
  type?: RadioGroupItemType
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

function useRadioGroupContext() {
  return React.useContext(RadioGroupContext)
}

function RadioGroupItem({
  type: typeProp,
  label,
  description,
  badge,
  prefix,
  value,
  disabled = false,
  className,
  ...props
}: RadioGroupItemProps) {
  const context = useRadioGroupContext()
  const type = typeProp ?? context?.type ?? "simple"

  const isSimple = type === "simple"
  const isList = type === "list"
  const isCardSmall = type === "card-small"
  const isCardBig = type === "card-big"
  const isCard = isCardSmall || isCardBig

  // For simple/list types: radio on left
  // For card types: radio on right with prefix on left
  const showRadioOnLeft = isSimple || isList
  const showRadioOnRight = isCard
  const showDescription = (isList || isCard) && description
  const showPrefix = isCard && prefix

  // Detect if prefix is a plain icon (no container) - needs offset with description
  const isPrefixPlainIcon = React.isValidElement(prefix) &&
    (prefix.props as { type?: string })?.type === "icon"

  return (
    <label
      data-slot="radio-group-item"
      data-type={type}
      data-disabled={disabled || undefined}
      className={cn(
        radioGroupItemVariants({ type, disabled }),
        // Focus-visible styling for card types
        isCard && "has-[:focus-visible]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
    >
      {/* Prefix (card types only) */}
      {showPrefix && (
        <span
          data-slot="prefix-wrapper"
          className={cn(
            "flex shrink-0 items-center",
            isCardSmall && "self-start",
            isPrefixPlainIcon && showDescription && "-mt-[2px]"
          )}
        >
          {prefix}
        </span>
      )}

      {/* Radio on left (simple/list types) */}
      {showRadioOnLeft && (
        <span className="flex h-[20px] shrink-0 items-center">
          <RadioControl
            value={value}
            disabled={disabled}
            {...props}
          />
        </span>
      )}

      {/* Label and description */}
      <span
        data-slot="label-container"
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          (isList || isCard) && "gap-[var(--space-2)]"
        )}
      >
        <span
          data-slot="label"
          className={cn(
            "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
            disabled ? "text-content-muted" : "text-content-strong"
          )}
        >
          {label}
        </span>
        {showDescription && (
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

      {/* Badge (simple/list types only - inline) */}
      {badge && !isCard && (
        <span
          data-slot="badge-wrapper"
          className="flex shrink-0 items-center"
        >
          {badge}
        </span>
      )}

      {/* Suffix container with badge and radio (card types) */}
      {showRadioOnRight && (
        <span
          data-slot="suffix-wrapper"
          className="flex shrink-0 items-start gap-[var(--space-8)] self-stretch pr-[var(--space-2)] pt-[var(--space-2)]"
        >
          {badge}
          <span className="flex h-[20px] shrink-0 items-center">
            <RadioControl
              value={value}
              disabled={disabled}
              {...props}
            />
          </span>
        </span>
      )}
    </label>
  )
}

export {
  RadioGroupItem,
  RadioGroupContext,
  useRadioGroupContext,
  radioGroupItemTypes,
  radioGroupItemVariants,
}
export type { RadioGroupItemProps, RadioGroupItemType, RadioGroupContextValue }
