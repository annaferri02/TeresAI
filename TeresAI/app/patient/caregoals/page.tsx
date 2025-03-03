"use client";
import { Progress } from "@/components/ui/progress"
import Link from "next/link";
import {CustomButton} from "@/components/ui/custom-styles";

export default function CaregoalsPage() {
  const goals = [
    { name: "Movement", current: 400, target: 600, unit: "steps" },
    { name: "Eating", current: 5000, target: 6000, unit: "calories" },
    { name: "Daily medication", current: 3, target: 4, unit: "doses" },
    { name: "Bathroom", current: 2, target: 4, unit: "times" },
  ]

  return (
    <div className="min-h-screen bg-white">
        <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
            <h1 className="text-4xl font-bold text-custom-dark-purple mb-8">Caregoals</h1>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full max-w-2xl">
                {goals.map((goal) => (
                    <div key={goal.name} className="bg-light-purple-lilac p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-dark-lilac mb-2">{goal.name}</h3>
                        <Progress value={(goal.current / goal.target) * 100} className="h-4 mb-2"/>
                        <p className="text-dark-lilac">
                            {goal.current}/{goal.target} {goal.unit}
                        </p>
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

