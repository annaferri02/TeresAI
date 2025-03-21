"use client"

import { useEffect } from "react" // Importa useEffect per effetti collaterali
import { Badge } from "@/components/ui/badge"
import Link from "next/link" // Importa il componente Link per la navigazione
import { CustomButton } from "@/components/ui/custom-styles"
import { Button } from "@/components/ui/button" // Importa il componente Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Importa componenti della card
import { FileText, Edit, ExternalLink, FileCheck } from "lucide-react" // Importa icone
import { useTranscriptionsStore } from "@/lib/transcriptionsStore" // Importa lo store delle trascrizioni

export default function TranscriptionsPage() {
    const { transcriptions, updateTranscription } = useTranscriptionsStore() // Usa lo store delle trascrizioni

    useEffect(() => {
        // Effetto per ascoltare i cambiamenti nello stato delle trascrizioni
    }, [transcriptions])

    return (
        // Container principale della pagina
        <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
            {/* Titolo principale */}
            <h1 className="text-4xl font-bold text-center mb-8 text-custom-dark-purple">Transcriptions</h1>

            {/* Contenitore delle card di trascrizione */}
            <div className="w-full max-w-6xl space-y-6">
                {/* Mappa attraverso le trascrizioni e crea una card per ciascuna */}
                {transcriptions.map((transcription) => (
                    <Card key={transcription.id} className="bg-custom-lilac text-white border-white">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                <span className="flex items-center text-custom-dark-purple border-white">
                  <FileText className="mr-2" />
                    {transcription.title}
                </span>
                                <Badge
                                    variant={transcription.status === "Completed" ? "default" : "secondary"}
                                    className="bg-white text-custom-lilac pointer-events-none"
                                >
                                    {transcription.status}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-white mb-4">Date: {transcription.date}</p>
                            <div className="flex space-x-2">
                                {/* Pulsante per visualizzare il riepilogo del paziente */}
                                <Link href={`/transcript/${transcription.id}?action=summary`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-custom-lilac text-white border-white hover:bg-white hover:text-custom-lilac"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        View Patient Summary
                                    </Button>
                                </Link>
                                {/* Pulsante per visualizzare il report (solo per trascrizioni completate) */}
                                {transcription.status === "Completed" && (
                                    <Link href={`/transcript/${transcription.id}`}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-custom-lilac text-white border-white hover:bg-white hover:text-custom-lilac"
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Report
                                        </Button>
                                    </Link>
                                )}
                                {/* Pulsante per visualizzare la bozza (per trascrizioni in attesa o in registrazione) */}
                                {(transcription.status === "Pending Approval" || transcription.status === "Recording") && (
                                    <Link href={`/transcript/${transcription.id}?action=draft`}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-custom-lilac text-white border-white hover:bg-white hover:text-custom-lilac"
                                        >
                                            <FileCheck className="mr-2 h-4 w-4" />
                                            View Draft
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pulsanti di navigazione */}
            <div className="mt-12 space-x-4">
                <Link href="/">
                    <CustomButton
                        variant="outline"
                        className="bg-custom-lilac text-white hover:bg-white hover:text-custom-lilac border-lilac"
                    >
                        Back to Home
                    </CustomButton>
                </Link>
                <Link href="/platform">
                    <CustomButton
                        variant="outline"
                        className="bg-custom-lilac text-white hover:bg-white hover:text-custom-lilac border-lilac"
                    >
                        Back to Platform
                    </CustomButton>
                </Link>
            </div>
        </main>
    )
}

