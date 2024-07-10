"use client";

import { DataEntry } from "@/components";

export const Hero = () => {
  return (
    <section className="md:w-1/2 mx-auto flex flex-col items-center justify-center pt-20 w-11/12">
      <h1 className="md:text-5xl text-4xl font-bold  text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </h1>
      <p className="text-center md:px-20 py-4 max-md:text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus totam
        vero aliquam ipsa assumenda sequi labore odit, quibusdam consequuntur
        libero?
      </p>
      <div className="pt-8 md:pb-28 pb-16 md:w-4/5 flex items-center md:gap-6 gap-2">
        <DataEntry.Input
          type="email"
          placeholder="Subscribe to our newsletter"
          className="w-full"
        />

        <button className="border md:px-8 px-4 py-2 rounded-full bg-black hover:bg-black/90 text-white">
          Subscribe
        </button>
      </div>
    </section>
  );
};
