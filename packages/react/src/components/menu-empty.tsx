"use client"

import * as React from "react"
import { RiSearchLine } from "@soft-ui/icons"

import { cn } from "../lib/utils"
import { Button } from "./button"

type MenuEmptyProps = {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
  className?: string
}

function MenuEmpty({
  title = "No results found",
  description,
  action,
  className,
}: MenuEmptyProps) {
  return (
    <div
      data-slot="menu-empty"
      className={cn(
        "flex w-full flex-col items-center justify-center gap-[var(--space-16)] px-[var(--space-28)] py-[var(--space-20)]",
        className
      )}
    >
      <div className="flex flex-col items-center gap-[var(--space-12)]">
        <span className="flex size-4 items-center justify-center text-content-strong [&_svg]:size-full">
          <RiSearchLine />
        </span>
        <div className="flex flex-col items-center gap-[var(--space-4)] text-center">
          <span className="text-[length:var(--font-size-s)] font-[var(--font-weight-medium)] leading-[var(--line-height-s)] text-content-strong">
            {title}
          </span>
          {description && (
            <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle">
              {description}
            </span>
          )}
        </div>
      </div>
      {action && (
        <Button
          variant="tertiary"
          size="s"
          leadingIcon={action.icon}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}

export { MenuEmpty }
export type { MenuEmptyProps }
