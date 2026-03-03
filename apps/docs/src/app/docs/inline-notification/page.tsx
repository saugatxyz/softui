"use client"

import * as React from "react"
import { RiAddLine } from "@remixicon/react"
import { CodeBlock } from "@/components/docs/code-block"
import { InlineNotification } from "@soft-ui/react/inline-notification"

const toneRows = [
  { value: "neutral", label: "Neutral", description: "General information", title: "New feature available", message: "Check out the latest updates to your dashboard." },
  { value: "info", label: "Info", description: "Helpful context", title: "Scheduled maintenance", message: "System will be unavailable on Sunday 2-4 AM." },
  { value: "success", label: "Success", description: "Positive outcome", title: "Payment successful", message: "Your order #12345 has been confirmed." },
  { value: "warning", label: "Warning", description: "Caution needed", title: "Storage almost full", message: "You've used 90% of your available storage." },
  { value: "danger", label: "Danger", description: "Error or critical", title: "Connection lost", message: "Please check your internet connection and try again." },
] as const

const compactToneRows = [
  { value: "neutral", label: "Neutral", title: "New notification" },
  { value: "info", label: "Info", title: "Update available" },
  { value: "success", label: "Success", title: "Changes saved" },
  { value: "warning", label: "Warning", title: "Session expiring soon" },
  { value: "danger", label: "Danger", title: "Failed to save" },
] as const

export default function InlineNotificationDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Inline Notification</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Static inline notifications for displaying contextual feedback messages within content areas.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { InlineNotification } from "@soft-ui/react/inline-notification"

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
</InlineNotification.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Tones</h2>
        <div className="flex flex-col">
          {toneRows.map((tone) => (
            <div
              key={tone.value}
              className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between"
            >
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong">{tone.label}</p>
                <p className="text-body-m text-content-subtle">{tone.description}</p>
              </div>
              <div className="flex-1">
                <InlineNotification.Root tone={tone.value}>
                  <InlineNotification.Content>
                    <InlineNotification.TextWrapper>
                      <InlineNotification.Title>{tone.title}</InlineNotification.Title>
                      <InlineNotification.Description>{tone.message}</InlineNotification.Description>
                    </InlineNotification.TextWrapper>
                    <InlineNotification.Actions>
                      <InlineNotification.Action>Action</InlineNotification.Action>
                    </InlineNotification.Actions>
                  </InlineNotification.Content>
                  <InlineNotification.Close />
                </InlineNotification.Root>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Filled</h2>
          <p className="text-body-m text-content-subtle">
            Colored backgrounds that match the notification tone.
          </p>
        </div>
        <div className="flex flex-col">
          {toneRows.map((tone) => (
            <div
              key={tone.value}
              className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between"
            >
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong">{tone.label}</p>
                <p className="text-body-m text-content-subtle">{tone.description}</p>
              </div>
              <div className="flex-1">
                <InlineNotification.Root tone={tone.value} variant="filled">
                  <InlineNotification.Content>
                    <InlineNotification.TextWrapper>
                      <InlineNotification.Title>{tone.title}</InlineNotification.Title>
                      <InlineNotification.Description>{tone.message}</InlineNotification.Description>
                    </InlineNotification.TextWrapper>
                    <InlineNotification.Actions>
                      <InlineNotification.Action>Action</InlineNotification.Action>
                    </InlineNotification.Actions>
                  </InlineNotification.Content>
                  <InlineNotification.Close />
                </InlineNotification.Root>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Filled Compact</h2>
          <p className="text-body-m text-content-subtle">
            Colored backgrounds without description.
          </p>
        </div>
        <div className="flex flex-col">
          {compactToneRows.map((tone) => (
            <div
              key={tone.value}
              className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between"
            >
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong">{tone.label}</p>
              </div>
              <div className="flex-1">
                <InlineNotification.Root tone={tone.value} variant="filled">
                  <InlineNotification.Content>
                    <InlineNotification.TextWrapper>
                      <InlineNotification.Title>{tone.title}</InlineNotification.Title>
                    </InlineNotification.TextWrapper>
                    <InlineNotification.Actions>
                      <InlineNotification.Action>Action</InlineNotification.Action>
                    </InlineNotification.Actions>
                  </InlineNotification.Content>
                  <InlineNotification.Close />
                </InlineNotification.Root>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Compact</h2>
          <p className="text-body-m text-content-subtle">
            Without description for brief notifications.
          </p>
        </div>
        <div className="flex flex-col">
          {compactToneRows.map((tone) => (
            <div
              key={tone.value}
              className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between"
            >
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong">{tone.label}</p>
              </div>
              <div className="flex-1">
                <InlineNotification.Root tone={tone.value}>
                  <InlineNotification.Content>
                    <InlineNotification.TextWrapper>
                      <InlineNotification.Title>{tone.title}</InlineNotification.Title>
                    </InlineNotification.TextWrapper>
                    <InlineNotification.Actions>
                      <InlineNotification.Action>Action</InlineNotification.Action>
                    </InlineNotification.Actions>
                  </InlineNotification.Content>
                  <InlineNotification.Close />
                </InlineNotification.Root>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Without Actions</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">With description</p>
              <p className="text-body-m text-content-subtle">Informational only</p>
            </div>
            <div className="flex-1">
              <InlineNotification.Root tone="info">
                <InlineNotification.Content>
                  <InlineNotification.TextWrapper>
                    <InlineNotification.Title>System update in progress</InlineNotification.Title>
                    <InlineNotification.Description>
                      Some features may be temporarily unavailable while we apply updates.
                    </InlineNotification.Description>
                  </InlineNotification.TextWrapper>
                </InlineNotification.Content>
                <InlineNotification.Close />
              </InlineNotification.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">Compact</p>
              <p className="text-body-m text-content-subtle">Title only</p>
            </div>
            <div className="flex-1">
              <InlineNotification.Root tone="success">
                <InlineNotification.Content>
                  <InlineNotification.TextWrapper>
                    <InlineNotification.Title>Email verified</InlineNotification.Title>
                  </InlineNotification.TextWrapper>
                </InlineNotification.Content>
                <InlineNotification.Close />
              </InlineNotification.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Without Close Button</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">Persistent</p>
              <p className="text-body-m text-content-subtle">Non-dismissible notification</p>
            </div>
            <div className="flex-1">
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
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Custom Icon</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">Override default icon</p>
              <p className="text-body-m text-content-subtle">Pass icon prop to Root</p>
            </div>
            <div className="flex-1">
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
          </div>
        </div>
      </section>
    </div>
  )
}
