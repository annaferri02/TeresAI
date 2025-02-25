"use client" // Indica che questo è un componente client-side

import { useState } from "react" // Importa useState per gestire lo stato locale
import { useRouter, useSearchParams } from "next/navigation" // Importa hook per la navigazione e i parametri di ricerca
import Link from "next/link" // Importa il componente Link per la navigazione
import { CustomButton, CustomCard } from "@/components/ui/custom-styles" // Importa componenti personalizzati
import { CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card" // Importa componenti della card
import { Badge } from "@/components/ui/badge" // Importa il componente Badge
import { FileText, Clock, User, Save, CheckCircle, Edit, Download, X } from "lucide-react" // Importa icone
import { Textarea } from "@/components/ui/textarea" // Importa il componente Textarea
import { useTranscriptionsStore } from "@/lib/transcriptionsStore" // Importa lo store delle trascrizioni

// Componente per i blocchi di riepilogo del paziente
const SummaryBlock = ({ title, data }: { title: string; data: string }) => {
  return (
    <div
      className="p-4 rounded-md bg-custom-lilac text-white border border-white hover:border-custom-lilac
      hover:bg-white hover:text-custom-lilac "
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm whitespace-pre-wrap">{data}</p>
    </div>
  )
}

// Componente principale della pagina
export default function TranscriptPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams.get("action")
  const { transcriptions, updateTranscription } = useTranscriptionsStore() // Usa lo store delle trascrizioni
  const transcriptData = transcriptions.find((t) => t.id === params.id)
  const [transcript, setTranscript] = useState(transcriptData || {
    id: "1",
    title: "Patient Consultation - John Doe",
    date: "2025-02-21",
    status: "Completed",
    content: `
      Nurse: Good afternoon, everyone. Let's begin the rounds for the Elderly Ward. We'll start with bed 1.

      Nurse: Good morning, Mr. Doe. How are you feeling today?

      Patient: I feel a bit weak, but otherwise okay.

      Nurse: I understand. Let's check your vital signs and see how we can assist you today.

      Nurse: Do you need anything at the moment?

      Patient: I would appreciate a glass of water, please.

      Nurse: Of course, I'll bring it right away.
    `,
    patientSummary: [
      { title: "Eating Behaviour", data: "No data recorded yet" },
      { title: "Medicine Administration", data: "No data recorded yet" },
      { title: "Sleep", data: "No data recorded yet" },
      { title: "Energy", data: "No data recorded yet" },
      { title: "Pain Complaints", data: "No data recorded yet" },
      { title: "Stool", data: "No data recorded yet" },
      { title: "Blood Pressure", data: "No data recorded yet" },
      { title: "Care Goals", data: "No goals set yet" }
    ],
  })
  const [editedContent, setEditedContent] = useState(transcript.content)
  const [isEditing, setIsEditing] = useState(false)

  // Funzione per gestire l'approvazione della trascrizione
  const handleApprove = () => {
    if (transcript.status === "Pending Approval") {
      updateTranscription(transcript.id, { status: "Completed" })
      const updatedTranscript = { ...transcript, status: "Completed" }
      setTranscript(updatedTranscript)
      setIsEditing(false)
      console.log("Approving transcript:", updatedTranscript.title)
    } else {
      console.log("Cannot approve transcript with status:", transcript.status)
    }
  }

  // Funzione per attivare la modalità di modifica
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Funzione per salvare le modifiche
  const handleSave = () => {
    setTranscript((prev) => ({ ...prev, content: editedContent }))
    setIsEditing(false)
    // Qui si salverebbero le modifiche nel backend
    console.log("Saving changes:", editedContent)
  }

  // Funzione per annullare le modifiche
  const handleCancel = () => {
    setEditedContent(transcript.content)
    setIsEditing(false)
  }

  // Funzione per scaricare la trascrizione
  const handleDownload = () => {
    // Qui si implementerebbe la funzionalità di download
    console.log("Downloading transcript:", transcript.title)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
      <h1 className="text-4xl font-bold text-center mb-8 text-custom-dark-purple">
        {action === "summary" ? "Patient Summary" : action === "draft" ? "Draft Transcript" : "Transcript Details"}
      </h1>
      <CustomCard className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-custom-dark-purple">
            <span className="flex items-center">
              <FileText className="mr-2" />
              {transcript.title}
            </span>
            <Badge
              variant={transcript.status === "Completed" ? "default" : "secondary"}
              className="bg-white text-custom-lilac hover:bg-white pointer-events-none"
            >
              {transcript.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4 text-sm text-white opacity-80">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {transcript.date}
            </span>
            <span className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              Dr. Smith
            </span>
          </div>
          {action === "summary" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transcript.patientSummary?.map((block, index) => (
                <SummaryBlock key={index} title={block.title} data={block.data} />
              ))}
            </div>
          ) : isEditing ? (
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[300px] bg-white text-custom-lilac"
            />
          ) : (
            <div className="bg-white text-custom-lilac p-4 rounded-md shadow-inner whitespace-pre-wrap">
              {transcript.content}
            </div>
          )}
          {action === "draft" &&
            transcript.status === "Pending Approval" &&
            transcript.status !== "Recording" &&
            !isEditing && (
              <div className="mt-4">
                <CustomButton variant="default" className="border-white" onClick={handleApprove}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </CustomButton>
              </div>
            )}
        </CardContent>
        <CardFooter className="flex justify-between">
  <div className="flex space-x-2">
    {(action === "draft" || action === undefined) && transcript.status !== "Completed" && transcript.status !== "Recording" &&
      (isEditing ? (
        <>
          <CustomButton variant="default" className="border-white" size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </CustomButton>
          <CustomButton variant="outline" className="border-white" size="sm" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </CustomButton>
        </>
      ) : (
        <>
          <CustomButton variant="outline" className="border-white" size="sm" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4 border-white" />
            Edit
          </CustomButton>
          <CustomButton variant="outline" className="border-white" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </CustomButton>
        </>
      ))}

    {transcript.status === "Completed" && (
      <CustomButton variant="outline" className="border-white" size="sm" onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download
      </CustomButton>
    )}

    {transcript.status === "Recording" && (
      <CustomButton variant="outline" className="border-white" size="sm" onClick={handleEdit}>
        <Edit className="mr-2 h-4 w-4 border-white" />
        Edit
      </CustomButton>
    )}
  </div>
  <Link href="/transcriptions">
    <CustomButton variant="outline" className="border-white">
      Back to Transcriptions
    </CustomButton>
  </Link>
</CardFooter>

      </CustomCard>
    </main>
  )
}

