"use client";

import { DataDisplay } from "@/components";
import { useSearchParams } from "next/navigation";
import React from "react";

const Feed = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <section className="md:w-5/6 mx-auto md:pt-10 pt-5 w-11/12">
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-5 gap-2">
        {feeds.map((resource, index) => (
          <DataDisplay.Card key={index} {...resource} />
        ))}
      </div>
      <div className="flex items-center justify-center py-5">
        <button className="bg-gray-100 rounded-full py-2 px-4 text-black text-center hover:bg-gray-200">
          Load more
        </button>
      </div>
    </section>
  );
};

export default Feed;

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
  {
    category: "article",
    title: "Lorem ipsum dolor sit amet.",
    type: "article",
    image: "/vercel.svg",
  },
  {
    category: "article",
    title: "Lorem ipsum dolor sit amet.",
    type: "article",
    image: "/vercel.svg",
  },
  {
    category: "article",
    title: "Lorem ipsum dolor sit amet.",
    type: "article",
    image: "/vercel.svg",
  },
  {
    category: "article",
    title: "Lorem ipsum dolor sit amet.",
    type: "article",
    image: "/vercel.svg",
  },
  {
    category: "article",
    title: "Lorem ipsum dolor sit amet.",
    type: "article",
    image: "/vercel.svg",
  },
];
