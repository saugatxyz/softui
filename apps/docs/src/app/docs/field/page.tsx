"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Field } from "@soft-ui/react/field"
import { Input } from "@soft-ui/react/input"
import { SelectDemo } from "@/components/docs/select-demo"
import { RiMailLine } from "@remixicon/react"

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
]

export default function FieldDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Field</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Wrapper component that provides labels, descriptions, and error states for form controls.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Field } from "@soft-ui/react/field"
import { Input } from "@soft-ui/react/input"
import { Select } from "@soft-ui/react/select"

// Basic usage with Input
<Field label="Email">
  <Input placeholder="you@example.com" />
</Field>

// With description
<Field label="Email" description="We'll never share your email">
  <Input placeholder="you@example.com" />
</Field>

// With error state
<Field label="Email" error="Please enter a valid email">
  <Input placeholder="you@example.com" />
</Field>

// With any form control
<Field label="Country">
  <Select defaultValue="us">
    <Select.Trigger>
      <Select.Value>
        {(value) => (value ? countries.find((c) => c.value === value)?.label : "Select country")}
      </Select.Value>
      <Select.Icon />
    </Select.Trigger>
    <Select.Portal>
      <Select.Positioner>
        <Select.Popup>
          <Select.List>
            {countries.map((country) => (
              <Select.Item key={country.value} value={country.value}>
                <Select.ItemText>{country.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.List>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  </Select>
</Field>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
              <p className="text-body-m text-content-subtle">Simple field label above control</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Email">
                <Input placeholder="you@example.com" />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With description</p>
              <p className="text-body-m text-content-subtle">Additional context below label</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Email" description="We'll never share your email with anyone">
                <Input placeholder="you@example.com" />
              </Field>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
              <p className="text-body-m text-content-subtle">Smaller label text</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field size="s" label="Email" description="Help text">
                <Input size="s" placeholder="you@example.com" />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
              <p className="text-body-m text-content-subtle">Default size</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field size="m" label="Email" description="Help text">
                <Input size="m" placeholder="you@example.com" />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
              <p className="text-body-m text-content-subtle">Larger touch targets</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field size="l" label="Email" description="Help text">
                <Input size="l" placeholder="you@example.com" />
              </Field>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Input Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Secondary input</p>
              <p className="text-body-m text-content-subtle">Default input variant</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Email">
                <Input variant="secondary" placeholder="you@example.com" />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Tertiary input</p>
              <p className="text-body-m text-content-subtle">With shadow treatment</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Email">
                <Input variant="tertiary" placeholder="you@example.com" />
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
              <Field label="Email">
                <Input placeholder="you@example.com" leadingIcon={<RiMailLine />} />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
              <p className="text-body-m text-content-subtle">Muted label and control</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Email" disabled>
                <Input placeholder="you@example.com" leadingIcon={<RiMailLine />} disabled />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
              <p className="text-body-m text-content-subtle">Validation error message</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Email" error="Please enter a valid email address">
                <Input placeholder="you@example.com" leadingIcon={<RiMailLine />} />
              </Field>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Different Controls</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With Input</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Full name" description="Enter your legal name">
                <Input defaultValue="John Doe" />
              </Field>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With Select</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Field label="Country" description="Where is your business located?">
                <SelectDemo options={countries} defaultValue="us" placeholder="Select country" />
              </Field>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Form Example</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Registration form</p>
              <p className="text-body-m text-content-subtle">Multiple fields together</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-24)]">
              <Field label="Email" description="We'll send a confirmation link">
                <Input placeholder="you@example.com" type="email" />
              </Field>
              <Field label="Country">
              <SelectDemo options={countries} placeholder="Select country" />
              </Field>
              <Field label="Password" error="Password must be at least 8 characters">
                <Input placeholder="Enter password" type="password" />
              </Field>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
