import { PaletteIcon } from "@/icons"
import { getColorTokenSections } from "@/lib/token-data"

export default function TokensColorsPage() {
  const colorSections = getColorTokenSections()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex size-[32px] items-center justify-center text-content-strong">
          <PaletteIcon className="size-8" />
        </div>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Colors</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Semantic palette for the interface
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-[var(--space-24)]">
        {colorSections.map((section) => (
          <section key={section.title} className="flex flex-col gap-[var(--space-8)]">
            <div>
              <h2 className="text-body-xl-semibold">{section.title}</h2>
            </div>
            <div className="flex flex-col">
              {/* Header row - hidden on mobile */}
              <div className="hidden items-center justify-between gap-[var(--space-16)] border-b border-border-muted py-[var(--space-8)] md:flex">
                <div className="text-body-s-medium text-content-muted">Token</div>
                <div className="flex items-center gap-[var(--space-24)]">
                  <div className="flex w-[140px] items-center justify-end gap-[var(--space-8)] text-body-s-medium text-content-muted">
                    Light
                  </div>
                  <div className="flex w-[140px] items-center justify-end gap-[var(--space-8)] text-body-s-medium text-content-muted">
                    Dark
                  </div>
                </div>
              </div>
              {section.tokens.map((token, index) => (
                <div
                  key={token.name}
                  className={`flex flex-col gap-[var(--space-8)] py-[var(--space-12)] md:flex-row md:items-center md:justify-between md:gap-[var(--space-16)] md:py-[var(--space-16)] ${
                    index === section.tokens.length - 1
                      ? ""
                      : "border-b border-border-muted"
                  }`}
                >
                  <div className="min-w-0 text-body-m text-content-strong">
                    <span className="break-all">{token.name}</span>
                  </div>
                  <div className="flex w-full items-center gap-[var(--space-12)] md:w-auto md:gap-[var(--space-24)]">
                    {/* Light mode */}
                    <div className="flex flex-1 items-center gap-[var(--space-6)] md:w-[140px] md:flex-none md:justify-end md:gap-[var(--space-8)]">
                      <div
                        className="size-[20px] shrink-0 rounded-full border border-border-subtle"
                        style={{ background: token.lightHex || "transparent" }}
                      />
                      <span className="text-body-s text-content-subtle md:order-first md:text-body-m">
                        {token.lightAlias || "--"}
                      </span>
                    </div>
                    {/* Dark mode */}
                    <div className="flex flex-1 items-center gap-[var(--space-6)] md:w-[140px] md:flex-none md:justify-end md:gap-[var(--space-8)]">
                      <div
                        className="size-[20px] shrink-0 rounded-full border border-border-subtle"
                        style={{ background: token.darkHex || "transparent" }}
                      />
                      <span className="text-body-s text-content-subtle md:order-first md:text-body-m">
                        {token.darkAlias || "--"}
                      </span>
                    </div>
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
