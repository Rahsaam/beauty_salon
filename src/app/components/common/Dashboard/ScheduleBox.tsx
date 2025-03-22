import React from "react";
import ScheduleCard from "./ScheduleCard";
import { IGetAppointment } from "@/types/api";

interface ScheduleBoxProps {
  appointments: IGetAppointment[];
  date?: string;
}

export default function ScheduleBox({ appointments, date }: ScheduleBoxProps) {
  console.log("appointments ", appointments);

  return (
    <div className="border border-[#EBE1E1] p-4 rounded-lg mt-4 w-full">
      {date && <h3 className="text-sm font-semibold mb-2">{date}</h3>}
      {appointments && appointments.length > 0 ? (
        <>
          {appointments.map((appointment) => (
            <ScheduleCard key={appointment.id} appointment={appointment} />
          ))}
        </>
      ) : (
        <p>نوبتی ثبت نشده است.</p>
      )}
    </div>
  );
}