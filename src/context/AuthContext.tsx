// context/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useSteps } from "@/hooks/useSteps";
import { useWorkHours } from "@/hooks/useWorkHours";
import { AuthStep, DayKey, WorkHours } from "@/types/auth";
import { Dayjs } from "dayjs";
import { IAppointment } from "@/types/api";
import { Dispatch, SetStateAction } from "react";

type AuthContextType = {
  phoneNumber: string;
  otp: string;
  name: string;
  city: string;
  loading: boolean;
  error: string | null;
  currentStep: AuthStep;
  workHours: WorkHours;
  repeat: string;
  myServices: string;
  category: string;
  price: string;
  timing: string;
  professionalId: string | null;
  selectedAppointment: IAppointment | null;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  setSelectedAppointment: (value: IAppointment | null) => void;
  setTiming: (value: string) => void;
  setPrice: (value: string) => void;
  setCategory: (value: string) => void;
  setMyServices: (value: string) => void;
  setRepeat: (value: string) => void;
  setCurrentStep: (step: AuthStep) => void;
  setPhoneNumber: (value: string) => void;
  setOtp: (value: string) => void;
  setName: (value: string) => void;
  setCity: (value: string) => void;
  setError: (value: string) => void;
  handleVerify: () => Promise<void>;
  handleResendOtp: () => Promise<void>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  setWorkHours: Dispatch<SetStateAction<WorkHours>>;
  addWorkHours: (day: DayKey) => void;
  removeWorkHours: (day: DayKey, id: number) => void;
  updateWorkHours: (
    day: DayKey,
    id: number,
    type: "startTime" | "endTime",
    time: Dayjs
  ) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [myServices, setMyServices] = useState("");
  const [category, setCategory] = useState("دسته بندی");
  const [repeat, setRepeat] = useState("");
  const [price, setPrice] = useState("");
  const [timing, setTiming] = useState("");
  const [professionalId, setProfessionalId] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { currentStep, setCurrentStep, goToNextStep, goToPrevStep } =
    useSteps("phone");
  const {
    workHours,
    setWorkHours,
    addWorkHours,
    removeWorkHours,
    updateWorkHours,
  } = useWorkHours();
  const {
    requestOtpMutation,
    verifyOtpMutation,
    professionalSignupMutation,
    getProfileQuery,
  } = useAuthActions();

  useEffect(() => {
    if (getProfileQuery.isSuccess && getProfileQuery.data?.profile?.id) {
      setProfessionalId(getProfileQuery.data.profile.id);
      localStorage.setItem("professionalId", getProfileQuery.data.profile.id);
    }
  }, [getProfileQuery.isSuccess, getProfileQuery.data]);

  useEffect(() => {
    const savedProfessionalId = localStorage.getItem("professionalId");
    if (savedProfessionalId && !professionalId) {
      setProfessionalId(savedProfessionalId);
    }
  }, [professionalId]);

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError(null);

      if (currentStep === "phone") {
        await requestOtpMutation.mutateAsync({ phone_number: phoneNumber });
        goToNextStep();
      }

      if (currentStep === "otp") {
        await verifyOtpMutation.mutateAsync({ phone_number: phoneNumber, otp });
        await professionalSignupMutation.mutateAsync();
        await getProfileQuery.refetch();
        
        goToNextStep();
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    if (savedName) setName(savedName);
  }, []);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setError(null);
      await requestOtpMutation.mutateAsync({ phone_number: phoneNumber });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        phoneNumber,
        otp,
        name,
        city,
        loading,
        error,
        currentStep,
        workHours,
        repeat,
        myServices,
        category,
        price,
        timing,
        professionalId,
        selectedAppointment,
        selectedDate,
        setSelectedDate,
        setSelectedAppointment,
        setTiming,
        setPrice,
        setCategory,
        setMyServices,
        setRepeat,
        setCurrentStep,
        setPhoneNumber,
        setOtp,
        setName,
        setCity,
        setError,
        handleVerify,
        handleResendOtp,
        goToNextStep,
        goToPrevStep,
        setWorkHours,
        addWorkHours,
        removeWorkHours,
        updateWorkHours,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
