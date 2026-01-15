"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import {
  RiCloseLine,
  RiCheckboxCircleFill,
  RiInformationFill,
  RiErrorWarningFill,
  RiCloseCircleFill,
} from "@remixicon/react"
import { motion, LayoutGroup } from "motion/react"

import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

type ToastTone = "default" | "info" | "success" | "warning" | "danger"
type ToastVariant = "card" | "compact"

// ============================================================================
// Tone Configuration
// ============================================================================

const toneIconColors: Record<ToastTone, string> = {
  default: "text-content-strong",
  info: "text-content-feedback-info-strong",
  success: "text-content-feedback-success-strong",
  warning: "text-content-feedback-warning-strong",
  danger: "text-content-feedback-danger-strong",
}

const toneIcons: Record<ToastTone, React.ComponentType<{ className?: string }>> = {
  default: RiInformationFill,
  info: RiInformationFill,
  success: RiCheckboxCircleFill,
  warning: RiErrorWarningFill,
  danger: RiCloseCircleFill,
}

// ============================================================================
// Toast Provider
// ============================================================================

type ToastProviderProps = ToastPrimitive.Provider.Props

function ToastProvider({ timeout = 5000, limit = 5, ...props }: ToastProviderProps) {
  return <ToastPrimitive.Provider timeout={timeout} limit={limit} {...props} />
}

// ============================================================================
// Toast Portal
// ============================================================================

type ToastPortalProps = ToastPrimitive.Portal.Props

function ToastPortal(props: ToastPortalProps) {
  return <ToastPrimitive.Portal {...props} />
}

// ============================================================================
// Toast Viewport
// ============================================================================

type ToastViewportProps = ToastPrimitive.Viewport.Props & {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
}

const positionStyles: Record<NonNullable<ToastViewportProps["position"]>, string> = {
  "top-right": "top-[var(--space-16)] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[var(--space-16)]",
  "top-left": "top-[var(--space-16)] left-1/2 -translate-x-1/2 md:left-[var(--space-16)] md:translate-x-0",
  "bottom-right": "bottom-[var(--space-16)] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[var(--space-16)]",
  "bottom-left": "bottom-[var(--space-16)] left-1/2 -translate-x-1/2 md:left-[var(--space-16)] md:translate-x-0",
  "top-center": "top-[var(--space-16)] left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-[var(--space-16)] left-1/2 -translate-x-1/2",
}

function ToastViewport({ className, position = "bottom-right", children, ...props }: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      aria-label="Notifications"
      data-slot="toast-viewport"
      data-position={position}
      className={cn(
        "fixed z-50 outline-none",
        "w-[min(400px,calc(100vw-var(--space-32)))]",
        "flex flex-col-reverse items-center md:items-end gap-[var(--space-12)]",
        positionStyles[position],
        className
      )}
      {...props}
    >
      <LayoutGroup>
        {children}
      </LayoutGroup>
    </ToastPrimitive.Viewport>
  )
}

// ============================================================================
// Toast Root
// ============================================================================

type ToastRootProps = ToastPrimitive.Root.Props & {
  variant?: ToastVariant
}

// Animation configs
const entryTransition = {
  opacity: { type: "spring" as const, bounce: 0.1, duration: 0.2 },
  scale: { type: "spring" as const, bounce: 0.1, duration: 0.2 },
  y: { type: "spring" as const, bounce: 0.1, duration: 0.2 },
  layout: { type: "spring" as const, bounce: 0.25, duration: 0.35 },
}

const exitTransition = {
  opacity: { type: "spring" as const, bounce: 0, duration: 0.4 },
  filter: { type: "spring" as const, bounce: 0, duration: 0.2 },
}

