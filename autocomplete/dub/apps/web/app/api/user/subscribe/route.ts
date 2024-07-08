import { withSession } from "@/lib/auth";
import { subscribe, unsubscribe } from "@/lib/flodesk";
import prisma from "@/lib/prisma";
import { log } from "@dub/utils";
import { NextResponse } from "next/server";

// GET /api/user/subscribe – get a specific user
export const GET = withSession(async ({ session }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      subscribed: true,
    },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  return NextResponse.json(user);
});

// POST /api/user/subscribe – subscribe a specific user
export const POST = withSession(async ({ session }) => {
  const [user, _] = await Promise.all([
    prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        subscribed: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        subscribed: true,
      },
    }),
    subscribe({ email: session.user.email, name: session.user.name }),
    log({
      message: `*${session.user.email}* resubscribed to the newsletter. Manual addition required.`,
      type: "alerts",
    }),
  ]);

  return NextResponse.json(user);
});

// DELETE /api/user/subscribe – unsubscribe a specific user
export const DELETE = withSession(async ({ session }) => {
  const [user, _] = await Promise.all([
    prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        subscribed: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        subscribed: true,
      },
    }),
    unsubscribe(session.user.email),
  ]);

  return NextResponse.json(user);
});
