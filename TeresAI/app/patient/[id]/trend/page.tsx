"use client";
import { TrendingUp, TrendingDown } from "lucide-react"

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
      <header className="bg-light-purple-lilac text-dark-lilac p-4">
        <h1 className="text-2xl font-bold">TeresAI</h1>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-dark-lilac mb-6">Trends</h2>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="bg-light-purple-lilac p-4 rounded-lg shadow-lg flex items-start">
              <div className="mr-4 mt-1">
                {trend.direction === "increase" ? (
                  <TrendingUp className="w-6 h-6 text-red-500" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-green-500" />
                )}
              </div>
              <div>
                <p className="text-dark-lilac mb-2">{trend.description}</p>
                <span className="text-2xl">{trend.emoji}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

