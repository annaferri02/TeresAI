'use client'; // <- necessario perché usi useState

import { useState } from 'react';
import Link from "next/link"
import { FileText, Users, TrendingUp, PlusCircle } from "lucide-react"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from 'next/navigation';

type Report = {
  type: string
  id: string
  date: string
  approved: boolean
}

type Patient = {
  name: string
  age: number
  gender: string
  intolerances: string[]
  allergies: string[]
  dislikes: string[]
  reports: Report[]
}

export function PatientOverview({ patient }: { patient: Patient }) {
  const params = useParams();
  const [search, setSearch] = useState("");

  const filteredReports = patient.reports.filter((report) =>
    report.type.toLowerCase().includes(search.toLowerCase()) ||
    report.date.includes(search)
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5 text-custom-lilac">
      {/* ...Personal & Medical info (nessun cambiamento) */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-10 w-full max-w-full ">
          {/* Left Column - Personal Information */}
          <CustomCard className="shadow-lg col-span-3 p-3">
            <CardHeader>
              <CardTitle className="text-custom-dark-purple ">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-medium">Age:</span> {patient.age}
              </p>
              <p>
                <span className="font-medium">Gender:</span> {patient.gender}
              </p>
            </CardContent>
          </CustomCard>

          {/* Right Column - Medical Information */}
          <CustomCard className="shadow-lg col-span-3 p-3">
            <CardHeader>
              <CardTitle className="text-custom-dark-purple">Medical Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-medium">Intolerances:</span> {patient.intolerances.join(", ")}
              </p>
              <p>
                <span className="font-medium">Allergies:</span> {patient.allergies.join(", ")}
              </p>
              <p>
                <span className="font-medium">Dislikes:</span> {patient.dislikes.join(", ")}
              </p>
            </CardContent>
          </CustomCard>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full max-w-full mt-6">
        {/* Reports - Full Width */}
        <CustomCard className="col-span-6 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-between items-center">
                <CardTitle className="text-custom-dark-purple">Reports</CardTitle>
              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-black w-64 focus:outline-none focus:ring-2 focus:ring-custom-dark-purple"
              />
            </div>
                <Link href={`/patient/${slug}/reports/new`}>
                  <CustomButton className="bg-green-500 hover:bg-green-600 text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Submit Report
                  </CustomButton>
                </Link>
              </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div className="flex items-center flex-grow mr-4">
                      <FileText className="w-5 h-5 mr-2 text-custom-lilac" />
                      <div>
                        <span className="text-custom-lilac font-medium">{report.type} Report</span>
                        <p className="text-sm text-gray-500">{report.date}</p>
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 ${
                        report.approved
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "border border-green-500 text-green-500 hover:bg-green-50"
                      }`}
                    >
                      {report.approved ? "Approved" : "Needs Approval"}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white">No reports found..</p>
              )}
            </div>
          </CardContent>
        </CustomCard>

      {/* NurseHelp - Full Width */}
      <CustomCard className="col-span-6 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-red-500">NurseHelp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <Link
                    href="/patient/caregoals"
                    className="flex-1 bg-light-purple-lilac p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center"
                >
                  <Users className="w-5 h-5 mr-2"/>
                  <span className="text-dark-lilac font-medium">Caregoals</span>
                </Link>
                <Link
                    href={`/patient/${params.slug}/trend`}
                    className="flex-1 bg-light-purple-lilac p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center"
                >
                  <TrendingUp className="w-5 h-5 mr-2"/>
                  <span className="text-dark-lilac font-medium">Trend</span>
                </Link>
              </div>
            </CardContent>
          </CustomCard>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 space-x-4">
          <Link href="/platform">
            <CustomButton variant="outline">Back to Platform</CustomButton>
          </Link>
        
      </div>
    </main>
  );
}
