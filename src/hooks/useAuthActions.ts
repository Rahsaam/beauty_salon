"use client";
import requestOtp from "@/api/Auth/requestOtp";
import verifyOtp from "@/api/Auth/verifyOtp";
import { useProxyMutation } from "./useProxyMutation";
import professionalSignup from "@/api/Auth/ProfessionalSignup";
import { useProxyQuery } from "./useProxyQuery";
import getProfile from "@/api/Auth/getProfile";
import { message } from "antd";

export const useAuthActions = () => {
  const requestOtpMutation = useProxyMutation({
    mutationFn: requestOtp,
    showAlert: true,
  });

  
  
  const verifyOtpMutation = useProxyMutation({
    mutationFn: verifyOtp,
    showAlert: true,
  });


  const professionalSignupMutation = useProxyMutation({
    mutationFn: professionalSignup,
    onSuccess: () => {
      message.success('حساب کاربری به متخصص تبدیل شد.')
    },
    showAlert: true,
  });


  const getProfileQuery = useProxyQuery({
    queryFn: getProfile,
    queryKey: ['getProfile'],
    showAlert: true,
  });

  return { requestOtpMutation, verifyOtpMutation, professionalSignupMutation, getProfileQuery };
};
