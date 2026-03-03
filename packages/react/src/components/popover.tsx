"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "../lib/utils"

// ============================================================================
// Popover Root
// ============================================================================

type PopoverRootProps = PopoverPrimitive.Root.Props

function PopoverRoot(props: PopoverRootProps) {
  return <PopoverPrimitive.Root {...props} />
}

// ============================================================================
// Popover Trigger
// ============================================================================

type PopoverTriggerProps = Omit<PopoverPrimitive.Trigger.Props, "className"> & {
  className?: string
}

function PopoverTrigger({ className, ...props }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// Popover Portal
// ============================================================================

type PopoverPortalProps = PopoverPrimitive.Portal.Props

function PopoverPortal(props: PopoverPortalProps) {
  return <PopoverPrimitive.Portal {...props} />
}

// ============================================================================
// Popover Positioner
// ============================================================================

type PopoverPositionerProps = Omit<PopoverPrimitive.Positioner.Props, "className"> & {
  className?: string
}

function PopoverPositioner({
  className,
  sideOffset = 8,
  collisionPadding = 8,
  ...props
}: PopoverPositionerProps) {
  return (
    <PopoverPrimitive.Positioner
      data-slot="popover-positioner"
      className={cn("z-50 outline-none", className)}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      {...props}
    />
  )
}

// ============================================================================
// Popover Popup
// ============================================================================

type PopoverPopupProps = Omit<PopoverPrimitive.Popup.Props, "className"> & {
  className?: string
}

function PopoverPopup({ className, ...props }: PopoverPopupProps) {
  return (
    <PopoverPrimitive.Popup
      data-slot="popover-popup"
      className={cn(
        // Base styles
        "rounded-[var(--radius-12)] bg-surface-overlay outline-none",
        // Shadow (same as menu)
        "shadow-[0_4px_16px_0_var(--color-utility-shadow-l3),0_3px_12px_0_var(--color-utility-shadow-l2),0_1px_2px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
        // Animation
        "origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-100",
        "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Popover Arrow
// ============================================================================

type PopoverArrowProps = Omit<PopoverPrimitive.Arrow.Props, "className"> & {
  className?: string
}

function PopoverArrow({ className, ...props }: PopoverArrowProps) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      className={cn("fill-surface-overlay", className)}
      {...props}
    />
  )
}

// ============================================================================
// Popover Title
// ============================================================================

type PopoverTitleProps = Omit<PopoverPrimitive.Title.Props, "className"> & {
  className?: string
}

function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        "text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Popover Description
// ============================================================================

type PopoverDescriptionProps = Omit<PopoverPrimitive.Description.Props, "className"> & {
  className?: string
}

function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn(
        "text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Popover Close
// ============================================================================

type PopoverCloseProps = Omit<PopoverPrimitive.Close.Props, "className"> & {
  className?: string
}

function PopoverClose({ className, ...props }: PopoverCloseProps) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

// ============================================================================
// Popover Backdrop
// ============================================================================

type PopoverBackdropProps = Omit<PopoverPrimitive.Backdrop.Props, "className"> & {
  className?: string
}

function PopoverBackdrop({ className, ...props }: PopoverBackdropProps) {
  return (
    <PopoverPrimitive.Backdrop
      data-slot="popover-backdrop"
      className={cn(
        "fixed inset-0 z-40 bg-utility-backdrop",
        // Animation
        "transition-opacity duration-100",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Popover Namespace Export
// ============================================================================

const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Positioner: PopoverPositioner,
  Popup: PopoverPopup,
  Arrow: PopoverArrow,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
  Backdrop: PopoverBackdrop,
}

export { Popover }
export type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverPortalProps,
  PopoverPositionerProps,
  PopoverPopupProps,
  PopoverArrowProps,
  PopoverTitleProps,
  PopoverDescriptionProps,
  PopoverCloseProps,
  PopoverBackdropProps,
}
