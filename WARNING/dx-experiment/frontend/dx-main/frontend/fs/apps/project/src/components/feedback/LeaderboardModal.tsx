"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Leaderboard } from "@/container";

export const LeaderboardModal = () => {
  const router = useRouter();

  return (
    <div
      className="bg-white/70 fixed inset-0 w-full h-dvh z-50 backdrop-blur-sm"
      onClick={(e) =>
        e.target === e.currentTarget && router.push("?", { scroll: false })
      }
    >
      <div className="bg-white md:w-[40%] ml-auto  border mr-8 my-4 shadow-lg rounded-lg h-[calc(100%_-_2rem)] overflow-y-auto">
        <div className="flex items-center justify-between px-4">
          <h1 className="text-center py-4 text-base font-semibold">
            Leaderboard
          </h1>
          <button
            className="p-1 rounded-md border"
            onClick={() => router.push("?", { scroll: false })}
          >
            <X size={18} />
          </button>
        </div>
        <section className="flex items-end justify-center gap-6 pb-8 pt-5">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-300 hexagon"></div>
              <div className="absolute -bottom-1 inset-x-0 flex items-center justify-center">
                <span className="p-1 rounded-full bg-green-200 italic text-sm font-semibold w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </div>
            </div>
            <p className="font-semibold pt-2 text-sm">john doe</p>
            <p className="text-xs">60 PTS</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-300 hexagon"></div>
              <div className="absolute -bottom-1 inset-x-0 flex items-center justify-center">
                <span className="p-1 rounded-full bg-yellow-300 italic text-sm font-semibold w-6 h-6 flex items-center justify-center">
                  1
                </span>
              </div>
            </div>
            <p className="font-semibold pt-2 text-sm">john doe</p>
            <p className="text-xs">100 PTS</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-300 hexagon"></div>
              <div className="absolute -bottom-1 inset-x-0 flex items-center justify-center">
                <span className="p-1 rounded-full bg-blue-300 italic w-5 h-5 text-sm font-semibold flex items-center justify-center">
                  3
                </span>
              </div>
            </div>
            <p className="font-semibold pt-2">john doe</p>
            <p className="text-xs">50 PTS</p>
          </div>
        </section>
        <Leaderboard.LeaderboardList />
      </div>
    </div>
  );
};
