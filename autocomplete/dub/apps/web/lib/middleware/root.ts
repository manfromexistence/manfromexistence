import { recordClick } from "@/lib/tinybird";
import { formatRedisDomain, redis } from "@/lib/upstash";
import { DUB_HEADERS } from "@dub/utils";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getDomainViaEdge } from "../planetscale";
import { RedisDomainProps } from "../types";
import { parse } from "./utils";

export default async function RootMiddleware(
  req: NextRequest,
  ev: NextFetchEvent,
) {
  const { domain } = parse(req);

  if (!domain) {
    return NextResponse.next();
  }

  let link = await redis.hget<RedisDomainProps>(domain, "_root");

  if (!link) {
    const linkData = await getDomainViaEdge(domain);

    if (!linkData) {
      // rewrite to placeholder page if domain doesn't exist
      return NextResponse.rewrite(new URL(`/${domain}`, req.url), DUB_HEADERS);
    }

    // format link to fit the RedisLinkProps interface
    link = await formatRedisDomain(linkData as any);

    ev.waitUntil(
      redis.hset(domain, {
        _root: link,
      }),
    );
  }

  const { id, url, rewrite, iframeable } = link;

  // record clicks on root page
  ev.waitUntil(recordClick({ req, id, ...(url && { url }), root: true }));

  if (!url) {
    // rewrite to placeholder page unless the user defines a site to redirect to
    return NextResponse.rewrite(new URL(`/${domain}`, req.url), DUB_HEADERS);
  }

  if (rewrite) {
    if (iframeable) {
      return NextResponse.rewrite(
        new URL(`/cloaked/${encodeURIComponent(url)}`, req.url),
        DUB_HEADERS,
      );
    } else {
      // if link is not iframeable, use Next.js rewrite instead
      return NextResponse.rewrite(url, DUB_HEADERS);
    }
  } else {
    // For root links that have a destination URL, use 301 status code (for SEO purposes)
    return NextResponse.redirect(url, { ...DUB_HEADERS, status: 301 });
  }
}
