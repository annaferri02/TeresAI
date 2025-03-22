import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {CustomButton} from "@/components/ui/custom-styles"
import { signOut } from 'next-auth/react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const { email, role, created_at } = session.user;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-8 text-custom-lilac">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg border bg-white">
        <h1 className="text-2xl font-bold mb-4 text-custom-dark-purple">Your Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{email}</p>
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
