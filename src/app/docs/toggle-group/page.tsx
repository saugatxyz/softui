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
            A group of toggleable buttons with shared state management
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup multiple defaultValue={[]}>
  <ToggleGroupItem
    value="heart"
    icon={<HeartIcon />}
    pressedIcon={<HeartFillIcon />}
    pressedTone="danger"
  />
  <ToggleGroupItem
    value="star"
    icon={<StarIcon />}
    pressedIcon={<StarFillIcon />}
    pressedTone="warning"
  />
  <ToggleGroupItem
    value="bookmark"
    icon={<BookmarkIcon />}
    pressedIcon={<BookmarkFillIcon />}
    pressedTone="blue"
  />
</ToggleGroup>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Selection Mode</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Single selection</p>
              <p className="text-body-s text-content-subtle">
                Default. Only one item active at a time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup hideSeparator defaultValue={["center"]}>
                <ToggleGroupItem value="left" icon={<AlignLeftIcon />} />
                <ToggleGroupItem value="center" icon={<AlignCenterIcon />} />
                <ToggleGroupItem value="right" icon={<AlignRightIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Multiple selection</p>
              <p className="text-body-s text-content-subtle">
                Multiple items can be active simultaneously.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup multiple hideSeparator defaultValue={["bold"]}>
                <ToggleGroupItem value="bold" icon={<BoldIcon />} />
                <ToggleGroupItem value="italic" icon={<ItalicIcon />} />
                <ToggleGroupItem value="underline" icon={<UnderlineIcon />} />
              </ToggleGroup>
            </div>
          </div>
        </div>
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
              <ToggleGroup multiple hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="add"
                  icon={<AddIcon />}
                  pressedIcon={<CheckCircleIcon />}
                  pressedTone="success"
                  morph
                />
                <ToggleGroupItem
                  value="volume"
                  icon={<VolumeIcon />}
                  pressedIcon={<MuteIcon />}
                  morph
                />
                <ToggleGroupItem
                  value="eye"
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
              <ToggleGroup multiple hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="heart"
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  value="star"
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  value="bookmark"
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
              <ToggleGroup multiple hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="visibility"
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
                  value="notifications"
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
              <ToggleGroup multiple hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="like"
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
                  value="save"
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
              <ToggleGroup multiple size="xs" hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="star"
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  value="heart"
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  value="bookmark"
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
              <ToggleGroup multiple size="s" hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="heart"
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  value="star"
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  value="thumbup"
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
              <ToggleGroup multiple size="m" hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="bookmark"
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
                <ToggleGroupItem
                  value="heart"
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  value="star"
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
              <ToggleGroup multiple size="l" hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="thumbup"
                  icon={<ThumbUpIcon />}
                  pressedIcon={<ThumbUpFillIcon />}
                  pressedTone="success"
                />
                <ToggleGroupItem
                  value="bookmark"
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
                <ToggleGroupItem
                  value="heart"
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
              <ToggleGroup multiple variant="ghost" hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="star"
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  value="heart"
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  value="bookmark"
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
              <ToggleGroup multiple variant="secondary" hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="heart"
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  value="star"
                  icon={<StarIcon />}
                  pressedIcon={<StarFillIcon />}
                  pressedTone="warning"
                />
                <ToggleGroupItem
                  value="bookmark"
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
              <ToggleGroup multiple variant="tertiary" hideSeparator defaultValue={[]}>
                <ToggleGroupItem
                  value="bookmark"
                  icon={<BookmarkIcon />}
                  pressedIcon={<BookmarkFillIcon />}
                  pressedTone="blue"
                />
                <ToggleGroupItem
                  value="heart"
                  icon={<HeartIcon />}
                  pressedIcon={<HeartFillIcon />}
                  pressedTone="danger"
                />
                <ToggleGroupItem
                  value="star"
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
              <ToggleGroup multiple defaultValue={[]}>
                <ToggleGroupItem value="bold" icon={<BoldIcon />} />
                <ToggleGroupItem value="italic" icon={<ItalicIcon />} />
                <ToggleGroupItem value="underline" icon={<UnderlineIcon />} />
              </ToggleGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without separators</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleGroup hideSeparator multiple={false} defaultValue={[]}>
                <ToggleGroupItem value="left" icon={<AlignLeftIcon />}>Left</ToggleGroupItem>
                <ToggleGroupItem value="center" icon={<AlignCenterIcon />}>
                  Center
                </ToggleGroupItem>
                <ToggleGroupItem value="right" icon={<AlignRightIcon />}>Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
