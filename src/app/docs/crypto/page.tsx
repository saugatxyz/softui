import { CodeBlock } from "@/components/docs/code-block"
import { Crypto, cryptos, cryptoNames } from "@/components/ui/crypto"

const cryptoRows = cryptos.map((crypto) => ({
  value: crypto,
  label: cryptoNames[crypto],
}))

export default function CryptoDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Crypto</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Cryptocurrency icons for wallets, trading, and financial applications
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Crypto } from "@/components/ui/crypto"

<Crypto crypto="btc" />
<Crypto crypto="eth" size={32} />
<Crypto crypto="sol" size={48} />`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Tokens</h2>
        <div className="flex flex-col">
          {cryptoRows.map((crypto) => (
            <div
              key={crypto.value}
              className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:min-w-[220px]">
                <p className="text-body-m text-content-strong">{crypto.label}</p>
                <p className="text-body-s text-content-subtle">{crypto.value}</p>
              </div>
              <div className="flex flex-wrap items-center gap-[var(--space-12)]">
                <Crypto crypto={crypto.value} size={24} />
                <Crypto crypto={crypto.value} size={32} />
                <Crypto crypto={crypto.value} size={48} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizes</h2>
          <p className="text-body-s text-content-subtle">
            Crypto icons can be rendered at any size. Default is 24px.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">Small</p>
              <p className="text-body-s text-content-subtle">16px</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Crypto crypto="btc" size={16} />
              <Crypto crypto="eth" size={16} />
              <Crypto crypto="sol" size={16} />
              <Crypto crypto="link" size={16} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">Default</p>
              <p className="text-body-s text-content-subtle">24px</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Crypto crypto="btc" size={24} />
              <Crypto crypto="eth" size={24} />
              <Crypto crypto="sol" size={24} />
              <Crypto crypto="link" size={24} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">Medium</p>
              <p className="text-body-s text-content-subtle">32px</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Crypto crypto="btc" size={32} />
              <Crypto crypto="eth" size={32} />
              <Crypto crypto="sol" size={32} />
              <Crypto crypto="link" size={32} />
            </div>
          </div>
          <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-24)] last:border-b-0 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-body-m text-content-strong">Large</p>
              <p className="text-body-s text-content-subtle">48px</p>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-8)]">
              <Crypto crypto="btc" size={48} />
              <Crypto crypto="eth" size={48} />
              <Crypto crypto="sol" size={48} />
              <Crypto crypto="link" size={48} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
