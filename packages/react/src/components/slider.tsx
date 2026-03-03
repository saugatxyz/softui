"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { mergeProps } from "@base-ui/react/merge-props"
import { animate, motion, type Transition } from "motion/react"
import NumberFlow from "@number-flow/react"

import { cn, omitMotionConflictingEventHandlers, usePrefersReducedMotion } from "../lib/utils"

// ============================================================================
// Animation Config
// ============================================================================

const instantTransition: Transition = {
  duration: 0,
}
type CubicBezier = [number, number, number, number]
type SliderSpringAnimation = {
  bounce: number
  duration: number
}
type SliderFadeAnimation = {
  duration: number
  ease: CubicBezier
}
type SliderFadeOutAnimation = SliderFadeAnimation & {
  delay: number
}
type SliderNumberFlowAnimation = {
  duration: number
  easing: "linear" | "ease-in" | "ease-out" | "ease-in-out"
}
type SliderAnimationConfig = {
  root: {
    drag: {
      duration: number
      ease: CubicBezier
    }
    trackPress: SliderSpringAnimation
  }
  thumb: {
    default: SliderSpringAnimation
    segmented: SliderSpringAnimation
    adjustment: {
      drag: SliderSpringAnimation
      edgeSnap: SliderSpringAnimation
      size: SliderSpringAnimation
      fadeIn: SliderFadeAnimation
      fadeOut: SliderFadeOutAnimation
    }
  }
  value: {
    adjustment: SliderSpringAnimation
  }
  numberFlow: {
    transform: SliderNumberFlowAnimation
    spin: SliderNumberFlowAnimation
    opacity: SliderNumberFlowAnimation
  }
}
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

declare global {
  interface Window {
    __sliderAnimConfig?: DeepPartial<SliderAnimationConfig>
  }
}

const defaultSliderAnimConfig: SliderAnimationConfig = {
  root: {
    drag: { duration: 0.12, ease: [0.22, 1, 0.36, 1] },
    trackPress: { bounce: 0.1, duration: 0.2 },
  },
  thumb: {
    default: { bounce: 0.1, duration: 0.2 },
    segmented: { bounce: 0, duration: 0.2 },
    adjustment: {
      drag: { bounce: 0.1, duration: 0.12 },
      edgeSnap: { bounce: 0.2, duration: 0.18 },
      size: { bounce: 0.25, duration: 0.2 },
      fadeIn: { duration: 0.12, ease: [0.23, 1, 0.32, 1] },
      fadeOut: { duration: 0.12, ease: [0.23, 1, 0.32, 1], delay: 0.04 },
    },
  },
  value: {
    adjustment: { bounce: 0.15, duration: 0.18 },
  },
  numberFlow: {
    transform: { duration: 200, easing: "ease-out" },
    spin: { duration: 200, easing: "ease-out" },
    opacity: { duration: 120, easing: "ease-out" },
  },
}

function resolveBezier(
  customEase: Partial<CubicBezier> | undefined,
  fallbackEase: CubicBezier
): CubicBezier {
  return [
    customEase?.[0] ?? fallbackEase[0],
    customEase?.[1] ?? fallbackEase[1],
    customEase?.[2] ?? fallbackEase[2],
    customEase?.[3] ?? fallbackEase[3],
  ]
}

