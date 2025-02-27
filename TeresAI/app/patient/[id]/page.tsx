"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranscriptionsStore } from "@/lib/transcriptionsStore"

export default function PatientPage() {
    const params = useParams()
    const { id } = params
    const { transcriptions } = useTranscriptionsStore()
    const [patientReports, setPatientReports] = useState([])

    useEffect(() => {
        // Filtra le trascrizioni per ottenere solo quelle relative al paziente corrente
        const filteredReports = transcriptions.filter((t) => t.title.toLowerCase().includes(id.replace("-", " ")))
        setPatientReports(filteredReports)
    }, [id, transcriptions])

    const patientName = id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
            <h1 className="text-4xl font-bold text-center text-custom-dark-purple mb-8">{patientName}</h1>

            <CustomCard className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle className="text-custom-dark-purple">Patient Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    {patientReports.length > 0 ? (
                        <ul className="space-y-4">
                            {patientReports.map((report, index) => (
                                <li key={index}>
                                    <CustomButton variant="outline" className="w-full justify-start border-white">
                                        {report.title} - {report.date}
                                    </CustomButton>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center">No reports available for this patient.</p>
                    )}
                </CardContent>
            </CustomCard>

            <div className="mt-8">
                <Link href="/platform">
                    <CustomButton variant="outline">Back to Platform</CustomButton>
                </Link>
            </div>
        </main>
    )
}

