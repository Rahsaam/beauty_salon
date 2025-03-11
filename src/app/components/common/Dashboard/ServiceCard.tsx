import React from "react";
import { Card, Typography } from "antd";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function ServiceCard({subtitle}: {subtitle: string}) {
  return (
    <div>
      <Card className="schduleCard w-full border !border-[#EBE1E1] rounded-lg !mt-4">
        <div className=" flex justify-between items-center">
          <div className="flex flex-col line-clamp-6">
            <h2 className="!text-[#EBE1E1] !text-sm font-extralight">
              نام خدمات
            </h2>
            <Typography.Text className="text-gray-500">
              {subtitle}
            </Typography.Text>
          </div>

          <RiArrowLeftSLine className="self-center" color="#6F0E37" width={24} height={24} />
        </div>
      </Card>
    </div>
  );
}
