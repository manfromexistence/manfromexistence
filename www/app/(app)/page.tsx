"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import PrayerCards from "@/components/prayer-cards"
import BoringStudyCards from "@/components/boring-study-cards"
import CalendarComponent from "@/components/calendar"
import ChessCards from "@/components/chess-cards"
import LeetcodeCards from "@/components/leetcode-cards"
import QuranCards from "@/components/quran-cards"
import SocialMediaCards from "@/components/social-media-influencing-cards"
import PixelatedText from "@/components/pixel"

export default function Page() {
  const [prayerProgress, setPrayerProgress] = React.useState(0)
  const [boringStudyProgress, setBoringStudyProgress] = React.useState(0)
  const [chessProgress, setChessProgress] = React.useState(0)
  const [leetcodeProgress, setLeetcodeProgress] = React.useState(0)
  const [socialMediaInfluencingCards, setSocialMediaInfluencingCards] = React.useState(0)
  const [quranProgress, setQuranProgress] = React.useState(0)
  const [currentDate, setCurrentDate] = React.useState<string>("")

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      return "Good Morning"
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon"
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening"
    } else {
      return "Good Night"
    }
  }

  React.useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    }
    setCurrentDate(date.toLocaleDateString('en-US', options))
  }, [])

  return (
    <main className="h-full w-full p-2 overflow-auto pb-12">

      {/* <CalendarComponent /> */}

      <PixelatedText fontSize={40} pixelSize={3} position="left" className="py-6">
        {getTimeBasedGreeting()}, <PixelatedText.Rainbow>manfromexistence</PixelatedText.Rainbow>. Level <PixelatedText.Rainbow>#19</PixelatedText.Rainbow> : Streak <PixelatedText.Rainbow>#1</PixelatedText.Rainbow>
      </PixelatedText>

      <div className="w-full border flex items-center justify-start h-20">
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Prayer</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Boring Study</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Quran</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Programming</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Excercise</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Mathamatics</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Physics</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Chemistry</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Biology</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Social Media Influencing</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Chess</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Leetcode</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Family</span>

          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Friends</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="h-10 text-xs font-mono flex items-center justify-center w-max border-r px-4 border-b">Journaling</span>
          <div className="h-10 text-xs font-mono flex items-center justify-center w-full border-r px-4 hover:bg-primary-foreground hover:border-b">
            <Checkbox />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <span className="h-10 text-xs font-mono flex items-center justify-center px-4 border-b w-full">Date</span>
          <span className="h-10 text-xs font-mono flex items-center justify-center w-full px-4 hover:bg-primary-foreground hover:border-b">
            {currentDate}
          </span>
        </div>
      </div>
      <div className="min-h-screen mt-2 space-y-2 px-1">
        <div className="w-full flex flex-col space-y-2">
          <div className="h-10 flex items-start justify-between w-full">
            <span className="font-bold text-2xl h-full flex items-center">Prayer</span>
            <div className="h-full flex items-center justify-end mt-2">
              <Progress value={prayerProgress} className="w-[250px]" />
            </div>
          </div>
          <PrayerCards onProgressUpdate={setPrayerProgress} />
        </div>
        <div className="w-full flex flex-col px-1 space-y-2">
          <div className="h-10 flex items-start justify-between w-full">
            <span className="font-bold text-2xl h-full flex items-center">Boring Study</span>
            <div className="h-full flex items-center justify-end mt-2">
              <Progress value={boringStudyProgress} className="w-[250px]" />
            </div>
          </div>
          <BoringStudyCards onProgressUpdate={setBoringStudyProgress} />
        </div>
        <div className="w-full flex flex-col px-1 space-y-2">
          <div className="h-10 flex items-start justify-between w-full">
            <span className="font-bold text-2xl h-full flex items-center">Quran</span>
            <div className="h-full flex items-center justify-end mt-2">
              <Progress value={quranProgress} className="w-[250px]" />
            </div>
          </div>
          <QuranCards onProgressUpdate={setQuranProgress} />
        </div>
        <div className="w-full flex flex-col px-1 space-y-2">
          <div className="h-10 flex items-start justify-between w-full">
            <span className="font-bold text-2xl h-full flex items-center">Social Media Influencing</span>
            <div className="h-full flex items-center justify-end mt-2">
              <Progress value={socialMediaInfluencingCards} className="w-[250px]" />
            </div>
          </div>
          <SocialMediaCards onProgressUpdate={setSocialMediaInfluencingCards} />
        </div>
        <div className="w-full flex flex-col px-1 space-y-2">
          <div className="h-10 flex items-start justify-between w-full">
            <span className="font-bold text-2xl h-full flex items-center">Chess</span>
            <div className="h-full flex items-center justify-end mt-2">
              <Progress value={chessProgress} className="w-[250px]" />
            </div>
          </div>
          <ChessCards onProgressUpdate={setChessProgress} />
        </div>
        <div className="w-full flex flex-col px-1 space-y-2">
          <div className="h-10 flex items-start justify-between w-full">
            <span className="font-bold text-2xl h-full flex items-center">Leetcode</span>
            <div className="h-full flex items-center justify-end mt-2">
              <Progress value={leetcodeProgress} className="w-[250px]" />
            </div>
          </div>
          <LeetcodeCards onProgressUpdate={setLeetcodeProgress} />
        </div>
      </div>
    </main>
  )
}