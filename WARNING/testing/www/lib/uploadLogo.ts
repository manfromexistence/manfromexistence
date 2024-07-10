import { generateReactHelpers } from "@uploadthing/react"

import type { OurFileRouter } from "@/app/api/uploadthing/logo"

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()
