import { CodeBlock } from "@/components/docs/code-block"
import { ToggleButton } from "@/components/ui/toggle-button"
import {
  HeartIcon,
  StarIcon,
  BookmarkIcon,
  ThumbUpIcon,
  EyeIcon,
  NotificationIcon,
} from "@/icons"

export default function ToggleButtonDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Toggle Button</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A button that toggles between two states
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { ToggleButton } from "@/components/ui/toggle-button"

<ToggleButton leadingIcon={<HeartIcon />}>Like</ToggleButton>
<ToggleButton leadingIcon={<StarIcon />} aria-label="Favorite" />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Icon Only</h2>
        <div className="flex flex-wrap items-center gap-[var(--space-8)]">
          <ToggleButton leadingIcon={<HeartIcon />} aria-label="Like" />
          <ToggleButton leadingIcon={<StarIcon />} aria-label="Favorite" />
          <ToggleButton leadingIcon={<BookmarkIcon />} aria-label="Save" />
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Label</h2>
        <div className="flex flex-wrap items-center gap-[var(--space-8)]">
          <ToggleButton leadingIcon={<EyeIcon />}>Show</ToggleButton>
          <ToggleButton leadingIcon={<NotificationIcon />}>Notify</ToggleButton>
          <ToggleButton leadingIcon={<ThumbUpIcon />}>Approve</ToggleButton>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">XS</p>
              <p className="text-body-m text-content-subtle">28px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton size="xs" leadingIcon={<StarIcon />} aria-label="Favorite" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">S</p>
              <p className="text-body-m text-content-subtle">32px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton size="s" leadingIcon={<HeartIcon />} aria-label="Like" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">M</p>
              <p className="text-body-m text-content-subtle">36px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton size="m" leadingIcon={<BookmarkIcon />} aria-label="Save" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">L</p>
              <p className="text-body-m text-content-subtle">40px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton size="l" leadingIcon={<ThumbUpIcon />} aria-label="Approve" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Tertiary</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton variant="tertiary" leadingIcon={<StarIcon />} aria-label="Favorite" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Ghost</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton variant="ghost" leadingIcon={<HeartIcon />} aria-label="Like" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Secondary</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton variant="secondary" leadingIcon={<BookmarkIcon />} aria-label="Save" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
