"use client"

import * as React from "react"
import {
  RiEditLine,
  RiDeleteBinLine,
  RiCheckboxCircleLine,
  RiFileTextLine,
  RiImageLine,
  RiVideoLine,
  RiMusicLine,
  RiCodeLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from "@remixicon/react"
import { CodeBlock } from "@/components/docs/code-block"
import { Table, type SortDirection } from "@/components/ui/table"
import { IconButton } from "@/components/ui/icon-button"
import { Crypto, type CryptoType } from "@/components/ui/crypto"
import { Logo, type LogoType } from "@/components/ui/logo"

// Sample data
const users = [
  { id: 1, name: "Olivia Martin", email: "olivia@example.com", role: "Admin", status: "active", amount: 1250.0, progress: 100, avatar: "/avatars/avatar-1.png" },
  { id: 2, name: "Jackson Lee", email: "jackson@example.com", role: "Editor", status: "review", amount: 890.5, progress: 75, avatar: "/avatars/avatar-2.png" },
  { id: 3, name: "Isabella Nguyen", email: "isabella@example.com", role: "Viewer", status: "pending", amount: 450.0, progress: 45, avatar: "/avatars/avatar-3.png" },
  { id: 4, name: "William Kim", email: "william@example.com", role: "Editor", status: "inactive", amount: 2100.75, progress: 90, avatar: "/avatars/avatar-4.png" },
  { id: 5, name: "Sofia Davis", email: "sofia@example.com", role: "Admin", status: "active", amount: 1800.25, progress: 25, avatar: "/avatars/avatar-5.png" },
]

const statusConfig = {
  active: { label: "Active", variant: "success" },
  review: { label: "In Review", variant: "info" },
  pending: { label: "Pending", variant: "warning" },
  inactive: { label: "Inactive", variant: "neutral" },
} as const

// Task management data
const tasks = [
  { id: 1, title: "Design system documentation", description: "Write component guidelines", status: "done", priority: "high", assignee: "Olivia", dueDate: "Jan 15" },
  { id: 2, title: "API integration", description: "Connect to backend services", status: "in-progress", priority: "high", assignee: "Jackson", dueDate: "Jan 18" },
  { id: 3, title: "User testing", description: "Conduct usability studies", status: "todo", priority: "medium", assignee: "Isabella", dueDate: "Jan 22" },
  { id: 4, title: "Performance optimization", description: "Improve load times", status: "in-progress", priority: "low", assignee: "William", dueDate: "Jan 25" },
  { id: 5, title: "Mobile responsiveness", description: "Fix layout issues on mobile", status: "blocked", priority: "high", assignee: "Sofia", dueDate: "Jan 20" },
]

const taskStatusConfig = {
  "done": { label: "Done", variant: "success" },
  "in-progress": { label: "In Progress", variant: "info" },
  "todo": { label: "To Do", variant: "neutral" },
  "blocked": { label: "Blocked", variant: "danger" },
} as const

const priorityConfig = {
  high: { label: "High", variant: "danger" },
  medium: { label: "Medium", variant: "warning" },
  low: { label: "Low", variant: "neutral" },
} as const

// Files data with icon prefixes
const files = [
  { id: 1, name: "Project Brief.pdf", type: "document", size: "2.4 MB", modified: "Jan 12, 2025", icon: RiFileTextLine },
  { id: 2, name: "Hero Banner.png", type: "image", size: "4.8 MB", modified: "Jan 11, 2025", icon: RiImageLine },
  { id: 3, name: "Product Demo.mp4", type: "video", size: "128 MB", modified: "Jan 10, 2025", icon: RiVideoLine },
  { id: 4, name: "Background Music.mp3", type: "audio", size: "8.2 MB", modified: "Jan 9, 2025", icon: RiMusicLine },
  { id: 5, name: "utils.ts", type: "code", size: "12 KB", modified: "Jan 8, 2025", icon: RiCodeLine },
]

const fileTypeColors = {
  document: "text-content-decorative-red-strong",
  image: "text-content-decorative-purple-strong",
  video: "text-content-decorative-blue-strong",
  audio: "text-content-decorative-amber-strong",
  code: "text-content-decorative-green-strong",
} as const

// Crypto data
const cryptoAssets: Array<{ id: number; crypto: CryptoType; symbol: string; name: string; price: number; change: number; holdings: number; value: number }> = [
  { id: 1, crypto: "btc", symbol: "BTC", name: "Bitcoin", price: 97284.50, change: 2.34, holdings: 0.5234, value: 50918.12 },
  { id: 2, crypto: "eth", symbol: "ETH", name: "Ethereum", price: 3421.80, change: -1.25, holdings: 4.2100, value: 14405.78 },
  { id: 3, crypto: "sol", symbol: "SOL", name: "Solana", price: 198.45, change: 5.67, holdings: 25.0000, value: 4961.25 },
  { id: 4, crypto: "link", symbol: "LINK", name: "Chainlink", price: 42.18, change: -0.89, holdings: 100.0000, value: 4218.00 },
  { id: 5, crypto: "usdc", symbol: "USDC", name: "USD Coin", price: 1.00, change: 0.01, holdings: 2617.0000, value: 2617.00 },
]

// Company data
const companies: Array<{ id: number; logo: LogoType; name: string; industry: string; revenue: string; employees: string; status: string }> = [
  { id: 1, logo: "linear", name: "Linear", industry: "Project Management", revenue: "$50M", employees: "100+", status: "active" },
  { id: 2, logo: "framer", name: "Framer", industry: "Design Tools", revenue: "$100M", employees: "200+", status: "active" },
  { id: 3, logo: "discord", name: "Discord", industry: "Communication", revenue: "$500M", employees: "1,000+", status: "active" },
  { id: 4, logo: "loom", name: "Loom", industry: "Video Messaging", revenue: "$150M", employees: "300+", status: "review" },
  { id: 5, logo: "replit", name: "Replit", industry: "Developer Tools", revenue: "$80M", employees: "150+", status: "pending" },
]

export default function TableDocsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--space-40)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      <header className="flex flex-col gap-[var(--space-10)]">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h1 className="text-body-3xl-semibold">Table</h1>
          <p className="max-w-2xl text-body-l text-content-subtle">
            Display data in rows and columns with support for sorting, selection, and specialized cell types.
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
      <Table.Head>Email</Table.Head>
      <Table.Head align="right">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Olivia Martin</Table.Cell>
      <Table.Cell>olivia@example.com</Table.Cell>
      <Table.NumberCell>$1,250.00</Table.NumberCell>
    </Table.Row>
  </Table.Body>
