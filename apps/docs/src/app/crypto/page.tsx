"use client"

import * as React from "react"
import {
  RiArrowRightUpLine,
  RiArrowRightDownLine,
} from "@remixicon/react"

import { Crypto, cryptoNames, type CryptoType } from "@soft-ui/react/crypto"
import { Table } from "@soft-ui/react/table"
import { Badge } from "@soft-ui/react/badge"
import { Button } from "@soft-ui/react/button"
import { Dialog } from "@soft-ui/react/dialog"
import { Input } from "@soft-ui/react/input"
import { Separator } from "@soft-ui/react/separator"

// ============================================================================
// Mock Data
// ============================================================================

type Holding = {
  crypto: CryptoType
  ticker: string
  price: number
  holdings: number
  value: number
  change24h: number
}

const holdings: Holding[] = [
  { crypto: "btc", ticker: "BTC", price: 67432.18, holdings: 0.4521, value: 30483.36, change24h: 2.34 },
  { crypto: "eth", ticker: "ETH", price: 3521.42, holdings: 3.215, value: 11321.37, change24h: -1.12 },
  { crypto: "sol", ticker: "SOL", price: 178.93, holdings: 18.5, value: 3310.21, change24h: 5.67 },
  { crypto: "link", ticker: "LINK", price: 18.42, holdings: 85.0, value: 1565.70, change24h: 3.21 },
  { crypto: "ada", ticker: "ADA", price: 0.62, holdings: 1200.0, value: 744.00, change24h: -0.45 },
  { crypto: "dot", ticker: "DOT", price: 8.34, holdings: 42.0, value: 350.28, change24h: 1.88 },
  { crypto: "uni", ticker: "UNI", price: 12.56, holdings: 4.5, value: 56.52, change24h: -2.31 },
  { crypto: "usdc", ticker: "USDC", price: 1.0, holdings: 500.0, value: 500.00, change24h: 0.01 },
]

const totalBalance = holdings.reduce((sum, h) => sum + h.value, 0)
const totalChange = 3.2

const quickInvestOptions: { crypto: CryptoType; ticker: string; price: number }[] = [
  { crypto: "btc", ticker: "BTC", price: 67432.18 },
  { crypto: "eth", ticker: "ETH", price: 3521.42 },
  { crypto: "sol", ticker: "SOL", price: 178.93 },
  { crypto: "link", ticker: "LINK", price: 18.42 },
]

// ============================================================================
// Helpers
// ============================================================================

function formatCurrency(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function formatHoldings(value: number) {
  if (value >= 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 0 })
  if (value >= 1) return value.toLocaleString("en-US", { maximumFractionDigits: 4 })
  return value.toLocaleString("en-US", { maximumFractionDigits: 6 })
}

// ============================================================================
// Page
// ============================================================================

