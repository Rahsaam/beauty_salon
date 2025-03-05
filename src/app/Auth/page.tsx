"use client";
import "@ant-design/v5-patch-for-react-19";
import { Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import PhoneNumber from "../components/AuthUi/PhoneNumber";
import GetOtp from "../components/AuthUi/GetOtp";
import Info from "../components/AuthUi/Info";

export default function Auth() {
  const { currentStep } = useAuth();

  const renderStep = () => {
    switch (currentStep) {
      case "phone":
        return <PhoneNumber />;
      case "otp":
        return <GetOtp />;
      case "info":
        return <Info />;
      default:
        return <PhoneNumber />;
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-between mx-auto min-h-screen p-4">
      <h1 className="text-lg mt-10 sm:text-xl md:text-2xl tracking-[20px] font-extralight">
        LOGO
      </h1>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <main className="flex-1 flex items-center w-full justify-center">
          <div className="w-full max-w-[350px] mx-auto">
            {renderStep()}
            </div>
        </main>
      </Suspense>
    </div>
  );
}
