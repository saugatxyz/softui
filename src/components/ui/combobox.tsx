"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { cva, type VariantProps } from "class-variance-authority"
import { RiCheckFill, RiArrowDownSLine, RiErrorWarningFill, RiCloseLine } from "@remixicon/react"

import { cn } from "@/lib/utils"
import { listPopupStyles, listItemVariants } from "./list-item-styles"
import { MenuPrefix, type DecorativeColor } from "./menu-prefix"

// ============================================================================
// Variants
// ============================================================================

const triggerVariants = cva(
  [
    "flex w-full items-center gap-[var(--space-6)] rounded-[var(--radius-10)]",
    "bg-actions-secondary-default transition-colors duration-200 outline-none",
  ].join(" "),
  {
    variants: {
      size: {
        s: "min-h-[var(--space-32)] px-[var(--space-10)] py-[var(--space-4)]",
        m: "min-h-[var(--space-36)] px-[var(--space-12)] py-[var(--space-4)]",
        l: "min-h-[var(--space-40)] px-[var(--space-12)] py-[var(--space-6)]",
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

type ComboboxSize = "s" | "m" | "l"

type ComboboxOption = {
  value: string
  label: string
  /** Secondary description text */
  description?: string
  /** Icon for the option */
  icon?: React.ReactNode
  /** Prefix type for MenuPrefix component */
  prefixType?: "icon" | "danger-icon" | "icon-emphasized" | "avatar" | "company" | "token"
  /** Color for icon-emphasized prefix type */
  prefixColor?: DecorativeColor | "default"
  disabled?: boolean
}

type ComboboxGroup = {
  label: string
  options: ComboboxOption[]
}

// Base props shared between single and multi select
type ComboboxBaseProps = VariantProps<typeof triggerVariants> & {
  /** Combobox options */
  options: ComboboxOption[]
  /** Placeholder text when no value selected */
  placeholder?: string
  /** Label text */
  label?: string
  /** Description text */
  description?: string
  /** Error message */
  error?: string
  /** Leading icon on trigger */
  leadingIcon?: React.ReactNode
  /** Disabled state */
  disabled?: boolean
  /** Show clear button */
  clearable?: boolean
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
type SingleComboboxProps = ComboboxBaseProps & {
  /** Enable multiple selection */
  multiple?: false
  /** Current value (controlled) */
  value?: string | null
  /** Default value (uncontrolled) */
  defaultValue?: string | null
  /** Change handler */
  onValueChange?: (value: string | null) => void
}

// Multi select props
type MultiComboboxProps = ComboboxBaseProps & {
  /** Enable multiple selection */
  multiple: true
  /** Current value (controlled) */
  value?: string[]
  /** Default value (uncontrolled) */
  defaultValue?: string[]
  /** Change handler */
  onValueChange?: (value: string[]) => void
}

type ComboboxProps = SingleComboboxProps | MultiComboboxProps

// Helper to get label from item
function getItemLabel(item: unknown): string {
  if (!item) return ""
  if (typeof item === "string") return item
  if (typeof item === "object" && "label" in item) {
    return (item as ComboboxOption).label
  }
  return ""
}

// Helper to get value from item
function getItemValue(item: unknown): string {
  if (!item) return ""
  if (typeof item === "string") return item
  if (typeof item === "object" && "value" in item) {
    return (item as ComboboxOption).value
  }
  return ""
}

// ============================================================================
// Combobox Component
// ============================================================================

function Combobox(props: ComboboxProps) {
  const {
    className,
    size,
    options,
    placeholder = "Select an option",
    label,
    description,
    error,
    leadingIcon,
    disabled,
    clearable = false,
    side = "bottom",
    align = "start",
    sideOffset = 4,
    multiple,
  } = props

  const resolvedSize: ComboboxSize = size ?? "m"
  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)
  const hasError = Boolean(error)

  // Track if focus came from mouse to hide focus ring
  const [isMouseFocus, setIsMouseFocus] = React.useState(false)

  // Ref for the trigger container to use as anchor
  const triggerRef = React.useRef<HTMLDivElement>(null)

  // Get props for controlled/uncontrolled mode
  const multiProps = multiple ? (props as MultiComboboxProps) : null
  const singleProps = !multiple ? (props as SingleComboboxProps) : null

  // Handle value change from Base UI
  const handleValueChange = (newValue: ComboboxOption | ComboboxOption[] | null) => {
    if (multiple) {
      const newOptions = (newValue as ComboboxOption[] | null) ?? []
      const newValues = newOptions.map((o) => o.value)
      multiProps?.onValueChange?.(newValues)
    } else {
      const value = (newValue as ComboboxOption | null)?.value ?? null
      singleProps?.onValueChange?.(value)
    }
  }

  // Get value/defaultValue for Base UI
  const getValueOption = () => {
    if (multiple && multiProps?.value !== undefined) {
      return multiProps.value
        .map((v) => options.find((o) => o.value === v))
        .filter(Boolean) as ComboboxOption[]
    }
    if (!multiple && singleProps?.value !== undefined) {
      return singleProps.value
        ? options.find((o) => o.value === singleProps.value) ?? null
        : null
    }
    return undefined
  }

  const getDefaultValueOption = () => {
    if (multiple && multiProps?.defaultValue) {
      return multiProps.defaultValue
        .map((v) => options.find((o) => o.value === v))
        .filter(Boolean) as ComboboxOption[]
    }
    if (!multiple && singleProps?.defaultValue) {
      return options.find((o) => o.value === singleProps.defaultValue) ?? null
    }
    return undefined
  }

  return (
    <div
      data-slot="combobox"
      data-size={resolvedSize}
      data-multiple={multiple || undefined}
      className={cn("flex w-full flex-col gap-[var(--space-8)]", className)}
    >
      {/* Label & Description */}
      {(hasLabel || hasDescription) && (
        <div data-slot="label-container" className="flex flex-col gap-[var(--space-2)]">
          {hasLabel && (
            <label
              data-slot="label"
              className={cn(
                "font-[var(--font-weight-medium)]",
                resolvedSize === "s"
                  ? "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]"
                  : "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
                disabled ? "text-content-muted" : "text-content-strong"
              )}
            >
              {label}
            </label>
          )}
          {hasDescription && (
            <span
              data-slot="description"
              className={cn(
                "font-[var(--font-weight-default)]",
                "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
                disabled ? "text-content-muted" : "text-content-subtle"
              )}
            >
              {description}
            </span>
          )}
        </div>
      )}

      <ComboboxPrimitive.Root
        items={options}
        {...(getValueOption() !== undefined && { value: getValueOption() })}
        defaultValue={getDefaultValueOption()}
        onValueChange={handleValueChange as (value: unknown) => void}
        disabled={disabled}
        multiple={multiple}
        itemToStringLabel={getItemLabel}
        itemToStringValue={getItemValue}
      >
        <div
          ref={triggerRef}
          data-slot="trigger-container"
          onMouseDown={() => setIsMouseFocus(true)}
          onBlur={() => setIsMouseFocus(false)}
          className={cn(
            triggerVariants({ size }),
            !disabled && "hover:bg-actions-secondary-hover",
            !isMouseFocus && "has-[:focus]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
            disabled && "bg-actions-secondary-disabled cursor-not-allowed",
            multiple && "flex-wrap gap-[6px] !pl-[var(--space-6)]"
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

          {/* Multi-select: Input MUST be inside Chips for keyboard context */}
          {multiple ? (
            <ComboboxPrimitive.Chips className="contents">
              <ComboboxPrimitive.Value>
                {(selectedItems) => {
                  const items = selectedItems as ComboboxOption[]
                  const hasChips = items.length > 0
                  return (
                    <>
                      {items.map((option) => (
                        <ComboboxPrimitive.Chip
                          key={option.value}
                          data-slot="chip"
                          className={cn(
                            "inline-flex h-[var(--space-24)] items-center gap-[var(--space-4)]",
                            "rounded-[var(--radius-max)] bg-actions-tertiary-default backdrop-blur-[12px]",
                            "shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
                            "pl-[var(--space-10)] pr-[var(--space-2)]",
                            "text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)]",
                            "outline-none select-none",
                            "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
                            disabled && "bg-actions-tertiary-disabled shadow-none"
                          )}
                        >
                          <span className={disabled ? "text-content-disabled" : "text-content-strong"}>
                            {option.label}
                          </span>
                          <ComboboxPrimitive.ChipRemove
                            data-slot="chip-remove"
                            className={cn(
                              "flex size-[20px] shrink-0 items-center justify-center rounded-[var(--radius-max)] p-[2px]",
                              "transition-[background-color] duration-200 ease-out [&_svg]:size-full",
                              disabled
                                ? "text-content-disabled"
                                : "text-content-subtle hover:bg-actions-secondary-hover hover:text-content-strong"
                            )}
                          >
                            <RiCloseLine />
                          </ComboboxPrimitive.ChipRemove>
                        </ComboboxPrimitive.Chip>
                      ))}
                      <ComboboxPrimitive.Input
                        data-slot="input"
                        placeholder={hasChips ? "" : placeholder}
                        disabled={disabled}
                        className={cn(
                          "min-w-[60px] flex-1 truncate bg-transparent outline-none",
                          "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                          "placeholder:text-content-muted caret-actions-primary-default",
                          hasChips ? "" : "pl-[var(--space-6)]",
                          disabled
                            ? "text-content-disabled placeholder:text-content-disabled cursor-not-allowed"
                            : "text-content-strong"
                        )}
                      />
                    </>
                  )
                }}
              </ComboboxPrimitive.Value>
            </ComboboxPrimitive.Chips>
          ) : (
            <ComboboxPrimitive.Input
              data-slot="input"
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "min-w-[60px] flex-1 truncate bg-transparent outline-none",
                "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                "placeholder:text-content-muted caret-actions-primary-default",
                disabled
                  ? "text-content-disabled placeholder:text-content-disabled cursor-not-allowed"
                  : "text-content-strong"
              )}
            />
          )}

          {/* Clear button - only for single select */}
          {clearable && !multiple && !disabled && (
            <ComboboxPrimitive.Clear
              data-slot="clear"
              className={cn(
                "flex size-[16px] shrink-0 items-center justify-center rounded-[var(--radius-4)] [&_svg]:size-full cursor-pointer",
                "text-content-muted hover:text-content-strong transition-colors duration-200"
              )}
            >
              <RiCloseLine />
            </ComboboxPrimitive.Clear>
          )}

          {!multiple && (
            <ComboboxPrimitive.Trigger
              data-slot="trigger"
              disabled={disabled}
              className={cn(
                "flex size-[16px] shrink-0 items-center justify-center [&_svg]:size-full cursor-pointer",
                disabled ? "text-content-disabled cursor-not-allowed" : "text-content-muted"
              )}
            >
              <RiArrowDownSLine />
            </ComboboxPrimitive.Trigger>
          )}
        </div>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner
            data-slot="positioner"
            anchor={triggerRef}
            side={side}
            align={align}
            sideOffset={sideOffset}
            collisionPadding={8}
            className="outline-none"
          >
            <ComboboxPrimitive.Popup
              data-slot="popup"
              className={cn(
                listPopupStyles.base,
                listPopupStyles.width
              )}
            >
              <div className="flex max-h-[320px] flex-col gap-[var(--space-2)] overflow-auto p-[var(--space-4)] scroll-p-[var(--space-4)]">
                <ComboboxPrimitive.Empty
                  data-slot="empty"
                  className={cn(
                    "flex w-full items-center justify-center empty:hidden",
                    "min-h-[36px] px-[var(--space-10)] py-[var(--space-6)]",
                    "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                    "text-content-muted"
                  )}
                >
                  No results found
                </ComboboxPrimitive.Empty>
                <ComboboxPrimitive.List>
                  {(item) => {
                    const option = item as ComboboxOption
                    return (
                      <ComboboxPrimitive.Item
                        key={option.value}
                        value={option}
                        disabled={option.disabled}
                        data-slot="item"
                        className={cn(listItemVariants())}
                      >
                        {option.icon && (
                          <span className="flex shrink-0 items-start self-stretch">
                            <MenuPrefix
                              type={option.prefixType ?? "icon"}
                              icon={option.icon}
                              color={option.prefixColor}
                              disabled={option.disabled}
                            />
                          </span>
                        )}

                        <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)] pl-[var(--space-2)]">
                          <span
                            data-slot="item-text"
                            className={cn(
                              "truncate",
                              "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                              option.disabled ? "text-content-disabled" : "text-content-strong"
                            )}
                          >
                            {option.label}
                          </span>
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

                        <ComboboxPrimitive.ItemIndicator
                          data-slot="indicator"
                          className="flex size-[20px] shrink-0 items-center justify-center"
                        >
                          <span className="flex size-[16px] items-center justify-center text-content-strong [&_svg]:size-full">
                            <RiCheckFill />
                          </span>
                        </ComboboxPrimitive.ItemIndicator>
                      </ComboboxPrimitive.Item>
                    )
                  }}
                </ComboboxPrimitive.List>
              </div>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>

      {/* Error message */}
      {hasError && (
        <div
          data-slot="error"
          className="flex w-full items-center gap-[var(--space-4)]"
        >
          <RiErrorWarningFill className="size-[16px] shrink-0 text-content-feedback-danger-strong" />
          <span className="flex-1 text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-feedback-danger-strong">
            {error}
          </span>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Grouped Combobox Types
// ============================================================================

type GroupedComboboxBaseProps = VariantProps<typeof triggerVariants> & {
  /** Grouped options */
  groups: ComboboxGroup[]
  /** Placeholder text when no value selected */
  placeholder?: string
  /** Label text */
  label?: string
  /** Description text */
  description?: string
  /** Error message */
  error?: string
  /** Leading icon on trigger */
  leadingIcon?: React.ReactNode
  /** Disabled state */
  disabled?: boolean
  /** Show clear button */
  clearable?: boolean
  /** Additional class name */
  className?: string
  /** Dropdown position relative to trigger */
  side?: "top" | "bottom" | "left" | "right"
  /** Dropdown alignment relative to trigger */
  align?: "start" | "center" | "end"
  /** Gap between trigger and dropdown */
  sideOffset?: number
}

type SingleGroupedComboboxProps = GroupedComboboxBaseProps & {
  multiple?: false
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

type MultiGroupedComboboxProps = GroupedComboboxBaseProps & {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type GroupedComboboxProps = SingleGroupedComboboxProps | MultiGroupedComboboxProps

// ============================================================================
// Grouped Combobox Component
// ============================================================================

function GroupedCombobox(props: GroupedComboboxProps) {
  const {
    className,
    size,
    groups,
    placeholder = "Select an option",
    label,
    description,
    error,
    leadingIcon,
    disabled,
    clearable = false,
    side = "bottom",
    align = "start",
    sideOffset = 4,
    multiple,
  } = props

  const resolvedSize: ComboboxSize = size ?? "m"
  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)
  const hasError = Boolean(error)

  // Track if focus came from mouse to hide focus ring
  const [isMouseFocus, setIsMouseFocus] = React.useState(false)

  // Transform groups to Base UI's expected format (with `items` property)
  const groupedItems = groups.map((g) => ({
    value: g.label,
    label: g.label,
    items: g.options,
  }))

  // Flatten all options for value lookup
  const allOptions = groups.flatMap((g) => g.options)

  // Ref for the trigger container
  const triggerRef = React.useRef<HTMLDivElement>(null)

  // Get props for controlled/uncontrolled mode
  const multiProps = multiple ? (props as MultiGroupedComboboxProps) : null
  const singleProps = !multiple ? (props as SingleGroupedComboboxProps) : null

  // Handle value change from Base UI
  const handleValueChange = (newValue: ComboboxOption | ComboboxOption[] | null) => {
    if (multiple) {
      const newOptions = (newValue as ComboboxOption[] | null) ?? []
      const newValues = newOptions.map((o) => o.value)
      multiProps?.onValueChange?.(newValues)
    } else {
      const value = (newValue as ComboboxOption | null)?.value ?? null
      singleProps?.onValueChange?.(value)
    }
  }

  // Get value/defaultValue for Base UI
  const getValueOption = () => {
    if (multiple && multiProps?.value !== undefined) {
      return multiProps.value
        .map((v) => allOptions.find((o) => o.value === v))
        .filter(Boolean) as ComboboxOption[]
    }
    if (!multiple && singleProps?.value !== undefined) {
      return singleProps.value
        ? allOptions.find((o) => o.value === singleProps.value) ?? null
        : null
    }
    return undefined
  }

  const getDefaultValueOption = () => {
    if (multiple && multiProps?.defaultValue) {
      return multiProps.defaultValue
        .map((v) => allOptions.find((o) => o.value === v))
        .filter(Boolean) as ComboboxOption[]
    }
    if (!multiple && singleProps?.defaultValue) {
      return allOptions.find((o) => o.value === singleProps.defaultValue) ?? null
    }
    return undefined
  }

  return (
    <div
      data-slot="combobox"
      data-size={resolvedSize}
      data-multiple={multiple || undefined}
      data-grouped
      className={cn("flex w-full flex-col gap-[var(--space-8)]", className)}
    >
      {/* Label & Description */}
      {(hasLabel || hasDescription) && (
        <div data-slot="label-container" className="flex flex-col gap-[var(--space-2)]">
          {hasLabel && (
            <label
              data-slot="label"
              className={cn(
                "font-[var(--font-weight-medium)]",
                resolvedSize === "s"
                  ? "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]"
                  : "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
                disabled ? "text-content-muted" : "text-content-strong"
              )}
            >
              {label}
            </label>
          )}
          {hasDescription && (
            <span
              data-slot="description"
              className={cn(
                "font-[var(--font-weight-default)]",
                "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
                disabled ? "text-content-muted" : "text-content-subtle"
              )}
            >
              {description}
            </span>
          )}
        </div>
      )}

      <ComboboxPrimitive.Root
        items={groupedItems}
        {...(getValueOption() !== undefined && { value: getValueOption() })}
        defaultValue={getDefaultValueOption()}
        onValueChange={handleValueChange as (value: unknown) => void}
        disabled={disabled}
        multiple={multiple}
        itemToStringLabel={getItemLabel}
        itemToStringValue={getItemValue}
      >
        <div
          ref={triggerRef}
          data-slot="trigger-container"
          onMouseDown={() => setIsMouseFocus(true)}
          onBlur={() => setIsMouseFocus(false)}
          className={cn(
            triggerVariants({ size }),
            !disabled && "hover:bg-actions-secondary-hover",
            !isMouseFocus && "has-[:focus]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
            disabled && "bg-actions-secondary-disabled cursor-not-allowed",
            multiple && "flex-wrap gap-[6px] !pl-[var(--space-6)]"
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

          {/* Multi-select: Input MUST be inside Chips for keyboard context */}
          {multiple ? (
            <ComboboxPrimitive.Chips className="contents">
              <ComboboxPrimitive.Value>
                {(selectedItems) => {
                  const items = selectedItems as ComboboxOption[]
                  const hasChips = items.length > 0
                  return (
                    <>
                      {items.map((option) => (
                        <ComboboxPrimitive.Chip
                          key={option.value}
                          data-slot="chip"
                          className={cn(
                            "inline-flex h-[var(--space-24)] items-center gap-[var(--space-4)]",
                            "rounded-[var(--radius-max)] bg-actions-tertiary-default backdrop-blur-[12px]",
                            "shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
                            "pl-[var(--space-10)] pr-[var(--space-2)]",
                            "text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)]",
                            "outline-none select-none",
                            "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
                            disabled && "bg-actions-tertiary-disabled shadow-none"
                          )}
                        >
                          <span className={disabled ? "text-content-disabled" : "text-content-strong"}>
                            {option.label}
                          </span>
                          <ComboboxPrimitive.ChipRemove
                            data-slot="chip-remove"
                            className={cn(
                              "flex size-[20px] shrink-0 items-center justify-center rounded-[var(--radius-max)] p-[2px]",
                              "transition-[background-color] duration-200 ease-out [&_svg]:size-full",
                              disabled
                                ? "text-content-disabled"
                                : "text-content-subtle hover:bg-actions-secondary-hover hover:text-content-strong"
                            )}
                          >
                            <RiCloseLine />
                          </ComboboxPrimitive.ChipRemove>
                        </ComboboxPrimitive.Chip>
                      ))}
                      <ComboboxPrimitive.Input
                        data-slot="input"
                        placeholder={hasChips ? "" : placeholder}
                        disabled={disabled}
                        className={cn(
                          "min-w-[60px] flex-1 truncate bg-transparent outline-none",
                          "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                          "placeholder:text-content-muted caret-actions-primary-default",
                          hasChips ? "" : "pl-[var(--space-6)]",
                          disabled
                            ? "text-content-disabled placeholder:text-content-disabled cursor-not-allowed"
                            : "text-content-strong"
                        )}
                      />
                    </>
                  )
                }}
              </ComboboxPrimitive.Value>
            </ComboboxPrimitive.Chips>
          ) : (
            <ComboboxPrimitive.Input
              data-slot="input"
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "min-w-[60px] flex-1 truncate bg-transparent outline-none",
                "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                "placeholder:text-content-muted caret-actions-primary-default",
                disabled
                  ? "text-content-disabled placeholder:text-content-disabled cursor-not-allowed"
                  : "text-content-strong"
              )}
            />
          )}

          {/* Clear button - only for single select */}
          {clearable && !multiple && !disabled && (
            <ComboboxPrimitive.Clear
              data-slot="clear"
              className={cn(
                "flex size-[16px] shrink-0 items-center justify-center rounded-[var(--radius-4)] [&_svg]:size-full cursor-pointer",
                "text-content-muted hover:text-content-strong transition-colors duration-200"
              )}
            >
              <RiCloseLine />
            </ComboboxPrimitive.Clear>
          )}

          {!multiple && (
            <ComboboxPrimitive.Trigger
              data-slot="trigger"
              disabled={disabled}
              className={cn(
                "flex size-[16px] shrink-0 items-center justify-center [&_svg]:size-full cursor-pointer",
                disabled ? "text-content-disabled cursor-not-allowed" : "text-content-muted"
              )}
            >
              <RiArrowDownSLine />
            </ComboboxPrimitive.Trigger>
          )}
        </div>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner
            data-slot="positioner"
            anchor={triggerRef}
            side={side}
            align={align}
            sideOffset={sideOffset}
            collisionPadding={8}
            className="outline-none"
          >
            <ComboboxPrimitive.Popup
              data-slot="popup"
              className={cn(
                listPopupStyles.base,
                listPopupStyles.width
              )}
            >
              <div className="flex max-h-[320px] flex-col overflow-auto p-[var(--space-4)] scroll-p-[var(--space-4)]">
                <ComboboxPrimitive.Empty
                  data-slot="empty"
                  className={cn(
                    "flex w-full items-center justify-center empty:hidden",
                    "min-h-[36px] px-[var(--space-10)] py-[var(--space-6)]",
                    "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                    "text-content-muted"
                  )}
                >
                  No results found
                </ComboboxPrimitive.Empty>
                <ComboboxPrimitive.List className="flex flex-col">
                  {(group: { value: string; label: string; items: ComboboxOption[] }) => (
                    <ComboboxPrimitive.Group
                      key={group.value}
                      items={group.items}
                      data-slot="group"
                      className="flex flex-col gap-[var(--space-2)] [&:not(:first-child)]:mt-[var(--space-8)] [&:not(:first-child)]:border-t [&:not(:first-child)]:border-border-muted [&:not(:first-child)]:pt-[var(--space-8)]"
                    >
                      <ComboboxPrimitive.GroupLabel
                        data-slot="group-label"
                        className={cn(
                          "flex min-h-[28px] items-center px-[var(--space-12)] py-[var(--space-6)]",
                          "text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)]",
                          "text-content-subtle"
                        )}
                      >
                        {group.label}
                      </ComboboxPrimitive.GroupLabel>
                      <ComboboxPrimitive.Collection>
                        {(option: ComboboxOption) => (
                          <ComboboxPrimitive.Item
                            key={option.value}
                            value={option}
                            disabled={option.disabled}
                            data-slot="item"
                            className={cn(listItemVariants())}
                          >
                            {option.icon && (
                              <span className="flex shrink-0 items-start self-stretch">
                                <MenuPrefix
                                  type={option.prefixType ?? "icon"}
                                  icon={option.icon}
                                  color={option.prefixColor}
                                  disabled={option.disabled}
                                />
                              </span>
                            )}

                            <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)] pl-[var(--space-2)]">
                              <span
                                data-slot="item-text"
                                className={cn(
                                  "truncate",
                                  "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                                  option.disabled ? "text-content-disabled" : "text-content-strong"
                                )}
                              >
                                {option.label}
                              </span>
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

                            <ComboboxPrimitive.ItemIndicator
                              data-slot="indicator"
                              className="flex size-[20px] shrink-0 items-center justify-center"
                            >
                              <span className="flex size-[16px] items-center justify-center text-content-strong [&_svg]:size-full">
                                <RiCheckFill />
                              </span>
                            </ComboboxPrimitive.ItemIndicator>
                          </ComboboxPrimitive.Item>
                        )}
                      </ComboboxPrimitive.Collection>
                    </ComboboxPrimitive.Group>
                  )}
                </ComboboxPrimitive.List>
              </div>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>

      {/* Error message */}
      {hasError && (
        <div
          data-slot="error"
          className="flex w-full items-center gap-[var(--space-4)]"
        >
          <RiErrorWarningFill className="size-[16px] shrink-0 text-content-feedback-danger-strong" />
          <span className="flex-1 text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-feedback-danger-strong">
            {error}
          </span>
        </div>
      )}
    </div>
  )
}

export { Combobox, GroupedCombobox }
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxSize,
  ComboboxGroup,
  SingleComboboxProps,
  MultiComboboxProps,
  GroupedComboboxProps,
  SingleGroupedComboboxProps,
  MultiGroupedComboboxProps
}
