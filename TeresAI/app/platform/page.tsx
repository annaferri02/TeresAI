import Link from "next/link" // Importa il componente Link per la navigazione
import { CustomButton, CustomCard } from "@/components/ui/custom-styles" // Importa componenti personalizzati
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Importa componenti della card
import { Badge } from "@/components/ui/badge" // Importa il componente Badge
import { FileAudio, FileText, Settings } from "lucide-react" // Importa icone

export default function PlatformPage() {
  return (
    // Container principale della pagina
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
      {/* Titolo principale */}
      <h1 className="text-4xl font-bold text-center text-custom-dark-purple mb-8">Healthcare Management Platform</h1>

      {/* Griglia per le card della piattaforma */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Card delle registrazioni recenti */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center text-white text-custom-dark-purple ">
              <FileAudio className="mr-2" />
              Recent Recordings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {["Patient Consultation", "Nurse Rounds", "Team Meeting", "Patient Discharge"].map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item}</span>
                  <Badge variant="secondary" className="bg-white text-custom-lilac hover:bg-white">
                    New
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </CustomCard>

        {/* Card della coda di trascrizione */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center text-white text-custom-dark-purple">
              <FileText className="mr-2" />
              Transcription Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {["Emergency Room Report", "Weekly Staff Meeting", "Patient Follow-up", "Medication Review"].map(
                (item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item}</span>
                    <Badge variant="outline" className="border-white text-white">
                      In Progress
                    </Badge>
                  </li>
                ),
              )}
            </ul>
          </CardContent>
        </CustomCard>

        {/* Card delle impostazioni della piattaforma */}
        <CustomCard className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-white text-custom-dark-purple">
              <Settings className="mr-2" />
              Platform Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <CustomButton variant="outline" className="border-white">Manage Users</CustomButton>
              <CustomButton variant="outline" className="border-white">Transcription Templates</CustomButton>
              <CustomButton variant="outline" className="border-white">Integration Settings</CustomButton>
              <CustomButton variant="outline" className="border-white">Privacy Controls</CustomButton>
            </div>
          </CardContent>
        </CustomCard>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="mt-12 space-x-4">
        <Link href="/">
          <CustomButton variant="outline">Back to Home</CustomButton>
        </Link>
        <Link href="/transcriptions">
          <CustomButton>View Transcriptions</CustomButton>
        </Link>
      </div>
    </main>
  )
}

