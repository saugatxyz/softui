"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { listPopupStyles, listItemVariants } from "./list-item-styles"

// ============================================================================
// Variants
// ============================================================================

const triggerVariants = cva(
  [
    "flex w-full items-center gap-[var(--space-6)] rounded-[var(--radius-10)]",
    "transition-colors duration-200 outline-none cursor-pointer",
  ].join(" "),
  {
    variants: {
      size: {
        s: "h-[var(--space-32)] px-[var(--space-10)]",
        m: "h-[var(--space-36)] px-[var(--space-12)]",
        l: "h-[var(--space-40)] px-[var(--space-12)]",
      },
      variant: {
        secondary: "bg-actions-secondary-default",
        tertiary:
          "bg-actions-tertiary-default backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
      },
    },
    defaultVariants: {
      size: "m",
      variant: "secondary",
    },
  }
)

const valueVariants = cva(
  "flex-1 truncate text-left text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]"
)

const iconVariants = cva(
  "flex size-[var(--space-16)] shrink-0 items-center justify-center [&_svg]:size-full"
)

const itemTextVariants = cva(
  "truncate text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]"
)

// ============================================================================
// Types + Context
// ============================================================================

type SelectSize = "s" | "m" | "l"
type SelectVariant = "secondary" | "tertiary"

type SelectContextValue = {
  size: SelectSize
  variant: SelectVariant
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within Select")
  }
  return context
}

// ============================================================================
// Select Root
// ============================================================================

type SelectRootProps<Value = unknown, Multiple extends boolean | undefined = boolean> = SelectPrimitive.Root.Props<Value, Multiple> & {
  size?: SelectSize
  variant?: SelectVariant
}

function SelectRoot<Value = unknown, Multiple extends boolean | undefined = boolean>({
  size = "m",
  variant = "secondary",
  ...props
}: SelectRootProps<Value, Multiple>) {
  return (
    <SelectContext.Provider value={{ size, variant }}>
      <SelectPrimitive.Root
        {...props}
      />
    </SelectContext.Provider>
  )
}

// ============================================================================
// Select Trigger
// ============================================================================

