"use client"

import { useToast } from "@/registry-1/default/hooks/use-toast"
import { Button } from "@/registry-1/default/ui/button"

export default function ToastSimple() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
