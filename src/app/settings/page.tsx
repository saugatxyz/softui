"use client"

import { Tabs } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { Fieldset } from "@/components/ui/fieldset"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SwitchGroup } from "@/components/ui/switch-group"
import { SwitchGroupItem } from "@/components/ui/switch-group-item"
import { RadioGroup } from "@/components/ui/radio-group"
import { RadioGroupItem } from "@/components/ui/radio-group-item"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { CheckboxGroupItem } from "@/components/ui/checkbox-group-item"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  RiSunLine,
  RiMoonLine,
  RiComputerLine,
  RiFlashlightLine,
  RiScales3Line,
  RiBrainLine,
  RiDeleteBinLine,
  RiDownloadLine,
} from "@remixicon/react"

// Setting row component for consistent layout
function SettingRow({
  label,
  description,
  children,
  badge,
}: {
  label: string
  description?: string
  children: React.ReactNode
  badge?: string
}) {
  return (
    <div className="flex flex-col gap-[var(--space-10)] border-b border-border-muted py-[var(--space-20)] last:border-b-0 md:flex-row md:items-start md:justify-between">
      <div className="md:min-w-[200px] md:max-w-[280px]">
        <div className="flex items-center gap-[var(--space-8)]">
          <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
            {label}
          </p>
          {badge && (
            <Badge size="s" variant="info">
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <p className="mt-[var(--space-2)] text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)] text-content-subtle">
            {description}
          </p>
        )}
      </div>
      <div className="flex w-full max-w-sm flex-col gap-[var(--space-16)]">
        {children}
      </div>
    </div>
  )
}

// AI Model Tab Content
function ModelTab() {
  return (
    <div className="flex flex-col gap-[var(--space-40)]">
      <Fieldset>
        <Fieldset.Legend>Model Selection</Fieldset.Legend>

        <SettingRow
          label="Default Model"
          description="Choose the AI model for new conversations"
        >
          <Select
            defaultValue="gpt-4"
            options={[
              { value: "gpt-4", label: "GPT-4 Turbo", description: "Most capable, best for complex tasks" },
              { value: "gpt-4o", label: "GPT-4o", description: "Fast and intelligent" },
              { value: "claude-3", label: "Claude 3 Opus", description: "Excellent for analysis and writing" },
              { value: "gemini-pro", label: "Gemini Pro", description: "Google's latest model" },
            ]}
          />
        </SettingRow>

        <SettingRow
          label="Response Style"
          description="How the AI should communicate"
        >
          <RadioGroup defaultValue="balanced" style="card-small" stack="vertical">
            <RadioGroupItem
              value="concise"
              label="Concise"
              description="Brief, to-the-point responses"
              prefix={<RiFlashlightLine className="size-[16px] text-content-subtle" />}
            />
            <RadioGroupItem
              value="balanced"
              label="Balanced"
              description="Mix of detail and brevity"
              prefix={<RiScales3Line className="size-[16px] text-content-subtle" />}
            />
            <RadioGroupItem
              value="detailed"
              label="Detailed"
              description="Comprehensive explanations"
              prefix={<RiBrainLine className="size-[16px] text-content-subtle" />}
            />
          </RadioGroup>
        </SettingRow>

        <SettingRow
          label="Creativity Level"
          description="Higher values produce more creative but less predictable responses"
        >
          <Select
            defaultValue="0.7"
            options={[
              { value: "0.3", label: "Focused (0.3)" },
              { value: "0.5", label: "Balanced (0.5)" },
              { value: "0.7", label: "Creative (0.7)" },
              { value: "0.9", label: "Experimental (0.9)" },
            ]}
          />
        </SettingRow>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Response Limits</Fieldset.Legend>

        <SettingRow
          label="Max Response Length"
          description="Maximum tokens per response"
        >
          <Select
            defaultValue="2048"
            options={[
              { value: "512", label: "Short (512 tokens)" },
              { value: "1024", label: "Medium (1024 tokens)" },
              { value: "2048", label: "Long (2048 tokens)" },
              { value: "4096", label: "Extended (4096 tokens)" },
            ]}
          />
        </SettingRow>

        <SettingRow
          label="Streaming Responses"
          description="Show responses as they're generated"
        >
          <Switch defaultChecked />
        </SettingRow>
      </Fieldset>

      <div className="flex justify-start gap-[var(--space-12)]">
        <Button variant="primary">Save Changes</Button>
        <Button variant="secondary">Reset to Defaults</Button>
      </div>
    </div>
  )
}

