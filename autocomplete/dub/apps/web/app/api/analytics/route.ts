import { withAuth } from "@/lib/auth";
import { getDomainOrLink } from "@/lib/planetscale";
import prisma from "@/lib/prisma";
import z, { domainKeySchema } from "@/lib/zod";
import { NextResponse } from "next/server";

const updatePublicStatsSchema = z.object({
  publicStats: z.boolean(),
});

// GET /api/analytics – get the publicStats setting for a link
export const GET = withAuth(async ({ searchParams }) => {
  const { domain, key } = domainKeySchema.parse(searchParams);
  const response = await getDomainOrLink({ domain, key });
  return NextResponse.json(response);
});

// PUT /api/analytics – update the publicStats setting for a link
export const PUT = withAuth(async ({ req, searchParams }) => {
  const { domain, key } = domainKeySchema.parse(searchParams);
  const { publicStats } = updatePublicStatsSchema.parse(await req.json());
  const response =
    key === "_root"
      ? await prisma.domain.update({
          where: { slug: domain },
          data: { publicStats },
        })
      : await prisma.link.update({
          where: { domain_key: { domain, key } },
          data: { publicStats },
        });
  return NextResponse.json(response);
});
