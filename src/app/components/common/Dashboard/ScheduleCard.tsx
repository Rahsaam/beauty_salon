"use client";

import { Card, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import dayjs from "dayjs";
import "dayjs/locale/fa"; // برای تبدیل اعداد و نام ماه به فارسی
import { IGetAppointment } from "@/types/api";
import { toFarsiDigits } from "@/helper/toFarsiDigits";

interface ScheduleCardProps {
  appointment: IGetAppointment;
}
const ScheduleCard: React.FC<ScheduleCardProps> = ({
  appointment
}) => {

  const goToDetailTurn = () => {
    setSelectedAppointment(appointment);
    setCurrentStep('turnDetail');
  };
  const { setCurrentStep, setSelectedAppointment } = useAuth();

  const appointmentTime = dayjs(appointment?.appointment_time, "HH:mm:ss")
  .locale("fa")
  .format("HH:mm");

  
  return (
    <Card
      onClick={goToDetailTurn}
      className="schduleCard w-full border !bg-[#F9F7F4] border-[#EBE1E1] rounded-lg !mt-4"
    >
      <div className=" flex justify-between items-center">
        <div className="flex flex-col line-clamp-6">
          <Typography.Text strong className="text-lg flex items-center gap-1">
            <ClockCircleOutlined className="text-gray-500" /> {toFarsiDigits(appointmentTime)}
          </Typography.Text>
          <Typography.Text className="text-gray-700">{appointment?.service_type}</Typography.Text>
          <Typography.Text className="text-gray-500">
            {appointment?.customer_name}
          </Typography.Text>
        </div>

        <RiArrowLeftSLine
          className="self-center"
          color="#6F0E37"
          width={24}
          height={24}
        />
      </div>
    </Card>
  );
};

export default ScheduleCard;
