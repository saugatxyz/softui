"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxControl } from "@/components/ui/checkbox-control"

export default function CheckboxDocsPage() {
  const [items, setItems] = React.useState([
    { id: "email", label: "Email notifications", checked: true },
    { id: "push", label: "Push notifications", checked: false },
    { id: "sms", label: "SMS notifications", checked: false },
  ])

  const allChecked = items.every((item) => item.checked)
  const someChecked = items.some((item) => item.checked)
  const isIndeterminate = someChecked && !allChecked

  const handleSelectAll = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })))
  }

  const handleItemChange = (id: string, checked: boolean) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked } : item)))
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Checkbox</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Form control for selecting one or more options from a set
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxControl } from "@/components/ui/checkbox-control"

<Checkbox label="Accept terms and conditions" />
<Checkbox
  label="Subscribe to newsletter"
  description="We'll send you updates about new features"
/>
<CheckboxControl />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Checkbox Control</h2>
          <p className="text-body-m text-content-subtle">
            The core checkbox indicator without label or description.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Unchecked</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxControl />
              <CheckboxControl disabled />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Checked</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxControl checked onCheckedChange={() => {}} />
              <CheckboxControl checked disabled onCheckedChange={() => {}} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Indeterminate</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <CheckboxControl indeterminate />
              <CheckboxControl indeterminate disabled />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Label</h2>
          <p className="text-body-m text-content-subtle">
            Use the label prop for side-by-side alignment.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Checkbox label="Enable notifications" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Checked</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Checkbox label="Enable notifications" defaultChecked />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Checkbox label="Enable notifications" disabled />
              <Checkbox label="Enable notifications" disabled defaultChecked />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Description</h2>
          <p className="text-body-m text-content-subtle">
            Use the description prop for supporting text.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Checkbox
                label="Marketing emails"
                description="Receive updates about new products and features"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Checked</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Checkbox
                label="Marketing emails"
                description="Receive updates about new products and features"
                defaultChecked
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-16)]">
              <Checkbox
                label="Marketing emails"
                description="Receive updates about new products and features"
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Indeterminate</h2>
          <p className="text-body-m text-content-subtle">
            Shows partial selection when some but not all items are checked.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Nested checkbox</p>
              <p className="text-body-m text-content-subtle">
                {allChecked ? "All selected" : isIndeterminate ? "Some selected" : "None selected"}
              </p>
            </div>
            <div className="flex w-full max-w-xs flex-col gap-[var(--space-8)]">
              <Checkbox
                label="Select all notifications"
                checked={allChecked}
                indeterminate={isIndeterminate}
                onCheckedChange={handleSelectAll}
              />
              <div className="flex flex-col gap-[var(--space-4)] pl-[var(--space-28)]">
                {items.map((item) => (
                  <Checkbox
                    key={item.id}
                    label={item.label}
                    checked={item.checked}
                    onCheckedChange={(checked) => handleItemChange(item.id, checked as boolean)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
