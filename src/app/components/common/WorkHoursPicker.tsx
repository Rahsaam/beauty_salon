"use client"

import React, { useMemo, useState } from 'react';
import { Button, Tabs, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { MdClear } from 'react-icons/md';
import { IoAddSharp } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { DayKey } from '@/types/auth';

interface WorkHourRow {
  id: number;
  startTime: Dayjs;
  endTime: Dayjs;
}

interface WorkHours {
  [day: string]: WorkHourRow[];
}

interface AuthContextType {
  setWorkHours: (workHours: Record<DayKey, unknown[]>) => void;
  workHours: WorkHours;
  addWorkHours: (day: string, newRow: WorkHourRow) => void;
  removeWorkHours: (day: string, id: number) => void;
  updateWorkHours: (day: string, id: number, type: 'startTime' | 'endTime', time: Dayjs | null) => void;
}

export default function WorkHoursPicker() {
  const { workHours, addWorkHours, removeWorkHours, updateWorkHours } = useAuth() as AuthContextType;
  const format = 'HH:mm';

  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(null);

  const handleTimeChange = (day: string, id: number, type: 'startTime' | 'endTime', time: Dayjs | null) => {
    if (type === 'startTime') {
      setSelectedStartTime(time);
    }
    updateWorkHours(day, id, type, time);
  };

  const handleAddNewRow = (day: string) => {
    const newRow: WorkHourRow = {
      id: Date.now(),
      startTime: dayjs('00:00', format),
      endTime: dayjs('00:00', format),
    };
    addWorkHours(day, newRow);
  };

  const handleRemoveRow = (day: string, id: number) => {
    removeWorkHours(day, id);
  };
  


  const items = useMemo(() => {
    return Object.keys(workHours).map((day, index) => ({
      key: String(index + 1),
      label: day.charAt(0),
      children: (
        <div className="flex flex-col space-y-3 w-full">
          {workHours[day].map((row: WorkHourRow) => (
            <div key={row.id} className="flex items-center w-full">
              <div className="flex items-center flex-grow">
                <TimePicker
                  style={{
                    width: '100%',
                    minWidth: '80px',
                    maxWidth: '100px',
                    height: '47px',
                    borderRadius: '10px',
                    border: '0.5px solid #6F0F38',
                    marginLeft: '10px',
                  }}
                  showNow={false}
                  value={row.startTime}
                  onChange={(time) => handleTimeChange(day, row.id, 'startTime', time)}
                  format={format}
                />
                <FaArrowLeftLong className="mx-2" />
                <TimePicker
                  style={{
                    width: '100%',
                    minWidth: '80px',
                    maxWidth: '100px',
                    height: '47px',
                    borderRadius: '10px',
                    border: '0.5px solid #7F2549',
                    marginRight: '10px',
                  }}
                  showNow={false}
                  value={row.endTime}
                  onChange={(time) => handleTimeChange(day, row.id, 'endTime', time)}
                  format={format}
                  disabled={!row.startTime}
                  disabledTime={() => ({
                    disabledHours: () => {
                      if (!row.startTime) {
                        return [];
                      }
                      return Array.from({ length: 24 }, (_, i) => i).filter(
                        (hour) => hour < row.startTime.hour()
                      );
                    },
                  })}

                />
              </div>
              <div className="flex-shrink-0 ml-4">
                <MdClear
                  className="cursor-pointer text-xl font-bold text-[#7F2549]"
                  onClick={() => handleRemoveRow(day, row.id)}
                />
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 ml-4">
            <Button
              style={{ width: '100%', height: 40 }}
              onClick={() => handleAddNewRow(day)}
              className="flex-shrink-0 ml-4"
            >
              <IoAddSharp className="text-xl cursor-pointer text-[#7F2549]" />
            </Button>
          </div>
        </div>
      ),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workHours, selectedStartTime]);

  return (
    <div className="w-full">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}