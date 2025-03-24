import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {CustomButton} from "@/components/ui/custom-styles"
import { signOut } from 'next-auth/react';
import mysql from "mysql2/promise";

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
        <p className="text-sm text-gray-500">My Patients:</p>
            <ul className="space-y-4">
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.name} {patient.surname}
                    </li>
                ))}
            </ul>
      </div>
    </main>
  );
}
