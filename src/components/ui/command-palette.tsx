"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { RiSearchLine, RiCloseLine, RiLoader4Line } from "@remixicon/react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Kbd, KbdGroup } from "./kbd"

// ============================================================================
// Animation Helpers
// ============================================================================

const backdropTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

const popupTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

// ============================================================================
// Context
// ============================================================================

type CommandPaletteContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue>({
  open: false,
  onOpenChange: () => {},
})

function useCommandPaletteContext() {
  return React.useContext(CommandPaletteContext)
}

// ============================================================================
// CommandPalette Root
// ============================================================================

type CommandPaletteRootProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function CommandPaletteRoot({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: CommandPaletteRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false)
  const isControlled = open !== undefined
  const resolvedOpen = isControlled ? open : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  // Global keyboard shortcut to open (⌘K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleOpenChange(!resolvedOpen)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleOpenChange, resolvedOpen])

  const contextValue = React.useMemo(
    () => ({ open: resolvedOpen, onOpenChange: handleOpenChange }),
    [resolvedOpen, handleOpenChange]
  )

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      <DialogPrimitive.Root
        open={resolvedOpen}
        onOpenChange={handleOpenChange}
      >
        {children}
      </DialogPrimitive.Root>
    </CommandPaletteContext.Provider>
  )
}

// ============================================================================
// CommandPalette Trigger
// ============================================================================

type CommandPaletteTriggerProps = Omit<DialogPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function CommandPaletteTrigger({ className, ...props }: CommandPaletteTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="command-palette-trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// CommandPalette Portal & Content
// ============================================================================

type CommandPaletteContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>,
  "className"
> & {
  className?: string
}

function CommandPaletteContent({
  className,
  children,
  ...props
}: CommandPaletteContentProps) {
  const { open, onOpenChange } = useCommandPaletteContext()

  return (
    <DialogPrimitive.Portal keepMounted={false}>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <DialogPrimitive.Backdrop
              data-slot="command-palette-backdrop"
              className="fixed inset-0 z-50 bg-utility-backdrop"
              render={(backdropProps) => {
                const {
                  className: backdropClassName,
                  onAnimationStart,
                  onDrag,
                  onDragStart,
                  onDragEnd,
                  onDragOver,
                  onDragEnter,
                  onDragLeave,
                  onDrop,
                  ...backdropRest
                } = backdropProps

                return (
                  <motion.div
                    key="command-palette-backdrop"
                    {...backdropRest}
                    className={backdropClassName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={backdropTransition}
                  />
                )
              }}
            />

            {/* Popup */}
            <DialogPrimitive.Popup
              data-slot="command-palette-popup"
              className={cn(
                // Position - centered
                "fixed z-50 left-1/2 top-[20%]",
                // Size
                "w-[min(640px,calc(100vw-var(--space-32)))]",
                // Appearance
                "bg-surface-overlay backdrop-blur-[6px]",
                "shadow-[var(--shadow-modal)]",
                "rounded-[20px]",
                // Layout
                "flex flex-col overflow-hidden",
                // Focus
                "outline-none",
                className
              )}
              render={(popupProps) => {
                const {
                  className: popupClassName,
                  onAnimationStart,
                  onDrag,
                  onDragStart,
                  onDragEnd,
                  onDragOver,
                  onDragEnter,
                  onDragLeave,
                  onDrop,
                  ...popupRest
                } = popupProps

                return (
                  <motion.div
                    key="command-palette-popup"
                    {...popupRest}
                    className={popupClassName}
                    initial={{ opacity: 0, scale: 0.95, x: "-50%", y: 8 }}
                    animate={{ opacity: 1, scale: 1, x: "-50%", y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: "-50%", y: 8 }}
                    transition={popupTransition}
                  >
                    <CommandPrimitive
                      data-slot="command-palette"
                      className="flex flex-col"
                      loop
                      {...props}
                    >
                      {children}
                    </CommandPrimitive>
                  </motion.div>
                )
              }}
            />
          </>
        )}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  )
}

// ============================================================================
// CommandPalette Input
// ============================================================================

type CommandPaletteInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
  "className"
> & {
  className?: string
  loading?: boolean
}

