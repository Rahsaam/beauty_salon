// hooks/useWorkHours.ts
import { useState } from 'react';
import { DayKey, TimeRange, WorkHours } from '../types/auth';
import dayjs, { Dayjs } from "dayjs";

const initialWorkHours: WorkHours = {
    شنبه: [],
    یک‌شنبه: [],
    دوشنبه: [],
    سه‌شنبه: [],
    چهارشنبه: [],
    پنج‌شنبه: [],
    جمعه: [],
  };

export const useWorkHours = () => {
  const [workHours, setWorkHours] = useState<WorkHours>(initialWorkHours);

  const generateId = () => {
    return Math.random();
  };

  const addWorkHours = (day: DayKey) => {
    const newTimeRange: TimeRange = {
      id: generateId(),
      startTime: dayjs().startOf('hour'),
      endTime: dayjs().startOf('hour').add(1, 'hour'),
    };
    
    setWorkHours(prev => ({
      ...prev,
      [day]: [...prev[day], newTimeRange]
    }));
  };

  const removeWorkHours = (day: DayKey, id: number) => {
    setWorkHours(prev => ({
      ...prev,
      [day]: prev[day].filter(timeRange => timeRange.id !== id)
    }));
  };

  const updateWorkHours = (
    day: DayKey,
    id: number,
    type: 'startTime' | 'endTime',
    time: Dayjs
  ) => {
    setWorkHours(prev => ({
      ...prev,
      [day]: prev[day].map(timeRange => 
        timeRange.id === id ? { ...timeRange, [type]: time } : timeRange
      )
    }));
  };

  return { workHours, addWorkHours, removeWorkHours, updateWorkHours };
};