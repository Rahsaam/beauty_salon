import React from "react";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineHelpOutline } from "react-icons/md";
import { RiNotification3Line } from "react-icons/ri";

interface IActionLink {
  title: string | React.ReactNode;
  isArrow: boolean;
  handleAction: () => void;
  isNotif: boolean;
}

export default function ActionLink({
  title,
  isArrow,
  handleAction,
  isNotif,
}: IActionLink) {
  return (
    <div className="flex justify-between items-center text-[#7F2549]">
      <div onClick={handleAction} className="flex items-center gap-1">
        {isArrow && <GoArrowRight className="text-xl" />}
        <h1 className="pr-1 font-bold">{title}</h1>
      </div>
      <div>
        {isNotif ? (
          <RiNotification3Line />
        ) : (
          <MdOutlineHelpOutline className="text-xl" />
        )}
      </div>
    </div>
  );
}
