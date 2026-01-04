import { LayoutLeftIcon } from "@/icons"
import { getRadiusScale, getSpacingScale } from "@/lib/token-data"

export default function TokensSpacingPage() {
  const spacingScale = getSpacingScale()
  const radiusScale = getRadiusScale()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex size-[32px] items-center justify-center text-content-strong">
          <LayoutLeftIcon className="size-8" />
        </div>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Spacing & Radius</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Standardized spacing and sizing decisions
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Spacing</h2>
        <div className="flex flex-col">
          {spacingScale.map((item, index) => (
            <div
              key={item.token}
              className={`flex items-center justify-between py-[var(--space-16)] ${
                index === spacingScale.length - 1
                  ? ""
                  : "border-b border-border-muted"
              }`}
            >
              <p className="text-body-m text-content-strong">{item.token}</p>
              <div className="text-body-m text-content-subtle">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Radius</h2>
        <div className="flex flex-col">
          {radiusScale.map((item, index) => (
            <div
              key={item.token}
              className={`flex items-center justify-between py-[var(--space-16)] ${
                index === radiusScale.length - 1
                  ? ""
                  : "border-b border-border-muted"
              }`}
            >
              <p className="text-body-m text-content-strong">{item.token}</p>
              <div className="text-body-m text-content-subtle">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
