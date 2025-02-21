import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">HealthCare Audio Pin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Smart Recording Device</CardTitle>
            <CardDescription>
              Discreet, efficient, and secure audio recording for healthcare professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="/placeholder.svg?height=300&width=600"
              alt="HealthCare Audio Pin"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Discreet design that blends with medical attire</li>
              <li>One-touch recording activation</li>
              <li>Secure, encrypted audio transmission</li>
              <li>Long battery life for extended shifts</li>
              <li>Water-resistant and easy to sanitize</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Improve accuracy of patient documentation</li>
              <li>Reduce time spent on manual note-taking</li>
              <li>Enhance patient-caregiver interactions</li>
              <li>Streamline workflow and increase efficiency</li>
              <li>Ensure compliance with privacy regulations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </main>
  )
}

