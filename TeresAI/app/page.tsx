import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold text-center mb-8">HealthCare Audio Pin</h1>
      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-2xl">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Nurse wearing HealthCare Audio Pin"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <p className="text-3xl font-bold mb-4">Smart Recording, Smarter Care</p>
          <p className="text-xl mb-8">Revolutionizing patient care documentation</p>
          <Link href="/product">
            <Button size="lg">Learn More</Button>
          </Link>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-6">
        <Link href="/platform">
          <Button variant="outline" size="lg" className="w-full">
            View Platform
          </Button>
        </Link>
        <Link href="/transcriptions">
          <Button variant="outline" size="lg" className="w-full">
            View Transcriptions
          </Button>
        </Link>
      </div>
    </main>
  )
}

