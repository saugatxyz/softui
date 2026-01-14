"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { motion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

// ============================================================================
// Animation Config
// ============================================================================

const thumbTransition: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
}

// ============================================================================
// Slider Root
// ============================================================================

type SliderRootProps = Omit<SliderPrimitive.Root.Props, "className"> & {
  className?: string
}

function SliderRoot({ className, ...props }: SliderRootProps) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("flex w-full flex-col gap-[var(--space-12)]", className)}
      {...props}
    />
  )
}

// ============================================================================
// Slider Control
// ============================================================================

type SliderControlProps = Omit<SliderPrimitive.Control.Props, "className"> & {
  className?: string
}

function SliderControl({ className, ...props }: SliderControlProps) {
  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      className={cn(
        "flex h-[var(--space-20)] w-full touch-none items-center cursor-pointer data-[disabled]:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Slider Track
// ============================================================================

type SliderTrackProps = Omit<SliderPrimitive.Track.Props, "className"> & {
  className?: string
}

function SliderTrack({ className, ...props }: SliderTrackProps) {
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn(
        "relative h-[var(--space-4)] w-full rounded-[var(--radius-max)] transition-colors duration-200 ease-out",
        "bg-actions-secondary-default data-[disabled]:bg-actions-secondary-disabled data-[disabled]:backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Slider Indicator
// ============================================================================

type SliderIndicatorProps = Omit<SliderPrimitive.Indicator.Props, "className"> & {
  className?: string
}

function SliderIndicator({ className, ...props }: SliderIndicatorProps) {
  return (
    <SliderPrimitive.Indicator
      data-slot="slider-indicator"
      className={cn(
        "absolute h-full rounded-[var(--radius-max)]",
        "bg-actions-primary-default data-[disabled]:bg-actions-primary-disabled",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Slider Thumb
// ============================================================================

type SliderThumbProps = Omit<SliderPrimitive.Thumb.Props, "className" | "render"> & {
  className?: string
}

function SliderThumb({ className, ...props }: SliderThumbProps) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-[var(--space-16)] rounded-full",
        "bg-content-inverse-strong",
        "shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1)]",
        "focus-visible:shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1),0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      render={
        <motion.span
          whileHover={{ scale: 1.25 }}
          whileFocus={{ scale: 1.25 }}
          transition={thumbTransition}
        />
      }
      {...props}
    />
  )
}

// ============================================================================
// Exports
// ============================================================================

const Slider = Object.assign(SliderRoot, {
  Control: SliderControl,
  Track: SliderTrack,
  Indicator: SliderIndicator,
  Thumb: SliderThumb,
})

export { Slider, SliderRoot, SliderControl, SliderTrack, SliderIndicator, SliderThumb }
export type {
  SliderRootProps,
  SliderControlProps,
  SliderTrackProps,
  SliderIndicatorProps,
  SliderThumbProps,
}
