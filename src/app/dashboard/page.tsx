"use client"

import React, { Suspense, useEffect } from "react";
import ActionLink from "@/app/components/common/ActionLink";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import TabBar from "@/app/components/common/TabBar/TabBar";
import { usePathname } from 'next/navigation';
import Home from "@/app/components/DashboardUi/Home";
import Calendar from "@/app/components/DashboardUi/Calendar";
import Services from "@/app/components/DashboardUi/Services";
import Profile from "@/app/components/DashboardUi/Profile";


export default function Page() {
  const { currentStep, goToPrevStep, setCurrentStep } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if(pathname === '/dashboard') {
      setCurrentStep('home');
    }
  }, [pathname, setCurrentStep])

  const renderStep = () => {
    switch (currentStep) {
      case "home":
        return <Home />;
      case "dashboardCalendar":
        return <Calendar />;
      // case "newTurn":
      //   return <Info />;
      case "dashboardServices":
        return <Services />;
      case "profile":
        return <Profile />;
      // default:
      //   return <Home />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between mx-auto">
      <div className="w-full bg-[#FBF8F9]  mb-2 z-100 fixed top-0">
        <div className="w-full mx-auto max-w-[390px] p-4 my-2">
          {currentStep === "home" && (
            <ActionLink
              title={<HiOutlineMenuAlt3 className="font-bold text-xl"/>}
              isArrow={false}
              handleAction={goToPrevStep}
              isNotif={true}
            />
          )}
          {currentStep === "dashboardCalendar" && (
            <ActionLink
              title="تقویم من"
              isArrow={false}
              handleAction={goToPrevStep}
              isNotif={false}
            />
          )}
          {currentStep === "newTurn" && (
            <ActionLink
              title="اضافه کردن خدمت جدید"
              isArrow={true}
              handleAction={goToPrevStep}
              isNotif={false}
            />
          )}
          {currentStep === "dashboardServices" && (
            <ActionLink
              title="خدمات من"
              isArrow={false}
              handleAction={goToPrevStep}
              isNotif={false}
            />
          )}
          {currentStep === "profile" && (
            <ActionLink
              title="اطلاعات کاربری"
              isArrow={true}
              handleAction={goToPrevStep}
              isNotif={false}
            />
          )}
        </div>
      </div>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <main className="flex-1 flex items-center w-full justify-center p-4">
          <div className="w-full max-w-[390px] mx-auto">{renderStep()}</div>
        </main>
      </Suspense>

      <TabBar />
    </div>
  );
}