function getSliderAnimConfig(): SliderAnimationConfig {
  if (typeof window === "undefined" || !window.__sliderAnimConfig) {
    return defaultSliderAnimConfig
  }

  const custom = window.__sliderAnimConfig

  return {
    root: {
      drag: {
        duration: custom.root?.drag?.duration ?? defaultSliderAnimConfig.root.drag.duration,
        ease: resolveBezier(custom.root?.drag?.ease, defaultSliderAnimConfig.root.drag.ease),
      },
      trackPress: {
        bounce: custom.root?.trackPress?.bounce ?? defaultSliderAnimConfig.root.trackPress.bounce,
        duration: custom.root?.trackPress?.duration ?? defaultSliderAnimConfig.root.trackPress.duration,
      },
    },
    thumb: {
      default: {
        bounce: custom.thumb?.default?.bounce ?? defaultSliderAnimConfig.thumb.default.bounce,
        duration: custom.thumb?.default?.duration ?? defaultSliderAnimConfig.thumb.default.duration,
      },
      segmented: {
        bounce: custom.thumb?.segmented?.bounce ?? defaultSliderAnimConfig.thumb.segmented.bounce,
        duration: custom.thumb?.segmented?.duration ?? defaultSliderAnimConfig.thumb.segmented.duration,
      },
      adjustment: {
        drag: {
          bounce: custom.thumb?.adjustment?.drag?.bounce ?? defaultSliderAnimConfig.thumb.adjustment.drag.bounce,
          duration: custom.thumb?.adjustment?.drag?.duration ?? defaultSliderAnimConfig.thumb.adjustment.drag.duration,
        },
        edgeSnap: {
          bounce: custom.thumb?.adjustment?.edgeSnap?.bounce ?? defaultSliderAnimConfig.thumb.adjustment.edgeSnap.bounce,
          duration: custom.thumb?.adjustment?.edgeSnap?.duration ?? defaultSliderAnimConfig.thumb.adjustment.edgeSnap.duration,
        },
        size: {
          bounce: custom.thumb?.adjustment?.size?.bounce ?? defaultSliderAnimConfig.thumb.adjustment.size.bounce,
          duration: custom.thumb?.adjustment?.size?.duration ?? defaultSliderAnimConfig.thumb.adjustment.size.duration,
        },
        fadeIn: {
          duration: custom.thumb?.adjustment?.fadeIn?.duration ?? defaultSliderAnimConfig.thumb.adjustment.fadeIn.duration,
          ease: resolveBezier(
            custom.thumb?.adjustment?.fadeIn?.ease,
            defaultSliderAnimConfig.thumb.adjustment.fadeIn.ease
          ),
        },
        fadeOut: {
          duration: custom.thumb?.adjustment?.fadeOut?.duration ?? defaultSliderAnimConfig.thumb.adjustment.fadeOut.duration,
          ease: resolveBezier(
            custom.thumb?.adjustment?.fadeOut?.ease,
            defaultSliderAnimConfig.thumb.adjustment.fadeOut.ease
          ),
          delay: custom.thumb?.adjustment?.fadeOut?.delay ?? defaultSliderAnimConfig.thumb.adjustment.fadeOut.delay,
        },
      },
    },
    value: {
      adjustment: {
        bounce: custom.value?.adjustment?.bounce ?? defaultSliderAnimConfig.value.adjustment.bounce,
        duration: custom.value?.adjustment?.duration ?? defaultSliderAnimConfig.value.adjustment.duration,
      },
    },
    numberFlow: {
      transform: {
        duration: custom.numberFlow?.transform?.duration ?? defaultSliderAnimConfig.numberFlow.transform.duration,
        easing: custom.numberFlow?.transform?.easing ?? defaultSliderAnimConfig.numberFlow.transform.easing,
      },
      spin: {
        duration: custom.numberFlow?.spin?.duration ?? defaultSliderAnimConfig.numberFlow.spin.duration,
        easing: custom.numberFlow?.spin?.easing ?? defaultSliderAnimConfig.numberFlow.spin.easing,
      },
      opacity: {
        duration: custom.numberFlow?.opacity?.duration ?? defaultSliderAnimConfig.numberFlow.opacity.duration,
        easing: custom.numberFlow?.opacity?.easing ?? defaultSliderAnimConfig.numberFlow.opacity.easing,
      },
    },
  }
}

const springTransition = (config: SliderSpringAnimation): Transition => ({
  type: "spring",
  bounce: config.bounce,
  duration: config.duration,
})

const fadeTransition = (config: SliderFadeAnimation): Transition => ({
  duration: config.duration,
  ease: config.ease,
})

const fadeOutTransition = (config: SliderFadeOutAnimation): Transition => ({
  duration: config.duration,
  ease: config.ease,
  delay: config.delay,
})

const adjustmentEdgeThreshold = 12
const adjustmentThumbHideFallbackThreshold = 93
const adjustmentValueInlineEnd = 12
const adjustmentThumbCollisionGap = 4
const adjustmentThumbWidth = 3
const adjustmentThumbHeights = {
  s: 20,
  m: 24,
  l: 24,
}
const adjustmentValueMaxShift = 4
const clampPercentage = (value: number) => Math.min(100, Math.max(0, value))
// Height values for thumb animation (in pixels)
const thumbHeightValues = {
  s: { normal: 20, full: 32 },
  m: { normal: 24, full: 36 },
  l: { normal: 24, full: 40 },
}

