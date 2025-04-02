// app/previous_report/[id]/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import db from "@/lib/db";

// Import dinamico del client component con `"use client"`
import dynamic from "next/dynamic";

const ClientPreviousReport = dynamic(() => import("./ClientPreviousReport"), { ssr: false });

interface PageProps {
  params: {
    id: string;
  };
}

export default async function TranscriptPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/login");

  const [patientId] = params.id.split("-");
  const [[patient]] = await db.execute("SELECT * FROM patients WHERE id = ?", [patientId]);
  const patientName = `${patient.name} ${patient.surname}`;

  return <ClientPreviousReport id={params.id} patientName={patientName} />;
}
