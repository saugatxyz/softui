import { LayoutLeftIcon } from "@/icons"
import { getRadiusScale, getSpacingScale } from "@/lib/token-data"

export default function TokensSpacingPage() {
  const spacingScale = getSpacingScale()
  const radiusScale = getRadiusScale()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-24)] py-[var(--space-32)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex size-[20px] items-center justify-center text-content-strong">
          <LayoutLeftIcon className="size-5" />
        </div>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Spacing & Radius</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Tokens keep spacing and sizing decisions consistent.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Spacing</h2>
        <div className="flex flex-col">
          {spacingScale.map((item, index) => (
            <div
              key={item.token}
              className={`flex flex-col gap-[var(--space-10)] py-[var(--space-24)] ${
                index === spacingScale.length - 1
                  ? ""
                  : "border-b border-border-subtle"
              } md:flex-row md:items-center md:justify-between`}
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
              className={`flex flex-col gap-[var(--space-10)] py-[var(--space-24)] ${
                index === radiusScale.length - 1
                  ? ""
                  : "border-b border-border-subtle"
              } md:flex-row md:items-center md:justify-between`}
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