// Memory Tab Content
function MemoryTab() {
  return (
    <div className="flex flex-col gap-[var(--space-40)]">
      <Fieldset>
        <Fieldset.Legend>Conversation Memory</Fieldset.Legend>

        <SettingRow
          label="Remember Conversations"
          description="AI learns from your chat history to provide personalized responses"
          badge="Beta"
        >
          <Switch defaultChecked />
        </SettingRow>

        <SettingRow
          label="Memory Scope"
          description="What the AI remembers about you"
        >
          <CheckboxGroup style="list" stack="vertical">
            <CheckboxGroupItem
              label="Preferences"
              description="Communication style, formatting preferences"
              defaultChecked
            />
            <CheckboxGroupItem
              label="Facts"
              description="Personal details you've shared (name, occupation)"
              defaultChecked
            />
            <CheckboxGroupItem
              label="Projects"
              description="Ongoing work and project context"
              defaultChecked
            />
            <CheckboxGroupItem
              label="Code Style"
              description="Programming languages and coding conventions"
            />
          </CheckboxGroup>
        </SettingRow>

        <SettingRow
          label="Context Window"
          description="How much conversation history to include"
        >
          <Select
            defaultValue="8"
            options={[
              { value: "4", label: "4 messages" },
              { value: "8", label: "8 messages" },
              { value: "16", label: "16 messages" },
              { value: "32", label: "32 messages" },
            ]}
          />
        </SettingRow>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Memory Management</Fieldset.Legend>

        <SettingRow
          label="View Memories"
          description="See what the AI has learned about you"
        >
          <Button variant="secondary" size="s" leadingIcon={<RiBrainLine />}>
            View All Memories
          </Button>
        </SettingRow>

        <SettingRow
          label="Clear Memory"
          description="Permanently delete all stored memories"
        >
          <Button variant="danger" size="s" leadingIcon={<RiDeleteBinLine />}>
            Clear All Memories
          </Button>
        </SettingRow>
      </Fieldset>

      <div className="flex justify-start gap-[var(--space-12)]">
        <Button variant="primary">Save Changes</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  )
}

// Voice Tab Content
function VoiceTab() {
  return (
    <div className="flex flex-col gap-[var(--space-40)]">
      <Fieldset>
        <Fieldset.Legend>Text to Speech</Fieldset.Legend>

        <SettingRow
          label="Enable Voice Output"
          description="Have responses read aloud automatically"
        >
          <Switch />
        </SettingRow>

        <SettingRow label="Voice" description="Choose your preferred AI voice">
          <Select
            defaultValue="aria"
            options={[
              { value: "aria", label: "Aria", description: "Warm and natural" },
              { value: "nova", label: "Nova", description: "Clear and professional" },
              { value: "echo", label: "Echo", description: "Calm and measured" },
              { value: "onyx", label: "Onyx", description: "Deep and authoritative" },
            ]}
          />
        </SettingRow>

        <SettingRow label="Speed" description="Playback speed for voice output">
          <Select
            defaultValue="1.0"
            options={[
              { value: "0.75", label: "0.75x (Slow)" },
              { value: "1.0", label: "1.0x (Normal)" },
              { value: "1.25", label: "1.25x (Fast)" },
              { value: "1.5", label: "1.5x (Faster)" },
            ]}
          />
        </SettingRow>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Speech to Text</Fieldset.Legend>

        <SettingRow
          label="Voice Input"
          description="Use your microphone to speak to the AI"
        >
          <Switch defaultChecked />
        </SettingRow>

        <SettingRow
          label="Auto-send on Silence"
          description="Automatically send message after you stop speaking"
        >
          <Switch />
        </SettingRow>

        <SettingRow
          label="Language"
          description="Primary language for voice recognition"
        >
          <Select
            defaultValue="en-US"
            options={[
              { value: "en-US", label: "English (US)" },
              { value: "en-GB", label: "English (UK)" },
              { value: "es-ES", label: "Spanish" },
              { value: "fr-FR", label: "French" },
              { value: "de-DE", label: "German" },
              { value: "ja-JP", label: "Japanese" },
            ]}
          />
        </SettingRow>
      </Fieldset>

      <div className="flex justify-start gap-[var(--space-12)]">
        <Button variant="primary">Save Changes</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  )
}

