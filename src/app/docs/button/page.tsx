import { Button } from "@/components/ui/button"
import { AddCircleIcon, ArrowLeftIcon, ArrowRightIcon } from "@/icons"

const variantRows = [
  {
    value: "primary",
    label: "Primary",
    description: "Main call to action for primary workflows.",
  },
  {
    value: "secondary",
    label: "Secondary",
    description: "Supporting actions with subtle emphasis.",
  },
  {
    value: "tertiary",
    label: "Tertiary",
    description: "Elevated neutral action for surfaces.",
  },
  {
    value: "ghost",
    label: "Ghost",
    description: "Low-emphasis action without fill.",
  },
  {
    value: "link",
    label: "Link",
    description: "Inline navigation with link styling.",
  },
  {
    value: "link-alt",
    label: "Link alt",
    description: "Text-colored link with underline on hover.",
  },
  {
    value: "danger",
    label: "Danger",
    description: "Destructive actions that require attention.",
  },
] as const

const sizes = [
  { value: "xs", label: "XS", height: 28 },
  { value: "s", label: "S", height: 32 },
  { value: "m", label: "M", height: 36 },
  { value: "l", label: "L", height: 40 },
] as const

export default function ButtonDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-24)] py-[var(--space-32)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Button</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Buttons trigger an action or event.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Usage</h2>
        <div className="rounded-[var(--radius-12)] border border-border-subtle bg-surface-canvas p-[var(--space-16)]">
          <pre className="text-body-s text-content-strong whitespace-pre-wrap break-words">
            <code>{`import { Button } from "@/components/ui/button"\n\n<Button variant=\"primary\">Button</Button>`}</code>
          </pre>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-12)]">
        <h2 className="text-body-xl-semibold">Examples</h2>
        <div className="grid gap-[var(--space-12)] lg:grid-cols-2">
          <div className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-16)] border border-border-subtle bg-surface-overlay p-[var(--space-20)]">
            <div className="flex flex-col gap-[var(--space-2)]">
              <p className="text-body-m-medium text-content-strong">Create a new workspace</p>
              <p className="text-body-s text-content-subtle">
                Start with a private workspace and invite teammates later.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Button size="xs" leadingIcon={<AddCircleIcon />}>
                Create workspace
              </Button>
              <Button size="xs" variant="secondary">
                Skip
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-16)] border border-border-subtle bg-surface-overlay p-[var(--space-20)]">
            <div className="flex flex-col gap-[var(--space-2)]">
              <p className="text-body-m-medium text-content-strong">Activity feed</p>
              <p className="text-body-s text-content-subtle">
                Recent changes across teams.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Button size="xs" variant="secondary">
                Create report
              </Button>
              <Button size="xs" variant="ghost">
                Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Variants</h2>
        <div className="flex flex-col">
          {variantRows.map((variant) => (
            <div
              key={variant.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[220px]">
                <p className="text-body-m text-content-strong">{variant.label}</p>
                <p className="text-body-s text-content-subtle">
                  {variant.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                <Button variant={variant.value}>Default</Button>
                <Button variant={variant.value} disabled>
                  Disabled
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Sizings</h2>
        <p className="text-body-s text-content-subtle">
          Label padding is separated from button padding to maintain optical
          balance across icon configurations.
        </p>
        <div className="flex flex-col">
          {sizes.map((size) => (
            <div
              key={size.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-body-m text-content-strong">{size.label}</p>
                <p className="text-body-s text-content-subtle">
                  {size.height}px height
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                <Button size={size.value}>Label</Button>
                <Button
                  size={size.value}
                  leadingIcon={<ArrowLeftIcon />}
                  trailingIcon={<ArrowRightIcon />}
                >
                  Label
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
