import { InputMethodIcon } from "@/icons"
import { getTypographyScale } from "@/lib/token-data"

export default function TokensTypographyPage() {
  const typeScale = getTypographyScale()
  const formatTypeValue = (value: string) => {
    const [size, line] = value.split("/").map((part) => part.trim())
    if (!size || !line) return value
    return `${size}px size / ${line}px line height`
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex size-[32px] items-center justify-center text-content-strong">
          <InputMethodIcon className="size-8" />
        </div>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Typography</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Type styles for hierarchy and readability
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-20)]">
        <div>
          <h2 className="text-body-xl-semibold">Scale</h2>
          <p className="text-body-m text-content-subtle">
            Inter used as primary typeface
          </p>
        </div>
        <div className="flex flex-col">
          {typeScale.map((item, index) => (
            <div
              key={item.token}
              className={`flex flex-col gap-[var(--space-10)] py-[var(--space-16)] ${
                index === typeScale.length - 1
                  ? ""
                  : "border-b border-border-muted"
              } md:grid md:grid-cols-[140px_240px_1fr] md:items-center md:gap-[var(--space-16)]`}
            >
              <p className="text-body-m text-content-strong">{item.token}</p>
              <p className="text-body-m text-content-subtle">
                {formatTypeValue(item.value)}
              </p>
              <p
                className="text-content-strong md:justify-self-end md:text-right"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: `var(--font-size-${item.token})`,
                  lineHeight: `var(--line-height-${item.token})`,
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                The quick brown fox
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
