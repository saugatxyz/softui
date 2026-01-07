"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { AnimatePresence, motion } from "motion/react"
import { RiCloseLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

const springTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

// Context to share open state for AnimatePresence
const DialogContext = React.createContext<{ open: boolean }>({ open: false })

// ============================================================================
// Dialog Root
// ============================================================================

type DialogRootProps = DialogPrimitive.Root.Props

function DialogRoot({ open, onOpenChange, defaultOpen, ...props }: DialogRootProps) {
  // Track open state for AnimatePresence (supports both controlled and uncontrolled)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const isOpen = open ?? internalOpen

  const handleOpenChange = React.useCallback(
    (newOpen: boolean, eventDetails: DialogPrimitive.Root.ChangeEventDetails) => {
      setInternalOpen(newOpen)
      onOpenChange?.(newOpen, eventDetails)
    },
    [onOpenChange]
  )

  return (
    <DialogContext.Provider value={{ open: isOpen }}>
      <DialogPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </DialogContext.Provider>
  )
}

// ============================================================================
// Dialog Trigger
// ============================================================================

type DialogTriggerProps = Omit<DialogPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// Dialog Portal
// ============================================================================

type DialogPortalProps = DialogPrimitive.Portal.Props & {
  children?: React.ReactNode
}

function DialogPortal({ children, ...props }: DialogPortalProps) {
  const { open } = React.useContext(DialogContext)

  return (
    <DialogPrimitive.Portal {...props} keepMounted>
      <AnimatePresence>
        {open && (
          <React.Fragment key="dialog-content">
            {children}
          </React.Fragment>
        )}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  )
}

// ============================================================================
// Dialog Backdrop
// ============================================================================

type DialogBackdropProps = Omit<DialogPrimitive.Backdrop.Props, "className"> & {
  className?: string
}

function DialogBackdrop({ className, ...props }: DialogBackdropProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn("fixed inset-0 z-50 bg-utility-backdrop", className)}
      render={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={springTransition}
        />
      }
      {...props}
    />
  )
}

// ============================================================================
// Dialog Popup
// ============================================================================

type DialogPopupProps = Omit<DialogPrimitive.Popup.Props, "className"> & {
  className?: string
}

function DialogPopup({ className, children, ...props }: DialogPopupProps) {
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-popup"
      className={cn(
        // Positioning
        "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        // Sizing
        "w-[min(480px,calc(100vw-var(--space-32)))]",
        // Appearance - layered: surface-overlay base + surface-canvas on top
        "rounded-[var(--radius-24)] bg-surface-overlay",
        "before:absolute before:inset-0 before:-z-10 before:rounded-[var(--radius-24)] before:bg-surface-canvas",
        "shadow-[var(--shadow-modal)]",
        "backdrop-blur-[6px]",
        // Layout
        "flex flex-col overflow-hidden",
        // Focus
        "outline-none",
        // Nested dialog effect - scale down and push back when child dialog opens
        "transition-[scale,filter] duration-200 ease-out",
        "data-[nested-dialog-open]:scale-[0.94] data-[nested-dialog-open]:brightness-[0.6]",
        className
      )}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 4 }}
          transition={springTransition}
        />
      }
      {...props}
    >
      {children}
    </DialogPrimitive.Popup>
  )
}

// ============================================================================
// Dialog Content (wrapper for header + body with inner shadow)
// ============================================================================

type DialogContentProps = React.HTMLAttributes<HTMLDivElement>

function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <div
      data-slot="dialog-content"
      className={cn(
        // Inner container styling
        "rounded-b-[var(--radius-8)] bg-surface-overlay",
        "shadow-[var(--shadow-modal-content)]",
        // Layout
        "flex flex-col overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Dialog Header
// ============================================================================

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

function DialogHeader({ className, children, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        // Layout
        "flex items-center gap-[var(--space-20)]",
        // Sizing - 52px height, padding: 12px top/bottom, 24px left, 16px right
        "h-[52px] py-[var(--space-12)] pl-[var(--space-24)] pr-[var(--space-16)]",
        // Border
        "border-b border-border-subtle",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Dialog Title
// ============================================================================

type DialogTitleProps = Omit<DialogPrimitive.Title.Props, "className"> & {
  className?: string
}

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "flex-1",
        "text-[length:var(--font-size-l)] font-[var(--font-weight-semibold)] leading-[var(--line-height-l)] tracking-[-0.08px]",
        "text-content-strong",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Dialog Description
// ============================================================================

type DialogDescriptionProps = Omit<DialogPrimitive.Description.Props, "className"> & {
  className?: string
}

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
        "text-content-subtle",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Dialog Close Button (X button in header)
// ============================================================================

type DialogCloseProps = Omit<DialogPrimitive.Close.Props, "className"> & {
  className?: string
}

function DialogClose({ className, children, ...props }: DialogCloseProps) {
  // Check if using render prop (for custom buttons) or default X icon
  const isIconButton = !children && !props.render

  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={cn(
        // Only apply icon button styles when using default X icon
        isIconButton && [
          // Size
          "size-[24px] shrink-0",
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
          "outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        ],
        className
      )}
      {...props}
    >
      {isIconButton ? <RiCloseLine className="size-[16px]" /> : children}
    </DialogPrimitive.Close>
  )
}

// ============================================================================
// Dialog Body (content area)
// ============================================================================

type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>

function DialogBody({ className, children, ...props }: DialogBodyProps) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        // Layout - 24px padding
        "flex flex-col gap-[var(--space-24)] p-[var(--space-24)]",
        // Overflow
        "overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Dialog Footer
// ============================================================================

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>

function DialogFooter({ className, children, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        // 16px vertical padding, 24px horizontal padding
        "flex items-center justify-end gap-[var(--space-8)] px-[var(--space-24)] py-[var(--space-16)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Dialog Namespace Export
// ============================================================================

const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Backdrop: DialogBackdrop,
  Popup: DialogPopup,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
  Body: DialogBody,
  Footer: DialogFooter,
}

export { Dialog }
export type {
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogBackdropProps,
  DialogPopupProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogBodyProps,
  DialogFooterProps,
}
