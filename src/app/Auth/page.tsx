"use client";
import "@ant-design/v5-patch-for-react-19";
import { Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import PhoneNumber from "@/app/components/AuthUi/PhoneNumber";
import GetOtp from "@/app/components/AuthUi/GetOtp";
import Info from "@/app/components/AuthUi/Info";
import WorkCalendar from "@/app/components/AuthUi/WorkCalendar";
import ActionLink from "@/app/components/common/ActionLink";
import MyServices from "@/app/components/AuthUi/MyServices";
import AddNewService from "@/app/components/AuthUi/AddNewService";

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
      case "calendar":
        return <WorkCalendar />;
      case "service":
        return <MyServices />;
      case "newService":
        return <AddNewService />;
      default:
        return <PhoneNumber />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between mx-auto ">
      {["phone", "otp", "info"].includes(currentStep) ? (
        <div className="p-4 w-full">
          <h1 className="text-lg w-full text-center mt-10 sm:text-xl md:text-2xl tracking-[20px] font-extralight">
            LOGO
          </h1>
        </div>
      ) : (
        <div className="w-full bg-[#FBF8F9] mb-2 z-100 fixed top-0">
          <div className="w-full max-w-[390px] mx-auto p-4 my-2">
            {currentStep === "calendar" && <ActionLink title="تقویم کاری" />}
            {currentStep === "service" && <ActionLink title="خدمات من" />}
            {currentStep === "newService" && <ActionLink title="اضافه کردن خدمت جدید" />}
          </div>
        </div>
      )}
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <main className="flex-1 flex items-center w-full justify-center p-4">
          <div className="w-full max-w-[390px] mx-auto">{renderStep()}</div>
        </main>
      </Suspense>
    </div>
  );
}
