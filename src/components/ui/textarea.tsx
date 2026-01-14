"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaFieldVariants = cva(
  "flex w-full rounded-[var(--radius-10)] transition-colors duration-200",
  {
    variants: {
      size: {
        s: "px-[var(--space-10)] py-[var(--space-8)]",
        m: "px-[var(--space-12)] py-[var(--space-10)]",
        l: "px-[var(--space-12)] py-[var(--space-12)]",
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

const textareaVariants = cva(
  "w-full bg-transparent text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] outline-none placeholder:text-content-muted caret-actions-primary-default",
  {
    variants: {
      size: {
        s: "",
        m: "",
        l: "",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      size: "m",
      resize: "vertical",
    },
  }
)

type TextareaSize = "s" | "m" | "l"
type TextareaVariant = "secondary" | "tertiary"
type TextareaResize = "none" | "vertical" | "horizontal" | "both"

type TextareaProps = Omit<
  React.ComponentProps<typeof InputPrimitive>,
  "size" | "render"
> &
  VariantProps<typeof textareaFieldVariants> & {
    /** Number of visible text rows */
    rows?: number
    /** Resize behavior */
    resize?: TextareaResize
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      className,
      size,
      variant,
      rows = 3,
      resize = "vertical",
      disabled,
      ...props
    },
    ref
  ) {
    const resolvedSize: TextareaSize = size ?? "m"
    const resolvedVariant: TextareaVariant = variant ?? "secondary"
    const containerRef = React.useRef<HTMLDivElement>(null)

    const isSecondary = resolvedVariant === "secondary"
    const isTertiary = resolvedVariant === "tertiary"

    return (
      <div
        ref={containerRef}
        data-slot="textarea"
        data-size={resolvedSize}
        data-variant={resolvedVariant}
        className={cn(
          textareaFieldVariants({ size: resolvedSize, variant: resolvedVariant }),
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
          "has-[:focus-visible]:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)]",
          className
        )}
        onClick={() => containerRef.current?.querySelector("textarea")?.focus()}
      >
        <InputPrimitive
          ref={ref as React.Ref<HTMLInputElement>}
          data-slot="control"
          disabled={disabled}
          render={<textarea rows={rows} />}
          className={cn(
            textareaVariants({ size: resolvedSize, resize }),
            disabled
              ? "cursor-not-allowed text-content-disabled placeholder:text-content-disabled"
              : "text-content-strong"
          )}
          {...props}
        />
      </div>
    )
  }
)

export { Textarea }
export type { TextareaProps }
