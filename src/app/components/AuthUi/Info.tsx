"use client";
import { activityOptions } from "@/constance/options";
import { useAuth } from "@/context/AuthContext";
import { Button, Form, Input, Select, Typography } from "antd";
const { Title } = Typography;

export default function Info() {
  const { name, setName, city, setCity, setCurrentStep} = useAuth();

  const handleActivityChange = (value: string) => {
    setCity(value);
  };

  
  const handleSubmit = () => {
    setCurrentStep("calendar");
  };

  const isFormValid = name && city;

  return (
    <Form
      name="info_form"
      layout="vertical"
      className="mx-auto flex flex-col justify-around min-h-[570px] text-center w-full"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      <div className="">
        <Title className="text-center" level={4}>
          به کیوتیک خوش آمدید
        </Title>
        <Title className="!font-light" level={5}>
          لطفا اطلاعات خود را وارد نمایید
        </Title>

          <Form.Item
            name="name"
            label={null}
            rules={[
              {
                required: true,
                message: "لطفا نام و نام خانوادگی را وارد کنید",
              },
            ]}
            className="w-full text-right "
          >
            <Input
              size="large"
              placeholder="نام و نام‌خانوادگی"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
            />
          </Form.Item>

          <Form.Item
            name="activity"
            label={null}
            rules={[
              { required: true, message: "لطفا منطقه کاری را انتخاب کنید" },
            ]}
            className="w-full text-right"
          >
            <Select
              size="large"
              onChange={handleActivityChange}
              value={city}
              style={{ width: "100%", textAlign: "right" }}
              allowClear
              options={activityOptions}
              placeholder="انتخاب منطقه‌ کاری"
            />
          </Form.Item>
      </div>

      <Form.Item label={null}>
        <Button
          onClick={handleSubmit}
          type="primary"
          htmlType="submit"
          className="w-full mb-44"
          disabled={!isFormValid}
        >
          ثبت نام
        </Button>
      </Form.Item>
    </Form>
  );
}
