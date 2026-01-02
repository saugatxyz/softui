import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { AiGenerate3dIcon, HashtagIcon, HomeIcon } from "@/icons"
import { cn } from "@/lib/utils"

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
    href: "/docs/button",
    icon: AiGenerate3dIcon,
  },
]

export default function DocsWelcomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex size-[32px] items-center justify-center text-content-strong">
          <HomeIcon className="size-8" />
        </div>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">SoftUI</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Designed by{" "}
            <Link
              href="https://saugat.xyz/"
              className={cn(
                buttonVariants({ variant: "link-neutral", size: "m" }),
                "h-auto px-0 py-0 text-body-l font-[var(--font-weight-default)] leading-[var(--line-height-l)]"
              )}
            >
              Saugat
            </Link>
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Get started</h2>
        <div className="grid gap-[var(--space-4)] md:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
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
          ))}
        </div>
      </section>
    </div>
  )
}
