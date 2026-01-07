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

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { IconButton } from "./icon-button"

// ============================================================================
// Toast Types
// ============================================================================

type ToastTone = "default" | "info" | "success" | "warning" | "danger"
type ToastVariant = "card" | "compact"

// ============================================================================
// Toast Icon (status icon based on tone)
// ============================================================================

type ToastIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: ToastTone
}

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

function ToastIcon({ tone = "default", className, ...props }: ToastIconProps) {
  const Icon = toneIcons[tone]
  return (
    <span
      data-slot="toast-icon"
      className={cn(
        "flex size-[20px] shrink-0 items-center justify-center [&_svg]:size-full",
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
// Toast Provider
// ============================================================================

type ToastProviderProps = ToastPrimitive.Provider.Props

function ToastProvider({ timeout = 5000, ...props }: ToastProviderProps) {
  return <ToastPrimitive.Provider timeout={timeout} {...props} />
}

// ============================================================================
// Toast Viewport
// ============================================================================

type ToastViewportProps = Omit<ToastPrimitive.Viewport.Props, "className"> & {
  className?: string
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
}

const positionStyles: Record<NonNullable<ToastViewportProps["position"]>, string> = {
  "top-right": "top-[var(--space-16)] right-[var(--space-16)]",
  "top-left": "top-[var(--space-16)] left-[var(--space-16)]",
  "bottom-right": "bottom-[var(--space-16)] right-[var(--space-16)]",
  "bottom-left": "bottom-[var(--space-16)] left-[var(--space-16)]",
  "top-center": "top-[var(--space-16)] left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-[var(--space-16)] left-1/2 -translate-x-1/2",
}

function ToastViewport({ className, position = "bottom-right", children, ...props }: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      data-position={position}
      className={cn(
        "fixed z-50",
        "flex flex-col items-end gap-[var(--space-8)]",
        "max-w-[min(400px,calc(100vw-var(--space-32)))]",
        "outline-none",
        positionStyles[position],
        className
      )}
      {...props}
    >
      {children}
    </ToastPrimitive.Viewport>
  )
}

// ============================================================================
// Toast Root
// ============================================================================

type ToastRootProps = Omit<ToastPrimitive.Root.Props, "className"> & {
  className?: string
  variant?: ToastVariant
}

function ToastRoot({ className, variant = "card", children, ...props }: ToastRootProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast-root"
      data-variant={variant}
      className={cn(
        // Appearance - layered: surface-overlay base + surface-canvas on top
        "relative bg-surface-overlay",
        "before:absolute before:inset-0 before:-z-10 before:bg-surface-canvas",
        "shadow-[var(--shadow-modal)]",
        "backdrop-blur-[6px]",
        // Layout
        "flex overflow-hidden",
        // Focus
        "outline-none",
        // Swipe animations via CSS variables from Base UI
        "data-[swiping]:translate-x-[var(--toast-swipe-movement-x)] data-[swiping]:translate-y-[var(--toast-swipe-movement-y)]",
        // Entry/exit animations
        "transition-all duration-200 ease-out",
        "data-[starting-style]:opacity-0 data-[starting-style]:translate-y-2 data-[starting-style]:scale-95",
        "data-[ending-style]:opacity-0 data-[ending-style]:translate-y-2 data-[ending-style]:scale-95",
        // Variant-specific styles
        variant === "card"
          ? "w-[min(400px,calc(100vw-var(--space-32)))] rounded-[17px] before:rounded-[17px] flex-col"
          : "w-fit rounded-[var(--radius-max)] before:rounded-[var(--radius-max)] items-center",
        className
      )}
      {...props}
    >
      {children}
    </ToastPrimitive.Root>
  )
}

// ============================================================================
// Toast Content (for card variant with description)
// ============================================================================

type ToastContentProps = Omit<ToastPrimitive.Content.Props, "className"> & {
  className?: string
}

function ToastContent({ className, children, ...props }: ToastContentProps) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        // Inner content styling - card variant
        "rounded-b-[var(--radius-8)] bg-surface-overlay",
        "shadow-[var(--shadow-modal-content)]",
        // Layout - 16px padding, 12px gap
        "flex items-start gap-[var(--space-12)] p-[var(--space-16)]",
        className
      )}
      {...props}
    >
      {children}
    </ToastPrimitive.Content>
  )
}

// ============================================================================
// Toast Compact Content (for compact variant without description)
// ============================================================================

type ToastCompactContentProps = Omit<ToastPrimitive.Content.Props, "className"> & {
  className?: string
}

