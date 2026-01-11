"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Form } from "@/components/ui/form"
import { Field } from "@/components/ui/field"
import { Fieldset } from "@/components/ui/fieldset"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SelectDemo } from "@/components/docs/select-demo"

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
]

const required = (label: string) => (value: unknown) => {
  if (typeof value === "string") {
    return value.trim() ? null : `${label} is required`
  }
  return value ? null : `${label} is required`
}

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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Form</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A native form element with consolidated error handling and validation modes.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Form } from "@/components/ui/form"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Basic form
<Form onFormSubmit={(values) => console.log(values)}>
  <Field label="Email" name="email" validate={(value) => value ? undefined : "Email is required"}>
    <Input name="email" type="email" placeholder="you@example.com" />
  </Field>
  <Button type="submit">Submit</Button>
</Form>

// With server errors
<Form
  errors={{ email: "This email is already taken" }}
  onFormSubmit={handleSubmit}
>
  <Field label="Email" name="email">
    <Input name="email" type="email" placeholder="you@example.com" />
  </Field>
</Form>

// Validation modes
<Form validationMode="onBlur">...</Form>
<Form validationMode="onChange">...</Form>
<Form validationMode="onSubmit">...</Form>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Simple form</p>
              <p className="text-body-m text-content-subtle">Basic form with fields</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form onFormSubmit={(values) => console.log(values)}>
                <Field label="Email">
                  <Input name="email" type="email" placeholder="you@example.com" />
                </Field>
                <Field label="Password">
                  <Input name="password" type="password" placeholder="Enter password" />
                </Field>
                <Button type="submit">Sign in</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Fieldset</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Grouped fields</p>
              <p className="text-body-m text-content-subtle">Using Fieldset for sections</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form>
                <Fieldset>
                  <Fieldset.Legend>Personal Information</Fieldset.Legend>
                  <Field label="Full name">
                    <Input name="name" placeholder="John Doe" />
                  </Field>
                  <Field label="Email">
                    <Input name="email" type="email" placeholder="you@example.com" />
                  </Field>
                </Fieldset>
                <Fieldset>
                  <Fieldset.Legend>Address</Fieldset.Legend>
                  <Field label="Street">
                    <Input name="street" placeholder="123 Main St" />
                  </Field>
                  <Field label="Country">
                    <SelectDemo options={countries} placeholder="Select country" />
                  </Field>
                </Fieldset>
                <Button type="submit">Save</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Input Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Secondary inputs</p>
              <p className="text-body-m text-content-subtle">Default input variant</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form>
                <Field label="Email">
                  <Input variant="secondary" name="email" type="email" placeholder="you@example.com" />
                </Field>
                <Field label="Password">
                  <Input variant="secondary" name="password" type="password" placeholder="Enter password" />
                </Field>
                <Button type="submit">Sign in</Button>
              </Form>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Tertiary inputs</p>
              <p className="text-body-m text-content-subtle">With shadow treatment</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form>
                <Field label="Email">
                  <Input variant="tertiary" name="email" type="email" placeholder="you@example.com" />
                </Field>
                <Field label="Password">
                  <Input variant="tertiary" name="password" type="password" placeholder="Enter password" />
                </Field>
                <Button type="submit">Sign in</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Errors</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Server validation</p>
              <p className="text-body-m text-content-subtle">Errors from external source</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form errors={errors} onFormSubmit={handleSubmit}>
                <Field label="Email" name="email">
                  <Input name="email" type="email" placeholder="you@example.com" />
                </Field>
                <Field label="Password" name="password">
                  <Input name="password" type="password" placeholder="Enter password" />
                </Field>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Validation Modes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">onSubmit</p>
              <p className="text-body-m text-content-subtle">Default, validates on submit</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form validationMode="onSubmit">
                <Field label="Email" name="email" validate={required("Email")}>
                  <Input name="email" type="email" placeholder="you@example.com" />
                </Field>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">onBlur</p>
              <p className="text-body-m text-content-subtle">Validates when field loses focus</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form validationMode="onBlur">
                <Field label="Email" name="email" validate={required("Email")}>
                  <Input name="email" type="email" placeholder="you@example.com" />
                </Field>
                <Button type="submit">Submit</Button>
              </Form>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">onChange</p>
              <p className="text-body-m text-content-subtle">Validates on every change</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Form validationMode="onChange">
                <Field label="Email" name="email" validate={required("Email")}>
                  <Input name="email" type="email" placeholder="you@example.com" />
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
