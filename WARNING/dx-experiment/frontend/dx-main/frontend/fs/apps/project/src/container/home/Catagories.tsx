"use client";

import { ListFilter, X } from "lucide-react";
import React from "react";
import { Filter } from ".";
import { SortDropdown } from "./Sort";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/helpers";

const Catagories = () => {
  const [selectedSort, setSelectedSort] = React.useState("all");
  const [openFilter, setOpenFilter] = React.useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const router = useRouter();

  return (
    <div className="md:w-5/6 mx-auto w-11/12">
      <div className="flex items-center justify-center max-md:justify-between md:gap-8 gap-4 max-md:flex-wrap">
        <SortDropdown
          selectedKey={selectedSort}
          onChange={(value) => setSelectedSort(value)}
        />
        <div className="flex gap-2 overflow-x-auto horizontal-scroll max-md:order-3 max-md:pb-2">
          {catagories.map((filter) => (
            <button
              key={filter.value}
              onClick={() =>
                router.push(`?category=${filter.value}`, { scroll: false })
              }
              className={cn(
                "text-sm px-3 py-1 rounded-3xl hover:bg-gray-100 border relative pr-8",
                category === filter.value && "bg-gray-100"
              )}
            >
              <span>{filter.name}</span>
              <span className="text-xs absolute top-1 right-2">
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <button
          className="px-4 py-1 rounded-md hover:bg-gray-200 border flex items-center gap-2 text-sm"
          onClick={() => setOpenFilter((prev) => !prev)}
        >
          <span>{openFilter ? <X size={18} /> : <ListFilter size={18} />}</span>
          <span>Filter</span>
        </button>
      </div>

      {openFilter && (
        <div className="relative md:w-1/3 w-full ml-auto">
          <Filter categories={catagories} />
        </div>
      )}
    </div>
  );
};

export default Catagories;

const catagories = [
  {
    name: "Articles",
    value: "articles",
    count: 100,
  },
  {
    name: "Books",
    value: "books",
    count: 40,
  },
  {
    name: "Communities",
    value: "communities",
    count: 20,
  },
  {
    name: "Podcasts",
    value: "podcasts",
    count: 50,
  },
  {
    name: "Videos",
    value: "videos",
    count: 200,
  },
  {
    name: "Tools",
    value: "tools",
    count: 70,
  },
  {
    name: "Tweets",
    value: "tweets",
    count: 300,
  },
];