function ToastCompactContent({ className, children, ...props }: ToastCompactContentProps) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-compact-content"
      className={cn(
        // Inner content styling - compact variant
        "bg-surface-overlay",
        "shadow-[var(--shadow-modal-content)]",
        // Layout - 36px height, 12px left padding, 8px right padding, 4px gap
        "flex h-[36px] flex-1 items-center gap-[var(--space-4)] pl-[var(--space-12)] pr-[var(--space-8)]",
        className
      )}
      {...props}
    >
      {children}
    </ToastPrimitive.Content>
  )
}

// ============================================================================
// Toast Text Wrapper (for grouping title/description)
// ============================================================================

type ToastTextWrapperProps = React.HTMLAttributes<HTMLDivElement>

function ToastTextWrapper({ className, ...props }: ToastTextWrapperProps) {
  return (
    <div
      data-slot="toast-text-wrapper"
      className={cn(
        // 4px gap between title and description
        "flex min-w-0 flex-1 flex-col gap-[var(--space-4)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Compact Text Wrapper (for compact variant)
// ============================================================================

type ToastCompactTextWrapperProps = React.HTMLAttributes<HTMLDivElement>

function ToastCompactTextWrapper({ className, ...props }: ToastCompactTextWrapperProps) {
  return (
    <div
      data-slot="toast-compact-text-wrapper"
      className={cn(
        // 4px left, 8px right padding, 10px gap
        "flex min-w-0 flex-1 items-center gap-[10px] py-[var(--space-4)] pl-[var(--space-4)] pr-[var(--space-8)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Title
// ============================================================================

type ToastTitleProps = Omit<ToastPrimitive.Title.Props, "className"> & {
  className?: string
}

function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn(
        // 14px medium
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

type ToastDescriptionProps = Omit<ToastPrimitive.Description.Props, "className"> & {
  className?: string
}

function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn(
        // 14px regular (same size as title, different weight)
        "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)]",
        "text-content-subtle",
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
      className={cn(
        // 16px gap from text, 8px gap between buttons
        "flex items-center gap-[var(--space-8)] pt-[var(--space-16)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Compact Actions (container for action buttons - compact variant)
// ============================================================================

type ToastCompactActionsProps = React.HTMLAttributes<HTMLDivElement>

function ToastCompactActions({ className, ...props }: ToastCompactActionsProps) {
  return (
    <div
      data-slot="toast-compact-actions"
      className={cn(
        // 8px gap on both sides of separator, 8px gap between buttons
        "flex items-center gap-[var(--space-8)] pl-[var(--space-8)]",
        // 12px tall separator line
        "before:mr-0 before:h-[12px] before:w-px before:bg-border-subtle before:content-['']",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Toast Action (tertiary button for card variant)
// ============================================================================

type ToastActionProps = Omit<ToastPrimitive.Action.Props, "className" | "render"> & {
  className?: string
  children?: React.ReactNode
}

function ToastAction({ className, children, ...props }: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={<Button variant="tertiary" size="xs" className={className} />}
      {...props}
    >
      {children}
    </ToastPrimitive.Action>
  )
}

// ============================================================================
// Toast Compact Action (link-neutral button for compact variant)
// ============================================================================

type ToastCompactActionProps = Omit<ToastPrimitive.Action.Props, "className" | "render"> & {
  className?: string
  children?: React.ReactNode
}

function ToastCompactAction({ className, children, ...props }: ToastCompactActionProps) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-compact-action"
      render={<Button variant="link-neutral" size="xs" className={className} />}
      {...props}
    >
      {children}
    </ToastPrimitive.Action>
  )
}

// ============================================================================
// Toast Close (3xs ghost icon button)
// ============================================================================

type ToastCloseProps = Omit<ToastPrimitive.Close.Props, "className" | "render"> & {
  className?: string
}

function ToastClose({ className, ...props }: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      render={<IconButton variant="ghost" size="3xs" className={cn("shrink-0", className)} />}
      {...props}
    >
      <RiCloseLine />
    </ToastPrimitive.Close>
  )
}

// ============================================================================
// Toast Portal
// ============================================================================

type ToastPortalProps = ToastPrimitive.Portal.Props

function ToastPortal(props: ToastPortalProps) {
  return <ToastPrimitive.Portal {...props} />
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
  TextWrapper: ToastTextWrapper,
  CompactTextWrapper: ToastCompactTextWrapper,
  Title: ToastTitle,
  Description: ToastDescription,
  Actions: ToastActions,
  CompactActions: ToastCompactActions,
  Action: ToastAction,
  CompactAction: ToastCompactAction,
  Close: ToastClose,
  Icon: ToastIcon,
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
  ToastCompactContentProps,
  ToastTextWrapperProps,
  ToastCompactTextWrapperProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionsProps,
  ToastCompactActionsProps,
  ToastActionProps,
  ToastCompactActionProps,
  ToastCloseProps,
  ToastIconProps,
}
