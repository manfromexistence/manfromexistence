import React from 'react'

import {
  Switch,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@janhq/uikit'

import { InfoIcon } from 'lucide-react'

type Props = {
  name: string
  title: string
  disabled?: boolean
  description: string
  checked: boolean
  onValueChanged?: (e: string | number | boolean) => void
}

const Checkbox: React.FC<Props> = ({
  title,
  checked,
  disabled = false,
  description,
  onValueChanged,
}) => {
  const onCheckedChange = (checked: boolean) => {
    onValueChanged?.(checked)
  }

  return (
    <div className="flex justify-between">
      <div className="mb-1 flex items-center gap-x-2">
        <p className="text-sm font-semibold text-zinc-500 dark:text-gray-300">
          {title}
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon size={16} className="flex-shrink-0 dark:text-gray-500" />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent side="top" className="max-w-[240px]">
              <span>{description}</span>
              <TooltipArrow />
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Checkbox
