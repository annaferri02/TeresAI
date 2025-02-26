import Link from "next/link"

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
              className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-105"
            >
              <span className="text-dark-lilac font-medium">{report.type} Report</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
