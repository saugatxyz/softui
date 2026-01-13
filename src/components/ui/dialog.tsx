"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { RiCloseLine } from "@remixicon/react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

type DialogPosition = "center" | "right" | "sheet"

// ============================================================================
// Animation Helpers
// ============================================================================

const backdropTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

const getPopupTransition = (position: DialogPosition) => ({
  type: "spring" as const,
  bounce: 0,
  duration: position === "center" ? 0.15 : 0.2,
})

const getCenterTransform = (scale: number, translateY: number) =>
  `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`

const getRightTransform = (translateX: number | string) =>
  `translateX(${translateX})`

const getSheetTransform = (translateY: number | string) =>
  `translateY(${translateY})`

// ============================================================================
// Context
// ============================================================================

type DialogContextValue = {
  open: boolean
}

const DialogContext = React.createContext<DialogContextValue>({ open: false })

function useDialogContext() {
  return React.useContext(DialogContext)
}

// ============================================================================
// Dialog Root
// ============================================================================

type DialogRootProps = DialogPrimitive.Root.Props

function DialogRoot({
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false)
  const isControlled = open !== undefined
  const resolvedOpen = isControlled ? open : uncontrolledOpen

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
    <DialogContext.Provider value={{ open: resolvedOpen }}>
      <DialogPrimitive.Root
        {...props}
        {...(isControlled ? { open } : { defaultOpen })}
        onOpenChange={handleOpenChange}
      >
        {children}
      </DialogPrimitive.Root>
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

function DialogPortal({ children, keepMounted, ...props }: DialogPortalProps) {
  const { open } = useDialogContext()
  const resolvedChildren = React.Children.toArray(children)

  return (
    <DialogPrimitive.Portal {...props} keepMounted={keepMounted ?? true}>
      <AnimatePresence initial={false}>
        {open ? resolvedChildren : null}
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
      className={cn(
        "fixed inset-0 z-50 bg-utility-backdrop",
        className
      )}
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
            {...backdropRest}
            className={backdropClassName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
          />
        )
      }}
      {...props}
    />
  )
}

// ============================================================================
// Dialog Popup
// ============================================================================

type DialogPopupProps = Omit<DialogPrimitive.Popup.Props, "className"> & {
  className?: string
  position?: DialogPosition
}

const popupPositionStyles: Record<DialogPosition, string> = {
  center: cn(
    "fixed top-1/2 left-1/2 z-50",
    "w-[min(480px,calc(100vw-var(--space-32)))]"
  ),
  right: cn(
    "fixed top-[8px] right-[8px] z-50",
    "h-[calc(100dvh-16px)]",
    "w-full max-w-[400px]"
  ),
  sheet: cn(
    "fixed left-[8px] right-[8px] bottom-[8px] z-50",
    "max-h-[calc(100dvh-16px)]"
  ),
}

function DialogPopup({ className, children, position = "center", ...props }: DialogPopupProps) {
  const transition = getPopupTransition(position)

  const getPopupTransform = (open: boolean, nestedOpen: boolean) => {
    const nestedScale = nestedOpen ? 0.94 : 1

    if (position === "center") {
      const scale = (open ? 1 : 0.95) * nestedScale
      const translateY = open ? 0 : 8
      return getCenterTransform(scale, translateY)
    }

    if (position === "right") {
      const translateX = open ? "0%" : "100%"
      return `${getRightTransform(translateX)} scale(${nestedScale})`
    }

    const translateY = open ? "0%" : "100%"
    const scale = nestedScale
    return `${getSheetTransform(translateY)} scale(${scale})`
  }

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
        "rounded-[var(--radius-24)]",
        "before:rounded-[var(--radius-24)]",
        // Layout
        "flex flex-col overflow-hidden",
        // Focus
        "outline-none",
        // Nested dialog effect - scale down and push back when child dialog opens
        "transition-[filter] duration-200 ease-out",
        className
      )}
      render={(popupProps, state) => {
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
        const filter = state.nestedDialogOpen ? "brightness(0.6)" : "brightness(1)"

        return (
          <motion.div
            {...popupRest}
            className={popupClassName}
            initial={{
              opacity: 0,
              transform: getPopupTransform(false, state.nestedDialogOpen),
              filter,
            }}
            animate={{
              opacity: 1,
              transform: getPopupTransform(true, state.nestedDialogOpen),
              filter,
            }}
            exit={{
              opacity: 0,
              transform: getPopupTransform(false, state.nestedDialogOpen),
              filter,
            }}
            transition={transition}
          />
        )
      }}
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
