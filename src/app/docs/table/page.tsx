"use client"

import * as React from "react"
import {
  RiCheckboxCircleFill,
  RiMoreLine,
  RiArrowRightUpBoxFill,
  RiArrowRightDownBoxFill,
  RiGitBranchLine,
  RiExternalLinkLine,
  RiMailLine,
  RiFlag2Fill,
  RiCircleLine,
  RiLoader4Line,
  RiErrorWarningFill,
} from "@remixicon/react"
import { CodeBlock } from "@/components/docs/code-block"
import { Table, type SortDirection } from "@/components/ui/table"
import { IconButton } from "@/components/ui/icon-button"
import { Avatar } from "@/components/ui/avatar"
import { type LogoType } from "@/components/ui/logo"
import { type CryptoType } from "@/components/ui/crypto"

// =============================================================================
// Team Directory Data
// =============================================================================

const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Engineering Lead",
    department: "Engineering",
    status: "active",
    startDate: "Mar 2022",
    avatar: "/avatars/avatar-1.png",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@company.com",
    role: "Senior Designer",
    department: "Design",
    status: "active",
    startDate: "Aug 2023",
    avatar: "/avatars/avatar-2.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    role: "Product Manager",
    department: "Product",
    status: "away",
    startDate: "Jan 2024",
    avatar: "/avatars/avatar-3.png",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Backend Engineer",
    department: "Engineering",
    status: "active",
    startDate: "Nov 2023",
    avatar: "/avatars/avatar-4.png",
  },
  {
    id: 5,
    name: "Olivia Thompson",
    email: "olivia.t@company.com",
    role: "Marketing Lead",
    department: "Marketing",
    status: "offline",
    startDate: "Jun 2021",
    avatar: "/avatars/avatar-5.png",
  },
]

const teamStatusConfig = {
  active: { label: "Active", variant: "success" as const },
  away: { label: "Away", variant: "warning" as const },
  offline: { label: "Offline", variant: "neutral" as const },
}

// =============================================================================
// Customer Accounts Data (B2B SaaS)
// =============================================================================

const customers: Array<{
  id: number
  logo: LogoType
  name: string
  plan: string
  mrr: number
  seats: number
  health: "healthy" | "at-risk" | "churning"
  lastActive: string
}> = [
  { id: 1, logo: "linear", name: "Linear", plan: "Enterprise", mrr: 4500, seats: 48, health: "healthy", lastActive: "2 hours ago" },
  { id: 2, logo: "framer", name: "Framer", plan: "Business", mrr: 1200, seats: 15, health: "healthy", lastActive: "5 mins ago" },
  { id: 3, logo: "discord", name: "Discord", plan: "Enterprise", mrr: 8900, seats: 120, health: "at-risk", lastActive: "3 days ago" },
  { id: 4, logo: "loom", name: "Loom", plan: "Business", mrr: 890, seats: 12, health: "healthy", lastActive: "1 hour ago" },
  { id: 5, logo: "replit", name: "Replit", plan: "Startup", mrr: 299, seats: 5, health: "churning", lastActive: "2 weeks ago" },
]

const healthConfig = {
  healthy: { label: "Healthy", variant: "success" as const },
  "at-risk": { label: "At Risk", variant: "warning" as const },
  churning: { label: "Churning", variant: "danger" as const },
}

// =============================================================================
// Transactions Data (Stripe-style)
// =============================================================================

const transactions = [
  { id: "pi_3Ox2K...", customer: "Acme Corp", email: "billing@acme.co", amount: 2499.00, status: "succeeded", method: "Visa •••• 4242", date: "Jan 8, 2025" },
  { id: "pi_3Ox1J...", customer: "TechStart Inc", email: "ap@techstart.io", amount: 899.00, status: "succeeded", method: "Mastercard •••• 5555", date: "Jan 8, 2025" },
  { id: "pi_3Ox0H...", customer: "Global Systems", email: "finance@global.sys", amount: 4999.00, status: "pending", method: "ACH Transfer", date: "Jan 7, 2025" },
  { id: "pi_3Owz9...", customer: "StartupXYZ", email: "team@startupxyz.com", amount: 149.00, status: "failed", method: "Visa •••• 1234", date: "Jan 7, 2025" },
  { id: "pi_3Owy8...", customer: "Enterprise Ltd", email: "accounts@ent.ltd", amount: 12500.00, status: "succeeded", method: "Wire Transfer", date: "Jan 6, 2025" },
]

