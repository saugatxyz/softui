"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Toast, useToastManager, type ToastTone } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ToastDocsPage() {
  return (
    <Toast.Provider>
      <ToastDocsContent />
      <Toast.Portal>
        <Toast.Viewport position="bottom-right">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}

function ToastList() {
  const { toasts } = useToastManager()

  return toasts.map((toast) => {
    const tone = (toast.type as ToastTone) || "default"
    const hasDescription = Boolean(toast.description)

    // Card variant (with description)
    if (hasDescription) {
      return (
        <Toast.Root key={toast.id} toast={toast} variant="card">
          <Toast.Content>
            <Toast.Icon tone={tone} />
            <Toast.TextWrapper>
              <Toast.Title>{toast.title}</Toast.Title>
              <Toast.Description>{toast.description}</Toast.Description>
              {toast.actionProps && (
                <Toast.Actions>
                  <Toast.Action {...toast.actionProps} />
                </Toast.Actions>
              )}
            </Toast.TextWrapper>
            <Toast.Close />
          </Toast.Content>
        </Toast.Root>
      )
    }

    // Compact variant (without description)
    return (
      <Toast.Root key={toast.id} toast={toast} variant="compact">
        <Toast.CompactContent>
          <Toast.Icon tone={tone} />
          <Toast.CompactTextWrapper>
            <Toast.Title>{toast.title}</Toast.Title>
          </Toast.CompactTextWrapper>
          {toast.actionProps && (
            <Toast.CompactActions>
              <Toast.CompactAction {...toast.actionProps} />
            </Toast.CompactActions>
          )}
          <Toast.Close />
        </Toast.CompactContent>
      </Toast.Root>
    )
  })
}

