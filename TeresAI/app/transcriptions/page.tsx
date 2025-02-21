import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Edit, ExternalLink, FileCheck } from "lucide-react"

export default function TranscriptionsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Transcriptions</h1>
      <div className="w-full max-w-4xl space-y-6">
        {[
          { id: "1", title: "Patient Consultation - John Doe", date: "2025-02-21", status: "Completed" },
          { id: "2", title: "Nurse Rounds - Ward 3", date: "2025-02-20", status: "Recording" },
          { id: "3", title: "Team Meeting - Shift Handover", date: "2025-02-19", status: "Completed" },
          { id: "4", title: "Patient Discharge - Jane Smith", date: "2025-02-18", status: "Pending Approval" },
        ].map((transcription) => (
          <Card key={transcription.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="mr-2" />
                  {transcription.title}
                </span>
                <Badge variant={transcription.status === "Completed" ? "default" : "secondary"}>
                  {transcription.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Date: {transcription.date}</p>
              <div className="flex space-x-2">
                <Link href={`/transcript/${transcription.id}?action=summary`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    View Patient Summary
                  </Button>
                </Link>
                {transcription.status === "Completed" && (
                  <Link href={`/transcript/${transcription.id}`}>
                    <Button variant="default" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Report
                    </Button>
                  </Link>
                )}
                {(transcription.status === "Pending Approval" || transcription.status === "Recording") && (
                  <Link href={`/transcript/${transcription.id}?action=draft`}>
                    <Button variant="default" size="sm">
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
      <div className="mt-12 space-x-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        <Link href="/platform">
          <Button>Back to Platform</Button>
        </Link>
      </div>
    </main>
  )
}

