import { Dashboard } from "@/container";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid md:grid-cols-[15%_85%]">
      <Dashboard.SideBar />
      {children}
    </main>
  );
};

export default DashboardLayout;
