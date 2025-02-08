import { Bold } from "lucide-react"

import { Toggle } from "@/registry-1/new-york/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle italic">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
