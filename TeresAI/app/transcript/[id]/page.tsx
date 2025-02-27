"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CustomButton } from "@/components/ui/custom-styles"
import { Edit, CheckCircle, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useTranscriptionsStore } from "@/lib/transcriptionsStore"

const ALLOWED_SECTIONS = ["Eating Behaviour", "Care Goals"];

const SummaryBlock = ({ title, data, onEdit, onSave, onCancel, onChange, isEditing, isLocked }) => {
  return (
      <div className="p-6 rounded-md bg-custom-lilac text-white border border-white hover:border-custom-lilac w-full min-h-[200px]">
        <h3 className="text-xl font-semibold mb-4 flex justify-between items-center">
          {title}
          {!isEditing && ALLOWED_SECTIONS.includes(title) && !isLocked ? (
              <button onClick={onEdit} className="text-white hover:text-custom-dark-purple">
                <Edit className="h-4 w-4" />
              </button>
          ) : null}
        </h3>
        {isEditing ? (
            <>
              <Textarea value={data} onChange={onChange} className="text-custom-lilac bg-white" />
              <div className="flex space-x-2 mt-2">
                <button onClick={onSave} className="text-white hover:text-custom-dark-purple">
                  <CheckCircle className="h-4 w-4" />
                </button>
                <button onClick={onCancel} className="text-white hover:text-custom-dark-purple">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </>
        ) : (
            <p className="text-sm whitespace-pre-wrap">{data}</p>
        )}
      </div>
  );
};

// Lista dei pazienti importata dalla pagina /platform
const patients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Robert Johnson" },
  { id: 4, name: "Emily Brown" },
];

export default function TranscriptPage({ params }) {
  const { transcriptions, updateTranscription } = useTranscriptionsStore();
  const transcriptData = transcriptions.find((t) => t.id === params.id);

  // Trova il paziente basandoti sull'ID
  const patient = patients.find((p) => p.id === Number(params.id));
  const patientName = patient ? patient.name : "Unknown Patient";

  const [transcript, setTranscript] = useState(transcriptData);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSummary, setEditedSummary] = useState(transcript.patientSummary.map((block) => ({ ...block })));
  const [lockedSections, setLockedSections] = useState(new Set());

  const handleEdit = (index) => {
    if (ALLOWED_SECTIONS.includes(transcript.patientSummary[index].title) && !lockedSections.has(transcript.patientSummary[index].title)) {
      setEditingIndex(index);
    }
  };

  const handleSave = (index) => {
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
      <main className="flex min-h-screen flex-col items-center p-24 bg-white text-custom-lilac">
        <h1 className="text-4xl font-bold text-custom-dark-purple mb-8">{patientName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transcript.patientSummary.map((block, index) => (
              <SummaryBlock
                  key={index}
                  title={block.title}
                  data={editingIndex === index ? editedSummary[index].data : block.data}
                  onEdit={() => handleEdit(index)}
                  onSave={() => handleSave(index)}
                  onCancel={handleCancel}
                  onChange={(e) => {
                    if (ALLOWED_SECTIONS.includes(block.title)) {
                      const newSummary = [...editedSummary];
                      newSummary[index].data = e.target.value;
                      setEditedSummary(newSummary);
                    }
                  }}
                  isEditing={editingIndex === index}
                  isLocked={lockedSections.has(block.title)}
              />
          ))}
        </div>

        <div className="mt-12 space-x-4">
          <Link href="/platform">
            <CustomButton variant="outline">Back to Platform</CustomButton>
          </Link>
        </div>
      </main>
  );
}

