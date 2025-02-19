"use client"

import { useToast } from "@/registry-1/new-york/hooks/use-toast"
import { Button } from "@/registry-1/new-york/ui/button"
import { ToastAction } from "@/registry-1/new-york/ui/toast"

export default function ToastDemo() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up ",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
      }}
    >
      Add to calendar
    </Button>
  )
}
