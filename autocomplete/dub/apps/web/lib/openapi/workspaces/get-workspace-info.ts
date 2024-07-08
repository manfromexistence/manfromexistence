import { ZodOpenApiOperationObject } from "zod-openapi";

import { openApiErrorResponses } from "@/lib/openapi/responses";
import z from "@/lib/zod";
import { WorkspaceSchema } from "@/lib/zod/schemas/workspaces";

export const getWorkspaceInfo: ZodOpenApiOperationObject = {
  operationId: "getWorkspace",
  summary: "Retrieve a workspace",
  description: "Retrieve a workspace for the authenticated user.",
  requestParams: {
    path: z.object({
      idOrSlug: z.string().describe("The ID or slug of the workspace."),
    }),
  },
  responses: {
    "200": {
      description: "The retrieved workspace",
      content: {
        "application/json": {
          schema: WorkspaceSchema,
        },
      },
    },
    ...openApiErrorResponses,
  },
  tags: ["Workspaces"],
  security: [{ bearerToken: [] }],
};
