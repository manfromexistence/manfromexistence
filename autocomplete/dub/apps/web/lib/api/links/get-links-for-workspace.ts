import prisma from "@/lib/prisma";
import z from "@/lib/zod";
import { getLinksQuerySchema } from "@/lib/zod/schemas/links";
import { combineTagIds, transformLink } from "./utils";

export async function getLinksForWorkspace({
  workspaceId,
  domain,
  tagId,
  tagIds,
  search,
  sort = "createdAt",
  page,
  userId,
  showArchived,
  withTags,
}: z.infer<typeof getLinksQuerySchema> & {
  workspaceId: string;
}) {
  const combinedTagIds = combineTagIds({ tagId, tagIds });

  const links = await prisma.link.findMany({
    where: {
      projectId: workspaceId,
      archived: showArchived ? undefined : false,
      ...(domain && { domain }),
      ...(search && {
        OR: [
          {
            key: { contains: search },
          },
          {
            url: { contains: search },
          },
        ],
      }),
      ...(withTags && {
        tags: {
          some: {},
        },
      }),
      ...(combinedTagIds.length > 0 && {
        tags: { some: { tagId: { in: combinedTagIds } } },
      }),
      ...(userId && { userId }),
    },
    include: {
      user: true,
      tags: {
        include: {
          tag: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
        },
      },
    },
    orderBy: {
      [sort]: "desc",
    },
    take: 100,
    ...(page && {
      skip: (page - 1) * 100,
    }),
  });

  return links.map((link) => transformLink(link));
}
