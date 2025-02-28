"use client"

import * as React from "react"
import * as Portal from '@radix-ui/react-portal'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, BookOpen, Calculator, TestTube, Dna, Laptop, Languages, BookText, Info, Binary, BookMarked, Beaker, FlaskConical, Microscope, CircleDot, ScrollText, PenTool, GraduationCap } from "lucide-react"
import { forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const SunFilled: LucideIcon = forwardRef(({ 
  size = 24, 
  color = 'currentColor', 
  strokeWidth = 2,
  ...props 
}, ref) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 2h2v5h-2zm6.688 6.9l3.506-3.506l1.414 1.414l-3.506 3.506zM25 15h5v2h-5zm-3.312 8.1l1.414-1.413l3.506 3.506l-1.414 1.414zM15 25h2v5h-2zm-9.606.192L8.9 21.686l1.414 1.414l-3.505 3.506zM2 15h5v2H2zm3.395-8.192l1.414-1.414L10.315 8.9L8.9 10.314zM16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6" />
    </svg>
  )
})

SunFilled.displayName = 'SunFilled'

export default function BoringStudyCards({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) {
  // Initialize state with useMemo to avoid recreating the object on every render
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => ({
    higher_mathamethics_1st_paper: false,
    higher_mathamethics_2nd_paper: false,
    physics_1st_paper: false,
    physics_2nd_paper: false,
    chemistry_1st_paper: false,
    chemistry_2nd_paper: false,
    biology_1st_paper: false,
    biology_2nd_paper: false,
    ict: false,
    bangla_1st_paper: false,
    bangla_2nd_paper: false,
    english_1st_paper: false,
    english_2nd_paper: false,
  }));

  // Use useEffect to handle initial progress update
  React.useEffect(() => {
    const totalSubjects = Object.keys(completed).length;
    const completedSubjects = Object.values(completed).filter(Boolean).length;
    const progress = Math.round((completedSubjects / totalSubjects) * 100);
    onProgressUpdate(progress);
  }, []); // Run only once on mount

  const subjects = [
    {
      id: "higher_mathamethics_1st_paper",
      name: "Higher Math (1st Paper)",
      time: "Morning - Monday, Wednesday, Friday",
      duration: "1.5 hours",
      icon: Calculator,
    },
    {
      id: "higher_mathamethics_2nd_paper",
      name: "Higher Math (2nd Paper)",
      time: "Morning - Tuesday, Thursday, Saturday",
      duration: "1.5 hours",
      icon: Binary,
    },
    {
      id: "physics_1st_paper",
      name: "Physics (1st Paper)",
      time: "Late Morning - Monday, Wednesday, Friday",
      duration: "1.5 hours",
      icon: BookOpen,
    },
    {
      id: "physics_2nd_paper",
      name: "Physics (2nd Paper)",
      time: "Late Morning - Tuesday, Thursday, Saturday",
      duration: "1.5 hours",
      icon: BookMarked,
    },
    {
      id: "chemistry_1st_paper",
      name: "Chemistry (1st Paper)",
      time: "Afternoon - Monday, Thursday",
      duration: "1 hour",
      icon: Beaker,
    },
    {
      id: "chemistry_2nd_paper",
      name: "Chemistry (2nd Paper)",
      time: "Afternoon - Tuesday, Friday",
      duration: "1 hour",
      icon: FlaskConical,
    },
    {
      id: "biology_1st_paper",
      name: "Biology (1st Paper)",
      time: "Evening - Monday, Thursday",
      duration: "1 hour",
      icon: Microscope,
    },
    {
      id: "biology_2nd_paper",
      name: "Biology (2nd Paper)",
      time: "Evening - Tuesday, Friday",
      duration: "1 hour",
      icon: CircleDot,
    },
    {
      id: "ict",
      name: "ICT",
      time: "Late Morning - Wednesday, Saturday",
      duration: "1 hour",
      icon: Laptop,
    },
    {
      id: "bangla_1st_paper",
      name: "Bangla (1st Paper)",
      time: "Night - Monday, Thursday",
      duration: "45 minutes",
      icon: ScrollText,
    },
    {
      id: "bangla_2nd_paper",
      name: "Bangla (2nd Paper)",
      time: "Night - Tuesday, Friday",
      duration: "45 minutes",
      icon: PenTool,
    },
    {
      id: "english_1st_paper",
      name: "English (1st Paper)",
      time: "Night - Wednesday",
      duration: "45 minutes",
      icon: Languages,
    },
    {
      id: "english_2nd_paper",
      name: "English (2nd Paper)",
      time: "Night - Saturday",
      duration: "45 minutes",
      icon: GraduationCap,
    },
  ]

  const handleCardClick = (id: string) => {
    setCompleted((prev) => {
      const newCompleted = {
        ...prev,
        [id]: !prev[id],
      }
      
      // Calculate progress
      const totalPrayers = Object.keys(newCompleted).length
      const completedPrayers = Object.values(newCompleted).filter(Boolean).length
      const progress = Math.round((completedPrayers / totalPrayers) * 100)
      
      // Update progress through callback
      onProgressUpdate(progress)
      
      return newCompleted
    })
  }

  return (
    <div className="w-full mt-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {subjects.map((subject) => {
          const Icon = subject.icon
          return (
            <Card
              key={subject.id}
              className={`group relative transition-all duration-300 ease-in-out 
                          hover:scale-105 hover:shadow-lg cursor-pointer bg-background h-[180px]
                          ${completed[subject.id] ? "bg-primary-foreground" : ""}`}
              onClick={() => handleCardClick(subject.id)}
            >
              <div className="relative p-5">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`h-12 w-12 rounded-full transition-colors duration-300
                                  flex items-center justify-center bg-secondary
                                `}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div
                    className={`h-12 w-12 transition-colors duration-300
                                    flex items-start justify-end
                        }`}
                  >
                    <Checkbox
                      id={subject.id}
                      checked={completed[subject.id]}
                      onCheckedChange={() => { }}
                      className="h-6 w-6 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-primary">
                    {subject.name}
                  </h3>
                <div className="gap-1 flex items-center">
                    
                  <p className="text-sm text-muted-foreground mb-2 truncate max-w-[80%]">
                    {subject.time}
                  </p>
                  <div className="mb-1">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                      </HoverCardTrigger>
                      <Portal.Root>
                        <HoverCardContent 
                          className="w-auto p-2 bg-popover text-popover-foreground shadow-md rounded-md relative z-[9999]" 
                        >
                          <p className="text-sm whitespace-nowrap">{subject.time}</p>
                        </HoverCardContent>
                      </Portal.Root>
                    </HoverCard>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1 inline-block" />
                  <span>{subject.duration}</span>
                  </div>                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}