"use client"

import * as React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Sun, Sunrise, Sunset, Moon } from "lucide-react"

export default function PrayerCards({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  })

  const prayers = [
    {
      id: "fajr",
      name: "Fajr",
      time: "Dawn, before sunrise",
      duration: "Minimum 2 minutes",
      icon: Sunrise,
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
    },
    {
      id: "dhuhr",
      name: "Dhuhr",
      time: "After sun's zenith",
      duration: "Minimum 4 minutes",
      icon: Sun,
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600",
    },
    {
      id: "asr",
      name: "Asr",
      time: "Midway between noon and sunset",
      duration: "Minimum 4 minutes",
      icon: Sun,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
    {
      id: "maghrib",
      name: "Maghrib",
      time: "Just after sunset",
      duration: "Minimum 3 minutes",
      icon: Sunset,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
    },
    {
      id: "isha",
      name: "Isha",
      time: "After twilight disappears",
      duration: "Minimum 4 minutes",
      icon: Moon,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
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
    <div className="w-full mt-4">
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