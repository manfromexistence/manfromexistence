import NavLink from "@/ui/layout/settings-nav-link";
import { MaxWidthWrapper } from "@dub/ui";
import { ReactNode } from "react";

export default function SettingsLayout({
  tabs,
  children,
}: {
  tabs: {
    name: string;
    segment: string | null;
  }[];
  children: ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-16px)] bg-white">
      <div className="flex h-36 items-center border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-600">Settings</h1>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="grid items-start gap-5 py-10 lg:grid-cols-5">
        <div className="top-36 flex gap-1 lg:sticky lg:grid">
          {tabs.map(({ name, segment }) => (
            <NavLink segment={segment}>{name}</NavLink>
          ))}
        </div>
        <div className="grid gap-5 lg:col-span-4">{children}</div>
      </MaxWidthWrapper>
    </div>
  );
}
