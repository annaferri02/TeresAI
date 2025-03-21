import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    console.log("Connecting to the database...");

    // Connect to MySQL Database
    const connection = await mysql.createConnection({
      host: "localhost", // Change if needed
      user: "root", // Your database user
      password: "Anna2002", // Your database password
      database: "DatabaseSBE", // Your database name
      port: 3306,
    });

    console.log("Connected to database!");

    // Query user by email
    const [rows]: any = await connection.execute("SELECT * FROM user WHERE email = ?", [email]);

    await connection.end();
    
    console.log("Query executed successfully!");

    if (rows.length === 0) {
      console.log("User not found.");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    console.log("User found:", user);

    console.log("input ", password );
    console.log("actual password ", user.password);

    // Compare passwords
    const isMatch = password === user.password;
    if (!isMatch) {
      console.log("Invalid credentials.");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log("Login successful!");

    return NextResponse.json({
      message: "Login successful",
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
