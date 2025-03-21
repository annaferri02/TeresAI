"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useTranscriptionsStore } from "@/lib/transcriptionsStore"
import { FileText, Clock, User, Save, CheckCircle, Edit, X } from "lucide-react"

export default function ApproveReportsPage() {
  const { transcriptions, updateTranscription } = useTranscriptionsStore()
  const [selectedTranscript, setSelectedTranscript] = useState(null)
  const [editedContent, setEditedContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const todayTranscripts = transcriptions.filter(
      (t) => t.status === "Pending Approval" && new Date(t.date).toDateString() === new Date().toDateString(),
  )

  useEffect(() => {
    if (selectedTranscript) {
      setEditedContent(selectedTranscript.content)
    }
  }, [selectedTranscript])

  const handleSelectTranscript = (transcript) => {
    setSelectedTranscript(transcript)
    setIsEditing(false)
  }

  const handleApprove = () => {
    if (selectedTranscript) {
      updateTranscription(selectedTranscript.id, { status: "Completed", content: editedContent })
      setSelectedTranscript(null)
      setIsEditing(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (selectedTranscript) {
      updateTranscription(selectedTranscript.id, { content: editedContent })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedContent(selectedTranscript.content)
    setIsEditing(false)
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
        <h1 className="text-4xl font-bold text-center text-custom-dark-purple mb-8">Approve Daily Reports</h1>

        <div className="flex w-full max-w-6xl gap-8">
          <CustomCard className="w-1/3">
            <CardHeader>
              <CardTitle className="text-custom-dark-purple">Today's Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {todayTranscripts.map((transcript) => (
                    <li key={transcript.id}>
                      <CustomButton
                          variant="outline"
                          className="w-full justify-start border-white text-left"
                          onClick={() => handleSelectTranscript(transcript)}
                      >
                        {transcript.title}
                      </CustomButton>
                    </li>
                ))}
              </ul>
            </CardContent>
          </CustomCard>

          {selectedTranscript && (
              <CustomCard className="w-2/3">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-custom-dark-purple">
                <span className="flex items-center">
                  <FileText className="mr-2" />
                  {selectedTranscript.title}
                </span>
                    <Badge
                        variant={selectedTranscript.status === "Completed" ? "default" : "secondary"}
                        className="bg-white text-custom-lilac hover:bg-white pointer-events-none"
                    >
                      {selectedTranscript.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-white opacity-80">
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {selectedTranscript.date}
                </span>
                    <span className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  Dr. Smith
                </span>
                  </div>
                  {isEditing ? (
                      <Textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="min-h-[300px] bg-white text-custom-lilac"
                      />
                  ) : (
                      <div className="bg-white text-custom-lilac p-4 rounded-md shadow-inner whitespace-pre-wrap">
                        {selectedTranscript.content}
                      </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isEditing ? (
                      <>
                        <CustomButton variant="outline" onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </CustomButton>
                        <CustomButton variant="outline" onClick={handleCancel}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </CustomButton>
                      </>
                  ) : (
                      <>
                        <CustomButton variant="outline" onClick={handleEdit}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </CustomButton>
                        <CustomButton onClick={handleApprove}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Report
                        </CustomButton>
                      </>
                  )}
                </CardFooter>
              </CustomCard>
          )}
        </div>

        <div className="mt-8">
          <Link href="/platform">
            <CustomButton variant="outline">Back to Platform</CustomButton>
          </Link>
        </div>
      </main>
  )
}

