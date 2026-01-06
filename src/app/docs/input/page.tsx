"use client"

import * as React from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Input } from "@/components/ui/input"
import { RiSearchLine, RiCloseLine, RiMailLine, RiLockLine, RiAtLine } from "@remixicon/react"

function ClearableInput() {
  const [value, setValue] = React.useState("")

  return (
    <Input
      placeholder="Type something..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      focusVisibleOnly
      trailingIcon={
        value ? (
          <button
            type="button"
            onClick={() => setValue("")}
            className="flex size-full items-center justify-center"
          >
            <RiCloseLine />
          </button>
        ) : null
      }
    />
  )
}

export default function InputDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Input</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Single-line text field for user input
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Input } from "@/components/ui/input"
import { RiMailLine } from "@remixicon/react"

<Input placeholder="Name" focusVisibleOnly />
<Input
  label="Email"
  description="We'll never share your email"
  placeholder="you@example.com"
  leadingIcon={<RiMailLine />}
  focusVisibleOnly
/>
<Input
  label="Password"
  error="Password must be at least 8 characters"
  type="password"
  focusVisibleOnly
/>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Small</p>
              <p className="text-body-s text-content-subtle">32px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                size="s"
                placeholder="Name"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Medium</p>
              <p className="text-body-s text-content-subtle">36px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                size="m"
                placeholder="Name"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Large</p>
              <p className="text-body-s text-content-subtle">40px height</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                size="l"
                placeholder="Name"
                focusVisibleOnly
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Icons</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Leading icon</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                placeholder="Search..."
                leadingIcon={<RiSearchLine />}
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Trailing icon</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <ClearableInput />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Both icons</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                placeholder="Enter username"
                leadingIcon={<RiAtLine />}
                trailingIcon={<RiSearchLine />}
                focusVisibleOnly
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Label</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label only</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                label="Email"
                placeholder="you@example.com"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Label and description</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                label="Email"
                description="We'll never share your email with anyone"
                placeholder="you@example.com"
                focusVisibleOnly
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">States</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                label="Email"
                placeholder="you@example.com"
                leadingIcon={<RiMailLine />}
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Disabled</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                label="Email"
                placeholder="you@example.com"
                leadingIcon={<RiMailLine />}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Error</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                label="Password"
                placeholder="Enter password"
                type="password"
                leadingIcon={<RiLockLine />}
                error="Password must be at least 8 characters"
                focusVisibleOnly
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Focus Ring</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Keyboard only</p>
              <p className="text-body-s text-content-subtle">Focus ring on Tab navigation</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                placeholder="Name"
                focusVisibleOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Always visible</p>
              <p className="text-body-s text-content-subtle">Focus ring on click and Tab</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
              <Input
                placeholder="Name"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Form Example</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-start md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Login form</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-[var(--space-24)]">
              <Input
                label="Email"
                placeholder="you@example.com"
                type="email"
                leadingIcon={<RiMailLine />}
                focusVisibleOnly
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                leadingIcon={<RiLockLine />}
                focusVisibleOnly
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
