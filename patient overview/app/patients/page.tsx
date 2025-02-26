import Link from "next/link"
import {
  Moon,
  Droplets,
  Pill,
  Smile,
  BombIcon as Balloon,
  ZapIcon as ZZZ,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react"

type Report = {
  type: string
  id: string
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
  const getReportIcon = (type: string) => {
    switch (type) {
      case "End-of-day":
        return <Moon className="w-5 h-5 mr-2" />
      case "Hygiene":
        return <Droplets className="w-5 h-5 mr-2" />
      case "Medication":
        return <Pill className="w-5 h-5 mr-2" />
      case "Mental health":
        return <Smile className="w-5 h-5 mr-2" />
      case "Family-visit":
        return <Balloon className="w-5 h-5 mr-2" />
      case "Sleep":
        return <ZZZ className="w-5 h-5 mr-2" />
      default:
        return <FileText className="w-5 h-5 mr-2" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-light-blue p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-dark-lilac mb-4">Personal Information</h3>
        <p>
          <span className="font-medium">Age:</span> {patient.age}
        </p>
        <p>
          <span className="font-medium">Gender:</span> {patient.gender}
        </p>
      </div>
      <div className="bg-light-blue p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-dark-lilac mb-4">Medical Information</h3>
        <p>
          <span className="font-medium">Intolerances:</span> {patient.intolerances.join(", ")}
        </p>
        <p>
          <span className="font-medium">Allergies:</span> {patient.allergies.join(", ")}
        </p>
        <p>
          <span className="font-medium">Dislikes:</span> {patient.dislikes.join(", ")}
        </p>
      </div>
      <div className="md:col-span-2 bg-light-purple-lilac p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-dark-lilac mb-4">Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {patient.reports.map((report) => (
            <Link
              key={report.id}
              href={`/patient/reports/${report.id}`}
              className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center"
            >
              {getReportIcon(report.type)}
              <span className="text-dark-lilac font-medium">{report.type} Report</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg relative">
        <h3 className="text-xl font-semibold text-red-500 absolute -top-3 left-4 bg-white px-2">NurseHelp</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Link
            href="#"
            className="bg-light-purple-lilac p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center"
          >
            <Users className="w-5 h-5 mr-2" />
            <span className="text-dark-lilac font-medium">Caregoals</span>
          </Link>
          <Link
            href="#"
            className="bg-light-purple-lilac p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="text-dark-lilac font-medium">Trend</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