function CommandPaletteInput({
  className,
  loading,
  ...props
}: CommandPaletteInputProps) {
  const { onOpenChange } = useCommandPaletteContext()

  return (
    <div
      data-slot="command-palette-input-wrapper"
      className={cn(
        "flex items-center gap-[var(--space-12)] h-[var(--space-48)] pl-[22px] pr-[var(--space-12)]",
        "border-b border-border-subtle",
        className
      )}
    >
      {/* Search icon */}
      {loading ? (
        <RiLoader4Line className="size-[var(--space-16)] shrink-0 text-content-subtle animate-spin" />
      ) : (
        <RiSearchLine className="size-[var(--space-16)] shrink-0 text-content-subtle" />
      )}

      {/* Input */}
      <CommandPrimitive.Input
        data-slot="command-palette-input"
        className={cn(
          "flex-1 bg-transparent outline-none",
          "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
          "text-content-strong placeholder:text-content-muted"
        )}
        {...props}
      />

      {/* Suffix */}
      <div className="flex items-center gap-[var(--space-6)]">
        <Kbd>Esc</Kbd>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className={cn(
            // Size
            "size-[var(--space-24)] shrink-0",
            // Layout
            "flex items-center justify-center",
            // Appearance
            "rounded-full",
            "text-content-subtle",
            // Hover
            "hover:text-content-strong hover:bg-actions-secondary-hover",
            // Transition
            "transition-colors duration-200 ease-out",
            // Focus
            "outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]"
          )}
          aria-label="Close"
        >
          <RiCloseLine className="size-[var(--space-16)]" />
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// CommandPalette List
// ============================================================================

type CommandPaletteListProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>,
  "className"
> & {
  className?: string
}

function CommandPaletteList({ className, children, ...props }: CommandPaletteListProps) {
  return (
    <CommandPrimitive.List
      data-slot="command-palette-list"
      className={cn(
        "flex flex-col gap-[var(--space-2)] p-[var(--space-6)]",
        "max-h-[440px] overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.List>
  )
}

// ============================================================================
// CommandPalette Empty
// ============================================================================

type CommandPaletteEmptyProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>,
  "className"
> & {
  className?: string
}

function CommandPaletteEmpty({ className, children, ...props }: CommandPaletteEmptyProps) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-palette-empty"
      className={cn(
        "flex flex-col items-center justify-center gap-[var(--space-16)] py-[var(--space-24)]",
        "text-content-subtle",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <RiSearchLine className="size-[var(--space-24)] text-content-muted" />
          <div className="flex flex-col items-center gap-[var(--space-4)] text-center">
            <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
              No results found
            </p>
            <p className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle">
              Try a different search term
            </p>
          </div>
        </>
      )}
    </CommandPrimitive.Empty>
  )
}

// ============================================================================
// CommandPalette Group
// ============================================================================

type CommandPaletteGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>,
  "className"
> & {
  className?: string
}

function CommandPaletteGroup({ className, children, ...props }: CommandPaletteGroupProps) {
  return (
    <CommandPrimitive.Group
      data-slot="command-palette-group"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </CommandPrimitive.Group>
  )
}

// ============================================================================
// CommandPalette Group Heading
// ============================================================================

type CommandPaletteGroupHeadingProps = React.HTMLAttributes<HTMLDivElement>

function CommandPaletteGroupHeading({
  className,
  children,
  ...props
}: CommandPaletteGroupHeadingProps) {
  return (
    <div
      data-slot="command-palette-group-heading"
      className={cn(
        "flex items-center px-[var(--space-12)] py-[var(--space-10)]",
        "text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)]",
        "text-content-subtle",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// CommandPalette Item
// ============================================================================

type CommandPaletteItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
  "className"
> & {
  className?: string
}

function CommandPaletteItem({ className, children, ...props }: CommandPaletteItemProps) {
  return (
    <CommandPrimitive.Item
      data-slot="command-palette-item"
      className={cn(
        // Base
        "group flex w-full cursor-pointer items-center gap-[var(--space-10)]",
        "px-[var(--space-12)] py-[var(--space-10)]",
        "rounded-[var(--radius-12)]",
        // Typography
        "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
        "text-content-strong",
        // States
        "outline-none select-none",
        "data-[selected=true]:bg-surface-interactive-hover",
        "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-content-disabled",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Item>
  )
}

// ============================================================================
// CommandPalette Item Prefix
// ============================================================================

type CommandPaletteItemPrefixProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "icon" | "avatar" | "emphasized"
  color?: "neutral" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"
}

const emphasisColors = {
  neutral: "bg-actions-secondary-default text-content-strong",
  red: "bg-surface-decorative-red-strong text-white",
  orange: "bg-surface-decorative-orange-strong text-white",
  amber: "bg-surface-decorative-amber-strong text-white",
  yellow: "bg-surface-decorative-yellow-strong text-white",
  lime: "bg-surface-decorative-lime-strong text-white",
  green: "bg-surface-decorative-green-strong text-white",
  emerald: "bg-surface-decorative-emerald-strong text-white",
  teal: "bg-surface-decorative-teal-strong text-white",
  cyan: "bg-surface-decorative-cyan-strong text-white",
  sky: "bg-surface-decorative-sky-strong text-white",
  blue: "bg-surface-decorative-blue-strong text-white",
  indigo: "bg-surface-decorative-indigo-strong text-white",
  violet: "bg-surface-decorative-violet-strong text-white",
  purple: "bg-surface-decorative-purple-strong text-white",
  fuchsia: "bg-surface-decorative-fuchsia-strong text-white",
  pink: "bg-surface-decorative-pink-strong text-white",
  rose: "bg-surface-decorative-rose-strong text-white",
} as const

function CommandPaletteItemPrefix({
  className,
  variant = "icon",
  color = "neutral",
  children,
  ...props
}: CommandPaletteItemPrefixProps) {
  if (variant === "icon") {
    return (
      <div
        data-slot="command-palette-item-prefix"
        className={cn(
          "flex items-center justify-center h-[var(--space-24)] px-[var(--space-4)]",
          "[&_svg]:size-[var(--space-16)] text-content-strong",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (variant === "avatar") {
    return (
      <div
        data-slot="command-palette-item-prefix"
        className={cn(
          "flex items-center justify-center size-[var(--space-24)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  // emphasized variant
  return (
    <div
      data-slot="command-palette-item-prefix"
      className={cn(
        "flex items-center justify-center size-[var(--space-24)]",
        "rounded-[var(--radius-8)]",
        "[&_svg]:size-[var(--space-16)]",
        emphasisColors[color],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// CommandPalette Item Label
// ============================================================================

type CommandPaletteItemLabelProps = React.HTMLAttributes<HTMLDivElement>

function CommandPaletteItemLabel({
  className,
  children,
  ...props
}: CommandPaletteItemLabelProps) {
  return (
    <div
      data-slot="command-palette-item-label"
      className={cn("flex-1 truncate", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// CommandPalette Item Suffix
// ============================================================================

type CommandPaletteItemSuffixProps = React.HTMLAttributes<HTMLDivElement>

function CommandPaletteItemSuffix({
  className,
  children,
  ...props
}: CommandPaletteItemSuffixProps) {
  return (
    <div
      data-slot="command-palette-item-suffix"
      className={cn(
        "flex items-center gap-[var(--space-12)]",
        "text-content-subtle",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// CommandPalette Separator
// ============================================================================

type CommandPaletteSeparatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>,
  "className"
> & {
  className?: string
}

function CommandPaletteSeparator({ className, ...props }: CommandPaletteSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-palette-separator"
      className={cn(
        "flex h-[var(--space-4)] w-full items-center px-[var(--space-8)]",
        className
      )}
      {...props}
    >
      <span className="h-px w-full bg-border-subtle" />
    </CommandPrimitive.Separator>
  )
}

// ============================================================================
// CommandPalette Footer
// ============================================================================

type CommandPaletteFooterProps = React.HTMLAttributes<HTMLDivElement>

function CommandPaletteFooter({
  className,
  children,
  ...props
}: CommandPaletteFooterProps) {
  return (
    <div
      data-slot="command-palette-footer"
      className={cn(
        "flex items-center gap-[var(--space-24)] h-[var(--space-48)] px-[var(--space-20)]",
        "border-t border-border-subtle",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex items-center gap-[var(--space-10)]">
            <KbdGroup keys={["↑", "↓"]} />
            <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-subtle">
              Navigate
            </span>
          </div>
          <div className="flex items-center gap-[var(--space-10)]">
            <Kbd>⏎</Kbd>
            <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-subtle">
              Select
            </span>
          </div>
          <div className="flex items-center gap-[var(--space-10)]">
            <Kbd>Esc</Kbd>
            <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-subtle">
              Close
            </span>
          </div>
        </>
      )}
    </div>
  )
}

// ============================================================================
// Namespace Export
// ============================================================================

const CommandPalette = {
  Root: CommandPaletteRoot,
  Trigger: CommandPaletteTrigger,
  Content: CommandPaletteContent,
  Input: CommandPaletteInput,
  List: CommandPaletteList,
  Empty: CommandPaletteEmpty,
  Group: CommandPaletteGroup,
  GroupHeading: CommandPaletteGroupHeading,
  Item: CommandPaletteItem,
  ItemPrefix: CommandPaletteItemPrefix,
  ItemLabel: CommandPaletteItemLabel,
  ItemSuffix: CommandPaletteItemSuffix,
  Separator: CommandPaletteSeparator,
  Footer: CommandPaletteFooter,
}

export { CommandPalette }
export type {
  CommandPaletteRootProps,
  CommandPaletteTriggerProps,
  CommandPaletteContentProps,
  CommandPaletteInputProps,
  CommandPaletteListProps,
  CommandPaletteEmptyProps,
  CommandPaletteGroupProps,
  CommandPaletteGroupHeadingProps,
  CommandPaletteItemProps,
  CommandPaletteItemPrefixProps,
  CommandPaletteItemLabelProps,
  CommandPaletteItemSuffixProps,
  CommandPaletteSeparatorProps,
  CommandPaletteFooterProps,
}