type SelectTriggerProps = Omit<SelectPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function SelectTrigger({ className, ...props }: SelectTriggerProps) {
  const { size, variant } = useSelectContext()
  const isSecondary = variant === "secondary"
  const isTertiary = variant === "tertiary"

  return (
    <SelectPrimitive.Trigger
      data-slot="trigger"
      data-variant={variant}
      className={cn(
        triggerVariants({ size, variant }),
        isSecondary && "hover:bg-actions-secondary-hover",
        isTertiary && "hover:bg-actions-tertiary-hover",
        "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        isSecondary && "data-[disabled]:bg-actions-secondary-disabled",
        isTertiary && "data-[disabled]:bg-actions-tertiary-disabled data-[disabled]:shadow-none",
        "data-[disabled]:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Select Value
// ============================================================================

type SelectValueProps = Omit<SelectPrimitive.Value.Props, "className"> & {
  className?: string
}

function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="value"
      className={cn(
        valueVariants(),
        "text-content-strong data-[placeholder]:text-content-muted",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Select Icon
// ============================================================================

type SelectIconProps = Omit<SelectPrimitive.Icon.Props, "className"> & {
  className?: string
}

function SelectIcon({ className, ...props }: SelectIconProps) {
  return (
    <SelectPrimitive.Icon
      data-slot="icon"
      className={cn(iconVariants(), "text-content-muted", className)}
      {...props}
    />
  )
}

// ============================================================================
// Select Portal + Positioner + Popup
// ============================================================================

type SelectPortalProps = SelectPrimitive.Portal.Props

function SelectPortal(props: SelectPortalProps) {
  return <SelectPrimitive.Portal {...props} />
}

type SelectPositionerProps = Omit<SelectPrimitive.Positioner.Props, "className"> & {
  className?: string
}

function SelectPositioner({
  className,
  sideOffset = 4,
  collisionPadding = 8,
  alignItemWithTrigger = false,
  ...props
}: SelectPositionerProps) {
  return (
    <SelectPrimitive.Positioner
      data-slot="positioner"
      className={cn("z-[100] outline-none", className)}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      alignItemWithTrigger={alignItemWithTrigger}
      {...props}
    />
  )
}

type SelectPopupProps = Omit<SelectPrimitive.Popup.Props, "className"> & {
  className?: string
}

function SelectPopup({ className, ...props }: SelectPopupProps) {
  return (
    <SelectPrimitive.Popup
      data-slot="popup"
      className={cn(
        listPopupStyles.base,
        listPopupStyles.width,
        "min-w-[var(--anchor-width)] max-w-[var(--anchor-width)] w-[var(--anchor-width)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Select Backdrop
// ============================================================================

type SelectBackdropProps = Omit<SelectPrimitive.Backdrop.Props, "className"> & {
  className?: string
}

function SelectBackdrop({ className, ...props }: SelectBackdropProps) {
  return (
    <SelectPrimitive.Backdrop
      data-slot="backdrop"
      className={cn(
        "fixed inset-0 z-40 bg-utility-backdrop",
        "transition-opacity duration-100",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Select List + Items
// ============================================================================

type SelectListProps = Omit<SelectPrimitive.List.Props, "className"> & {
  className?: string
}

function SelectList({ className, ...props }: SelectListProps) {
  return (
    <SelectPrimitive.List
      data-slot="list"
      className={cn("flex flex-col gap-0 p-[var(--space-4)]", className)}
      {...props}
    />
  )
}

type SelectItemProps = Omit<SelectPrimitive.Item.Props, "className"> & {
  className?: string
}

function SelectItem({ className, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="item"
      className={cn(listItemVariants(), className)}
      {...props}
    />
  )
}

type SelectItemTextProps = Omit<SelectPrimitive.ItemText.Props, "className"> & {
  className?: string
}

function SelectItemText({ className, ...props }: SelectItemTextProps) {
  return (
    <SelectPrimitive.ItemText
      data-slot="item-text"
      className={cn(itemTextVariants(), "flex-1 min-w-0", className)}
      {...props}
    />
  )
}

type SelectItemIndicatorProps = Omit<SelectPrimitive.ItemIndicator.Props, "className"> & {
  className?: string
}

function SelectItemIndicator({ className, ...props }: SelectItemIndicatorProps) {
  return (
    <SelectPrimitive.ItemIndicator
      data-slot="indicator"
      className={cn(
        "flex size-[var(--space-20)] shrink-0 items-center justify-center",
        "group-has-[[data-slot=item-description]]:self-start group-has-[[data-slot=item-description]]:mt-[var(--space-2)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Select Group + Label
// ============================================================================

type SelectGroupProps = Omit<SelectPrimitive.Group.Props, "className"> & {
  className?: string
}

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="group"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  )
}

type SelectGroupLabelProps = Omit<SelectPrimitive.GroupLabel.Props, "className"> & {
  className?: string
}

function SelectGroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="group-label"
      className={cn(
        "flex min-h-[var(--space-28)] items-center px-[var(--space-12)] py-[var(--space-6)]",
        "text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)]",
        "text-content-subtle",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Select Arrow + Scroll Buttons
// ============================================================================

type SelectArrowProps = Omit<SelectPrimitive.Arrow.Props, "className"> & {
  className?: string
}

function SelectArrow({ className, ...props }: SelectArrowProps) {
  return (
    <SelectPrimitive.Arrow
      data-slot="arrow"
      className={cn("fill-surface-overlay", className)}
      {...props}
    />
  )
}

type SelectScrollUpArrowProps = Omit<SelectPrimitive.ScrollUpArrow.Props, "className"> & {
  className?: string
}

function SelectScrollUpArrow({ className, ...props }: SelectScrollUpArrowProps) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="scroll-up-arrow"
      className={cn("flex h-[var(--space-20)] items-center justify-center text-content-muted", className)}
      {...props}
    />
  )
}

type SelectScrollDownArrowProps = Omit<SelectPrimitive.ScrollDownArrow.Props, "className"> & {
  className?: string
}

function SelectScrollDownArrow({ className, ...props }: SelectScrollDownArrowProps) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="scroll-down-arrow"
      className={cn("flex h-[var(--space-20)] items-center justify-center text-content-muted", className)}
      {...props}
    />
  )
}

// ============================================================================
// Exports
// ============================================================================

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Portal: SelectPortal,
  Positioner: SelectPositioner,
  Popup: SelectPopup,
  Backdrop: SelectBackdrop,
  List: SelectList,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Arrow: SelectArrow,
  ScrollUpArrow: SelectScrollUpArrow,
  ScrollDownArrow: SelectScrollDownArrow,
})

export { Select }
export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectPopupProps,
  SelectBackdropProps,
  SelectListProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectItemIndicatorProps,
  SelectGroupProps,
  SelectGroupLabelProps,
  SelectArrowProps,
  SelectScrollUpArrowProps,
  SelectScrollDownArrowProps,
  SelectSize,
}
