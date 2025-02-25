import Link from "next/link" // Importa il componente Link per la navigazione
import { CustomButton } from "@/components/ui/custom-styles" // Importa il pulsante personalizzato

export default function Home() {
  return (
    // Container principale della pagina
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-custom-lilac">
      {/* Titolo principale */}
      <h1 className="text-5xl font-bold text-center mb-1 text-custom-dark-purple">TeresAI</h1>
        <p className="text-center mb-8 text-custom-dark-purple text-2xl "> Medical Transcription System </p>
        
      {/* Contenitore dell'immagine e del testo sovrapposto */}
      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-2xl">
        {/* Immagine di sfondo */}
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Nurse wearing HealthCare Audio Pin"
          className="object-cover w-full h-full"
        />
        {/* Overlay con testo e pulsante */}
        <div className="absolute inset-0 bg-custom-lilac bg-opacity-50 flex flex-col items-center justify-center text-white">
          <p className="text-3xl font-bold mb-4">Smart Recording, Smarter Care</p>
          <p className="text-xl mb-8">Revolutionizing patient care documentation</p>
          {/* Pulsante "Learn More" che porta alla pagina del prodotto */}
          <Link href="/product">
            <CustomButton size="lg">Learn More</CustomButton>
          </Link>
        </div>
      </div>

      {/* Contenitore dei pulsanti di navigazione */}
      <div className="mt-12 grid grid-cols-2 gap-6">
        {/* Pulsante per visualizzare la piattaforma */}
        <Link href="/platform">
          <CustomButton variant="outline" size="lg" className="w-full">
            View Platform
          </CustomButton>
        </Link>
        {/* Pulsante per visualizzare le trascrizioni */}
        <Link href="/transcriptions">
          <CustomButton variant="outline" size="lg" className="w-full">
            View Transcriptions
          </CustomButton>
        </Link>
      </div>
    </main>
  )
}

