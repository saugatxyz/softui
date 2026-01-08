"use client"

import * as React from "react"
import { Tabs } from "@/components/ui/tabs"
import { Fieldset } from "@/components/ui/fieldset"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Select } from "@/components/ui/select"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SwitchGroup } from "@/components/ui/switch-group"
import { SwitchGroupItem } from "@/components/ui/switch-group-item"
import { SwitchPrefix } from "@/components/ui/switch-prefix"
import { RadioGroup } from "@/components/ui/radio-group"
import { RadioGroupItem } from "@/components/ui/radio-group-item"
import { RadioPrefix } from "@/components/ui/radio-prefix"
import { AlertDialog } from "@/components/ui/alert-dialog"
import {
  RiUserLine,
  RiNotification3Line,
  RiPaletteLine,
  RiShieldLine,
  RiDeleteBinLine,
  RiMailLine,
  RiSmartphoneLine,
  RiMessage3Line,
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
  RiLockLine,
  RiKeyLine,
  RiPencilLine,
  RiUploadCloud2Line,
  RiAlertLine,
} from "@remixicon/react"

const timezones = [
  { value: "utc", label: "UTC (Coordinated Universal Time)" },
  { value: "est", label: "EST (Eastern Standard Time)" },
  { value: "pst", label: "PST (Pacific Standard Time)" },
  { value: "gmt", label: "GMT (Greenwich Mean Time)" },
  { value: "cet", label: "CET (Central European Time)" },
  { value: "jst", label: "JST (Japan Standard Time)" },
]

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
]

