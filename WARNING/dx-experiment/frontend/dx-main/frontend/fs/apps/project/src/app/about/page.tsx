import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="md:pt-10 py-4">
      <h1 className="md:text-6xl text-5xl flex items-center justify-center flex-col relative before:bg-[url('/anim-true.svg')] before:h-1 before:my-12 before:w-1/2 after:bg-[url('/anim-true.svg')] after:h-1 after:my-12 after:w-1/2">
        <span className="font-bold max-md:text-center">
          IT’S NOT FOR EVERYONE,
        </span>{" "}
        <span className="outline-text"> IT’S FOR YOU.</span>
      </h1>
      <div className="md:w-[60%] w-11/12 mx-auto py-10">
        <p
          className="md:first-letter:text-9xl first-letter:text-5xl first-letter:font-bold
  first-letter:mr-3 first-letter:float-left first-letter:border first-letter:border-solid first-letter:border-black first-letter:px-4 first-letter:py-2 first-letter:outline-text"
        >
          The Outline is a new kind of publication founded by journalists and
          storytellers. We want to help you understand the world better, feed
          your curiosity, challenge your assumptions, and show you something
          new.
        </p>
        <p className="pt-5">
          We’re dedicated to telling the right stories for right now, and our
          coverage is focused on the increasingly complex confluence of culture,
          power, and technology
        </p>
      </div>
      <div className="flex items-center justify-center md:py-10 flex-col">
        <div className="md:px-4 px-2 md:py-3 py-1 bg-black text-white md:text-2xl text-xl uppercase">
          Contact us
        </div>
        <div className="md:pt-16 pt-10">
          <div className="">
            <Link
              href="mailto:hello@mail.com"
              className="flex items-center justify-center md:text-6xl text-5xl"
            >
              hello@mail.com
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10">
            <Link href={"/"}>
              <Twitter size={24} />
            </Link>
            <Link href={"/"}>
              <Instagram size={24} />
            </Link>
            <Link href={"/"}>
              <Linkedin size={24} />
            </Link>
          </div>
          <div className="py-4 flex items-center justify-center">
            <p className="text-center">
              Interested in advertising with us? —{" "}
              <Link href={"mailto:ads@mail.com"} className="border-b-2">
                ads@theoutline.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
