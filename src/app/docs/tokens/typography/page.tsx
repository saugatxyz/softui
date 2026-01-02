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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-24)] py-[var(--space-32)]">
      <header className="flex flex-col gap-[var(--space-20)]">
        <div className="flex size-[20px] items-center justify-center text-content-strong">
          <InputMethodIcon className="size-5" />
        </div>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Typography</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Inter is used as primary typeface.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div>
          <h2 className="text-body-xl-semibold">Scale</h2>
          <p className="text-body-s text-content-subtle">
            Font size and line height pairs across the type system.
          </p>
        </div>
        <div className="flex flex-col">
          {typeScale.map((item, index) => (
            <div
              key={item.token}
              className={`flex flex-col gap-[var(--space-10)] py-[var(--space-24)] ${
                index === typeScale.length - 1
                  ? ""
                  : "border-b border-border-subtle"
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
