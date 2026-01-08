"use client"

import * as React from "react"
import { RiAddLine } from "@remixicon/react"
import { CodeBlock } from "@/components/docs/code-block"
import { InlineNotification, type InlineNotificationTone } from "@/components/ui/inline-notification"

export default function InlineNotificationDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Inline Notification</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Static inline notifications for displaying contextual feedback messages within content areas.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { InlineNotification } from "@/components/ui/inline-notification"

// With description (card-style layout)
<InlineNotification.Root tone="success">
  <InlineNotification.Content>
    <InlineNotification.TextWrapper>
      <InlineNotification.Title>Changes saved</InlineNotification.Title>
      <InlineNotification.Description>
        Your profile has been updated successfully.
      </InlineNotification.Description>
    </InlineNotification.TextWrapper>
    <InlineNotification.Actions>
      <InlineNotification.Action>View</InlineNotification.Action>
    </InlineNotification.Actions>
  </InlineNotification.Content>
  <InlineNotification.Close />
</InlineNotification.Root>

// Without description (compact layout)
<InlineNotification.Root tone="info">
  <InlineNotification.Content>
    <InlineNotification.TextWrapper>
      <InlineNotification.Title>Update available</InlineNotification.Title>
    </InlineNotification.TextWrapper>
    <InlineNotification.Actions>
      <InlineNotification.Action>Update</InlineNotification.Action>
    </InlineNotification.Actions>
  </InlineNotification.Content>
  <InlineNotification.Close />
</InlineNotification.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Description</h2>
        <p className="text-body-m text-content-subtle">
          Use for notifications that require more context with title, description, and optional actions.
        </p>
        <div className="flex flex-col gap-[var(--space-16)]">
          {(["neutral", "info", "success", "warning", "danger"] as const).map((tone) => {
            const messages: Record<InlineNotificationTone, { title: string; description: string }> = {
              neutral: { title: "New feature available", description: "Check out the latest updates to your dashboard." },
              info: { title: "Scheduled maintenance", description: "System will be unavailable on Sunday 2-4 AM." },
              success: { title: "Payment successful", description: "Your order #12345 has been confirmed." },
              warning: { title: "Storage almost full", description: "You've used 90% of your available storage." },
              danger: { title: "Connection lost", description: "Please check your internet connection and try again." },
            }
            return (
              <InlineNotification.Root key={tone} tone={tone}>
                <InlineNotification.Content>
                  <InlineNotification.TextWrapper>
                    <InlineNotification.Title>{messages[tone].title}</InlineNotification.Title>
                    <InlineNotification.Description>{messages[tone].description}</InlineNotification.Description>
                  </InlineNotification.TextWrapper>
                  <InlineNotification.Actions>
                    <InlineNotification.Action>Action</InlineNotification.Action>
                    <InlineNotification.Action>Action</InlineNotification.Action>
                  </InlineNotification.Actions>
                </InlineNotification.Content>
                <InlineNotification.Close />
              </InlineNotification.Root>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Without Description (Compact)</h2>
        <p className="text-body-m text-content-subtle">
          Use for brief notifications that only need a title and optional actions.
        </p>
        <div className="flex flex-col gap-[var(--space-16)]">
          {(["neutral", "info", "success", "warning", "danger"] as const).map((tone) => {
            const titles: Record<InlineNotificationTone, string> = {
              neutral: "New notification",
              info: "Update available",
              success: "Changes saved",
              warning: "Session expiring soon",
              danger: "Failed to save",
            }
            return (
              <InlineNotification.Root key={tone} tone={tone}>
                <InlineNotification.Content>
                  <InlineNotification.TextWrapper>
                    <InlineNotification.Title>{titles[tone]}</InlineNotification.Title>
                  </InlineNotification.TextWrapper>
                  <InlineNotification.Actions>
                    <InlineNotification.Action>Action</InlineNotification.Action>
                    <InlineNotification.Action>Action</InlineNotification.Action>
                  </InlineNotification.Actions>
                </InlineNotification.Content>
                <InlineNotification.Close />
              </InlineNotification.Root>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Without Actions</h2>
        <p className="text-body-m text-content-subtle">
          Notifications can be displayed without action buttons.
        </p>
        <div className="flex flex-col gap-[var(--space-16)]">
          <InlineNotification.Root tone="info">
            <InlineNotification.Content>
              <InlineNotification.TextWrapper>
                <InlineNotification.Title>System update in progress</InlineNotification.Title>
                <InlineNotification.Description>
                  Some features may be temporarily unavailable while we apply the latest updates.
                </InlineNotification.Description>
              </InlineNotification.TextWrapper>
            </InlineNotification.Content>
            <InlineNotification.Close />
          </InlineNotification.Root>

          <InlineNotification.Root tone="success">
            <InlineNotification.Content>
              <InlineNotification.TextWrapper>
                <InlineNotification.Title>Email verified</InlineNotification.Title>
              </InlineNotification.TextWrapper>
            </InlineNotification.Content>
            <InlineNotification.Close />
          </InlineNotification.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Without Close Button</h2>
        <p className="text-body-m text-content-subtle">
          Notifications can be non-dismissible when appropriate.
        </p>
        <div className="flex flex-col gap-[var(--space-16)]">
          <InlineNotification.Root tone="warning">
            <InlineNotification.Content>
              <InlineNotification.TextWrapper>
                <InlineNotification.Title>Trial ending soon</InlineNotification.Title>
                <InlineNotification.Description>
                  Your free trial ends in 3 days. Upgrade now to keep your data.
                </InlineNotification.Description>
              </InlineNotification.TextWrapper>
              <InlineNotification.Actions>
                <InlineNotification.Action>Upgrade</InlineNotification.Action>
              </InlineNotification.Actions>
            </InlineNotification.Content>
          </InlineNotification.Root>

          <InlineNotification.Root tone="neutral">
            <InlineNotification.Content>
              <InlineNotification.TextWrapper>
                <InlineNotification.Title>Tip: Use keyboard shortcuts</InlineNotification.Title>
              </InlineNotification.TextWrapper>
              <InlineNotification.Actions>
                <InlineNotification.Action>Learn more</InlineNotification.Action>
              </InlineNotification.Actions>
            </InlineNotification.Content>
          </InlineNotification.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Custom Icon</h2>
        <p className="text-body-m text-content-subtle">
          Pass a custom icon via the icon prop on the Root component.
        </p>
        <div className="flex flex-col gap-[var(--space-16)]">
          <InlineNotification.Root
            tone="neutral"
            icon={
              <span className="flex size-[20px] shrink-0 items-center justify-center text-content-strong [&_svg]:size-full">
                <RiAddLine />
              </span>
            }
          >
            <InlineNotification.Content>
              <InlineNotification.TextWrapper>
                <InlineNotification.Title>Create a new project</InlineNotification.Title>
                <InlineNotification.Description>
                  Start organizing your work by creating your first project.
                </InlineNotification.Description>
              </InlineNotification.TextWrapper>
              <InlineNotification.Actions>
                <InlineNotification.Action>Create project</InlineNotification.Action>
              </InlineNotification.Actions>
            </InlineNotification.Content>
          </InlineNotification.Root>
        </div>
      </section>
    </div>
  )
}
