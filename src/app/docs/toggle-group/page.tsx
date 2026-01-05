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
  HeartFillIcon,
  StarIcon,
  StarFillIcon,
  BookmarkIcon,
  BookmarkFillIcon,
  ThumbUpIcon,
  ThumbUpFillIcon,
  EyeIcon,
  EyeOffIcon,
  MuteIcon,
  VolumeIcon,
  NotificationIcon,
  NotificationOffIcon,
  AddIcon,
  CheckCircleIcon,
} from "@/icons"

export default function ToggleGroupDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Toggle Group</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A group of independently toggleable buttons
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup>
  <ToggleGroupItem
    icon={<HeartIcon />}
    pressedIcon={<HeartFillIcon />}
    pressedTone="danger"
  />
  <ToggleGroupItem
    icon={<StarIcon />}
    pressedIcon={<StarFillIcon />}
    pressedTone="warning"
  />
  <ToggleGroupItem
    icon={<BookmarkIcon />}
    pressedIcon={<BookmarkFillIcon />}
    pressedTone="blue"
  />
</ToggleGroup>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Icon Morphing</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With morphing</p>
              <p className="text-body-s text-content-subtle">
                Good for different icons
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup hideSeparator>
                <ToggleGroupItem
                  icon={<AddIcon />}
                  pressedIcon={<CheckCircleIcon />}
                  pressedTone="success"
                  morph
                />
                <ToggleGroupItem
                  icon={<VolumeIcon />}
                  pressedIcon={<MuteIcon />}
                  morph
                />
                <ToggleGroupItem
                  icon={<EyeIcon />}
                  pressedIcon={<EyeOffIcon />}
                  morph
                />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without morphing</p>
              <p className="text-body-s text-content-subtle">
                Good for similar icons
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup hideSeparator>
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Label</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With morphing</p>
              <p className="text-body-s text-content-subtle">
                Different icons and labels
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup hideSeparator>
                <ToggleGroupItem
                  icon={<EyeIcon />}
                  pressedIcon={<EyeOffIcon />}
                  labelWidth={36}
                  pressedLabelWidth={32}
                  pressedChildren="Hide"
                  morph
                >
                  Show
                </ToggleGroupItem>
                <ToggleGroupItem
                  icon={<NotificationIcon />}
                  pressedIcon={<NotificationOffIcon />}
                  labelWidth={24}
                  pressedLabelWidth={24}
                  pressedChildren="Off"
                  morph
                >
                  On
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without morphing</p>
              <p className="text-body-s text-content-subtle">
                Similar icons and labels
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup hideSeparator>
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                  labelWidth={28}
                  pressedLabelWidth={36}
                  pressedChildren="Liked"
                >
                  Like
                </ToggleGroupItem>
                <ToggleGroupItem
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                  labelWidth={32}
                  pressedLabelWidth={44}
                  pressedChildren="Saved"
                >
                  Save
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">XS</p>
              <p className="text-body-s text-content-subtle">28px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup size="xs" hideSeparator>
                <ToggleGroupItem
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">S</p>
              <p className="text-body-s text-content-subtle">32px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup size="s" hideSeparator>
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  icon={<ThumbUpIcon />}
                  pressedIcon={<ThumbUpFillIcon />}
                  pressedTone="success"
                />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">M</p>
              <p className="text-body-s text-content-subtle">36px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup size="m" hideSeparator>
                <ToggleGroupItem
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">L</p>
              <p className="text-body-s text-content-subtle">40px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup size="l" hideSeparator>
                <ToggleGroupItem
                  icon={<ThumbUpIcon />}
                  pressedIcon={<ThumbUpFillIcon />}
                  pressedTone="success"
                />
                <ToggleGroupItem
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Variants</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Ghost</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup variant="ghost" hideSeparator>
                <ToggleGroupItem
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Secondary</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup variant="secondary" hideSeparator>
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Tertiary</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup variant="tertiary" hideSeparator>
                <ToggleGroupItem
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
                <ToggleGroupItem
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Separators</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With separators</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup>
                <ToggleGroupItem icon={<BoldIcon />} />
                <ToggleGroupItem icon={<ItalicIcon />} />
                <ToggleGroupItem icon={<UnderlineIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without separators</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup hideSeparator>
                <ToggleGroupItem icon={<AlignLeftIcon />}>Left</ToggleGroupItem>
                <ToggleGroupItem icon={<AlignCenterIcon />}>
                  Center
                </ToggleGroupItem>
                <ToggleGroupItem icon={<AlignRightIcon />}>Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
