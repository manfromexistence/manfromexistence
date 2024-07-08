import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { nanoid } from "@dub/utils";
import { NextResponse } from "next/server";

export const POST = withAuth(
  async ({ workspace }) => {
    const response = await prisma.project.update({
      where: {
        id: workspace.id,
      },
      data: {
        inviteCode: nanoid(24),
      },
    });

    return NextResponse.json(response);
  },
  {
    requiredRole: ["owner"],
  },
);
