"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Textarea } from "@soft-ui/react/textarea"
import { Field } from "@soft-ui/react/field"

export default function TextareaDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Textarea</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Multi-line text field for longer user input
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Textarea } from "@soft-ui/react/textarea"
import { Field } from "@soft-ui/react/field"

// Standalone textarea
<Textarea placeholder="Enter your message..." />

// With tertiary variant (shadow treatment)
<Textarea variant="tertiary" placeholder="Enter your message..." />

// With Field wrapper for labels and validation
<Field label="Message" description="Max 500 characters">
  <Textarea placeholder="Type your message here..." rows={4} />
</Field>

<Field label="Bio" error="Bio is required">
  <Textarea placeholder="Tell us about yourself" />
</Field>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
              <p className="text-body-m text-content-subtle">Compact padding</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea size="s" placeholder="Enter text..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
              <p className="text-body-m text-content-subtle">Default size</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea size="m" placeholder="Enter text..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
              <p className="text-body-m text-content-subtle">Spacious padding</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea size="l" placeholder="Enter text..." />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Secondary</p>
              <p className="text-body-m text-content-subtle">Default variant</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea variant="secondary" placeholder="Secondary textarea..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Tertiary</p>
              <p className="text-body-m text-content-subtle">With shadow treatment</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea variant="tertiary" placeholder="Tertiary textarea..." />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Rows</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">2 rows</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea rows={2} placeholder="Short input..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">4 rows</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea rows={4} placeholder="Medium input..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">6 rows</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea rows={6} placeholder="Longer input..." />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Resize</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Vertical</p>
              <p className="text-body-m text-content-subtle">Default behavior</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea resize="vertical" placeholder="Drag to resize vertically..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">None</p>
              <p className="text-body-m text-content-subtle">Fixed size</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea resize="none" placeholder="Cannot resize..." />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Both</p>
              <p className="text-body-m text-content-subtle">Resize in any direction</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Textarea resize="both" placeholder="Drag to resize in any direction..." />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Field</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Message">
                <Textarea placeholder="Type your message..." />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label and description</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Bio" description="Tell us a bit about yourself">
                <Textarea placeholder="I'm a software engineer who loves..." rows={4} />
              </Field>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Comments">
                <Textarea placeholder="Add your comments..." />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Comments" disabled>
                <Textarea placeholder="Add your comments..." disabled />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Comments" error="Comments are required">
                <Textarea placeholder="Add your comments..." />
              </Field>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
