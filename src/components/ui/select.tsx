"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"
import { RiCheckFill, RiExpandUpDownLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { listPopupStyles, listItemVariants } from "./list-item-styles"
import { MenuPrefix } from "./menu-prefix"

// ============================================================================
// Variants
// ============================================================================

const triggerVariants = cva(
  [
    "flex w-full items-center gap-[var(--space-6)] rounded-[var(--radius-10)]",
    "bg-actions-secondary-default transition-colors duration-200 outline-none cursor-pointer",
  ].join(" "),
  {
    variants: {
      size: {
        s: "h-[var(--space-32)] px-[var(--space-10)]",
        m: "h-[var(--space-36)] px-[var(--space-12)]",
        l: "h-[var(--space-40)] px-[var(--space-12)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

// ============================================================================
// Types
// ============================================================================

type SelectSize = "s" | "m" | "l"

type SelectOption = {
  value: string
  label: string
  /** Secondary description text */
  description?: string
  /** Icon for the option */
  icon?: React.ReactNode
  /** Prefix type for MenuPrefix component */
  prefixType?: "icon" | "danger-icon" | "avatar" | "company" | "token"
  disabled?: boolean
}

// Base props shared between single and multi select
type SelectBaseProps = VariantProps<typeof triggerVariants> & {
  /** Select options */
  options: SelectOption[]
  /** Placeholder text when no value selected */
  placeholder?: string
  /** Leading icon on trigger */
  leadingIcon?: React.ReactNode
  /** Disabled state */
  disabled?: boolean
  /** Additional class name */
  className?: string
  /** Dropdown position relative to trigger */
  side?: "top" | "bottom" | "left" | "right"
  /** Dropdown alignment relative to trigger */
  align?: "start" | "center" | "end"
  /** Gap between trigger and dropdown */
  sideOffset?: number
}

// Single select props
type SingleSelectProps = SelectBaseProps & {
  /** Enable multiple selection */
  multiple?: false
  /** Current value (controlled) */
  value?: string
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Change handler */
  onValueChange?: (value: string | null) => void
}

// Multi select props
type MultiSelectProps = SelectBaseProps & {
  /** Enable multiple selection */
  multiple: true
  /** Current value (controlled) */
  value?: string[]
  /** Default value (uncontrolled) */
  defaultValue?: string[]
  /** Change handler */
  onValueChange?: (value: string[]) => void
}

type SelectProps = SingleSelectProps | MultiSelectProps

// ============================================================================
// Select Component
// ============================================================================

function Select(props: SelectProps) {
  const {
    className,
    size,
    options,
    placeholder = "Select an option",
    leadingIcon,
    disabled,
    side = "bottom",
    align = "start",
    sideOffset = 4,
    multiple,
  } = props

  const resolvedSize: SelectSize = size ?? "m"

  // Get display text for selected value(s)
  const getDisplayText = (selectedValue: string | string[] | null) => {
    if (!selectedValue) return placeholder

    if (multiple && Array.isArray(selectedValue)) {
      if (selectedValue.length === 0) return placeholder
      if (selectedValue.length === 1) {
        const option = options.find((o) => o.value === selectedValue[0])
        return option?.label ?? selectedValue[0]
      }
      return `${selectedValue.length} selected`
    }

    const option = options.find((o) => o.value === selectedValue)
    return option?.label ?? selectedValue
  }

  return (
    <div
      data-slot="select"
      data-size={resolvedSize}
      data-multiple={multiple || undefined}
      className={className}
    >
    <SelectPrimitive.Root
      value={props.value as string | string[] | undefined}
      defaultValue={props.defaultValue as string | string[] | undefined}
      onValueChange={props.onValueChange as ((value: string | string[] | null) => void) | undefined}
      disabled={disabled}
      multiple={multiple}
    >
      <SelectPrimitive.Trigger
          data-slot="trigger"
          className={cn(
            triggerVariants({ size }),
            !disabled && "hover:bg-actions-secondary-hover",
            "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
            disabled && "bg-actions-secondary-disabled cursor-not-allowed"
          )}
        >
          {leadingIcon && (
            <span
              data-slot="leading-icon"
              className={cn(
                "flex size-[16px] shrink-0 items-center justify-center [&_svg]:size-full",
                disabled ? "text-content-disabled" : "text-content-subtle"
              )}
            >
              {leadingIcon}
            </span>
          )}

          <SelectPrimitive.Value
            data-slot="value"
            className={cn(
              "flex-1 truncate text-left",
              "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
              disabled
                ? "text-content-disabled"
                : "text-content-strong data-[placeholder]:text-content-muted"
            )}
          >
            {(selectedValue) => getDisplayText(selectedValue as string | string[] | null)}
          </SelectPrimitive.Value>

          <SelectPrimitive.Icon
            data-slot="icon"
            className={cn(
              "flex size-[16px] shrink-0 items-center justify-center [&_svg]:size-full",
              disabled ? "text-content-disabled" : "text-content-muted"
            )}
          >
            <RiExpandUpDownLine />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner
            data-slot="positioner"
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignItemWithTrigger={false}
            collisionPadding={8}
            className="z-[100] outline-none"
          >
            <SelectPrimitive.Popup
              data-slot="popup"
              className={cn(listPopupStyles.base, listPopupStyles.width)}
            >
              <div className="flex flex-col gap-[var(--space-2)] p-[var(--space-4)]">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    data-slot="item"
                    className={cn(listItemVariants())}
                  >
                    {option.icon && (
                      <span className="flex shrink-0 group-has-[[data-slot=item-description]]:items-start group-has-[[data-slot=item-description]]:self-stretch group-has-[[data-slot=item-description]]:pt-[var(--space-2)]">
                        <MenuPrefix
                          type={option.prefixType ?? "icon"}
                          icon={option.icon}
                          disabled={option.disabled}
                        />
                      </span>
                    )}

                    <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)] pl-[var(--space-2)]">
                      <SelectPrimitive.ItemText
                        data-slot="item-text"
                        className={cn(
                          "truncate",
                          "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                          option.disabled ? "text-content-disabled" : "text-content-strong"
                        )}
                      >
                        {option.label}
                      </SelectPrimitive.ItemText>
                      {option.description && (
                        <span
                          data-slot="item-description"
                          className={cn(
                            "truncate",
                            "text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
                            option.disabled ? "text-content-disabled" : "text-content-subtle"
                          )}
                        >
                          {option.description}
                        </span>
                      )}
                    </div>

                    <SelectPrimitive.ItemIndicator
                      data-slot="indicator"
                      className="flex size-[20px] shrink-0 items-center justify-center"
                    >
                      <span className="flex size-[16px] items-center justify-center text-content-strong [&_svg]:size-full">
                        <RiCheckFill />
                      </span>
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </div>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
    </div>
  )
}

export { Select }
export type { SelectProps, SelectOption, SelectSize }
