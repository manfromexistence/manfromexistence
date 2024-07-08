import { addDomainToVercel } from "@/lib/api/domains";
import { withAuth } from "@/lib/auth";
import { qstash } from "@/lib/cron";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/upstash";
import { APP_DOMAIN_WITH_NGROK, fetchWithTimeout } from "@dub/utils";
import { NextResponse } from "next/server";

// GET /api/workspaces/[idOrSlug]/import/short – get all short.io domains for a workspace
export const GET = withAuth(async ({ workspace }) => {
  const accessToken = await redis.get(`import:short:${workspace.id}`);
  if (!accessToken) {
    return new Response("No Short.io access token found", { status: 400 });
  }

  const response = await fetch(`https://api.short.io/api/domains`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken as string,
    },
  });
  const data = await response.json();
  if (data.error === "Unauthorized") {
    return new Response("Invalid Short.io access token", { status: 403 });
  }

  const domains = await Promise.all(
    data
      .filter(
        // exclude default short.io domains
        ({ hostname }: { hostname: string }) => !hostname.endsWith(".short.gy"),
      )
      .map(async ({ id, hostname }: { id: number; hostname: string }) => ({
        id,
        domain: hostname,
        links: await fetchWithTimeout(
          `https://api-v2.short.cm/statistics/domain/${id}?period=total`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken as string,
            },
          },
        )
          .then((r) => r.json())
          .then((data) => data.links - 1) // subtract 1 to exclude root domain
          .catch(() => 0),
      })),
  );

  return NextResponse.json(domains);
});

// PUT /api/workspaces/[idOrSlug]/import/short - save Short.io API key
export const PUT = withAuth(async ({ req, workspace }) => {
  const { apiKey } = await req.json();
  const response = await redis.set(`import:short:${workspace.id}`, apiKey);
  return NextResponse.json(response);
});

// POST /api/workspaces/[idOrSlug]/import/short - create job to import links from Short.io
export const POST = withAuth(async ({ req, workspace, session }) => {
  const { selectedDomains, importTags } = await req.json();

  // check if there are domains that are not in the workspace
  // if yes, add them to the workspace
  const domainsNotInWorkspace = selectedDomains.filter(
    ({ domain }) => !workspace.domains?.find((d) => d.slug === domain),
  );
  if (domainsNotInWorkspace.length > 0) {
    await Promise.allSettled([
      prisma.domain.createMany({
        data: domainsNotInWorkspace.map(({ domain }) => ({
          slug: domain,
          target: null,
          type: "redirect",
          projectId: workspace.id,
          primary: false,
        })),
        skipDuplicates: true,
      }),
      domainsNotInWorkspace.map(({ domain }) => addDomainToVercel(domain)),
    ]);
  }

  const response = await Promise.all(
    selectedDomains.map(({ id, domain }) =>
      qstash.publishJSON({
        url: `${APP_DOMAIN_WITH_NGROK}/api/cron/import/short`,
        body: {
          workspaceId: workspace.id,
          userId: session?.user?.id,
          domainId: id,
          domain,
          importTags,
        },
      }),
    ),
  );
  return NextResponse.json(response);
});
