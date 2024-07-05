"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/shared/mode-toggle";
import { NavDropdown } from "@/components/shared/nav-dropdown";
import NavLinks from "@/components/shared/nav-links";
import VVLogo from "@/components/shared/vv-logo";
import Link from "next/link";
import { motion } from "framer-motion";
import NavSheet from "./nav-sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Call handleScroll on initial render
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`navbar h-20 sticky top-0 z-[100000000000000] transition-all duration-200 flex items-center justify-start lg:px-[2%] px-12 !w-full ${
        isScrolled ? "bg-background/80 backdrop-blur-2xl border-b" : "border-b"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.25 }}
    >
      <nav
        className="flex flex-1 items-center justify-between p-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12 z-50">
          <VVLogo />
          <div className="hidden lg:flex lg:gap-x-12">
            <NavLinks />
          </div>
        </div>
        <div className="flex lg:hidden z-50">
          <NavDropdown />
          <NavSheet />
        </div>
        <div className="hidden lg:flex space-x-1 z-50">
          <Link
            href="https://www.twitter.com/abdo_eth"
            rel="noreferrer"
            target="_blank"
          >
            <Button className="flex items-center" variant="ghost" size="icon">
              <TwitterLogoIcon className="h-4 w-4" />
            </Button>
          </Link>
          {/* <Link
            href="https://www.github.com/chrisabdo/motionvariants"
            rel="noreferrer"
            target="_blank"
          >
            <Button className="flex items-center" variant="ghost" size="icon">
              <GitHubLogoIcon className="h-4 w-4" />
            </Button>
          </Link> */}
          <ModeToggle />
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full max-h-[25px] max-w-[25px] border mt-2 ring-offset-background ring-2  ring-ring ring-offset-2">
              <Image
                alt="User"
                className="aspect-square rounded-full object-cover"
                height="23"
                src="/Ustudy.jpg"
                width="23"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px] !z-[10000000000000000000000000000000000000000000000000000000000000000000]">
            <DropdownMenuLabel>Ustudy</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Switch Account</DropdownMenuItem>
            <DropdownMenuItem>View Database</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </nav>
    </motion.header>
  );
}
