"use client"

import { CodeBlock } from "@/components/docs/code-block"
import { Fieldset } from "@/components/ui/fieldset"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SelectDemo } from "@/components/docs/select-demo"
import { Separator } from "@/components/ui/separator"

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
]

const states = [
  { value: "ca", label: "California" },
  { value: "ny", label: "New York" },
  { value: "tx", label: "Texas" },
]

export default function FieldsetDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Fieldset</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Groups related form fields with an accessible legend. Uses native fieldset semantics.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { Fieldset } from "@/components/ui/fieldset"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Fieldset>
  <Fieldset.Legend>Personal Information</Fieldset.Legend>
  <Field label="Full name">
    <Input name="name" placeholder="John Doe" />
  </Field>
  <Field label="Email">
    <Input name="email" placeholder="you@example.com" />
  </Field>
</Fieldset>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Basic</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With legend</p>
              <p className="text-body-m text-content-subtle">Accessible group label</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Fieldset>
                <Fieldset.Legend>Contact Details</Fieldset.Legend>
                <Field label="Full name">
                  <Input name="name" placeholder="John Doe" />
                </Field>
                <Field label="Email">
                  <Input name="email" type="email" placeholder="you@example.com" />
                </Field>
                <Field label="Phone">
                  <Input name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </Field>
              </Fieldset>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Multiple Fieldsets</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Form sections</p>
              <p className="text-body-m text-content-subtle">Organizing complex forms</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-32)]">
              <Fieldset>
                <Fieldset.Legend>Personal Information</Fieldset.Legend>
                <Field label="First name">
                  <Input name="firstName" placeholder="John" />
                </Field>
                <Field label="Last name">
                  <Input name="lastName" placeholder="Doe" />
                </Field>
              </Fieldset>
              <Separator />
              <Fieldset>
                <Fieldset.Legend>Billing Address</Fieldset.Legend>
                <Field label="Street address">
                  <Input name="street" placeholder="123 Main St" />
                </Field>
                <Field label="City">
                  <Input name="city" placeholder="San Francisco" />
                </Field>
                <Field label="State">
                  <SelectDemo options={states} placeholder="Select state" />
                </Field>
                <Field label="Country">
                  <SelectDemo options={countries} placeholder="Select country" />
                </Field>
              </Fieldset>
              <Separator />
              <Fieldset>
                <Fieldset.Legend>Payment Details</Fieldset.Legend>
                <Field label="Card number">
                  <Input name="cardNumber" placeholder="4242 4242 4242 4242" />
                </Field>
                <div className="flex gap-[var(--space-16)]">
                  <Field label="Expiry">
                    <Input name="expiry" placeholder="MM/YY" />
                  </Field>
                  <Field label="CVC">
                    <Input name="cvc" placeholder="123" />
                  </Field>
                </div>
              </Fieldset>
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
              <Fieldset>
                <Fieldset.Legend>Account</Fieldset.Legend>
                <Field label="Email">
                  <Input variant="secondary" name="email" placeholder="you@example.com" />
                </Field>
                <Field label="Password">
                  <Input variant="secondary" name="password" type="password" placeholder="Enter password" />
                </Field>
              </Fieldset>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Tertiary inputs</p>
              <p className="text-body-m text-content-subtle">With shadow treatment</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Fieldset>
                <Fieldset.Legend>Account</Fieldset.Legend>
                <Field label="Email">
                  <Input variant="tertiary" name="email" placeholder="you@example.com" />
                </Field>
                <Field label="Password">
                  <Input variant="tertiary" name="password" type="password" placeholder="Enter password" />
                </Field>
              </Fieldset>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Without Legend</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Semantic grouping</p>
              <p className="text-body-m text-content-subtle">For visual organization</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Fieldset>
                <Field label="Username">
                  <Input name="username" placeholder="johndoe" />
                </Field>
                <Field label="Password">
                  <Input name="password" type="password" placeholder="Enter password" />
                </Field>
              </Fieldset>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
