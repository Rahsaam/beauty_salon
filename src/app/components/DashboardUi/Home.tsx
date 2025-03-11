"use client";
import { PiSunDimLight } from "react-icons/pi";
import { LiaHandsHelpingSolid } from "react-icons/lia";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const {name} = useAuth();
    const firstName = name.split(' ')[0];
  return (
    <div className="mt-20">
      <div>
        <h1 className="text-[20px] font-bold">{firstName} جان وقت بخیر...</h1>
        <h3 className="mt-2">
          خانم‌های زیادی منتظر خدماتی هستن که با عشق ارایه میدی...
        </h3>
      </div>
      <div className="flex w-full justify-between mt-5">
        <div className="border border-[#CBBFC4] rounded-2xl flex flex-col items-center justify-center space-y-4 w-[47%] mx-auto h-48">
          <div className="bg-[#EBDFE3] p-3 rounded-full flex justify-center items-center">
            <PiSunDimLight className="text-3xl" color="#6F0E37" />
          </div>
          <div className="flex flex-col items-center mt-4">
            <span className="text-[22px] font-bold">4</span>
            <span className="text-xs text-[#CBBFC4] font-extralight mt-2">
              نوبت های رزرو شده‌ی امروز
            </span>
          </div>
        </div>
        <div className="border border-[#CBBFC4] rounded-2xl flex flex-col items-center justify-center space-y-4 w-[47%] mx-auto h-48">
        <div className="bg-[#EBDFE3] p-3 rounded-full flex justify-center items-center">
          <LiaHandsHelpingSolid
            className="text-3xl"
            color="#6F0E37"
          />
          </div>
          <div className="flex flex-col items-center mt-4">
            <span className="text-[22px] font-bold">120</span>
            <span className="text-xs text-[#CBBFC4] font-extralight mt-2">
              خدمات ارایه شده
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
