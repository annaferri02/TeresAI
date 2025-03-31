"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Check, FileDown } from "lucide-react"

// Tipo per le consegne dei pazienti
type PatientHandover = {
  id: string
  name: string
  date: string
  tasks: string[]
  completed: boolean
}

export default function HandoverPage() {
  // Stato per le consegne dei pazienti
  const [handovers, setHandovers] = useState<PatientHandover[]>([
    {
      id: "1",
      name: "John Doe",
      date: "2025-03-21",
      tasks: [
        "Monitor blood pressure every 4 hours",
        "Administer antibiotics at 2:00 PM and 10:00 PM",
        "Check the surgical wound and change the dressing",
        "Assist with afternoon ambulation",
      ],
      completed: false,
    },
    {
      id: "2",
      name: "Jane Smith",
      date: "2025-03-27",
      tasks: [
        "Monitor glucose levels before meals",
        "Administer insulin according to the prescribed schedule",
        "Assess pain every 6 hours",
        "Encourage fluid intake",
      ],
      completed: false,
    },
    {
      id: "3",
      name: "Robert Johnson",
      date: "2025-03-24",
      tasks: [
        "Monitor respiratory parameters",
        "Assist with deep breathing exercises",
        "Administer oxygen as needed",
        "Prepare for discharge scheduled for tomorrow",
      ],
      completed: false,
    },
  ])

  // Carica lo stato delle spunte dal localStorage all'avvio
  useEffect(() => {
    const savedCompletions = localStorage.getItem("handoverCompletions")
    if (savedCompletions) {
      const completedIds = JSON.parse(savedCompletions) as string[]
      setHandovers((prev) =>
        prev.map((handover) => ({
          ...handover,
          completed: completedIds.includes(handover.id),
        })),
      )
    }
  }, [])

  // Gestisce il cambio di stato di una consegna
  const toggleCompletion = (id: string) => {
    setHandovers((prev) => {
      const updated = prev.map((handover) =>
        handover.id === id ? { ...handover, completed: !handover.completed } : handover,
      )

      // Salva gli ID delle consegne completate nel localStorage
      const completedIds = updated.filter((handover) => handover.completed).map((handover) => handover.id)

      localStorage.setItem("handoverCompletions", JSON.stringify(completedIds))

      return updated
    })
  }

  // Raggruppa le consegne per data
  const handoversByDate = handovers.reduce(
    (acc, handover) => {
      if (!acc[handover.date]) {
        acc[handover.date] = []
      }
      acc[handover.date].push(handover)
      return acc
    },
    {} as Record<string, PatientHandover[]>,
  )

  // Ordina le date in ordine decrescente (più recenti prima)
  const sortedDates = Object.keys(handoversByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  // Funzione per simulare il download del report del paziente
  const downloadPatientReport = (patientName: string) => {
    console.log(`Downloading report for ${patientName}`)
    // In un'applicazione reale, qui ci sarebbe la logica per scaricare il report
    alert(`${patientName}'s Report successfully downloaded!`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white text-custom-lilac">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-custom-dark-purple justify-center">HandOver</h1>
          <Link href="/platform">
            <CustomButton variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </CustomButton>
          </Link>
        </div>

        {sortedDates.map((date) => (
          <div key={date} className="mb-8">
            <div className="space-y-4">
              {handoversByDate[date].map((handover) => (
                <div key={handover.id} className="flex gap-4">
                  <div className="flex items-start pt-4">
                    <Checkbox
                      id={`complete-${handover.id}`}
                      checked={handover.completed}
                      onCheckedChange={() => toggleCompletion(handover.id)}
                      className="h-6 w-6 border-custom-lilac"
                    />
                  </div>

                  <CustomCard className={`flex-1 ${handover.completed ? "bg-opacity-70" : ""}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-custom-dark-purple flex justify-between items-center">
                        <span className="flex items-center">
                          {handover.name} <span className="ml-2">- {handover.date}</span>
                        </span>
                        <div className="flex items-center">
                          {handover.completed && (
                            <span className="text-green-600 flex items-center text-sm mr-3">
                              <Check className="h-4 w-4 mr-1" />
                              Completed
                            </span>
                          )}
                          <button
                            onClick={() => downloadPatientReport(handover.name)}
                            className="text-custom-dark-purple p-1 rounded-full hover:text-white transition-colors"
                            title="Scarica report completo"
                          >
                            <FileDown className="h-5 w-5" />
                          </button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium text-white mb-2">Activities and Trend:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-white">
                        {handover.tasks.map((task, index) => (
                          <li key={index}>{task}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </CustomCard>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

