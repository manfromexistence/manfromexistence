"use client";

import { cn } from "@/helpers";
import { AlertCircle, Edit, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ProfilePage = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <main className="md:w-[40%] w-11/12 mx-auto md:my-10 mt-4 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/discord.png"
            width={40}
            height={40}
            alt="user profile image"
            className="rounded-full"
          />
          <div>
            <h1 className="md:text-2xl text-xl font-bold">John doe</h1>
            <p className="md:text-sm text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link href="/profile/edit">
            <Twitter size={24} className="max-md:w-5 max-md:h-5" />
          </Link>
          <Link href="/profile/edit">
            <Edit size={24} className="max-md:w-5 max-md:h-5" />
          </Link>
        </div>
      </div>
      <div className="py-4">
        <div className="flex items-center gap-4 relative">
          <h3 className="font-semibold">Resources</h3>{" "}
          <button
            onMouseOver={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <AlertCircle size={18} />
          </button>
          {showTooltip && (
            <div className="bg-black/70 text-white p-2 text-sm rounded-md absolute left-0 -top-10">
              <p>Email to edit or delete resources</p>
            </div>
          )}
        </div>
        <div className="py-4">
          {resources.map((resource, index) => (
            <div key={index} className="pb-3">
              <div className="flex items-center gap-4">
                <Link
                  href="/profile/resources"
                  className=" font-semibold border-b-2"
                >
                  {resource.name}
                </Link>
                <span
                  className={cn(
                    "text-sm px-2 rounded-md",
                    resource.status === "Approved"
                      ? "bg-orange-200"
                      : resource.status === "Pending"
                      ? "bg-yellow-200"
                      : "bg-gray-300"
                  )}
                >
                  {resource.status}
                </span>
              </div>
              <p className="text-sm pt-1">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

const resources = [
  {
    name: "Resource 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quasi?",
    status: "Approved",
  },
  {
    name: "Resource 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quasi?",
    status: "Pending",
  },
  {
    name: "Resource 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quasi?",
    status: "Pending",
  },
  {
    name: "Resource 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quasi?",
    status: "Rejected",
  },
];
