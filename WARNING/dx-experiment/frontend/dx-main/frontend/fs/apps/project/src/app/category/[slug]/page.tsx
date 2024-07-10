import { DataDisplay } from "@/components";
import { cn } from "@/helpers";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <main className="py-10 md:w-5/6 w-11/12 mx-auto">
      <h1 className={cn("text-7xl text-center")}>{params.slug}</h1>
      <p className="text-center text-gray-800 text-xl md:w-3/4 mx-auto py-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus quia
        quod repellendus quasi autem aliquam sed odio! Ab, recusandae eaque
        atque laborum maxime pariatur, excepturi fugiat tenetur quaerat
        voluptatem deleniti!
      </p>
      <section className="md:w-5/6 mx-auto pt-10">
        <div className="grid md:grid-cols-3 grid-cols-2 md:gap-5 gap-2">
          {feeds.map((resource, index) => (
            <DataDisplay.Card key={index} {...resource} />
          ))}
        </div>
      </section>
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
