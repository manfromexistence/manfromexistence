"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock } from "lucide-react"
import * as Icons from "lucide-react"
import { cards } from "@/data/cards"

interface CardsProps {
  category: keyof typeof cards
  onProgressUpdate: (progress: number) => void
}

export default function Cards({ category, onProgressUpdate }: CardsProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const cardData = cards[category]

  // Initialize completed state based on activities
  useEffect(() => {
    const initialState: Record<string, boolean> = {}
    cardData.activities.forEach((activity: any) => {
      initialState[activity.id] = false
    })
    setCompleted(initialState)
  }, [cardData.activities])

  // Handle progress updates
  useEffect(() => {
    const totalActivities = Object.keys(completed).length
    const completedActivities = Object.values(completed).filter(Boolean).length
    const progress = Math.round((completedActivities / totalActivities) * 100)
    onProgressUpdate(progress)
  }, [completed, onProgressUpdate])

  const handleCardClick = (id: string) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4">
        {cardData.activities.map((activity: any) => {
          const IconComponent = (Icons[activity.icon as keyof typeof Icons] || Icons.Circle) as React.ElementType
          
          return (
            <Card
              key={activity.id}
              className={`
                group relative w-full sm:w-[300px] overflow-hidden 
                transition-all hover:scale-105 cursor-pointer
                ${completed[activity.id] ? "bg-primary/10" : ""}
              `}
              onClick={() => handleCardClick(activity.id)}
            >
              <div className="relative p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="h-12 w-12 flex items-start justify-end">
                    <Checkbox
                      checked={completed[activity.id]}
                      onCheckedChange={() => handleCardClick(activity.id)}
                      className="h-6 w-6"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {activity.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity.time}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{activity.duration}</span>
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