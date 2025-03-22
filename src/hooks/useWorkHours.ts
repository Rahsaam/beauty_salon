// hooks/useWorkHours.ts
"use client";

import { useEffect, useState } from "react";
import { DayKey, TimeRange, WorkHours } from "../types/auth";
import dayjs, { Dayjs } from "dayjs";

const initialWorkHours: WorkHours = {
  شنبه: [],
  "یک‌شنبه": [],
  دوشنبه: [],
  "سه‌شنبه": [],
  چهارشنبه: [],
  "پنج‌شنبه": [],
  جمعه: [],
};

interface SerializedTimeRange {
  id: number;
  startTime: string;
  endTime: string;
}

// تبدیل به فرمت قابل ذخیره در localStorage
const serializeWorkHoursForStorage = (workHours: WorkHours): string => {
  const serialized: Record<DayKey, SerializedTimeRange[]> = {} as Record<DayKey, SerializedTimeRange[]>;
  for (const day in workHours) {
    serialized[day as DayKey] = workHours[day as DayKey].map((timeRange) => ({
      id: timeRange.id,
      startTime: timeRange.startTime.format("HH:mm"), // فقط ساعت و دقیقه
      endTime: timeRange.endTime.format("HH:mm"), // فقط ساعت و دقیقه
    }));
  }
  return JSON.stringify(serialized);
};

// تبدیل از localStorage به اشیاء قابل استفاده
const parseWorkHoursFromStorage = (rawWorkHours: string): WorkHours => {
  const parsed: Record<string, SerializedTimeRange[]> = JSON.parse(rawWorkHours);
  const workHours: WorkHours = {} as WorkHours;

  for (const day in parsed) {
    workHours[day as DayKey] = parsed[day].map((row) => ({
      id: row.id,
      startTime: dayjs(row.startTime, "HH:mm"),
      endTime: dayjs(row.endTime, "HH:mm"),
    }));
  }
  
  return workHours;
};

export const useWorkHours = () => {
  const [workHours, setWorkHours] = useState<WorkHours>(initialWorkHours);

  useEffect(() => {
    // فقط در مرورگر اجرا می‌شود
    const savedWorkHours = localStorage.getItem("workHours");
    if (savedWorkHours) {
      try {
        setWorkHours(parseWorkHoursFromStorage(JSON.parse(savedWorkHours)));
      } catch (error) {
        console.error("Error parsing work hours from localStorage:", error);
        localStorage.removeItem("workHours"); // حذف داده‌های معیوب
      }
    }
  }, []); // فقط یک بار در mount اجرا می‌شود

  const generateId = () => Date.now();

  const addWorkHours = (day: DayKey, newRow?: TimeRange) => {
    const timeRange: TimeRange = newRow || {
      id: generateId(),
      startTime: dayjs().startOf("hour"),
      endTime: dayjs().startOf("hour").add(1, "hour"),
    };

    setWorkHours((prev) => {
      const updated = {
        ...prev,
        [day]: [...prev[day], timeRange],
      };
      localStorage.setItem("workHours", serializeWorkHoursForStorage(updated));
      return updated;
    });
  };

  const removeWorkHours = (day: DayKey, id: number) => {
    setWorkHours((prev) => {
      const updated = {
        ...prev,
        [day]: prev[day].filter((timeRange) => timeRange.id !== id),
      };
      localStorage.setItem("workHours", serializeWorkHoursForStorage(updated));
      return updated;
    });
  };

  const updateWorkHours = (
    day: DayKey,
    id: number,
    type: "startTime" | "endTime",
    time: Dayjs | null
  ) => {
    if (!time) return;

    setWorkHours((prev) => {
      const updated = {
        ...prev,
        [day]: prev[day].map((timeRange) =>
          timeRange.id === id ? { ...timeRange, [type]: time } : timeRange
        ),
      };
      localStorage.setItem("workHours", serializeWorkHoursForStorage(updated));
      return updated;
    });
  };

  return {
    workHours,
    setWorkHours,
    addWorkHours,
    removeWorkHours,
    updateWorkHours,
  };
};