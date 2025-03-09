import { Dayjs } from "dayjs";

export type AuthStep = "phone" | "otp" | "info" | "calendar" | "service" | "newService";
export type DayKey =
  | "شنبه"
  | "یک‌شنبه"
  | "دوشنبه"
  | "سه‌شنبه"
  | "چهارشنبه"
  | "پنج‌شنبه"
  | "جمعه";

export type TimeRange = {
  id: number;
  startTime: Dayjs;
  endTime: Dayjs;
};

export type WorkHours = Record<DayKey, TimeRange[]>;

type WorkHourRow = {
  id: number;
  startTime: Dayjs;
  endTime: Dayjs;
};

export type WorkHoursRowWrapper = {
  [day: string]: WorkHourRow;
};

export type TimeType = "startTime" | "endTime";
