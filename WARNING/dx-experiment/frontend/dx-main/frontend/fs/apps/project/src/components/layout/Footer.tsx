"use client";

import Link from "next/link";
import { cn } from "@/helpers";
import { usePathname } from "next/navigation";
import { DataEntry } from "..";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "pt-10",
        ["/signup", "/login", "/dashboard"].includes(pathname) && "hidden"
      )}
    >
      <div className="md:px-20 pb-10 flex justify-around max-md:flex-col px-4 max-md:gap-4">
        <div>
          <h3 className={cn("text-4xl font-bold pb-2")}>Freelance Stuffs</h3>
          <p className="mt-4">
            Subscribe to our newsletter to get our latest news.
          </p>
          <div className="mt-4 flex gap-4">
            <DataEntry.Input
              type="text"
              placeholder="Enter your email"
              className="w-3/4"
            />
            <button className="bg-black text-white rounded-full px-4 py-2">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex gap-28">
          <div className="">
            <h3 className=" font-bold">About us</h3>
            <ul className="mt-2">
              <li>
                <Link href="/">Our resources</Link>
              </li>
              <li>
                <Link href="/">About</Link>
              </li>
              <li>
                <Link href="/about">Contact</Link>
              </li>
              <li>
                <Link href="/about">Privacy policy</Link>
              </li>
              <li>
                <Link href="/about">Term & conditions</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="font-semibold">Follow us</h3>
            <ul className="mt-2">
              <li>
                <Link href="/">Twitter</Link>
              </li>
              <li>
                <Link href="/">Linkedin</Link>
              </li>
              <li>
                <Link href="/about">Telegram</Link>
              </li>
              <li>
                <Link href="/about">Github</Link>
              </li>
              <li>
                <Link href="/about">Reddit</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-12 py-4 flex items-center justify-center border-t">
        <p className="text-sm mt-4">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
