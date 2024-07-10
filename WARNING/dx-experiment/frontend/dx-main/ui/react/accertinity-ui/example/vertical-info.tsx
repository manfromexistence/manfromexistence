"use client"

import { motion } from "framer-motion";
import * as React from "react"

const VerticalInfo = () => {

  return (
    <section className="vertical_info relative h-[100vh] w-full max-w-[100%] overflow-y-auto overflow-x-hidden">
      <div className="vertical_info_main_container relative z-10 mx-auto mt-40 flex max-w-[1200px] flex-col items-center justify-center">
        <span>VerticalInfo</span>
      </div>
    </section>
  )
}

export default VerticalInfo;