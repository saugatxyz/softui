import Link from "next/link"

import { HomeIcon } from "@/icons"

const quickLinks = [
  {
    title: "Tokens",
    description: "Start with colors, spacing, radius, and type foundations.",
    href: "/docs/tokens/colors",
  },
  {
    title: "Components",
    description: "Browse the skinned shadcn components built on Base UI.",
    href: "/docs/button",
  },
]

export default function DocsWelcomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-24)] py-[var(--space-32)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex size-[20px] items-center justify-center text-content-strong">
          <HomeIcon className="size-5" />
        </div>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Soft UI</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Welcome to the Soft UI design system. Use the tokens to align with
            the visual language, then pull components that already respect those
            foundations.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Get started</h2>
        <div className="flex flex-col">
          {quickLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col gap-[var(--space-6)] py-[var(--space-24)] ${
                index === quickLinks.length - 1
                  ? ""
                  : "border-b border-border-subtle"
              }`}
            >
              <div className="text-body-m-medium text-content-strong">
                {link.title}
              </div>
              <p className="text-body-s text-content-subtle">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
