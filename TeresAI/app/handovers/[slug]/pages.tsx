import Link from "next/link";
import { CustomButton, CustomCard } from "@/components/ui/custom-styles";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Moon, ArrowLeft, Clock } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HandoverViewPage({ params }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // Parse the slug to get handover type and date
  const { slug } = params;
  const slugParts = slug.split('-');
  
  // Extract handover type and format date
  const handoverType = slugParts[0] || "morning";
  const day = slugParts[1] || "01";
  const month = slugParts[2] || "01";
  const year = slugParts[3] || "2025";
  const formattedDate = `${day}/${month}/${year}`;

  // Get the appropriate icon based on the handover type
  let HandoverIcon;
  let handoverTitle;
  
  switch(handoverType.toLowerCase()) {
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
          <Link href="/platform" className="flex items-center text-custom-dark-purple hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Back to Platform
          </Link>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <HandoverIcon className="mr-3 text-custom-lilac" size={30} />
          <h1 className="text-3xl font-bold text-custom-dark-purple">
            {handoverTitle} ({formattedDate})
          </h1>
        </div>
        
        <div className="space-y-6 w-full">
          <CustomCard>
            <CardHeader>
              <CardTitle className="text-white text-custom-dark-purple flex items-center">
                <Clock className="mr-2" />
                Patient Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold text-custom-dark-purple">Walter White</h3>
                  <p className="text-custom-lilac">Patient is stable but showing signs of agitation. Blood pressure remains elevated (145/90). Has been refusing morning medication but took afternoon dose without issue.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-custom-dark-purple">Frank Castle</h3>
                  <p className="text-custom-lilac">Wound dressing was changed. Minimal drainage noted. Patient reports pain level of 3/10, down from 5/10 yesterday. Continues physical therapy exercises as instructed.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-custom-dark-purple">Agnes Skinner</h3>
                  <p className="text-custom-lilac">Patient slept well through the night. Mobility improving with walker. Family visited today and brought personal items. Appetite has improved since medication adjustment.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-custom-dark-purple">Rose Tyler</h3>
                  <p className="text-custom-lilac">Completed first round of new treatment with no adverse reactions. Vitals stable. Patient in good spirits but mentioned increased fatigue in the evening.</p>
                </li>
              </ul>
            </CardContent>
          </CustomCard>
          
          <CustomCard>
            <CardHeader>
              <CardTitle className="text-white text-custom-dark-purple">
                Important Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-custom-dark-purple">Schedule follow-up CT scan for Walter White</li>
                <li className="text-custom-dark-purple">Contact Dr. Richards regarding Agnes Skinner's medication adjustment</li>
                <li className="text-custom-dark-purple">Ensure Frank Castle attends physical therapy session at 2 PM</li>
                <li className="text-custom-dark-purple">Monitor Rose Tyler for treatment side effects over next 24 hours</li>
                <li className="text-custom-dark-purple">Restock supply cabinet on east wing</li>
                <li className="text-custom-dark-purple">Complete incident report for yesterday's emergency code</li>
              </ul>
            </CardContent>
          </CustomCard>
          
          <CustomCard>
            <CardHeader>
              <CardTitle className="text-white text-custom-dark-purple">
                Notes & Other Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-custom-lilac mb-3">Shift was generally quiet with no major incidents. Staff meeting scheduled for tomorrow at 9 AM to discuss upcoming facility inspection.</p>
              <p className="text-custom-lilac mb-3">New admission expected tomorrow afternoon - please prepare room 203.</p>
              <p className="text-custom-lilac">Maintenance has been notified about the temperature control issue in the west wing. They will address it tomorrow morning.</p>
            </CardContent>
          </CustomCard>
          
          <div className="flex justify-center space-x-4 mt-8">
            <Link href="/platform">
              <CustomButton variant="outline">
                Back to Platform
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}