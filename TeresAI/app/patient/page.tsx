"use client";

import { PatientOverview } from "@/components/patient-overview"

export default function PatientPage() {
  // Hardcoded data for Reijnder Gravenberg
  const patient = {
    name: "Reijnder Gravenberg",
    age: 65,
    gender: "Male",
    intolerances: ["Lactose", "Gluten"],
    allergies: ["Peanuts", "Penicillin"],
    dislikes: ["Broccoli", "Loud noises"],
    reports: [
      { type: "End-of-day", id: "1", date: "2023-05-15", approved: true },
      { type: "Medication", id: "2", date: "2023-05-14", approved: false },
      { type: "Family-visit", id: "3", date: "2023-05-13", approved: true },
      { type: "Hygiene", id: "4", date: "2023-05-12", approved: false },
      { type: "Mental health", id: "5", date: "2023-05-11", approved: true },
      { type: "Sleep", id: "6", date: "2023-05-10", approved: false },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/*<header className="bg-light-purple-lilac text-dark-lilac p-4">
        <h1 className="text-2xl font-bold">TeresAI</h1>
      </header>*/}
      <main className="flex min-h-screen flex-col items-center justify-start p-20 bg-white text-custom-lilac">
        <h1 className="text-4xl font-bold text-center text-custom-dark-purple">{patient.name}'s Dashboard</h1>
        <PatientOverview patient={patient} />
      </main>
    </div>
  )
}