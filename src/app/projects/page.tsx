"use client"

import {
  RiMoreLine,
  RiEditLine,
  RiArchiveLine,
  RiDeleteBinLine,
  RiCheckboxCircleLine,
  RiTeamLine,
  RiTimeLine,
  RiCalendarLine,
  RiAddLine,
  RiCalendarCheckLine,
  RiUploadLine,
  RiFileChartLine,
  RiFolderLine,
  RiChat3Line,
  RiSettings4Line,
} from "@remixicon/react"

import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Menu, MenuItem, MenuSeparator } from "@/components/ui/menu"
import { Tabs } from "@/components/ui/tabs"

// Sample data for activity feed
const activities = [
  {
    id: 1,
    user: { name: "Sarah Chen", avatar: "/avatars/avatar-1.png", initials: "SC" },
    action: "completed task",
    target: "Design system audit",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: { name: "Marcus Johnson", avatar: "/avatars/avatar-2.png", initials: "MJ" },
    action: "commented on",
    target: "Sprint planning",
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    user: { name: "Emily Rodriguez", avatar: "/avatars/avatar-3.png", initials: "ER" },
    action: "uploaded",
    target: "Q4 Report.pdf",
    timestamp: "Yesterday",
  },
  {
    id: 4,
    user: { name: "David Kim", avatar: "/avatars/avatar-4.png", initials: "DK" },
    action: "created task",
    target: "API integration",
    timestamp: "Yesterday",
  },
  {
    id: 5,
    user: { name: "Lisa Wang", avatar: "/avatars/avatar-5.png", initials: "LW" },
    action: "updated",
    target: "Project timeline",
    timestamp: "2 days ago",
  },
]

// Sample data for team members
const teamMembers = [
  { id: 1, name: "Sarah Chen", role: "Project Lead", avatar: "/avatars/avatar-1.png", initials: "SC" },
  { id: 2, name: "Marcus Johnson", role: "Developer", avatar: "/avatars/avatar-2.png", initials: "MJ" },
  { id: 3, name: "Emily Rodriguez", role: "Designer", avatar: "/avatars/avatar-3.png", initials: "ER" },
  { id: 4, name: "David Kim", role: "Developer", avatar: "/avatars/avatar-4.png", initials: "DK" },
  { id: 5, name: "Lisa Wang", role: "QA Engineer", avatar: "/avatars/avatar-5.png", initials: "LW" },
]

// Stats data
const stats = [
  { label: "Tasks Completed", value: "24/32", icon: RiCheckboxCircleLine },
  { label: "Team Members", value: "5", icon: RiTeamLine },
  { label: "Hours Logged", value: "186", icon: RiTimeLine },
  { label: "Due Date", value: "Jan 31", icon: RiCalendarLine },
]

