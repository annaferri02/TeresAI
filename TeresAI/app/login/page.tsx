"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // ✅ Add this
import Link from "next/link";
import { CustomButton, CustomCard } from "@/components/ui/custom-styles";
import { CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/platform"); // 👈 Redirect on successful login
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-custom-lilac">
      <CustomCard className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-custom-dark-purple text-center text-2xl">Log in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-lg">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-custom-dark-purple text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-lg">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white text-custom-dark-purple text-lg"
              />
            </div>

            {error && <p className="text-white bg-red-500 p-2 rounded-md text-sm">{error}</p>}

            <CustomButton type="submit" className="w-full text-lg">Login</CustomButton>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-white hover:underline text-sm">Back Home</Link>
        </CardFooter>
      </CustomCard>
    </main>
  );
}
