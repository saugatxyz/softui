"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { AiGenerate3dIcon, HashtagIcon } from "@/icons"
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

const cardContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

export function WelcomeCards() {
  return (
    <motion.div
      className="grid gap-[var(--space-4)] md:grid-cols-2"
      variants={cardContainerVariants}
      initial="hidden"
      animate="show"
    >
      {quickLinks.map((link) => (
        <motion.div key={link.href} variants={cardItemVariants}>
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
        </motion.div>
      ))}
    </motion.div>
  )
}
