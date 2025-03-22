import React, { useState } from "react";
import ServiceBox from "../common/ServiceBox";
import { servicesOptions } from "@/constance/options";
import { IBookingFormValues, IServiceBox } from "@/types/props";
import { useAuth } from "@/context/AuthContext";
import { Button, Form, Input, TimePicker, Typography, message } from "antd";
import { useProxyMutation } from "@/hooks/useProxyMutation";
import { bookAppointment } from "@/api/Calendar/appointment";
import dayjs from "dayjs";
import SetTurnModal from "../common/Calendar/SetTurnModal";
import { IAppointment } from "@/types/api";

const { Title } = Typography;

export default function SetTurn() {
  const {
    myServices,
    setMyServices,
    professionalId,
    selectedDate,
    currentStep,
    setSelectedAppointment,
  } = useAuth();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const bookAppointmentMutation = useProxyMutation({
    mutationFn: bookAppointment,
    showAlert: true,
    onSuccess: (data) => {
      message.success("نوبت با موفقیت ثبت شد!");
      const appointmentData: IAppointment = {
        appointment_id: data.appointment_id,
        customer_name: form.getFieldValue("customer_name"),
        customer_phone: form.getFieldValue("customer_phone"),
        service_type: myServices, // از context
        appointment_date: selectedDate, // از context
        appointment_time: form.getFieldValue("appointment_time")
          ? form.getFieldValue("appointment_time").format("HH:mm")
          : "00:00",
      };
      setSelectedAppointment(appointmentData);
      form.resetFields();
      setIsModalVisible(true);
    },
    onError: (error) => {
      if (error instanceof Error) {
        message.error("خطایی در ثبت نوبت رخ داد: " + error.message);
      } else {
        message.error("خطایی در ثبت نوبت رخ داد: خطای ناشناخته");
      }
    },
  });

  const servicesProps: IServiceBox = {
    title: "انتخاب خدمات",
    rule: "لطفا نام و خدمات خود را وارد کنید",
    options: servicesOptions,
    placeholder: "خدمات",
    isSecondInput: false,
    selectValue: myServices,
    setSelectValue: setMyServices,
  };

  const handleBooking = (values: IBookingFormValues) => {
    if (!professionalId) {
      message.error("شناسه متخصص پیدا نشد!");
      return;
    }

    const dayOfWeek = dayjs(selectedDate).locale("fa").format("dddd");

    const appointmentData = {
      professional_id: professionalId,
      customer_name: values.customer_name,
      customer_phone: values.customer_phone,
      service_type: myServices,
      appointment_date: selectedDate!,
      appointment_time: values.appointment_time
        ? dayjs.isDayjs(values.appointment_time)
          ? values.appointment_time.format("HH:mm")
          : values.appointment_time
        : "00:00",
      address: values.address || "",
      day_of_week: dayOfWeek,
    };

    bookAppointmentMutation.mutateAsync(appointmentData);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (error) {
      console.error(error);
      message.error("لطفاً تمام فیلدهای ضروری را پر کنید");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="mt-20 mb-7">
      <ServiceBox {...servicesProps} />
      <Form
        form={form}
        onFinish={handleBooking}
        layout="vertical"
        className="w-full text-right"
      >
        <div className="service-work-box my-4">
          <Title level={5}>اطلاعات مشتری</Title>
          <Form.Item
            name="customer_name"
            rules={[
              {
                required: true,
                message: "لطفاً نام و نام‌خانوادگی را وارد کنید",
              },
            ]}
          >
            <Input
              placeholder="نام و نام‌خانوادگی"
              className="mt-4"
              style={{ height: 52, direction: "rtl" }}
            />
          </Form.Item>
          <Form.Item
            name="customer_phone"
            rules={[
              { required: true, message: "لطفاً شماره موبایل را وارد کنید" },
            ]}
          >
            <Input
              placeholder="0912*******"
              style={{
                height: 52,
                direction: "rtl",
                lineHeight: "52px", // تنظیم ارتفاع خط برای متن
              }}
            />
          </Form.Item>
        </div>
        <div className="service-work-box my-4">
          <Title level={5}>انتخاب ساعت</Title>
          <Form.Item
            name="appointment_time"
            rules={[{ required: true, message: "لطفاً ساعت را انتخاب کنید" }]}
          >
            <TimePicker
              format="HH:mm"
              style={{ width: "100%" }}
              onChange={(time) =>
                form.setFieldsValue({ appointment_time: time })
              }
              showNow={false}
            />
          </Form.Item>
        </div>
        {currentStep === "setTurn" && (
          <div className=" w-full ml-auto z-50 pt-3 !mb-4">
            <div className="max-w-[390px] flex justify-between px-4 gap-3">
              <Button type="primary" loading={bookAppointmentMutation.isPending} className="w-full" onClick={handleSubmit}>
                ثبت نوبت
              </Button>
            </div>
          </div>
        )}
      </Form>
      <SetTurnModal visible={isModalVisible} onCancel={handleCancel} />
    </div>
  );
}
