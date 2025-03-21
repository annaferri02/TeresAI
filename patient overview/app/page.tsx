import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-light-purple-lilac p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-dark-lilac mb-4">Welcome to TeresAI</h1>
        <Link href="/patient" className="text-dark-lilac hover:text-white underline">
          View Patient Dashboard
        </Link>
      </div>
    </div>
  )
}
