import Link from "next/link" // Importa il componente Link per la navigazione
import {CustomButton, CustomCard} from "@/components/ui/custom-styles"
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card"; // Importa il pulsante personalizzato

export default function Home() {
    return (
        // Container principale della pagina
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-custom-lilac">

            {/* Contenitore dell'immagine e del testo sovrapposto */}
            <div className="relative w-full max-w-2xl aspect-video rounded-xl bg-transparent overflow-hidden  mt-24">
                {/* Immagine di sfondo */}
                {/* Aggiungi l'immagine di sfondo qui, se necessario */}

                {/* Overlay con testo e pulsante */}
                <div
                    className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-white">

                    <h1 className="text-8xl font-bold text-center mb-1 text-custom-dark-purple">TeresAI</h1>
                    <p className="text-center text-custom-dark-purple text-4xl p-4">Automated Reporting System</p>

                    {/* Pulsante "Learn More" che porta alla pagina del prodotto */}
                    <Link href="/login">
                        <CustomButton size="lg">Login</CustomButton>
                    </Link>

                </div>
            </div>

            <div className="grid grid-cols-1 mt-12 md:grid-cols-2 gap-8 w-full max-w-4xl mt-60">

                <CustomCard>
                    <CardHeader>
                        <CardTitle className="text-custom-dark-purple">Key Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-white">
                            <li>Easy and precise recording, transcribing and analysing op conversations</li>
                            <li>Automatic creating of reports of the conversations</li>
                            <li>Generate set of instructions for the nurses</li>
                            <li>Safe document sharing on the Nuts Network</li>
                            <li>Wearable for easy and discreet handling of recordings, with one-touch recording activation</li>
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
        </main>
    )
}
