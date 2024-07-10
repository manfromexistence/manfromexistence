"use client"

import { ChevronUp } from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";

const Whitelistbar = () => {

  return (
    <div className="fixed bottom-0 left-[50%] z-30 h-12 w-[650px] max-w-[90%] translate-x-[-50%]">
      <div className="blurry_gradient_whitelistbar absolute left-0 top-0 h-[550px] w-[550px] rounded-full"></div>
      <motion.div
        whileHover={{ scale: 0.95 }} whileTap={{ scale: 0.8 }}
        className="whitelistbar relative mt-1.5 flex flex-row items-center justify-between rounded-tl-2xl rounded-tr-xl px-3 py-1">
        <div className="waitlist_onboarding">Join Waitlist</div>
        <div className="waitlist_preferences flex flex-row items-center justify-center space-x-3">
          <span className="event_date">01/02/2024</span>
          <span className="event_date rounded-md border px-3 py-1">Subscribe</span>
          <div className="flex items-center justify-center rounded-full border p-1">
            <ChevronUp />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Whitelistbar