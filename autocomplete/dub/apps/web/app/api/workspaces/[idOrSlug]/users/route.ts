import { DubApiError } from "@/lib/api/errors";
import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { roles } from "@/lib/types";
import z from "@/lib/zod";
import { NextResponse } from "next/server";

const updateRoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(roles, {
    errorMap: () => ({
      message: `Role must be either "owner" or "member".`,
    }),
  }),
});

const removeUserSchema = z.object({
  userId: z.string().min(1),
});

// GET /api/workspaces/[idOrSlug]/users – get users for a specific workspace
export const GET = withAuth(async ({ workspace }) => {
  const users = await prisma.projectUsers.findMany({
    where: {
      projectId: workspace.id,
    },
    select: {
      role: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      createdAt: true,
    },
  });
  return NextResponse.json(
    users.map((u) => ({
      ...u.user,
      role: u.role,
    })),
  );
});

// PUT /api/workspaces/[idOrSlug]/users – update a user's role for a specific workspace
export const PUT = withAuth(
  async ({ req, workspace }) => {
    const { userId, role } = updateRoleSchema.parse(await req.json());
    const response = await prisma.projectUsers.update({
      where: {
        userId_projectId: {
          projectId: workspace.id,
          userId,
        },
      },
      data: {
        role,
      },
    });
    return NextResponse.json(response);
  },
  {
    requiredRole: ["owner"],
  },
);

// DELETE /api/workspaces/[idOrSlug]/users – remove a user from a workspace

export const DELETE = withAuth(
  async ({ searchParams, workspace, session }) => {
    const { userId } = removeUserSchema.parse(searchParams);
    const [projectUser, totalOwners] = await Promise.all([
      prisma.projectUsers.findUnique({
        where: {
          userId_projectId: {
            projectId: workspace.id,
            userId,
          },
        },
        select: {
          role: true,
        },
      }),
      prisma.projectUsers.count({
        where: {
          projectId: workspace.id,
          role: "owner",
        },
      }),
    ]);
    if (!projectUser) {
      throw new DubApiError({
        code: "not_found",
        message: "User not found",
      });
    }
    // If there is only one owner and the user is an owner and the user is trying to remove themselves
    if (
      totalOwners === 1 &&
      projectUser.role === "owner" &&
      userId === session.user.id
    ) {
      throw new DubApiError({
        code: "bad_request",
        message:
          "Cannot remove owner from workspace. Please transfer ownership to another user first.",
      });
    }
    const response = await prisma.projectUsers.delete({
      where: {
        userId_projectId: {
          projectId: workspace.id,
          userId,
        },
      },
    });
    return NextResponse.json(response);
  },
  {
    requiredRole: ["owner"],
    allowSelf: true,
  },
);
