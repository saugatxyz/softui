"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { mergeProps } from "@base-ui/react/merge-props"
import { animate, motion, type Transition } from "motion/react"
import NumberFlow from "@number-flow/react"

import { cn, usePrefersReducedMotion } from "@/lib/utils"

// ============================================================================
// Animation Config
// ============================================================================

const thumbTransition: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
}

const instantTransition: Transition = {
  duration: 0,
}

const adjustmentThumbDragTransition: Transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.12,
}

const adjustmentEdgeSnapTransition: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.18,
}

const adjustmentThumbSizeTransition: Transition = {
  type: "spring",
  bounce: 0.25,
  duration: 0.2,
}

const adjustmentValueTransition: Transition = {
  type: "spring",
  bounce: 0.15,
  duration: 0.18,
}

const adjustmentThumbFadeTransition: Transition = {
  duration: 0.12,
  ease: [0.23, 1, 0.32, 1],
}
const adjustmentThumbFadeOutTransition: Transition = {
  duration: 0.12,
  ease: [0.23, 1, 0.32, 1],
  delay: 0.04,
}

// Segmented variant animation configs
const segmentedThumbTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.2,
}

const adjustmentEdgeThreshold = 12
const adjustmentThumbHideThreshold = 93
const adjustmentThumbHeights = {
  s: 20,
  m: 24,
  l: 24,
}
const adjustmentValueMaxShift = 4
const numberFlowTiming = {
  transform: { duration: 200, easing: "ease-out" },
  spin: { duration: 200, easing: "ease-out" },
  opacity: { duration: 120, easing: "ease-out" },
}
const clampPercentage = (value: number) => Math.min(100, Math.max(0, value))
// Height values for thumb animation (in pixels)
const thumbHeightValues = {
  s: { normal: 20, full: 32 },
  m: { normal: 24, full: 36 },
  l: { normal: 24, full: 40 },
}

// ============================================================================
// Context
// ============================================================================

type SliderVariant = "default" | "adjustment" | "segmented"
type SliderSize = "s" | "m" | "l"
type SliderChangeReason = "input-change" | "track-press" | "drag" | "keyboard" | "none"

type SliderContextValue = {
  variant: SliderVariant
  size: SliderSize
  percentage: number
  animatedPercentage: number
  disabled: boolean
  dragging: boolean
  changeReason: SliderChangeReason
}

const SliderContext = React.createContext<SliderContextValue>({
  variant: "default",
  size: "m",
  percentage: 0,
  animatedPercentage: 0,
  disabled: false,
  dragging: false,
  changeReason: "none",
})

function useSliderContext() {
  return React.useContext(SliderContext)
}

// For backwards compatibility
function useSliderVariant() {
  return useSliderContext().variant
}

// ============================================================================
// Size Config
// ============================================================================

const sizeConfig = {
  s: {
    control: "h-[var(--space-32)]",
    track: "h-[var(--space-32)] rounded-[var(--radius-8)]",
    thumb: "h-[var(--space-20)]",
    padding: "px-[var(--space-10)]",
  },
  m: {
    control: "h-[var(--space-36)]",
    track: "h-[var(--space-36)] rounded-[var(--radius-10)]",
    thumb: "h-[var(--space-24)]",
    padding: "px-[var(--space-12)]",
  },
  l: {
    control: "h-[var(--space-40)]",
    track: "h-[var(--space-40)] rounded-[var(--radius-12)]",
    thumb: "h-[var(--space-24)]",
    padding: "px-[var(--space-12)]",
  },
}

// ============================================================================
// Slider Root
// ============================================================================

type SliderRootProps = Omit<SliderPrimitive.Root.Props, "className"> & {
  className?: string
  variant?: SliderVariant
  size?: SliderSize
}

function SliderRoot({
  className,
  variant = "default",
  size = "m",
  render,
  onValueChange,
  ...props
}: SliderRootProps) {
  const lastChangeReasonRef = React.useRef<SliderChangeReason>("none")
  const handleValueChange = React.useCallback(
    (
      value: number | readonly number[],
      details: SliderPrimitive.Root.ChangeEventDetails
    ) => {
      lastChangeReasonRef.current = details.reason
      onValueChange?.(value as never, details)
    },
    [onValueChange]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-variant={variant}
      data-size={size}
      className={cn("flex w-full flex-col gap-[var(--space-12)]", className)}
      render={(rootProps, state) => (
        <SliderRootInner
          rootProps={rootProps}
          state={state}
          variant={variant}
          size={size}
          render={render}
          changeReasonRef={lastChangeReasonRef}
        />
      )}
      onValueChange={handleValueChange}
      {...props}
    />
  )
}

