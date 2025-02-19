import { Italic } from "lucide-react"

import { Toggle } from "@/registry-1/new-york/ui/toggle"

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  )
}
