import { CodeBlock } from "@/components/docs/code-block"
import { IconButton } from "@/components/ui/icon-button"
import {
  CheckCircleIcon,
  InformationFillIcon,
  SearchIcon,
  Spam2FillIcon,
  StickyNoteFillIcon,
} from "@/icons"

const variantRows = [
  {
    value: "primary",
    label: "Primary",
  },
  {
    value: "secondary",
    label: "Secondary",
  },
  {
    value: "tertiary",
    label: "Tertiary",
  },
  {
    value: "ghost",
    label: "Ghost",
  },
  {
    value: "danger",
    label: "Danger",
  },
] as const

const sizes = [
  { value: "xs", label: "XS", height: 28, iconSize: 16 },
  { value: "s", label: "S", height: 32, iconSize: 16 },
  { value: "m", label: "M", height: 36, iconSize: 16 },
  { value: "l", label: "L", height: 40, iconSize: 18 },
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

export default function IconButtonDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Icon Button</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Small control for quick actions
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { IconButton } from "@/components/ui/icon-button"
import { SearchIcon } from "@/icons"

<IconButton variant="secondary">
  <SearchIcon />
</IconButton>`}
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
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                <IconButton variant={variant.value}>
                  <SearchIcon />
                </IconButton>
                <IconButton variant={variant.value} disabled>
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Sizings</h2>
        <div className="flex flex-col">
          {sizes.map((size) => (
            <div
              key={size.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-body-m text-content-strong">{size.label}</p>
                <p className="text-body-s text-content-subtle">
                  {size.height}px height · {size.iconSize}px icon
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                <IconButton size={size.value}>
                  <SearchIcon />
                </IconButton>
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
            const ToneIcon = "icon" in tone ? tone.icon : SearchIcon
            return (
              <div
                key={tone.value}
                className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
              >
                <div className="md:min-w-[220px]">
                  <p className="text-body-m text-content-strong">{tone.label}</p>
                </div>
                <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                  <IconButton variant="tertiary" tone={tone.value}>
                    <ToneIcon />
                  </IconButton>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
