"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { RiCloseLine } from "@remixicon/react"
import {
  AnimatePresence,
  motion,
  useDragControls,
  type DragControls,
  type PanInfo,
} from "motion/react"

import { cn } from "@/lib/utils"

type DialogPosition = "center" | "right" | "sheet"

// Drag-to-dismiss thresholds
const DRAG_DISMISS_THRESHOLD = 200 // pixels
const DRAG_VELOCITY_THRESHOLD = 800 // pixels per second

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

const getPopupTransition = (position: DialogPosition, isMobile: boolean) => ({
  type: "spring" as const,
  bounce: 0,
  duration: isMobile ? 0.2 : position === "center" ? 0.15 : 0.3,
})

// Snappy inertia for drag snap-back (dragTransition only accepts InertiaOptions)
const dragSnapTransition = {
  power: 0.1,
  timeConstant: 100,
  bounceDamping: 18,
  bounceStiffness: 400,
}

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
  isMobile: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue>({
  open: false,
  isMobile: false,
  onOpenChange: () => {},
})

function useDialogContext() {
  return React.useContext(DialogContext)
}

// Popup-specific context for swipeable state
type DialogPopupContextValue = {
  swipeable: boolean
  isSheetMode: boolean
  dragControls: DragControls | null
}

const DialogPopupContext = React.createContext<DialogPopupContextValue>({
  swipeable: false,
  isSheetMode: false,
  dragControls: null,
})

function useDialogPopupContext() {
  return React.useContext(DialogPopupContext)
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
  const isMobile = useIsMobile()

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails?: Parameters<NonNullable<typeof onOpenChange>>[1]) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen, eventDetails as Parameters<NonNullable<typeof onOpenChange>>[1])
    },
    [isControlled, onOpenChange]
  )

  const contextValue = React.useMemo(
    () => ({ open: resolvedOpen, isMobile, onOpenChange: handleOpenChange }),
    [resolvedOpen, isMobile, handleOpenChange]
  )

  return (
    <DialogContext.Provider value={contextValue}>
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

function DialogPortal({ children, keepMounted = false, ...props }: DialogPortalProps) {
  const { open } = useDialogContext()

  if (keepMounted) {
    // When keepMounted, always render children
    // Children (Backdrop, Popup) animate based on open state from context
    return (
      <DialogPrimitive.Portal {...props} keepMounted>
        {children}
      </DialogPrimitive.Portal>
    )
  }

  // Ensure AnimatePresence children have stable keys.
  const presenceChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child
    if (child.key != null) return child
    return React.cloneElement(child, { key: `dialog-${index}` })
  })

  // When not keepMounted, use AnimatePresence for mount/unmount animations
  return (
    <DialogPrimitive.Portal {...props} keepMounted={false}>
      <AnimatePresence>
        {open ? presenceChildren : null}
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
  const { open } = useDialogContext()

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
            animate={{ opacity: open ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            style={{ pointerEvents: open ? "auto" : "none" }}
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
  /** Enable drag-to-dismiss for sheet mode */
  swipeable?: boolean
}

// Mobile: all positions become bottom sheet with 8px padding all sides
// Desktop (sm+): each position has its specific behavior
const popupPositionStyles: Record<DialogPosition, string> = {
  center: cn(
    "fixed z-50",
    // Mobile: bottom sheet
    "bottom-[8px] left-[8px] right-[8px]",
    "max-h-[calc(100dvh-16px)]",
    // Desktop: centered
    "sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2",
    "sm:w-[min(480px,calc(100vw-var(--space-32)))] sm:max-h-none"
  ),
  right: cn(
    "fixed z-50",
    // Mobile: bottom sheet
    "bottom-[8px] left-[8px] right-[8px]",
    "max-h-[calc(100dvh-16px)]",
    // Desktop: right panel
    "sm:bottom-auto sm:left-auto sm:top-[8px] sm:right-[8px]",
    "sm:h-[calc(100dvh-16px)] sm:max-h-none",
    "sm:w-full sm:max-w-[400px]"
  ),
  sheet: cn(
    "fixed z-50",
    // Mobile: full width bottom sheet
    "bottom-[8px] left-[8px] right-[8px]",
    "max-h-[calc(100dvh-16px)]",
    // Desktop: centered with max-width, bottom anchored (translateX handled in animation)
    "sm:bottom-[8px] sm:left-1/2 sm:right-auto",
    "sm:w-[min(480px,calc(100vw-var(--space-32)))]"
  ),
}

function DialogPopup({
  className,
  children,
  position = "center",
  swipeable = false,
  ...props
}: DialogPopupProps) {
  const { open, isMobile, onOpenChange } = useDialogContext()
  const dragControls = useDragControls()

  // Determine if we're in sheet mode (mobile or sheet position)
  const isSheetMode = isMobile || position === "sheet"
  const isDraggable = swipeable && isSheetMode

  const transition = getPopupTransition(position, isMobile)
  const shouldCenterSheet = isDraggable && position === "sheet" && !isMobile

  const handleDragEnd = React.useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const shouldDismiss =
        info.offset.y > DRAG_DISMISS_THRESHOLD ||
        info.velocity.y > DRAG_VELOCITY_THRESHOLD

      if (shouldDismiss) {
        onOpenChange(false)
      }
    },
    [onOpenChange]
  )

  const getPopupTransform = (open: boolean, nestedOpen: boolean) => {
    const nestedScale = nestedOpen ? 0.94 : 1

    // On mobile, all positions use sheet animation (slide up from bottom)
    if (isMobile) {
      const translateY = open ? "0%" : "100%"
      return `${getSheetTransform(translateY)} scale(${nestedScale})`
    }

    // Desktop: position-specific animations
    if (position === "center") {
      const scale = (open ? 1 : 0.95) * nestedScale
      const translateY = open ? 0 : 8
      return getCenterTransform(scale, translateY)
    }

    if (position === "right") {
      const translateX = open ? "0%" : "100%"
      return `${getRightTransform(translateX)} scale(${nestedScale})`
    }

    // Sheet position - centered on desktop
    const translateY = open ? "0%" : "100%"
    return `translateX(-50%) ${getSheetTransform(translateY)} scale(${nestedScale})`
  }

  // Context value for children (drag indicator, header drag handle)
  const popupContextValue = React.useMemo(
    () => ({ swipeable, isSheetMode, dragControls: isDraggable ? dragControls : null }),
    [swipeable, isSheetMode, isDraggable, dragControls]
  )

  return (
    <DialogPopupContext.Provider value={popupContextValue}>
      <DialogPrimitive.Popup
        data-slot="dialog-popup"
        data-position={position}
        data-swipeable={swipeable || undefined}
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

          // For draggable sheets, use y for animation to avoid transform conflicts
          const nestedScale = state.nestedDialogOpen ? 0.94 : 1
          const animationProps = isDraggable
            ? {
                initial: { opacity: 0, y: "100%" as const, scale: nestedScale, filter },
                animate: { opacity: open ? 1 : 0, y: open ? 0 : "100%", scale: nestedScale, filter },
                exit: { opacity: 0, y: "100%" as const, scale: nestedScale, filter },
              }
            : {
                initial: {
                  opacity: 0,
                  transform: getPopupTransform(false, state.nestedDialogOpen),
                  filter,
                },
                animate: {
                  opacity: open ? 1 : 0,
                  transform: getPopupTransform(open, state.nestedDialogOpen),
                  filter,
                },
                exit: {
                  opacity: 0,
                  transform: getPopupTransform(false, state.nestedDialogOpen),
                  filter,
                },
              }

          return (
            <motion.div
              {...popupRest}
              className={popupClassName}
              {...animationProps}
              transition={transition}
              style={{
                pointerEvents: open ? "auto" : "none",
                ...(shouldCenterSheet ? { x: "-50%" } : null),
              }}
              // Drag handling - dragListener={false} so only header can initiate drag
              drag={isDraggable ? "y" : false}
              dragControls={isDraggable ? dragControls : undefined}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.1, bottom: 0.5 }}
              dragTransition={dragSnapTransition}
              onDragEnd={isDraggable ? handleDragEnd : undefined}
            />
          )
        }}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPopupContext.Provider>
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
// Dialog Drag Indicator
// ============================================================================

