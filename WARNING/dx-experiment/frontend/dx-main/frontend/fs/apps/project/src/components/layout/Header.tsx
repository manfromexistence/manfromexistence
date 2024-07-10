"use client";

import { cn } from "@/helpers";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SubmitModal from "../feedback/SubmitModal";
import { useState } from "react";
import { Search } from "lucide-react";
import MobileNav from "./MobileNav";
import { DataEntry, FeedBack } from "..";

export const Header = () => {
  const pathname = usePathname();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const params = useSearchParams().get("leaderboard");

  return (
    <header
      className={cn(
        "border-b",
        ["/signup", "/login", "/resource", "/dashboard"].includes(pathname) &&
          "hidden"
      )}
    >
      <nav className="flex items-center justify-between w-11/12 mx-auto py-3 max-md:hidden">
        <div>
          <Link href={"/"} className={cn("text-xl font-bold")}>
            Freelance Stuffs
          </Link>
        </div>
        <ul className="flex items-center justify-start ml-6 gap-4 max-md:hidden">
          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link href="/bookmarks">Bookmarks</Link>
          </li>
          <li>
            <Link href="/advertise">Advertise</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
        <div className="flex-1 flex items-center justify-center"></div>
        <ul className="flex items-center gap-4">
          <div className="relative max-md:hidden">
            <span className="absolute left-1 top-1/2 -translate-y-1/2 pointer-events-none text-[#00000093]">
              <Search size={18} color="#00000093" />
            </span>
            <DataEntry.Input
              type="text"
              placeholder="Search"
              className="pl-6 py-1"
            />
          </div>
          <Link
            href="/login"
            className="hover:bg-gray-100 rounded-full px-4 py-2 border max-md:hidden"
          >
            Login
          </Link>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="bg-black hover:bg-black/90 text-white rounded-full px-4 py-2 max-md:hidden"
          >
            Submit
          </button>
        </ul>
      </nav>
      <MobileNav />
      <SubmitModal
        show={showSubmitModal}
        setShowSubmitModal={setShowSubmitModal}
      />
      {params && <FeedBack.LeaderboardModal />}
    </header>
  );
};
