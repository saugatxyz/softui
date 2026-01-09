"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { NumberField } from "@/components/ui/number-field"
import { Field } from "@/components/ui/field"

export default function NumberFieldDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Number Field</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A numeric input with increment and decrement buttons
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { NumberField } from "@/components/ui/number-field"

<NumberField.Root defaultValue={0}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
              <p className="text-body-m text-content-subtle">32px height</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root size="s" defaultValue={5}>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
              <p className="text-body-m text-content-subtle">36px height</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root size="m" defaultValue={10}>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
              <p className="text-body-m text-content-subtle">40px height</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root size="l" defaultValue={15}>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Min and Max</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With bounds</p>
              <p className="text-body-m text-content-subtle">Range 0-100</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root defaultValue={50} min={0} max={100}>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Step</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Step by 5</p>
              <p className="text-body-m text-content-subtle">Increment/decrement by 5</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root defaultValue={0} step={5}>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Decimal step</p>
              <p className="text-body-m text-content-subtle">Step by 0.1</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root defaultValue={0} step={0.1}>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Field</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label and description</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <Field label="Quantity" description="Max 10 items">
                <NumberField.Root defaultValue={1} min={1} max={10}>
                  <NumberField.Group>
                    <NumberField.Decrement />
                    <NumberField.Input />
                    <NumberField.Increment />
                  </NumberField.Group>
                </NumberField.Root>
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
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root defaultValue={5}>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root defaultValue={5} disabled>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Read only</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root defaultValue={5} readOnly>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Scrub Area</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Drag to adjust</p>
              <p className="text-body-m text-content-subtle">Click and drag the label</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root defaultValue={50}>
                <NumberField.ScrubArea>
                  <span className="cursor-ew-resize text-body-m text-content-subtle">
                    Opacity
                  </span>
                </NumberField.ScrubArea>
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Formatting</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Currency</p>
              <p className="text-body-m text-content-subtle">USD format</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root
                defaultValue={99.99}
                format={{ style: "currency", currency: "USD" }}
              >
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Percentage</p>
            </div>
            <div className="flex flex-col gap-[var(--space-16)]">
              <NumberField.Root
                defaultValue={0.5}
                step={0.01}
                format={{ style: "percent" }}
              >
                <NumberField.Group>
                  <NumberField.Decrement />
                  <NumberField.Input />
                  <NumberField.Increment />
                </NumberField.Group>
              </NumberField.Root>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
