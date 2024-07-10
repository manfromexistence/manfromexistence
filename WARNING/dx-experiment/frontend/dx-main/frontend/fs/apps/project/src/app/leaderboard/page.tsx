import { DataDisplay } from "@/components";
import { Leaderboard } from "@/container";
import React from "react";

const page = () => {
  return (
    <main className="md:grid grid-cols-2 md:gap-16 md:w-11/12 mx-auto">
      <section>
        <div className="flex items-end justify-center gap-6 pb-8 pt-5">
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
        </div>
        <div className="grid grid-cols-2 md:gap-4 max-md:hidden">
          {feeds.map((resource, index) => (
            <DataDisplay.Card key={index} {...resource} />
          ))}
        </div>
      </section>
      <Leaderboard.LeaderboardList />
    </main>
  );
};

export default page;

const feeds = [
  {
    category: "article",
    title: "Lorem ipsum dolor sit amet.",
    type: "new",
    image: "/thumbnail.webp",
  },
  {
    category: "book",
    title: "Rework",
    type: "popular",
    image: "/cover.png",
  },
  {
    category: "tool",
    title: "Discord",
    type: "new",
    image: "/discord.png",
  },
  {
    category: "article",
    title: "Lorem ipsum dolor sit amet.",
    type: "article",
    image: "/vercel.svg",
  },
];
