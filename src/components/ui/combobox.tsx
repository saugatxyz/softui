"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { listPopupStyles, listItemVariants } from "./list-item-styles"

// ============================================================================
// Context for sharing container ref (used for popup anchor positioning)
// ============================================================================

type ComboboxContextValue = {
  containerRef: React.RefObject<HTMLDivElement | null>
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useComboboxContext() {
  return React.useContext(ComboboxContext)
}

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
        s: "min-h-[var(--space-32)] px-[var(--space-10)]",
        m: "min-h-[var(--space-36)] px-[var(--space-12)]",
        l: "min-h-[var(--space-40)] px-[var(--space-12)]",
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

const iconVariants = cva(
  "flex size-[16px] shrink-0 items-center justify-center [&_svg]:size-full"
)

const chipVariants = cva(
  [
    "inline-flex h-[var(--space-24)] items-center gap-[var(--space-4)]",
    "rounded-[var(--radius-max)] bg-actions-tertiary-default backdrop-blur-[12px]",
    "shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
    "pl-[var(--space-10)] pr-[var(--space-2)]",
    "text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)]",
    "outline-none select-none",
    "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
    "data-[disabled]:bg-actions-tertiary-disabled data-[disabled]:shadow-none data-[disabled]:text-content-disabled",
  ].join(" ")
)

const chipRemoveVariants = cva(
  [
    "flex size-[20px] shrink-0 items-center justify-center rounded-[var(--radius-max)] p-[2px]",
    "transition-[background-color] duration-200 ease-out [&_svg]:size-full",
    "text-content-subtle hover:bg-actions-secondary-hover hover:text-content-strong",
    "data-[disabled]:text-content-disabled data-[disabled]:hover:bg-transparent data-[disabled]:hover:text-content-disabled",
  ].join(" ")
)

// ============================================================================
// Types
// ============================================================================

type ComboboxSize = "s" | "m" | "l"

// ============================================================================
// Root
// ============================================================================

type ComboboxRootProps<Value = unknown, Multiple extends boolean | undefined = boolean> = ComboboxPrimitive.Root.Props<Value, Multiple> & {
  size?: ComboboxSize
  className?: string
}

function ComboboxRoot<Value = unknown, Multiple extends boolean | undefined = boolean>({
  size = "m",
  className,
  children,
  ...props
}: ComboboxRootProps<Value, Multiple>) {
  const [showFocusRing, setShowFocusRing] = React.useState(false)
  const wasPointerDown = React.useRef(false)
  // Ref for the container - used as anchor for popup positioning
  const containerRef = React.useRef<HTMLDivElement>(null)

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

  const contextValue = React.useMemo(() => ({ containerRef }), [])

  return (
    <ComboboxContext.Provider value={contextValue}>
      <ComboboxPrimitive.Root
        {...props}
      >
        <div
          ref={containerRef}
          data-slot="combobox"
          data-size={size}
          className={cn(
            rootVariants({ size }),
            showFocusRing && "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
            className
          )}
          onPointerDown={handlePointerDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
        </div>
      </ComboboxPrimitive.Root>
    </ComboboxContext.Provider>
  )
}

// ============================================================================
// Input + Trigger + Clear
// ============================================================================

type ComboboxInputProps = Omit<ComboboxPrimitive.Input.Props, "className"> & {
  className?: string
}

function ComboboxInput({ className, ...props }: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.Input
      data-slot="input"
      className={cn(inputVariants(), "text-content-strong data-[disabled]:text-content-disabled data-[disabled]:placeholder:text-content-disabled data-[disabled]:cursor-not-allowed", className)}
      {...props}
    />
  )
}

type ComboboxTriggerProps = Omit<ComboboxPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function ComboboxTrigger({ className, ...props }: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="trigger"
      className={cn(
        iconVariants(),
        "cursor-pointer text-content-muted data-[disabled]:cursor-not-allowed data-[disabled]:text-content-disabled",
        className
      )}
      {...props}
    />
  )
}

type ComboboxClearProps = Omit<ComboboxPrimitive.Clear.Props, "className"> & {
  className?: string
}

function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="clear"
      className={cn(
        "flex size-[16px] shrink-0 items-center justify-center rounded-[var(--radius-4)] [&_svg]:size-full cursor-pointer",
        "text-content-muted hover:text-content-strong transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Portal + Positioner + Popup
// ============================================================================

type ComboboxPortalProps = ComboboxPrimitive.Portal.Props

function ComboboxPortal(props: ComboboxPortalProps) {
  return <ComboboxPrimitive.Portal {...props} />
}

type ComboboxPositionerProps = Omit<ComboboxPrimitive.Positioner.Props, "className"> & {
  className?: string
}

function ComboboxPositioner({
  className,
  sideOffset = 4,
  collisionPadding = 8,
  ...props
}: ComboboxPositionerProps) {
  // Use container ref as anchor so popup matches container width, not just input width
  const context = useComboboxContext()

  return (
    <ComboboxPrimitive.Positioner
      data-slot="positioner"
      className={cn("outline-none", className)}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      anchor={context?.containerRef}
      {...props}
    />
  )
}

type ComboboxPopupProps = Omit<ComboboxPrimitive.Popup.Props, "className"> & {
  className?: string
}

function ComboboxPopup({ className, ...props }: ComboboxPopupProps) {
  return (
    <ComboboxPrimitive.Popup
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

type ComboboxListProps = Omit<ComboboxPrimitive.List.Props, "className"> & {
  className?: string
}

function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      data-slot="list"
      className={cn("flex flex-col gap-[var(--space-2)] empty:hidden", className)}
      {...props}
    />
  )
}

type ComboboxItemProps = Omit<ComboboxPrimitive.Item.Props, "className"> & {
  className?: string
}

function ComboboxItem({ className, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      data-slot="item"
      className={cn(listItemVariants(), className)}
      {...props}
    />
  )
}

type ComboboxItemIndicatorProps = Omit<ComboboxPrimitive.ItemIndicator.Props, "className"> & {
  className?: string
}

function ComboboxItemIndicator({ className, ...props }: ComboboxItemIndicatorProps) {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="indicator"
      className={cn("flex size-[20px] shrink-0 items-center justify-center", className)}
      {...props}
    />
  )
}

// ============================================================================
// Empty + Group
// ============================================================================

type ComboboxEmptyProps = Omit<ComboboxPrimitive.Empty.Props, "className"> & {
  className?: string
}

function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
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

type ComboboxGroupProps = Omit<ComboboxPrimitive.Group.Props, "className"> & {
  className?: string
}

function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <ComboboxPrimitive.Group
      data-slot="group"
      className={cn("flex flex-col gap-[var(--space-2)]", className)}
      {...props}
    />
  )
}

