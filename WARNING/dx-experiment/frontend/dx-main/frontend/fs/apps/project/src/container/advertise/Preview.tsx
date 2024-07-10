import { General } from "@/components";
import { ArrowUpRight, Bookmark } from "lucide-react";
import Image from "next/image";
import React from "react";

export const Preview = () => {
  return (
    <div className="grid md:grid-cols-2 pb-8">
      <General.AdvertiseHeading>Home page preview</General.AdvertiseHeading>
      <div>
        <General.AdvertiseParagraph>
          The newsletter is received every week by more than{" "}
          <b>10,300 people</b>, with an <b>average open rate of 55%</b> and{" "}
          <b>CTR of between 35 and 40%</b>.
        </General.AdvertiseParagraph>
        <div className="flex items-center justify-center md:gap-4 gap-2 md:mb-4 pb-2">
          <div className="w-full rounded-xl bg-gray-200 aspect-square" />
          <div className="w-full rounded-xl bg-gray-200 aspect-square" />
          <div className="w-full rounded-xl bg-gray-200 aspect-square relative overflow-hidden">
            <Image
              src="/feed.jpg"
              width={100}
              height={100}
              layout="responsive"
              className="aspect-square object-cover object-center md:p-12 md:pt-8 p-4"
              alt="Freelance Stuffs"
            />
            <div className="absolute inset-0 rounded-md">
              <span className="rounded-xl bg-white px-2 absolute right-2 top-2 text-xs">
                sponsor
              </span>
              <div className="absolute bottom-0 left-0 pb-2 px-2 w-full">
                <h4 className="text-lg font-semibold  text-start">title</h4>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 flex items-center ">
                    <span className="border text-xs rounded-full px-2 bg-white">
                      category
                    </span>
                  </div>
                  <div className="bg-white rounded-md">
                    <ArrowUpRight size={20} strokeWidth={1.4} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:gap-4 gap-2">
          <div className="w-full rounded-xl bg-gray-200 aspect-square" />
          <div className="w-full rounded-xl bg-gray-200 aspect-square" />
          <div className="w-full rounded-xl bg-gray-200 aspect-square" />
        </div>
      </div>
    </div>
  );
};
