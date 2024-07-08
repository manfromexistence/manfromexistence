import { DubApiError, exceededLimitError } from "@/lib/api/errors";
import { inviteUser } from "@/lib/api/users";
import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import z from "@/lib/zod";
import { NextResponse } from "next/server";

const emailInviteSchema = z.object({
  email: z.string().email(),
});

// GET /api/workspaces/[idOrSlug]/invites – get invites for a specific workspace
export const GET = withAuth(async ({ workspace }) => {
  const invites = await prisma.projectInvite.findMany({
    where: {
      projectId: workspace.id,
    },
    select: {
      email: true,
      createdAt: true,
    },
  });
  return NextResponse.json(invites);
});

// POST /api/workspaces/[idOrSlug]/invites – invite a teammate
export const POST = withAuth(
  async ({ req, workspace, session }) => {
    const { email } = emailInviteSchema.parse(await req.json());

    const [alreadyInWorkspace, workspaceUserCount, workspaceInviteCount] =
      await Promise.all([
        prisma.projectUsers.findFirst({
          where: {
            projectId: workspace.id,
            user: {
              email,
            },
          },
        }),
        prisma.projectUsers.count({
          where: {
            projectId: workspace.id,
          },
        }),
        prisma.projectInvite.count({
          where: {
            projectId: workspace.id,
          },
        }),
      ]);

    if (alreadyInWorkspace) {
      throw new DubApiError({
        code: "bad_request",
        message: "User already exists in this workspace.",
      });
    }

    if (workspaceUserCount + workspaceInviteCount >= workspace.usersLimit) {
      throw new DubApiError({
        code: "exceeded_limit",
        message: exceededLimitError({
          plan: workspace.plan,
          limit: workspace.usersLimit,
          type: "users",
        }),
      });
    }

    await inviteUser({
      email,
      workspace,
      session,
    });

    return NextResponse.json({ message: "Invite sent" });
  },
  {
    requiredRole: ["owner"],
  },
);

// DELETE /api/workspaces/[idOrSlug]/invites – delete a pending invite
export const DELETE = withAuth(
  async ({ searchParams, workspace }) => {
    const { email } = emailInviteSchema.parse(searchParams);
    const response = await prisma.projectInvite.delete({
      where: {
        email_projectId: {
          email,
          projectId: workspace.id,
        },
      },
    });
    return NextResponse.json(response);
  },
  {
    requiredRole: ["owner"],
  },
);