type ComboboxGroupLabelProps = Omit<ComboboxPrimitive.GroupLabel.Props, "className"> & {
  className?: string
}

function ComboboxGroupLabel({ className, ...props }: ComboboxGroupLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
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
// Chips
// ============================================================================

type ComboboxChipsProps = Omit<ComboboxPrimitive.Chips.Props, "className"> & {
  className?: string
}

function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="chips"
      className={cn("contents", className)}
      {...props}
    />
  )
}

type ComboboxChipProps = Omit<ComboboxPrimitive.Chip.Props, "className"> & {
  className?: string
}

function ComboboxChip({ className, ...props }: ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="chip"
      className={cn(chipVariants(), className)}
      {...props}
    />
  )
}

type ComboboxChipRemoveProps = Omit<ComboboxPrimitive.ChipRemove.Props, "className"> & {
  className?: string
}

function ComboboxChipRemove({ className, ...props }: ComboboxChipRemoveProps) {
  return (
    <ComboboxPrimitive.ChipRemove
      data-slot="chip-remove"
      className={cn(chipRemoveVariants(), className)}
      {...props}
    />
  )
}

// ============================================================================
// Misc
// ============================================================================

type ComboboxValueProps = ComboboxPrimitive.Value.Props

function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxPrimitive.Value {...props} />
}

type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props

function ComboboxCollection(props: ComboboxCollectionProps) {
  return <ComboboxPrimitive.Collection {...props} />
}

type ComboboxIconProps = Omit<ComboboxPrimitive.Icon.Props, "className"> & {
  className?: string
}

function ComboboxIcon({ className, ...props }: ComboboxIconProps) {
  return (
    <ComboboxPrimitive.Icon
      data-slot="icon"
      className={cn(iconVariants(), "text-content-muted", className)}
      {...props}
    />
  )
}

type ComboboxArrowProps = Omit<ComboboxPrimitive.Arrow.Props, "className"> & {
  className?: string
}

function ComboboxArrow({ className, ...props }: ComboboxArrowProps) {
  return (
    <ComboboxPrimitive.Arrow
      data-slot="arrow"
      className={cn("fill-surface-overlay", className)}
      {...props}
    />
  )
}

type ComboboxBackdropProps = Omit<ComboboxPrimitive.Backdrop.Props, "className"> & {
  className?: string
}

function ComboboxBackdrop({ className, ...props }: ComboboxBackdropProps) {
  return (
    <ComboboxPrimitive.Backdrop
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

type ComboboxRowProps = Omit<ComboboxPrimitive.Row.Props, "className"> & {
  className?: string
}

function ComboboxRow({ className, ...props }: ComboboxRowProps) {
  return (
    <ComboboxPrimitive.Row
      data-slot="row"
      className={className}
      {...props}
    />
  )
}

type ComboboxStatusProps = Omit<ComboboxPrimitive.Status.Props, "className"> & {
  className?: string
}

function ComboboxStatus({ className, ...props }: ComboboxStatusProps) {
  return (
    <ComboboxPrimitive.Status
      data-slot="status"
      className={className}
      {...props}
    />
  )
}

// ============================================================================
// Exports
// ============================================================================

const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  Trigger: ComboboxTrigger,
  Input: ComboboxInput,
  Clear: ComboboxClear,
  Portal: ComboboxPortal,
  Positioner: ComboboxPositioner,
  Popup: ComboboxPopup,
  List: ComboboxList,
  Item: ComboboxItem,
  ItemIndicator: ComboboxItemIndicator,
  Value: ComboboxValue,
  Icon: ComboboxIcon,
  Arrow: ComboboxArrow,
  Backdrop: ComboboxBackdrop,
  Empty: ComboboxEmpty,
  Group: ComboboxGroup,
  GroupLabel: ComboboxGroupLabel,
  Row: ComboboxRow,
  Chips: ComboboxChips,
  Chip: ComboboxChip,
  ChipRemove: ComboboxChipRemove,
  Status: ComboboxStatus,
  Collection: ComboboxCollection,
})

export { Combobox }
export type {
  ComboboxRootProps,
  ComboboxTriggerProps,
  ComboboxInputProps,
  ComboboxClearProps,
  ComboboxPortalProps,
  ComboboxPositionerProps,
  ComboboxPopupProps,
  ComboboxListProps,
  ComboboxItemProps,
  ComboboxItemIndicatorProps,
  ComboboxValueProps,
  ComboboxIconProps,
  ComboboxArrowProps,
  ComboboxBackdropProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
  ComboboxRowProps,
  ComboboxChipsProps,
  ComboboxChipProps,
  ComboboxChipRemoveProps,
  ComboboxStatusProps,
  ComboboxCollectionProps,
  ComboboxSize,
}
