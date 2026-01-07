"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

const springTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

// Context to share open state for AnimatePresence
const AlertDialogContext = React.createContext<{ open: boolean }>({ open: false })

// ============================================================================
// AlertDialog Root
// ============================================================================

type AlertDialogRootProps = AlertDialogPrimitive.Root.Props

function AlertDialogRoot({ open, onOpenChange, defaultOpen, ...props }: AlertDialogRootProps) {
  // Track open state for AnimatePresence (supports both controlled and uncontrolled)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const isOpen = open ?? internalOpen

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      setInternalOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [onOpenChange]
  )

  return (
    <AlertDialogContext.Provider value={{ open: isOpen }}>
      <AlertDialogPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </AlertDialogContext.Provider>
  )
}

// ============================================================================
// AlertDialog Trigger
// ============================================================================

type AlertDialogTriggerProps = Omit<AlertDialogPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function AlertDialogTrigger({ className, ...props }: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// AlertDialog Portal
// ============================================================================

type AlertDialogPortalProps = AlertDialogPrimitive.Portal.Props & {
  children?: React.ReactNode
}

function AlertDialogPortal({ children, ...props }: AlertDialogPortalProps) {
  const { open } = React.useContext(AlertDialogContext)

  return (
    <AlertDialogPrimitive.Portal {...props} keepMounted>
      <AnimatePresence>
        {open && (
          <React.Fragment key="alert-dialog-content">
            {children}
          </React.Fragment>
        )}
      </AnimatePresence>
    </AlertDialogPrimitive.Portal>
  )
}

// ============================================================================
// AlertDialog Backdrop
// ============================================================================

type AlertDialogBackdropProps = Omit<AlertDialogPrimitive.Backdrop.Props, "className"> & {
  className?: string
}

function AlertDialogBackdrop({ className, ...props }: AlertDialogBackdropProps) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-backdrop"
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
// AlertDialog Popup
// ============================================================================

type AlertDialogPopupProps = Omit<AlertDialogPrimitive.Popup.Props, "className"> & {
  className?: string
}

function AlertDialogPopup({ className, children, ...props }: AlertDialogPopupProps) {
  return (
    <AlertDialogPrimitive.Popup
      data-slot="alert-dialog-popup"
      className={cn(
        // Positioning
        "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        // Sizing
        "w-[min(400px,calc(100vw-var(--space-32)))]",
        // Appearance - layered: surface-overlay base + surface-canvas on top
        "rounded-[var(--radius-24)] bg-surface-overlay",
        "before:absolute before:inset-0 before:-z-10 before:rounded-[var(--radius-24)] before:bg-surface-canvas",
        "shadow-[var(--shadow-modal)]",
        "backdrop-blur-[6px]",
        // Layout
        "flex flex-col overflow-hidden",
        // Focus
        "outline-none",
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
    </AlertDialogPrimitive.Popup>
  )
}

// ============================================================================
// AlertDialog Content (inner content area)
// ============================================================================

type AlertDialogContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Optional icon to display above title */
  icon?: React.ReactNode
  /** Icon tone for styling */
  iconTone?: "default" | "danger" | "warning" | "info" | "success"
}

const iconToneStyles: Record<NonNullable<AlertDialogContentProps["iconTone"]>, string> = {
  default: "text-content-strong",
  danger: "text-content-feedback-danger-strong",
  warning: "text-content-feedback-warning-strong",
  info: "text-content-feedback-info-strong",
  success: "text-content-feedback-success-strong",
}

function AlertDialogContent({
  className,
  icon,
  iconTone = "default",
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <div
      data-slot="alert-dialog-content"
      className={cn(
        // Inner content area styling
        "rounded-b-[var(--radius-8)] bg-surface-overlay",
        "shadow-[var(--shadow-modal-content)]",
        // Layout - 24px padding, 24px gap, centered
        "flex flex-col items-center gap-[var(--space-24)] p-[var(--space-24)] text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          data-slot="alert-dialog-icon"
          className={cn(
            "flex size-[28px] items-center justify-center [&_svg]:size-full",
            iconToneStyles[iconTone]
          )}
        >
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-[var(--space-6)]">
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// AlertDialog Title
// ============================================================================

type AlertDialogTitleProps = Omit<AlertDialogPrimitive.Title.Props, "className"> & {
  className?: string
}

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-[length:var(--font-size-l)] font-[var(--font-weight-semibold)] leading-[var(--line-height-l)]",
        "text-content-strong",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// AlertDialog Description
// ============================================================================

type AlertDialogDescriptionProps = Omit<AlertDialogPrimitive.Description.Props, "className"> & {
  className?: string
}

function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
        "text-content-subtle",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// AlertDialog Close
// ============================================================================

type AlertDialogCloseProps = Omit<AlertDialogPrimitive.Close.Props, "className"> & {
  className?: string
}

function AlertDialogClose({ className, ...props }: AlertDialogCloseProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-close"
      className={cn("outline-none flex-1", className)}
      {...props}
    />
  )
}

// ============================================================================
// AlertDialog Footer
// ============================================================================

type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>

function AlertDialogFooter({ className, children, ...props }: AlertDialogFooterProps) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        // 16px vertical padding, 24px horizontal padding
        "flex items-center gap-[var(--space-12)] px-[var(--space-24)] py-[var(--space-16)]",
        // All children and buttons fill container
        "[&>*]:flex-1 [&_button]:w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// AlertDialog Namespace Export
// ============================================================================

const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Backdrop: AlertDialogBackdrop,
  Popup: AlertDialogPopup,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Close: AlertDialogClose,
  Footer: AlertDialogFooter,
}

export { AlertDialog }
export type {
  AlertDialogRootProps,
  AlertDialogTriggerProps,
  AlertDialogPortalProps,
  AlertDialogBackdropProps,
  AlertDialogPopupProps,
  AlertDialogContentProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogCloseProps,
  AlertDialogFooterProps,
}
