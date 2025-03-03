"use client";
import { TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link";
import {CustomButton} from "@/components/ui/custom-styles";

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
        <h2 className="text-3xl font-bold text-custom-dark-purple mb-6">Trends</h2>
          <div className="space-y-4">
            {trends.map((trend, index) => (
                <div key={index} className="bg-light-purple-lilac p-4 bg-white rounded-lg shadow-lg border-custom-lilac flex items-start">
                  <div className="mr-4 mt-1">
                    {trend.direction === "increase" ? (
                        <TrendingUp className="w-6 h-6 text-red-500"/>
                    ) : (
                        <TrendingDown className="w-6 h-6 text-green-500"/>
                    )}
                  </div>
                  <div>
                    <p className="text-dark-lilac mb-2">{trend.description}</p>
                    <span className="text-2xl">{trend.emoji}</span>
                  </div>
                </div>
            ))}
          </div>
        <div className="mt-12 space-x-4">
          <Link href="/patient">
            <CustomButton variant="outline">Back to Patient's Dashboard</CustomButton>
          </Link>
        </div>
      </main>
    </div>
  )
}

