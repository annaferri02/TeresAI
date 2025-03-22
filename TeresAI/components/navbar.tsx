'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User, Settings, LogIn, LogOut } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full p-4 bg-gray-800 text-white flex items-center justify-between">
      <Link href="/platform" className="text-3xl font-bold tracking-tight">
        TeresAI
      </Link>

      <div className="flex items-center gap-4">
        {status === 'loading' ? (
          <span>Loading...</span>
        ) : session?.user ? (
          <>
            <Link href="/profile" title="Profile">
              <User className="w-6 h-6 hover:opacity-80" />
            </Link>
            <Link href="/settings" title="Settings">
              <Settings className="w-6 h-6 hover:opacity-80" />
            </Link>
            <button onClick={() => signOut()} title="Sign out">
              <LogOut className="w-6 h-6 hover:opacity-80" />
            </button>
          </>
        ) : (
          <Link href="/login" title="Sign in" className="btn">
            <LogIn className="w-6 h-6 hover:opacity-80" />
          </Link>
        )}
      </div>
    </nav>
  );
}
