"use client"

import * as React from "react"
import {
  RiMoneyDollarCircleLine,
  RiAlertLine,
  RiCheckboxCircleLine,
  RiFileList3Line,
  RiDashboardLine,
  RiFileTextLine,
  RiGroupLine,
  RiSettings3Line,
  RiPieChartLine,
  RiMailLine,
  RiQuestionLine,
  RiAddLine,
  RiSearchLine,
  RiNotification3Line,
  RiArrowRightUpLine,
  RiArrowRightDownLine,
} from "@remixicon/react"

import { Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Tabs } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { IconButton } from "@/components/ui/icon-button"

// ============================================================================
// Types
// ============================================================================

type InvoiceStatus = "open" | "overdue" | "paid" | "draft"

type Invoice = {
  id: string
  client: string
  initials: string
  color: "blue" | "violet" | "emerald" | "orange" | "rose" | "cyan" | "amber" | "teal"
  description: string
  amount: number
  dueDate: string
  status: InvoiceStatus
}

// ============================================================================
// Mock Data
// ============================================================================

const invoices: Invoice[] = [
  {
    id: "INV-001",
    client: "Acme Corp",
    initials: "AC",
    color: "blue",
    description: "Website redesign - Phase 1",
    amount: 4250.0,
    dueDate: "2026-02-10",
    status: "open",
  },
  {
    id: "INV-002",
    client: "Globex Inc",
    initials: "GI",
    color: "violet",
    description: "Monthly retainer - January",
    amount: 3000.0,
    dueDate: "2026-01-28",
    status: "overdue",
  },
  {
    id: "INV-003",
    client: "Stark Industries",
    initials: "SI",
    color: "emerald",
    description: "API integration project",
    amount: 8750.0,
    dueDate: "2026-01-15",
    status: "paid",
  },
  {
    id: "INV-004",
    client: "Wayne Enterprises",
    initials: "WE",
    color: "orange",
    description: "Security audit & consulting",
    amount: 6200.0,
    dueDate: "2026-02-20",
    status: "open",
  },
  {
    id: "INV-005",
    client: "Umbrella Corp",
    initials: "UC",
    color: "rose",
    description: "Data migration services",
    amount: 2100.0,
    dueDate: "2026-01-20",
    status: "overdue",
  },
  {
    id: "INV-006",
    client: "Cyberdyne Systems",
    initials: "CS",
    color: "cyan",
    description: "Infrastructure setup",
    amount: 5400.0,
    dueDate: "2026-01-10",
    status: "paid",
  },
  {
    id: "INV-007",
    client: "Oscorp",
    initials: "OC",
    color: "amber",
    description: "Mobile app development",
    amount: 12800.0,
    dueDate: "2026-03-01",
    status: "draft",
  },
  {
    id: "INV-008",
    client: "Initech",
    initials: "IN",
    color: "teal",
    description: "TPS report automation",
    amount: 1850.0,
    dueDate: "2026-02-15",
    status: "open",
  },
  {
    id: "INV-009",
    client: "Globex Inc",
    initials: "GI",
    color: "violet",
    description: "Monthly retainer - February",
    amount: 3000.0,
    dueDate: "2026-02-28",
    status: "draft",
  },
  {
    id: "INV-010",
    client: "Stark Industries",
    initials: "SI",
    color: "emerald",
    description: "Support contract Q1",
    amount: 7500.0,
    dueDate: "2026-01-05",
    status: "paid",
  },
]

// ============================================================================
// Helpers
// ============================================================================

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const statusConfig: Record<
  InvoiceStatus,
  { label: string; variant: "warning" | "danger" | "success" | "neutral"; emphasized: boolean }
> = {
  open: { label: "Open", variant: "warning", emphasized: true },
  overdue: { label: "Overdue", variant: "danger", emphasized: true },
  paid: { label: "Paid", variant: "success", emphasized: true },
  draft: { label: "Draft", variant: "neutral", emphasized: false },
}

// Derived stats
const openInvoices = invoices.filter((i) => i.status === "open")
const overdueInvoices = invoices.filter((i) => i.status === "overdue")
const paidInvoices = invoices.filter((i) => i.status === "paid")

const totalOutstanding = [...openInvoices, ...overdueInvoices].reduce((sum, i) => sum + i.amount, 0)
const totalOverdue = overdueInvoices.reduce((sum, i) => sum + i.amount, 0)
const totalPaid = paidInvoices.reduce((sum, i) => sum + i.amount, 0)

// ============================================================================
// Sidebar Nav Items
// ============================================================================

const mainNavItems = [
  { label: "Dashboard", icon: RiDashboardLine, active: false },
  { label: "Invoices", icon: RiFileTextLine, active: true, badge: "5" },
  { label: "Clients", icon: RiGroupLine, active: false },
  { label: "Reports", icon: RiPieChartLine, active: false },
]

