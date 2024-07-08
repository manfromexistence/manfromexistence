"use server";

import { getLinkViaEdge } from "@/lib/planetscale";
import { linkConstructor } from "@dub/utils";

export async function verifyPassword(_prevState: any, data: FormData) {
  const domain = data.get("domain") as string;
  const rawKey = data.get("key") as string; // keys can potentially be encoded
  const key = decodeURIComponent(rawKey);
  const password = data.get("password") as string;

  const link = await getLinkViaEdge(domain, key);
  if (!link) {
    return { error: "Link not found" };
  }
  const { password: realPassword } = link;

  const validPassword = password === realPassword;

  if (validPassword) {
    // if the password is valid, redirect to the link with the password in the query string
    return {
      redirect: `${linkConstructor({
        domain,
        key: rawKey,
      })}?pw=${password}`,
    };
    // TODO: Fix this once this actually works: https://nextjs.org/docs/app/api-reference/functions/redirect#client-component
    // redirect(
    //   `${linkConstructor({
    //     domain,
    //     key: rawKey,
    //   })}?pw=${password}`,
    // );
  } else {
    return { error: "Invalid password" };
  }
}
