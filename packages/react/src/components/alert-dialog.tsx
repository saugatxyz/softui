"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { AnimatePresence, motion } from "motion/react"

import { cn, omitMotionConflictingEventHandlers, usePrefersReducedMotion } from "../lib/utils"

// ============================================================================
// Mobile Detection Hook
// ============================================================================

const MOBILE_BREAKPOINT = 640

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

// ============================================================================
// Animation Helpers
// ============================================================================

const backdropTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

const getPopupTransition = (isMobile: boolean) => ({
  type: "spring" as const,
  bounce: 0,
  duration: isMobile ? 0.2 : 0.15,
})

const getPopupTransform = (open: boolean, isMobile: boolean) => {
  // Mobile: slide up from bottom
  if (isMobile) {
    return `translateY(${open ? "0%" : "100%"})`
  }
  // Desktop: scale + translate centered
  return `translate(-50%, -50%) translateY(${open ? 0 : 8}px) scale(${open ? 1 : 0.95})`
}

// ============================================================================
// Context
// ============================================================================

type AlertDialogContextValue = {
  open: boolean
  isMobile: boolean
  prefersReducedMotion: boolean
}

const AlertDialogContext = React.createContext<AlertDialogContextValue>({ open: false, isMobile: false, prefersReducedMotion: false })

function useAlertDialogContext() {
  return React.useContext(AlertDialogContext)
}

// ============================================================================
// AlertDialog Root
// ============================================================================

type AlertDialogRootProps = AlertDialogPrimitive.Root.Props

function AlertDialogRoot({
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: AlertDialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false)
  const isControlled = open !== undefined
  const resolvedOpen = isControlled ? open : uncontrolledOpen
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: Parameters<NonNullable<typeof onOpenChange>>[1]) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <AlertDialogContext.Provider value={{ open: resolvedOpen, isMobile, prefersReducedMotion }}>
      <AlertDialogPrimitive.Root
        {...props}
        {...(isControlled ? { open } : { defaultOpen })}
        onOpenChange={handleOpenChange}
      >
        {children}
      </AlertDialogPrimitive.Root>
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

function AlertDialogPortal({ children, keepMounted = false, ...props }: AlertDialogPortalProps) {
  const { open } = useAlertDialogContext()

  if (keepMounted) {
    // When keepMounted, always render children
    // Children (Backdrop, Popup) animate based on open state from context
    return (
      <AlertDialogPrimitive.Portal {...props} keepMounted>
        {children}
      </AlertDialogPrimitive.Portal>
    )
  }

  // Ensure AnimatePresence children have stable keys.
  const presenceChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child
    if (child.key != null) return child
    return React.cloneElement(child, { key: `alert-dialog-${index}` })
  })

  // When not keepMounted, use AnimatePresence for mount/unmount animations
  return (
    <AlertDialogPrimitive.Portal {...props} keepMounted={false}>
      <AnimatePresence>
        {open ? presenceChildren : null}
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
  const { open, prefersReducedMotion } = useAlertDialogContext()
  const instantTransition = { duration: 0 }

  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-utility-backdrop",
        className
      )}
      render={(backdropProps) => {
        const {
          className: backdropClassName,
          ...backdropRest
        } = backdropProps
        const backdropMotionProps = omitMotionConflictingEventHandlers(backdropRest)

        return (
          <motion.div
            {...backdropMotionProps}
            className={backdropClassName}
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? instantTransition : backdropTransition}
            style={{ pointerEvents: open ? "auto" : "none" }}
          />
        )
      }}
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
  const { open, isMobile, prefersReducedMotion } = useAlertDialogContext()
  const instantTransition = { duration: 0 }

  // For reduced motion, use the final position immediately
  const getInitialTransform = () => {
    if (prefersReducedMotion) return getPopupTransform(true, isMobile)
    return getPopupTransform(false, isMobile)
  }

  return (
    <AlertDialogPrimitive.Popup
      data-slot="alert-dialog-popup"
      className={cn(
        // Positioning - Mobile: bottom sheet, Desktop: centered
        "fixed z-50",
        // Mobile: bottom sheet with 8px padding
        "bottom-[var(--space-8)] left-[var(--space-8)] right-[var(--space-8)]",
        "max-h-[calc(100dvh-var(--space-16))]",
        // Desktop: centered
        "sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2",
        "sm:w-[min(400px,calc(100vw-var(--space-32)))] sm:max-h-none",
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
      render={(popupProps) => {
        const {
          className: popupClassName,
          ...popupRest
        } = popupProps
        const popupMotionProps = omitMotionConflictingEventHandlers(popupRest)

        return (
          <motion.div
            {...popupMotionProps}
            className={popupClassName}
            initial={{ opacity: prefersReducedMotion ? 1 : 0, transform: getInitialTransform() }}
            animate={{ opacity: open ? 1 : 0, transform: getPopupTransform(open, isMobile) }}
            exit={{ opacity: 0, transform: prefersReducedMotion ? getPopupTransform(true, isMobile) : getPopupTransform(false, isMobile) }}
            transition={prefersReducedMotion ? instantTransition : getPopupTransition(isMobile)}
            style={{ pointerEvents: open ? "auto" : "none" }}
          />
        )
      }}
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
            "flex size-[var(--space-28)] items-center justify-center [&_svg]:size-full",
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
        // Buttons always fill container width in AlertDialog
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
