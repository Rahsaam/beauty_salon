"use client";
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { message } from "antd";
import React from "react";

export function useProxyQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  options: UseQueryOptions<TQueryFnData, TError, TData> & {
    showAlert?: boolean;
  }
): UseQueryResult<TData, TError> {
  const { queryKey, queryFn, showAlert, ...rest } = options;

  const result = useQuery({
    queryKey,
    queryFn,
    ...rest,
  });

  React.useEffect(() => {
    if (result.isError && showAlert) {
      const errorMessage =
        (
          result.error as unknown as {
            response?: { data?: { message?: string } };
          }
        )?.response?.data?.message || "خطایی رخ داده است";

      message.error(errorMessage);
    }
  }, [result.isError, showAlert, result.error]);

  return result;
}
