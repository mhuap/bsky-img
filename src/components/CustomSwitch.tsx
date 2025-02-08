import React from 'react'

import { Switch } from "@/components/ui/switch"
import { cn } from '@/lib/utils'

export default function CustomSwitch({
    label,
    switchId,
    onChange,
    defaultChecked,
    checked,
    disabled
  } : {
    label: string,
    switchId: string,
    onChange: () => void,
    defaultChecked?: boolean,
    checked?: boolean,
    disabled?: boolean
  }) {
  return (
    <div className="flex items-center gap-1">
      <Switch
        id={switchId}
        onCheckedChange={onChange}
        defaultChecked={defaultChecked}
        checked={checked}
        disabled={disabled}
      />
      <label className={cn(
        "ml-1",
        {"opacity-50": disabled}
      )} htmlFor={switchId}>{label}</label>
    </div>
  )
}
