"use client"

import React, { useEffect, useMemo, useState } from "react";
import { useCalendar } from "@/contexts/PlannerContext";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { DateRangePicker } from "./date-range-picker";
import { DateRange } from "react-day-picker";
import { endOfDay, endOfWeek, startOfWeek } from "date-fns";
import { useData } from "@/contexts/PlannerDataContext";
import AddAppointmentDialog from "./AddAppointmentDialog";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { wrap } from "@motionone/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface CalendarToolbarProps extends React.HTMLAttributes<HTMLDivElement> { }

// export function TypingEffect() {
//   const text = "Plan Your Time.";
//   const [displayedText, setDisplayedText] = React.useState("");
//   const [i, setI] = React.useState(0);

//   React.useEffect(() => {
//     const typingEffect = setInterval(() => {
//       if (i < text.length) {
//         setDisplayedText((prevState) => prevState + text.charAt(i));
//         setI(i + 1);
//       } else {
//         clearInterval(typingEffect);
//       }
//     }, 200);

//     return () => {
//       clearInterval(typingEffect);
//     };
//   }, [i]);

//   return (
//     <h1 className="text-center font-display text-md font-bold tracking-[-0.02em] drop-shadow-sm md:text-4xl md:leading-[5rem]">
//       {displayedText ? displayedText : "Plan Your Time."}
//     </h1>
//   );
// }
export function RotateText() {
  const words = ["Plan your time", "To maximize your productivity."];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={words[index]}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]"
      >
        {words[index]}
      </motion.h1>
    </AnimatePresence>
  );
}
const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  className,
  ...props
}) => {
  const { setDateRange } = useCalendar();
  const { addResource, addAppointment } = useData();

  const [range, setRange] = useState<DateRange>({
    from: startOfWeek(new Date(), {
      locale: { options: { weekStartsOn: 1 } },
    }),
    to: endOfWeek(new Date()),
  });
  const handleDateRangeUpdate = (range: DateRange) => {
    const from = range.from;
    const to = range.to ?? endOfDay(range.from as Date);
    setDateRange({
      from: from,
      to: to
    });
  };
  useEffect(() => {
    setDateRange(range);
  }, [range]);

  return (
    <div
      className={cn("flex items-center justify-end space-x-2", className)}
      {...props}
    >
      {/* <RotateText /> */}
      <span className="text-center font-display text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">Plan Your Time!</span>
      <div className="flex-1"></div>
      <AddAppointmentDialog />
      <DateRangePicker
        onUpdate={(value) => handleDateRangeUpdate(value.range)}
        initialDateFrom={range.from}
        initialDateTo={range.to}
        align="start"
        showCompare={false}
      />
    </div>
  );
};

export default React.memo(CalendarToolbar);