// Privacy Tab Content
function PrivacyTab() {
  return (
    <div className="flex flex-col gap-[var(--space-40)]">
      <Fieldset>
        <Fieldset.Legend>Data & Privacy</Fieldset.Legend>

        <SettingRow
          label="Improve AI Models"
          description="Allow your conversations to help improve future AI models"
        >
          <Switch />
        </SettingRow>

        <SettingRow
          label="Chat History"
          description="Save your conversation history"
        >
          <Switch defaultChecked />
        </SettingRow>

        <SettingRow
          label="History Retention"
          description="How long to keep your chat history"
        >
          <Select
            defaultValue="forever"
            options={[
              { value: "7", label: "7 days" },
              { value: "30", label: "30 days" },
              { value: "90", label: "90 days" },
              { value: "365", label: "1 year" },
              { value: "forever", label: "Forever" },
            ]}
          />
        </SettingRow>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Security</Fieldset.Legend>

        <SwitchGroup style="list" stack="vertical">
          <SwitchGroupItem
            label="End-to-End Encryption"
            description="Encrypt all messages between you and the AI"
            defaultChecked
          />
          <SwitchGroupItem
            label="Two-Factor Authentication"
            description="Require 2FA when signing in"
            defaultChecked
          />
          <SwitchGroupItem
            label="Session Timeout"
            description="Auto-logout after 30 minutes of inactivity"
          />
        </SwitchGroup>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Data Management</Fieldset.Legend>

        <SettingRow
          label="Export Data"
          description="Download all your conversations and data"
        >
          <Button variant="secondary" size="s" leadingIcon={<RiDownloadLine />}>
            Export All Data
          </Button>
        </SettingRow>

        <SettingRow
          label="Delete All Conversations"
          description="Permanently delete your entire chat history"
        >
          <Button variant="danger" size="s" leadingIcon={<RiDeleteBinLine />}>
            Delete All
          </Button>
        </SettingRow>

        <SettingRow
          label="Delete Account"
          description="Permanently delete your account and all associated data"
        >
          <Button variant="danger" size="s">
            Delete Account
          </Button>
        </SettingRow>
      </Fieldset>

      <div className="flex justify-start gap-[var(--space-12)]">
        <Button variant="primary">Save Changes</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  )
}

