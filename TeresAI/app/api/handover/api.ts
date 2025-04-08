// pages/api/handovers.ts

import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rows] = await db.execute(`
      SELECT 
        reports.id AS reportId,
        patients.name AS name,
        patients.surname AS surname,
        reports.created_at AS date,
        reports.approved AS approved
        reports.type AS type
      FROM reports
      JOIN patients ON reports.id_patient = patients.id
      WHERE reports.created_at < CURRENT_DATE
      ORDER BY reports.created_at DESC
    `);

    const handovers = (rows as any[]).map((row) => ({
      id: row.reportId.toString(),
      name: `${row.name} ${row.surname}`,
      date: row.date.toISOString().split("T")[0],
      completed: !!row.approved,
      tasks: [
        "Monitor vital signs regularly",
        "Ensure medication adherence",
        "Provide mobility assistance",
        "Evaluate pain and comfort levels",
      ], // fittizi
    }));

    res.status(200).json({ handovers });
  } catch (error) {
    console.error("Error fetching handovers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
