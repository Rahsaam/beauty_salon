"use client";
import requestOtp from "@/api/Auth/requestOtp";
import verifyOtp from "@/api/Auth/verifyOtp";
import { useProxyMutation } from "../hooks/useProxyMutation";

export const useAuthActions = () => {
  const requestOtpMutation = useProxyMutation({
    mutationFn: requestOtp,
    showAlert: true,
  });

  
  
  const verifyOtpMutation = useProxyMutation({
    mutationFn: verifyOtp,
    showAlert: true,
  });

  return { requestOtpMutation, verifyOtpMutation };
};
