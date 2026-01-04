import { CodeBlock } from "@/components/docs/code-block"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircleIcon,
  InformationFillIcon,
  Spam2FillIcon,
  StickyNoteFillIcon,
} from "@/icons"

const statusRows = [
  {
    value: "neutral",
    label: "Neutral",
    badgeLabel: "Draft",
    icon: StickyNoteFillIcon,
  },
  {
    value: "info",
    label: "Info",
    badgeLabel: "Info",
    icon: InformationFillIcon,
  },
  {
    value: "warning",
    label: "Warning",
    badgeLabel: "Review",
    icon: Spam2FillIcon,
  },
  {
    value: "danger",
    label: "Danger",
    badgeLabel: "Overdue",
    icon: Spam2FillIcon,
  },
  {
    value: "success",
    label: "Success",
    badgeLabel: "Approved",
    icon: CheckCircleIcon,
  },
] as const

const decorativeRows = [
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "amber", label: "Amber" },
  { value: "yellow", label: "Yellow" },
  { value: "lime", label: "Lime" },
  { value: "green", label: "Green" },
  { value: "emerald", label: "Emerald" },
  { value: "teal", label: "Teal" },
  { value: "cyan", label: "Cyan" },
  { value: "sky", label: "Sky" },
  { value: "blue", label: "Blue" },
  { value: "indigo", label: "Indigo" },
  { value: "violet", label: "Violet" },
  { value: "purple", label: "Purple" },
  { value: "fuchsia", label: "Fuchsia" },
  { value: "pink", label: "Pink" },
  { value: "rose", label: "Rose" },
] as const

const sizes = [
  { value: "xs", label: "XS", height: 20 },
  { value: "s", label: "S", height: 24 },
  { value: "m", label: "M", height: 28 },
] as const

export default function BadgeDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Badge</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Compact label for status, metadata, and categorization
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Badge } from "@/components/ui/badge"
import { PriceTagIcon } from "@/icons"

<Badge status="info" style="colored" leadingDot trailingDot>
  Tip
</Badge>
<Badge type="decorative" color="violet" style="simple" leadingIcon={<PriceTagIcon />}>
  New
</Badge>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Statuses</h2>
          <p className="text-body-s text-content-subtle">
            Feedback badges are used to show status.
          </p>
        </div>
        <div className="flex flex-col">
          {statusRows.map((status) => {
            const StatusIcon = status.icon
            return (
              <div
                key={status.value}
                className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
              >
                <div className="md:min-w-[220px]">
                  <p className="text-body-m text-content-strong">
                    {status.label}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                  <Badge
                    status={status.value}
                    style="colored"
                    leadingIcon={<StatusIcon />}
                  >
                    {status.badgeLabel}
                  </Badge>
                  <Badge
                    status={status.value}
                    style="simple"
                    leadingIcon={<StatusIcon />}
                  >
                    {status.badgeLabel}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Decorative</h2>
          <p className="text-body-s text-content-subtle">
            Decorative badges are used when status bagdes aren't enough.
          </p>
        </div>
        <div className="flex flex-col">
          {decorativeRows.map((color) => (
            <div
              key={color.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[220px]">
                <p className="text-body-m text-content-strong">{color.label}</p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                <Badge
                  type="decorative"
                  color={color.value}
                  style="colored"
                  leadingDot
                >
                  {color.label}
                </Badge>
                <Badge
                  type="decorative"
                  color={color.value}
                  style="simple"
                  leadingDot
                >
                  {color.label}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizings</h2>
          <p className="text-body-s text-content-subtle">
            Icons are available for S or M sizes.
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
                <Badge size={size.value} status="success" leadingDot>
                  Approved
                </Badge>
                {size.value === "s" || size.value === "m" ? (
                  <Badge
                    size={size.value}
                    status="success"
                    style="simple"
                    leadingIcon={<CheckCircleIcon />}
                  >
                    Approved
                  </Badge>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
