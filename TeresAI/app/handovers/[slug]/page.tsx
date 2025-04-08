import Link from "next/link";
import { CustomButton, CustomCard } from "@/components/ui/custom-styles";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Moon, ArrowLeft, Clock, Clipboard, FileText } from "lucide-react";
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
            <CardContent className="space-y-6">
              {/* Walter White */}
              <div>
                <h3 className="font-semibold text-custom-dark-purple text-lg mb-3">Walter White</h3>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Vital Signs:</span>
                    <p className="text-custom-lilac">BP 145/90, HR 78, Temp 37.1°C, RR 16, O2 Sat 98% on room air</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Medications:</span>
                    <p className="text-custom-lilac">Refused morning dose of Captopril, took all other medications as scheduled. Afternoon dose administered without issue.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Mental Status:</span>
                    <p className="text-custom-lilac">Alert but agitated. Oriented to person, place, and time. Complaining about food quality.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Plan:</span>
                    <p className="text-custom-lilac">Monitor blood pressure closely. Follow up with physician regarding medication refusal. CT scan scheduled for tomorrow.</p>
                  </div>
                </div>
              </div>
              
              {/* Frank Castle */}
              <div>
                <h3 className="font-semibold text-custom-dark-purple text-lg mb-3">Frank Castle</h3>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Wound Care:</span>
                    <p className="text-custom-lilac">Dressing changed at 09:30. Minimal serous drainage noted. Wound edges well-approximated. No signs of infection.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Pain Management:</span>
                    <p className="text-custom-lilac">Reports pain 3/10, down from 5/10 yesterday. Last dose of Tramadol at 08:00, effective.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Mobility:</span>
                    <p className="text-custom-lilac">Ambulated 30m with walker this morning. Completed all prescribed exercises with minimal assistance.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Plan:</span>
                    <p className="text-custom-lilac">Continue PT sessions. Gradually reduce pain medication as tolerated. Physical therapy appointment at 14:00 today.</p>
                  </div>
                </div>
              </div>
              
              {/* Agnes Skinner */}
              <div>
                <h3 className="font-semibold text-custom-dark-purple text-lg mb-3">Agnes Skinner</h3>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Sleep Pattern:</span>
                    <p className="text-custom-lilac">Slept well through the night without sedation. Reports feeling rested this morning.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Nutrition:</span>
                    <p className="text-custom-lilac">Appetite improved, consumed 80% of breakfast and all of lunch. Hydration adequate.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Social:</span>
                    <p className="text-custom-lilac">Family visited 11:00-12:30. Brought personal items and family photos. Patient mood notably improved after visit.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Plan:</span>
                    <p className="text-custom-lilac">Continue with medication adjustment. Consult with Dr. Richards regarding progress. Encourage mobility with walker.</p>
                  </div>
                </div>
              </div>
              
              {/* Rose Tyler */}
              <div>
                <h3 className="font-semibold text-custom-dark-purple text-lg mb-3">Rose Tyler</h3>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Treatment:</span>
                    <p className="text-custom-lilac">First course of new medication administered at 10:30. No immediate adverse reactions observed.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Vital Signs:</span>
                    <p className="text-custom-lilac">All vitals stable during and after treatment. BP 120/75, HR 82, Temp 36.8°C.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Symptom Management:</span>
                    <p className="text-custom-lilac">Reports increased fatigue in the evening (6/10). No nausea, pain well controlled with current regimen.</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <span className="font-medium text-custom-dark-purple">Plan:</span>
                    <p className="text-custom-lilac">Monitor for treatment side effects over next 24 hours. Encourage rest periods. Follow up labs scheduled for tomorrow.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </CustomCard>
          
          <CustomCard>
            <CardHeader>
              <CardTitle className="text-white text-custom-dark-purple flex items-center">
                <Clipboard className="mr-2" />
                Important Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-custom-dark-purple">Schedule follow-up CT scan for Walter White</div>
                <p className="text-sm text-custom-lilac mt-1">Need to coordinate with radiology department. Priority: High. Contact Dr. Goodman for approval.</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-custom-dark-purple">Contact Dr. Richards regarding Agnes Skinner's medication adjustment</div>
                <p className="text-sm text-custom-lilac mt-1">Discuss improved appetite and sleep patterns after dose reduction. Call during office hours (9AM-5PM).</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-custom-dark-purple">Ensure Frank Castle attends physical therapy session at 2 PM</div>
                <p className="text-sm text-custom-lilac mt-1">Arrange porter service if needed. Patient may need pain medication 30 minutes before session.</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-custom-dark-purple">Monitor Rose Tyler for treatment side effects over next 24 hours</div>
                <p className="text-sm text-custom-lilac mt-1">Check vitals every 4 hours. Be alert for nausea, fever, or unusual fatigue. Have antiemetics ready if needed.</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-custom-dark-purple">Restock supply cabinet on east wing</div>
                <p className="text-sm text-custom-lilac mt-1">Low on dressing supplies, alcohol wipes, and medium gloves. Submit order form to procurement.</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium text-custom-dark-purple">Complete incident report for yesterday's emergency code</div>
                <p className="text-sm text-custom-lilac mt-1">Form located in nurse manager's office. Due by end of shift today. Include all staff who responded.</p>
              </div>
            </CardContent>
          </CustomCard>
          
          <CustomCard>
            <CardHeader>
              <CardTitle className="text-white text-custom-dark-purple flex items-center">
                <FileText className="mr-2" />
                Notes & Other Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-custom-dark-purple mb-1">Staff Updates</h3>
                <p className="text-custom-lilac">Staff meeting scheduled for tomorrow at 9 AM in the conference room to discuss upcoming facility inspection on April 15th. All available staff should attend.</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-custom-dark-purple mb-1">Admissions & Discharges</h3>
                <p className="text-custom-lilac">New admission expected tomorrow afternoon - Eleanor Rigby, 78y/o female with CHF exacerbation. Please prepare room 203. Discharge planned for Gus Fring tomorrow morning, discharge summary pending.</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-custom-dark-purple mb-1">Facility Issues</h3>
                <p className="text-custom-lilac">Maintenance has been notified about the temperature control issue in the west wing. They will address it tomorrow morning. Call extension 2145 if temperature drops below 68°F overnight.</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-custom-dark-purple mb-1">Medication Alerts</h3>
                <p className="text-custom-lilac">Pharmacy notified us of potential delay in delivery of IV antibiotics due to supplier issue. Current stock sufficient for next 48 hours. Will update when resolved.</p>
              </div>
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