function ToastRoot({ className, variant = "card", ...props }: ToastRootProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast-root"
      data-variant={variant}
      className={cn(
        "group/toast",
        "relative box-border",
        variant === "card" ? "w-full" : "w-fit",
        "select-none cursor-default",
        // Appearance
        "bg-surface-overlay",
        "before:absolute before:inset-0 before:-z-10 before:bg-surface-canvas",
        "shadow-[var(--shadow-modal)]",
        // Layout
        "flex overflow-hidden",
        "outline-none",
        // Swipe support
        "translate-x-[var(--toast-swipe-movement-x,0)]",
        "translate-y-[var(--toast-swipe-movement-y,0)]",
        // Exit - position absolute so it doesn't affect layout of siblings (Framer Motion handles animation)
        "data-[ending-style]:absolute",
        // Swipe exit overrides
        "data-[ending-style]:data-[swipe-direction=up]:-translate-y-full",
        "data-[ending-style]:data-[swipe-direction=down]:translate-y-full",
        "data-[ending-style]:data-[swipe-direction=left]:-translate-x-full",
        "data-[ending-style]:data-[swipe-direction=right]:translate-x-full",
        // CSS transition for exit - Base UI listens for transitionend on opacity
        "[transition:opacity_0.4s_cubic-bezier(0.0,0,0.2,1)]",
        // Hidden when beyond limit
        "data-[limited]:hidden",
        // Variant styles
        variant === "card"
          ? "rounded-[var(--radius-16)] before:rounded-[var(--radius-16)] flex-col"
          : "rounded-[var(--radius-max)] before:rounded-[var(--radius-max)] items-center",
        className
      )}
      render={(renderProps) => {
        // Filter out event handlers that conflict with Framer Motion's types
        const {
          onDrag: _onDrag,
          onDragStart: _onDragStart,
          onDragEnd: _onDragEnd,
          onDragOver: _onDragOver,
          onDragEnter: _onDragEnter,
          onDragLeave: _onDragLeave,
          onDrop: _onDrop,
          onAnimationStart: _onAnimationStart,
          ...filteredProps
        } = renderProps

        // Check if toast is exiting via data attribute
        const isExiting = "data-ending-style" in renderProps

        return (
          <motion.div
            {...filteredProps}
            // Disable layout animation when exiting to prevent FLIP miscalculation
            layout={isExiting ? false : "position"}
            style={{ transformOrigin: "center center", zIndex: isExiting ? -1 : undefined }}
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={isExiting
              ? { opacity: 0, filter: "blur(4px)" }
              : { opacity: 1, scale: 1, x: 0, y: 0 }
            }
            transition={isExiting ? exitTransition : entryTransition}
          />
        )
      }}
      {...props}
    />
  )
}

// ============================================================================
// Toast Content
// ============================================================================

type ToastContentProps = ToastPrimitive.Content.Props

function ToastContent({ className, ...props }: ToastContentProps) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "rounded-b-[var(--radius-8)] bg-surface-overlay",
        "shadow-[var(--shadow-modal-content)]",
        "flex items-start gap-[var(--space-12)] p-[var(--space-16)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Compact Content (for compact variant)
// ============================================================================

