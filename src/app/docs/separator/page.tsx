"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Separator } from "@/components/ui/separator"

export default function SeparatorDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Separator</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A visual divider that separates content. Accessible to screen readers.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Separator } from "@/components/ui/separator"

// Horizontal separator (default)
<Separator />

// Vertical separator
<Separator orientation="vertical" />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Orientation</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Horizontal</p>
              <p className="text-body-s text-content-subtle">Default orientation</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <div className="flex flex-col gap-[var(--space-16)]">
                <p className="text-body-m text-content-strong">Section One</p>
                <Separator />
                <p className="text-body-m text-content-strong">Section Two</p>
                <Separator />
                <p className="text-body-m text-content-strong">Section Three</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
              <p className="text-body-s text-content-subtle">For inline content</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <div className="flex h-[20px] items-center gap-[var(--space-16)]">
                <span className="text-body-m text-content-strong">Home</span>
                <Separator orientation="vertical" />
                <span className="text-body-m text-content-strong">Products</span>
                <Separator orientation="vertical" />
                <span className="text-body-m text-content-strong">About</span>
                <Separator orientation="vertical" />
                <span className="text-body-m text-content-strong">Contact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Use Cases</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">In a card</p>
              <p className="text-body-s text-content-subtle">Dividing card sections</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <div className="flex flex-col rounded-[var(--radius-12)] border border-border-muted p-[var(--space-20)]">
                <div className="flex flex-col gap-[var(--space-4)]">
                  <p className="text-body-m-semibold text-content-strong">Account Settings</p>
                  <p className="text-body-s text-content-subtle">Manage your account preferences</p>
                </div>
                <Separator className="my-[var(--space-16)]" />
                <div className="flex flex-col gap-[var(--space-8)]">
                  <p className="text-body-s text-content-strong">Email notifications</p>
                  <p className="text-body-s text-content-subtle">Receive updates about your account</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Toolbar</p>
              <p className="text-body-s text-content-subtle">Separating action groups</p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-[var(--space-16)]">
              <div className="flex h-[40px] items-center gap-[var(--space-8)] rounded-[var(--radius-8)] border border-border-muted px-[var(--space-12)]">
                <span className="text-body-s text-content-subtle">Bold</span>
                <span className="text-body-s text-content-subtle">Italic</span>
                <span className="text-body-s text-content-subtle">Underline</span>
                <Separator orientation="vertical" className="mx-[var(--space-4)] h-[20px]" />
                <span className="text-body-s text-content-subtle">Left</span>
                <span className="text-body-s text-content-subtle">Center</span>
                <span className="text-body-s text-content-subtle">Right</span>
                <Separator orientation="vertical" className="mx-[var(--space-4)] h-[20px]" />
                <span className="text-body-s text-content-subtle">Link</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
