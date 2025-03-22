import { AuthStep } from "@/types/auth";
import { useState } from "react";

export const useSteps = (initialStep: AuthStep) => {
  const steps: AuthStep[] = [
    "phone",
    "otp",
    "info",
    "calendar",
    "service",
    "newService",
    "home",
    "dashboardCalendar",
    "dashboardServices",
    "profile",
    "turnDetail",
    "cancelTurn",
    "editTurn",
    "newTurn",
    "setTurn",
  ];
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return { currentStep, setCurrentStep, goToNextStep, goToPrevStep, steps };
};