const paymentStatusConfig = {
  succeeded: { label: "Succeeded", variant: "success" as const },
  pending: { label: "Pending", variant: "warning" as const },
  failed: { label: "Failed", variant: "danger" as const },
}

// =============================================================================
// Project Tasks Data (Linear-style)
// =============================================================================

const tasks = [
  {
    id: "ENG-1842",
    title: "Implement OAuth2 PKCE flow for mobile apps",
    status: "in-progress",
    priority: "high",
    assignee: { name: "Sarah C.", avatar: "/avatars/avatar-1.png" },
    dueDate: "Jan 12",
  },
  {
    id: "ENG-1841",
    title: "Fix memory leak in WebSocket connection handler",
    status: "in-progress",
    priority: "urgent",
    assignee: { name: "David K.", avatar: "/avatars/avatar-4.png" },
    dueDate: "Jan 9",
  },
  {
    id: "ENG-1840",
    title: "Add rate limiting to public API endpoints",
    status: "todo",
    priority: "medium",
    assignee: { name: "Marcus J.", avatar: "/avatars/avatar-2.png" },
    dueDate: "Jan 15",
  },
  {
    id: "ENG-1839",
    title: "Update dependencies to fix security vulnerabilities",
    status: "done",
    priority: "high",
    assignee: { name: "Emily R.", avatar: "/avatars/avatar-3.png" },
    dueDate: "Jan 5",
  },
  {
    id: "ENG-1838",
    title: "Optimize database queries for dashboard loading",
    status: "todo",
    priority: "low",
    assignee: { name: "Olivia T.", avatar: "/avatars/avatar-5.png" },
    dueDate: "Jan 20",
  },
]

const taskStatusConfig = {
  "todo": { label: "Todo", variant: "neutral" as const, icon: RiCircleLine },
  "in-progress": { label: "In Progress", variant: "info" as const, icon: RiLoader4Line },
  "done": { label: "Done", variant: "success" as const, icon: RiCheckboxCircleFill },
}

const priorityConfig = {
  urgent: { label: "Urgent" },
  high: { label: "High" },
  medium: { label: "Medium" },
  low: { label: "Low" },
}

// =============================================================================
// Crypto Portfolio Data
// =============================================================================

const portfolio: Array<{
  id: number
  crypto: CryptoType
  symbol: string
  name: string
  holdings: number
  avgCost: number
  currentPrice: number
  change24h: number
}> = [
  { id: 1, crypto: "btc", symbol: "BTC", name: "Bitcoin", holdings: 0.8542, avgCost: 42150, currentPrice: 97284.50, change24h: 2.34 },
  { id: 2, crypto: "eth", symbol: "ETH", name: "Ethereum", holdings: 12.5, avgCost: 2180, currentPrice: 3421.80, change24h: -1.25 },
  { id: 3, crypto: "sol", symbol: "SOL", name: "Solana", holdings: 145.0, avgCost: 85, currentPrice: 198.45, change24h: 5.67 },
  { id: 4, crypto: "link", symbol: "LINK", name: "Chainlink", holdings: 500.0, avgCost: 15.50, currentPrice: 22.18, change24h: -0.89 },
  { id: 5, crypto: "usdc", symbol: "USDC", name: "USD Coin", holdings: 10000.0, avgCost: 1.00, currentPrice: 1.00, change24h: 0.00 },
]

// =============================================================================
// Deployments Data (Vercel-style)
// =============================================================================

const deployments = [
  { id: 1, commit: "feat: add dark mode toggle", branch: "main", status: "ready", environment: "Production", time: "2m ago", url: "app.example.com" },
  { id: 2, commit: "fix: resolve auth redirect loop", branch: "main", status: "ready", environment: "Production", time: "1h ago", url: "app.example.com" },
  { id: 3, commit: "wip: new onboarding flow", branch: "feature/onboarding", status: "building", environment: "Preview", time: "5m ago", url: "onboarding-abc123.example.com" },
  { id: 4, commit: "chore: update deps", branch: "chore/deps", status: "error", environment: "Preview", time: "15m ago", url: null },
  { id: 5, commit: "refactor: extract auth module", branch: "refactor/auth", status: "ready", environment: "Preview", time: "3h ago", url: "auth-def456.example.com" },
]

