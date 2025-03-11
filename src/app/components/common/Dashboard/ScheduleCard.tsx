"use client";

import { Card, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { RiArrowLeftSLine } from "react-icons/ri";

interface ScheduleCardProps {
  time: string;
  title: string;
  subtitle: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  time,
  title,
  subtitle,
}) => {
  return (
    <Card className="schduleCard w-full border !bg-[#F9F7F4] border-[#EBE1E1] rounded-lg !mt-4">
      <div className=" flex justify-between items-center">
        <div className="flex flex-col line-clamp-6">
          <Typography.Text strong className="text-lg flex items-center gap-1">
            <ClockCircleOutlined className="text-gray-500" /> {time}
          </Typography.Text>
          <Typography.Text className="text-gray-700">{title}</Typography.Text>
          <Typography.Text className="text-gray-500">
            {subtitle}
          </Typography.Text>
        </div>

        <RiArrowLeftSLine className="self-center" color="#6F0E37" width={24} height={24} />
      </div>
    </Card>
  );
};

export default ScheduleCard;
