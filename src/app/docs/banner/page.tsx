"use client"

import * as React from "react"
import { RiSparklingLine } from "@remixicon/react"
import { CodeBlock } from "@/components/docs/code-block"
import { Banner, type BannerTone } from "@/components/ui/banner"

export default function BannerDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Banner</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Full-width notification banners for displaying important messages at the top of a page or section.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Banner } from "@/components/ui/banner"

<Banner.Root tone="info">
  <Banner.Content>
    <Banner.Title>System maintenance scheduled for tonight</Banner.Title>
    <Banner.Actions>
      <Banner.Action>Learn more</Banner.Action>
    </Banner.Actions>
  </Banner.Content>
  <Banner.Close />
</Banner.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Tones</h2>
        <p className="text-body-m text-content-subtle">
          Banners support different tones to convey the nature of the message.
        </p>
        <div className="flex flex-col gap-[var(--space-16)]">
          {(["neutral", "info", "success", "warning", "danger"] as const).map((tone) => {
            const messages: Record<BannerTone, string> = {
              neutral: "New feature: Dark mode is now available in settings",
              info: "System maintenance scheduled for tonight at 11 PM",
              success: "Your subscription has been renewed successfully",
              warning: "Your storage is almost full. Upgrade to get more space",
              danger: "Payment failed. Please update your billing information",
            }
            return (
              <Banner.Root key={tone} tone={tone}>
                <Banner.Content>
                  <Banner.Title>{messages[tone]}</Banner.Title>
                  <Banner.Actions>
                    <Banner.Action>Action</Banner.Action>
                    <Banner.Action>Action</Banner.Action>
                  </Banner.Actions>
                </Banner.Content>
                <Banner.Close />
              </Banner.Root>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Without Actions</h2>
        <p className="text-body-m text-content-subtle">
          Banners can display informational messages without action buttons.
        </p>
        <Banner.Root tone="info">
          <Banner.Content>
            <Banner.Title>We&apos;re updating our privacy policy on January 1st</Banner.Title>
          </Banner.Content>
          <Banner.Close />
        </Banner.Root>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Without Close Button</h2>
        <p className="text-body-m text-content-subtle">
          Use non-dismissible banners for critical information that users must acknowledge through an action.
        </p>
        <Banner.Root tone="warning">
          <Banner.Content>
            <Banner.Title>Your trial expires in 3 days</Banner.Title>
            <Banner.Actions>
              <Banner.Action>Upgrade now</Banner.Action>
              <Banner.Action>View plans</Banner.Action>
            </Banner.Actions>
          </Banner.Content>
        </Banner.Root>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Custom Icon</h2>
        <p className="text-body-m text-content-subtle">
          Pass a custom icon via the icon prop on the Root component.
        </p>
        <Banner.Root
          tone="neutral"
          icon={
            <span className="flex size-[20px] shrink-0 items-center justify-center text-content-strong [&_svg]:size-full">
              <RiSparklingLine />
            </span>
          }
        >
          <Banner.Content>
            <Banner.Title>Introducing AI-powered suggestions</Banner.Title>
            <Banner.Actions>
              <Banner.Action>Try it now</Banner.Action>
            </Banner.Actions>
          </Banner.Content>
          <Banner.Close />
        </Banner.Root>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Dismissible Banner</h2>
        <p className="text-body-m text-content-subtle">
          Use the onClose callback to handle dismissal.
        </p>
        <DismissibleBannerDemo />
      </section>
    </div>
  )
}

function DismissibleBannerDemo() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) {
    return (
      <div className="flex items-center gap-[var(--space-12)] rounded-[var(--radius-12)] border border-border-muted p-[var(--space-16)]">
        <p className="text-body-m text-content-subtle">Banner dismissed.</p>
        <button
          onClick={() => setIsVisible(true)}
          className="text-body-m-medium text-content-link-default hover:text-content-link-hover"
        >
          Show again
        </button>
      </div>
    )
  }

  return (
    <Banner.Root tone="success">
      <Banner.Content>
        <Banner.Title>Your profile is now complete!</Banner.Title>
        <Banner.Actions>
          <Banner.Action>View profile</Banner.Action>
        </Banner.Actions>
      </Banner.Content>
      <Banner.Close onClose={() => setIsVisible(false)} />
    </Banner.Root>
  )
}
