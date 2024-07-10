"use client";

import { DataDisplay, Layout } from "@/components";
import { SortDropdown } from "@/container/home/Sort";
import React from "react";

const BookmarkPage = () => {
  const [selectedSort, setSelectedSort] = React.useState("all");

  return (
    <main>
      {/* <div className="flex justify-center md:gap-4 gap-2 pt-8 flex-wrap">
        <SortDropdown
          selectedKey={selectedSort}
          onChange={(value) => setSelectedSort(value)}
        />
        {bookmarks
          .reduce((uniqueCategories, bookmark) => {
            if (!uniqueCategories.includes(bookmark.category)) {
              uniqueCategories.push(bookmark.category);
            }
            return uniqueCategories;
          }, [])
          .map((category, index) => (
            <button
              key={index}
              className="text-sm px-3 py-1 rounded-2xl hover:bg-gray-100 border relative pr-6"
            >
              <span>{category}</span>
              <span className="text-xs absolute top-1 right-2">
                {
                  bookmarks.filter((bookmark) => bookmark.category === category)
                    .length
                }
              </span>
            </button>
          ))}
      </div> */}
      <section className="md:w-5/6 mx-auto pt-10 w-11/12">
        <div className="grid md:grid-cols-3 grid-cols-2 md:gap-5 gap-2">
          {bookmarks.map((resource, index) => (
            <DataDisplay.Card key={index} {...resource} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default BookmarkPage;

const bookmarks = [
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
    category: "book",
    title: "The Lean Startup",
    type: "popular",
    image: "/cover.png",
  },
];
