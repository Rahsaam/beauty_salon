import { ManualAppointmentModalProps } from "@/types/props";
import { Button, Form, Input, Modal, TimePicker } from "antd";
import React from "react";



export default function ManualAppointmentModal({
  isModalOpen,
  setIsModalOpen,
  form,
  handleBooking,
}: ManualAppointmentModalProps) {
  return (
    <Modal
      title="ثبت نوبت جدید"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form form={form} onFinish={handleBooking} layout="vertical">
        <Form.Item
          name="customer_name"
          label="نام مشتری"
          rules={[{ required: true, message: "لطفاً نام مشتری را وارد کنید" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customer_phone"
          label="شماره تلفن مشتری"
          rules={[{ required: true, message: "لطفاً شماره تلفن را وارد کنید" }]}
        >
          <Input placeholder="+989123456789" />
        </Form.Item>
        <Form.Item
          name="service_type"
          label="نوع سرویس"
          rules={[{ required: true, message: "لطفاً نوع سرویس را وارد کنید" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="appointment_time"
          label="ساعت نوبت"
          rules={[{ required: true, message: "لطفاً ساعت را انتخاب کنید" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="address"
          label="آدرس"
          rules={[{ required: true, message: "لطفاً آدرس را وارد کنید" }]}
        >
          <Input.TextArea placeholder="آدرس محل نوبت" />
        </Form.Item>
        <Form.Item name="notes" label="یادداشت (اختیاری)">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            ثبت نوبت
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}