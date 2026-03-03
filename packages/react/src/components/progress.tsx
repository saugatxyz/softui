"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "../lib/utils"

// ============================================================================
// Types
// ============================================================================

type ProgressTone = "default" | "success" | "warning" | "danger"
type ProgressSize = "s" | "m"

// ============================================================================
// Tone Mappings
// ============================================================================

const toneIndicatorColors: Record<ProgressTone, string> = {
  default: "bg-content-strong",
  success: "bg-content-feedback-success-strong",
  warning: "bg-content-feedback-warning-strong",
  danger: "bg-content-feedback-danger-strong",
}

// ============================================================================
// Size Mappings
// ============================================================================

const sizeClasses: Record<ProgressSize, string> = {
  s: "h-[var(--space-4)]",
  m: "h-[var(--space-6)]",
}

// ============================================================================
// Progress Context
// ============================================================================

const ProgressContext = React.createContext<{
  tone: ProgressTone
  size: ProgressSize
}>({
  tone: "default",
  size: "s",
})

// ============================================================================
// Progress Root
// ============================================================================

type ProgressRootProps = ProgressPrimitive.Root.Props & {
  tone?: ProgressTone
  size?: ProgressSize
}

function ProgressRoot({
  tone = "default",
  size = "s",
  className,
  children,
  ...props
}: ProgressRootProps) {
  return (
    <ProgressContext.Provider value={{ tone, size }}>
      <ProgressPrimitive.Root
        data-slot="progress"
        data-tone={tone}
        data-size={size}
        className={cn("flex w-full flex-col gap-[var(--space-8)]", className)}
        {...props}
      >
        {children}
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  )
}

// ============================================================================
// Progress Label
// ============================================================================

type ProgressLabelProps = ProgressPrimitive.Label.Props

function ProgressLabel({ className, ...props }: ProgressLabelProps) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn(
        "text-[length:var(--font-size-s)] font-[var(--font-weight-medium)] leading-[var(--line-height-s)]",
        "text-content-strong",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Progress Track
// ============================================================================

type ProgressTrackProps = ProgressPrimitive.Track.Props

function ProgressTrack({ className, children, ...props }: ProgressTrackProps) {
  const { size } = React.useContext(ProgressContext)

  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--radius-max)]",
        "bg-surface-interactive-default",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </ProgressPrimitive.Track>
  )
}

// ============================================================================
// Progress Indicator
// ============================================================================

type ProgressIndicatorProps = ProgressPrimitive.Indicator.Props

function ProgressIndicator({ className, ...props }: ProgressIndicatorProps) {
  const { tone } = React.useContext(ProgressContext)

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full rounded-[var(--radius-max)] transition-[width] duration-300 ease-out",
        toneIndicatorColors[tone],
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Progress Value
// ============================================================================

type ProgressValueProps = ProgressPrimitive.Value.Props

function ProgressValue({ className, ...props }: ProgressValueProps) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn(
        "text-[length:var(--font-size-s)] font-[var(--font-weight-medium)] leading-[var(--line-height-s)]",
        "text-content-subtle",
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Namespace Export
// ============================================================================

const Progress = {
  Root: ProgressRoot,
  Label: ProgressLabel,
  Track: ProgressTrack,
  Indicator: ProgressIndicator,
  Value: ProgressValue,
}

export { Progress }
export type {
  ProgressTone,
  ProgressSize,
  ProgressRootProps,
  ProgressLabelProps,
  ProgressTrackProps,
  ProgressIndicatorProps,
  ProgressValueProps,
}
