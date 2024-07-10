import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp-effect";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        OverWellmed with <br /> all of new (new) trends?
      </motion.h1>
      <h2 className="text-muted-foreground text-3xl">Use DX to stay up to data with all of these so called new Technologies.</h2>
    </LampContainer>
  );
}
