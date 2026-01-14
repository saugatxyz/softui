"use client"

import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { SwitchControl, type SwitchControlProps } from "./switch-control"

const switchGroupItemTypes = ["simple", "list", "card-small", "card-big"] as const
type SwitchGroupItemType = (typeof switchGroupItemTypes)[number]

const switchGroupItemVariants = cva(
  "group relative flex items-start gap-[var(--space-12)] transition-[background-color] duration-200 ease-out",
  {
    variants: {
      type: {
        simple: "px-0 py-[var(--space-8)]",
        list: "border-b border-border-subtle px-0 py-[var(--space-10)] last:border-b-0",
        "card-small":
          "items-center gap-[var(--space-12)] rounded-[var(--radius-12)] bg-surface-interactive-default p-[var(--space-12)] hover:bg-surface-interactive-hover",
        "card-big":
          "items-center gap-[var(--space-12)] rounded-[var(--radius-12)] bg-surface-interactive-default p-[var(--space-12)] hover:bg-surface-interactive-hover",
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

type SwitchGroupItemProps = Omit<SwitchControlProps, "className" | "prefix"> & {
  type?: SwitchGroupItemType
  label: string
  description?: string
  badge?: React.ReactNode
  prefix?: React.ReactNode
  className?: string
}

// Context for SwitchGroup to pass down the type and stack
type SwitchGroupContextValue = {
  type?: SwitchGroupItemType
  stack?: "vertical" | "horizontal"
}

const SwitchGroupContext = React.createContext<SwitchGroupContextValue | null>(null)

function useSwitchGroupContext() {
  return React.useContext(SwitchGroupContext)
}

function SwitchGroupItem({
  type: typeProp,
  label,
  description,
  badge,
  prefix,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}: SwitchGroupItemProps) {
  const context = useSwitchGroupContext()
  const type = typeProp ?? context?.type ?? "simple"
  const stack = context?.stack ?? "vertical"

  const isSimple = type === "simple"
  const isList = type === "list"
  const isCardSmall = type === "card-small"
  const isCardBig = type === "card-big"
  const isCard = isCardSmall || isCardBig
  const isInline = isSimple && stack === "horizontal"

  // For simple/list types: switch on left
  // For card types: switch on right with prefix on left
  const showSwitchOnLeft = isSimple || isList
  const showSwitchOnRight = isCard
  const showDescription = (isList || isCard) && description
  const showPrefix = isCard && prefix

  // Detect if prefix is a plain icon (no container) - needs offset with description
  // Inject size prop into prefix based on card type (only for Prefix components)
  const prefixSize = isCardBig ? "m" : "s"
  const isPrefixComponent = React.isValidElement(prefix) &&
    typeof prefix.type === "function" &&
    (prefix.type as { name?: string }).name?.includes("Prefix")
  const prefixWithSize = isPrefixComponent
    ? React.cloneElement(prefix as React.ReactElement<{ size?: string }>, { size: prefixSize })
    : prefix

  return (
    <FieldPrimitive.Root
      data-slot="switch-group-item"
      data-type={type}
      data-disabled={disabled || undefined}
      disabled={disabled}
      className={isInline ? undefined : "w-full"}
    >
      <FieldPrimitive.Label
        data-slot="label-container"
        className={cn(
          switchGroupItemVariants({ type, disabled }),
          // Focus-visible styling for card types
          isCard && "has-[:focus-visible]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          className
        )}
      >
      {/* Prefix (card types only) */}
      {showPrefix && (
        <span
          data-slot="prefix-wrapper"
          className="flex shrink-0 items-center self-start"
        >
          {prefixWithSize}
        </span>
      )}

      {/* Switch on left (simple/list types) */}
      {showSwitchOnLeft && (
        <span className="flex h-[var(--space-20)] shrink-0 items-center">
          <SwitchControl
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            {...props}
          />
        </span>
      )}

      {/* Label and description */}
      <span
        data-slot="label-text"
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

      {/* Badge (simple/list types only - inline) */}
      {badge && !isCard && (
        <span
          data-slot="badge-wrapper"
          className="flex shrink-0 items-center"
        >
          {badge}
        </span>
      )}

      {/* Suffix container with badge and switch (card types) */}
      {showSwitchOnRight && (
        <span
          data-slot="suffix-wrapper"
          className={cn(
            "flex shrink-0 gap-[var(--space-8)] self-stretch pr-[var(--space-2)]",
            showDescription ? "items-start pt-[var(--space-2)]" : "items-center"
          )}
        >
          {badge}
          <span className="flex shrink-0">
            <SwitchControl
              checked={checked}
              defaultChecked={defaultChecked}
              onCheckedChange={onCheckedChange}
              disabled={disabled}
              {...props}
            />
          </span>
        </span>
      )}
      </FieldPrimitive.Label>
    </FieldPrimitive.Root>
  )
}

export {
  SwitchGroupItem,
  SwitchGroupContext,
  useSwitchGroupContext,
  switchGroupItemTypes,
  switchGroupItemVariants,
}
export type { SwitchGroupItemProps, SwitchGroupItemType, SwitchGroupContextValue }
