"use client"

import * as React from "react"
import { RiCheckFill, RiExpandUpDownLine } from "@remixicon/react"

import { Select, type SelectRootProps, type SelectSize } from "@soft-ui/react/select"
import { MenuPrefix } from "@soft-ui/react/menu-prefix"
import { cn } from "@/lib/utils"

type SelectOption = {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  prefixType?: "icon" | "danger-icon" | "avatar" | "company" | "token"
  disabled?: boolean
}

type SelectDemoProps = SelectRootProps & {
  options: SelectOption[]
  placeholder?: string
  leadingIcon?: React.ReactNode
  size?: SelectSize
}

function getDisplayText(
  selectedValue: string | string[] | null | undefined,
  options: SelectOption[],
  placeholder: string,
  multiple?: boolean
) {
  if (!selectedValue) return placeholder

  if (multiple && Array.isArray(selectedValue)) {
    if (selectedValue.length === 0) return placeholder
    if (selectedValue.length === 1) {
      const option = options.find((item) => item.value === selectedValue[0])
      return option?.label ?? selectedValue[0]
    }
    return `${selectedValue.length} selected`
  }

  const option = options.find((item) => item.value === selectedValue)
  return option?.label ?? selectedValue
}

function SelectDemo({
  options,
  placeholder = "Select an option",
  leadingIcon,
  size = "m",
  multiple,
  ...props
}: SelectDemoProps) {
  return (
    <Select size={size} multiple={multiple} {...props}>
      <Select.Trigger>
        {leadingIcon && (
          <span
            data-slot="leading-icon"
            className={cn(
              "flex size-[16px] shrink-0 items-center justify-center [&_svg]:size-full",
              "text-content-subtle"
            )}
          >
            {leadingIcon}
          </span>
        )}
        <Select.Value>
          {(selectedValue) =>
            getDisplayText(
              selectedValue as string | string[] | null,
              options,
              placeholder,
              multiple
            )
          }
        </Select.Value>
        <Select.Icon>
          <RiExpandUpDownLine />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4} align="start" collisionPadding={8}>
          <Select.Popup>
            <Select.List>
              {options.map((option: SelectOption) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.icon && (
                    <span className="flex shrink-0 group-has-[[data-slot=item-description]]:items-start group-has-[[data-slot=item-description]]:self-stretch group-has-[[data-slot=item-description]]:pt-[var(--space-2)]">
                      <MenuPrefix
                        type={option.prefixType ?? "icon"}
                        icon={option.icon}
                        disabled={option.disabled}
                      />
                    </span>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)] pl-[var(--space-2)]">
                    <Select.ItemText>
                      {option.label}
                    </Select.ItemText>
                    {option.description && (
                      <span
                        data-slot="item-description"
                        className={cn(
                          "truncate text-[length:var(--font-size-xs)] font-[var(--font-weight-default)] leading-[var(--line-height-xs)]",
                          "text-content-subtle group-data-[disabled]:text-content-disabled"
                        )}
                      >
                        {option.description}
                      </span>
                    )}
                  </div>

                  <Select.ItemIndicator>
                    <span className="flex size-[16px] items-center justify-center text-content-strong [&_svg]:size-full">
                      <RiCheckFill />
                    </span>
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select>
  )
}

export { SelectDemo }
export type { SelectDemoProps, SelectOption }
