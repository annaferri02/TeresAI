import Link from "next/link"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, FileText, Settings, Mic, Clock, Plus, Cloud, Sun, Moon } from "lucide-react"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import mysql from "mysql2/promise";
import db from "@/lib/db";

export default async function PlatformPage() {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session);
  if (!session) {
    redirect("/login");
  }

  const [patients] = await db.execute(
    "SELECT * FROM patients WHERE caretaker_email = ?",
    [session.user.email]
  );

  return (
      <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">

        <div className="md:grid-cols-3 mb-8 w-full max-w-6xl grid grid-cols-1">
          {/* Colonna vuota per lasciare centrato il titolo */}
          <div></div>

          {/* Colonna centrale con titolo centrato */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-custom-dark-purple">To Do</h1>
          </div>

          {/* Bottone Recording a destra */}
          <div className="flex justify-end">
            <CustomButton variant="outline" className="items-center">
              <Mic className="mr" />
            </CustomButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
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
                      <div className="group w-full border border-white bg-white rounded-md p-2 hover:text-custom-lilac hover:bg-white transition-colors">
                        <Link
                            href={`/patient/${patient.id + "-" + patient.name + "-" + patient.surname}`}
                            className="block mb-2"
                        >
                        <span className="w-full text-custom-lilac font-medium">
                          {patient.name} {patient.surname}
                        </span>
                        </Link>
                        <CustomButton variant="outline" className="w-justify justify-center border-white text-center">
                          <Mic className="mr-1" />
                          Start New Report
                        </CustomButton>
                      </div>
                    </li>
                ))}
              </ul>
            </CardContent>
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

          {/* Card Handovers - UPDATED SECTION WITH FIXED CARD SIZES */}
          <CustomCard>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white text-custom-dark-purple">
                  <Link href={`/handover`} className="flex items-center">
                    <Clock className="mr-2" />
                    Handovers
                  </Link>
                </CardTitle>
                <Link href="/newhandover">
                  <CustomButton 
                    className="bg-white text-custom-lilac border-white hover:bg-gray-100 px-2 py-1 h-8 text-sm"
                  >
                    <Plus className="mr-1" size={14} />
                    New Handover
                  </CustomButton>
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-4">
                {/* Only show 8 handovers to match patient list */}
                <li>
                  <div className="group w-full border border-white bg-white rounded-md p-4 hover:text-custom-lilac hover:bg-white transition-colors relative overflow-hidden">
                    <Cloud className="absolute right-2 bottom-2 text-custom-dark-purple opacity-10" size={40} />
                    <Link href={`/handovers/morning-09-04-2025`} className="block">
                      <div className="w-full text-custom-lilac font-medium mb-2 relative z-10">
                        Morning Handover
                      </div>
                      <div className="text-sm text-gray-500 relative z-10">(09/04/2025)</div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="group w-full border border-white bg-white rounded-md p-4 hover:text-custom-lilac hover:bg-white transition-colors relative overflow-hidden">
                    <Moon className="absolute right-2 bottom-2 text-custom-dark-purple opacity-10" size={40} />
                    <Link href={`/handovers/evening-08-04-2025`} className="block">
                      <div className="w-full text-custom-lilac font-medium mb-2 relative z-10">
                        Evening Handover
                      </div>
                      <div className="text-sm text-gray-500 relative z-10">(08/04/2025)</div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="group w-full border border-white bg-white rounded-md p-4 hover:text-custom-lilac hover:bg-white transition-colors relative overflow-hidden">
                    <Sun className="absolute right-2 bottom-2 text-custom-dark-purple opacity-10" size={40} />
                    <Link href={`/handovers/noon-08-04-2025`} className="block">
                      <div className="w-full text-custom-lilac font-medium mb-2 relative z-10">
                        Noon Handover
                      </div>
                      <div className="text-sm text-gray-500 relative z-10">(08/04/2025)</div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="group w-full border border-white bg-white rounded-md p-4 hover:text-custom-lilac hover:bg-white transition-colors relative overflow-hidden">
                    <Cloud className="absolute right-2 bottom-2 text-custom-dark-purple opacity-10" size={40} />
                    <Link href={`/handovers/morning-08-04-2025`} className="block">
                      <div className="w-full text-custom-lilac font-medium mb-2 relative z-10">
                        Morning Handover
                      </div>
                      <div className="text-sm text-gray-500 relative z-10">(08/04/2025)</div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="group w-full border border-white bg-white rounded-md p-4 hover:text-custom-lilac hover:bg-white transition-colors relative overflow-hidden">
                    <Moon className="absolute right-2 bottom-2 text-custom-dark-purple opacity-10" size={40} />
                    <Link href={`/handovers/evening-07-04-2025`} className="block">
                      <div className="w-full text-custom-lilac font-medium mb-2 relative z-10">
                        Evening Handover
                      </div>
                      <div className="text-sm text-gray-500 relative z-10">(07/04/2025)</div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="group w-full border border-white bg-white rounded-md p-4 hover:text-custom-lilac hover:bg-white transition-colors relative overflow-hidden">
                    <Sun className="absolute right-2 bottom-2 text-custom-dark-purple opacity-10" size={40} />
                    <Link href={`/handovers/noon-07-04-2025`} className="block">
                      <div className="w-full text-custom-lilac font-medium mb-2 relative z-10">
                        Noon Handover
                      </div>
                      <div className="text-sm text-gray-500 relative z-10">(07/04/2025)</div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="group w-full border border-white bg-white rounded-md p-4 hover:text-custom-lilac hover:bg-white transition-colors relative overflow-hidden">
                    <Cloud className="absolute right-2 bottom-2 text-custom-dark-purple opacity-10" size={40} />
                    <Link href={`/handovers/morning-07-04-2025`} className="block">
                      <div className="w-full text-custom-lilac font-medium mb-2 relative z-10">
                        Morning Handover
                      </div>
                      <div className="text-sm text-gray-500 relative z-10">(07/04/2025)</div>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="group w-full border border-white bg-white rounded-md p-4 hover:text-custom-lilac hover:bg-white transition-colors relative overflow-hidden">
                    <Moon className="absolute right-2 bottom-2 text-custom-dark-purple opacity-10" size={40} />
                    <Link href={`/handovers/evening-06-04-2025`} className="block">
                      <div className="w-full text-custom-lilac font-medium mb-2 relative z-10">
                        Evening Handover
                      </div>
                      <div className="text-sm text-gray-500 relative z-10">(06/04/2025)</div>
                    </Link>
                  </div>
                </li>
              </ul>
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