import { Italic } from "lucide-react"

import { Toggle } from "@/registry-1/new-york/ui/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic />
      Italic
    </Toggle>
  )
}
