import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileAudio, FileText, Settings } from "lucide-react"

export default function PlatformPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Healthcare Management Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileAudio className="mr-2" />
              Recent Recordings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {["Patient Consultation", "Nurse Rounds", "Team Meeting", "Patient Discharge"].map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item}</span>
                  <Badge variant="secondary">New</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" />
              Transcription Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {["Emergency Room Report", "Weekly Staff Meeting", "Patient Follow-up", "Medication Review"].map(
                (item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item}</span>
                    <Badge variant="outline">In Progress</Badge>
                  </li>
                ),
              )}
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2" />
              Platform Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Manage Users</Button>
              <Button variant="outline">Transcription Templates</Button>
              <Button variant="outline">Integration Settings</Button>
              <Button variant="outline">Privacy Controls</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12 space-x-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        <Link href="/transcriptions">
          <Button>View Transcriptions</Button>
        </Link>
      </div>
    </main>
  )
}

