"use client"

import * as React from "react"
import { motion } from "framer-motion";
import Image from "next/image"
import { AspectRatio } from "../ui";
import jsonData from '@/config/landing-page/more-info.json';


const MoreInfo = () => {

  return (
    <section className="more_info relative min-h-[100vh] w-full max-w-[100%] overflow-y-auto overflow-x-hidden border">
      <div className="info_main_container relative z-10 mx-auto flex h-[2900px] max-w-[1200px] flex-col items-center justify-center space-y-24">
        <div className="hardware relative flex h-auto w-full flex-row items-start justify-center space-x-3">
          <div className="more_info_image h-[800px] lg:w-[500px] border">
            <AspectRatio ratio={1 / 1} className="bg-muted h-[800px] w-[500px] rounded-lg">
              <Image
                src="/hardware.jpg"
                alt="best animated in the world"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <div className="h-full lg:w-[500px] flex flex-col items-start justify-center space-y-3">
            {Object.entries(jsonData.hardware).map(([key, value]) => (
              <p className="min-h-[250px] w-full border rounded-md p-3 text-start" key={key}> <span className="center rounded-full border p-3">{key}</span> {value}</p>
            ))}
          </div>

          <motion.div
            drag
            className="blurry_gradient_hardware absolute bottom-0 right-0 z-[0] h-[550px] w-[550px] rounded-full">
          </motion.div>
        </div>
        <div className="software relative flex h-auto w-full flex-row items-start justify-center space-x-3">
          <span className="more_info_description z-10 h-auto w-[500px] rounded-md border p-3 text-start">
            Software:Computer hardware is a collective term used to describe any of the physical components of an analog or digital computer.
            The term hardware distinguishes the tangible aspects of a computing device from software, which consists of written, machine-readable instructions
            or programs that tell physical components what to do and when to execute the instructions.
          </span>
          <div className="more_info_image h-[800px] w-[500px] border">
            <AspectRatio ratio={1 / 1} className="bg-muted h-[800px] w-[500px] rounded-lg">
              <Image
                src="/software.jpg"
                alt="best animated in the world"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>

          <motion.div
            drag
            className="blurry_gradient_software absolute bottom-0 left-0 z-[0] h-[550px] w-[550px] rounded-full">
          </motion.div>
        </div>
        <div className="cloud relative flex h-auto w-full flex-row items-start justify-center space-x-3">
          <div className="more_info_image h-[800px] w-[500px] border">
            <AspectRatio ratio={1 / 1} className="bg-muted h-[800px] w-[500px] rounded-lg">
              <Image
                src="/cloud.jpg"
                alt="best animated in the world"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <span className="more_info_description z-10 h-auto w-[500px] rounded-md border p-3 text-start">
            Cloud:Computer hardware is a collective term used to describe any of the physical components of an analog or digital computer.
            The term hardware distinguishes the tangible aspects of a computing device from software, which consists of written, machine-readable instructions
            or programs that tell physical components what to do and when to execute the instructions.
          </span>
          <motion.div
            drag
            className="blurry_gradient_cloud absolute bottom-0 right-0 z-[0] h-[550px] w-[550px] rounded-full">
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MoreInfo