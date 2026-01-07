"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { KbdGroup } from "./kbd"

const springTransition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.15,
}

// ============================================================================
// Tooltip Root
// ============================================================================

type TooltipRootProps = TooltipPrimitive.Root.Props

function TooltipRoot(props: TooltipRootProps) {
  return <TooltipPrimitive.Root {...props} />
}

// ============================================================================
// Tooltip Trigger
// ============================================================================

type TooltipTriggerProps = Omit<TooltipPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// Tooltip Portal
// ============================================================================

type TooltipPortalProps = TooltipPrimitive.Portal.Props

function TooltipPortal(props: TooltipPortalProps) {
  return <TooltipPrimitive.Portal {...props} />
}

// ============================================================================
// Tooltip Positioner
// ============================================================================

type TooltipPositionerProps = Omit<TooltipPrimitive.Positioner.Props, "className"> & {
  className?: string
}

function TooltipPositioner({ className, ...props }: TooltipPositionerProps) {
  return (
    <TooltipPrimitive.Positioner
      data-slot="tooltip-positioner"
      className={cn("z-50", className)}
      {...props}
    />
  )
}

// ============================================================================
// Tooltip Popup (base styled popup)
// ============================================================================

type TooltipPopupProps = Omit<TooltipPrimitive.Popup.Props, "className"> & {
  className?: string
}

function TooltipPopup({ className, children, ...props }: TooltipPopupProps) {
  return (
    <TooltipPrimitive.Popup
      data-slot="tooltip-popup"
      className={cn(
        // Appearance
        "bg-surface-inverse rounded-[var(--radius-12)]",
        // Shadow (surface/overlay effect)
        "shadow-[0_0_0_1px_var(--color-utility-shadow-l1),0_1px_2px_0_var(--color-utility-shadow-l2),0_3px_12px_0_var(--color-utility-shadow-l2),0_4px_16px_0_var(--color-utility-shadow-l3)]",
        "backdrop-blur-[6px]",
        // Focus
        "outline-none",
        // Origin for scale animation
        "origin-[var(--transform-origin)]",
        className
      )}
      render={
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={springTransition}
        />
      }
      {...props}
    >
      {children}
    </TooltipPrimitive.Popup>
  )
}

// ============================================================================
// Tooltip Arrow
// ============================================================================

type TooltipArrowProps = Omit<TooltipPrimitive.Arrow.Props, "className"> & {
  className?: string
}

