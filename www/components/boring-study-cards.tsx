"use client"

import * as React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Sun, Sunrise, Sunset, Moon } from "lucide-react"
import { forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'

export const SunFilled: LucideIcon = forwardRef(({ 
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
  const [completed, setCompleted] = useState<Record<string, boolean>>({
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
  })

  const prayers = [
    {
      id: "fajr",
      name: "Fajr",
      time: "Dawn, before sunrise",
      duration: "Minimum 2 minutes",
      icon: Sunrise,
    },
    {
      id: "dhuhr",
      name: "Dhuhr",
      time: "After sun's zenith",
      duration: "Minimum 4 minutes",
      icon: SunFilled,
    },
    {
      id: "asr",
      name: "Asr",
      time: "Midway between noon and sunset",
      duration: "Minimum 4 minutes",
      icon: Sun,
    },
    {
      id: "maghrib",
      name: "Maghrib",
      time: "Just after sunset",
      duration: "Minimum 3 minutes",
      icon: Sunset,
    },
    {
      id: "isha",
      name: "Isha",
      time: "After twilight disappears",
      duration: "Minimum 4 minutes",
      icon: Moon,
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
      <div className="flex flex-wrap gap-4 justify-start ">
        {prayers.map((prayer) => {
          const Icon = prayer.icon
          return (
            <Card
              key={prayer.id}
              className={`group relative w-full sm:w-[300px] overflow-hidden transition-all duration-300 ease-in-out 
                          hover:scale-105 hover:shadow-lg cursor-pointer bg-background
                          ${completed[prayer.id] ? "bg-primary-foreground" : ""}`}
              onClick={() => handleCardClick(prayer.id)}
            >
              <div className="relative z-10 p-5">
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
                      id={prayer.id}
                      checked={completed[prayer.id]}
                      onCheckedChange={() => { }}
                      className="h-6 w-6 rounded-full"
                    />
                  </div>

                </div>

                <div>
                  <h3 className="text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-primary">
                    {prayer.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{prayer.time}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1 inline-block" />
                    <span>{prayer.duration}</span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}