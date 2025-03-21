import Link from "next/link"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, FileText, Settings, Mic } from "lucide-react"

export default function PlatformPage() {
  // Lista dei pazienti con ID
  const patients = [
    { id: 1, name: "Reijnder Gravenberg" },
    {id: 2, name: "Dorothy Miller"},
    {id: 3, name: "George Carmichael"},
    {id:4, name: "Margaret Collins"}
  ]

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
                            href={`/patient/${patient.name.toLowerCase().replace(" ", "-")}`}
                            className="block mb-2"
                        >
                      <span className="w-full text-white group-hover:text-custom-lilac">
                        {patient.name}
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
                          Approve {patient.name}'s Report
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