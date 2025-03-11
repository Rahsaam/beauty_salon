"use client";

import React, { useState } from "react";
import { Segmented } from "antd";
import ScheduleBox from "@/app/components/common/Dashboard/ScheduleBox";

export default function Calendar() {
  const [selectedOption, setSelectedOption] = useState<string>("futureTurns");

  const handleSegmentChange = (value: string) => {
    setSelectedOption(value)
  }
  return (
    <div className="mt-20">
      <Segmented
        className="turnSegment"
        options={[
          {
            label: <div>نوبت‌های پیش‌رو 4</div>,
            value: "futureTurns",
          },
          {
            label: <div>در انتظار تایید 3</div>,
            value: "ongoingTurns",
          },
        ]}
        onChange={handleSegmentChange}
        value={selectedOption}
        block
      />

      {selectedOption === "futureTurns" && (
        <>
          <ScheduleBox />
          <ScheduleBox />
        </>
      )}

      {selectedOption === "ongoingTurns" && (
        <>
          <p>نوبت های در انتظار تایید</p>
        </>
      )}
    </div>
  );
}
