// lib/db.ts
import mysql from "mysql2/promise";

// In dev, reuse the connection pool across hot reloads
declare global {
  var dbPool: mysql.Pool | undefined;
}

const pool = global.dbPool ?? mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

if (process.env.NODE_ENV !== "production") global.dbPool = pool;

export default pool;
