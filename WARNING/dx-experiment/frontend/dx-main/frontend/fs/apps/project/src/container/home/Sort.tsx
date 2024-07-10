"use client";

import { cn } from "@/helpers";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SortDropdownProps {
  onChange: (value: string) => void;
  selectedKey: string;
}
export const SortDropdown = (props: SortDropdownProps) => {
  const { onChange, selectedKey } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(!isOpen);
  };

  const findOption = options.find((option) => option.value === selectedKey);

  return (
    <div className="flex justify-between gap-4 items-center relative">
      <button
        className="text-sm px-2 py-1 rounded-md hover:bg-gray-100 border flex items-center justify-between gap-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{findOption?.label}</span>
        <span>
          <ChevronDown size={18} />
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-12 z-50 left-0 w-32 rounded-md border bg-white divide-y-[1px] shadow-xl">
          {options.map((option) => (
            <button
              type="button"
              className={cn(
                "flex items-center p-2 text-sm hover:bg-[#F1F5F9] w-full",
                option.value === selectedKey ? "bg-[#F1F5F9]" : ""
              )}
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const options = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Featured",
    value: "featured",
  },
];
