"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button, Input, Space, Typography } from "antd";
import PersianPhoneInput from "@/app/components/PersianPhoneInput";
import { numberFormat } from "@/helper/numToPersian";

const { Title } = Typography;

export default function PhoneNumber() {
  const { 
    phoneNumber, 
    setPhoneNumber, 
    handleVerify, 
    loading,
    setCurrentStep
  } = useAuth();

  // بررسی و تنظیم پیشوند +98
  useEffect(() => {
    if (!phoneNumber.startsWith("+98")) {
      setPhoneNumber("+98");
    }
  }, [phoneNumber, setPhoneNumber]);

  // مدیریت تغییر شماره تلفن
  const handlePhoneChange = (value: string) => {
    if (!value.startsWith("+98")) {
      setPhoneNumber("+98" + value);
    } else {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async () => {
    await handleVerify();
    setCurrentStep('otp');
  };

  return (
    <div className="mx-auto flex flex-col justify-between min-h-[500px] text-center w-full">
      <div className="mt-20">
        <Title className="text-center" level={5}>
          ورود یا ثبت‌نام
        </Title>
        <Title className="!font-light" level={5}>
          برای ادامه لطفا شماره موبایل خود را وارد کنید
        </Title>

        <Space.Compact dir="ltr" className="mt-2">
          <PersianPhoneInput
            value={phoneNumber.replace("+98", "")} // حذف +98 برای نمایش
            onChange={handlePhoneChange}
          />
          <Input
            style={{ width: "15%" }}
            defaultValue={`${numberFormat(98)}+`}
            disabled
          />
        </Space.Compact>

        <p className="text-sm font-extralight mt-3">
          با ثبت‌نام و ورود با قوانین{" "}
          <span className="text-primary">کیوتیم</span> موافقت میکنم
        </p>
      </div>

      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={phoneNumber.length !== 13 || loading}
        loading={loading}
        // style={{width: '82.5%'}}
        className="mx-auto w-full"
      >
        {loading ? "لطفاً منتظر بمانید..." : "دریافت کد"}
      </Button>
    </div>
  );
}
