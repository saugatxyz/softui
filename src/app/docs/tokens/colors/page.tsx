import { ColorValue } from "@/components/docs/color-value"
import { PaletteIcon } from "@/icons"
import { getColorTokenSections } from "@/lib/token-data"

export default function TokensColorsPage() {
  const colorSections = getColorTokenSections()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-24)] py-[var(--space-32)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex size-[20px] items-center justify-center text-content-strong">
          <PaletteIcon className="size-5" />
        </div>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Colors</h1>
        </div>
      </header>

      <div className="flex flex-col gap-[var(--space-24)]">
        {colorSections.map((section) => (
          <section key={section.title} className="flex flex-col gap-[var(--space-8)]">
            <div>
              <h2 className="text-body-xl-semibold">{section.title}</h2>
            </div>
            <div className="flex flex-col">
              {section.tokens.map((token, index) => (
                <div
                  key={token.name}
                  className={`flex flex-col gap-[var(--space-10)] py-[var(--space-16)] ${
                    index === section.tokens.length - 1
                      ? ""
                      : "border-b border-border-muted"
                  } md:flex-row md:items-center md:justify-between`}
                >
                  <div>
                    <div className="text-body-m text-content-strong">
                      {token.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-[var(--space-8)]">
                    <ColorValue cssVar={token.cssVar} />
                    <div
                      className="size-[20px] rounded-full border border-border-subtle"
                      style={{ background: `rgb(var(${token.cssVar}))` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

    </div>
  )
}
