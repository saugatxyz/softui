import { CodeBlock } from "@/components/docs/code-block"
import { Logo, logos, logoNames } from "@/components/ui/logo"

const logoRows = logos.map((logo) => ({
  value: logo,
  label: logoNames[logo],
}))

export default function LogoDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Logo</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Company and brand logos for integrations, partnerships, and attribution
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Logo } from "@/components/ui/logo"

<Logo logo="claude" />
<Logo logo="discord" variant="filled" />
<Logo logo="linear" size={32} />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Available Logos</h2>
          <p className="text-body-s text-content-subtle">
            Logos with default and filled variants
          </p>
        </div>
        <div className="flex flex-col">
          {logoRows.map((logo) => (
            <div
              key={logo.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[220px]">
                <p className="text-body-m text-content-strong">{logo.label}</p>
                <p className="text-body-s text-content-subtle">{logo.value}</p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-12)]">
                <Logo logo={logo.value} size={24} />
                <Logo logo={logo.value} variant="filled" size={24} />
                <Logo logo={logo.value} size={36} />
                <Logo logo={logo.value} variant="filled" size={36} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Variants</h2>
          <p className="text-body-s text-content-subtle">
            Default uses currentColor, filled shows the brand background.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-s text-content-subtle">
                Monochrome, inherits text color
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Logo logo="claude" />
              <Logo logo="discord" />
              <Logo logo="linear" />
              <Logo logo="openai" />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div className="md:min-w-[220px]">
              <p className="text-body-m text-content-strong">Filled</p>
              <p className="text-body-s text-content-subtle">
                Brand color background with rounded corners
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Logo logo="claude" variant="filled" />
              <Logo logo="discord" variant="filled" />
              <Logo logo="linear" variant="filled" />
              <Logo logo="openai" variant="filled" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizes</h2>
          <p className="text-body-s text-content-subtle">
            Logos can be rendered at any size. Default is 24px.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">Small</p>
              <p className="text-body-s text-content-subtle">16px</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Logo logo="claude" variant="filled" size={16} />
              <Logo logo="airbnb" variant="filled" size={16} />
              <Logo logo="discord" variant="filled" size={16} />
              <Logo logo="framer" variant="filled" size={16} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-s text-content-subtle">24px</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Logo logo="claude" variant="filled" size={24} />
              <Logo logo="airbnb" variant="filled" size={24} />
              <Logo logo="discord" variant="filled" size={24} />
              <Logo logo="framer" variant="filled" size={24} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">Medium</p>
              <p className="text-body-s text-content-subtle">36px</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Logo logo="claude" variant="filled" size={36} />
              <Logo logo="airbnb" variant="filled" size={36} />
              <Logo logo="discord" variant="filled" size={36} />
              <Logo logo="framer" variant="filled" size={36} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">Large</p>
              <p className="text-body-s text-content-subtle">48px</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Logo logo="claude" variant="filled" size={48} />
              <Logo logo="airbnb" variant="filled" size={48} />
              <Logo logo="discord" variant="filled" size={48} />
              <Logo logo="framer" variant="filled" size={48} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
