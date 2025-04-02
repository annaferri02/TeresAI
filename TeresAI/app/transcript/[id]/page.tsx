import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import ClientTranscript from "./ClientTranscript";

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

  return <ClientTranscript id={params.id} patientName={patientName} />;
}
