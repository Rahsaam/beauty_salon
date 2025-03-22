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


  useEffect(() => {
    if (!phoneNumber.startsWith("+98")) {
      setPhoneNumber("+98");
    }
  }, [phoneNumber, setPhoneNumber]);


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
    <div className="mx-auto !bg-[#FFFFF] flex flex-col justify-around min-h-[570px] text-center w-full">
      <div className="">
        <Title className="text-center" level={5}>
          ورود یا ثبت‌نام
        </Title>
        <Title className="!font-light" level={5}>
          برای ادامه لطفا شماره موبایل خود را وارد کنید
        </Title>

        <Space.Compact dir="ltr" className="mt-2">
          <PersianPhoneInput
            value={phoneNumber.replace("+98", "")}
            onChange={handlePhoneChange}
          />
          <Input
            style={{ width: "15%" }}
            className=""
            defaultValue={`${numberFormat(98)}+`}
            disabled
          />
        </Space.Compact>

        <p className="text-sm font-extralight mt-3">
          با ثبت‌نام و ورود با قوانین{" "}
          <span className="text-[#6F0E37] font-bold cursor-pointer">کیوتیک</span> موافقت میکنم
        </p>
      </div>

      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={phoneNumber.length !== 13 || loading}
        loading={loading}
        className="mx-auto w-full mb-48"
      >
        {loading ? "لطفاً منتظر بمانید..." : "دریافت کد"}
      </Button>
    </div>
  );
}
