import { UserDetails } from "../components/user-details";

export default async function DashboardPage() {
  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto border bg-theme my-24 rounded-md p-24">
        <div className="w-full h-auto flex items-center justify-center">
            <UserDetails />
        </div>
      </main>
    </>
  );
}
