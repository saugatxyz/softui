"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { CheckboxControl, type CheckboxControlProps } from "./checkbox-control"

const checkboxGroupItemTypes = ["simple", "list", "card-small", "card-big"] as const
type CheckboxGroupItemType = (typeof checkboxGroupItemTypes)[number]

const checkboxGroupItemVariants = cva(
  "group relative flex items-start gap-[var(--space-12)] transition-[background-color] duration-200 ease-out",
  {
    variants: {
      type: {
        simple: "px-0 py-[var(--space-8)]",
        list: "border-b border-border-subtle px-0 py-[var(--space-10)] last:border-b-0",
        "card-small":
          "items-center gap-[var(--space-8)] rounded-[var(--radius-12)] bg-surface-interactive-default p-[var(--space-10)] hover:bg-surface-interactive-hover",
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

type CheckboxGroupItemProps = Omit<CheckboxControlProps, "className" | "prefix"> & {
  type?: CheckboxGroupItemType
  label: string
  description?: string
  badge?: React.ReactNode
  prefix?: React.ReactNode
  className?: string
}

// Context for CheckboxGroup to pass down the type
type CheckboxGroupContextValue = {
  type?: CheckboxGroupItemType
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null)

function useCheckboxGroupContext() {
  return React.useContext(CheckboxGroupContext)
}

function CheckboxGroupItem({
  type: typeProp,
  label,
  description,
  badge,
  prefix,
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate,
  disabled = false,
  className,
  ...props
}: CheckboxGroupItemProps) {
  const context = useCheckboxGroupContext()
  const type = typeProp ?? context?.type ?? "simple"

  const isSimple = type === "simple"
  const isList = type === "list"
  const isCardSmall = type === "card-small"
  const isCardBig = type === "card-big"
  const isCard = isCardSmall || isCardBig

  // For simple/list types: checkbox on left
  // For card types: checkbox on right with prefix on left
  const showCheckboxOnLeft = isSimple || isList
  const showCheckboxOnRight = isCard
  const showDescription = (isList || isCard) && description
  const showPrefix = isCard && prefix

  // Detect if prefix is a plain icon (no container) - needs offset with description
  const isPrefixPlainIcon = React.isValidElement(prefix) &&
    (prefix.props as { type?: string })?.type === "icon"

  // Inject size prop into prefix based on card type (only for Prefix components)
  const prefixSize = isCardBig ? "m" : "s"
  const isPrefixComponent = React.isValidElement(prefix) &&
    typeof prefix.type === "function" &&
    (prefix.type as { name?: string }).name?.includes("Prefix")
  const prefixWithSize = isPrefixComponent
    ? React.cloneElement(prefix as React.ReactElement<{ size?: string }>, { size: prefixSize })
    : prefix

  return (
    <label
      data-slot="checkbox-group-item"
      data-type={type}
      data-disabled={disabled || undefined}
      className={cn(
        checkboxGroupItemVariants({ type, disabled }),
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
            "flex shrink-0 items-center self-start",
            isPrefixPlainIcon && showDescription && "-mt-[2px]"
          )}
        >
          {prefixWithSize}
        </span>
      )}

      {/* Checkbox on left (simple/list types) */}
      {showCheckboxOnLeft && (
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

      {/* Suffix container with badge and checkbox (card types) */}
      {showCheckboxOnRight && (
        <span
          data-slot="suffix-wrapper"
          className="flex shrink-0 items-start gap-[var(--space-8)] self-stretch pr-[var(--space-2)] pt-[var(--space-2)]"
        >
          {badge}
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
        </span>
      )}
    </label>
  )
}

export {
  CheckboxGroupItem,
  CheckboxGroupContext,
  useCheckboxGroupContext,
  checkboxGroupItemTypes,
  checkboxGroupItemVariants,
}
export type { CheckboxGroupItemProps, CheckboxGroupItemType, CheckboxGroupContextValue }
