"use client";
import { useMutation, UseMutationResult, UseMutationOptions } from "@tanstack/react-query";
import { message } from "antd";

export function useProxyMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> & { showAlert?: boolean }
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { mutationFn, showAlert, onError, ...rest } = options;

  return useMutation({
    mutationFn,
    ...rest,
    onError: (error, variables, context) => {
      if (showAlert) {
        const errorMessage =
          (error as any)?.response?.data?.message || "خطایی رخ داده است";
        message.error(errorMessage);
      }
      onError?.(error, variables, context);
    },
  });
}