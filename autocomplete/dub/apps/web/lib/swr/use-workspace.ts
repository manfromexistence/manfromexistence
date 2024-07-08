import { WorkspaceProps } from "@/lib/types";
import { PRO_PLAN, fetcher, getNextPlan } from "@dub/utils";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function useWorkspace() {
  let { slug } = useParams() as { slug: string | null };
  const searchParams = useSearchParams();
  if (!slug) {
    slug = searchParams.get("slug");
  }

  const {
    data: workspace,
    error,
    mutate,
  } = useSWR<WorkspaceProps>(slug && `/api/workspaces/${slug}`, fetcher, {
    dedupingInterval: 30000,
  });

  return {
    ...workspace,
    nextPlan: workspace?.plan ? getNextPlan(workspace.plan) : PRO_PLAN,
    isOwner: workspace?.users && workspace.users[0].role === "owner",
    exceededClicks: workspace && workspace.usage >= workspace.usageLimit,
    exceededLinks: workspace && workspace.linksUsage >= workspace.linksLimit,
    exceededDomains:
      workspace?.domains && workspace.domains.length >= workspace.domainsLimit,
    error,
    mutate,
    loading: slug && !workspace && !error ? true : false,
  };
}