export default function CryptoDashboardPage() {
  const [investDialogOpen, setInvestDialogOpen] = React.useState(false)
  const [selectedCrypto, setSelectedCrypto] = React.useState<CryptoType | null>(null)
  const [investAmount, setInvestAmount] = React.useState("")

  function handleInvest(crypto: CryptoType) {
    setSelectedCrypto(crypto)
    setInvestAmount("")
    setInvestDialogOpen(true)
  }

  const selectedPrice = selectedCrypto
    ? holdings.find((h) => h.crypto === selectedCrypto)?.price ??
      quickInvestOptions.find((q) => q.crypto === selectedCrypto)?.price ??
      0
    : 0

  const estimatedTokens = investAmount && selectedPrice > 0
    ? parseFloat(investAmount) / selectedPrice
    : 0

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      {/* ================================================================ */}
      {/* Portfolio Header */}
      {/* ================================================================ */}
      <header className="flex flex-col gap-[var(--space-10)]">
        <p className="text-body-m text-content-subtle">Portfolio Balance</p>
        <div className="flex items-end gap-[var(--space-12)]">
          <h1 className="text-body-3xl-semibold tabular-nums">
            {formatCurrency(totalBalance)}
          </h1>
          <Badge
            variant={totalChange >= 0 ? "success" : "danger"}
            size="s"
            isEmphasized
            leadingIcon={
              totalChange >= 0 ? (
                <RiArrowRightUpLine />
              ) : (
                <RiArrowRightDownLine />
              )
            }
          >
            {totalChange >= 0 ? "+" : ""}
            {totalChange.toFixed(1)}%
          </Badge>
        </div>
        <p className="text-body-s text-content-muted">
          Updated just now
        </p>
      </header>

      <Separator />

      {/* ================================================================ */}
      {/* Holdings Table */}
      {/* ================================================================ */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <h2 className="text-body-xl-semibold">Holdings</h2>

        <Table.Root size="l">
          <Table.Header>
            <Table.Row isHeader>
              <Table.Head>Asset</Table.Head>
              <Table.Head align="right">Price</Table.Head>
              <Table.Head align="right">Holdings</Table.Head>
              <Table.Head align="right">Value</Table.Head>
              <Table.Head align="right">24h</Table.Head>
              <Table.Head align="right">Action</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {holdings.map((h) => (
              <Table.Row key={h.crypto}>
                <Table.TextCell
                  prefix={<Crypto crypto={h.crypto} size={28} />}
                  additionalInfo={h.ticker}
                  emphasized
                >
                  {cryptoNames[h.crypto]}
                </Table.TextCell>
                <Table.NumberCell>{formatCurrency(h.price)}</Table.NumberCell>
                <Table.NumberCell>{formatHoldings(h.holdings)}</Table.NumberCell>
                <Table.NumberCell>{formatCurrency(h.value)}</Table.NumberCell>
                <Table.BadgeCell
                  variant={h.change24h >= 0 ? "success" : "danger"}
                  isEmphasized
                  align="right"
                >
                  {h.change24h >= 0 ? "+" : ""}
                  {h.change24h.toFixed(2)}%
                </Table.BadgeCell>
                <Table.ActionsCell>
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => handleInvest(h.crypto)}
                  >
                    Invest
                  </Button>
                </Table.ActionsCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </section>

      <Separator />

      {/* ================================================================ */}
      {/* Quick Invest */}
      {/* ================================================================ */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h2 className="text-body-xl-semibold">Quick Invest</h2>
          <p className="text-body-m text-content-subtle">
            Start investing with a single click
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[var(--space-16)] sm:grid-cols-2 lg:grid-cols-4">
          {quickInvestOptions.map((opt) => (
            <div
              key={opt.crypto}
              className="flex flex-col gap-[var(--space-16)] rounded-[var(--radius-16)] border border-border-muted p-[var(--space-20)]"
            >
              <div className="flex items-center gap-[var(--space-10)]">
                <Crypto crypto={opt.crypto} size={32} />
                <div className="flex flex-col">
                  <span className="text-body-m font-[var(--font-weight-medium)] text-content-strong">
                    {cryptoNames[opt.crypto]}
                  </span>
                  <span className="text-body-s text-content-subtle">
                    {opt.ticker}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-l font-[var(--font-weight-semibold)] tabular-nums text-content-strong">
                  {formatCurrency(opt.price)}
                </span>
              </div>
              <Button
                variant="primary"
                size="s"
                onClick={() => handleInvest(opt.crypto)}
              >
                Buy {opt.ticker}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* Invest Dialog */}
      {/* ================================================================ */}
      <Dialog.Root open={investDialogOpen} onOpenChange={setInvestDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  {selectedCrypto && (
                    <span className="inline-flex items-center gap-[var(--space-8)]">
                      <Crypto crypto={selectedCrypto} size={24} />
                      Invest in {cryptoNames[selectedCrypto]}
                    </span>
                  )}
                </Dialog.Title>
                <Dialog.Close />
              </Dialog.Header>
              <Dialog.Body>
                <div className="flex flex-col gap-[var(--space-20)]">
                  <div className="flex flex-col gap-[var(--space-8)]">
                    <label className="text-body-m font-[var(--font-weight-medium)] text-content-strong">
                      Amount (USD)
                    </label>
                    <Input
                      size="l"
                      placeholder="0.00"
                      type="number"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(e.target.value)}
                    />
                  </div>
                  {investAmount && parseFloat(investAmount) > 0 && selectedCrypto && (
                    <div className="flex items-center justify-between rounded-[var(--radius-10)] bg-surface-interactive-default p-[var(--space-12)]">
                      <span className="text-body-m text-content-subtle">
                        You will receive (est.)
                      </span>
                      <span className="text-body-m font-[var(--font-weight-medium)] tabular-nums text-content-strong">
                        {estimatedTokens.toFixed(6)}{" "}
                        {holdings.find((h) => h.crypto === selectedCrypto)?.ticker ??
                          quickInvestOptions.find((q) => q.crypto === selectedCrypto)?.ticker}
                      </span>
                    </div>
                  )}
                </div>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                <Button
                  variant="primary"
                  disabled={!investAmount || parseFloat(investAmount) <= 0}
                  onClick={() => setInvestDialogOpen(false)}
                >
                  Confirm Investment
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
