"use client";
import { Progress } from "@/components/ui/progress"

export default function CaregoalsPage() {
  const goals = [
    { name: "Movement", current: 400, target: 600, unit: "steps" },
    { name: "Eating", current: 5000, target: 6000, unit: "calories" },
    { name: "Daily medication", current: 3, target: 4, unit: "doses" },
    { name: "Bathroom", current: 2, target: 4, unit: "times" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-light-purple-lilac text-dark-lilac p-4">
        <h1 className="text-2xl font-bold">TeresAI</h1>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-dark-lilac mb-6">Caregoals</h2>
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.name} className="bg-light-purple-lilac p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-dark-lilac mb-2">{goal.name}</h3>
              <Progress value={(goal.current / goal.target) * 100} className="h-4 mb-2" />
              <p className="text-dark-lilac">
                {goal.current}/{goal.target} {goal.unit}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

