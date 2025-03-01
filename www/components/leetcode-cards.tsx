"use client"

import * as React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, CircleDot, Circle, CircleDashed } from "lucide-react"

export default function LeetcodeCards({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) {
    const [completed, setCompleted] = useState<Record<string, boolean>>({
        easy: false,
        medium: false,
        hard: false,
    })

    const activities = [
        {
            id: "easy",
            name: "Easy Problem",
            time: "Morning session",
            duration: "15 minutes",
            icon: CircleDot,
        },
        {
            id: "medium",
            name: "Medium Problem",
            time: "Afternoon session",
            duration: "15 minutes",
            icon: Circle,
        },
        {
            id: "hard",
            name: "Hard Problem",
            time: "Evening session",
            duration: "15 minutes",
            icon: CircleDashed,
        },
    ]

    const handleCardClick = (id: string) => {
        setCompleted((prev) => {
            const newCompleted = {
                ...prev,
                [id]: !prev[id],
            }

            // Calculate progress
            const totalActivities = Object.keys(newCompleted).length
            const completedActivities = Object.values(newCompleted).filter(Boolean).length
            const progress = Math.round((completedActivities / totalActivities) * 100)

            // Update progress through callback
            onProgressUpdate(progress)

            return newCompleted
        })
    }

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-4 justify-start ">
                {activities.map((activity) => {
                    const Icon = activity.icon
                    return (
                        <Card
                            key={activity.id}
                            className={`group relative w-full sm:w-[300px] overflow-hidden transition-all duration-300 ease-in-out 
                          hover:scale-105 hover:shadow-lg cursor-pointer bg-background
                          ${completed[activity.id] ? "bg-primary-foreground" : ""}`}
                            onClick={() => handleCardClick(activity.id)}
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
                                            id={activity.id}
                                            checked={completed[activity.id]}
                                            onCheckedChange={() => { }}
                                            className="h-6 w-6 rounded-full"
                                        />
                                    </div>

                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-primary">
                                        {activity.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-2">{activity.time}</p>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3 mr-1 inline-block" />
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