const deploymentStatusConfig = {
  ready: { icon: RiCheckboxCircleFill, color: "text-content-feedback-success-strong", bg: "bg-surface-feedback-success-muted" },
  building: { icon: RiLoader4Line, color: "text-content-feedback-info-strong", bg: "bg-surface-feedback-info-muted" },
  error: { icon: RiErrorWarningFill, color: "text-content-feedback-danger-strong", bg: "bg-surface-feedback-danger-muted" },
}

// =============================================================================
// Capability Demos
// =============================================================================

function SizesDemo() {
  const sizeLabels = { s: "Small", m: "Medium", l: "Large", xl: "Extra Large" }
  return (
    <div className="flex flex-col gap-[var(--space-24)]">
      {(["s", "m", "l", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-[var(--space-8)]">
          <span className="text-body-s text-content-muted">{sizeLabels[size]}</span>
          <Table.Root size={size}>
            <Table.Header>
              <Table.Row isHeader>
                <Table.Head>Name</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head align="right">Amount</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.TextCell
                  prefix={<Table.Prefix type="avatar" avatarInitials="AC" />}
                  additionalInfo="billing@acme.co"
                  emphasized
                >
                  Acme Corp
                </Table.TextCell>
                <Table.BadgeCell variant="success">Active</Table.BadgeCell>
                <Table.NumberCell>$2,499.00</Table.NumberCell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </div>
      ))}
    </div>
  )
}

