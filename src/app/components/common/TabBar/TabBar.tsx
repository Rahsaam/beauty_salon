"use client";
import "./TabBar.css";
import { RiHome5Line } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { AuthStep } from "@/types/auth";

const TabBar = () => {
  const { currentStep, setCurrentStep } = useAuth();

  const handleTabClick = (index: AuthStep) => {
    setCurrentStep(index);
  };

  return (
    <div className="tabBarContainer">
      <div className="tabBar mt-">
        <ul className="tabList">
          <li
            className={`tabItem ${currentStep === "home" ? "active" : ""}`}
            onClick={() => handleTabClick("home")}
          >
            <RiHome5Line className="text-xl" />
            <span className="text-xs font-extralight">خانه</span>
          </li>
          <li
            className={`tabItem ${
              currentStep === "dashboardCalendar" ? "active" : ""
            }`}
            onClick={() => handleTabClick("dashboardCalendar")}
          >
            <IoCalendarOutline className="text-xl" />
            <span className="text-xs font-extralight">تقویم</span>
          </li>
          <li
            className={`tabItem main ${
              currentStep === "newTurn" ? "active" : ""
            }`}
            onClick={() => handleTabClick("newTurn")}
          >
            <FiPlus className="text-xl" color="#6F0E37" />
          </li>
          <li
            className={`tabItem ${
              currentStep === "dashboardServices" ? "active" : ""
            }`}
            onClick={() => handleTabClick("dashboardServices")}
          >
            <MdElectricBolt className="text-xl" />
            <span className="text-xs font-extralight">خدمات</span>
          </li>
          <li
            className={`tabItem ${currentStep === "profile" ? "active" : ""}`}
            onClick={() => handleTabClick("profile")}
          >
            <CgProfile className="text-xl" />
            <span className="text-xs font-extralight">پروفایل</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabBar;
