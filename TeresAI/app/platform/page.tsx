import Link from "next/link"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, FileText, Settings, Mic } from "lucide-react"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import mysql from "mysql2/promise";

export default async function PlatformPage() {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session);
  if (!session) {
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
      <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">

        <div className="grid grid-cols-3 items-center mb-8 w-full max-w-4xl">
          {/* Colonna vuota per lasciare centrato il titolo */}
          <div></div>

          {/* Colonna centrale con titolo centrato */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-custom-dark-purple">To Do</h1>
          </div>

          {/* Bottone Recording a destra */}
          <div className="flex justify-end">
            <CustomButton variant="outline" className="flex items-center">
              <Mic className="mr-1" />
              Recording
            </CustomButton>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Card delle visite pazienti */}
          <CustomCard>
            <CardHeader>
              <CardTitle className="flex items-center text-white text-custom-dark-purple">
              <FileAudio className="mr-2" />
                Patients to Visit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {patients.map((patient) => (
                    <li key={patient.id}>
                      <div className="group w-full border border-white rounded-md p-2 hover:text-custom-lilac hover:bg-white transition-colors">
                        <Link
                            href={`/patient/${patient.id + "-" + patient.name + "-" + patient.surname}`}
                            className="block mb-2"
                        >
                      <span className="w-full text-white group-hover:text-custom-lilac">
                        {patient.name} {patient.surname}
                      </span>
                        </Link>
                        <CustomButton
                            variant="outline"
                            size="sm"
                            className="w-full border-white text-white group-hover:bg-custom-lilac group-hover:text-white"
                        >
                          Instructions
                        </CustomButton>
                      </div>
                    </li>
                ))}
              </ul>
            </CardContent>
            <Link href={`/patients`}>
              <CustomButton variant="outline" size="sm" className="w-full border-white text-white group-hover:bg-custom-lilac group-hover:text-white">
                All Patients
              </CustomButton>
            </Link>
          </CustomCard>

          {/* Card dei report da approvare */}
          <CustomCard>
            <CardHeader>
              <CardTitle className="flex items-center text-white text-custom-dark-purple">
                <FileText className="mr-2" />
                Approve Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {patients.map((patient) => (
                    <li key={patient.id}>
                      <Link href={`/transcript/${patient.id}`}>
                        <CustomButton variant="outline" className="w-full justify-start border-white">
                          Approve {patient.name} {patient.surname}'s Report
                        </CustomButton>
                      </Link>
                    </li>
                ))}
              </ul>
            </CardContent>
          </CustomCard>

          {/* Card delle impostazioni */}
          <CustomCard className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-white text-custom-dark-purple">
                <Settings className="mr-2" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <CustomButton variant="outline" className="border-white">
                  Manage Users
                </CustomButton>
                <CustomButton variant="outline" className="border-white">
                  Transcription Templates
                </CustomButton>
                <CustomButton variant="outline" className="border-white">
                  Integration Settings
                </CustomButton>
                <CustomButton variant="outline" className="border-white">
                  Privacy Controls
                </CustomButton>
              </div>
            </CardContent>
          </CustomCard>
        </div>

        {/* Pulsanti di navigazione */}
        <div className="mt-12 space-x-4">
          <Link href="/">
            <CustomButton variant="outline">Back to Home</CustomButton>
          </Link>
        </div>
      </main>
  )
}