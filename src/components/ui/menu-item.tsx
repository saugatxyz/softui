"use client"

import * as React from "react"
import { Menu } from "@base-ui/react/menu"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { CheckboxControl } from "./checkbox-control"
import {
  listItemVariants,
  listItemLabelVariants,
  getListItemTextColor,
  getListItemSupportingTextColor,
} from "./list-item-styles"

// Simple visual radio indicator for menu items
function RadioIndicator({
  checked,
  disabled,
}: {
  checked?: boolean
  disabled?: boolean
}) {
  const getStateClasses = () => {
    if (disabled) {
      if (checked) {
        return "bg-actions-primary-disabled"
      }
      return "bg-actions-tertiary-disabled border border-border-muted"
    }

    if (checked) {
      return "bg-actions-primary-default"
    }

    return "bg-actions-tertiary-default shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]"
  }

  return (
    <span
      className={cn(
        "relative inline-flex size-[16px] shrink-0 items-center justify-center rounded-full",
        getStateClasses()
      )}
    >
      {checked && (
        <span
          className={cn(
            "size-[5px] rounded-full",
            disabled ? "bg-content-on-accent-disabled" : "bg-content-on-accent-strong"
          )}
        />
      )}
    </span>
  )
}

type MenuItemProps = Omit<Menu.Item.Props, "className" | "prefix" | "suffix"> &
  VariantProps<typeof listItemVariants> & {
    /** Leading content - icon, avatar, etc. */
    prefix?: React.ReactNode
    /** Trailing content - checkmark, submenu, switch, icon */
    suffix?: React.ReactNode
    /** Supporting text below the label */
    supportingText?: string
    /** Badge content */
    badge?: string
    /** Selection control type */
    selectionControl?: "checkbox" | "radio"
    /** Whether the item is selected (for checkbox/radio) */
    selected?: boolean
    /** Whether the item is indeterminate (for checkbox) */
    indeterminate?: boolean
    /** Label font weight */
    weight?: "medium" | "regular"
    className?: string
    children?: React.ReactNode
  }

function MenuItem({
  variant = "default",
  weight = "medium",
  prefix,
  suffix,
  supportingText,
  badge,
  selectionControl,
  selected,
  indeterminate,
  disabled,
  className,
  children,
  ...props
}: MenuItemProps) {
  // Use shared color helpers
  const labelColorClass = getListItemTextColor({ disabled, variant: variant ?? "default" })
  const supportingTextColorClass = getListItemSupportingTextColor(disabled)

  return (
    <Menu.Item
      data-slot="menu-item"
      data-variant={variant}
      disabled={disabled}
      className={cn(listItemVariants({ variant }), className)}
      {...props}
    >
      {/* Selection control */}
      {selectionControl && (
        <span className="flex h-full shrink-0 items-center justify-center p-[var(--space-4)]">
          {selectionControl === "checkbox" ? (
            <CheckboxControl
              checked={selected}
              indeterminate={indeterminate}
              disabled={disabled}
              tabIndex={-1}
            />
          ) : (
            <RadioIndicator checked={selected} disabled={disabled} />
          )}
        </span>
      )}

      {/* Prefix */}
      {prefix && (
        <span className="flex shrink-0 items-start self-stretch">{prefix}</span>
      )}

      {/* Label container */}
      <span className={cn(listItemLabelVariants({ weight }))}>
        <span className={cn("truncate", labelColorClass)}>{children}</span>
        {supportingText && (
          <span
            className={cn(
              "truncate text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
              supportingTextColorClass
            )}
          >
            {supportingText}
          </span>
        )}
      </span>

      {/* Suffix */}
      {suffix && (
        <span className="flex h-full shrink-0 items-center">{suffix}</span>
      )}

      {/* Badge */}
      {badge && (
        <Badge size="xs" variant="sky" isEmphasized>
          {badge}
        </Badge>
      )}
    </Menu.Item>
  )
}

// Export shared variants for other components to use
export { MenuItem, listItemVariants }
export type { MenuItemProps }
