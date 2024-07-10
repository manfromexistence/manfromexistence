"use client";

import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProps {
  image: string;
  type: string;
  title: string;
  category: string;
}

const Card = ({ image, category, title, type }: CardProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/resource")}
      className="relative hover:shadow-xl md:hover:-translate-y-1 transition-transform border rounded-xl overflow-hidden"
    >
      <span className="rounded-xl text-right bg-gray-100 px-2 md:py-1 text-xs absolute md:top-2 top-1 md:right-2 right-1">
        {type}
      </span>
      <div className="h-5" />
      <div className="flex justify-center aspect-video p-2">
        <Image
          src={image}
          alt="placeholder"
          width={200}
          height={200}
          className="object-scale-down"
        />
      </div>
      <div className="md:pb-5 md:px-5 px-2 pb-2 w-full">
        <h3 className=" max-md:text-sm md:font-medium pb-1 text-start">
          {title}
        </h3>

        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 flex items-center ">
            <span className="border text-sm rounded-full  px-2 bg-white">
              {category}
            </span>
          </div>
          <div>
            <Bookmark size={20} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default Card;
