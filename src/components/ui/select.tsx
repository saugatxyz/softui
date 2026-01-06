"use client"

import * as React from "react"
import { Field } from "@base-ui/react/field"
import { cva, type VariantProps } from "class-variance-authority"
import { RiErrorWarningFill, RiExpandUpDownLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

const selectFieldVariants = cva(
  "flex w-full items-center gap-[var(--space-2)] rounded-[var(--radius-10)] bg-actions-secondary-default transition-colors duration-200",
  {
    variants: {
      size: {
        s: "h-[var(--space-32)] px-[var(--space-10)]",
        m: "h-[var(--space-36)] px-[var(--space-12)]",
        l: "h-[var(--space-40)] px-[var(--space-12)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const selectVariants = cva(
  "flex-1 appearance-none bg-transparent text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] outline-none cursor-pointer",
  {
    variants: {
      size: {
        s: "px-[var(--space-4)]",
        m: "px-[var(--space-4)]",
        l: "px-[var(--space-4)]",
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
        s: "size-[16px]",
        m: "size-[16px]",
        l: "size-[16px]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

const labelVariants = cva("flex w-full flex-col items-start", {
  variants: {
    size: {
      s: "gap-[var(--space-2)]",
      m: "gap-[var(--space-2)]",
      l: "gap-[var(--space-2)]",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

type SelectSize = "s" | "m" | "l"

type SelectProps = Omit<React.ComponentProps<"select">, "size"> &
  VariantProps<typeof selectFieldVariants> & {
    label?: string
    description?: string
    error?: string
    leadingIcon?: React.ReactNode
    /** Only show focus ring on keyboard navigation */
    focusVisibleOnly?: boolean
  }

function Select({
  className,
  size,
  label,
  description,
  error,
  leadingIcon,
  focusVisibleOnly,
  disabled,
  children,
  value,
  defaultValue,
  onChange,
  ...props
}: SelectProps) {
  const resolvedSize: SelectSize = size ?? "m"
  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)
  const hasError = Boolean(error)
  const [showFocusRing, setShowFocusRing] = React.useState(false)
  const wasMouseDown = React.useRef(false)
  const selectRef = React.useRef<HTMLSelectElement>(null)
  const [hasValue, setHasValue] = React.useState(() => {
    if (value !== undefined) return value !== ""
    if (defaultValue !== undefined) return defaultValue !== ""
    return false
  })

  // Update hasValue when controlled value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setHasValue(value !== "")
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHasValue(e.target.value !== "")
    onChange?.(e)
  }

  const handleMouseDown = () => {
    wasMouseDown.current = true
  }

  const handleFocus = () => {
    if (focusVisibleOnly) {
      setShowFocusRing(!wasMouseDown.current)
    } else {
      setShowFocusRing(true)
    }
    wasMouseDown.current = false
  }

  const handleBlur = () => {
    setShowFocusRing(false)
    wasMouseDown.current = false
  }

  const labelSection = (hasLabel || hasDescription) && (
    <div
      data-slot="label-container"
      className={cn(labelVariants({ size: resolvedSize }))}
    >
      {hasLabel && (
        <Field.Label
          data-slot="label"
          className={cn(
            "font-[var(--font-weight-medium)]",
            resolvedSize === "s"
              ? "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]"
              : "text-[length:var(--font-size-m)] leading-[var(--line-height-m)]",
            disabled ? "text-content-muted" : "text-content-strong"
          )}
        >
          {label}
        </Field.Label>
      )}
      {hasDescription && (
        <Field.Description
          data-slot="description"
          className={cn(
            "font-[var(--font-weight-default)]",
            "text-[length:var(--font-size-xs)] leading-[var(--line-height-xs)]",
            disabled ? "text-content-muted" : "text-content-subtle"
          )}
        >
          {description}
        </Field.Description>
      )}
    </div>
  )

  return (
    <Field.Root
      data-slot="select"
      data-size={resolvedSize}
      disabled={disabled}
      invalid={hasError}
      className={cn("flex w-full flex-col gap-[var(--space-8)]", className)}
    >
      {labelSection}

      <div
        data-slot="field"
        className={cn(
          selectFieldVariants({ size: resolvedSize }),
          "group relative cursor-pointer",
          !disabled && "hover:bg-actions-secondary-hover",
          showFocusRing && "shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          disabled && "bg-actions-secondary-disabled"
        )}
        onMouseDown={handleMouseDown}
        onClick={() => selectRef.current?.focus()}
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

        <select
          ref={selectRef}
          data-slot="control"
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            selectVariants({ size: resolvedSize }),
            disabled
              ? "text-content-disabled"
              : hasValue
                ? "text-content-strong"
                : "text-content-muted"
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {children}
        </select>

        <span
          data-slot="icon"
          className={cn(
            iconVariants({ size: resolvedSize }),
            disabled ? "text-content-disabled" : "text-content-muted"
          )}
        >
          <RiExpandUpDownLine />
        </span>
      </div>

      {hasError && (
        <div
          data-slot="error"
          className="flex w-full items-center gap-[var(--space-4)] pt-[var(--space-2)]"
        >
          <RiErrorWarningFill className="size-[16px] shrink-0 text-content-feedback-danger-strong" />
          <span className="flex-1 text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-feedback-danger-strong">
            {error}
          </span>
        </div>
      )}
    </Field.Root>
  )
}

export { Select }
export type { SelectProps }