function TooltipArrow({ className, ...props }: TooltipArrowProps) {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      className={cn(
        "fill-surface-inverse",
        // Drop shadow to match tooltip
        "drop-shadow-[0_1px_2px_var(--color-utility-shadow-l2)]",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Tooltip Content - Simple variant (text + optional shortcut)
// ============================================================================

type TooltipContentSimpleProps = React.HTMLAttributes<HTMLDivElement> & {
  shortcut?: string[]
}

function TooltipContentSimple({
  className,
  shortcut,
  children,
  ...props
}: TooltipContentSimpleProps) {
  const hasShortcut = shortcut && shortcut.length > 0

  return (
    <div
      data-slot="tooltip-content"
      data-variant="simple"
      className={cn(
        "flex items-center gap-[var(--space-8)]",
        // Text only: 12px left/right, 8px top/bottom
        // Text + KBD: 12px left, 8px right, 8px top/bottom
        hasShortcut
          ? "pl-[var(--space-12)] pr-[var(--space-8)] py-[var(--space-8)]"
          : "px-[var(--space-12)] py-[var(--space-8)]",
        className
      )}
      {...props}
    >
      <span
        data-slot="tooltip-text"
        className="text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-inverse-strong"
      >
        {children}
      </span>
      {hasShortcut && <KbdGroup keys={shortcut} variant="inverted" />}
    </div>
  )
}

// ============================================================================
// Tooltip Content - Explainer variant (title + description + optional shortcut)
// ============================================================================

type TooltipContentExplainerProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  shortcut?: string[]
}

function TooltipContentExplainer({
  className,
  title,
  shortcut,
  children,
  ...props
}: TooltipContentExplainerProps) {
  return (
    <div
      data-slot="tooltip-content"
      data-variant="explainer"
      className={cn(
        "flex flex-col gap-[var(--space-10)]",
        "p-[var(--space-16)]",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-[var(--space-2)]">
        <span
          data-slot="tooltip-title"
          className="text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-inverse-strong"
        >
          {title}
        </span>
        <span
          data-slot="tooltip-description"
          className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-inverse-subtle"
        >
          {children}
        </span>
      </div>
      {shortcut && shortcut.length > 0 && (
        <KbdGroup keys={shortcut} variant="inverted" />
      )}
    </div>
  )
}

// ============================================================================
// Tooltip Content - Breakdown variant (for charts/data visualizations)
// ============================================================================

type TooltipBreakdownItem = {
  label: string
  value: string | number
  color?: "warning" | "success" | "info" | "danger" | string
}

type TooltipContentBreakdownProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
  items: TooltipBreakdownItem[]
}

const breakdownColorMap: Record<string, string> = {
  warning: "bg-content-feedback-warning-strong",
  success: "bg-content-feedback-success-strong",
  info: "bg-content-feedback-info-strong",
  danger: "bg-content-feedback-danger-strong",
}

function TooltipContentBreakdown({
  className,
  title,
  description,
  items,
  ...props
}: TooltipContentBreakdownProps) {
  return (
    <div
      data-slot="tooltip-content"
      data-variant="breakdown"
      className={cn(
        "flex flex-col min-w-[220px]",
        "p-[var(--space-16)]",
        className
      )}
      {...props}
    >
      {/* Header */}
      <span
        data-slot="tooltip-title"
        className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-inverse-strong"
      >
        {title}
      </span>
      {description && (
        <span
          data-slot="tooltip-description"
          className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-inverse-subtle mt-[var(--space-2)]"
        >
          {description}
        </span>
      )}

      {/* Separator */}
      <div className="py-[var(--space-10)]">
        <div className="h-px bg-border-inverse" />
      </div>

      {/* Items list */}
      <div className="flex flex-col">
        {items.map((item, index) => {
          const dotColorClass =
            item.color && breakdownColorMap[item.color]
              ? breakdownColorMap[item.color]
              : item.color
                ? undefined
                : "bg-content-inverse-subtle"

          return (
            <div
              key={index}
              className="flex items-center gap-[var(--space-8)] py-[var(--space-6)]"
            >
              <span
                className={cn("size-[6px] rounded-full shrink-0", dotColorClass)}
                style={
                  item.color && !breakdownColorMap[item.color]
                    ? { backgroundColor: item.color }
                    : undefined
                }
              />
              <span className="flex-1 text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-inverse-strong">
                {item.label}
              </span>
              <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-inverse-subtle">
                {item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// Tooltip Provider (for consistent delay across multiple tooltips)
// ============================================================================

type TooltipProviderProps = TooltipPrimitive.Provider.Props

function TooltipProvider(props: TooltipProviderProps) {
  return <TooltipPrimitive.Provider {...props} />
}

// ============================================================================
// Tooltip Namespace Export
// ============================================================================

const Tooltip = {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Positioner: TooltipPositioner,
  Popup: TooltipPopup,
  Arrow: TooltipArrow,
  Simple: TooltipContentSimple,
  Explainer: TooltipContentExplainer,
  Breakdown: TooltipContentBreakdown,
}

export { Tooltip }
export type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipPortalProps,
  TooltipPositionerProps,
  TooltipPopupProps,
  TooltipArrowProps,
  TooltipContentSimpleProps,
  TooltipContentExplainerProps,
  TooltipContentBreakdownProps,
  TooltipBreakdownItem,
}
