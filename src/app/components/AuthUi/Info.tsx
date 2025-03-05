"use client";
import { activityOptions } from "@/constance/activities";
import { useAuth } from "@/context/AuthContext";
import { Button, Form, Input, Select, Space, Typography } from "antd";
const { Title } = Typography;

export default function Info() {
  const { name, setName, city, setCity, activity, setActivity } = useAuth();

  const handleActivityChange = (value: string) => {
    setActivity(value);
  };

  return (
    <Form
      name="info_form"
      layout="vertical"
      className="mx-auto flex flex-col justify-between min-h-[500px] text-center w-full"
      // onFinish={handleSubmit}
      requiredMark={false}
    >
      <div className="mt-20">
        <Title className="text-center" level={4}>
          به کیوتیم خوش آمدید
        </Title>
        <Title className="!font-light" level={5}>
          لطفا اطلاعات خود را وارد نمایید
        </Title>

        <Space
          size="small"
          className="w-full mt-4"
          direction="vertical"
          style={{ width: "100%" }}
          dir="ltr"
        >
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
            />
          </Form.Item>

          <Form.Item
            name="activity"
            label={null}
            rules={[
              { required: true, message: "لطفا حوزه فعالیت را انتخاب کنید" },
            ]}
            className="w-full text-right"
          >
            <Select
              size="large"
              onChange={handleActivityChange}
              value={activity}
              style={{ width: "100%", textAlign: "right" }}
              allowClear
              options={activityOptions}
              placeholder="انتخاب حوزه فعالیت"
            />
          </Form.Item>

          <Form.Item
            name="city"
            label={null}
            rules={[{ required: true, message: "لطفا شهر خود را وارد کنید" }]}
            className="w-full text-right"
          >
            <Input
              size="large"
              placeholder="شهر"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </Form.Item>
        </Space>
      </div>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" className="w-full">
          ثبت نام
        </Button>
      </Form.Item>
    </Form>
  );
}
