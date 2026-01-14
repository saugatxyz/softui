"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { RiArrowRightSLine, RiHome7Fill } from "@remixicon/react"

import { cn } from "@/lib/utils"

const breadcrumbsVariants = cva(
  "flex items-center gap-[var(--space-10)] text-[length:var(--font-size-m)] leading-[var(--line-height-m)] font-[var(--font-weight-medium)]",
  {
    variants: {},
    defaultVariants: {},
  }
)

type SeparatorType = "slash" | "chevron"

type BreadcrumbsProps = React.ComponentPropsWithoutRef<"nav"> &
  VariantProps<typeof breadcrumbsVariants> & {
    separator?: SeparatorType
  }

type BreadcrumbsItemProps = React.ComponentPropsWithoutRef<"li"> & {
  href?: string
  isCurrent?: boolean
  showHomeIcon?: boolean
}

const BreadcrumbsContext = React.createContext<{
  separator: SeparatorType
}>({
  separator: "slash",
})

function BreadcrumbsRoot({
  className,
  separator = "slash",
  children,
  ...props
}: BreadcrumbsProps) {
  return (
    <BreadcrumbsContext.Provider value={{ separator }}>
      <nav
        data-slot="breadcrumbs"
        data-separator={separator}
        aria-label="Breadcrumb"
        className={cn(breadcrumbsVariants(), className)}
        {...props}
      >
        <ol
          data-slot="breadcrumbs-list"
          className="flex items-center gap-[var(--space-10)]"
        >
          {children}
        </ol>
      </nav>
    </BreadcrumbsContext.Provider>
  )
}

function BreadcrumbsItem({
  className,
  href,
  isCurrent = false,
  showHomeIcon = false,
  children,
  ...props
}: BreadcrumbsItemProps) {
  const content = (
    <span
      data-slot="breadcrumbs-item-content"
      className={cn(
        "flex items-center gap-[var(--space-6)] rounded-[var(--radius-8)] px-[var(--space-4)]",
        !isCurrent && "transition-colors duration-200",
        !isCurrent && "hover:underline",
        isCurrent
          ? "text-content-strong cursor-default"
          : "text-content-strong cursor-pointer"
      )}
    >
      {showHomeIcon && (
        <span
          data-slot="breadcrumbs-icon"
          className="flex size-[var(--space-16)] shrink-0 items-center justify-center text-current"
          aria-hidden="true"
        >
          <RiHome7Fill className="size-full" />
        </span>
      )}
      <span data-slot="breadcrumbs-label">{children}</span>
    </span>
  )

  return (
    <li
      data-slot="breadcrumbs-item"
      data-current={isCurrent || undefined}
      className={cn("flex items-center gap-[var(--space-2)]", className)}
      {...props}
    >
      {isCurrent ? (
        <span aria-current="page">{content}</span>
      ) : href ? (
        <a href={href} className="focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-utility-focus-inner),0_0_0_3px_var(--color-utility-focus-outer)] rounded-[var(--radius-8)]">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  )
}

function BreadcrumbsSeparator({ className }: { className?: string }) {
  const { separator } = React.useContext(BreadcrumbsContext)

  return (
    <li
      data-slot="breadcrumbs-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center text-content-strong",
        className
      )}
    >
      {separator === "slash" ? (
        <span className="text-[length:var(--font-size-m)] leading-[var(--line-height-m)] font-[var(--font-weight-medium)]">
          /
        </span>
      ) : (
        <RiArrowRightSLine className="size-[var(--space-16)]" />
      )}
    </li>
  )
}

export {
  BreadcrumbsRoot as Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsSeparator,
}
export type { BreadcrumbsProps, BreadcrumbsItemProps, SeparatorType }
