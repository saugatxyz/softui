"use client"

import * as React from "react"
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { listPopupStyles, listItemVariants } from "./list-item-styles"

// ============================================================================
// Variants
// ============================================================================

const rootVariants = cva(
  [
    "flex w-full items-center gap-[var(--space-6)] rounded-[var(--radius-10)]",
    "bg-actions-secondary-default transition-colors duration-200 outline-none",
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

const inputVariants = cva(
  "min-w-[60px] flex-1 truncate bg-transparent outline-none text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] placeholder:text-content-muted caret-actions-primary-default"
)

// ============================================================================
// Types
// ============================================================================

type AutocompleteSize = "s" | "m" | "l"

// ============================================================================
// Root
// ============================================================================

type AutocompleteGroup<ItemValue> = {
  items: readonly ItemValue[]
  [key: string]: unknown
}

type AutocompleteRootBaseProps = {
  size?: AutocompleteSize
  className?: string
}

type AutocompleteRootFlatProps<ItemValue> =
  AutocompleteRootBaseProps &
  Omit<AutocompletePrimitive.Root.Props<ItemValue>, "items"> & {
    items?: readonly ItemValue[]
  }

type AutocompleteRootGroupedProps<ItemValue> =
  AutocompleteRootBaseProps &
  Omit<AutocompletePrimitive.Root.Props<ItemValue>, "items"> & {
    items: readonly AutocompleteGroup<ItemValue>[]
  }

type AutocompleteRootProps<ItemValue = unknown> =
  | AutocompleteRootFlatProps<ItemValue>
  | AutocompleteRootGroupedProps<ItemValue>

const isGroupedItems = <ItemValue,>(
  items: readonly ItemValue[] | readonly AutocompleteGroup<ItemValue>[] | undefined
): items is readonly AutocompleteGroup<ItemValue>[] => {
  if (!items || items.length === 0) return false
  return typeof items[0] === "object" && items[0] !== null && "items" in items[0]
}

function AutocompleteRoot<ItemValue = unknown>({
  size = "m",
  className,
  children,
  items,
  ...props
}: AutocompleteRootProps<ItemValue>) {
  const [showFocusRing, setShowFocusRing] = React.useState(false)
  const wasPointerDown = React.useRef(false)

  const handlePointerDown = () => {
    wasPointerDown.current = true
  }

  const handleFocus = () => {
    setShowFocusRing(!wasPointerDown.current)
    wasPointerDown.current = false
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) return
    setShowFocusRing(false)
    wasPointerDown.current = false
  }

  const content = (
    <div
      data-slot="autocomplete"
      data-size={size}
      className={cn(
        rootVariants({ size }),
        showFocusRing &&
          "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      onPointerDown={handlePointerDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </div>
  )

  if (isGroupedItems(items)) {
    return (
      <AutocompletePrimitive.Root
        {...(props as Omit<AutocompletePrimitive.Root.Props<ItemValue>, "items">)}
        items={items}
      >
        {content}
      </AutocompletePrimitive.Root>
    )
  }

  return (
    <AutocompletePrimitive.Root
      {...(props as Omit<AutocompletePrimitive.Root.Props<ItemValue>, "items">)}
      items={items}
    >
      {content}
    </AutocompletePrimitive.Root>
  )
}

// ============================================================================
// Input + Trigger
// ============================================================================

type AutocompleteInputProps = Omit<AutocompletePrimitive.Input.Props, "className"> & {
  className?: string
}

function AutocompleteInput({ className, ...props }: AutocompleteInputProps) {
  return (
    <AutocompletePrimitive.Input
      data-slot="input"
      className={cn(
        inputVariants(),
        "text-content-strong data-[disabled]:text-content-disabled data-[disabled]:placeholder:text-content-disabled data-[disabled]:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

type AutocompleteTriggerProps = Omit<AutocompletePrimitive.Trigger.Props, "className"> & {
  className?: string
}

function AutocompleteTrigger({ className, ...props }: AutocompleteTriggerProps) {
  return (
    <AutocompletePrimitive.Trigger
      data-slot="trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// Portal + Positioner + Popup
// ============================================================================

type AutocompletePortalProps = AutocompletePrimitive.Portal.Props

function AutocompletePortal(props: AutocompletePortalProps) {
  return <AutocompletePrimitive.Portal {...props} />
}

type AutocompletePositionerProps = Omit<AutocompletePrimitive.Positioner.Props, "className"> & {
  className?: string
}

function AutocompletePositioner({
  className,
  sideOffset = 4,
  collisionPadding = 8,
  ...props
}: AutocompletePositionerProps) {
  return (
    <AutocompletePrimitive.Positioner
      data-slot="positioner"
      className={cn("outline-none", className)}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      {...props}
    />
  )
}

type AutocompletePopupProps = Omit<AutocompletePrimitive.Popup.Props, "className"> & {
  className?: string
}

function AutocompletePopup({ className, ...props }: AutocompletePopupProps) {
  return (
    <AutocompletePrimitive.Popup
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
// List + Items
// ============================================================================

type AutocompleteListProps = Omit<AutocompletePrimitive.List.Props, "className"> & {
  className?: string
}

function AutocompleteList({ className, ...props }: AutocompleteListProps) {
  return (
    <AutocompletePrimitive.List
      data-slot="list"
      className={cn("flex flex-col gap-[var(--space-2)] empty:hidden", className)}
      {...props}
    />
  )
}

type AutocompleteItemProps = Omit<AutocompletePrimitive.Item.Props, "className"> & {
  className?: string
}

function AutocompleteItem({ className, ...props }: AutocompleteItemProps) {
  return (
    <AutocompletePrimitive.Item
      data-slot="item"
      className={cn(listItemVariants(), className)}
      {...props}
    />
  )
}

// ============================================================================
// Empty + Group
// ============================================================================

type AutocompleteEmptyProps = Omit<AutocompletePrimitive.Empty.Props, "className"> & {
  className?: string
}

function AutocompleteEmpty({ className, ...props }: AutocompleteEmptyProps) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="empty"
      className={cn(
        "flex w-full items-center justify-center empty:hidden rounded-[var(--radius-10)]",
        "min-h-[36px] px-[var(--space-10)] py-[var(--space-6)]",
        "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
        "text-content-muted",
        className
      )}
      {...props}
    />
  )
}

type AutocompleteGroupProps = Omit<AutocompletePrimitive.Group.Props, "className"> & {
  className?: string
}

function AutocompleteGroup({ className, ...props }: AutocompleteGroupProps) {
  return (
    <AutocompletePrimitive.Group
      data-slot="group"
      className={cn("flex flex-col gap-[var(--space-2)]", className)}
      {...props}
    />
  )
}

type AutocompleteGroupLabelProps = Omit<AutocompletePrimitive.GroupLabel.Props, "className"> & {
  className?: string
}

function AutocompleteGroupLabel({ className, ...props }: AutocompleteGroupLabelProps) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="group-label"
      className={cn(
        "flex min-h-[28px] items-center px-[var(--space-12)] py-[var(--space-6)]",
        "text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)]",
        "text-content-subtle",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Misc
// ============================================================================

type AutocompleteValueProps = AutocompletePrimitive.Value.Props

function AutocompleteValue(props: AutocompleteValueProps) {
  return <AutocompletePrimitive.Value {...props} />
}

type AutocompleteCollectionProps = AutocompletePrimitive.Collection.Props

function AutocompleteCollection(props: AutocompleteCollectionProps) {
  return <AutocompletePrimitive.Collection {...props} />
}

type AutocompleteArrowProps = Omit<AutocompletePrimitive.Arrow.Props, "className"> & {
  className?: string
}

function AutocompleteArrow({ className, ...props }: AutocompleteArrowProps) {
  return (
    <AutocompletePrimitive.Arrow
      data-slot="arrow"
      className={cn("fill-surface-overlay", className)}
      {...props}
    />
  )
}

type AutocompleteBackdropProps = Omit<AutocompletePrimitive.Backdrop.Props, "className"> & {
  className?: string
}

function AutocompleteBackdrop({ className, ...props }: AutocompleteBackdropProps) {
  return (
    <AutocompletePrimitive.Backdrop
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

type AutocompleteStatusProps = Omit<AutocompletePrimitive.Status.Props, "className"> & {
  className?: string
}

function AutocompleteStatus({ className, ...props }: AutocompleteStatusProps) {
  return (
    <AutocompletePrimitive.Status
      data-slot="status"
      className={className}
      {...props}
    />
  )
}

// ============================================================================
// Exports
// ============================================================================

const Autocomplete = Object.assign(AutocompleteRoot, {
  Root: AutocompleteRoot,
  Input: AutocompleteInput,
  Trigger: AutocompleteTrigger,
  Portal: AutocompletePortal,
  Positioner: AutocompletePositioner,
  Popup: AutocompletePopup,
  List: AutocompleteList,
  Item: AutocompleteItem,
  Empty: AutocompleteEmpty,
  Group: AutocompleteGroup,
  GroupLabel: AutocompleteGroupLabel,
  Value: AutocompleteValue,
  Arrow: AutocompleteArrow,
  Backdrop: AutocompleteBackdrop,
  Status: AutocompleteStatus,
  Collection: AutocompleteCollection,
})

export { Autocomplete }
export type {
  AutocompleteRootProps,
  AutocompleteInputProps,
  AutocompleteTriggerProps,
  AutocompletePortalProps,
  AutocompletePositionerProps,
  AutocompletePopupProps,
  AutocompleteListProps,
  AutocompleteItemProps,
  AutocompleteEmptyProps,
  AutocompleteGroupProps,
  AutocompleteGroupLabelProps,
  AutocompleteValueProps,
  AutocompleteArrowProps,
  AutocompleteBackdropProps,
  AutocompleteStatusProps,
  AutocompleteCollectionProps,
  AutocompleteSize,
}
