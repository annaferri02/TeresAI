"use client"

import { useState } from "react"
import Link from "next/link"
import { Upload, MessageCircle, Brain, Activity } from "lucide-react"
import { CustomButton, CustomCard } from "@/components/ui/custom-styles"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams, useRouter } from 'next/navigation'
import db from "@/lib/db";

export default function NewReportPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState("")
  const [reportType, setReportType] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const selectReportType = (type: string) => {
    setReportType(type)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      setMessage("Please select a JSON file first")
      return
    }
    
    if (!reportType) {
      setMessage("Please select a report type")
      return
    }
    
    // Check if the file is JSON
    if (!file.name.endsWith('.json')) {
      setMessage("Please upload a JSON file")
      return
    }
    
    setIsUploading(true)
    setMessage("Uploading report...")
    
    try {
      // Here you would actually send the file to your API
      // For now, we'll just simulate success after a delay
      
      // Uncomment this when you're ready to implement the actual API call
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('patientId', slug.split('-')[0])
      formData.append('reportType', reportType)

      const patientID = slug.split('-')[0]
      
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientID,
          file,
          reportType
        })
      });
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      
      setMessage("Report uploaded successfully!")
      
      // Redirect back to patient page after a short delay
      setTimeout(() => {
        router.push(`/patient/${slug}`)
      }, 2500)
      
    } catch (error) {
      setMessage("Error uploading report. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white text-custom-lilac">
      <main className="flex flex-col items-center justify-center rounded-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-custom-dark-purple mb-8">
          Submit New Report
        </h1>
        
        <CustomCard className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-custom-dark-purple">Select Report Type</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="grid grid-cols-1 gap-4 w-full mb-6">
              <CustomButton
                type="button" 
                onClick={() => selectReportType('Conversation')}
                className={`bg-white text-custom-lilac border-white hover:bg-gray-100 text-md h-16 ${
                  reportType === 'Conversation' 
                    ? 'bg-white text-purple-700 border shadow-[0_0_20px_4px_rgba(255,255,255,0.8)]' 
                    : 'bg-white text-custom-lilac border-white hover:bg-gray-100 text-md h-16'
                }`}
              >
                <MessageCircle className="text-custom-lilac" />
                <span className="text-custom-dark-purple">Upload Patient Conversation</span>
              </CustomButton>
              
              <CustomButton
                type="button" 
                onClick={() => selectReportType('Mental-Health')}
                className={`bg-white text-custom-lilac border-white hover:bg-gray-100 text-md h-16 ${
                  reportType === 'Mental-Health' 
                    ? 'bg-white text-purple-700 border shadow-[0_0_20px_4px_rgba(255,255,255,0.8)]' 
                    : 'bg-white text-custom-lilac border-white hover:bg-gray-100 text-md h-16'
                }`}
              >
                <Brain className="text-custom-lilac" />
                <span className="text-custom-dark-purple">Upload Mental Health Report</span>
              </CustomButton>
              
              <CustomButton
                type="button" 
                onClick={() => selectReportType('Physio')}
                className={`bg-white text-custom-lilac border-white hover:bg-gray-100 text-md h-16 ${
                  reportType === 'Physio' 
                    ? 'bg-white text-purple-700 border shadow-[0_0_20px_4px_rgba(255,255,255,0.8)]' 
                    : 'bg-white text-custom-lilac border-white hover:bg-gray-100 text-md h-16'
                }`}
              >
                <Activity className="w-5 h-5 mr-3 text-custom-lilac" />
                <span className="text-custom-dark-purple">Upload Physical Evaluation</span>
              </CustomButton>
            </div>
            
            {reportType && (
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="flex flex-col items-center justify-center w-full">
                  <label 
                    htmlFor="file-upload" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-light-purple-lilac rounded-lg cursor-pointer bg-light-purple-lilac bg-opacity-10 hover:bg-opacity-20 transition-all"
                  >
                    <div className="flex flex-col items-center justify-center pt-4 pb-4">
                      {file ? 
                        <div className="mt-1 text-sm text-center text-custom-dark-purple">
                          Selected file: <span className="font-semibold">{file.name}</span>
                        </div> 
                        :
                        <div>
                          <Upload className="w-8 h-8 mb-2 text-custom-dark-purple m-auto" />
                          <p className="text-sm text-center text-custom-dark-purple">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-center text-custom-lilac">JSON files only</p>
                        </div>
                        }
                    </div>
                    
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".json"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                
                {message && (
                  <div className={`p-3 rounded-md text-center ${
                    message.includes("successfully") 
                      ? "bg-green-100 text-green-800" 
                      : message.includes("Uploading") 
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                  }`}>
                    {message}
                  </div>
                )}
                
                <div className="flex space-x-4 justify-center">
                  <Link href={`/patient/${slug}`}>
                    <CustomButton variant="outline" type="button">
                      Cancel
                    </CustomButton>
                  </Link>
                  
                  <CustomButton 
                    type="submit" 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    disabled={!file || isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload Report"}
                  </CustomButton>
                </div>
              </form>
            )}
          </CardContent>
        </CustomCard>
      </main>
    </div>
  )
}