const secondaryNavItems = [
  { label: "Messages", icon: RiMailLine, badge: "3" },
  { label: "Settings", icon: RiSettings3Line },
  { label: "Help", icon: RiQuestionLine },
]

// ============================================================================
// Sidebar Component
// ============================================================================

function Sidebar() {
  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-border-muted md:flex md:flex-col">
      {/* Logo / Brand */}
      <div className="flex h-[var(--space-56)] items-center gap-[var(--space-10)] border-b border-border-muted px-[var(--space-20)]">
        <div className="flex size-[var(--space-32)] items-center justify-center rounded-[var(--radius-8)] bg-actions-primary-default">
          <RiFileTextLine className="size-[var(--space-18)] text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-body-m font-[var(--font-weight-semibold)] text-content-strong">
            InvoiceFlow
          </span>
          <span className="text-body-xs text-content-muted">Business</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col gap-[var(--space-4)] p-[var(--space-12)]">
        <div className="flex flex-col gap-[var(--space-2)]">
          {mainNavItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-[var(--space-10)] rounded-[var(--radius-8)] px-[var(--space-12)] py-[var(--space-8)] text-body-m transition-colors duration-200 ${
                item.active
                  ? "bg-surface-interactive-selected font-[var(--font-weight-medium)] text-content-strong"
                  : "text-content-subtle hover:bg-surface-interactive-hover hover:text-content-strong"
              }`}
            >
              <item.icon className="size-[var(--space-18)]" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant={item.active ? "neutral" : "neutral"} size="xs">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </div>

        <div className="my-[var(--space-8)]">
          <Separator />
        </div>

        <div className="flex flex-col gap-[var(--space-2)]">
          <span className="px-[var(--space-12)] py-[var(--space-4)] text-body-xs font-[var(--font-weight-medium)] uppercase tracking-wider text-content-muted">
            Support
          </span>
          {secondaryNavItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-[var(--space-10)] rounded-[var(--radius-8)] px-[var(--space-12)] py-[var(--space-8)] text-body-m text-content-subtle transition-colors duration-200 hover:bg-surface-interactive-hover hover:text-content-strong"
            >
              <item.icon className="size-[var(--space-18)]" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="info" size="xs" isEmphasized>
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Profile */}
        <div className="border-t border-border-muted pt-[var(--space-12)]">
          <div className="flex items-center gap-[var(--space-10)] rounded-[var(--radius-8)] px-[var(--space-8)] py-[var(--space-6)]">
            <Avatar size="s" initials="JD" isEmphasized color="blue" fallback="initials" />
            <div className="flex flex-1 flex-col">
              <span className="text-body-s font-[var(--font-weight-medium)] text-content-strong">
                Jane Doe
              </span>
              <span className="text-body-xs text-content-muted">jane@company.com</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

// ============================================================================
// Top Bar Component
// ============================================================================

function TopBar() {
  return (
    <div className="flex h-[var(--space-56)] items-center justify-between border-b border-border-muted px-[var(--space-24)]">
      <div className="w-[280px]">
        <Input
          size="s"
          variant="secondary"
          placeholder="Search invoices..."
          leadingIcon={<RiSearchLine />}
        />
      </div>
      <div className="flex items-center gap-[var(--space-8)]">
        <IconButton variant="ghost" size="s" aria-label="Notifications">
          <RiNotification3Line />
        </IconButton>
        <Button variant="primary" size="s" leadingIcon={<RiAddLine />}>
          New Invoice
        </Button>
      </div>
    </div>
  )
}

// ============================================================================
// Page
// ============================================================================

export default function InvoiceDashboardPage() {
  const [payDialogOpen, setPayDialogOpen] = React.useState(false)
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null)
  const [activeTab, setActiveTab] = React.useState<string>("all")

  function handlePay(invoice: Invoice) {
    setSelectedInvoice(invoice)
    setPayDialogOpen(true)
  }

  const filteredInvoices =
    activeTab === "all" ? invoices : invoices.filter((i) => i.status === activeTab)

  return (
    <div className="flex h-screen bg-surface-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-32)] px-[var(--space-24)] py-[var(--space-24)]">
            {/* ================================================================ */}
            {/* Header */}
            {/* ================================================================ */}
            <header className="flex items-center justify-between">
              <div className="flex flex-col gap-[var(--space-4)]">
                <h1 className="text-body-2xl-semibold">Invoices</h1>
                <p className="text-body-m text-content-subtle">
                  Track and manage all your invoices in one place
                </p>
              </div>
            </header>

            {/* ================================================================ */}
            {/* Summary Cards */}
            {/* ================================================================ */}
            <div className="grid grid-cols-1 gap-[var(--space-16)] sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Outstanding */}
              <div className="flex flex-col gap-[var(--space-12)] rounded-[var(--radius-16)] border border-border-muted p-[var(--space-20)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-s text-content-subtle">Outstanding</span>
                  <span className="flex size-[var(--space-28)] items-center justify-center rounded-[var(--radius-6)] bg-surface-feedback-warning-muted text-content-feedback-warning-strong">
                    <RiMoneyDollarCircleLine className="size-[var(--space-16)]" />
                  </span>
                </div>
                <div className="flex flex-col gap-[var(--space-4)]">
                  <span className="text-body-xl-semibold tabular-nums">
                    {formatCurrency(totalOutstanding)}
                  </span>
                  <div className="flex items-center gap-[var(--space-6)]">
                    <Badge variant="warning" size="xs">
                      {openInvoices.length + overdueInvoices.length}
                    </Badge>
                    <span className="text-body-xs text-content-muted">unpaid invoices</span>
                  </div>
                </div>
              </div>

              {/* Overdue */}
              <div className="flex flex-col gap-[var(--space-12)] rounded-[var(--radius-16)] border border-border-muted p-[var(--space-20)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-s text-content-subtle">Overdue</span>
                  <span className="flex size-[var(--space-28)] items-center justify-center rounded-[var(--radius-6)] bg-surface-feedback-danger-muted text-content-feedback-danger-strong">
                    <RiAlertLine className="size-[var(--space-16)]" />
                  </span>
                </div>
                <div className="flex flex-col gap-[var(--space-4)]">
                  <span className="text-body-xl-semibold tabular-nums">
                    {formatCurrency(totalOverdue)}
                  </span>
                  <div className="flex items-center gap-[var(--space-6)]">
                    <RiArrowRightUpLine className="size-[var(--space-14)] text-content-feedback-danger-strong" />
                    <span className="text-body-xs text-content-feedback-danger-strong">
                      {overdueInvoices.length} past due
                    </span>
                  </div>
                </div>
              </div>

              {/* Paid This Month */}
              <div className="flex flex-col gap-[var(--space-12)] rounded-[var(--radius-16)] border border-border-muted p-[var(--space-20)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-s text-content-subtle">Collected</span>
                  <span className="flex size-[var(--space-28)] items-center justify-center rounded-[var(--radius-6)] bg-surface-feedback-success-muted text-content-feedback-success-strong">
                    <RiCheckboxCircleLine className="size-[var(--space-16)]" />
                  </span>
                </div>
                <div className="flex flex-col gap-[var(--space-4)]">
                  <span className="text-body-xl-semibold tabular-nums">
                    {formatCurrency(totalPaid)}
                  </span>
                  <div className="flex items-center gap-[var(--space-6)]">
                    <RiArrowRightUpLine className="size-[var(--space-14)] text-content-feedback-success-strong" />
                    <span className="text-body-xs text-content-feedback-success-strong">
                      +12.5% from last month
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Invoices */}
              <div className="flex flex-col gap-[var(--space-12)] rounded-[var(--radius-16)] border border-border-muted p-[var(--space-20)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-s text-content-subtle">Total Invoices</span>
                  <span className="flex size-[var(--space-28)] items-center justify-center rounded-[var(--radius-6)] bg-surface-interactive-default text-content-subtle">
                    <RiFileList3Line className="size-[var(--space-16)]" />
                  </span>
                </div>
                <div className="flex flex-col gap-[var(--space-4)]">
                  <span className="text-body-xl-semibold tabular-nums">
                    {invoices.length}
                  </span>
                  <div className="flex items-center gap-[var(--space-6)]">
                    <RiArrowRightDownLine className="size-[var(--space-14)] text-content-muted" />
                    <span className="text-body-xs text-content-muted">
                      2 drafts pending
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================================ */}
            {/* Invoices Table */}
            {/* ================================================================ */}
            <section className="flex flex-col gap-[var(--space-16)]">
              <Tabs
                defaultValue="all"
                onValueChange={(value: string | number | null) => setActiveTab(String(value ?? "all"))}
                variant="stroke"
                size="m"
              >
                <Tabs.List>
                  <Tabs.Trigger value="all">
                    All ({invoices.length})
                  </Tabs.Trigger>
                  <Tabs.Trigger value="open">
                    Open ({openInvoices.length})
                  </Tabs.Trigger>
                  <Tabs.Trigger value="overdue">
                    Overdue ({overdueInvoices.length})
                  </Tabs.Trigger>
                  <Tabs.Trigger value="paid">
                    Paid ({paidInvoices.length})
                  </Tabs.Trigger>
                  <Tabs.Trigger value="draft">
                    Draft ({invoices.filter((i) => i.status === "draft").length})
                  </Tabs.Trigger>
                  <Tabs.Indicator />
                </Tabs.List>
              </Tabs>

              <Table.Root size="l">
                <Table.Header>
                  <Table.Row isHeader>
                    <Table.Head>Invoice</Table.Head>
                    <Table.Head>Client</Table.Head>
                    <Table.Head align="right">Amount</Table.Head>
                    <Table.Head>Due Date</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head align="right">Action</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredInvoices.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={6}>
                        <div className="flex items-center justify-center py-[var(--space-32)] text-body-m text-content-muted">
                          No invoices found
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <Table.Row key={invoice.id}>
                        <Table.TextCell emphasized additionalInfo={invoice.description}>
                          {invoice.id}
                        </Table.TextCell>
                        <Table.TextCell
                          prefix={
                            <Avatar
                              size="xs"
                              initials={invoice.initials}
                              isEmphasized
                              color={invoice.color}
                              fallback="initials"
                            />
                          }
                        >
                          {invoice.client}
                        </Table.TextCell>
                        <Table.NumberCell>{formatCurrency(invoice.amount)}</Table.NumberCell>
                        <Table.TextCell>{formatDate(invoice.dueDate)}</Table.TextCell>
                        <Table.BadgeCell
                          variant={statusConfig[invoice.status].variant}
                          isEmphasized={statusConfig[invoice.status].emphasized}
                        >
                          {statusConfig[invoice.status].label}
                        </Table.BadgeCell>
                        <Table.ActionsCell>
                          {invoice.status === "open" || invoice.status === "overdue" ? (
                            <Button
                              variant="primary"
                              size="xs"
                              onClick={() => handlePay(invoice)}
                            >
                              Pay
                            </Button>
                          ) : invoice.status === "draft" ? (
                            <Button variant="secondary" size="xs">
                              Send
                            </Button>
                          ) : (
                            <Button variant="ghost" size="xs">
                              View
                            </Button>
                          )}
                        </Table.ActionsCell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table.Root>
            </section>
          </div>
        </main>
      </div>

      {/* ================================================================ */}
      {/* Pay Invoice Dialog */}
      {/* ================================================================ */}
      <Dialog.Root open={payDialogOpen} onOpenChange={setPayDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Pay Invoice</Dialog.Title>
                <Dialog.Close />
              </Dialog.Header>
              <Dialog.Body>
                {selectedInvoice && (
                  <div className="flex flex-col gap-[var(--space-20)]">
                    {/* Invoice summary */}
                    <div className="flex flex-col gap-[var(--space-12)] rounded-[var(--radius-10)] bg-surface-interactive-default p-[var(--space-16)]">
                      <div className="flex items-center justify-between">
                        <span className="text-body-m text-content-subtle">Invoice</span>
                        <span className="text-body-m font-[var(--font-weight-medium)] text-content-strong">
                          {selectedInvoice.id}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-body-m text-content-subtle">Client</span>
                        <span className="text-body-m font-[var(--font-weight-medium)] text-content-strong">
                          {selectedInvoice.client}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-body-m text-content-subtle">Description</span>
                        <span className="text-body-m text-content-strong">
                          {selectedInvoice.description}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-body-m font-[var(--font-weight-semibold)] text-content-strong">
                          Amount Due
                        </span>
                        <span className="text-body-l font-[var(--font-weight-semibold)] tabular-nums text-content-strong">
                          {formatCurrency(selectedInvoice.amount)}
                        </span>
                      </div>
                    </div>

                    {/* Payment method */}
                    <div className="flex flex-col gap-[var(--space-8)]">
                      <label className="text-body-m font-[var(--font-weight-medium)] text-content-strong">
                        Payment Method
                      </label>
                      <Select size="l" variant="secondary" defaultValue="bank">
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Icon />
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Positioner>
                            <Select.Popup>
                              <Select.List>
                                <Select.Item value="bank">
                                  <Select.ItemIndicator />
                                  <Select.ItemText>Bank Transfer</Select.ItemText>
                                </Select.Item>
                                <Select.Item value="card">
                                  <Select.ItemIndicator />
                                  <Select.ItemText>Credit Card</Select.ItemText>
                                </Select.Item>
                                <Select.Item value="paypal">
                                  <Select.ItemIndicator />
                                  <Select.ItemText>PayPal</Select.ItemText>
                                </Select.Item>
                              </Select.List>
                            </Select.Popup>
                          </Select.Positioner>
                        </Select.Portal>
                      </Select>
                    </div>
                  </div>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                <Button
                  variant="primary"
                  onClick={() => setPayDialogOpen(false)}
                >
                  Confirm Payment
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
