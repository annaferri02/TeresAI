'use client';

import { useState } from 'react';
import { PatientOverview } from "@/components/patient-overview";

interface Report {
  id: string;
  type: string;
  date: string;
  approved: boolean;
}

interface Patient {
  name: string;
  age: number;
  gender: string;
  intolerances: string[];
  allergies: string[];
  dislikes: string[];
  reports: Report[];
}

export default function ClientPatientPage({ patient }: { patient: Patient }) {
  const [search, setSearch] = useState('');

  const filteredReports = patient.reports.filter((report) =>
    report.type.toLowerCase().includes(search.toLowerCase()) ||
    report.date.includes(search)
  );

  return (
    <div className="flex justify-center w-full min-h-screen bg-white text-custom-lilac p-10">
    <main className="flex flex-col items-center justify-start rounded-lg w-full max-w-5xl p-16">
        <div className="flex justify-center items-center w-full mb-8">
        <h1 className="text-4xl font-bold text-custom-dark-purple text-center">
            {patient.name}'s Dashboard
        </h1>
        </div>

        <div className="w-full">
        <PatientOverview patient={{ ...patient, reports: filteredReports }} />
        </div>
    </main>
    </div>

  );
}
