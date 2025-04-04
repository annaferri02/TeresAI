import { PatientOverview } from "@/components/patient-overview";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import db from "@/lib/db";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PatientPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const [id] = params.slug.split("-");

  // Recupero dati paziente
  const [patientRows] = await db.execute(
    "SELECT * FROM patients WHERE id = ?",
    [id]
  );
  const person = patientRows[0];

  // Recupero report dal DB (senza 'type')
  const [reportRows] = await db.execute(
    "SELECT * FROM reports WHERE id_patient = ? ORDER BY created_at DESC",
    [id]
  );

  // Logica per assegnare tipi fittizi ai report
  const fallbackTypes = ["End-of-day", "Medication", "Sleep", "Hygiene", "Mental health", "Family-visit"];
  
  const reports = reportRows.map((row, index) => ({
    id: row.id.toString(),
    type: row.type, // assegna tipo ciclico
    date: row.created_at.toISOString().split("T")[0],
    approved: !!row.approved,
  }));

  const patient = {
    name: `${person.name} ${person.surname}`,
    age: person.age,
    gender: person.gender,
    intolerances: ["Lactose", "Gluten"], // fittizi
    allergies: ["Peanuts", "Penicillin"],
    dislikes: ["Broccoli", "Loud noises"],
    reports, // quelli presi dal DB
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white text-custom-lilac p-10">
      <main className="flex flex-col items-center justify-start rounded-lg w-full max-w-5xl p-16">
        <h1 className="text-4xl font-bold text-center text-custom-dark-purple mb-8 w-full">
          {patient.name}'s Dashboard
        </h1>
        <div className="w-full">
          <PatientOverview patient={patient} />
        </div>
      </main>
    </div>
  );
}
