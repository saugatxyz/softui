"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { RiCloseLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

// ============================================================================
// Dialog Root
// ============================================================================

type DialogRootProps = DialogPrimitive.Root.Props

function DialogRoot(props: DialogRootProps) {
  return <DialogPrimitive.Root {...props} />
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
  return (
    <DialogPrimitive.Portal {...props}>{children}</DialogPrimitive.Portal>
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
      className={cn(
        "fixed inset-0 z-50 bg-utility-backdrop",
        "transition-opacity duration-150 ease-out",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Dialog Popup
// ============================================================================

type DialogPosition = "center" | "right" | "sheet"

type DialogPopupProps = Omit<DialogPrimitive.Popup.Props, "className"> & {
  className?: string
  position?: DialogPosition
}

const popupPositionStyles: Record<DialogPosition, string> = {
  center: cn(
    "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "w-[min(480px,calc(100vw-var(--space-32)))]",
    "rounded-[var(--radius-24)]",
    "before:rounded-[var(--radius-24)]"
  ),
  right: cn(
    "fixed top-[8px] right-[8px] z-50",
    "h-[calc(100dvh-16px)]",
    "w-full max-w-[400px]",
    "rounded-[var(--radius-24)]",
    "before:rounded-[var(--radius-24)]"
  ),
  sheet: cn(
    "fixed left-[8px] right-[8px] bottom-[8px] z-50",
    "max-h-[calc(100dvh-16px)]",
    "rounded-[var(--radius-24)]",
    "before:rounded-[var(--radius-24)]"
  ),
}

function DialogPopup({ className, children, position = "center", ...props }: DialogPopupProps) {
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-popup"
      data-position={position}
      className={cn(
        // Position-specific styles (includes positioning and rounding)
        popupPositionStyles[position],
        // Appearance - layered: surface-overlay base + surface-canvas on top
        "bg-surface-overlay",
        "before:absolute before:inset-0 before:-z-10 before:bg-surface-canvas",
        "shadow-[var(--shadow-modal)]",
        "backdrop-blur-[6px]",
        // Layout
        "flex flex-col overflow-hidden",
        // Focus
        "outline-none",
        // Nested dialog effect - scale down and push back when child dialog opens
        "transition-[transform,opacity,filter] duration-200 ease-out",
        "data-[nested-dialog-open]:scale-[0.94] data-[nested-dialog-open]:brightness-[0.6]",
        // Enter/exit
        "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
        className
      )}
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
        // Layout - flex-1 to fill popup height (for position="right")
        "flex flex-1 flex-col overflow-hidden",
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
        // Layout - 24px padding, flex-1 to fill available space
        "flex flex-1 flex-col gap-[var(--space-24)] p-[var(--space-24)]",
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
  DialogPosition,
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
