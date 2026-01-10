import { CodeBlock } from "@/components/docs/code-block"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  HeartIcon,
  StarIcon,
  BookmarkIcon,
} from "@/icons"

export default function ToggleGroupDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Toggle Group</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A group of toggleable buttons with shared state management
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup multiple defaultValue={["heart"]}>
  <ToggleGroupItem value="heart" leadingIcon={<HeartIcon />} />
  <ToggleGroupItem value="star" leadingIcon={<StarIcon />} />
  <ToggleGroupItem value="bookmark" leadingIcon={<BookmarkIcon />} />
</ToggleGroup>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Selection Mode</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Single selection</p>
              <p className="text-body-m text-content-subtle">
                Default. Only one item active at a time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup hideSeparator defaultValue={["center"]}>
                <ToggleGroupItem value="left" leadingIcon={<AlignLeftIcon />} />
                <ToggleGroupItem value="center" leadingIcon={<AlignCenterIcon />} />
                <ToggleGroupItem value="right" leadingIcon={<AlignRightIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multiple selection</p>
              <p className="text-body-m text-content-subtle">
                Multiple items can be active simultaneously.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup multiple hideSeparator defaultValue={["bold"]}>
                <ToggleGroupItem value="bold" leadingIcon={<BoldIcon />} />
                <ToggleGroupItem value="italic" leadingIcon={<ItalicIcon />} />
                <ToggleGroupItem value="underline" leadingIcon={<UnderlineIcon />} />
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Label</h2>
        <div className="flex flex-wrap items-center gap-[var(--space-8)]">
          <ToggleGroup hideSeparator defaultValue={["left"]}>
            <ToggleGroupItem value="left" leadingIcon={<AlignLeftIcon />}>Left</ToggleGroupItem>
            <ToggleGroupItem value="center" leadingIcon={<AlignCenterIcon />}>Center</ToggleGroupItem>
            <ToggleGroupItem value="right" leadingIcon={<AlignRightIcon />}>Right</ToggleGroupItem>
          </ToggleGroup>
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
              <ToggleGroup multiple size="xs" hideSeparator defaultValue={["heart"]}>
                <ToggleGroupItem value="heart" leadingIcon={<HeartIcon />} />
                <ToggleGroupItem value="star" leadingIcon={<StarIcon />} />
                <ToggleGroupItem value="bookmark" leadingIcon={<BookmarkIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">S</p>
              <p className="text-body-m text-content-subtle">32px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup multiple size="s" hideSeparator defaultValue={["heart"]}>
                <ToggleGroupItem value="heart" leadingIcon={<HeartIcon />} />
                <ToggleGroupItem value="star" leadingIcon={<StarIcon />} />
                <ToggleGroupItem value="bookmark" leadingIcon={<BookmarkIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">M</p>
              <p className="text-body-m text-content-subtle">36px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup multiple size="m" hideSeparator defaultValue={["heart"]}>
                <ToggleGroupItem value="heart" leadingIcon={<HeartIcon />} />
                <ToggleGroupItem value="star" leadingIcon={<StarIcon />} />
                <ToggleGroupItem value="bookmark" leadingIcon={<BookmarkIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">L</p>
              <p className="text-body-m text-content-subtle">40px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup multiple size="l" hideSeparator defaultValue={["heart"]}>
                <ToggleGroupItem value="heart" leadingIcon={<HeartIcon />} />
                <ToggleGroupItem value="star" leadingIcon={<StarIcon />} />
                <ToggleGroupItem value="bookmark" leadingIcon={<BookmarkIcon />} />
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Ghost</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup multiple variant="ghost" hideSeparator defaultValue={["star"]}>
                <ToggleGroupItem value="heart" leadingIcon={<HeartIcon />} />
                <ToggleGroupItem value="star" leadingIcon={<StarIcon />} />
                <ToggleGroupItem value="bookmark" leadingIcon={<BookmarkIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Secondary</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup multiple variant="secondary" hideSeparator defaultValue={["star"]}>
                <ToggleGroupItem value="heart" leadingIcon={<HeartIcon />} />
                <ToggleGroupItem value="star" leadingIcon={<StarIcon />} />
                <ToggleGroupItem value="bookmark" leadingIcon={<BookmarkIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Tertiary</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup multiple variant="tertiary" hideSeparator defaultValue={["star"]}>
                <ToggleGroupItem value="heart" leadingIcon={<HeartIcon />} />
                <ToggleGroupItem value="star" leadingIcon={<StarIcon />} />
                <ToggleGroupItem value="bookmark" leadingIcon={<BookmarkIcon />} />
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
