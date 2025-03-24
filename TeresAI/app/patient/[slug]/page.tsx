import { PatientOverview } from "@/components/patient-overview"
import mysql from "mysql2/promise";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

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

  const [id] = params.slug.split('-');

  const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
  });
  
  const [rows] = await db.execute(
    "SELECT * FROM patients WHERE id = ?",
    [id]
  );
  
  const person = rows[0];

  // Hardcoded data except for Name, Age and Gender
  const patient = {
    name: person.name + " " + person.surname,
    age: person.age,
    gender: person.gender,
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
      <div className="flex justify-center w-full min-h-screen bg-white text-custom-lilac p-10">
        <main className="flex flex-col items-center justify-start rounded-lg w-full max-w-5xl p-16">
          <h1 className="text-4xl font-bold text-center text-custom-dark-purple mb-8 w-full">{patient.name}'s Dashboard</h1>
          <div className="w-full">
            <PatientOverview patient={patient} />
          </div>
        </main>
      </div>
  )
}
