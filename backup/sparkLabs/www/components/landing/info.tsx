"use client";

// import {
//   FADE_DOWN_ANIMATION_VARIANTS,
//   FADE_UP_ANIMATION_VARIANTS,
// } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import React from "react";
// import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { HeartFilledIcon } from "@radix-ui/react-icons";

const features = [
  {
    name: "Interactive Learning",
    description:
      "Sparks Lab provides an interactive learning environment where students can learn Scratch programming by doing. Our visually intuitive editor makes coding fun and engaging.",
    icon: HeartFilledIcon,
  },
  {
    name: "Guided Instruction",
    description:
      "Our experienced instructors guide students through each concept, ensuring they understand the fundamentals before moving on to more complex topics.",
    icon: HeartFilledIcon,
  },
  {
    name: "Creative Exploration",
    description:
      "Sparks Lab encourages students to explore their creativity. With Scratch, they can create their own stories, games, and animations, bringing their ideas to life.",
    icon: HeartFilledIcon,
  },
  {
    name: "Collaborative Environment",
    description:
      "Sparks Lab fosters a collaborative environment where students can share their projects, get feedback, and learn from each other.",
    icon: HeartFilledIcon,
  },
  {
    name: "Real-World Application",
    description:
      "At Sparks Lab, we emphasize the real-world application of coding skills. Students learn how coding can be used to solve problems and make a difference in the world.",
    icon: HeartFilledIcon,
  },
  {
    name: "Accessible Anywhere",
    description:
      "Sparks Lab is accessible on any device, allowing students to learn and create wherever they are.",
    icon: HeartFilledIcon,
  },
];


export default function Info() {
  //   const { ref: refBottom, inView: inViewBottom } = useInView({
  //     triggerOnce: false,
  //   });
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="overflow-hidden py-1 sm:py-32 mt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
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
                  A Visual Programming Workshop
                </motion.p>
                <motion.p
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="mt-6 text-lg leading-8 "
                >
                  Learn Scratch programming in an interactive and engaging environment. Bring your ideas to life with our visually intuitive editor.
                </motion.p>

                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                  {features.map((feature) => (
                    <motion.div
                      key={feature.name}
                      variants={FADE_DOWN_ANIMATION_VARIANTS}
                      className="relative pl-9"
                    >
                      <dt className="inline font-semibold">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </motion.div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3">
            <Image
              src="/spark-labs-profile.png"
              alt="Sparks Lab screenshot"
              className="!min-w-full !max-w-[350px] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-auto md:-ml-4 lg:-ml-0 !max-h-[300px]"
              width={300}
              height={200}
            />
            <Image
              src="/spark-labs-editor.png"
              alt="Sparks Lab screenshot"
              className="!min-w-full  !max-w-[350px] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-auto md:-ml-4 lg:-ml-0 !max-h-[300px]"
              width={300}
              height={300}
            />
            <Image
              src="/spark-labs-submissions.png"
              alt="Sparks Lab screenshot"
              className="!min-w-full !max-w-[350px] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-auto md:-ml-4 lg:-ml-0 !max-h-[300px]"
              width={300}
              height={300}
            />

          </div>

        </div>
      </div>
    </div>

  );
}
