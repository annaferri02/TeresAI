"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, CheckCircle, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { CustomButton } from "@/components/ui/custom-styles";
import { useTranscriptionsStore } from "@/lib/transcriptionsStore";

const ALLOWED_SECTIONS = ["Eating Behaviour", "Sleep", "Medicine Administration", "Energy", "Pain Complaints", "Stool", "Blood Pressure"];

export default function ClientTranscript({ id, patientName }: { id: string; patientName: string }) {
  const { transcriptions, updateTranscription } = useTranscriptionsStore();
  const transcript = transcriptions.find((t) => t.id === id);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedSummary, setEditedSummary] = useState(
    transcript?.patientSummary.map((block) => ({ ...block })) || []
  );
  const [lockedSections, setLockedSections] = useState<Set<string>>(new Set());

  const handleEdit = (index: number) => {
    const title = transcript.patientSummary[index].title;
    if (ALLOWED_SECTIONS.includes(title) && !lockedSections.has(title)) {
      setEditingIndex(index);
    }
  };

  const handleSave = (index: number) => {
    const title = transcript.patientSummary[index].title;
    if (ALLOWED_SECTIONS.includes(title) && !lockedSections.has(title)) {
      const updatedSummary = [...editedSummary];
      transcript.patientSummary[index].data = updatedSummary[index].data;
      updateTranscription(transcript.id, { patientSummary: updatedSummary });
      setEditingIndex(null);
      setLockedSections(new Set([...lockedSections, title]));
    }
  };

  const handleCancel = () => {
    setEditedSummary(transcript.patientSummary.map((block) => ({ ...block })));
    setEditingIndex(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-white text-custom-lilac">
      <div className="flex min-h-screen flex-col items-center bg-custom-lilac rounded-lg shadow-lg w-full max-w-4xl p-10">
        <h1 className="text-4xl font-bold text-custom-dark-purple mb-8 mt-4 p-3">{patientName}'s Report</h1>
        <div className="gap-8 space-y-4 w-full max-w-4xl">
          {transcript?.patientSummary.map((block, index) => (
            <div key={index} className="p-4 rounded-md bg-white text-custom-dark-purple border border-custom-lilac w-full">
              <h3 className="text-lg font-semibold flex justify-between items-center">
                {block.title}
                {editingIndex !== index &&
                  ALLOWED_SECTIONS.includes(block.title) &&
                  !lockedSections.has(block.title) && (
                    <button onClick={() => handleEdit(index)} className="text-custom-dark-purple hover:text-custom-lilac">
                      <Edit className="h-4 w-4" />
                    </button>
                  )}
              </h3>
              <p className="text-sm">{block.date} {block.hours}</p>
              {editingIndex === index ? (
                <>
                  <Textarea
                    value={editedSummary[index].data}
                    onChange={(e) => {
                      const updated = [...editedSummary];
                      updated[index].data = e.target.value;
                      setEditedSummary(updated);
                    }}
                    className="text-custom-dark-purple bg-white w-full"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => handleSave(index)} className="text-custom-dark-purple hover:text-custom-dark-purple">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button onClick={handleCancel} className="text-custom-dark-purple hover:text-custom-dark-purple">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-sm whitespace-pre-wrap w-full">{block.data}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 space-x-4">
        <Link href="/platform">
          <CustomButton variant="outline">Back to Platform</CustomButton>
        </Link>
        <Link href="/platform">
          <CustomButton variant="outline">Approve</CustomButton>
        </Link>
      </div>
    </main>
  );
}
