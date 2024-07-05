import { SiteHeader } from "@/components/site-header";
import { UserDetails } from "../user-details/user-details";
import { SiteFooter } from "@/components/site-footer";

export default async function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-[75rem] w-full mx-auto border bg-theme my-24 rounded-md p-24">
        <div className="w-full h-auto flex items-center justify-center">
          <UserDetails />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
