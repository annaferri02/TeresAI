import Link from "next/link"
import { FileText, Users, TrendingUp } from "lucide-react"

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
        <div className="space-y-2">
          {patient.reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
              <div className="flex items-center flex-grow mr-4">
                <FileText className="w-5 h-5 mr-2 text-dark-lilac" />
                <div>
                  <span className="text-dark-lilac font-medium">{report.type} Report</span>
                  <p className="text-sm text-gray-500">{report.date}</p>
                </div>
              </div>
              <Link
                href={`/patient/reports/${report.id}`}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 ${
                  report.approved
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "border border-green-500 text-green-500 hover:bg-green-50"
                }`}
              >
                {report.approved ? "Approved" : "Needs Approval"}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg relative">
        <h3 className="text-xl font-semibold text-red-500 absolute -top-3 left-4 bg-white px-2">NurseHelp</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Link
            href="/patient/caregoals"
            className="bg-light-purple-lilac p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center"
          >
            <Users className="w-5 h-5 mr-2" />
            <span className="text-dark-lilac font-medium">Caregoals</span>
          </Link>
          <Link
            href="/patient/trend"
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
