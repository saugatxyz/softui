"use client"

import { RiSunLine, RiMoonLine, RiComputerLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"
import { Fieldset } from "@/components/ui/fieldset"
import { RadioGroup } from "@/components/ui/radio-group"
import { RadioGroupItem } from "@/components/ui/radio-group-item"
import { RadioPrefix } from "@/components/ui/radio-prefix"
import { Select } from "@/components/ui/select"
import { SwitchGroup } from "@/components/ui/switch-group"
import { SwitchGroupItem } from "@/components/ui/switch-group-item"

const fontSizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
]

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-[var(--space-52)] px-[var(--space-16)] py-[var(--space-32)] md:px-[var(--space-24)]">
      {/* Page Header */}
      <header className="flex flex-col gap-[var(--space-6)]">
        <h1 className="text-[length:var(--font-size-3xl)] font-[var(--font-weight-semibold)] leading-[var(--line-height-3xl)] text-content-strong">
          Settings
        </h1>
        <p className="text-[length:var(--font-size-m)] font-[var(--font-weight-default)] leading-[var(--line-height-m)] text-content-subtle">
          Manage your account preferences
        </p>
      </header>

      {/* Settings Sections */}
      <div className="flex flex-col gap-[var(--space-52)]">
        {/* Appearance Section */}
        <Fieldset>
          <Fieldset.Legend>Appearance</Fieldset.Legend>

          <div className="flex flex-col gap-[var(--space-24)]">
            {/* Theme */}
            <div className="flex flex-col gap-[var(--space-8)]">
              <label className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                Theme
              </label>
              <RadioGroup style="card-small" stack="horizontal" defaultValue="system">
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
            </div>

            {/* Font Size */}
            <div className="flex flex-col gap-[var(--space-8)]">
              <label className="text-[length:var(--font-size-m)] font-[var(--font-weight-medium)] leading-[var(--line-height-m)] text-content-strong">
                Font size
              </label>
              <Select
                options={fontSizeOptions}
                defaultValue="medium"
                placeholder="Select font size"
                className="max-w-[200px]"
              />
            </div>
          </div>
        </Fieldset>

        {/* Notifications Section */}
        <Fieldset>
          <Fieldset.Legend>Notifications</Fieldset.Legend>

          <SwitchGroup style="simple">
            <SwitchGroupItem
              label="Email notifications"
              defaultChecked={true}
            />
            <SwitchGroupItem
              label="Push notifications"
              defaultChecked={true}
            />
            <SwitchGroupItem
              label="SMS notifications"
              defaultChecked={false}
            />
          </SwitchGroup>
        </Fieldset>

        {/* Privacy Section */}
        <Fieldset>
          <Fieldset.Legend>Privacy</Fieldset.Legend>

          <SwitchGroup style="list">
            <SwitchGroupItem
              label="Analytics"
              description="Help us improve by sharing anonymous usage data"
              defaultChecked={true}
            />
            <SwitchGroupItem
              label="Personalization"
              description="Allow personalized recommendations based on your activity"
              defaultChecked={true}
            />
            <SwitchGroupItem
              label="Marketing communications"
              description="Receive updates about new features and promotions"
              defaultChecked={false}
            />
          </SwitchGroup>
        </Fieldset>

        {/* Save Button */}
        <div className="flex justify-start">
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </div>
  )
}
