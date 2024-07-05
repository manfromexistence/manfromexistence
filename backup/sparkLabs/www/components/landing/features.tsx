"use client";

import { motion, useInView } from "framer-motion";
import React from "react";
// import { useInView } from "react-intersection-observer";

export default function Features() {
  //   const { ref: refAbout, inView: inViewAbout } = useInView({
  //     triggerOnce: false,
  //   });
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      viewport={{ once: false }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className="mx-auto mt-2 max-w-7xl px-6 sm:mt-2 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-base font-semibold leading-7 text-muted-foreground"
          >
            Ignite Creativity with Sparks Lab
          </motion.h2>
          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            A Visual Programming Workshop for Future Innovators
          </motion.p>
          <motion.p
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-6 text-lg leading-8"
          >
            Learn Scratch programming in an interactive and engaging environment. Bring your ideas to life with our visually intuitive editor.
          </motion.p>
        </div>
      </div>
    </motion.div>

  );
}
