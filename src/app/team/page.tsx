"use client"

import * as React from "react"
import {
  RiSearchLine,
  RiAddLine,
  RiMoreLine,
  RiEditLine,
  RiDeleteBinLine,
  RiMailLine,
  RiUserSearchLine,
} from "@remixicon/react"

import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import { Menu, MenuItem, MenuSeparator } from "@/components/ui/menu"
import { Select } from "@/components/ui/select"

// Sample team members data
const teamMembers = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Admin",
    joinDate: "Jan 15, 2024",
    avatar: "/avatars/avatar-1.png",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@company.com",
    role: "Editor",
    joinDate: "Feb 3, 2024",
    avatar: "/avatars/avatar-2.png",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    role: "Viewer",
    joinDate: "Mar 22, 2024",
    avatar: "/avatars/avatar-3.png",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Editor",
    joinDate: "Apr 8, 2024",
    avatar: "/avatars/avatar-4.png",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@company.com",
    role: "Admin",
    joinDate: "May 1, 2024",
    avatar: "/avatars/avatar-5.png",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.w@company.com",
    role: "Viewer",
    joinDate: "Jun 14, 2024",
    avatar: "/avatars/avatar-6.png",
  },
]

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
]

const getRoleBadgeVariant = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "purple" as const
    case "editor":
      return "blue" as const
    case "viewer":
      return "neutral" as const
    default:
      return "neutral" as const
  }
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleInvite = () => {
    // Handle invite logic here
    console.log("Inviting:", { email: inviteEmail, role: inviteRole })
    setInviteEmail("")
    setInviteRole(null)
    setDialogOpen(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-[var(--space-32)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      {/* Page Header */}
      <header className="flex flex-col gap-[var(--space-6)]">
        <div className="flex items-center gap-[var(--space-12)]">
          <h1 className="text-[length:var(--font-size-3xl)] font-[var(--font-weight-semibold)] leading-[var(--line-height-3xl)] text-content-strong">
            Team Members
          </h1>
          <Badge size="s" variant="neutral">
            {teamMembers.length}
          </Badge>
        </div>
        <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
          Manage your team and their permissions
        </p>
      </header>

      {/* Toolbar */}
      <div className="flex items-center gap-[var(--space-12)]">
        <div className="flex-1">
          <Input
            placeholder="Search members..."
            leadingIcon={<RiSearchLine />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-[320px]"
          />
        </div>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Trigger>
            <Button variant="primary" leadingIcon={<RiAddLine />}>
              Invite
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup position="center">
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Invite Team Member</Dialog.Title>
                  <Dialog.Close />
                </Dialog.Header>
                <Dialog.Body>
                  <Field label="Email address">
                    <Input
                      type="email"
                      placeholder="colleague@company.com"
                      leadingIcon={<RiMailLine />}
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </Field>
                  <Field label="Role">
                    <Select
                      options={roleOptions}
                      placeholder="Select a role"
                      value={inviteRole ?? undefined}
                      onValueChange={(value) => setInviteRole(value)}
                    />
                  </Field>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
                  <Button
                    variant="primary"
                    onClick={handleInvite}
                    disabled={!inviteEmail || !inviteRole}
                  >
                    Send Invite
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Members Table */}
      {filteredMembers.length > 0 ? (
        <div className="overflow-hidden rounded-[var(--radius-12)] border border-border-subtle">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-interactive-default">
                <th className="px-[var(--space-16)] py-[var(--space-12)] text-left text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-subtle">
                  Member
                </th>
                <th className="hidden px-[var(--space-16)] py-[var(--space-12)] text-left text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-subtle md:table-cell">
                  Email
                </th>
                <th className="px-[var(--space-16)] py-[var(--space-12)] text-left text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-subtle">
                  Role
                </th>
                <th className="hidden px-[var(--space-16)] py-[var(--space-12)] text-left text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-subtle sm:table-cell">
                  Joined
                </th>
                <th className="px-[var(--space-16)] py-[var(--space-12)] text-right text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-subtle">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-border-subtle last:border-b-0 hover:bg-surface-interactive-hover"
                >
                  <td className="px-[var(--space-16)] py-[var(--space-12)]">
                    <div className="flex items-center gap-[var(--space-12)]">
                      <Avatar src={member.avatar} alt={member.name} size="s" />
                      <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="hidden px-[var(--space-16)] py-[var(--space-12)] md:table-cell">
                    <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
                      {member.email}
                    </span>
                  </td>
                  <td className="px-[var(--space-16)] py-[var(--space-12)]">
                    <Badge
                      size="xs"
                      variant={getRoleBadgeVariant(member.role)}
                      isEmphasized
                    >
                      {member.role}
                    </Badge>
                  </td>
                  <td className="hidden px-[var(--space-16)] py-[var(--space-12)] sm:table-cell">
                    <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-muted">
                      {member.joinDate}
                    </span>
                  </td>
                  <td className="px-[var(--space-16)] py-[var(--space-12)] text-right">
                    <Menu.Root>
                      <Menu.Trigger>
                        <IconButton variant="ghost" size="xs">
                          <RiMoreLine />
                        </IconButton>
                      </Menu.Trigger>
                      <Menu.Portal>
                        <Menu.Positioner align="end">
                          <Menu.Popup>
                            <MenuItem prefix={<RiEditLine className="size-[16px]" />}>
                              Edit role
                            </MenuItem>
                            <MenuItem prefix={<RiMailLine className="size-[16px]" />}>
                              Resend invite
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem
                              variant="danger"
                              prefix={<RiDeleteBinLine className="size-[16px]" />}
                            >
                              Remove member
                            </MenuItem>
                          </Menu.Popup>
                        </Menu.Positioner>
                      </Menu.Portal>
                    </Menu.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center gap-[var(--space-16)] rounded-[var(--radius-12)] border border-border-subtle py-[var(--space-52)]">
          <div className="flex size-[48px] items-center justify-center rounded-[var(--radius-max)] bg-surface-interactive-default">
            <RiUserSearchLine className="size-[24px] text-content-muted" />
          </div>
          <div className="flex flex-col items-center gap-[var(--space-4)]">
            <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
              No members found
            </p>
            <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
              Try adjusting your search query
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  )
}
