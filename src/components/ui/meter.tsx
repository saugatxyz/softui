"use client"

import * as React from "react"
import { Meter as MeterPrimitive } from "@base-ui/react/meter"

import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

type MeterTone = "default" | "success" | "warning" | "danger"
type MeterSize = "s" | "m"

// ============================================================================
// Tone Mappings
// ============================================================================

const toneIndicatorColors: Record<MeterTone, string> = {
  default: "bg-content-strong",
  success: "bg-content-feedback-success-strong",
  warning: "bg-content-feedback-warning-strong",
  danger: "bg-content-feedback-danger-strong",
}

// ============================================================================
// Size Mappings
// ============================================================================

const sizeClasses: Record<MeterSize, string> = {
  s: "h-[var(--space-4)]",
  m: "h-[var(--space-6)]",
}

// ============================================================================
// Meter Context
// ============================================================================

const MeterContext = React.createContext<{
  tone: MeterTone
  size: MeterSize
}>({
  tone: "default",
  size: "s",
})

// ============================================================================
// Meter Root
// ============================================================================

type MeterRootProps = MeterPrimitive.Root.Props & {
  tone?: MeterTone
  size?: MeterSize
}

function MeterRoot({
  tone = "default",
  size = "s",
  className,
  children,
  ...props
}: MeterRootProps) {
  return (
    <MeterContext.Provider value={{ tone, size }}>
      <MeterPrimitive.Root
        data-slot="meter"
        data-tone={tone}
        data-size={size}
        className={cn("flex w-full flex-col gap-[var(--space-8)]", className)}
        {...props}
      >
        {children}
      </MeterPrimitive.Root>
    </MeterContext.Provider>
  )
}

// ============================================================================
// Meter Label
// ============================================================================

type MeterLabelProps = MeterPrimitive.Label.Props

function MeterLabel({ className, ...props }: MeterLabelProps) {
  return (
    <MeterPrimitive.Label
      data-slot="meter-label"
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
// Meter Track
// ============================================================================

type MeterTrackProps = MeterPrimitive.Track.Props

function MeterTrack({ className, children, ...props }: MeterTrackProps) {
  const { size } = React.useContext(MeterContext)

  return (
    <MeterPrimitive.Track
      data-slot="meter-track"
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--radius-max)]",
        "bg-surface-interactive-default",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </MeterPrimitive.Track>
  )
}

// ============================================================================
// Meter Indicator
// ============================================================================

type MeterIndicatorProps = MeterPrimitive.Indicator.Props

function MeterIndicator({ className, ...props }: MeterIndicatorProps) {
  const { tone } = React.useContext(MeterContext)

  return (
    <MeterPrimitive.Indicator
      data-slot="meter-indicator"
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
// Meter Value
// ============================================================================

type MeterValueProps = MeterPrimitive.Value.Props

function MeterValue({ className, ...props }: MeterValueProps) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
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

const Meter = {
  Root: MeterRoot,
  Label: MeterLabel,
  Track: MeterTrack,
  Indicator: MeterIndicator,
  Value: MeterValue,
}

export { Meter }
export type {
  MeterTone,
  MeterSize,
  MeterRootProps,
  MeterLabelProps,
  MeterTrackProps,
  MeterIndicatorProps,
  MeterValueProps,
}
