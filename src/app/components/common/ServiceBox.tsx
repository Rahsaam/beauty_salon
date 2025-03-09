"use client";

import React from "react";
import { Form, Input, Select, Typography } from "antd";
import { IServiceBox } from "@/types/props";
const { Title } = Typography;

export default function ServiceBox({
  title,
  description,
  rule,
  options,
  placeholder,
  isSecondInput,
  secondPlaceHolder,
  secondInputValue,
  selectValue,
  setSecondInputValue,
  setSelectValue,
}: IServiceBox) {
  const handleSelectChange = (value: string) => {
    setSelectValue(value);
  };

  const handleSecondInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondInputValue?.(event.target.value);
  };
  return (
    <div className="service-work-box flex flex-col justify-center">
      <Title level={5}>{title}</Title>
      <span className="text-sm font-extralight">{description}</span>
      <Form.Item
        name="activity"
        label={null}
        rules={[{ required: true, message: rule }]}
        className="w-full text-right"
      >
        <Select
          size="large"
          onChange={handleSelectChange}
          value={selectValue}
          style={{ width: "100%", textAlign: "right" }}
          allowClear
          options={options}
          placeholder={placeholder}
          className="!mt-2 !bg-[#FBF8F9]"
        />
        {
        isSecondInput 
        && 
        <Input 
          placeholder={secondPlaceHolder}
          value={secondInputValue}
          onChange={handleSecondInputChange}
          className="!mt-4"
          style={{height: 52}}
        />
        }
      </Form.Item>
    </div>
  );
}
