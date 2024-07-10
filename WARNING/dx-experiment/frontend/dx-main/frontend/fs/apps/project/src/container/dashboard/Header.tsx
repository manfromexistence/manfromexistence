import { DataEntry } from "@/components";
import { Bell, ChevronsUpDown, Mail, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

export const DashboardHeader = () => {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-b">
      <div className="relative">
        <span className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none">
          <Search size={20} color="#00000090" strokeWidth={1.5} />
        </span>
        <DataEntry.Input
          type="text"
          placeholder="Search"
          className="pl-8 border-none bg-gray-100"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100">
          <Mail size={20} strokeWidth={1.5} />
        </button>
        <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100">
          <Bell size={20} strokeWidth={1.5} />
        </button>
        <div className="flex items-center justify-between px-2 rounded-xl gap-8">
          <div className="flex items-center justify-between gap-2">
            <div className="aspect-square rounded-full bg-gray-100">
              <Image
                src="/discord.png"
                alt="avatar"
                width={30}
                height={30}
                className="rounded-full aspect-square"
              />
            </div>
            <div>
              <h2 className="font-bold leading-none">John Doe</h2>
              <p className="text-sm leading-none">Admin</p>
            </div>
          </div>

          <button className="">
            <ChevronsUpDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
