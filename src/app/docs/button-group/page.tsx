import { CodeBlock } from "@/components/docs/code-block"
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CopyIcon,
  MenuIcon,
  SettingsIcon,
  TrashIcon,
} from "@/icons"

const sizes = [
  { value: "xs", label: "XS", height: 28 },
  { value: "s", label: "S", height: 32 },
  { value: "m", label: "M", height: 36 },
  { value: "l", label: "L", height: 40 },
] as const

export default function ButtonGroupDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Button Group</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            A collection of related actions grouped together
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <CodeBlock
          code={`import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

<ButtonGroup>
  <ButtonGroupItem>Option 1</ButtonGroupItem>
  <ButtonGroupItem>Option 2</ButtonGroupItem>
  <ButtonGroupItem>Option 3</ButtonGroupItem>
</ButtonGroup>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizes</h2>
          <p className="text-body-m text-content-subtle">
            Size prop on ButtonGroup controls all buttons inside.
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
                <p className="text-body-m text-content-subtle">
                  {size.height}px height
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-8)]">
                <ButtonGroup size={size.value}>
                  <ButtonGroupItem>Left</ButtonGroupItem>
                  <ButtonGroupItem>Center</ButtonGroupItem>
                  <ButtonGroupItem>Right</ButtonGroupItem>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">With Icons</h2>
          <p className="text-body-m text-content-subtle">
            Buttons support leading and trailing icons.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Leading & trailing</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ButtonGroup>
                <ButtonGroupItem leadingIcon={<ArrowLeftIcon />}>
                  Back
                </ButtonGroupItem>
                <ButtonGroupItem trailingIcon={<ArrowRightIcon />}>
                  Forward
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Icon only</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ButtonGroup>
                <ButtonGroupItem leadingIcon={<MenuIcon />} />
                <ButtonGroupItem leadingIcon={<SettingsIcon />} />
                <ButtonGroupItem leadingIcon={<TrashIcon />} />
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">States</h2>
          <p className="text-body-m text-content-subtle">
            Disabled buttons show muted text without fill changes.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ButtonGroup>
                <ButtonGroupItem>Option 1</ButtonGroupItem>
                <ButtonGroupItem>Option 2</ButtonGroupItem>
                <ButtonGroupItem>Option 3</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Mixed states</p>
              <p className="text-body-m text-content-subtle">
                Individual items can be disabled
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ButtonGroup>
                <ButtonGroupItem>Active</ButtonGroupItem>
                <ButtonGroupItem disabled>Disabled</ButtonGroupItem>
                <ButtonGroupItem>Active</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Tones</h2>
          <p className="text-body-m text-content-subtle">
            Apply semantic colors to individual items.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Item actions</p>
              <p className="text-body-m text-content-subtle">
                Danger tone for destructive action
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <ButtonGroup>
                <ButtonGroupItem leadingIcon={<CopyIcon />}>
                  Duplicate
                </ButtonGroupItem>
                <ButtonGroupItem leadingIcon={<SettingsIcon />}>
                  Settings
                </ButtonGroupItem>
                <ButtonGroupItem leadingIcon={<TrashIcon />} tone="danger">
                  Delete
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