function CellTypesDemo() {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row isHeader>
          <Table.Head>Cell Type</Table.Head>
          <Table.Head>Example</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>TextCell</Table.Cell>
          <Table.TextCell emphasized>Primary text with emphasis</Table.TextCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>TextCell + additionalInfo</Table.Cell>
          <Table.TextCell additionalInfo="Secondary info inline">Primary text</Table.TextCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>NumberCell</Table.Cell>
          <Table.NumberCell>$12,345.67</Table.NumberCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>BadgeCell</Table.Cell>
          <Table.BadgeCell variant="success">Active</Table.BadgeCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>AvatarGroupCell</Table.Cell>
          <Table.AvatarGroupCell
            avatars={[
              { src: "/avatars/avatar-1.png" },
              { src: "/avatars/avatar-2.png" },
              { src: "/avatars/avatar-3.png" },
            ]}
            max={3}
          />
        </Table.Row>
        <Table.Row>
          <Table.Cell>ProgressCell</Table.Cell>
          <Table.ProgressCell value={65} />
        </Table.Row>
        <Table.Row>
          <Table.Cell>ActionsCell</Table.Cell>
          <Table.ActionsCell>
            <IconButton variant="ghost" size="2xs"><RiMoreLine /></IconButton>
          </Table.ActionsCell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

function PrefixTypesDemo() {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row isHeader>
          <Table.Head>Prefix Type</Table.Head>
          <Table.Head>Example</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Icon</Table.Cell>
          <Table.TextCell prefix={<Table.Prefix type="icon" icon={<RiFlag2Fill />} />}>
            Plain icon prefix
          </Table.TextCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Icon Emphasized</Table.Cell>
          <Table.TextCell prefix={<Table.Prefix type="icon-emphasized-blue" icon={<RiFlag2Fill />} />}>
            Emphasized with background
          </Table.TextCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Logo</Table.Cell>
          <Table.TextCell prefix={<Table.Prefix type="logo" logo="linear" />}>
            Company logo
          </Table.TextCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Token</Table.Cell>
          <Table.TextCell prefix={<Table.Prefix type="token" token="eth" />}>
            Crypto token
          </Table.TextCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Avatar</Table.Cell>
          <Table.TextCell prefix={<Table.Prefix type="avatar" avatarInitials="JD" />}>
            User avatar
          </Table.TextCell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

function SelectionDemo() {
  const [selected, setSelected] = React.useState<Set<number>>(new Set([2]))
  const items = [
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" },
    { id: 3, name: "Item Three" },
  ]
  const allSelected = selected.size === items.length
  const someSelected = selected.size > 0 && selected.size < items.length

  return (
    <Table.Root fixedLayout>
      <Table.Header>
        <Table.Row isHeader>
          <Table.CheckboxCell
            checked={allSelected}
            indeterminate={someSelected}
            onCheckedChange={() => {
              if (allSelected) setSelected(new Set())
              else setSelected(new Set(items.map(i => i.id)))
            }}
          />
          <Table.Head>Name</Table.Head>
          <Table.Head className="w-[120px]">Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id} selected={selected.has(item.id)}>
            <Table.CheckboxCell
              checked={selected.has(item.id)}
              onCheckedChange={() => {
                const next = new Set(selected)
                if (next.has(item.id)) next.delete(item.id)
                else next.add(item.id)
                setSelected(next)
              }}
            />
            <Table.TextCell>{item.name}</Table.TextCell>
            <Table.BadgeCell variant={selected.has(item.id) ? "info" : "neutral"}>
              {selected.has(item.id) ? "Selected" : "Unselected"}
            </Table.BadgeCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const sortingData = [
  { name: "Alice", amount: 1200 },
  { name: "Bob", amount: 800 },
  { name: "Charlie", amount: 2400 },
]

function SortingDemo() {
  const [sortDir, setSortDir] = React.useState<"asc" | "desc" | null>("desc")
  const sorted = React.useMemo(() => {
    if (!sortDir) return sortingData
    return [...sortingData].sort((a, b) => sortDir === "asc" ? a.amount - b.amount : b.amount - a.amount)
  }, [sortDir])

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row isHeader>
          <Table.Head>Name</Table.Head>
          <Table.Head
            align="right"
            sortable
            sortDirection={sortDir}
            onSort={() => setSortDir(prev => prev === "asc" ? "desc" : prev === "desc" ? null : "asc")}
          >
            Amount
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sorted.map((row) => (
          <Table.Row key={row.name}>
            <Table.TextCell>{row.name}</Table.TextCell>
            <Table.NumberCell>${row.amount.toLocaleString()}</Table.NumberCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

// =============================================================================
// Page Component
// =============================================================================

export default function TableDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-48)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Table</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Display structured data in rows and columns with sorting, selection, and rich cell types.
          </p>
        </div>
      </header>

      <section className="flex flex-col gap-[var(--space-10)]">
        <CodeBlock
          code={`import { Table } from "@/components/ui/table"

<Table.Root>
  <Table.Header>
    <Table.Row isHeader>
      <Table.Head>Name</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head align="right">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.TextCell emphasized>Acme Corp</Table.TextCell>
      <Table.BadgeCell variant="success">Active</Table.BadgeCell>
      <Table.NumberCell>$2,499.00</Table.NumberCell>
    </Table.Row>
  </Table.Body>
</Table.Root>`}
        />
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sizes</h2>
          <p className="text-body-m text-content-subtle">
            Four row heights: small (40px), medium (48px), large (60px), and extra large (72px). Large and extra large enable stacked text cells.
          </p>
        </div>
        <SizesDemo />
      </section>

      {/* Cell Types */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Cell Types</h2>
          <p className="text-body-m text-content-subtle">
            Specialized cells for text, numbers, badges, avatars, progress, and actions.
          </p>
        </div>
        <CellTypesDemo />
      </section>

      {/* Prefix Types */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Prefix Types</h2>
          <p className="text-body-m text-content-subtle">
            Icons, logos, tokens, and emphasized icons as cell prefixes.
          </p>
        </div>
        <PrefixTypesDemo />
      </section>

      {/* Selection */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Selection</h2>
          <p className="text-body-m text-content-subtle">
            Row selection with checkboxes and indeterminate state.
          </p>
        </div>
        <SelectionDemo />
      </section>

      {/* Sorting */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h2 className="text-body-xl-semibold">Sorting</h2>
          <p className="text-body-m text-content-subtle">
            Sortable columns with ascending/descending indicators.
          </p>
        </div>
        <SortingDemo />
      </section>

      {/* Examples Header */}
      <div className="flex flex-col gap-[var(--space-4)] border-t border-border-subtle pt-[var(--space-24)]">
        <h2 className="text-body-2xl-semibold">Examples</h2>
        <p className="text-body-m text-content-subtle">
          Real-world table patterns combining multiple features.
        </p>
      </div>

      {/* Team Directory */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h3 className="text-body-xl-semibold">Team Directory</h3>
          <p className="text-body-m text-content-subtle">
            Employee directory with avatars, roles, and status indicators.
          </p>
        </div>
        <TeamDirectoryTable />
      </section>

      {/* Customer Accounts */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h3 className="text-body-xl-semibold">Customer Accounts</h3>
          <p className="text-body-m text-content-subtle">
            B2B customer list with company logos, subscription details, and health scores.
          </p>
        </div>
        <CustomerAccountsTable />
      </section>

      {/* Transactions */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h3 className="text-body-xl-semibold">Recent Transactions</h3>
          <p className="text-body-m text-content-subtle">
            Payment history with amounts, status badges, and payment methods.
          </p>
        </div>
        <TransactionsTable />
      </section>

      {/* Project Tasks */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h3 className="text-body-xl-semibold">Project Tasks</h3>
          <p className="text-body-m text-content-subtle">
            Issue tracker with priorities, assignees, and status.
          </p>
        </div>
        <ProjectTasksTable />
      </section>

      {/* Crypto Portfolio */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h3 className="text-body-xl-semibold">Portfolio Holdings</h3>
          <p className="text-body-m text-content-subtle">
            Crypto portfolio with holdings, prices, and profit/loss calculations.
          </p>
        </div>
        <CryptoPortfolioTable />
      </section>

      {/* Deployments */}
      <section className="flex flex-col gap-[var(--space-20)]">
        <div className="flex flex-col gap-[var(--space-4)]">
          <h3 className="text-body-xl-semibold">Deployments</h3>
          <p className="text-body-m text-content-subtle">
            Deployment history with commit messages, environments, and status.
          </p>
        </div>
        <DeploymentsTable />
      </section>
    </div>
  )
}

// =============================================================================
// Team Directory Table
// =============================================================================

function TeamDirectoryTable() {
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set())

  const allSelected = selectedIds.size === teamMembers.length
  const someSelected = selectedIds.size > 0 && selectedIds.size < teamMembers.length

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(teamMembers.map((m) => m.id)))
    }
  }

  const toggleOne = (id: number) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedIds(newSet)
  }

  return (
    <div>
      <Table.Root size="l">
        <Table.Header>
          <Table.Row isHeader>
            <Table.CheckboxCell
              checked={allSelected}
              indeterminate={someSelected}
              onCheckedChange={toggleAll}
            />
            <Table.Head>Employee</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Department</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head align="right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {teamMembers.map((member) => {
            const status = teamStatusConfig[member.status as keyof typeof teamStatusConfig]
            return (
              <Table.Row key={member.id} selected={selectedIds.has(member.id)}>
                <Table.CheckboxCell
                  checked={selectedIds.has(member.id)}
                  onCheckedChange={() => toggleOne(member.id)}
                />
                <Table.TextCell
                  prefix={<Table.Prefix type="avatar" avatarSrc={member.avatar} avatarInitials={member.name.split(" ").map(n => n[0]).join("")} />}
                  additionalInfo={member.email}
                  emphasized
                >
                  {member.name}
                </Table.TextCell>
                <Table.Cell>{member.role}</Table.Cell>
                <Table.Cell>{member.department}</Table.Cell>
                <Table.BadgeCell variant={status.variant}>
                  {status.label}
                </Table.BadgeCell>
                <Table.ActionsCell>
                  <IconButton variant="ghost" size="2xs">
                    <RiMailLine />
                  </IconButton>
                  <IconButton variant="ghost" size="2xs">
                    <RiMoreLine />
                  </IconButton>
                </Table.ActionsCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

// =============================================================================
// Customer Accounts Table
// =============================================================================

function CustomerAccountsTable() {
  const [sortColumn, setSortColumn] = React.useState<string | null>("mrr")
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"))
      if (sortDirection === "desc") {
        setSortColumn(null)
      }
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const sortedCustomers = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return customers

    return [...customers].sort((a, b) => {
      const aVal = a[sortColumn as keyof typeof a]
      const bVal = b[sortColumn as keyof typeof b]

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })
  }, [sortColumn, sortDirection])

  return (
    <div>
      <Table.Root>
        <Table.Header>
          <Table.Row isHeader>
            <Table.Head>Company</Table.Head>
            <Table.Head>Plan</Table.Head>
            <Table.Head
              sortable
              sortDirection={sortColumn === "mrr" ? sortDirection : null}
              onSort={() => handleSort("mrr")}
              align="right"
            >
              MRR
            </Table.Head>
            <Table.Head
              sortable
              sortDirection={sortColumn === "seats" ? sortDirection : null}
              onSort={() => handleSort("seats")}
              align="right"
            >
              Seats
            </Table.Head>
            <Table.Head>Health</Table.Head>
            <Table.Head align="right">Last Active</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedCustomers.map((customer) => {
            const health = healthConfig[customer.health]
            return (
              <Table.Row key={customer.id}>
                <Table.TextCell
                  prefix={<Table.Prefix type="logo" logo={customer.logo} />}
                  emphasized
                >
                  {customer.name}
                </Table.TextCell>
                <Table.Cell>{customer.plan}</Table.Cell>
                <Table.NumberCell>
                  ${customer.mrr.toLocaleString()}
                </Table.NumberCell>
                <Table.NumberCell>{customer.seats}</Table.NumberCell>
                <Table.BadgeCell variant={health.variant}>
                  {health.label}
                </Table.BadgeCell>
                <Table.NumberCell>{customer.lastActive}</Table.NumberCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

// =============================================================================
// Transactions Table
// =============================================================================

function TransactionsTable() {
  return (
    <div>
      <Table.Root>
        <Table.Header>
          <Table.Row isHeader>
            <Table.Head>Amount</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Customer</Table.Head>
            <Table.Head>Payment Method</Table.Head>
            <Table.Head align="right">Date</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions.map((tx) => {
            const status = paymentStatusConfig[tx.status as keyof typeof paymentStatusConfig]
            return (
              <Table.Row key={tx.id}>
                <Table.TextCell additionalInfo={tx.id} emphasized>
                  ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Table.TextCell>
                <Table.BadgeCell variant={status.variant}>
                  {status.label}
                </Table.BadgeCell>
                <Table.TextCell>{tx.customer}</Table.TextCell>
                <Table.Cell>{tx.method}</Table.Cell>
                <Table.NumberCell>{tx.date}</Table.NumberCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

// =============================================================================
// Project Tasks Table
// =============================================================================

function ProjectTasksTable() {
  return (
    <div>
      <Table.Root size="xl">
        <Table.Header>
          <Table.Row isHeader>
            <Table.Head>Task</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Priority</Table.Head>
            <Table.Head>Assignee</Table.Head>
            <Table.Head align="right">Due</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => {
            const status = taskStatusConfig[task.status as keyof typeof taskStatusConfig]
            const priority = priorityConfig[task.priority as keyof typeof priorityConfig]
            const StatusIcon = status.icon
            return (
              <Table.Row key={task.id}>
                <Table.TextCell additionalInfo={task.id} emphasized>
                  {task.title}
                </Table.TextCell>
                <Table.Cell>
                  <span className="inline-flex items-center gap-[var(--space-6)]">
                    <Table.Icon tone={task.status === "done" ? "success" : task.status === "in-progress" ? "info" : "default"}>
                      <StatusIcon />
                    </Table.Icon>
                    <span>{status.label}</span>
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="inline-flex items-center gap-[var(--space-6)]">
                    <Table.Icon tone={task.priority === "urgent" ? "danger" : task.priority === "high" ? "warning" : "default"}>
                      <RiFlag2Fill />
                    </Table.Icon>
                    <span>{priority.label}</span>
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="inline-flex items-center gap-[var(--space-8)]">
                    <Avatar size="2xs" src={task.assignee.avatar} />
                    <span>{task.assignee.name}</span>
                  </span>
                </Table.Cell>
                <Table.NumberCell>{task.dueDate}</Table.NumberCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

// =============================================================================
// Crypto Portfolio Table
// =============================================================================

function CryptoPortfolioTable() {
  return (
    <div>
      <Table.Root size="l">
        <Table.Header>
          <Table.Row isHeader>
            <Table.Head>Asset</Table.Head>
            <Table.Head align="right">Holdings</Table.Head>
            <Table.Head align="right">Avg Cost</Table.Head>
            <Table.Head align="right">Current Price</Table.Head>
            <Table.Head align="right">24h</Table.Head>
            <Table.Head align="right">P&L</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {portfolio.map((asset) => {
            const value = asset.holdings * asset.currentPrice
            const cost = asset.holdings * asset.avgCost
            const pnl = value - cost
            const isPositive = pnl >= 0

            return (
              <Table.Row key={asset.id}>
                <Table.TextCell
                  prefix={<Table.Prefix type="token" token={asset.crypto} />}
                  additionalInfo={asset.symbol}
                  emphasized
                >
                  {asset.name}
                </Table.TextCell>
                <Table.NumberCell>
                  {asset.holdings.toLocaleString(undefined, { minimumFractionDigits: asset.holdings < 10 ? 4 : 2 })}
                </Table.NumberCell>
                <Table.NumberCell>
                  ${asset.avgCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Table.NumberCell>
                <Table.NumberCell>
                  ${asset.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Table.NumberCell>
                <Table.Cell className="text-right">
                  <span className={`inline-flex items-center gap-[var(--space-4)] ${
                    asset.change24h > 0 ? "text-content-feedback-success-strong" :
                    asset.change24h < 0 ? "text-content-feedback-danger-strong" :
                    "text-content-subtle"
                  }`}>
                    {asset.change24h > 0 ? (
                      <RiArrowRightUpBoxFill className="size-[16px]" />
                    ) : asset.change24h < 0 ? (
                      <RiArrowRightDownBoxFill className="size-[16px]" />
                    ) : null}
                    {asset.change24h > 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                  </span>
                </Table.Cell>
                <Table.Cell className="text-right">
                  <span className={isPositive ? "text-content-feedback-success-strong" : "text-content-feedback-danger-strong"}>
                    {isPositive ? "+" : ""}${Math.abs(pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

// =============================================================================
// Deployments Table
// =============================================================================

function DeploymentsTable() {
  return (
    <div>
      <Table.Root size="l">
        <Table.Header>
          <Table.Row isHeader>
            <Table.Head>Deployment</Table.Head>
            <Table.Head>Environment</Table.Head>
            <Table.Head>Branch</Table.Head>
            <Table.Head align="right">Time</Table.Head>
            <Table.Head align="right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {deployments.map((deploy) => {
            const status = deploymentStatusConfig[deploy.status as keyof typeof deploymentStatusConfig]
            const StatusIcon = status.icon
            return (
              <Table.Row key={deploy.id}>
                <Table.TextCell
                  prefix={
                    <Table.Prefix
                      type={`icon-emphasized-${deploy.status === "ready" ? "success" : deploy.status === "error" ? "danger" : "purple"}`}
                      icon={<StatusIcon />}
                    />
                  }
                  additionalInfo={deploy.url || "Build failed"}
                  emphasized
                >
                  {deploy.commit}
                </Table.TextCell>
                <Table.BadgeCell variant={deploy.environment === "Production" ? "info" : "neutral"} isEmphasized={false}>
                  {deploy.environment}
                </Table.BadgeCell>
                <Table.Cell>
                  <span className="inline-flex items-center gap-[var(--space-6)]">
                    <Table.Icon>
                      <RiGitBranchLine />
                    </Table.Icon>
                    <span>{deploy.branch}</span>
                  </span>
                </Table.Cell>
                <Table.NumberCell>{deploy.time}</Table.NumberCell>
                <Table.ActionsCell>
                  {deploy.url && (
                    <IconButton variant="ghost" size="2xs">
                      <RiExternalLinkLine />
                    </IconButton>
                  )}
                  <IconButton variant="ghost" size="2xs">
                    <RiMoreLine />
                  </IconButton>
                </Table.ActionsCell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
