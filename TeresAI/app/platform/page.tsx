"use client";

import Link from "next/link"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, FileText, Settings } from "lucide-react"
import { useState } from "react";

export default function PlatformPage() {
  // Lista dei pazienti con ID
  const patients = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Robert Johnson" },
    { id: 4, name: "Emily Brown" }
  ]

  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInstructions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/instructions");;
      const data = await response.json();
      setInstructions(data.instructions); // Update state with AI-generated instructions
    } catch (error) {
      console.error("Error fetching instructions:", error);
      setInstructions("Er is een fout opgetreden bij het ophalen van instructies.");
    }
    setLoading(false);
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
      <h1 className="text-4xl font-bold text-center text-custom-dark-purple mb-8">Healthcare Management Platform</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Card delle visite pazienti */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center text-white text-custom-dark-purple">
              <FileAudio className="mr-2" />
              Patients to Visit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {patients.map((patient) => (
                <li key={patient.id}>
                  <div className="w-full border border-white rounded-md p-2 hover:bg-white hover:text-custom-lilac transition-colors">
                    <Link href={`/patient/${patient.name.toLowerCase().replace(" ", "-")}`} className="block mb-2">
                      <span className="text-white hover:text-custom-lilac hover:bg-white">{patient.name}</span>
                    </Link>
                    <CustomButton
                      variant="outline"
                      size="sm"
                      className="w-full border-white text-white hover:bg-custom-lilac hover:text-white"
                      onClick={fetchInstructions}
                    >
                      Generate Instructions
                    </CustomButton>
                    <p id="instructions-field">{loading ? "Loading..." : instructions}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </CustomCard>

        {/* Card dei report da approvare */}
        <CustomCard>
          <CardHeader>
            <CardTitle className="flex items-center text-white text-custom-dark-purple">
              <FileText className="mr-2" />
              Approve Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {patients.map((patient) => (
                <li key={patient.id}>
                  <Link href={`/transcript/${patient.id}`}>
                    <CustomButton variant="outline" className="w-full justify-start border-white">
                      Approve {patient.name}'s Report
                    </CustomButton>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </CustomCard>

        {/* Card delle impostazioni */}
        <CustomCard className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-white text-custom-dark-purple">
              <Settings className="mr-2" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <CustomButton variant="outline" className="border-white">
                Manage Users
              </CustomButton>
              <CustomButton variant="outline" className="border-white">
                Transcription Templates
              </CustomButton>
              <CustomButton variant="outline" className="border-white">
                Integration Settings
              </CustomButton>
              <CustomButton variant="outline" className="border-white">
                Privacy Controls
              </CustomButton>
            </div>
          </CardContent>
        </CustomCard>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="mt-12 space-x-4">
        <Link href="/">
          <CustomButton variant="outline">Back to Home</CustomButton>
        </Link>
        <Link href="/transcriptions">
          <CustomButton>View Transcriptions</CustomButton>
        </Link>
      </div>
    </main>
  )
}

