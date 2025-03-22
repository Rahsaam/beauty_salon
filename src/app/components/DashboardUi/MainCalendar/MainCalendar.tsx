"use client";

import React, { useMemo, useState } from "react";
import "./MainCalendar.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import HourCalendarCard from "@/app/components/common/Dashboard/HourCalendarCard";
import { WeekDays } from "@/constance/WeekDays";
import dayjs from "dayjs";
import jalali from "jalaliday";
import ShamsiMonths from "@/constance/ShamsiMonths";
import { useAuth } from "@/context/AuthContext";
import { DayKey } from "@/types/auth";
import { useProxyMutation } from "@/hooks/useProxyMutation";
import { bookAppointment } from "@/api/Calendar/appointment";
import { Form, message } from "antd";
import { IBookingFormValues } from "@/types/props";
import { toFarsiDigits } from "@/helper/toFarsiDigits";
dayjs.extend(jalali);

// const weekDays = WeekDays.map(day => day.charAt(0));

const currentDate = dayjs();

export default function MainCalendar() {
  const { workHours, professionalId, setSelectedDate, selectedDate, repeat } =
    useAuth();
  const [currentMonth, setCurrentMonth] = useState(
    currentDate.calendar("jalali").month()
  );
  const [currentYear, setCurrentYear] = useState(
    currentDate.calendar("jalali").year()
  );
  const [form] = Form.useForm();

  const bookAppointmentMutation = useProxyMutation({
    mutationFn: bookAppointment,
    showAlert: true,
    onSuccess: (data) => {
      console.log("نوبت با موفقیت ثبت شد:", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  // const availableDays = [2, 5, 8, 12, 15, 18, 22, 25, 28];

  const handleDateClick = (day: number) => {
    // ساخت تاریخ شمسی
    const jalaliDate = dayjs()
      .calendar("jalali")
      .year(currentYear)
      .month(currentMonth)
      .date(day + 1)
      .locale("fa");

    // تبدیل به تاریخ میلادی و فرمت کردن
    const gregorianDate = jalaliDate.toDate(); // تبدیل به شیء Date میلادی
    const selected = dayjs(gregorianDate).format("YYYY-MM-DD"); // فرمت به میلادی

    setSelectedDate(selected);
    // setCurrentStep('setTurn')
    // setIsModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBooking = (values: IBookingFormValues) => {
    if (!professionalId) {
      message.error("شناسه متخصص پیدا نشد!");
      return;
    }

    const dayOfWeek = dayjs(selectedDate).locale("fa").format("dddd");

    const appointmentData = {
      professional_id: professionalId,
      customer_name: values.customer_name,
      customer_phone: values.customer_phone,
      service_type: values.service_type,
      appointment_date: selectedDate!,
      appointment_time: values.appointment_time.format("HH:mm"),
      address: values.address,
      day_of_week: dayOfWeek,
    };

    bookAppointmentMutation.mutateAsync(appointmentData, {
      onSuccess: () => {
        message.success("نوبت با موفقیت ثبت شد!");
        form.resetFields();
      },
    });
  };

  const getDaysInMonth = (year: number, month: number) => {
    if (year === 1403 && month === 11) {
      return 30;
    } else if (year === 1404 && month === 11) {
      return 29;
    } else {
      return dayjs()
        .calendar("jalali")
        .year(year)
        .month(month)
        .endOf("month")
        .date();
    }
  };

  const repeatWeeks = useMemo(() => {
    if (!repeat) return 0;
    return parseInt(repeat.split(" ")[0], 10); // مثلاً "2 هفته" -> 2
  }, [repeat]);

  const endDate = useMemo(() => {
    return currentDate.add(repeatWeeks, "week");
  }, [repeatWeeks]);

  const getFirstDayOfMonth = (year: number, month: number) => {
    let firstDay =
      dayjs()
        .calendar("jalali")
        .year(year)
        .month(month)
        .startOf("month")
        .day() + 1;
    if (year === 1404) {
      firstDay = (firstDay + 1) % 7 ;
    }
    return firstDay;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  return (
    <div className="mt-20">
      <h1 className="heading">تاریخ و ساعت نوبت جدید رو انتخاب کن</h1>
      <div className="calendar-app">
        <div className="calendar">
          <div className="navigate-date">
            <div className="buttons">
              <MdKeyboardArrowRight
                onClick={prevMonth}
                className="border border-[#CBBFC4] text-2xl rounded-lg"
                color="#CBBFC4"
              />
              <div className="flex gap-1 items-start">
                <h2 className="month">{ShamsiMonths[currentMonth]}</h2>
                <h2 className="year">{toFarsiDigits(`${currentYear}`)}</h2>
              </div>
              <MdKeyboardArrowLeft
                onClick={nextMonth}
                className="border border-[#CBBFC4] text-2xl rounded-lg"
                color="#CBBFC4"
              />
            </div>
          </div>
          <div className="p-4">
            <div className="weekdays">
              {WeekDays.map((day) => (
                <span key={day}>{day.charAt(0)}</span>
              ))}
            </div>
            <div className="days">
              {
                // وقتی شنبه نیست، فضای خالی رو نشون بده
                [...Array(firstDayOfMonth).keys()].map((_, index) => (
                  <span key={`empty-${index}`} />
                ))
              }
              {[...Array(daysInMonth).keys()].map((day) => {
                const dayDate = dayjs()
                  .calendar("jalali")
                  .year(currentYear)
                  .month(currentMonth)
                  .date(day + 1);

                // روز هفته اصلی برای نمایش تقویم (با شیفت جلو)
                const dayOfWeek =
                  currentYear === 1404
                    ? (dayDate.day() + 1 + 7) % 7
                    : dayDate.day();

                // روز هفته اصلاح‌شده برای محاسبه isAvailable (یه روز عقب‌تر از روز بدون شیفت)
                const adjustedDayOfWeek =
                  currentYear === 1404
                    ? (dayDate.day() + 2 + 7) % 7
                    : (dayDate.day() + 1 + 7) % 7;

                    const isCurrentDay =
                    currentYear === 1404
                      ? dayDate.isSame(currentDate.subtract(1, "day"), "day") &&
                        dayDate.isSame(currentDate.subtract(1, "day"), "month") &&
                        dayDate.isSame(currentDate.subtract(1, "day"), "year")
                      : dayDate.isSame(currentDate, "day") &&
                        dayDate.isSame(currentDate, "month") &&
                        dayDate.isSame(currentDate, "year");

                const isWeekend = dayOfWeek === 5;

                // استفاده از adjustedDayOfWeek برای محاسبه در دسترس بودن
                const dayName = WeekDays[adjustedDayOfWeek];
                const isInRepeatRange =
                  dayDate.isBefore(endDate, "day") &&
                  dayDate.isAfter(currentDate.subtract(1, "day"));
                const hasWorkHours =
                  workHours[dayName as DayKey] &&
                  workHours[dayName as DayKey].length > 0;
                const isAvailable = isInRepeatRange && hasWorkHours;
                const isSelected =
                  selectedDate === dayDate.format("YYYY-MM-DD");

                return (
                  <span
                    key={day + 1}
                    className={`${isCurrentDay ? "current-day" : ""} ${
                      isWeekend ? "weekend" : ""
                    } ${
                      isSelected
                        ? "selected-day"
                        : isAvailable
                        ? "availabel-days"
                        : ""
                    }`}
                    onClick={() => isAvailable && handleDateClick(day)}
                  >
                    {toFarsiDigits(`${day + 1}`)}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <HourCalendarCard />
      {/* <ManualAppointmentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        form={form}
        handleBooking={handleBooking}
        bookAppointmentMutation={bookAppointmentMutation}
      /> */}
    </div>
  );
}
