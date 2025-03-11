import React from "react";
import ProfileImage from "../ProfileImage";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function ProfileCard() {
  return (
    <div className="w-full border !border-[#EBE1E1] rounded-lg !mt-4 flex justify-between items-center p-3">
      <div className="flex justify-between items-center">
        <ProfileImage hasImage={true} />
        <div className="mr-5">
          <h2 className="text-sm font-light">هنگامه شمس</h2>
          <h2 className="font-bold">09120486852</h2>
        </div>
      </div>
      <RiArrowLeftSLine
        className="self-center"
        color="#6F0E37"
        width={24}
        height={24}
      />
    </div>
  );
}
