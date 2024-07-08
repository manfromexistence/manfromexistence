import { hashToken, withAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DUB_DOMAINS_ARRAY } from "@dub/utils";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

// POST /api/admin/impersonate
export const POST = withAdmin(async ({ req }) => {
  const { email, slug } = await req.json();

  const response = await prisma.user.findFirst({
    where: email
      ? { email }
      : {
          projects: {
            some: {
              project: {
                slug,
              },
              role: "owner",
            },
          },
        },
    select: {
      email: true,
      links: {
        where: {
          domain: {
            in: DUB_DOMAINS_ARRAY,
          },
        },
        select: {
          domain: true,
        },
      },
      projects: {
        select: {
          project: {
            select: {
              name: true,
              slug: true,
              plan: true,
              usage: true,
              _count: {
                select: {
                  domains: true,
                  links: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!response?.email) {
    return new Response("User not found", { status: 404 });
  }

  const data = {
    email: response.email,
    // object with domain slugs as keys and the count of links as values
    defaultDomainLinks: response.links.reduce(
      (acc, { domain }) => {
        if (acc[domain]) {
          acc[domain]++;
        } else {
          acc[domain] = 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    ),
    workspaces: response.projects.map(({ project }) => ({
      ...project,
      clicks: project.usage,
      domains: project._count.domains,
      links: project._count.links,
    })),
    impersonateUrl: await getImpersonateUrl(response.email),
  };

  return NextResponse.json(data);
});

async function getImpersonateUrl(email: string) {
  const token = randomBytes(32).toString("hex");

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashToken(token),
      expires: new Date(Date.now() + 60000),
    },
  });

  const params = new URLSearchParams({
    callbackUrl: process.env.NEXTAUTH_URL as string,
    email,
    token,
  });

  return `${process.env.NEXTAUTH_URL}/api/auth/callback/email?${params}`;
}