function ToastDocsContent() {
  const toastManager = useToastManager()

  // Card variant toasts (with description)
  const cardMessages: Record<ToastTone, { title: string; description: string }> = {
    default: { title: "New message received", description: "You have 3 unread messages in your inbox." },
    info: { title: "Scheduled maintenance", description: "System will be unavailable on Sunday 2-4 AM." },
    success: { title: "Payment successful", description: "Your order #12345 has been confirmed." },
    warning: { title: "Storage almost full", description: "You've used 90% of your available storage." },
    danger: { title: "Connection lost", description: "Please check your internet connection and try again." },
  }

  const showCardToast = (tone: ToastTone) => {
    toastManager.add({
      title: cardMessages[tone].title,
      description: cardMessages[tone].description,
      type: tone === "default" ? undefined : tone,
    })
  }

  const showCardToastWithActions = () => {
    toastManager.add({
      title: "File uploaded",
      description: "Your file has been successfully uploaded.",
      type: "success",
      actionProps: {
        children: "View",
        onClick: () => console.log("View clicked"),
      },
    })
  }

  // Compact variant toasts (without description)
  const compactMessages: Record<ToastTone, string> = {
    default: "New notification",
    info: "Update available",
    success: "Changes saved",
    warning: "Session expiring soon",
    danger: "Failed to save",
  }

  const showCompactToast = (tone: ToastTone) => {
    toastManager.add({
      title: compactMessages[tone],
      type: tone === "default" ? undefined : tone,
    })
  }

  const showCompactToastWithActions = () => {
    toastManager.add({
      title: "Changes saved",
      type: "success",
      actionProps: {
        children: "Undo",
        onClick: () => console.log("Undo clicked"),
      },
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Toast</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Toast notifications for displaying brief, non-blocking messages to users.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Toast, useToastManager } from "@/components/ui/toast"

// Wrap your app with Toast.Provider
<Toast.Provider>
  <App />
  <Toast.Portal>
    <Toast.Viewport position="bottom-right">
      <ToastList />
    </Toast.Viewport>
  </Toast.Portal>
</Toast.Provider>

// Render toasts by mapping over the toasts array
function ToastList() {
  const { toasts } = useToastManager()

  return toasts.map((toast) => {
    const hasDescription = Boolean(toast.description)

    // Card variant (with description)
    if (hasDescription) {
      return (
        <Toast.Root key={toast.id} toast={toast} variant="card">
          <Toast.Content>
            <Toast.Icon tone={toast.type} />
            <Toast.TextWrapper>
              <Toast.Title>{toast.title}</Toast.Title>
              <Toast.Description>{toast.description}</Toast.Description>
              <Toast.Actions>
                <Toast.Action>Action</Toast.Action>
              </Toast.Actions>
            </Toast.TextWrapper>
            <Toast.Close />
          </Toast.Content>
        </Toast.Root>
      )
    }

    // Compact variant (without description)
    return (
      <Toast.Root key={toast.id} toast={toast} variant="compact">
        <Toast.CompactContent>
          <Toast.Icon tone={toast.type} />
          <Toast.CompactTextWrapper>
            <Toast.Title>{toast.title}</Toast.Title>
          </Toast.CompactTextWrapper>
          <Toast.CompactActions>
            <Toast.CompactAction>Action</Toast.CompactAction>
          </Toast.CompactActions>
          <Toast.Close />
        </Toast.CompactContent>
      </Toast.Root>
    )
  })
}`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Card Variant</h2>
        <div className="flex flex-col">
          {(["default", "info", "success", "warning", "danger"] as const).map((tone) => (
            <div key={tone} className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong capitalize">{tone}</p>
              </div>
              <div className="flex flex-1 justify-end">
                <Button variant="secondary" onClick={() => showCardToast(tone)}>
                  Show {tone} toast
                </Button>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">With action</p>
            </div>
            <div className="flex flex-1 justify-end">
              <Button variant="secondary" onClick={showCardToastWithActions}>
                Show toast with action
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Compact Variant</h2>
        <div className="flex flex-col">
          {(["default", "info", "success", "warning", "danger"] as const).map((tone) => (
            <div key={tone} className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong capitalize">{tone}</p>
              </div>
              <div className="flex flex-1 justify-end">
                <Button variant="secondary" onClick={() => showCompactToast(tone)}>
                  Show {tone} compact
                </Button>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[200px]">
              <p className="text-body-m text-content-strong">With action</p>
            </div>
            <div className="flex flex-1 justify-end">
              <Button variant="secondary" onClick={showCompactToastWithActions}>
                Show compact with action
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Static Card</h2>
        <div className="flex flex-col">
          {([
            { tone: "default" as const, title: "New message received", description: "You have 3 unread messages in your inbox." },
            { tone: "info" as const, title: "Scheduled maintenance", description: "System will be unavailable on Sunday 2-4 AM." },
            { tone: "success" as const, title: "Payment successful", description: "Your order #12345 has been confirmed." },
            { tone: "warning" as const, title: "Storage almost full", description: "You've used 90% of your available storage." },
            { tone: "danger" as const, title: "Connection lost", description: "Please check your internet connection." },
          ]).map(({ tone, title, description }) => (
            <div
              key={tone}
              className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between"
            >
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong capitalize">{tone}</p>
              </div>
              <div className="flex flex-1 justify-end">
                <div className="relative w-full max-w-[400px] overflow-hidden rounded-[17px] bg-surface-overlay shadow-[var(--shadow-modal)] before:absolute before:inset-0 before:-z-10 before:rounded-[17px] before:bg-surface-canvas">
                  <div className="flex items-start gap-[var(--space-12)] rounded-b-[var(--radius-8)] bg-surface-overlay p-[var(--space-16)] shadow-[var(--shadow-modal-content)]">
                    <Toast.Icon tone={tone} />
                    <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-4)]">
                      <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">{title}</p>
                      <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">{description}</p>
                      <div className="flex items-center gap-[var(--space-8)] pt-[var(--space-16)]">
                        <Button variant="tertiary" size="xs">View</Button>
                        <Button variant="tertiary" size="xs">Dismiss</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Static Compact</h2>
        <div className="flex flex-col">
          {([
            { tone: "default" as const, title: "Copied to clipboard" },
            { tone: "info" as const, title: "Update available", action: "Update" },
            { tone: "success" as const, title: "Saved" },
            { tone: "warning" as const, title: "Session expiring", action: "Extend" },
            { tone: "danger" as const, title: "Failed", action: "Retry" },
          ]).map(({ tone, title, action }) => (
            <div
              key={tone}
              className="flex flex-col gap-[var(--space-12)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[200px]">
                <p className="text-body-m text-content-strong capitalize">{tone}</p>
              </div>
              <div className="flex flex-1 justify-end">
                <div className="relative flex w-fit items-center overflow-hidden rounded-[var(--radius-max)] bg-surface-overlay shadow-[var(--shadow-modal)] before:absolute before:inset-0 before:-z-10 before:rounded-[var(--radius-max)] before:bg-surface-canvas">
                  <div className={cn(
                    "flex h-[36px] items-center gap-[var(--space-8)] bg-surface-overlay pl-[var(--space-12)] shadow-[var(--shadow-modal-content)]",
                    action ? "pr-[var(--space-12)]" : "pr-[var(--space-16)]"
                  )}>
                    <Toast.Icon tone={tone} />
                    <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">{title}</p>
                    {action && (
                      <>
                        <span className="h-[12px] w-px bg-border-subtle" />
                        <Button variant="link-neutral" size="xs">{action}</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
