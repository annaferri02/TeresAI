import Link from "next/link";
import { CustomButton, CustomCard } from "@/components/ui/custom-styles";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Moon, ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default async function CreateHandoverPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // Get type and date from URL query parameters
  const type = searchParams?.type || "morning";
  const date = searchParams?.date || formatDate();

  // Function to format today's date as DD/MM/YYYY if not provided
  function formatDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  // Get the appropriate icon based on the handover type
  let HandoverIcon;
  let handoverTitle;
  
  switch(type) {
    case "noon":
      HandoverIcon = Sun;
      handoverTitle = "Noon Handover";
      break;
    case "evening":
      HandoverIcon = Moon;
      handoverTitle = "Evening Handover";
      break;
    case "morning":
    default:
      HandoverIcon = Cloud;
      handoverTitle = "Morning Handover";
      break;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Link href="/newhandover" className="flex items-center text-custom-dark-purple hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Back to Handover Options
          </Link>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <HandoverIcon className="mr-3 text-custom-lilac" size={30} />
          <h1 className="text-3xl font-bold text-custom-dark-purple">
            {handoverTitle} ({date})
          </h1>
        </div>
        
        <form className="space-y-6 w-full">
          <CustomCard>
            <CardHeader>
              <CardTitle className="text-white text-custom-dark-purple">
                Patient Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter important updates about patients here..." 
                className="min-h-32"
              />
            </CardContent>
          </CustomCard>
          
          <CustomCard>
            <CardHeader>
              <CardTitle className="text-white text-custom-dark-purple">
                Important Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter important tasks to be completed during the shift..." 
                className="min-h-32"
              />
            </CardContent>
          </CustomCard>
          
          <CustomCard>
            <CardHeader>
              <CardTitle className="text-white text-custom-dark-purple">
                Notes & Other Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter any additional notes or information..." 
                className="min-h-32"
              />
            </CardContent>
          </CustomCard>
          
          <div className="flex justify-center space-x-4">
            <Link href="/platform">
              <CustomButton variant="outline">
                Cancel
              </CustomButton>
            </Link>
            <CustomButton type="submit">
              Save Handover
            </CustomButton>
          </div>
        </form>
      </div>
    </main>
  );
}