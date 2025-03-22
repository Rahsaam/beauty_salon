"use client";

import React, { Suspense, useEffect } from "react";
import ActionLink from "@/app/components/common/ActionLink";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import TabBar from "@/app/components/common/TabBar/TabBar";
import { usePathname } from "next/navigation";
import Home from "@/app/components/DashboardUi/Home";
import Calendar from "@/app/components/DashboardUi/Calendar";
import Services from "@/app/components/DashboardUi/Services";
import Profile from "@/app/components/DashboardUi/Profile";
import ActionButtons from "@/app/components/common/ActionButtons";
import DetailTurn from "@/app/components/DashboardUi/DetailTurn";
import CancelReasonCard from "@/app/components/DashboardUi/CancelReason";
import MainCalendar from "@/app/components/DashboardUi/MainCalendar/MainCalendar";
import SetTurn from "@/app/components/DashboardUi/setTurn";

export default function Page() {
  const { currentStep, goToPrevStep, setCurrentStep, selectedDate } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard") {
      setCurrentStep("home");
    }
  }, [pathname, setCurrentStep]);

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
      case "turnDetail":
        return <DetailTurn />;
      case "cancelTurn":
        return <CancelReasonCard />;
      case "editTurn":
        return <MainCalendar />;
      case "newTurn":
        return <MainCalendar />;
      case "setTurn":
        return <SetTurn />;
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
              title={<HiOutlineMenuAlt3 className="font-bold text-xl" />}
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
          {currentStep === "turnDetail" && (
            <ActionLink
              title="جزییات نوبت"
              isArrow={true}
              handleAction={goToPrevStep}
              isNotif={false}
            />
          )}
          {currentStep === "cancelTurn" && (
            <ActionLink
              title="لغو نوبت"
              isArrow={true}
              handleAction={goToPrevStep}
              isNotif={false}
            />
          )}
          {currentStep === "editTurn" && (
            <ActionLink
              title="ویرایش نوبت"
              isArrow={true}
              handleAction={goToPrevStep}
              isNotif={false}
            />
          )}
          {currentStep === "setTurn" && (
            <ActionLink
              title="انتخاب ساعت"
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


      {["turnDetail", "cancelTurn", "editTurn", 'newTurn', 'setTurn'].includes(currentStep) ? (
        currentStep === "turnDetail" ? (
          <ActionButtons
            leftBtn="لغو نوبت"
            rightBtn="ویرایش"
            hasBorder={true}
            onLeftClick={() => setCurrentStep('cancelTurn')}
            onRightClick={() => setCurrentStep('editTurn')}
          />
        ) : currentStep === "cancelTurn" ? (
          <ActionButtons
            leftBtn="لغو نوبت"
            rightBtn="انصراف"
            hasBorder={false}
            onLeftClick={() => alert('نوبت لغو شد')}
            onRightClick={() => setCurrentStep('dashboardCalendar')}
          />
        ) : currentStep === "editTurn" ? (
          <ActionButtons
            leftBtn="ثبت تغییرات"
            rightBtn="انصراف"
            hasBorder={false}
            onLeftClick={() => alert('تغییرات ثبت گردید')}
            onRightClick={() => setCurrentStep('dashboardCalendar')}
          />
        ) : currentStep === "newTurn" ? (
          <ActionButtons
            leftBtn="ادامه"
            hasBorder={false}
            hideRightBtn={true}
            disableLeftBtn={!selectedDate} // غیرفعال وقتی selectedDate نباشه
            onLeftClick={() => selectedDate && setCurrentStep("setTurn")}
          />
        ): null
      ) : (
        <TabBar />
      )}
    </div>
  );
}
