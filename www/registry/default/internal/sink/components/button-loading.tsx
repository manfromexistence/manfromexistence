import { Loader2 } from "lucide-react"

import { Button } from "@/registry-1/default/ui/button"

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  )
}
