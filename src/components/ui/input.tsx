"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputFieldVariants = cva(
  "flex w-full items-center gap-[var(--space-6)] rounded-[var(--radius-10)] transition-colors duration-200",
  {
    variants: {
      size: {
        s: "h-[var(--space-32)] px-[var(--space-10)]",
        m: "h-[var(--space-36)] px-[var(--space-12)]",
        l: "h-[var(--space-40)] px-[var(--space-12)]",
      },
      variant: {
        secondary: "bg-actions-secondary-default",
        tertiary:
          "bg-actions-tertiary-default backdrop-blur-[12px] shadow-[0_1px_2px_0_var(--color-utility-shadow-l3),0_0_1px_0_var(--color-utility-shadow-l2),0_0_0_1px_var(--color-utility-shadow-l1)]",
      },
    },
    defaultVariants: {
      size: "m",
      variant: "secondary",
    },
  }
)

const inputVariants = cva(
  "flex-1 bg-transparent text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] outline-none placeholder:text-content-muted caret-actions-primary-default [&::-webkit-calendar-picker-indicator]:hidden",
  {
    variants: {
      size: {
        s: "",
        m: "",
        l: "",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const iconVariants = cva(
  "flex shrink-0 items-center justify-center text-content-subtle [&_svg]:size-full",
  {
    variants: {
      size: {
        s: "size-[var(--space-16)]",
        m: "size-[var(--space-16)]",
        l: "size-[var(--space-16)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

type InputSize = "s" | "m" | "l"
type InputVariant = "secondary" | "tertiary"

type InputProps = Omit<React.ComponentProps<typeof InputPrimitive>, "size"> &
  VariantProps<typeof inputFieldVariants> & {
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    focusVisibleOnly?: boolean
    /** Explicit escape hatch for intentional structural overrides. */
    unsafeClassName?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      className,
      size,
      variant,
      leadingIcon,
      trailingIcon,
      focusVisibleOnly = true,
      disabled,
      unsafeClassName,
      ...props
    },
    ref
  ) {
    const resolvedSize: InputSize = size ?? "m"
    const resolvedVariant: InputVariant = variant ?? "secondary"
    const internalRef = React.useRef<HTMLInputElement>(null)
    const [showFocusRing, setShowFocusRing] = React.useState(false)
    const wasPointerDown = React.useRef(false)

    // Stable ref merging - store forwarded ref in a ref to avoid callback recreation
    const forwardedRef = React.useRef(ref)

    // Update forwardedRef in useEffect to avoid updating during render
    React.useEffect(() => {
      forwardedRef.current = ref
    }, [ref])

    const mergedRef = React.useCallback((node: HTMLInputElement | null) => {
      internalRef.current = node
      const fwdRef = forwardedRef.current
      if (typeof fwdRef === "function") {
        fwdRef(node)
      } else if (fwdRef) {
        fwdRef.current = node
      }
    }, [])

    const handlePointerDown = () => {
      wasPointerDown.current = true
    }

    const handleFocus = () => {
      if (focusVisibleOnly) {
        setShowFocusRing(!wasPointerDown.current)
      } else {
        setShowFocusRing(true)
      }
      wasPointerDown.current = false
    }

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      if (event.currentTarget.contains(event.relatedTarget as Node)) return
      setShowFocusRing(false)
      wasPointerDown.current = false
    }

    const isSecondary = resolvedVariant === "secondary"
    const isTertiary = resolvedVariant === "tertiary"

    const handleClick = () => {
      internalRef.current?.focus()
    }

    return (
      <div
        data-slot="input"
        data-size={resolvedSize}
        data-variant={resolvedVariant}
        className={cn(
          className,
          inputFieldVariants({ size: resolvedSize, variant: resolvedVariant }),
          "group relative",
          disabled
            ? cn(
                "cursor-not-allowed",
                isSecondary && "bg-actions-secondary-disabled",
                isTertiary && "bg-actions-tertiary-disabled shadow-none"
              )
            : "cursor-text",
          !disabled && isSecondary && "hover:bg-actions-secondary-hover",
          !disabled && isTertiary && "hover:bg-actions-tertiary-hover",
          showFocusRing &&
            "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          unsafeClassName
        )}
        onPointerDown={handlePointerDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
      >
        {leadingIcon && (
          <span
            data-slot="icon"
            className={cn(
              iconVariants({ size: resolvedSize }),
              disabled && "text-content-disabled"
            )}
          >
            {leadingIcon}
          </span>
        )}

        <InputPrimitive
          ref={mergedRef}
          data-slot="control"
          disabled={disabled}
          className={cn(
            inputVariants({ size: resolvedSize }),
            disabled
              ? "cursor-not-allowed text-content-disabled placeholder:text-content-disabled"
              : "text-content-strong"
          )}
          {...props}
        />

        {trailingIcon && (
          <span
            data-slot="icon"
            className={cn(
              iconVariants({ size: resolvedSize }),
              disabled && "text-content-disabled"
            )}
          >
            {trailingIcon}
          </span>
        )}
      </div>
    )
  }
)

export { Input }
export type { InputProps }
