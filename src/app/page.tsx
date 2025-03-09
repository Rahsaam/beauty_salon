"use client";

import { Button, Flex } from "antd";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
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
        <div className="onboarding ">
          <h1 className="text-lg sm:text-xl md:text-2xl tracking-[20px] font-extralight text-[#F2F2F2]">
            LOGO
          </h1>
          <Flex vertical style={{ width: "60%" }}>
            <Button style={{borderColor: 'white', color: 'white'}} block variant="outlined" ghost>
              دریافت نوبت
            </Button>
            <div className="text-center w-full mt-6">
              <Link className="!text-white !underline" href="/Auth">
                متخصص زیبایی هستم
              </Link>
            </div>
          </Flex>
        </div>
      )}
    </div>
  );
}
