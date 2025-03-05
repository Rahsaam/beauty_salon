// context/AuthContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useAuthActions } from "@/hooks/useAuthActions";

type AuthStep = "phone" | "otp" | "info";

type AuthContextType = {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  otp: string;
  setOtp: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  activity: string;
  setActivity: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  handleVerify: () => Promise<void>;
  loading: boolean;
  error: string | null;
  setError: (value: string) => void;
  currentStep: AuthStep;
  setCurrentStep: (step: AuthStep) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  handleResendOtp: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<AuthStep>("phone");
  const { requestOtpMutation, verifyOtpMutation } = useAuthActions();

  const goToNextStep = () => {
    const steps: AuthStep[] = ["phone", "otp", "info"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    const steps: AuthStep[] = ["phone", "otp", "info"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError(null);

    try {
      if (currentStep === "phone") {
        await requestOtpMutation.mutateAsync({ phone_number: phoneNumber });
        goToNextStep();
      }

      if (currentStep === "otp") {
        await verifyOtpMutation.mutateAsync({ phone_number: phoneNumber, otp });
        goToNextStep();
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      await requestOtpMutation.mutateAsync({ phone_number: phoneNumber });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("خطا در ارسال مجدد کد");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        otp,
        setOtp,
        name,
        setName,
        activity,
        setActivity,
        city,
        setCity,
        handleVerify,
        loading,
        error,
        setError,
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToPrevStep,
        handleResendOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
