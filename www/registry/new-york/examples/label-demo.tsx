import { Checkbox } from "@/registry-1/new-york/ui/checkbox"
import { Label } from "@/registry-1/new-york/ui/label"

export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
