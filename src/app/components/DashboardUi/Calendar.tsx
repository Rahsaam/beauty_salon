"use client";

import React, { useState } from "react";
import { Segmented, Spin } from "antd";
import ScheduleBox from "@/app/components/common/Dashboard/ScheduleBox";
import { useAuth } from "@/context/AuthContext";
import { useProxyQuery } from "@/hooks/useProxyQuery";
import { getAppointments } from "@/api/Calendar/appointment";
import PersianDate from "persian-date"; // اضافه کردن کتابخونه
import { IGetAppointment } from "@/types/api";

export default function Calendar() {
  const [selectedOption, setSelectedOption] = useState<string>("futureTurns");
  const { professionalId } = useAuth();

  interface GroupedAppointmentsResult {
    date: string;
    appointments: IGetAppointment[];
  }

  type GroupedAppointments = {
    [key: string]: IGetAppointment[];
  };

  const handleSegmentChange = (value: string) => {
    setSelectedOption(value);
  };

  const getAppointmentsQuery = useProxyQuery({
    queryKey: ["appointments", professionalId],
    queryFn: () => getAppointments(professionalId),
    showAlert: true,
    enabled: !!professionalId,
  });

  const appointments = getAppointmentsQuery.data || [];

  const groupAppointmentsByDate = (
    appointments: IGetAppointment[]
  ): GroupedAppointmentsResult[] => {
    const grouped: GroupedAppointments = {};

    appointments.forEach((appointment) => {
      const date = appointment.appointment_date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(appointment);
    });

    return Object.keys(grouped).map((date) => ({
      date,
      appointments: grouped[date],
    }));
  };

  // گروه‌بندی نوبت‌ها
  const groupedAppointments = groupAppointmentsByDate(appointments);

  // تابع تبدیل تاریخ به فرمت شمسی پارسی
  const formatPersianDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    const pd = new PersianDate(new Date(dateStr));
    return pd.format("D MMMM YYYY");
  };

  return (
    <div className="mt-20">
      <Segmented
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
          {getAppointmentsQuery.isLoading ? (
            <div className="loading-container">
              <Spin size="large" tip="در حال بارگذاری..." />
            </div>
          ) : groupedAppointments.length > 0 ? (
            groupedAppointments.map((group) => (
              <ScheduleBox
                key={group.date}
                date={formatPersianDate(group.date)}
                appointments={group.appointments}
              />
            ))
          ) : (
            <div className="no-appointments">
              <p>نوبتی ثبت نشده است.</p>
            </div>
          )}
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
