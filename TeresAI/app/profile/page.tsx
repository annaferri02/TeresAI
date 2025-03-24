import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {CustomButton} from "@/components/ui/custom-styles"
import { signOut } from 'next-auth/react';
import mysql from "mysql2/promise";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
  });

  const email = session.user.email;
  
  const [rows] = await db.execute(
    "SELECT role, created_at FROM users WHERE email = ?",
    [session.user.email]
  );

  const user = rows[0];
  const created = new Date(user.created_at).toLocaleString();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-8 text-custom-lilac">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg border bg-white">
        <h1 className="text-2xl font-bold mb-4 text-custom-dark-purple">Your Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-medium">{user.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User since</p>
            <p className="text-lg font-medium">{created}</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <CustomButton
              type="submit"
              className="mt-6 w-full text-white py-2 px-4 rounded-lg text-lg"
            >
              Sign out
            </CustomButton>
          </form>
        </div>
      </div>
    </main>
  );
}