type SliderRootInnerProps = {
  rootProps: React.ComponentPropsWithRef<"div">
  state: SliderPrimitive.Root.State
  variant: SliderVariant
  size: SliderSize
  render?: SliderRootProps["render"]
  changeReasonRef: React.MutableRefObject<SliderChangeReason>
}

function SliderRootInner({
  rootProps,
  state,
  variant,
  size,
  render,
  changeReasonRef,
}: SliderRootInnerProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const currentValue = state.values[0] ?? state.min
  const range = state.max - state.min
  const rawPercentage = range > 0 ? ((currentValue - state.min) / range) * 100 : 0
  const percentage = Number.isFinite(rawPercentage)
    ? Math.min(100, Math.max(0, rawPercentage))
    : 0
  const changeReason = changeReasonRef.current
  const [animatedPercentage, setAnimatedPercentage] = React.useState(percentage)
  const animatedPercentageRef = React.useRef(percentage)

  React.useEffect(() => {
    if (prefersReducedMotion) {
      animatedPercentageRef.current = percentage
      setAnimatedPercentage(percentage)
      return
    }

    const isDragMove = state.dragging && changeReason === "drag"
    const transition: Transition = isDragMove
      ? { duration: 0.12, ease: [0.22, 1, 0.36, 1] }
      : changeReason === "track-press" || changeReason === "keyboard"
        ? { type: "spring", bounce: 0.1, duration: 0.2 }
        : { duration: 0 }
    const controls = animate(animatedPercentageRef.current, percentage, {
      ...transition,
      onUpdate: (latest) => {
        animatedPercentageRef.current = latest
        setAnimatedPercentage(latest)
      },
    })

    return () => controls.stop()
  }, [percentage, prefersReducedMotion, changeReason, state.dragging])

  const element = render
    ? typeof render === "function"
      ? render(rootProps, state)
      : React.cloneElement(
          render as React.ReactElement<React.ComponentPropsWithRef<"div">>,
          {
            ...mergeProps(
              rootProps,
              (render as React.ReactElement<React.ComponentPropsWithRef<"div">>).props
            ),
            ref: rootProps.ref,
          }
        )
    : <div {...rootProps} />

  return (
    <SliderContext.Provider
      value={{
        variant,
        size,
        percentage,
        animatedPercentage,
        disabled: state.disabled,
        dragging: state.dragging,
        changeReason,
      }}
    >
      {element}
    </SliderContext.Provider>
  )
}

// ============================================================================
// Slider Control
// ============================================================================

type SliderControlProps = Omit<SliderPrimitive.Control.Props, "className"> & {
  className?: string
}