export default function ProjectOverviewPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-32)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      {/* Header */}
      <header className="flex items-start justify-between gap-[var(--space-16)]">
        <div className="flex flex-col gap-[var(--space-8)]">
          <div className="flex items-center gap-[var(--space-12)]">
            <h1 className="text-[length:var(--font-size-3xl)] font-[var(--font-weight-semibold)] leading-[var(--line-height-3xl)] text-content-strong">
              Website Redesign
            </h1>
            <Badge variant="success" isEmphasized leadingDot>
              Active
            </Badge>
          </div>
          <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
            Complete overhaul of the company website with new branding
          </p>
        </div>
        <Menu.Root>
          <Menu.Trigger>
            <IconButton variant="ghost" size="s">
              <RiMoreLine />
            </IconButton>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner align="end">
              <Menu.Popup>
                <MenuItem prefix={<span className="flex size-[16px] items-center justify-center text-content-subtle"><RiEditLine className="size-full" /></span>}>
                  Edit project
                </MenuItem>
                <MenuItem prefix={<span className="flex size-[16px] items-center justify-center text-content-subtle"><RiArchiveLine className="size-full" /></span>}>
                  Archive
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                  variant="danger"
                  prefix={<span className="flex size-[16px] items-center justify-center"><RiDeleteBinLine className="size-full" /></span>}
                >
                  Delete
                </MenuItem>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-[var(--space-16)] md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-[var(--space-8)] rounded-[var(--radius-12)] bg-surface-card p-[var(--space-16)]"
          >
            <div className="flex items-center gap-[var(--space-8)]">
              <span className="flex size-[20px] items-center justify-center text-content-subtle">
                <stat.icon className="size-full" />
              </span>
              <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-xs)] text-content-subtle">
                {stat.label}
              </span>
            </div>
            <span className="text-[length:var(--font-size-2xl)] font-[var(--font-weight-semibold)] leading-[var(--line-height-2xl)] text-content-strong">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Two-Column Layout */}
      <div className="grid gap-[var(--space-24)] lg:grid-cols-[1fr_320px]">
        {/* Left Column: Activity Feed */}
        <div className="flex flex-col gap-[var(--space-16)]">
          <h2 className="text-[length:var(--font-size-l)] font-[var(--font-weight-medium)] leading-[var(--line-height-l)] text-content-strong">
            Recent Activity
          </h2>
          <div className="flex flex-col">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-start gap-[var(--space-12)] py-[var(--space-12)] ${
                  index !== activities.length - 1 ? "border-b border-border-subtle" : ""
                }`}
              >
                <Avatar
                  size="s"
                  src={activity.user.avatar}
                  initials={activity.user.initials}
                  alt={activity.user.name}
                />
                <div className="flex flex-1 flex-col gap-[var(--space-2)]">
                  <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-strong">
                    <span className="font-[var(--font-weight-medium)]">{activity.user.name}</span>
                    {" "}
                    <span className="text-content-subtle">{activity.action}</span>
                    {" "}
                    <span className="font-[var(--font-weight-medium)]">{activity.target}</span>
                  </p>
                  <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-muted">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Team & Quick Actions */}
        <div className="flex flex-col gap-[var(--space-32)]">
          {/* Team Members */}
          <div className="flex flex-col gap-[var(--space-16)]">
            <h2 className="text-[length:var(--font-size-l)] font-[var(--font-weight-medium)] leading-[var(--line-height-l)] text-content-strong">
              Team Members
            </h2>
            <div className="flex flex-col gap-[var(--space-8)]">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-[var(--space-12)] rounded-[var(--radius-8)] p-[var(--space-8)] hover:bg-surface-interactive-hover"
                >
                  <Avatar
                    size="s"
                    src={member.avatar}
                    initials={member.initials}
                    alt={member.name}
                  />
                  <div className="flex flex-col">
                    <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                      {member.name}
                    </span>
                    <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle">
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col gap-[var(--space-16)]">
            <h2 className="text-[length:var(--font-size-l)] font-[var(--font-weight-medium)] leading-[var(--line-height-l)] text-content-strong">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-[var(--space-8)]">
              <Button variant="secondary" size="s" leadingIcon={<RiAddLine />} className="w-full justify-start">
                Add Task
              </Button>
              <Button variant="secondary" size="s" leadingIcon={<RiCalendarCheckLine />} className="w-full justify-start">
                Schedule Meeting
              </Button>
              <Button variant="secondary" size="s" leadingIcon={<RiUploadLine />} className="w-full justify-start">
                Upload File
              </Button>
              <Button variant="secondary" size="s" leadingIcon={<RiFileChartLine />} className="w-full justify-start">
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Section */}
      <Tabs defaultValue="files" variant="pill-emphasized">
        <Tabs.List>
          <Tabs.Trigger value="files" leadingIcon={<RiFolderLine />}>
            Files
          </Tabs.Trigger>
          <Tabs.Trigger value="comments" leadingIcon={<RiChat3Line />}>
            Comments
          </Tabs.Trigger>
          <Tabs.Trigger value="settings" leadingIcon={<RiSettings4Line />}>
            Settings
          </Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Content value="files">
          <div className="flex flex-col gap-[var(--space-16)]">
            <div className="flex items-center justify-between">
              <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
                12 files uploaded
              </p>
              <Button variant="secondary" size="s" leadingIcon={<RiUploadLine />}>
                Upload
              </Button>
            </div>
            <div className="grid gap-[var(--space-12)] sm:grid-cols-2 lg:grid-cols-3">
              {["Design-Spec.pdf", "Brand-Guidelines.pdf", "Wireframes.fig", "Homepage-v2.png", "Logo-Final.svg", "Meeting-Notes.docx"].map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-[var(--space-12)] rounded-[var(--radius-8)] border border-border-subtle p-[var(--space-12)] hover:bg-surface-interactive-hover"
                >
                  <span className="flex size-[32px] items-center justify-center rounded-[var(--radius-6)] bg-surface-interactive-default text-content-subtle">
                    <RiFolderLine className="size-[16px]" />
                  </span>
                  <span className="truncate text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                    {file}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="comments">
          <div className="flex flex-col gap-[var(--space-16)]">
            <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
              8 comments in this project
            </p>
            <div className="flex flex-col gap-[var(--space-16)]">
              {[
                { user: "Sarah Chen", avatar: "/avatars/avatar-1.png", initials: "SC", comment: "Great progress on the homepage design! Let's discuss the navigation in our next meeting.", time: "2 hours ago" },
                { user: "Marcus Johnson", avatar: "/avatars/avatar-2.png", initials: "MJ", comment: "I've updated the API endpoints documentation. Please review when you get a chance.", time: "5 hours ago" },
                { user: "Emily Rodriguez", avatar: "/avatars/avatar-3.png", initials: "ER", comment: "The new color palette has been approved by the client.", time: "Yesterday" },
              ].map((item, index) => (
                <div key={index} className="flex gap-[var(--space-12)]">
                  <Avatar size="s" src={item.avatar} initials={item.initials} alt={item.user} />
                  <div className="flex flex-col gap-[var(--space-4)]">
                    <div className="flex items-center gap-[var(--space-8)]">
                      <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                        {item.user}
                      </span>
                      <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-muted">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="settings">
          <div className="flex flex-col gap-[var(--space-24)]">
            <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
              Manage project settings and preferences
            </p>
            <div className="flex flex-col gap-[var(--space-16)]">
              <div className="flex items-center justify-between rounded-[var(--radius-8)] p-[var(--space-12)] hover:bg-surface-interactive-hover">
                <div className="flex flex-col">
                  <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                    Project visibility
                  </span>
                  <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle">
                    Control who can see this project
                  </span>
                </div>
                <Badge variant="info">Team only</Badge>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-8)] p-[var(--space-12)] hover:bg-surface-interactive-hover">
                <div className="flex flex-col">
                  <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                    Notifications
                  </span>
                  <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle">
                    Get notified about project updates
                  </span>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-8)] p-[var(--space-12)] hover:bg-surface-interactive-hover">
                <div className="flex flex-col">
                  <span className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                    Integrations
                  </span>
                  <span className="text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle">
                    Connected services and apps
                  </span>
                </div>
                <Badge variant="neutral">3 active</Badge>
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  )
}
