import { Bold } from "lucide-react"

import { Toggle } from "@/registry-1/default/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