export default function SettingsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-surface-page">
      <div className="mx-auto max-w-3xl px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
        {/* Header */}
        <header className="mb-[var(--space-32)]">
          <h1 className="text-body-3xl-semibold text-content-strong">Settings</h1>
          <p className="mt-[var(--space-6)] text-body-m text-content-subtle">
            Manage your account settings and preferences.
          </p>
        </header>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" variant="stroke">
          <Tabs.List>
            <Tabs.Trigger value="profile" leadingIcon={<RiUserLine />}>
              Profile
            </Tabs.Trigger>
            <Tabs.Trigger value="notifications" leadingIcon={<RiNotification3Line />}>
              Notifications
            </Tabs.Trigger>
            <Tabs.Trigger value="appearance" leadingIcon={<RiPaletteLine />}>
              Appearance
            </Tabs.Trigger>
            <Tabs.Trigger value="security" leadingIcon={<RiShieldLine />}>
              Security
            </Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>

          {/* Profile Tab */}
          <Tabs.Content value="profile">
            <div className="flex flex-col gap-[var(--space-52)]">
              {/* Avatar Section */}
              <Fieldset>
                <Fieldset.Legend>Profile Photo</Fieldset.Legend>
                <div className="flex items-center gap-[var(--space-16)]">
                  <Avatar
                    size="l"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Profile photo"
                  />
                  <div className="flex flex-col gap-[var(--space-8)]">
                    <div className="flex gap-[var(--space-8)]">
                      <Button variant="secondary" size="s" leadingIcon={<RiUploadCloud2Line />}>
                        Upload
                      </Button>
                      <Button variant="ghost" size="s" leadingIcon={<RiDeleteBinLine />}>
                        Remove
                      </Button>
                    </div>
                    <p className="text-body-s text-content-muted">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
              </Fieldset>

              {/* Personal Information */}
              <Fieldset>
                <Fieldset.Legend>Personal Information</Fieldset.Legend>
                <div className="grid grid-cols-1 gap-[var(--space-16)] md:grid-cols-2">
                  <Field label="First name">
                    <Input
                      name="firstName"
                      defaultValue="John"
                      placeholder="Enter first name"
                      focusVisibleOnly
                    />
                  </Field>
                  <Field label="Last name">
                    <Input
                      name="lastName"
                      defaultValue="Doe"
                      placeholder="Enter last name"
                      focusVisibleOnly
                    />
                  </Field>
                </div>
                <Field label="Email address">
                  <Input
                    name="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    placeholder="Enter email"
                    focusVisibleOnly
                  />
                </Field>
                <Field label="Bio" hint="Brief description for your profile. Max 200 characters.">
                  <Input
                    name="bio"
                    defaultValue="Product designer based in San Francisco."
                    placeholder="Tell us about yourself"
                    focusVisibleOnly
                  />
                </Field>
              </Fieldset>

              {/* Timezone & Language */}
              <Fieldset>
                <Fieldset.Legend>Regional Settings</Fieldset.Legend>
                <div className="grid grid-cols-1 gap-[var(--space-16)] md:grid-cols-2">
                  <Field label="Timezone">
                    <Select
                      options={timezones}
                      defaultValue="pst"
                      placeholder="Select timezone"
                    />
                  </Field>
                  <Field label="Language">
                    <Select
                      options={languages}
                      defaultValue="en"
                      placeholder="Select language"
                    />
                  </Field>
                </div>
              </Fieldset>

              {/* Save Button */}
              <div className="flex justify-start gap-[var(--space-12)]">
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Save Changes</Button>
              </div>
            </div>
          </Tabs.Content>

          {/* Notifications Tab */}
          <Tabs.Content value="notifications">
            <div className="flex flex-col gap-[var(--space-52)]">
              {/* Email Notifications */}
              <Fieldset>
                <Fieldset.Legend>Email Notifications</Fieldset.Legend>
                <SwitchGroup style="list" stack="vertical">
                  <SwitchGroupItem
                    label="Marketing emails"
                    description="New features and product updates"
                    defaultChecked
                  />
                  <SwitchGroupItem
                    label="Security alerts"
                    description="Security events and suspicious activity"
                    defaultChecked
                  />
                  <SwitchGroupItem
                    label="Weekly digest"
                    description="Summary of activity and team updates"
                  />
                  <SwitchGroupItem
                    label="Comment notifications"
                    description="Comments and mentions"
                    defaultChecked
                  />
                </SwitchGroup>
              </Fieldset>

              {/* Push Notifications */}
              <Fieldset>
                <Fieldset.Legend>Push Notifications</Fieldset.Legend>
                <SwitchGroup style="card-small" stack="vertical">
                  <SwitchGroupItem
                    label="Push notifications"
                    prefix={<SwitchPrefix type="icon-emphasized-blue" size="s" icon={<RiNotification3Line />} />}
                    defaultChecked
                  />
                  <SwitchGroupItem
                    label="Email notifications"
                    prefix={<SwitchPrefix type="icon-emphasized-green" size="s" icon={<RiMailLine />} />}
                    defaultChecked
                  />
                  <SwitchGroupItem
                    label="SMS notifications"
                    prefix={<SwitchPrefix type="icon-emphasized-purple" size="s" icon={<RiSmartphoneLine />} />}
                    badge={<Badge variant="orange" size="xs" isEmphasized>Premium</Badge>}
                  />
                  <SwitchGroupItem
                    label="In-app messages"
                    prefix={<SwitchPrefix type="icon-emphasized-cyan" size="s" icon={<RiMessage3Line />} />}
                    defaultChecked
                  />
                </SwitchGroup>
              </Fieldset>

              {/* Save Button */}
              <div className="flex justify-start gap-[var(--space-12)]">
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Save Preferences</Button>
              </div>
            </div>
          </Tabs.Content>

          {/* Appearance Tab */}
          <Tabs.Content value="appearance">
            <div className="flex flex-col gap-[var(--space-52)]">
              {/* Theme Selection */}
              <Fieldset>
                <Fieldset.Legend>Theme</Fieldset.Legend>
                <RadioGroup defaultValue="system" style="card-small" stack="horizontal">
                  <RadioGroupItem
                    value="light"
                    label="Light"
                    prefix={<RadioPrefix type="icon" icon={<RiSunLine />} />}
                  />
                  <RadioGroupItem
                    value="dark"
                    label="Dark"
                    prefix={<RadioPrefix type="icon" icon={<RiMoonLine />} />}
                  />
                  <RadioGroupItem
                    value="system"
                    label="System"
                    prefix={<RadioPrefix type="icon" icon={<RiComputerLine />} />}
                  />
                </RadioGroup>
              </Fieldset>

              {/* Display Density */}
              <Fieldset>
                <Fieldset.Legend>Display Density</Fieldset.Legend>
                <RadioGroup defaultValue="comfortable" style="list" stack="vertical">
                  <RadioGroupItem
                    value="compact"
                    label="Compact"
                    description="More content on screen"
                  />
                  <RadioGroupItem
                    value="comfortable"
                    label="Comfortable"
                    description="Balanced readability"
                  />
                  <RadioGroupItem
                    value="spacious"
                    label="Spacious"
                    description="Easier reading"
                  />
                </RadioGroup>
              </Fieldset>

              {/* Accessibility */}
              <Fieldset>
                <Fieldset.Legend>Accessibility</Fieldset.Legend>
                <SwitchGroup style="list" stack="vertical">
                  <SwitchGroupItem
                    label="Reduce motion"
                  />
                  <SwitchGroupItem
                    label="High contrast mode"
                  />
                  <SwitchGroupItem
                    label="Large text"
                  />
                </SwitchGroup>
              </Fieldset>

              {/* Save Button */}
              <div className="flex justify-start gap-[var(--space-12)]">
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Save Preferences</Button>
              </div>
            </div>
          </Tabs.Content>

          {/* Security Tab */}
          <Tabs.Content value="security">
            <div className="flex flex-col gap-[var(--space-52)]">
              {/* Change Password */}
              <Fieldset>
                <Fieldset.Legend>Change Password</Fieldset.Legend>
                <Field label="Current password">
                  <Input
                    name="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    focusVisibleOnly
                  />
                </Field>
                <Field label="New password">
                  <Input
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    focusVisibleOnly
                  />
                </Field>
                <Field label="Confirm new password">
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    focusVisibleOnly
                  />
                </Field>
                <div className="flex justify-start">
                  <Button variant="secondary" leadingIcon={<RiLockLine />}>
                    Update Password
                  </Button>
                </div>
              </Fieldset>

              {/* Two-Factor Authentication */}
              <Fieldset>
                <Fieldset.Legend>Two-Factor Authentication</Fieldset.Legend>
                <div className="flex items-center justify-between rounded-[var(--radius-12)] border border-border-subtle p-[var(--space-16)]">
                  <div className="flex items-center gap-[var(--space-12)]">
                    <div className="flex size-[40px] items-center justify-center rounded-[var(--radius-8)] bg-surface-feedback-success-subtle">
                      <RiShieldLine className="size-[20px] text-content-feedback-success-strong" />
                    </div>
                    <div>
                      <div className="flex items-center gap-[var(--space-8)]">
                        <p className="text-body-m-medium text-content-strong">
                          Two-factor authentication
                        </p>
                        <Badge variant="success" size="xs" isEmphasized>
                          Enabled
                        </Badge>
                      </div>
                      <p className="text-body-s text-content-subtle">
                        Your account is protected with an authenticator app
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" size="s">
                    Manage
                  </Button>
                </div>
              </Fieldset>

              {/* Active Sessions */}
              <Fieldset>
                <Fieldset.Legend>Active Sessions</Fieldset.Legend>
                <div className="flex flex-col divide-y divide-border-muted rounded-[var(--radius-12)] border border-border-subtle">
                  {/* Current Session */}
                  <div className="flex items-center justify-between p-[var(--space-16)]">
                    <div className="flex items-center gap-[var(--space-12)]">
                      <div className="flex size-[40px] items-center justify-center rounded-[var(--radius-8)] bg-surface-interactive-default">
                        <RiComputerLine className="size-[20px] text-content-subtle" />
                      </div>
                      <div>
                        <div className="flex items-center gap-[var(--space-8)]">
                          <p className="text-body-m-medium text-content-strong">
                            MacBook Pro - Chrome
                          </p>
                          <Badge variant="success" size="xs" leadingDot>
                            Current
                          </Badge>
                        </div>
                        <p className="text-body-s text-content-muted">
                          San Francisco, CA · Last active now
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Other Sessions */}
                  <div className="flex items-center justify-between p-[var(--space-16)]">
                    <div className="flex items-center gap-[var(--space-12)]">
                      <div className="flex size-[40px] items-center justify-center rounded-[var(--radius-8)] bg-surface-interactive-default">
                        <RiSmartphoneLine className="size-[20px] text-content-subtle" />
                      </div>
                      <div>
                        <p className="text-body-m-medium text-content-strong">
                          iPhone 15 Pro - Safari
                        </p>
                        <p className="text-body-s text-content-muted">
                          San Francisco, CA · Last active 2 hours ago
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="xs">
                      Revoke
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-[var(--space-16)]">
                    <div className="flex items-center gap-[var(--space-12)]">
                      <div className="flex size-[40px] items-center justify-center rounded-[var(--radius-8)] bg-surface-interactive-default">
                        <RiComputerLine className="size-[20px] text-content-subtle" />
                      </div>
                      <div>
                        <p className="text-body-m-medium text-content-strong">
                          Windows PC - Firefox
                        </p>
                        <p className="text-body-s text-content-muted">
                          New York, NY · Last active 3 days ago
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="xs">
                      Revoke
                    </Button>
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button variant="ghost" size="s">
                    Sign out all other sessions
                  </Button>
                </div>
              </Fieldset>

              {/* API Keys */}
              <Fieldset>
                <Fieldset.Legend>API Keys</Fieldset.Legend>
                <div className="flex flex-col divide-y divide-border-muted rounded-[var(--radius-12)] border border-border-subtle">
                  <div className="flex items-center justify-between p-[var(--space-16)]">
                    <div className="flex items-center gap-[var(--space-12)]">
                      <div className="flex size-[40px] items-center justify-center rounded-[var(--radius-8)] bg-surface-interactive-default">
                        <RiKeyLine className="size-[20px] text-content-subtle" />
                      </div>
                      <div>
                        <p className="text-body-m-medium text-content-strong">
                          Production API Key
                        </p>
                        <p className="text-body-s text-content-muted">
                          sk-prod-****-****-****-1234 · Created Jan 15, 2025
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-[var(--space-8)]">
                      <IconButton variant="ghost" size="xs">
                        <RiPencilLine />
                      </IconButton>
                      <IconButton variant="ghost" size="xs">
                        <RiDeleteBinLine />
                      </IconButton>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-[var(--space-16)]">
                    <div className="flex items-center gap-[var(--space-12)]">
                      <div className="flex size-[40px] items-center justify-center rounded-[var(--radius-8)] bg-surface-interactive-default">
                        <RiKeyLine className="size-[20px] text-content-subtle" />
                      </div>
                      <div>
                        <p className="text-body-m-medium text-content-strong">
                          Development API Key
                        </p>
                        <p className="text-body-s text-content-muted">
                          sk-dev-****-****-****-5678 · Created Dec 20, 2024
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-[var(--space-8)]">
                      <IconButton variant="ghost" size="xs">
                        <RiPencilLine />
                      </IconButton>
                      <IconButton variant="ghost" size="xs">
                        <RiDeleteBinLine />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button variant="secondary" size="s" leadingIcon={<RiKeyLine />}>
                    Generate New API Key
                  </Button>
                </div>
              </Fieldset>

              {/* Danger Zone */}
              <Fieldset>
                <Fieldset.Legend>Danger Zone</Fieldset.Legend>
                <div className="rounded-[var(--radius-12)] border border-border-feedback-danger-subtle bg-surface-feedback-danger-muted p-[var(--space-16)]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-[var(--space-12)]">
                      <div className="flex size-[40px] shrink-0 items-center justify-center rounded-[var(--radius-8)] bg-surface-feedback-danger-subtle">
                        <RiAlertLine className="size-[20px] text-content-feedback-danger-strong" />
                      </div>
                      <div>
                        <p className="text-body-m-medium text-content-strong">
                          Delete account
                        </p>
                        <p className="text-body-s text-content-subtle">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <AlertDialog.Trigger>
                        <Button variant="danger" size="s">
                          Delete Account
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Popup>
                        <AlertDialog.Content>
                          <AlertDialog.Header>
                            <AlertDialog.Title>Delete your account?</AlertDialog.Title>
                          </AlertDialog.Header>
                          <AlertDialog.Body>
                            <p className="text-body-m text-content-subtle">
                              This will permanently delete your account, all your projects, and remove you from all teams. This action cannot be undone.
                            </p>
                          </AlertDialog.Body>
                          <AlertDialog.Footer>
                            <AlertDialog.Close>
                              <Button variant="secondary">Cancel</Button>
                            </AlertDialog.Close>
                            <Button variant="danger">Delete Account</Button>
                          </AlertDialog.Footer>
                        </AlertDialog.Content>
                      </AlertDialog.Popup>
                    </AlertDialog>
                  </div>
                </div>
              </Fieldset>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  )
}
