"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Form } from "@/components/ui/form"
import { Field } from "@/components/ui/field"
import { Fieldset } from "@/components/ui/fieldset"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
]

export default function FormDocsPage() {
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const handleSubmit = (formValues: Record<string, unknown>) => {
    // Example validation
    const newErrors: Record<string, string> = {}
    if (!formValues.email) {
      newErrors.email = "Email is required"
    }
    if (!formValues.password) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Form</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A native form element with consolidated error handling and validation modes.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Form } from "@/components/ui/form"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Basic form
<Form onFormSubmit={(values) => console.log(values)}>
  <Field label="Email" name="email">
    <Input name="email" placeholder="you@example.com" />
  </Field>
  <Button type="submit">Submit</Button>
</Form>

// With server errors
<Form
  errors={{ email: "This email is already taken" }}
  onFormSubmit={handleSubmit}
>
  ...
</Form>

// Validation modes
<Form validationMode="onBlur">...</Form>
<Form validationMode="onChange">...</Form>
<Form validationMode="onSubmit">...</Form>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Simple form</p>
              <p className="text-body-s text-content-subtle">Basic form with fields</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form onFormSubmit={(values) => console.log(values)}>
                <Field label="Email">
                  <Input name="email" type="email" placeholder="you@example.com" focusVisibleOnly />
                </Field>
                <Field label="Password">
                  <Input name="password" type="password" placeholder="Enter password" focusVisibleOnly />
                </Field>
                <Button type="submit">Sign in</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Fieldset</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Grouped fields</p>
              <p className="text-body-s text-content-subtle">Using Fieldset for sections</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form>
                <Fieldset>
                  <Fieldset.Legend>Personal Information</Fieldset.Legend>
                  <Field label="Full name">
                    <Input name="name" placeholder="John Doe" focusVisibleOnly />
                  </Field>
                  <Field label="Email">
                    <Input name="email" type="email" placeholder="you@example.com" focusVisibleOnly />
                  </Field>
                </Fieldset>
                <Fieldset>
                  <Fieldset.Legend>Address</Fieldset.Legend>
                  <Field label="Street">
                    <Input name="street" placeholder="123 Main St" focusVisibleOnly />
                  </Field>
                  <Field label="Country">
                    <Select options={countries} placeholder="Select country" />
                  </Field>
                </Fieldset>
                <Button type="submit">Save</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Errors</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Server validation</p>
              <p className="text-body-s text-content-subtle">Errors from external source</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form errors={errors} onFormSubmit={handleSubmit}>
                <Field label="Email" error={errors.email}>
                  <Input name="email" type="email" placeholder="you@example.com" focusVisibleOnly />
                </Field>
                <Field label="Password" error={errors.password}>
                  <Input name="password" type="password" placeholder="Enter password" focusVisibleOnly />
                </Field>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Validation Modes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">onSubmit</p>
              <p className="text-body-s text-content-subtle">Default, validates on submit</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form validationMode="onSubmit">
                <Field label="Email">
                  <Input name="email" type="email" placeholder="you@example.com" focusVisibleOnly />
                </Field>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">onBlur</p>
              <p className="text-body-s text-content-subtle">Validates when field loses focus</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form validationMode="onBlur">
                <Field label="Email">
                  <Input name="email" type="email" placeholder="you@example.com" focusVisibleOnly />
                </Field>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">onChange</p>
              <p className="text-body-s text-content-subtle">Validates on every change</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form validationMode="onChange">
                <Field label="Email">
                  <Input name="email" type="email" placeholder="you@example.com" focusVisibleOnly />
                </Field>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
