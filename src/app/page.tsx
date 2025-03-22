"use client";

import { Button, Flex } from "antd";
import { Suspense, useEffect, useState } from "react";
import Loading from "./Loading";
import { useRouter } from "nextjs-toploader/app";
// import { useAuthActions } from "@/hooks/useAuthActions";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const {professionalSignupMutation} = useAuthActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  async function goToAuthPage() {
    // await professionalSignupMutation.mutateAsync();
    router.push("/Auth");
  }
  return (
    <div className="container">
      {isLoading ? (
        <div className="p-4 sm:p-6 md:p-8 first-loading-container">
          <h1 className="text-lg sm:text-xl md:text-2xl tracking-[20px] font-extralight text-[#F2F2F2]">
            LOGO
          </h1>
          <span className="!block font-extralight text-white">
            version 0.0.1
          </span>
        </div>
      ) : (
        <Suspense fallback={<Loading />}>
          <div className="onboarding">
            <h1 className="text-lg sm:text-xl md:text-2xl tracking-[20px] font-extralight text-[#F2F2F2]">
              LOGO
            </h1>
            <Flex vertical style={{ width: "60%" }}>
              <Button
                style={{ borderColor: "white", color: "white" }}
                block
                variant="outlined"
                ghost
              >
                دریافت نوبت
              </Button>

              <Button
                style={{ borderColor: "white", color: "white" }}
                variant="outlined"
                ghost
                className="mt-4"
                onClick={goToAuthPage}
              >
                متخصص زیبایی هستم
              </Button>
            </Flex>
          </div>
        </Suspense>
      )}
    </div>
  );
}
