import { DubApiError, exceededLimitError } from "@/lib/api/errors";
import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createTagBodySchema } from "@/lib/zod/schemas/tags";
import { COLORS_LIST, randomBadgeColor } from "@/ui/links/tag-badge";
import { NextResponse } from "next/server";

// GET /api/tags - get all tags for a workspace
export const GET = withAuth(async ({ workspace, headers }) => {
  const tags = await prisma.tag.findMany({
    where: {
      projectId: workspace.id,
    },
    select: {
      id: true,
      name: true,
      color: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(tags, { headers });
});

// POST /api/workspaces/[idOrSlug]/tags - create a tag for a workspace
export const POST = withAuth(async ({ req, workspace, headers }) => {
  const tagsCount = await prisma.tag.count({
    where: {
      projectId: workspace.id,
    },
  });

  if (tagsCount >= workspace.tagsLimit) {
    throw new DubApiError({
      code: "exceeded_limit",
      message: exceededLimitError({
        plan: workspace.plan,
        limit: workspace.tagsLimit,
        type: "tags",
      }),
    });
  }

  const { tag, color } = createTagBodySchema.parse(await req.json());

  const existingTag = await prisma.tag.findFirst({
    where: {
      projectId: workspace.id,
      name: tag,
    },
  });

  if (existingTag) {
    throw new DubApiError({
      code: "conflict",
      message: "A tag with that name already exists.",
    });
  }

  const response = await prisma.tag.create({
    data: {
      name: tag,
      color:
        color && COLORS_LIST.map(({ color }) => color).includes(color)
          ? color
          : randomBadgeColor(),
      projectId: workspace.id,
    },
  });

  return NextResponse.json(response, { headers, status: 201 });
});
