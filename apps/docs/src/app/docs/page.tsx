import Link from "next/link"

import { WelcomeCards } from "@/components/docs/welcome-cards"
import { buttonVariants } from "@soft-ui/react/button"
import { HomeIcon } from "@soft-ui/icons"
import { cn } from "@/lib/utils"

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
        <WelcomeCards />
      </section>
    </div>
  )
}
