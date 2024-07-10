"use client";

import { cn } from "@/helpers";
import { Search, X } from "lucide-react";
import Link from "next/link";
import SubmitModal from "../feedback/SubmitModal";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const MobileNav = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showSearch) {
      inputRef.current && inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <div className="md:hidden relative">
      <div className="flex items-center justify-between z-50 py-2 w-11/12 mx-auto ">
        <div
          className={cn(
            "flex items-center justify-between",
            showSearch && "hidden"
          )}
        >
          <Link
            href={"/"}
            className="text-xl font-bold"
            onClick={() => setShowMobileNav(false)}
          >
            Freelance Stuffs
          </Link>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-4",
            showSearch && "w-full"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center overflow-hidden flex-1",
              showMobileNav && "hidden"
            )}
          >
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={cn(
                "transition-transform",
                showSearch ? "translate-x-0" : "translate-x-full"
              )}
            >
              <Search size={20} />
            </button>
            <input
              type="text"
              ref={inputRef}
              placeholder="Search"
              className={cn(
                "border rounded-full px-2 py-0.5 ml-2 transition-transform",
                showSearch ? "translate-x-0 w-full" : "translate-x-full w-0"
              )}
            />
          </div>
          <button
            onClick={() => {
              showSearch
                ? setShowSearch(false)
                : setShowMobileNav(!showMobileNav);
            }}
            className="max-md:z-[55]"
          >
            <div className="transition-transform">
              <div
                className={cn(
                  "w-4 h-0.5 rounded-md mb-1 bg-black transition-transform ",
                  (showMobileNav || showSearch) && "rotate-45 translate-y-[3px]"
                )}
              />
              <div
                className={cn(
                  "w-4 h-0.5 rounded-md mb-1 bg-black transition-transform",
                  (showMobileNav || showSearch) && "hidden"
                )}
              />
              <div
                className={cn(
                  "w-4 h-0.5 rounded-md bg-black transition-transform",
                  (showMobileNav || showSearch) &&
                    "-rotate-45 translate-y-[-3px]"
                )}
              />
            </div>
          </button>
        </div>
      </div>
      <div
        className={cn(
          "bg-white z-50 pt-4 pb-20 px-4 transition-transform flex flex-col left-0 w-full h-[calc(100dvh_-_2rem)] border-b border-gray-200 overflow-hidden",
          showMobileNav ? "absolute" : "hidden"
        )}
      >
        <div className="flex flex-col">
          <Link
            className="py-3 px-2 hover:bg-gray-100"
            onClick={() => setShowMobileNav(false)}
            href="/leaderboard"
          >
            Leaderboard
          </Link>

          <Link
            className="py-3 px-2 hover:bg-gray-100"
            onClick={() => setShowMobileNav(false)}
            href="/bookmarks"
          >
            Bookmarks
          </Link>

          <Link
            className="py-3 px-2 hover:bg-gray-100"
            onClick={() => setShowMobileNav(false)}
            href="/advertise"
          >
            Advertise
          </Link>

          <Link
            className="py-3 px-2 hover:bg-gray-100"
            onClick={() => setShowMobileNav(false)}
            href="/about"
          >
            About
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4 flex-col mt-auto">
          <Link
            href="/login"
            onClick={() => setShowMobileNav(false)}
            className="hover:bg-gray-100 rounded-md px-4 py-2 border w-full text-center"
          >
            Login
          </Link>
          <button
            onClick={() => {
              setShowMobileNav(false), setShowSubmitModal(true);
            }}
            className="bg-black hover:bg-black/90 text-white rounded-md px-4 py-2 w-full"
          >
            Submit
          </button>
        </div>
      </div>
      <SubmitModal
        show={showSubmitModal}
        setShowSubmitModal={setShowSubmitModal}
      />
    </div>
  );
};

export default MobileNav;
