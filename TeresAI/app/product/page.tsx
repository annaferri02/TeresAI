import Link from "next/link" // Importa il componente Link per la navigazione
import { CustomButton, CustomCard } from "@/components/ui/custom-styles" // Importa componenti personalizzati
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Importa componenti della card

export default function ProductPage() {
  return (
    // Container principale della pagina
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
      {/* Titolo principale */}
      <h1 className="text-5xl font-bold text-center mb-8 text-custom-dark-purple">TeresAI</h1>

      {/* Griglia per le card del prodotto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Card principale del prodotto */}
        <CustomCard className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-custom-dark-purple">Smart Recording Device</CardTitle>
            <CardDescription className="text-white opacity-80">
              Discreet, efficient, and secure audio recording for healthcare professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Immagine del prodotto */}
            <img
              src="/placeholder.svg?height=300&width=600"
              alt="HealthCare Audio Pin"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </CardContent>
        </CustomCard>

        {/* Card delle caratteristiche chiave */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="text-custom-dark-purple">Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-white">
              <li>Easy and precise recording, transcribing and analysing op conversations </li>
              <li>Automatic creating of reports of the conversations</li>
              <li>Generate set of instructions for the nurses</li>
              <li>Safe document sharing on the Nuts Network</li>
              <li>Wearble for easy and discreet handling of recordings, with one-touch recording activation</li>
            </ul>
          </CardContent>
        </CustomCard>

        {/* Card dei benefici */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="text-custom-dark-purple">Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-white">
              <li>Improve accuracy of patient documentation</li>
              <li>Reduce time spent on manual note-taking</li>
              <li>Enhance patient-caregiver interactions</li>
              <li>Streamline workflow and increase efficiency</li>
              <li>Ensure compliance with privacy regulations</li>
            </ul>
          </CardContent>
        </CustomCard>
      </div>

      {/* Pulsante per tornare alla home */}
      <div className="mt-12">
        <Link href="/">
          <CustomButton variant="outline">Back to Home</CustomButton>
        </Link>
      </div>
    </main>
  )
}

