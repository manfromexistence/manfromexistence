import { Italic } from "lucide-react"

import { Toggle } from "@/registry-1/new-york/ui/toggle"

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  )
}
