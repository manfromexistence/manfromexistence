"use client";

import { cn } from "@/helpers";
import {
  BarChart3,
  CircleDollarSign,
  Cog,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="p-4 h-dvh overflow-hidden bg-gray-50 flex flex-col">
      <div>
        <h1 className="font-bold text-2xl">Freelance Stuffs</h1>
      </div>
      {/* ---PAGES--- */}

      <div className="py-4 flex flex-col gap-2 flex-1">
        {pages.map((page, index) => (
          <Link
            href={page.href}
            key={index}
            className={cn(
              "flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white",
              pathname.includes(page.href) && "bg-white font-bold"
            )}
          >
            <span>{page.icon}</span>
            <span>{page.title}</span>
          </Link>
        ))}
      </div>
      <div>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white"
        >
          <span>
            <Cog size={20} strokeWidth={1.5} />
          </span>
          <span>Settings</span>
        </Link>
        <button className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-white">
          <span>
            <LogOut size={20} strokeWidth={1.5} />
          </span>
          <span>Freelance Stuffsut</span>
        </button>
      </div>
    </aside>
  );
};

export { SideBar };

const pages = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} strokeWidth={1.8} />,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: <UserRound size={20} strokeWidth={1.8} />,
  },
  {
    title: "Resources",
    href: "/dashboard/resources",
    icon: <FileText size={20} strokeWidth={1.8} />,
  },
  {
    title: "Advertise",
    href: "/dashboard/advertise",
    icon: <CircleDollarSign size={20} strokeWidth={1.8} />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 size={20} strokeWidth={1.8} />,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: <HelpCircle size={20} strokeWidth={1.8} />,
  },
];
