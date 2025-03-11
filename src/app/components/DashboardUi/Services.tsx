import React from "react";
import ServiceCard from "@/app/components/common/Dashboard/ServiceCard";
import { Button } from "antd";
import Image from "next/image";
import CopyInput from "@/app/components/common/CopyInput";

export default function Services() {
  return (
    <div className="!mt-20">
      <ServiceCard subtitle="اکستنشن مژه" />
      <ServiceCard subtitle="ترمیم مو" />

      <Button
        color="default"
        variant="link"
        className="!underline mt-4 mx-auto w-full"
      >
        اضافه کردن خدمات جدید
      </Button>
      <div className="w-60 mx-auto">
        <Image
          src="/images/new-service.png"
          alt="new service"
          width={243}
          height={96}
          className="mx-auto mt-5"
        ></Image>
        <p className="mt-7 text-[#AAAAAA] text-sm font-extralight">وقتشه که تقویم اختصاصی خودت رو 
        برای رزرو نوبت با مشتریان به اشتراک بگذاری! </p>
      </div>

      <CopyInput />
    </div>
  );
}
