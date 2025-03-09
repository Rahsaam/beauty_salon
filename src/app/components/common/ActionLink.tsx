import { useAuth } from "@/context/AuthContext";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineHelpOutline } from "react-icons/md";

export default function ActionLink({title}: {title: string}) {
  const {goToPrevStep} = useAuth()
  return (
    <div className="flex justify-between items-center text-[#7F2549]">
      <div onClick={goToPrevStep} className="flex items-center gap-1">
        <GoArrowRight className="text-xl"/>
        <h1 className="pr-1 font-bold">{title}</h1>
      </div>
      <div>
        <MdOutlineHelpOutline className="text-xl"/>
      </div>
    </div>
  );
}