function SliderControl({ className, ...props }: SliderControlProps) {
  const { variant, size } = useSliderContext()

  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      data-variant={variant}
      data-size={size}
      className={cn(
        "flex w-full touch-none items-center cursor-pointer data-[disabled]:cursor-not-allowed",
        variant === "default" && "h-[var(--space-20)]",
        (variant === "adjustment" || variant === "segmented") && sizeConfig[size].control,
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
  const { variant, size } = useSliderContext()

  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      data-variant={variant}
      data-size={size}
      className={cn(
        "relative w-full transition-colors duration-200 ease-out",
        variant === "default" && [
          "h-[var(--space-4)] rounded-[var(--radius-max)]",
          "bg-actions-secondary-default data-[disabled]:bg-actions-secondary-disabled data-[disabled]:backdrop-blur-sm",
        ],
        // Adjustment variant: transparent track, wrapper handles visual styling
        variant === "adjustment" && [
          "h-full w-full",
          "bg-transparent",
        ],
        variant === "segmented" && [
          sizeConfig[size].track,
          "bg-transparent",
          "cursor-grab active:cursor-grabbing",
          // Add horizontal padding so thumb stays within visual bounds at 0%/100%
          "px-[4px]",
        ],
        className
      )}
      {...props}
    />
  )
}

// ============================================================================
// Slider Adjustment Track (visual wrapper for adjustment variant)
// ============================================================================

type SliderAdjustmentTrackProps = {
  className?: string
  children?: React.ReactNode
}

function SliderAdjustmentTrack({ className, children }: SliderAdjustmentTrackProps) {
  const { variant, size, disabled } = useSliderContext()

  // Only render for adjustment variant
  if (variant !== "adjustment") {
    return <>{children}</>
  }

  return (
    <div
      data-slot="slider-adjustment-track"
      data-size={size}
      data-disabled={disabled || undefined}
      className={cn(
        "group/adjustment relative w-full",
        sizeConfig[size].track,
        // Visual styling: background, rounded corners
        "bg-actions-secondary-default",
        disabled && "bg-actions-secondary-disabled backdrop-blur-sm",
        // Clip thumb if it ever exceeds bounds during drag
        "overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Slider Indicator
// ============================================================================

type SliderIndicatorProps = Omit<SliderPrimitive.Indicator.Props, "className"> & {
  className?: string
}

// Size-based radius for adjustment indicator (matches container radius)
const adjustmentRadiusConfig = {
  s: { full: "rounded-[var(--radius-8)]", left: "rounded-l-[var(--radius-8)]" },
  m: { full: "rounded-[var(--radius-10)]", left: "rounded-l-[var(--radius-10)]" },
  l: { full: "rounded-[var(--radius-12)]", left: "rounded-l-[var(--radius-12)]" },
}

function SliderIndicator({ className, render, style, ...props }: SliderIndicatorProps) {
  const { variant, size, percentage, animatedPercentage, disabled } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)

  // For segmented variant, we don't use the Base UI indicator
  // Use SliderSelectedSegment and SliderUnselectedSegment instead
  if (variant === "segmented") {
    return null
  }

  // At 100%, indicator should have rounded corners on both sides
  const isAtMax = visualPercentage >= 100

  if (variant === "adjustment") {
    const indicatorScale = Math.min(1, Math.max(0, visualPercentage / 100))

    return (
      <div
        data-slot="slider-indicator"
        data-variant={variant}
        data-size={size}
        data-disabled={disabled || undefined}
        className={cn(
          "absolute left-0 top-0 h-full w-full origin-left",
          // Indicator fills edge to edge, hardcode radius to match container
          isAtMax
            ? adjustmentRadiusConfig[size].full
            : [adjustmentRadiusConfig[size].left, "rounded-r-[var(--radius-4)]"],
          "bg-actions-secondary-default group-hover/adjustment:bg-actions-secondary-hover",
          "data-[disabled]:bg-actions-secondary-disabled data-[disabled]:group-hover/adjustment:bg-actions-secondary-disabled",
          className
        )}
        style={{ transform: `scaleX(${indicatorScale})`, ...style }}
        {...props}
      />
    )
  }

  const indicatorStyle = prefersReducedMotion
    ? undefined
    : {
        insetInlineStart: 0,
        width: `${visualPercentage}%`,
      }

  return (
    <SliderPrimitive.Indicator
      data-slot="slider-indicator"
      data-variant={variant}
      data-size={size}
      render={render}
      className={cn(
        "absolute h-full",
        "rounded-[var(--radius-max)]",
        "bg-actions-primary-default data-[disabled]:bg-actions-primary-disabled",
        className
      )}
      style={{ ...indicatorStyle, ...style }}
      {...props}
    />
  )
}

// ============================================================================
// Slider Segmented Components (for segmented variant only)
// ============================================================================

const segmentedRadiusConfig = {
  s: "rounded-[var(--radius-8)]",
  m: "rounded-[var(--radius-10)]",
  l: "rounded-[var(--radius-12)]",
}

// Gap between thumb and segments (4px on each side)
const SEGMENTED_GAP = 4
// Thumb width
const SEGMENTED_THUMB_WIDTH = 3

type SliderSegmentedTrackProps = {
  className?: string
  children?: React.ReactNode
}

function SliderSegmentedTrack({ className, children }: SliderSegmentedTrackProps) {
  const { variant, size } = useSliderContext()

  if (variant !== "segmented") {
    return null
  }

  return (
    <div
      data-slot="slider-segmented-track"
      data-size={size}
      className={cn(
        "absolute inset-0 flex items-center",
        // pointer-events-none so Base UI slider remains draggable
        "pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  )
}

type SliderSelectedSegmentProps = {
  className?: string
}

function SliderSelectedSegment({ className }: SliderSelectedSegmentProps) {
  const { variant, size, percentage, animatedPercentage, disabled } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)

  if (variant !== "segmented") {
    return null
  }

  // At 0%, don't render (use small threshold for floating point)
  if (visualPercentage <= 0) {
    return null
  }

  // At 100%, flex-1 fills remaining space after thumb + gap
  // Otherwise, percentage-based width (gap handled by SegmentedGap components)
  const isAtMax = visualPercentage >= 100

  // Calculate width for animation
  const width = isAtMax
    ? "100%"
    : `calc(${visualPercentage}% - ${SEGMENTED_GAP}px - ${SEGMENTED_THUMB_WIDTH / 2}px)`

  return (
    <motion.div
      data-slot="slider-selected-segment"
      data-size={size}
      initial={false}
      animate={{
        width,
        marginRight: isAtMax ? SEGMENTED_GAP : 0,
      }}
      transition={instantTransition}
      className={cn(
        "h-full",
        isAtMax ? "flex-1" : "shrink-0",
        "bg-actions-secondary-default",
        disabled && "bg-actions-secondary-disabled backdrop-blur-sm",
        // Rounded on left (size-based), 4px radius on right (next to thumb)
        segmentedRadiusConfig[size],
        "rounded-r-[var(--radius-4)]",
        className
      )}
    />
  )
}

type SliderUnselectedSegmentProps = {
  className?: string
}

function SliderUnselectedSegment({ className }: SliderUnselectedSegmentProps) {
  const { variant, size, percentage, animatedPercentage, disabled } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)

  if (variant !== "segmented") {
    return null
  }

  // At 100%, don't render (use threshold for floating point)
  if (visualPercentage >= 100) {
    return null
  }

  // At 0%, just need gap margin since SegmentedThumb handles thumb width
  // In between, gap is handled by SegmentedGap components
  const isAtMin = visualPercentage <= 0
  const marginLeft = isAtMin ? SEGMENTED_GAP : 0

  return (
    <motion.div
      data-slot="slider-unselected-segment"
      data-size={size}
      initial={false}
      animate={{ marginLeft }}
      transition={instantTransition}
      className={cn(
        "h-full flex-1",
        "bg-actions-secondary-default",
        disabled && "bg-actions-secondary-disabled backdrop-blur-sm",
        // 4px radius on left (next to thumb), size-based on right
        segmentedRadiusConfig[size],
        "rounded-l-[var(--radius-4)]",
        className
      )}
    />
  )
}

type SliderSegmentedGapProps = {
  className?: string
}

function SliderSegmentedGap({ className }: SliderSegmentedGapProps) {
  const { variant, percentage, animatedPercentage } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)

  if (variant !== "segmented") {
    return null
  }

  // Collapse gap at edges (0% or 100%)
  const isAtEdge = visualPercentage <= 0 || visualPercentage >= 100

  return (
    <motion.div
      data-slot="slider-segmented-gap"
      initial={false}
      animate={{
        width: isAtEdge ? 0 : SEGMENTED_GAP,
        opacity: isAtEdge ? 0 : 1,
      }}
      transition={instantTransition}
      className={cn("shrink-0", className)}
    />
  )
}

type SliderSegmentedThumbProps = {
  className?: string
}

function SliderSegmentedThumb({ className }: SliderSegmentedThumbProps) {
  const { variant, percentage, animatedPercentage } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)

  if (variant !== "segmented") {
    return null
  }

  // At edges, collapse the spacer since the visible thumb is at the edge
  const isAtEdge = visualPercentage <= 0 || visualPercentage >= 100

  // This is an invisible spacer for layout purposes only
  // The actual visible thumb is rendered by Slider.Thumb (Base UI)
  return (
    <motion.div
      data-slot="slider-segmented-thumb-spacer"
      initial={false}
      animate={{
        width: isAtEdge ? 0 : SEGMENTED_THUMB_WIDTH,
      }}
      transition={instantTransition}
      className={cn("shrink-0", className)}
    />
  )
}

// ============================================================================
// Slider Thumb
// ============================================================================

type SliderThumbProps = Omit<SliderPrimitive.Thumb.Props, "className" | "render"> & {
  className?: string
}

function SliderThumb({ className, style, ...props }: SliderThumbProps) {
  const { variant, size, percentage, animatedPercentage, dragging, changeReason } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)

  if (variant === "adjustment") {
    // Thumb is 3px wide, halfThumb = 1.5px
    // Gap between thumb edge and track edge = 9.5px
    // Total offset from track edge to thumb center = 9.5 + 1.5 = 11px
    const edgeOffset = 11
    // Bring the thumb closer to the indicator by 2px without changing edge gaps
    const midOffset = edgeOffset - 2

    // Edge threshold: at ~97%, the +offset would push thumb outside container
    // Start docking early to prevent overflow
    // percentage from edge to start docking (88%/12%)
    const edgeThreshold = adjustmentEdgeThreshold

    // Base UI positions thumb center at percentage% of track width.
    // We apply CSS transform to achieve desired positioning:
    //
    // Near 0% (< threshold): dock at left edge
    // Near 100% (> 100-threshold): dock at right edge
    // Thumb stays outside indicator (right of indicator edge) except at edges

    let thumbX: number
    if (visualPercentage <= edgeThreshold) {
      thumbX = edgeOffset // dock at left edge
    } else if (visualPercentage >= 100 - edgeThreshold) {
      thumbX = -edgeOffset // dock at right edge
    } else {
      thumbX = midOffset // outside indicator
    }

    const isAtEdge = visualPercentage <= edgeThreshold || visualPercentage >= 100 - edgeThreshold
    const isAtMinEdge = visualPercentage <= 0
    const shouldHideThumb = changeReason !== "keyboard"
      && visualPercentage >= adjustmentThumbHideThreshold
      && visualPercentage < 100
    const thumbHeight = adjustmentThumbHeights[size]
    const edgeHeight = thumbHeight - 3
    const shouldShortenThumb = isAtMinEdge || shouldHideThumb

    return (
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        data-variant={variant}
        data-size={size}
        className={cn(
          "relative block w-[3px] overflow-hidden rounded-[var(--radius-4)]",
          sizeConfig[size].thumb,
          "bg-actions-secondary-default",
          "before:absolute before:inset-0 before:rounded-[var(--radius-4)] before:bg-actions-secondary-default before:opacity-60 before:content-['']",
          "after:absolute after:inset-0 after:rounded-[var(--radius-4)] after:bg-actions-secondary-default after:opacity-40 after:content-['']",
          "data-[disabled]:bg-actions-secondary-disabled data-[disabled]:before:bg-actions-secondary-disabled data-[disabled]:before:opacity-100",
          "data-[disabled]:after:bg-actions-secondary-disabled data-[disabled]:after:opacity-100",
          "z-20",
          "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          "has-[:focus-visible]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          className
        )}
        style={{ insetInlineStart: `${visualPercentage}%`, ...style }}
        render={
          <motion.span
            initial={false}
            animate={{
              x: thumbX,
              height: shouldShortenThumb ? edgeHeight : thumbHeight,
              opacity: shouldHideThumb ? 0 : 1,
              scale: shouldHideThumb ? 0.6 : 1,
            }}
            transition={prefersReducedMotion
              ? instantTransition
              : {
                  x: dragging
                    ? adjustmentThumbDragTransition
                    : isAtEdge
                    ? adjustmentEdgeSnapTransition
                    : thumbTransition,
                  height: adjustmentThumbSizeTransition,
                  opacity: shouldHideThumb
                    ? adjustmentThumbFadeOutTransition
                    : adjustmentThumbFadeTransition,
                  scale: adjustmentThumbSizeTransition,
                }}
          />
        }
        {...props}
      />
    )
  }

  if (variant === "segmented") {
    // For segmented variant, animate thumb height at edges
    const isAtEdge = visualPercentage <= 0 || visualPercentage >= 100
    const heights = thumbHeightValues[size]

    return (
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        data-variant={variant}
        data-size={size}
        data-at-edge={isAtEdge || undefined}
        className={cn(
          "relative block w-[3px] overflow-hidden rounded-[var(--radius-4)]",
          "cursor-grab active:cursor-grabbing",
          "bg-actions-secondary-default",
          "before:absolute before:inset-0 before:rounded-[var(--radius-4)] before:bg-actions-secondary-default before:opacity-60 before:content-['']",
          "after:absolute after:inset-0 after:rounded-[var(--radius-4)] after:bg-actions-secondary-default after:opacity-40 after:content-['']",
          "data-[disabled]:bg-actions-secondary-disabled data-[disabled]:before:bg-actions-secondary-disabled data-[disabled]:before:opacity-100",
          "data-[disabled]:after:bg-actions-secondary-disabled data-[disabled]:after:opacity-100",
          "z-10",
          "focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          "has-[:focus-visible]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          className
        )}
        style={{ insetInlineStart: `${visualPercentage}%`, ...style }}
        render={
          <motion.span
            initial={false}
            animate={{
              height: isAtEdge ? heights.full : heights.normal,
            }}
            transition={prefersReducedMotion ? instantTransition : segmentedThumbTransition}
          />
        }
        {...props}
      />
    )
  }

  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      data-variant={variant}
      data-size={size}
      className={cn(
        "block size-[var(--space-16)] rounded-full",
        "bg-content-inverse-strong",
        "shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1)]",
        "focus-visible:shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1),0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        "has-[:focus-visible]:shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1),0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
        className
      )}
      style={{ insetInlineStart: `${visualPercentage}%`, ...style }}
      render={
        <motion.span
          whileHover={prefersReducedMotion ? undefined : { scale: 1.25 }}
          whileFocus={prefersReducedMotion ? undefined : { scale: 1.25 }}
          transition={prefersReducedMotion ? instantTransition : thumbTransition}
        />
      }
      {...props}
    />
  )
}

