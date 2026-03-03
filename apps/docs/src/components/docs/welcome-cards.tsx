"use client"

import Link from "next/link"

import { AiGenerate3dIcon, HashtagIcon } from "@soft-ui/icons"
import { navSections } from "@/components/docs/nav-sections"

const componentsHref =
  navSections.find((section) => section.title === "Components")?.items[0]
    ?.href ?? "/docs/button"

const quickLinks = [
  {
    title: "Tokens",
    description: "Foundational blocks of design system",
    href: "/docs/tokens/colors",
    icon: HashtagIcon,
  },
  {
    title: "Components",
    description: "Built on top of Shadcn and BaseUI.",
    href: componentsHref,
    icon: AiGenerate3dIcon,
  },
]

export function WelcomeCards() {
  return (
    <div className="grid gap-[var(--space-4)] md:grid-cols-2">
      {quickLinks.map((link) => (
        <div key={link.href}>
          <Link
            href={link.href}
            className="flex flex-col gap-[var(--space-24)] rounded-[var(--radius-12)] bg-surface-interactive-default p-[var(--space-16)] transition hover:bg-surface-interactive-hover"
          >
            <div className="flex size-[20px] items-center justify-center text-content-strong">
              <link.icon className="size-[20px]" />
            </div>
            <div className="flex flex-col gap-[var(--space-4)]">
              <div className="text-body-m-medium text-content-strong">
                {link.title}
              </div>
              <p className="text-body-s text-content-subtle">
                {link.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
