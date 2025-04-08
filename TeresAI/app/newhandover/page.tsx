import Link from "next/link";
import { CustomButton, CustomCard } from "@/components/ui/custom-styles";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Moon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function NewHandoverPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // Function to format today's date as DD/MM/YYYY
  const formatDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  const todayDate = formatDate();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-white text-custom-lilac">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-custom-dark-purple mb-8 text-center">Create New Handover</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Morning Handover Card */}
          <div className="relative overflow-hidden rounded-lg">
            <CustomCard className="h-64 flex flex-col justify-between items-center relative z-10">
              <Cloud className="absolute right-4 top-4 text-white opacity-50" size={100} />
              <CardHeader className="w-full">
                <CardTitle className="text-white text-custom-dark-purple text-center">
                  Morning Handover
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center w-full flex flex-col items-center pb-6">
                <p className="mb-4 text-custom-dark-purple">Create a morning handover</p>
                <p className="mb-4 text-custom-dark-purple text-sm">for {todayDate}</p>
                <Link href={`/newhandover/createhandover?type=morning&date=${todayDate}`}>
                  <CustomButton className="flex-1 bg-white text-custom-lilac border-white p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center">
                    Create Morning Handover
                  </CustomButton>
                </Link>
              </CardContent>
            </CustomCard>
          </div>
          
          {/* Noon Handover Card */}
          <div className="relative overflow-hidden rounded-lg">
            <CustomCard className="h-64 flex flex-col justify-between items-center relative z-10">
              <Sun className="absolute right-4 top-4 text-white opacity-50" size={100} />
              <CardHeader className="w-full">
                <CardTitle className="text-white text-custom-dark-purple text-center">
                  Noon Handover
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center w-full flex flex-col items-center pb-6">
                <p className="mb-4 text-custom-dark-purple">Create a noon handover</p>
                <p className="mb-4 text-custom-dark-purple text-sm">for {todayDate}</p>
                <Link href={`/newhandover/createhandover?type=noon&date=${todayDate}`}>
                  <CustomButton className="flex-1 bg-white text-custom-lilac border-white p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center">
                    Create Noon Handover
                  </CustomButton>
                </Link>
              </CardContent>
            </CustomCard>
          </div>
          
          {/* Evening Handover Card */}
          <div className="relative overflow-hidden rounded-lg">
            <CustomCard className="h-64 flex flex-col justify-between items-center relative z-10">
              <Moon className="absolute right-4 top-4 text-white opacity-50" size={100} />
              <CardHeader className="w-full">
                <CardTitle className="text-white text-custom-dark-purple text-center">
                  Evening Handover
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center w-full flex flex-col items-center pb-6">
                <p className="mb-4 text-custom-dark-purple">Create an evening handover</p>
                <p className="mb-4 text-custom-dark-purple text-sm">for {todayDate}</p>
                <Link href={`/newhandover/createhandover?type=evening&date=${todayDate}`}>
                  <CustomButton className="flex-1 bg-white text-custom-lilac border-white p-4 rounded-lg shadow transition-transform hover:scale-105 flex items-center">
                    Create Evening Handover
                  </CustomButton>
                </Link>
              </CardContent>
            </CustomCard>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link href="/platform">
            <CustomButton variant="outline">Back to Platform</CustomButton>
          </Link>
        </div>
      </div>
    </main>
  );
}