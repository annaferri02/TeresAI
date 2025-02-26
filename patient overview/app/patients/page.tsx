import { PatientOverview } from "@/components/patient-overview"

export default function PatientPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the patient data based on the ID
  // For this example, we'll use hardcoded data for Reijnder Gravenberg
  const patient = {
    id: params.id,
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
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-violet-700 text-white p-4">
        <h1 className="text-2xl font-bold">TeresAI</h1>
      </header>
      <main className="container mx-auto p-4">
        <PatientOverview patient={patient} />
      </main>
    </div>
  )
}