</Table.Root>`}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Basic Table</h2>
        <p className="text-body-m text-content-subtle">
          A simple table with header, body, and basic cells.
        </p>
        <div>
          <Table.Root>
            <Table.Header>
              <Table.Row isHeader>
                <Table.Head>Name</Table.Head>
                <Table.Head>Email</Table.Head>
                <Table.Head>Role</Table.Head>
                <Table.Head align="right">Amount</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.TextCell emphasized>{user.name}</Table.TextCell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.NumberCell>${user.amount.toFixed(2)}</Table.NumberCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Sizes</h2>
        <p className="text-body-m text-content-subtle">
          Tables come in three sizes: small (40px rows), medium (48px rows), and large (56px rows).
        </p>
        <div className="flex flex-col gap-[var(--space-24)]">
          {(["s", "m", "l"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-[var(--space-8)]">
              <span className="text-body-s-medium text-content-subtle capitalize">
                {size === "s" ? "Small" : size === "m" ? "Medium" : "Large"}
              </span>
              <div>
                <Table.Root size={size}>
                  <Table.Header>
                    <Table.Row isHeader>
                      <Table.Head>Name</Table.Head>
                      <Table.Head>Email</Table.Head>
                      <Table.Head align="right">Amount</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {users.slice(0, 2).map((user) => (
                      <Table.Row key={user.id}>
                        <Table.TextCell emphasized>{user.name}</Table.TextCell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.NumberCell>${user.amount.toFixed(2)}</Table.NumberCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Selection</h2>
        <p className="text-body-m text-content-subtle">
          Add row selection with checkboxes using the CheckboxCell component.
        </p>
        <SelectableTableDemo />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Sortable Columns</h2>
        <p className="text-body-m text-content-subtle">
          Enable sorting on header cells with the sortable prop.
        </p>
        <SortableTableDemo />
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Specialized Cells</h2>
        <p className="text-body-m text-content-subtle">
          Use specialized cell components for different data types.
        </p>
        <div>
          <Table.Root size="m">
            <Table.Header>
              <Table.Row isHeader>
                <Table.Head>User</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Team</Table.Head>
                <Table.Head>Progress</Table.Head>
                <Table.Head align="right">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user, index) => {
                const status = statusConfig[user.status as keyof typeof statusConfig]
                // Use different team members for each row to show variety
                const teamAvatars = [
                  [
                    { src: users[1].avatar, name: users[1].name },
                    { src: users[2].avatar, name: users[2].name },
                    { src: users[3].avatar, name: users[3].name },
                  ],
                  [
                    { src: users[0].avatar, name: users[0].name },
                    { src: users[4].avatar, name: users[4].name },
                  ],
                  [
                    { src: users[0].avatar, name: users[0].name },
                    { src: users[1].avatar, name: users[1].name },
                    { src: users[3].avatar, name: users[3].name },
                    { src: users[4].avatar, name: users[4].name },
                  ],
                  [
                    { src: users[2].avatar, name: users[2].name },
                  ],
                  [
                    { src: users[1].avatar, name: users[1].name },
                    { src: users[2].avatar, name: users[2].name },
                  ],
                ]
                return (
                  <Table.Row key={user.id}>
                    <Table.TextCell additionalInfo={user.email} emphasized>
                      {user.name}
                    </Table.TextCell>
                    <Table.BadgeCell variant={status.variant}>
                      {status.label}
                    </Table.BadgeCell>
                    <Table.AvatarGroupCell avatars={teamAvatars[index]} />
                    <Table.ProgressCell
                      value={user.progress}
                      tone={user.progress === 100 ? "positive" : user.progress < 50 ? "warning" : "neutral"}
                    />
                    <Table.ActionsCell>
                      <IconButton variant="ghost" size="2xs">
                        <RiEditLine />
                      </IconButton>
                      <IconButton variant="ghost" size="2xs">
                        <RiDeleteBinLine />
                      </IconButton>
                    </Table.ActionsCell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">Task Management</h2>
        <p className="text-body-m text-content-subtle">
          A task management table with status, priority, and assignee information.
        </p>
        <div>
          <Table.Root size="l">
            <Table.Header>
              <Table.Row isHeader>
                <Table.Head>Task</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Priority</Table.Head>
                <Table.Head>Assignee</Table.Head>
                <Table.Head align="right">Due Date</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tasks.map((task) => {
                const status = taskStatusConfig[task.status as keyof typeof taskStatusConfig]
                const priority = priorityConfig[task.priority as keyof typeof priorityConfig]
                return (
                  <Table.Row key={task.id}>
                    <Table.TextCell
                      additionalInfo={task.description}
                      prefix={<RiCheckboxCircleLine className="size-[16px] text-content-subtle" />}
                      emphasized
                    >
                      {task.title}
                    </Table.TextCell>
                    <Table.BadgeCell variant={status.variant}>
                      {status.label}
                    </Table.BadgeCell>
                    <Table.BadgeCell variant={priority.variant}>
                      {priority.label}
                    </Table.BadgeCell>
                    <Table.Cell>{task.assignee}</Table.Cell>
                    <Table.NumberCell>{task.dueDate}</Table.NumberCell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Icon Prefix</h2>
        <p className="text-body-m text-content-subtle">
          Use icon prefixes to indicate file types, categories, or item types.
        </p>
        <div>
          <Table.Root size="m">
            <Table.Header>
              <Table.Row isHeader>
                <Table.Head>File Name</Table.Head>
                <Table.Head>Size</Table.Head>
                <Table.Head align="right">Modified</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {files.map((file) => {
                const IconComponent = file.icon
                const colorClass = fileTypeColors[file.type as keyof typeof fileTypeColors]
                return (
                  <Table.Row key={file.id}>
                    <Table.TextCell
                      prefix={<IconComponent className={`size-[16px] ${colorClass}`} />}
                      emphasized
                    >
                      {file.name}
                    </Table.TextCell>
                    <Table.Cell>{file.size}</Table.Cell>
                    <Table.NumberCell>{file.modified}</Table.NumberCell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Crypto Logos</h2>
        <p className="text-body-m text-content-subtle">
          Display cryptocurrency assets with token logos as prefixes.
        </p>
        <div>
          <Table.Root size="m">
            <Table.Header>
              <Table.Row isHeader>
                <Table.Head>Asset</Table.Head>
                <Table.Head align="right">Price</Table.Head>
                <Table.Head align="right">24h Change</Table.Head>
                <Table.Head align="right">Holdings</Table.Head>
                <Table.Head align="right">Value</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cryptoAssets.map((asset) => (
                <Table.Row key={asset.id}>
                  <Table.TextCell
                    prefix={<Crypto crypto={asset.crypto} size={20} />}
                    additionalInfo={asset.symbol}
                    emphasized
                  >
                    {asset.name}
                  </Table.TextCell>
                  <Table.NumberCell>
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Table.NumberCell>
                  <Table.Cell className="text-right">
                    <span className={`inline-flex items-center gap-[var(--space-4)] ${asset.change >= 0 ? "text-content-feedback-success-strong" : "text-content-feedback-danger-strong"}`}>
                      {asset.change >= 0 ? (
                        <RiArrowUpLine className="size-[14px]" />
                      ) : (
                        <RiArrowDownLine className="size-[14px]" />
                      )}
                      {Math.abs(asset.change).toFixed(2)}%
                    </span>
                  </Table.Cell>
                  <Table.NumberCell>
                    {asset.holdings.toLocaleString(undefined, { minimumFractionDigits: 4 })}
                  </Table.NumberCell>
                  <Table.NumberCell>
                    ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Table.NumberCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </section>

      <section className="flex flex-col gap-[var(--space-10)]">
        <h2 className="text-body-xl-semibold">With Company Logos</h2>
        <p className="text-body-m text-content-subtle">
          Display companies or integrations with brand logos as prefixes.
        </p>
        <div>
          <Table.Root size="m">
            <Table.Header>
              <Table.Row isHeader>
                <Table.Head>Company</Table.Head>
                <Table.Head>Industry</Table.Head>
                <Table.Head>Employees</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head align="right">Revenue</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {companies.map((company) => {
                const status = statusConfig[company.status as keyof typeof statusConfig]
                return (
                  <Table.Row key={company.id}>
                    <Table.TextCell
                      prefix={<Logo logo={company.logo} variant="filled" size={20} />}
                      emphasized
                    >
                      {company.name}
                    </Table.TextCell>
                    <Table.Cell>{company.industry}</Table.Cell>
                    <Table.Cell>{company.employees}</Table.Cell>
                    <Table.BadgeCell variant={status.variant}>
                      {status.label}
                    </Table.BadgeCell>
                    <Table.NumberCell>{company.revenue}</Table.NumberCell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        </div>
      </section>
    </div>
  )
}

function SelectableTableDemo() {
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set())

  const allSelected = selectedIds.size === users.length
  const someSelected = selectedIds.size > 0 && selectedIds.size < users.length

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(users.map((u) => u.id)))
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
      <Table.Root>
        <Table.Header>
          <Table.Row isHeader>
            <Table.CheckboxCell
              checked={allSelected}
              indeterminate={someSelected}
              onCheckedChange={toggleAll}
            />
            <Table.Head>Name</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Role</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id} selected={selectedIds.has(user.id)}>
              <Table.CheckboxCell
                checked={selectedIds.has(user.id)}
                onCheckedChange={() => toggleOne(user.id)}
              />
              <Table.TextCell emphasized>{user.name}</Table.TextCell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

function SortableTableDemo() {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"))
      if (sortDirection === "desc") {
        setSortColumn(null)
      }
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedUsers = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return users

    return [...users].sort((a, b) => {
      const aVal = a[sortColumn as keyof typeof a]
      const bVal = b[sortColumn as keyof typeof b]

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
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
            <Table.Head
              sortable
              sortDirection={sortColumn === "name" ? sortDirection : null}
              onSort={() => handleSort("name")}
            >
              Name
            </Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head
              sortable
              sortDirection={sortColumn === "role" ? sortDirection : null}
              onSort={() => handleSort("role")}
            >
              Role
            </Table.Head>
            <Table.Head
              sortable
              sortDirection={sortColumn === "amount" ? sortDirection : null}
              onSort={() => handleSort("amount")}
              align="right"
            >
              Amount
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.TextCell emphasized>{user.name}</Table.TextCell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.NumberCell>${user.amount.toFixed(2)}</Table.NumberCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
