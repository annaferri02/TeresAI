"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, User, Save, CheckCircle, Edit, Download, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const transcripts = [
  {
    id: "1",
    title: "Patient Consultation - John Doe",
    date: "2025-02-21",
    status: "Pending Approval",
    content: `
Nurse: Good morning, Mr. Doe. How are you feeling today?

Patient: Good morning. I'm feeling a bit better, but I still have some pain in my lower back.

Nurse: I see. On a scale of 1 to 10, with 10 being the worst pain you've ever experienced, how would you rate your current pain level?

Patient: I'd say it's about a 6 right now.

Nurse: Thank you for that information. Have you been able to walk around as we discussed yesterday?

Patient: Yes, I've been trying to move around a bit more. It hurts when I first get up, but it seems to ease a bit as I walk.

Nurse: That's good to hear. Movement can often help with lower back pain. Let's go over your medication schedule and then we'll discuss some gentle exercises you can do to help manage the pain.
    `,
    patientSummary: `
Name: John Doe
Age: 45
Gender: Male
Medical History: Chronic lower back pain, hypertension
Current Medication: Ibuprofen 400mg as needed, Lisinopril 10mg daily
Allergies: None known
Recent Procedures: None
    `,
  },
  // Add more transcript objects as needed
]

export default function TranscriptPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams.get("action")
  const [transcript, setTranscript] = useState(transcripts.find((t) => t.id === params.id) || transcripts[0])
  const [editedContent, setEditedContent] = useState(transcript.content)
  const [isEditing, setIsEditing] = useState(false)

  const handleApprove = () => {
    setTranscript((prev) => ({ ...prev, status: "Completed" }))
    setIsEditing(false)
    // Here you would typically update the status in your backend
    console.log("Approving transcript:", transcript.title)
    // Optionally, redirect to the transcriptions page after approval
    // router.push('/transcriptions')
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setTranscript((prev) => ({ ...prev, content: editedContent }))
    setIsEditing(false)
    // Here you would typically save the changes to your backend
    console.log("Saving changes:", editedContent)
  }

  const handleCancel = () => {
    setEditedContent(transcript.content)
    setIsEditing(false)
  }

  const handleDownload = () => {
    // Here you would typically implement the download functionality
    console.log("Downloading transcript:", transcript.title)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">
        {action === "summary" ? "Patient Summary" : action === "draft" ? "Draft Transcript" : "Transcript Details"}
      </h1>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="mr-2" />
              {transcript.title}
            </span>
            <Badge variant={transcript.status === "Completed" ? "default" : "secondary"}>{transcript.status}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
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
            <div className="bg-white p-4 rounded-md shadow-inner whitespace-pre-wrap">{transcript.patientSummary}</div>
          ) : isEditing ? (
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[300px]"
            />
          ) : (
            <div className="bg-white p-4 rounded-md shadow-inner whitespace-pre-wrap">{transcript.content}</div>
          )}
          {action === "draft" && transcript.status === "Pending Approval" && !isEditing && (
            <div className="mt-4">
              <Button variant="default" onClick={handleApprove}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            {action === "draft" &&
              transcript.status !== "Completed" &&
              (isEditing ? (
                <>
                  <Button variant="default" size="sm" onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </>
              ))}
          </div>
          <Link href="/transcriptions">
            <Button variant="outline">Back to Transcriptions</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

