"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CustomButton } from "@/components/ui/custom-styles"
import { Edit, CheckCircle, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useTranscriptionsStore } from "@/lib/transcriptionsStore"

const ALLOWED_SECTIONS = ["Eating Behaviour", "Sleep", "Medicine Administration", "Energy", "Pain Complaints", "Stool", "Blood Pressure"];

const SummaryBlock = ({ title, date, hours, data, onEdit, onSave, onCancel, onChange, isEditing, isLocked }) => {
    return (
        <div className="p-4 rounded-md bg-white text-custom-dark-purple border border-custom-lilac w-full max-w-4xl">
            <h3 className="text-lg font-semibold flex justify-between items-center">
                {title}
            </h3>
            <p className="text-sm">{date} {hours}</p>
            {isEditing ? (
                <>
                    <Textarea value={data} onChange={onChange} className="text-custom-dark-purple bg-white w-full"/>
                    <div className="flex space-x-2 mt-2">
                        <button onClick={onSave} className="text-custom-dark-purple hover:text-custom-dark-purple">
                            <CheckCircle className="h-4 w-4"/>
                        </button>
                        <button onClick={onCancel} className="text-custom-dark-purple hover:text-custom-dark-purple">
                            <X className="h-4 w-4"/>
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-sm whitespace-pre-wrap w-full">{data}</p>
            )}
        </div>
    );
};

const patients = [
    {id: 1, name: "Reijnder Gravenberg" },
];

export default function TranscriptPage({ params }) {
    const { transcriptions, updateTranscription } = useTranscriptionsStore();
    const transcriptData = transcriptions.find((t) => t.id === params.id);

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
        <main className="flex min-h-screen flex-col items-center p-10 bg-white text-custom-lilac">
            <div className="flex min-h-screen flex-col items-center bg-custom-lilac rounded-lg shadow-lg w-full max-w-4xl p-10">
                <h1 className="text-4xl font-bold text-custom-dark-purple mb-8 mt-4 p-3">{patientName} 'Report </h1>
                <div className="gap-8 space-y-4 w-full max-w-4xl">
                    {transcript.patientSummary.map((block, index) => (
                        <SummaryBlock
                            key={index}
                            title={block.title}
                            date={block.date}
                            hours={block.hours}
                            data={editingIndex === index ? editedSummary[index].data : block.data}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-12 space-x-4">
                <Link href="/platform">
                    <CustomButton variant="outline">Back to Platform</CustomButton>
                </Link>
            </div>
        </main>
    );
}