function useMeasuredWidth<T extends HTMLElement>() {
  const [width, setWidth] = React.useState(0)
  const observerRef = React.useRef<ResizeObserver | null>(null)

  const measure = React.useCallback((element: T) => {
    const nextWidth = element.getBoundingClientRect().width
    setWidth((prevWidth) => (
      Math.abs(prevWidth - nextWidth) < 0.5 ? prevWidth : nextWidth
    ))
  }, [])

  const setElement = React.useCallback((element: T | null) => {
    observerRef.current?.disconnect()
    observerRef.current = null

    if (!element) {
      setWidth(0)
      return
    }

    measure(element)

    if (typeof ResizeObserver === "undefined") {
      return
    }

    const observer = new ResizeObserver(() => measure(element))
    observer.observe(element)
    observerRef.current = observer
  }, [measure])

  React.useEffect(() => () => {
    observerRef.current?.disconnect()
  }, [])

  return [width, setElement] as const
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
  adjustmentTrackWidth: number
  adjustmentValueWidth: number
  setAdjustmentTrackElement: (element: HTMLDivElement | null) => void
  setAdjustmentValueElement: (element: HTMLElement | null) => void
}

const SliderContext = React.createContext<SliderContextValue>({
  variant: "default",
  size: "m",
  percentage: 0,
  animatedPercentage: 0,
  disabled: false,
  dragging: false,
  changeReason: "none",
  adjustmentTrackWidth: 0,
  adjustmentValueWidth: 0,
  setAdjustmentTrackElement: () => {},
  setAdjustmentValueElement: () => {},
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
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
  variant?: SliderVariant
  size?: SliderSize
}

function SliderRoot({
  className,
  unsafeClassName,
  variant = "default",
  size = "m",
  render,
  onValueChange,
  ...props
}: SliderRootProps) {
  const [changeReason, setChangeReason] = React.useState<SliderChangeReason>("none")
  const handleValueChange = React.useCallback(
    (
      value: number | readonly number[],
      details: SliderPrimitive.Root.ChangeEventDetails
    ) => {
      setChangeReason(details.reason)
      onValueChange?.(value as never, details)
    },
    [onValueChange]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-variant={variant}
      data-size={size}
      className={cn(className, "flex w-full flex-col gap-[var(--space-12)]", unsafeClassName)}
      render={(rootProps, state) => (
        <SliderRootInner
          rootProps={rootProps}
          state={state}
          variant={variant}
          size={size}
          render={render}
          changeReason={changeReason}
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
  changeReason: SliderChangeReason
}

function SliderRootInner({
  rootProps,
  state,
  variant,
  size,
  render,
  changeReason,
}: SliderRootInnerProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const animationConfig = getSliderAnimConfig()
  const currentValue = state.values[0] ?? state.min
  const range = state.max - state.min
  const rawPercentage = range > 0 ? ((currentValue - state.min) / range) * 100 : 0
  const percentage = Number.isFinite(rawPercentage)
    ? Math.min(100, Math.max(0, rawPercentage))
    : 0
  const [animatedPercentage, setAnimatedPercentage] = React.useState(percentage)
  const animatedPercentageRef = React.useRef(percentage)
  const [adjustmentTrackWidth, setAdjustmentTrackElement] = useMeasuredWidth<HTMLDivElement>()
  const [adjustmentValueWidth, setAdjustmentValueElement] = useMeasuredWidth<HTMLElement>()

  React.useEffect(() => {
    if (prefersReducedMotion) {
      animatedPercentageRef.current = percentage
      setAnimatedPercentage(percentage)
      return
    }

    const isDragMove = state.dragging && changeReason === "drag"
    const trackPressTransition: Transition = {
      type: "spring",
      bounce: animationConfig.root.trackPress.bounce,
      duration: animationConfig.root.trackPress.duration,
    }
    const transition: Transition = isDragMove
      ? {
          duration: animationConfig.root.drag.duration,
          ease: animationConfig.root.drag.ease,
        }
      : changeReason === "track-press" || changeReason === "keyboard"
        ? trackPressTransition
        : { duration: 0 }
    const controls = animate(animatedPercentageRef.current, percentage, {
      ...transition,
      onUpdate: (latest) => {
        animatedPercentageRef.current = latest
        setAnimatedPercentage(latest)
      },
    })

    return () => controls.stop()
  }, [
    animationConfig.root.drag.duration,
    animationConfig.root.drag.ease,
    animationConfig.root.trackPress.bounce,
    animationConfig.root.trackPress.duration,
    percentage,
    prefersReducedMotion,
    changeReason,
    state.dragging,
  ])

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
        adjustmentTrackWidth,
        adjustmentValueWidth,
        setAdjustmentTrackElement,
        setAdjustmentValueElement,
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
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SliderControl({ className, unsafeClassName, ...props }: SliderControlProps) {
  const { variant, size } = useSliderContext()

  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      data-variant={variant}
      data-size={size}
      className={cn(
        className,
        "flex w-full touch-none items-center cursor-pointer data-[disabled]:cursor-not-allowed",
        variant === "default" && "h-[var(--space-20)]",
        (variant === "adjustment" || variant === "segmented") && sizeConfig[size].control,
        unsafeClassName
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
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SliderTrack({ className, unsafeClassName, ...props }: SliderTrackProps) {
  const { variant, size } = useSliderContext()

  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      data-variant={variant}
      data-size={size}
      className={cn(
        className,
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
        unsafeClassName
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
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
  children?: React.ReactNode
}

function SliderAdjustmentTrack({ className, unsafeClassName, children }: SliderAdjustmentTrackProps) {
  const { variant, size, disabled, setAdjustmentTrackElement } = useSliderContext()

  // Only render for adjustment variant
  if (variant !== "adjustment") {
    return <>{children}</>
  }

  return (
    <div
      ref={setAdjustmentTrackElement}
      data-slot="slider-adjustment-track"
      data-size={size}
      data-disabled={disabled || undefined}
      className={cn(
        className,
        "group/adjustment relative w-full",
        sizeConfig[size].track,
        // Visual styling: background, rounded corners
        "bg-surface-interactive-default",
        disabled && "bg-surface-interactive-default backdrop-blur-sm",
        // Clip thumb if it ever exceeds bounds during drag
        "overflow-hidden",
        unsafeClassName
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
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

// Size-based radius for adjustment indicator (matches container radius)
const adjustmentRadiusConfig = {
  s: { full: "rounded-[var(--radius-8)]", left: "rounded-l-[var(--radius-8)]" },
  m: { full: "rounded-[var(--radius-10)]", left: "rounded-l-[var(--radius-10)]" },
  l: { full: "rounded-[var(--radius-12)]", left: "rounded-l-[var(--radius-12)]" },
}

function SliderIndicator({ className, unsafeClassName, render, style, ...props }: SliderIndicatorProps) {
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
          className,
          "absolute left-0 top-0 h-full w-full origin-left",
          // Indicator fills edge to edge, hardcode radius to match container
          isAtMax
            ? adjustmentRadiusConfig[size].full
            : [adjustmentRadiusConfig[size].left, "rounded-r-[var(--radius-4)]"],
          "bg-actions-secondary-default group-hover/adjustment:bg-actions-secondary-hover",
          "data-[disabled]:bg-actions-secondary-disabled data-[disabled]:group-hover/adjustment:bg-actions-secondary-disabled",
          unsafeClassName
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
        className,
        "absolute h-full",
        "rounded-[var(--radius-max)]",
        "bg-actions-primary-default data-[disabled]:bg-actions-primary-disabled",
        unsafeClassName
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
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SliderThumb({ className, unsafeClassName, style, ...props }: SliderThumbProps) {
  const animationConfig = getSliderAnimConfig()
  const [thumbPressed, setThumbPressed] = React.useState(false)
  const {
    variant,
    size,
    percentage,
    animatedPercentage,
    dragging,
    changeReason,
    adjustmentTrackWidth,
    adjustmentValueWidth,
  } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)

  React.useEffect(() => {
    if (!thumbPressed) {
      return
    }

    const handlePointerRelease = () => {
      setThumbPressed(false)
    }

    window.addEventListener("pointerup", handlePointerRelease)
    window.addEventListener("pointercancel", handlePointerRelease)

    return () => {
      window.removeEventListener("pointerup", handlePointerRelease)
      window.removeEventListener("pointercancel", handlePointerRelease)
    }
  }, [thumbPressed])

  if (variant === "adjustment") {
    const isAtAbsoluteMax = percentage >= 100
    const adjustedVisualPercentage = isAtAbsoluteMax ? 100 : visualPercentage

    // Thumb is 3px wide, halfThumb = 1.5px
    // Gap between thumb edge and track edge = 9.5px
    // Total offset from track edge to thumb center = 9.5 + 1.5 = 11px
    const edgeOffset = 11
    // Bring the thumb closer to the indicator by 2px without changing edge gaps
    const midOffset = edgeOffset - 2

    // Dock to left edge a bit early for consistent min alignment.
    // On the right side, keep midOffset and rely on hide/scale collision behavior
    // until exact max, where we dock to the right edge.
    const edgeThreshold = adjustmentEdgeThreshold

    // Base UI positions thumb center at percentage% of track width.
    // We apply CSS transform to achieve desired positioning:
    //
    // Near 0% (< threshold): dock at left edge
    // At 100%: dock at right edge
    // Otherwise: thumb stays outside indicator (right of indicator edge)

    let thumbX: number
    if (adjustedVisualPercentage <= edgeThreshold) {
      thumbX = edgeOffset // dock at left edge
    } else if (adjustedVisualPercentage >= 100) {
      thumbX = -edgeOffset // dock at right edge
    } else {
      thumbX = midOffset // outside indicator
    }

    const isAtEdge = adjustedVisualPercentage <= edgeThreshold || adjustedVisualPercentage >= 100
    const hasAdjustmentMeasurements = adjustmentTrackWidth > 0 && adjustmentValueWidth > 0
    const thumbRightPx = (adjustedVisualPercentage / 100) * adjustmentTrackWidth + thumbX + adjustmentThumbWidth
    const valueLeftPx = adjustmentTrackWidth - adjustmentValueInlineEnd - adjustmentValueWidth
    const shouldHideThumb = changeReason !== "keyboard"
      && !isAtAbsoluteMax
      && (hasAdjustmentMeasurements
        ? thumbRightPx >= valueLeftPx - adjustmentThumbCollisionGap
        : adjustedVisualPercentage >= adjustmentThumbHideFallbackThreshold)
    const thumbHeight = adjustmentThumbHeights[size]
    const edgeHeight = thumbHeight - 3
    const isThumbAtRest = !dragging && !thumbPressed
    const shouldShortenThumb = isThumbAtRest || shouldHideThumb
    const shouldRevealImmediately = isAtAbsoluteMax && !shouldHideThumb
    const thumbInteractionProps = mergeProps(props, {
      onPointerDown: () => setThumbPressed(true),
      onPointerUp: () => setThumbPressed(false),
      onPointerCancel: () => setThumbPressed(false),
      onBlur: () => setThumbPressed(false),
    })

    return (
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        data-variant={variant}
        data-size={size}
        className={cn(
          className,
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
          unsafeClassName
        )}
        style={{ insetInlineStart: `${adjustedVisualPercentage}%`, ...style }}
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
                  x: shouldRevealImmediately
                    ? instantTransition
                    : dragging
                    ? springTransition(animationConfig.thumb.adjustment.drag)
                    : isAtEdge
                    ? springTransition(animationConfig.thumb.adjustment.edgeSnap)
                    : springTransition(animationConfig.thumb.default),
                  height: springTransition(animationConfig.thumb.adjustment.size),
                  opacity: shouldRevealImmediately
                    ? instantTransition
                    : shouldHideThumb
                    ? fadeOutTransition(animationConfig.thumb.adjustment.fadeOut)
                    : fadeTransition(animationConfig.thumb.adjustment.fadeIn),
                  scale: shouldRevealImmediately
                    ? instantTransition
                    : springTransition(animationConfig.thumb.adjustment.size),
                }}
          />
        }
        {...thumbInteractionProps}
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
          className,
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
          unsafeClassName
        )}
        style={{ insetInlineStart: `${visualPercentage}%`, ...style }}
        render={
          <motion.span
            initial={false}
            animate={{
              height: isAtEdge ? heights.full : heights.normal,
            }}
            transition={prefersReducedMotion
              ? instantTransition
              : springTransition(animationConfig.thumb.segmented)}
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
        className,
        "block size-[var(--space-16)] rounded-full",
        "bg-content-inverse-strong",
        "shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1)]",
        "focus-visible:shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1),inset_0_0_0_1px_var(--color-utility-focus-inner),inset_0_0_0_3px_var(--color-utility-focus-outer)]",
        "has-[:focus-visible]:shadow-[0_2px_4px_0_var(--color-utility-shadow-l3),0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l3),0_0_0_1px_var(--color-utility-shadow-l1),inset_0_0_0_1px_var(--color-utility-focus-inner),inset_0_0_0_3px_var(--color-utility-focus-outer)]",
        unsafeClassName
      )}
      style={{ insetInlineStart: `${visualPercentage}%`, ...style }}
      render={
        <motion.span
          whileHover={prefersReducedMotion ? undefined : { scale: 1.25 }}
          whileFocus={prefersReducedMotion ? undefined : { scale: 1.25 }}
          transition={prefersReducedMotion
            ? instantTransition
            : springTransition(animationConfig.thumb.default)}
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
  /** Explicit escape hatch for intentional structural overrides. */
  unsafeClassName?: string
}

function SliderValue({ className, unsafeClassName, render, children, ...props }: SliderValueProps) {
  const animationConfig = getSliderAnimConfig()
  const {
    variant,
    size,
    percentage,
    animatedPercentage,
    disabled,
    setAdjustmentValueElement,
  } = useSliderContext()
  const prefersReducedMotion = usePrefersReducedMotion()

  if (variant === "adjustment") {
    const visualPercentage = clampPercentage(prefersReducedMotion ? percentage : animatedPercentage)
    const isAtAbsoluteMax = percentage >= 100
    const adjustedVisualPercentage = isAtAbsoluteMax ? 100 : visualPercentage
    const valueX = adjustedVisualPercentage >= 100 ? -adjustmentValueMaxShift : 0
    const hasCustomChildren = typeof children !== "undefined"
    const valueChildren = hasCustomChildren
      ? children
      : ((_formattedValues: readonly string[], values: readonly number[]) => {
          const displayValue = values[0] ?? 0
          return (
            <NumberFlow
              value={Math.round(displayValue)}
              transformTiming={animationConfig.numberFlow.transform}
              spinTiming={animationConfig.numberFlow.spin}
              opacityTiming={animationConfig.numberFlow.opacity}
              willChange
              respectMotionPreference
            />
          )
        })
    const valueRender = render ?? ((valueProps: React.ComponentPropsWithRef<"output">) => {
      const rest = omitMotionConflictingEventHandlers(valueProps)

      return (
        <motion.output
          {...rest}
          initial={false}
          animate={{ x: valueX }}
          transition={prefersReducedMotion || isAtAbsoluteMax
            ? instantTransition
            : springTransition(animationConfig.value.adjustment)}
        />
      )
    })

    return (
      <div
        ref={(element) => setAdjustmentValueElement(element)}
        className="pointer-events-none absolute right-[var(--space-12)] top-1/2 -translate-y-1/2 z-10 inline-flex"
      >
        <SliderPrimitive.Value
          data-slot="slider-value"
          data-variant={variant}
          data-size={size}
          className={cn(
            className,
            "inline-flex items-center",
            "text-[length:var(--font-size-s)] font-normal leading-[var(--line-height-s)]",
            disabled
              ? "text-content-disabled"
              : percentage === 0
                ? "text-content-muted"
                : "text-content-strong",
            unsafeClassName
          )}
          render={valueRender}
          {...props}
        >
          {valueChildren}
        </SliderPrimitive.Value>
      </div>
    )
  }

  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      data-variant={variant}
      data-size={size}
      className={cn(
        className,
        "absolute right-[var(--space-12)] top-1/2 -translate-y-1/2 z-10",
        "text-[length:var(--font-size-s)] font-normal leading-[var(--line-height-s)]",
        "pointer-events-none",
        disabled
          ? "text-content-disabled"
          : percentage === 0
            ? "text-content-muted"
            : "text-content-strong",
        unsafeClassName
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

export {
  Slider,
  SliderRoot,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderValue,
  SliderAdjustmentTrack,
  SliderSegmentedTrack,
  SliderSelectedSegment,
  SliderSegmentedGap,
  SliderSegmentedThumb,
  SliderUnselectedSegment,
  useSliderVariant,
  useSliderContext,
  defaultSliderAnimConfig,
}
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
  SliderAnimationConfig,
  CubicBezier,
}
