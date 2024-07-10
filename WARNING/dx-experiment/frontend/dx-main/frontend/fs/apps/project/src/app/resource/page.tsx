"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/helpers";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home } from "@/container";

const Page = () => {
  const router = useRouter();

  return (
    <main className="">
      <button
        className="absolute md:top-4 top-2 md:left-4 left-2 bg-white rounded-full md:py-2 py-1 md:px-4 px-2 max-md:text-sm flex items-center justify-center gap-2 border group"
        onClick={() => router.back()}
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          <ArrowLeft size={20} className="max-md:w-4 max-md:h-4" />
        </span>
        <span>Go back</span>
      </button>
      <div className="absolute md:top-6 top-2 md:right-6 right-2 bg-white rounded-full md:py-1 px-2 border">
        <span className="md:text-sm text-xs">New</span>
      </div>
      <div className=" w-full  overflow-hidden flex items-center justify-center">
        <div className="flex items-center justify-center aspect-video md:w-1/2 md:py-5">
          <Image
            src="/thumbnail.webp"
            alt="hero"
            layout="responsive"
            width={100}
            height={100}
            className="aspect-video object-scale-down object-center "
          />
        </div>
      </div>
      <section className="bg-[#00242a] lg:px-16 px-4 py-10">
        <div className="flex items-center justify-between md:gap-8 lg:gap-0 pb-12 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Category:</span>
            <div className="flex items-center justify-between gap-2">
              <Link href={"/"} className="text-white text-sm underline">
                Tools
              </Link>
            </div>
          </div>
          <Link
            href={"/"}
            className="text-black md:text-sm text-xs px-2 py-1 underline flex items-center gap-2 bg-gray-100 rounded-full md:hidden"
          >
            <span className="text-black">Visit tool</span>
            <span>
              <ArrowUpRight size={18} className="max-md:w-4 max-md:h-4" />
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Tags:</span>
            <div className="flex items-center justify-between gap-2">
              <Link href={"/"} className="text-white text-sm underline">
                productivity,
              </Link>
              <Link href={"/"} className="text-white text-sm underline">
                startup,
              </Link>
              <Link href={"/"} className="text-white text-sm underline">
                marketing
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Submitted by:</span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-white font-bold">@John</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Posted at:</span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-white text-sm">12 february 2022</span>
            </div>
          </div>
          <Link
            href={"/"}
            className="text-black text-sm px-2 py-1 underline flex items-center gap-2 bg-gray-100 rounded-full max-md:hidden"
          >
            <span className="text-black">Visit tool</span>
            <span className=" ">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className={cn("text-white text-4xl")}>Notion</h1>
          <p className="text-white md:pr-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            explicabo? Dolore cumque, reprehenderit explicabo dolorum facilis
            corrupti, officia alias fugiat delectus dolorem temporibus officiis
            quisquam necessitatibus, placeat hic unde mollitia?
          </p>
        </div>
      </section>
      <div className="py-8">
        <h3 className="text-2xl  font-semibold w-5/6 mx-auto max-md:w-11/12">
          More like this
        </h3>
        <Home.Feed />
      </div>
    </main>
  );
};

export default Page;
