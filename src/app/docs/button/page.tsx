import { CodeBlock } from "@/components/docs/code-block"
import { Button } from "@/components/ui/button"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  InformationFillIcon,
  Spam2FillIcon,
  StickyNoteFillIcon,
} from "@/icons"

const variantRows = [
  {
    value: "primary",
    label: "Primary",
    description: "Main call to action for primary workflows",
  },
  {
    value: "secondary",
    label: "Secondary",
    description: "Supporting actions with subtle emphasis",
  },
  {
    value: "tertiary",
    label: "Tertiary",
    description: "Elevated neutral action for surfaces",
  },
  {
    value: "ghost",
    label: "Ghost",
    description: "Low-emphasis action without fill",
  },
  {
    value: "link",
    label: "Link",
    description: "Inline navigation with link styling",
  },
  {
    value: "link-neutral",
    label: "Neutral link",
    description: "Text-colored link with underline on hover",
  },
  {
    value: "danger",
    label: "Danger",
    description: "Destructive actions that require attention",
  },
] as const

const sizes = [
  { value: "xs", label: "XS", height: 28 },
  { value: "s", label: "S", height: 32 },
  { value: "m", label: "M", height: 36 },
  { value: "l", label: "L", height: 40 },
] as const

const toneRows = [
  { value: "default", label: "Default", icon: StickyNoteFillIcon },
  { value: "info", label: "Info", icon: InformationFillIcon },
  { value: "warning", label: "Warning", icon: Spam2FillIcon },
  { value: "danger", label: "Danger", icon: Spam2FillIcon },
  { value: "success", label: "Success", icon: CheckCircleIcon },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "amber", label: "Amber" },
  { value: "blue", label: "Blue" },
  { value: "violet", label: "Violet" },
  { value: "pink", label: "Pink" },
] as const

export default function ButtonDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Button</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Triggers an action
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Button } from "@/components/ui/button"

<Button variant="primary">Button</Button>`}
        />
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
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizings</h2>
          <p className="text-body-s text-content-subtle">
            Label has separate padding to maintain optical
            balance.
          </p>
        </div>
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

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Tones</h2>
          <p className="text-body-s text-content-subtle">
            Apply semantic or decorative colors to button.
          </p>
        </div>
        <div className="flex flex-col">
          {toneRows.map((tone) => {
            const ToneIcon = "icon" in tone ? tone.icon : null
            return (
              <div
                key={tone.value}
                className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
              >
                <div className="md:min-w-[220px]">
                  <p className="text-body-m text-content-strong">{tone.label}</p>
                </div>
                <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                  <Button
                    variant="tertiary"
                    tone={tone.value}
                    leadingIcon={ToneIcon ? <ToneIcon /> : undefined}
                  >
                    {tone.label}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
