export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { TrendingUp, TrendingDown, TrendingUpDown } from "lucide-react"
import Link from "next/link";
import {CustomButton, CustomCard} from "@/components/ui/custom-styles";
import TrendBox from "@/components/trendbox";
import { Noto_Emoji } from "next/font/google";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";

interface PageProps {
  params: {
    slug: string;
  };
}

async function callAiProcessingAPI() {
  const response = await fetch('/api/ai-processing', {
    method: 'POST', // or 'GET' if your route is GET-based
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'hello world', // replace with your actual payload
    }),
  });

  const data = await response.json();
  console.log('Response:', data);
}

export default async function TrendPage({ params }: PageProps) {
  const slug = params.slug as string;

  // Assuming the format is always "id-firstname-lastname"
  const [id, firstName, lastName] = slug.split('-');
  const [reports] = await db.execute(
    "SELECT content FROM reports WHERE id_patient = ?",
    [id]
  );
  
  // UPDATED CODE SECTION STARTS HERE
  let trends = [];
  try {
    const answer = await fetch('http://localhost:3000/api/ai-processing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ files: reports }),
    });

    if (!answer.ok) {
      console.error(`API responded with status: ${answer.status}`);
      throw new Error(`API error: ${answer.status}`);
    }

    const data = await answer.json();
    console.log("API response data:", data); // Debug log
    
    // Make sure trends is always an array
    trends = Array.isArray(data.results) ? data.results : [];
  } catch (error) {
    console.error("Error processing trends:", error);
    // Provide fallback data
    trends = [
      { direction: "neutral", description: "Error loading trends. Please try again later.", emoji: "⚠️" }
    ];
  }
  // UPDATED CODE SECTION ENDS HERE

  return (
    <div className="min-h-screen bg-white">
      {/*<header className="bg-light-purple-lilac text-dark-lilac p-4">
        <h1 className="text-2xl font-bold">TeresAI</h1>
      </header>*/}
      <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac ">
        
          <CustomCard className="max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center text-white text-custom-dark-purple gap-1"><TrendingUpDown />Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {trends.map((trend, index) => (
                  <li key={index} className="my-4 text-custom-dark-purple">
                    <TrendBox direction={trend.direction} description={trend.description} emoji={trend.emoji}></TrendBox>
                  </li>
                ))}
              </ul>
            </CardContent>
          </CustomCard>
        <div className="mt-12 space-x-4">
          <Link href={`/patient/${slug}`}>
            <CustomButton variant="outline">Back to Patient's Dashboard</CustomButton>
          </Link>
        </div>
      </main>
    </div>
  )
}