// Appearance Tab Content
function AppearanceTab() {
  return (
    <div className="flex flex-col gap-[var(--space-40)]">
      <Fieldset>
        <Fieldset.Legend>Theme</Fieldset.Legend>

        <SettingRow
          label="Color Mode"
          description="Choose your preferred color mode"
        >
          <RadioGroup defaultValue="system" style="card-small" stack="vertical">
            <RadioGroupItem
              value="light"
              label="Light"
              description="Light background with dark text"
              prefix={<RiSunLine className="size-[16px] text-content-subtle" />}
            />
            <RadioGroupItem
              value="dark"
              label="Dark"
              description="Dark background with light text"
              prefix={<RiMoonLine className="size-[16px] text-content-subtle" />}
            />
            <RadioGroupItem
              value="system"
              label="System"
              description="Follows your system preference"
              prefix={
                <RiComputerLine className="size-[16px] text-content-subtle" />
              }
            />
          </RadioGroup>
        </SettingRow>

        <SettingRow label="Accent Color" description="Choose your accent color">
          <Select
            defaultValue="blue"
            options={[
              { value: "blue", label: "Blue" },
              { value: "purple", label: "Purple" },
              { value: "green", label: "Green" },
              { value: "orange", label: "Orange" },
              { value: "pink", label: "Pink" },
            ]}
          />
        </SettingRow>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Chat Interface</Fieldset.Legend>

        <SettingRow
          label="Message Density"
          description="Spacing between messages in chat"
        >
          <Select
            defaultValue="comfortable"
            options={[
              { value: "compact", label: "Compact" },
              { value: "comfortable", label: "Comfortable" },
              { value: "spacious", label: "Spacious" },
            ]}
          />
        </SettingRow>

        <SettingRow
          label="Font Size"
          description="Text size in chat messages"
        >
          <Select
            defaultValue="medium"
            options={[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
          />
        </SettingRow>

        <SettingRow
          label="Code Block Theme"
          description="Syntax highlighting theme for code"
        >
          <Select
            defaultValue="github-dark"
            options={[
              { value: "github-dark", label: "GitHub Dark" },
              { value: "github-light", label: "GitHub Light" },
              { value: "monokai", label: "Monokai" },
              { value: "dracula", label: "Dracula" },
            ]}
          />
        </SettingRow>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Accessibility</Fieldset.Legend>

        <SettingRow
          label="Reduce Motion"
          description="Minimize animations throughout the interface"
        >
          <Switch />
        </SettingRow>

        <SettingRow
          label="High Contrast"
          description="Increase contrast for better visibility"
        >
          <Switch />
        </SettingRow>
      </Fieldset>

      <div className="flex justify-start gap-[var(--space-12)]">
        <Button variant="primary">Save Changes</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  )
}

// Personalization Tab Content
function PersonalizationTab() {
  return (
    <div className="flex flex-col gap-[var(--space-40)]">
      <Fieldset>
        <Fieldset.Legend>Profile</Fieldset.Legend>

        <SettingRow label="Avatar" description="Your profile picture">
          <div className="flex items-center gap-[var(--space-12)]">
            <Avatar size="l" initials="JD" color="blue" isEmphasized />
            <Button variant="secondary" size="s">
              Change
            </Button>
          </div>
        </SettingRow>

        <SettingRow
          label="Display Name"
          description="How the AI will address you"
        >
          <Input placeholder="Your name" defaultValue="John" />
        </SettingRow>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Custom Instructions</Fieldset.Legend>

        <SettingRow
          label="About You"
          description="What should the AI know about you to provide better responses?"
        >
          <Field>
            <Input placeholder="e.g., I'm a software developer working on React apps" />
          </Field>
        </SettingRow>

        <SettingRow
          label="Response Preferences"
          description="How would you like the AI to respond?"
        >
          <Field>
            <Input placeholder="e.g., Be concise, use code examples when relevant" />
          </Field>
        </SettingRow>
      </Fieldset>

      <Fieldset>
        <Fieldset.Legend>Quick Actions</Fieldset.Legend>

        <SettingRow
          label="Default Prompts"
          description="Quick prompts shown at the start of new chats"
        >
          <SwitchGroup style="list" stack="vertical">
            <SwitchGroupItem
              label="Summarize"
              description="Summarize this text for me"
              defaultChecked
            />
            <SwitchGroupItem
              label="Explain"
              description="Explain this concept simply"
              defaultChecked
            />
            <SwitchGroupItem
              label="Code Review"
              description="Review this code and suggest improvements"
              defaultChecked
            />
            <SwitchGroupItem
              label="Translate"
              description="Translate this text"
            />
          </SwitchGroup>
        </SettingRow>
      </Fieldset>

      <div className="flex justify-start gap-[var(--space-12)]">
        <Button variant="primary">Save Changes</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-[var(--space-40)] px-[var(--space-24)] py-[var(--space-40)]">
      {/* Page Header */}
      <div className="flex flex-col gap-[var(--space-8)]">
        <div className="flex items-center gap-[var(--space-12)]">
          <h1 className="text-[length:var(--font-size-3xl)] font-[var(--font-weight-semibold)] leading-[var(--line-height-3xl)] text-content-strong">
            Settings
          </h1>
          <Badge size="s" variant="info">
            AI Chat
          </Badge>
        </div>
        <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
          Customize your AI assistant experience
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="model" variant="pill-emphasized">
        <Tabs.List>
          <Tabs.Trigger value="model">AI Model</Tabs.Trigger>
          <Tabs.Trigger value="memory">Memory</Tabs.Trigger>
          <Tabs.Trigger value="voice">Voice</Tabs.Trigger>
          <Tabs.Trigger value="personalization">Personalization</Tabs.Trigger>
          <Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
          <Tabs.Trigger value="privacy">Privacy</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Content value="model">
          <ModelTab />
        </Tabs.Content>

        <Tabs.Content value="memory">
          <MemoryTab />
        </Tabs.Content>

        <Tabs.Content value="voice">
          <VoiceTab />
        </Tabs.Content>

        <Tabs.Content value="personalization">
          <PersonalizationTab />
        </Tabs.Content>

        <Tabs.Content value="appearance">
          <AppearanceTab />
        </Tabs.Content>

        <Tabs.Content value="privacy">
          <PrivacyTab />
        </Tabs.Content>
      </Tabs>
    </div>
  )
}
