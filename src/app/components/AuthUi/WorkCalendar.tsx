"use client";
import React from "react";
import { Form, Button, Divider, Typography } from "antd";
import WorkHoursPicker from "../common/WorkHoursPicker";
import { repeatWorkOptions } from "@/constance/options";
import ServiceBox from "../common/ServiceBox";
import { IServiceBox } from "@/types/props";
import { useAuth } from "@/context/AuthContext";
const { Title } = Typography;


interface WorkCalendarFormValues {
  workHours?: { [key: string]: string[] };
  repeat?: string;
}

export default function WorkCalendar() {
  const { setCurrentStep, repeat, setRepeat } = useAuth();

  const [form] = Form.useForm();
  const onFinish = (values: WorkCalendarFormValues) => {
    console.log("Success:", values);
    setCurrentStep("service");
  };


  const onFinishFailed = (errorInfo: { values: WorkCalendarFormValues; outOfDate: boolean }) => {
    console.log("Failed:", errorInfo);
  };

  const repeatWorkProps: IServiceBox = {
    title: "تکرار زمان کاری",
    description: "تقویم کاری شما برای چند هفته آینده تکرار شود؟",
    rule: "لطفا تکرار زمان کاری را وارد کنید",
    options: repeatWorkOptions,
    placeholder: "تکرار زمان کاری",
    isSecondInput: false,
    selectValue: repeat,
    setSelectValue: setRepeat,
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="mx-auto flex flex-col justify-between min-h-[500px] w-full !mt-20"
    >
      <div>
        <div className="calendar-work-box mb-6">
          <div>
            <Title level={5}>زمان در دسترس بودن</Title>
            <span className="text-sm font-extralight">
              مدت زمان فعالیت کاری خود را بطور هفتگی مشخص کنید.
            </span>
          </div>
          <Divider variant="dashed" />
          <WorkHoursPicker />
        </div>
        <ServiceBox {...repeatWorkProps} />
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full mt-16">
          ذخیره و ادامه
        </Button>
      </Form.Item>
    </Form>
  );
}