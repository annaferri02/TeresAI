"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CustomButton, CustomCard } from "@/components/ui/custom-styles";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, FileDown } from "lucide-react";

type PatientHandover = {
  id: string;
  name: string;
  date: string;
  tasks: string[];
  completed: boolean;
};

export default function HandoverPage() {
  const [handovers, setHandovers] = useState<PatientHandover[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHandovers = async () => {
      try {
        const res = await fetch("/api/handover");
        const data = await res.json();

        const savedCompletions = JSON.parse(localStorage.getItem("handoverCompletions") || "[]");

        const updated = data.handovers.map((handover: PatientHandover) => ({
          ...handover,
          completed: savedCompletions.includes(handover.id),
        }));

        setHandovers(updated);
      } catch (error) {
        console.error("Errore durante il fetch dei handovers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHandovers();
  }, []);

  const toggleCompletion = (id: string) => {
    setHandovers((prev) => {
      const updated = prev.map((handover) =>
        handover.id === id ? { ...handover, completed: !handover.completed } : handover
      );

      const completedIds = updated.filter((h) => h.completed).map((h) => h.id);
      localStorage.setItem("handoverCompletions", JSON.stringify(completedIds));
      return updated;
    });
  };

  const downloadPatientReport = (patientName: string) => {
    console.log(`Downloading report for ${patientName}`);
    alert(`${patientName}'s Report successfully downloaded!`);
  };

  const handoversByDate = handovers.reduce((acc, handover) => {
    if (!acc[handover.date]) acc[handover.date] = [];
    acc[handover.date].push(handover);
    return acc;
  }, {} as Record<string, PatientHandover[]>);

  const sortedDates = Object.keys(handoversByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white text-custom-lilac">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-custom-dark-purple">HandOver</h1>
          <Link href="/platform">
            <CustomButton variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </CustomButton>
          </Link>
        </div>

        {loading && <p className="text-custom-dark-purple">Loading handovers...</p>}

        {!loading && sortedDates.map((date) => (
          <div key={date} className="mb-8">
            <div className="space-y-4">
              {handoversByDate[date].map((handover) => (
                <div key={handover.id} className="flex gap-4">
                  <div className="flex items-start pt-4">
                    <Checkbox
                      id={`complete-${handover.id}`}
                      checked={handover.completed}
                      onCheckedChange={() => toggleCompletion(handover.id)}
                      className="h-6 w-6 border-custom-lilac"
                    />
                  </div>

                  <CustomCard className={`flex-1 ${handover.completed ? "bg-opacity-70" : ""}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-custom-dark-purple flex justify-between items-center">
                        <span className="flex items-center">
                          {handover.name} <span className="ml-2">- {handover.date}</span>
                        </span>
                        <div className="flex items-center">
                          {handover.completed && (
                            <span className="text-green-600 flex items-center text-sm mr-3">
                              <Check className="h-4 w-4 mr-1" />
                              Completed
                            </span>
                          )}
                          <button
                            onClick={() => downloadPatientReport(handover.name)}
                            className="text-custom-dark-purple p-1 rounded-full hover:text-white transition-colors"
                            title="Download patient report"
                          >
                            <FileDown className="h-5 w-5" />
                          </button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-medium text-white mb-2">Activities and Trend:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-white">
                        {handover.tasks.map((task, index) => (
                          <li key={index}>{task}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </CustomCard>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
