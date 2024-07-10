"use client";

import { cn } from "@/helpers";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface FilterProps {
  categories: { name: string; value: string; count: number }[];
}

export const Filter = ({ categories }: FilterProps) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const handleShowMoreClick = () => {
    setShowAllCategories(true);
  };

  const handleCategoryClick = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleTagClick = (value: string) => {
    if (searchTags.includes(value)) {
      setSearchTags(searchTags.filter((category) => category !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleClearClick = () => {
    setSelectedCategories([]);
    setSearchInput("");
    setSearchTags([]);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      setSearchTags([...searchTags, searchInput.trim()]);
      setSearchInput("");
    }
  };

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 4);

  return (
    <div className="absolute md:top-2 z-50 -top-12 right-0 p-2 rounded-md border bg-white shadow-xl">
      <p className="pb-2 font-semibold">Categories</p>
      <div className="flex items-center gap-2 flex-wrap">
        {displayedCategories.map((filter, index) => (
          <button
            key={index}
            className={cn(
              "text-sm py-1 px-2 hover:bg-gray-100 rounded-lg border flex items-center justify-center gap-1",
              selectedCategories.includes(filter.value) && "bg-gray-200"
            )}
            onClick={() => handleCategoryClick(filter.value)}
          >
            <span>{filter.name}</span>
            {selectedCategories.includes(filter.value) && (
              <span className="text-xs ">
                <X size={14} />
              </span>
            )}
          </button>
        ))}
        {!showAllCategories && (
          <button className="text-sm py-1 px-2" onClick={handleShowMoreClick}>
            Show more
          </button>
        )}
      </div>
      <div>
        <p className="pt-4 pb-2 font-semibold">Tags</p>
        <div className="flex items-center gap-2 flex-wrap">
          {searchTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              className="text-sm py-1 px-2 hover:bg-gray-100 rounded-lg border flex items-center justify-center gap-1"
            >
              <span>{tag}</span>
              <span className="text-xs ">
                <X size={14} />
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 py-2 relative">
          <span className="absolute left-1 pointer-events-none top-1/2 -translate-y-1/2">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Add tags..."
            className="border rounded-md w-full p-2 focus:outline-none focus:border-gray-800 pl-6"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 pt-4">
        <button
          className="px-4 rounded-md py-1 border hover:bg-gray-200"
          onClick={handleClearClick}
        >
          Clear
        </button>
        <button className="px-4 rounded-md py-1 bg-black hover:bg-black/80 text-white">
          Apply
        </button>
      </div>
    </div>
  );
};
