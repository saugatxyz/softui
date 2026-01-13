import { CodeBlock } from "@/components/docs/code-block"
import { ToggleButton } from "@/components/ui/toggle-button"
import {
  HeartIcon,
  HeartFillIcon,
  StarIcon,
  StarFillIcon,
  BookmarkIcon,
  BookmarkFillIcon,
  ThumbUpIcon,
  ThumbUpFillIcon,
  CheckCircleIcon,
  AddIcon,
  EyeIcon,
  EyeOffIcon,
  MuteIcon,
  VolumeIcon,
  NotificationIcon,
  NotificationOffIcon,
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

<ToggleButton
  icon={<HeartIcon />}
  pressedIcon={<HeartFillIcon />}
  pressedTone="danger"
  morph
/>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Icon Morphing</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With morphing</p>
              <p className="text-body-m text-content-subtle">
                Good for different icons
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                icon={<AddIcon />}
                pressedIcon={<CheckCircleIcon />}
                pressedTone="success"
                morph
              />
              <ToggleButton
                icon={<VolumeIcon />}
                pressedIcon={<MuteIcon />}
                morph
              />
              <ToggleButton
                icon={<EyeIcon />}
                pressedIcon={<EyeOffIcon />}
                morph
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without morphing</p>
              <p className="text-body-m text-content-subtle">
                Good for similar icons
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                icon={<HeartIcon />}
                pressedIcon={<HeartFillIcon />}
                pressedTone="danger"
              />
              <ToggleButton
                icon={<StarIcon />}
                pressedIcon={<StarFillIcon />}
                pressedTone="warning"
              />
              <ToggleButton
                icon={<BookmarkIcon />}
                pressedIcon={<BookmarkFillIcon />}
                pressedTone="blue"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">With Label</h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">With morphing</p>
              <p className="text-body-m text-content-subtle">
                Different icons and labels
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                icon={<EyeIcon />}
                pressedIcon={<EyeOffIcon />}
                labelWidth={36}
                pressedLabelWidth={32}
                pressedChildren="Hide"
                morph
              >
                Show
              </ToggleButton>
              <ToggleButton
                icon={<NotificationIcon />}
                pressedIcon={<NotificationOffIcon />}
                labelWidth={24}
                pressedLabelWidth={24}
                pressedChildren="Off"
                morph
              >
                On
              </ToggleButton>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Without morphing</p>
              <p className="text-body-m text-content-subtle">
                Similar icons and labels
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                icon={<HeartIcon />}
                pressedIcon={<HeartFillIcon />}
                pressedTone="danger"
                labelWidth={28}
                pressedLabelWidth={36}
                pressedChildren="Liked"
              >
                Like
              </ToggleButton>
              <ToggleButton
                icon={<BookmarkIcon />}
                pressedIcon={<BookmarkFillIcon />}
                pressedTone="blue"
                labelWidth={32}
                pressedLabelWidth={44}
                pressedChildren="Saved"
              >
                Save
              </ToggleButton>
            </div>
          </div>
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
              <ToggleButton
                size="xs"
                icon={<StarIcon />}
                pressedIcon={<StarFillIcon />}
                pressedTone="warning"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">S</p>
              <p className="text-body-m text-content-subtle">32px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                size="s"
                icon={<HeartIcon />}
                pressedIcon={<HeartFillIcon />}
                pressedTone="danger"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">M</p>
              <p className="text-body-m text-content-subtle">36px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                size="m"
                icon={<BookmarkIcon />}
                pressedIcon={<BookmarkFillIcon />}
                pressedTone="blue"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">L</p>
              <p className="text-body-m text-content-subtle">40px height</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                size="l"
                icon={<ThumbUpIcon />}
                pressedIcon={<ThumbUpFillIcon />}
                pressedTone="success"
              />
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
              <ToggleButton
                variant="tertiary"
                icon={<StarIcon />}
                pressedIcon={<StarFillIcon />}
                pressedTone="warning"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Ghost</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                variant="ghost"
                icon={<HeartIcon />}
                pressedIcon={<HeartFillIcon />}
                pressedTone="danger"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Secondary</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ToggleButton
                variant="secondary"
                icon={<BookmarkIcon />}
                pressedIcon={<BookmarkFillIcon />}
                pressedTone="blue"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
