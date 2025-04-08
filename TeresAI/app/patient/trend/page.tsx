import { TrendingUp, TrendingDown, TrendingUpDown } from "lucide-react"
import Link from "next/link";
import {CustomButton, CustomCard} from "@/components/ui/custom-styles";
import TrendBox from "@/components/trendbox";
import { Noto_Emoji } from "next/font/google";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";


export default function TrendPage() {
  const trends = [
    {
      direction: "increase",
      description: "Mr Gravenberg mentioned pain-related words 40% more today compared to yesterday",
      emoji: "😟",
    },
    {
      direction: "decrease",
      description: "Mr Gravenberg talked about sleep-loss related themes 25% percent less",
      emoji: "😴",
    },
    {
      direction: "decrease",
      description: "The patient did not mention his family for 2 days now",
      emoji: "👪",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/*<header className="bg-light-purple-lilac text-dark-lilac p-4">
        <h1 className="text-2xl font-bold">TeresAI</h1>
      </header>*/}
      <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac ">
        
          <CustomCard>
            <CardHeader>
              <CardTitle className="flex items-center text-white text-custom-dark-purple gap-1"><TrendingUpDown />Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {trends.map((trend, index) => (
                  <li className="my-4 text-custom-dark-purple">
                    <TrendBox direction={trend.direction} description={trend.description} emoji={trend.emoji}></TrendBox>
                  </li>
                ))}
              </ul>
            </CardContent>
          </CustomCard>
        <div className="mt-12 space-x-4">
          <Link href="/patient">
            <CustomButton variant="outline">Back to Patient's Dashboard</CustomButton>
          </Link>
        </div>
      </main>
    </div>
  )
}

