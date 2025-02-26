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
      { type: "End-of-day", id: "1" },
      { type: "Medication", id: "2" },
      { type: "Family-visit", id: "3" },
      { type: "Hygiene", id: "4" },
      { type: "Mental health", id: "5" },
      { type: "Sleep", id: "6" }, // Added Sleep Report
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-light-purple-lilac text-dark-lilac p-4">
        <h1 className="text-2xl font-bold">TeresAI</h1>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-dark-lilac mb-6">{patient.name}'s Dashboard</h2>
        <PatientOverview patient={patient} />
      </main>
    </div>
  )
}

