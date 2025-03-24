import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {CustomButton} from "@/components/ui/custom-styles"
import { signOut } from 'next-auth/react';
import mysql from "mysql2/promise";
import Link from "next/link"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  const [patients] = await db.execute(
    "SELECT * FROM patients WHERE caretaker_email = ?",
    [session.user.email]
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-8 text-custom-lilac">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg border bg-white">
        <h1 className="text-2xl font-bold mb-4 text-custom-dark-purple">My patients:</h1>
            <ul className="space-y-4">
                {patients.map((patient) => (
                    <Link
                    href={`/patient/${patient.id + "-" + patient.name + "-" + patient.surname}`}
                    className="block mb-2"
                    >
                    <li key={patient.id}>
                      <div className="shadow-lg border p-2 rounded">
                        <p className="font-bold text-sm text-gray-500">{patient.name} {patient.surname}</p>
                        <p className="text-sm text-gray-500">Age: {patient.age}</p>
                        <p className="text-sm text-gray-500">Gender: {patient.gender}</p>
                      </div>
                    </li>
                    </Link>
                ))}
            </ul>
      </div>
    </main>
  );
}
