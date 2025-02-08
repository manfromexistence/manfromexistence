import { type Registry } from "shadcn/registry"
import { z } from "zod"

import { blocks } from "@/registry-1/registry-blocks"
import { charts } from "@/registry-1/registry-charts"
import { examples } from "@/registry-1/registry-examples"
import { hooks } from "@/registry-1/registry-hooks"
import { internal } from "@/registry/registry-internal"
import { lib } from "@/registry-1/registry-lib"
import { themes } from "@/registry-1/registry-themes"
import { ui } from "@/registry-1/registry-ui"

export const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: [
    ...ui,
    ...blocks,
    ...charts,
    ...lib,
    ...hooks,
    ...themes,

    // Internal use only.
    ...internal,
    ...examples,
  ],
} satisfies Registry