// ============================================================================
// Slider Value (for adjustment variant)
// ============================================================================

type SliderValueProps = Omit<SliderPrimitive.Value.Props, "className"> & {
  className?: string
}

function SliderValue({ className, render, children, ...props }: SliderValueProps) {
  const { variant, size, percentage, animatedPercentage, disabled } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()

  if (variant === "adjustment") {
    const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)
    const valueX = visualPercentage >= 100 ? -adjustmentValueMaxShift : 0
    const hasCustomChildren = typeof children !== "undefined"
    const valueChildren = hasCustomChildren
      ? children
      : ((_formattedValues: readonly string[], values: readonly number[]) => {
          const displayValue = values[0] ?? 0
          return (
            <NumberFlow
              value={Math.round(displayValue)}
              transformTiming={numberFlowTiming.transform}
              spinTiming={numberFlowTiming.spin}
              opacityTiming={numberFlowTiming.opacity}
              willChange
              respectMotionPreference
            />
          )
        })
    const valueRender = render ?? ((valueProps: React.ComponentPropsWithRef<"output">) => {
      const {
        onDrag,
        onDragStart,
        onDragEnd,
        onDragEnter,
        onDragLeave,
        onDragOver,
        onDrop,
        onAnimationStart,
        ...rest
      } = valueProps

      return (
        <motion.output
          {...rest}
          initial={false}
          animate={{ x: valueX }}
          transition={prefersReducedMotion ? instantTransition : adjustmentValueTransition}
        />
      )
    })

    return (
      <SliderPrimitive.Value
        data-slot="slider-value"
        data-variant={variant}
        data-size={size}
        className={cn(
          "absolute right-[var(--space-12)] top-1/2 -translate-y-1/2 z-10",
          "text-[length:var(--font-size-m)] font-normal leading-[var(--line-height-m)]",
          "pointer-events-none",
          disabled
            ? "text-content-disabled"
            : percentage === 0
              ? "text-content-muted"
              : "text-content-strong",
          className
        )}
        render={valueRender}
        children={valueChildren}
        {...props}
      />
    )
  }

  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      data-variant={variant}
      data-size={size}
      className={cn(
        "absolute right-[var(--space-12)] top-1/2 -translate-y-1/2 z-10",
        "text-[length:var(--font-size-m)] font-normal leading-[var(--line-height-m)]",
        "pointer-events-none",
        disabled
          ? "text-content-disabled"
          : percentage === 0
            ? "text-content-muted"
            : "text-content-strong",
        className
      )}
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
  Value: SliderValue,
  // Adjustment variant components
  AdjustmentTrack: SliderAdjustmentTrack,
  // Segmented variant components
  SegmentedTrack: SliderSegmentedTrack,
  SelectedSegment: SliderSelectedSegment,
  SegmentedGap: SliderSegmentedGap,
  SegmentedThumb: SliderSegmentedThumb,
  UnselectedSegment: SliderUnselectedSegment,
})

export { Slider, SliderRoot, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue, SliderAdjustmentTrack, SliderSegmentedTrack, SliderSelectedSegment, SliderSegmentedGap, SliderSegmentedThumb, SliderUnselectedSegment, useSliderVariant, useSliderContext }
export type {
  SliderRootProps,
  SliderControlProps,
  SliderTrackProps,
  SliderIndicatorProps,
  SliderThumbProps,
  SliderValueProps,
  SliderAdjustmentTrackProps,
  SliderSegmentedTrackProps,
  SliderSelectedSegmentProps,
  SliderUnselectedSegmentProps,
  SliderVariant,
  SliderSize,
}
