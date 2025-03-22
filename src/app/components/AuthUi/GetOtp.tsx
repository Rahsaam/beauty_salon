"use client";
import { useAuth } from "@/context/AuthContext";
import { toFarsiDigits } from "@/helper/toFarsiDigits";
import { useTimer } from "@/hooks/useTimer";
import { Button, Input, Typography } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";

const { Title } = Typography;
export default function GetOtp() {
  const {
    otp,
    setOtp,
    phoneNumber,
    handleVerify,
    loading,
    handleResendOtp,
    setCurrentStep
  } = useAuth();
  const { timer, startTimer } = useTimer(30);
  
  useEffect(() => {
    startTimer(30);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResend = async () => {
    try {
      await handleResendOtp();
      startTimer(30);
      setOtp("");
    } catch (error) {
      console.error("ارسال مجدد ناموفق:", error);
    }
  };

  const handleSubmit = async () => {
    await handleVerify();
  };


  const getButtonProps = () => {
    if (otp.length === 4) {
      return {
        text: "تأیید کد",
        onClick: handleSubmit,
        disabled: loading,
      };
    }

    if (timer > 0) {
      return {
        text: `تأیید کد (${toFarsiDigits(`${timer}`)} ثانیه)`,
        onClick: handleSubmit,
        disabled: otp.length !== 4 || loading,
      };
    }

    return {
      text: "ارسال مجدد کد",
      onClick: handleResend,
      disabled: loading,
    };
  };

  const handleOtpInput: OTPProps['onInput'] = (values) => {
    const otpValue = values.join('');
    setOtp(otpValue);
  };

  const handleEditPhoneNumber = () => {
    setCurrentStep("phone");
  };

  

  const { text, onClick, disabled } = getButtonProps();

  return (
    <div className="mx-auto text-center justify-around min-h-[570px] flex flex-col w-full">
      <div className="">
        <Title className="text-center" level={5}>
          کد تایید را وارد کنید
        </Title>
        <p className="!font-light mb-4">
          کد ارسال شده به شماره موبایل خود را وارد نمایید
        </p>
        <div className="bg-[#e4c6d6] max-w-36 mx-auto text-center justify-around flex rounded-2xl items-center mb-4">
          <CiEdit onClick={handleEditPhoneNumber} className="text-2xl font-bold cursor-pointer" color="#6F0E37"/>
          <span className="inline-block  text-[#923468] py-1 ">
            {toFarsiDigits(phoneNumber.replace("+98", "0"))}
          </span>
        </div>

        <Input.OTP
          value={otp}
          onInput={handleOtpInput}
          length={4}
          className="my-4 w-full"
          style={{ textAlign: "left", direction: "ltr" }}
          autoFocus
        />

        {timer > 0 ? (
          <div className="mt-4 text-sm font-extralight">
            زمان باقیمانده: {toFarsiDigits(`${timer}`)} ثانیه
          </div>
        ) : (
          ""
        )}
      </div>

      <Button
        type="primary"
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        className="mb-48"
      >
        {loading ? "در حال ارسال..." : text}
      </Button>
    </div>
  );
}
