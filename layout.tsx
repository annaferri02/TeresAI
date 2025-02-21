import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TeresAI Medical Transcription',
  description: 'Medical transcription and documentation system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
          <nav className="bg-darkblue-900 text-white p-4">
            <div className="container mx-auto">
              TeresAI
            </div>
          </nav>
          <div className="bg-purple-500 p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}