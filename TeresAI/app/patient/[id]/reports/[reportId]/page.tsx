"use client";
import Link from "next/link"

export default function ReportPage({ params }: { params: { reportId: string } }) {
  const reportTypes = {
    "1": "End-of-day",
    "2": "Medication",
    "3": "Family-visit",
    "4": "Hygiene",
    "5": "Mental health",
    "6": "Sleep",
  }

  const reportType = reportTypes[params.reportId as keyof typeof reportTypes] || "Unknown"

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-light-purple-lilac text-dark-lilac p-4">
        <h1 className="text-2xl font-bold">TeresAI</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-light-purple-lilac p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-dark-lilac mb-4">{reportType} Report</h2>
          <p className="mb-4">This is a placeholder for the {reportType.toLowerCase()} report content.</p>
          <Link href="/patient" className="text-dark-lilac hover:text-white underline">
            Back to Patient Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}

