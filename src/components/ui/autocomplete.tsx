"use client"

import * as React from "react"
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { listPopupStyles, listItemVariants } from "./list-item-styles"
import { MenuPrefix } from "./menu-prefix"

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

type AutocompleteSize = "s" | "m" | "l"

type AutocompleteOption = {
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

type AutocompleteProps = VariantProps<typeof triggerVariants> & {
  /** Autocomplete options */
  options: AutocompleteOption[]
  /** Placeholder text */
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

  // Value props (for input text)
  /** Current input value (controlled) */
  value?: string
  /** Default input value (uncontrolled) */
  defaultValue?: string
  /** Change handler for input value */
  onValueChange?: (value: string) => void

  // Filtering
  /** Filtering mode */
  mode?: "list" | "both" | "inline" | "none"
  /** Custom filter function */
  filter?: (option: AutocompleteOption, inputValue: string) => boolean
  /** Externally filtered options (for async) */
  filteredOptions?: AutocompleteOption[]

  // Behavior
  /** Auto-highlight first match */
  autoHighlight?: boolean | "always"
  /** Maximum visible results */
  limit?: number
}

// Helper to get label from item (used for display in input)
function getItemStringValue(item: unknown): string {
  if (!item) return ""
  if (typeof item === "string") return item
  if (typeof item === "object" && "label" in item) {
    return (item as AutocompleteOption).label
  }
  return ""
}

// ============================================================================
// Autocomplete Component
// ============================================================================

function Autocomplete({
  className,
  size,
  options,
  placeholder = "Type to search...",
  leadingIcon,
  disabled,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  value,
  defaultValue,
  onValueChange,
  mode = "list",
  filter,
  filteredOptions,
  autoHighlight = false,
  limit,
}: AutocompleteProps) {
  const resolvedSize: AutocompleteSize = size ?? "m"

  // Track if focus came from mouse to hide focus ring
  const [isMouseFocus, setIsMouseFocus] = React.useState(false)

  // Ref for the trigger container to use as anchor
  const triggerRef = React.useRef<HTMLDivElement>(null)

  // Use filteredOptions if provided (for async), otherwise use options
  const items = filteredOptions ?? options

  // Custom filter wrapper if provided
  const filterFn = filter
    ? (item: unknown, inputValue: string) => filter(item as AutocompleteOption, inputValue)
    : undefined

  return (
    <div
      data-slot="autocomplete"
      data-size={resolvedSize}
      className={className}
    >
    <AutocompletePrimitive.Root
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      mode={mode}
      filter={filterFn}
      autoHighlight={autoHighlight}
      limit={limit !== undefined ? limit : -1}
      itemToStringValue={getItemStringValue}
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

          <AutocompletePrimitive.Input
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

        </div>

        <AutocompletePrimitive.Portal>
          <AutocompletePrimitive.Positioner
            data-slot="positioner"
            anchor={triggerRef}
            side={side}
            align={align}
            sideOffset={sideOffset}
            collisionPadding={8}
            className="outline-none"
          >
            <AutocompletePrimitive.Popup
              data-slot="popup"
              className={cn(
                listPopupStyles.base,
                listPopupStyles.width
              )}
            >
              <div className="flex max-h-[320px] flex-col overflow-auto p-[var(--space-4)] scroll-p-[var(--space-4)]">
                <AutocompletePrimitive.Empty
                  data-slot="empty"
                  className={cn(
                    "flex w-full items-center justify-center empty:hidden rounded-[var(--radius-10)]",
                    "min-h-[36px] px-[var(--space-10)] py-[var(--space-6)]",
                    "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
                    "text-content-muted"
                  )}
                >
                  No results found
                </AutocompletePrimitive.Empty>
                <AutocompletePrimitive.List className="flex flex-col gap-[var(--space-2)] empty:hidden">
                  {(item) => {
                    const option = item as AutocompleteOption
                    return (
                      <AutocompletePrimitive.Item
                        key={option.value}
                        value={option}
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
                      </AutocompletePrimitive.Item>
                    )
                  }}
                </AutocompletePrimitive.List>
              </div>
            </AutocompletePrimitive.Popup>
          </AutocompletePrimitive.Positioner>
        </AutocompletePrimitive.Portal>
    </AutocompletePrimitive.Root>
    </div>
  )
}

export { Autocomplete }
export type { AutocompleteProps, AutocompleteOption, AutocompleteSize }
