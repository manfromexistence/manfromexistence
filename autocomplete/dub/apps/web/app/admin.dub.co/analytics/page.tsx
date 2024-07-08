import Analytics from "@/ui/analytics";
import LayoutLoader from "@/ui/layout/layout-loader";
import { Suspense } from "react";

export default function WorkspaceAnalytics() {
  return (
    <Suspense fallback={<LayoutLoader />}>
      <div className="w-full">
        <Analytics admin />
      </div>
    </Suspense>
  );
}