type DialogDragIndicatorProps = React.HTMLAttributes<HTMLDivElement>

function DialogDragIndicator({ className, ...props }: DialogDragIndicatorProps) {
  const { swipeable, isSheetMode, dragControls } = useDialogPopupContext()

  // Only show when swipeable and in sheet mode
  if (!swipeable || !isSheetMode) {
    return null
  }

  const handlePointerDown = (event: React.PointerEvent) => {
    if (dragControls) {
      dragControls.start(event)
    }
  }

  return (
    <div
      data-slot="dialog-drag-indicator"
      className={cn(
        "flex items-center justify-center py-[var(--space-8)]",
        "cursor-grab active:cursor-grabbing",
        className
      )}
      onPointerDown={handlePointerDown}
      style={{ touchAction: "none" }}
      {...props}
    >
      <div className="h-[4px] w-[40px] rounded-full bg-actions-secondary-default" />
    </div>
  )
}

// ============================================================================
// Dialog Header
// ============================================================================

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

function DialogHeader({ className, children, ...props }: DialogHeaderProps) {
  const { swipeable, isSheetMode, dragControls } = useDialogPopupContext()
  const showDragIndicator = swipeable && isSheetMode

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent) => {
      if (dragControls) {
        dragControls.start(event)
      }
    },
    [dragControls]
  )

  return (
    <div
      data-slot="dialog-header"
      className={cn(
        // Layout
        "flex flex-col",
        // Cursor hint for draggable
        showDragIndicator && "cursor-grab active:cursor-grabbing select-none",
        className
      )}
      onPointerDown={showDragIndicator ? handlePointerDown : undefined}
      style={showDragIndicator ? { touchAction: "none" } : undefined}
      {...props}
    >
      {showDragIndicator && (
        <div className="flex items-center justify-center pt-[var(--space-8)]">
          <div className="h-[4px] w-[40px] rounded-full bg-actions-secondary-default" />
        </div>
      )}
      <div
        className={cn(
          // Layout
          "flex items-center gap-[var(--space-20)]",
          // Sizing - 52px height, padding: 12px top/bottom, 24px left, 16px right
          "h-[52px] py-[var(--space-12)] pl-[var(--space-24)] pr-[var(--space-16)]",
          // Border
          "border-b border-border-subtle"
        )}
      >
        {children}
      </div>
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
      aria-label={isIconButton ? "Close dialog" : undefined}
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
        // Mobile: buttons fill width side by side
        "[&>*]:max-sm:flex-1",
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
  DragIndicator: DialogDragIndicator,
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
  DialogDragIndicatorProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogBodyProps,
  DialogFooterProps,
}
