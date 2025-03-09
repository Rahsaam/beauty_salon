"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Typography } from "antd";
import type { IInputBox } from "@/types/props";
import { formatPrice } from "@/helper/formatPrice";
const { Title } = Typography;

export default function InputBox({
  title,
  description,
  rule,
  placeholder,
  value,
  setValue,
}: IInputBox) {
  const [displayValue, setDisplayValue] = useState(formatPrice(value));

  useEffect(() => {
    setDisplayValue(formatPrice(value));
  }, [value]);

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/[^۰-۹0-9,]/g, '');
    const formattedValue = formatPrice(rawValue);
    setValue(formattedValue);
    setDisplayValue(formattedValue);
  };

  console.log('value (raw)', value);
  console.log('displayValue', displayValue);

  return (
    <div className="service-work-box my-4">
      <Title level={5}>{title}</Title>
      <span className="text-sm font-extralight">{description}</span>
      <Form.Item
        name="activity"
        label={null}
        rules={[{ required: true, message: rule }]}
        className="w-full text-right"
      >
        <Input
          placeholder={placeholder}
          value={displayValue}
          onChange={handleSetValue}
          suffix="ریال"
          className="mt-4"
          style={{ height: 52, direction: 'rtl' }}
        />
      </Form.Item>
    </div>
  );
}