function ToastCompactContent({ className, ...props }: ToastContentProps) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-compact-content"
      className={cn(
        "bg-surface-overlay",
        "shadow-[var(--shadow-modal-content)]",
        "flex h-[var(--space-36)] flex-1 items-center gap-[var(--space-4)] pl-[var(--space-12)] pr-[var(--space-16)]",
        "group-has-[[data-slot=toast-close]]/toast:pr-[var(--space-8)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Title
// ============================================================================

type ToastTitleProps = ToastPrimitive.Title.Props

function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn(
        "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)]",
        "text-content-strong",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Description
// ============================================================================

type ToastDescriptionProps = ToastPrimitive.Description.Props

function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
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
// Toast Close
// ============================================================================

type ToastCloseProps = ToastPrimitive.Close.Props

function ToastClose({ className, ...props }: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Dismiss notification"
      className={cn(
        "shrink-0 cursor-pointer relative z-10",
        // Ghost icon button style
        "inline-flex size-[var(--space-24)] items-center justify-center rounded-[var(--radius-max)]",
        "bg-transparent text-content-subtle",
        "hover:bg-actions-secondary-hover hover:text-content-strong",
        "active:scale-[0.98]",
        "transition-[background-color,color,transform] duration-150",
        "outline-none",
        "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      {...props}
    >
      <RiCloseLine className="size-[var(--space-16)]" />
    </ToastPrimitive.Close>
  )
}

// ============================================================================
// Toast Action
// ============================================================================

type ToastActionProps = ToastPrimitive.Action.Props

function ToastAction({ className, ...props }: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        // Tertiary button style
        "inline-flex h-[var(--space-32)] items-center justify-center rounded-[var(--radius-max)] px-[var(--space-14)]",
        "text-[length:var(--font-size-s)] font-[var(--font-weight-medium)] leading-[var(--line-height-s)]",
        "bg-actions-tertiary-default text-content-strong",
        "shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
        "hover:bg-actions-tertiary-hover",
        "active:scale-[0.98]",
        "transition-[background-color,color,box-shadow,transform] duration-200",
        "outline-none select-none overflow-hidden",
        "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Compact Action (link style for compact variant)
// ============================================================================

function ToastCompactAction({ className, ...props }: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-compact-action"
      className={cn(
        // Link-neutral button style
        "inline-flex items-center justify-center",
        "text-[length:var(--font-size-s)] font-[var(--font-weight-medium)] leading-[var(--line-height-s)]",
        "bg-transparent text-content-strong",
        "hover:underline underline-offset-2",
        "transition-colors duration-200",
        "outline-none select-none",
        "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Icon (custom - not from Base UI)
// ============================================================================

type ToastIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: ToastTone
}

function ToastIcon({ tone = "default", className, ...props }: ToastIconProps) {
  const Icon = toneIcons[tone]
  return (
    <span
      data-slot="toast-icon"
      className={cn(
        "flex size-[var(--space-20)] shrink-0 items-center justify-center [&_svg]:size-full",
        toneIconColors[tone],
        className
      )}
      aria-hidden="true"
      {...props}
    >
      <Icon />
    </span>
  )
}

// ============================================================================
// Toast Text Wrapper (custom - groups title/description)
// ============================================================================

type ToastTextWrapperProps = React.HTMLAttributes<HTMLDivElement>

function ToastTextWrapper({ className, ...props }: ToastTextWrapperProps) {
  return (
    <div
      data-slot="toast-text-wrapper"
      className={cn("flex min-w-0 flex-1 flex-col gap-[var(--space-4)]", className)}
      {...props}
    />
  )
}

// ============================================================================
// Toast Compact Text Wrapper (for compact variant)
// ============================================================================

function ToastCompactTextWrapper({ className, ...props }: ToastTextWrapperProps) {
  return (
    <div
      data-slot="toast-compact-text-wrapper"
      className={cn(
        "flex min-w-0 flex-1 items-center gap-[var(--space-10)] py-[var(--space-4)] pl-[var(--space-4)] pr-[var(--space-8)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Actions (container for action buttons - card variant)
// ============================================================================

type ToastActionsProps = React.HTMLAttributes<HTMLDivElement>

function ToastActions({ className, ...props }: ToastActionsProps) {
  return (
    <div
      data-slot="toast-actions"
      className={cn("flex items-center gap-[var(--space-8)] pt-[var(--space-12)]", className)}
      {...props}
    />
  )
}

// ============================================================================
// Toast Compact Actions (for compact variant)
// ============================================================================

function ToastCompactActions({ className, ...props }: ToastActionsProps) {
  return (
    <div
      data-slot="toast-compact-actions"
      className={cn(
        "flex items-center gap-[var(--space-8)] pl-[var(--space-8)]",
        "before:mr-0 before:h-[var(--space-12)] before:w-px before:bg-border-subtle before:content-['']",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Re-export useToastManager hook
// ============================================================================

const useToastManager = ToastPrimitive.useToastManager

// ============================================================================
// Toast Namespace Export
// ============================================================================

const Toast = {
  Provider: ToastProvider,
  Portal: ToastPortal,
  Viewport: ToastViewport,
  Root: ToastRoot,
  Content: ToastContent,
  CompactContent: ToastCompactContent,
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
  Action: ToastAction,
  CompactAction: ToastCompactAction,
  Icon: ToastIcon,
  TextWrapper: ToastTextWrapper,
  CompactTextWrapper: ToastCompactTextWrapper,
  Actions: ToastActions,
  CompactActions: ToastCompactActions,
}

export { Toast, useToastManager }
export type {
  ToastTone,
  ToastVariant,
  ToastProviderProps,
  ToastPortalProps,
  ToastViewportProps,
  ToastRootProps,
  ToastContentProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastCloseProps,
  ToastActionProps,
  ToastIconProps,
  ToastTextWrapperProps,
  ToastActionsProps,
}
