import { NextResponse } from 'next/server';
import db from '@/lib/db';
import type { ResultSetHeader } from 'mysql2';

export async function POST(req: Request) {
  const body = await req.json();
  const { patientID, file, reportType } = body;

  const [result] = await db.execute<ResultSetHeader>(
    `INSERT INTO reports (id_patient, approved, content, type) VALUES (?, ?, ?, ?)`,
    [patientID, 0, JSON.stringify(file), reportType]
  );

  return NextResponse.json({ success: result.affectedRows > 0, id: result.insertId });
}