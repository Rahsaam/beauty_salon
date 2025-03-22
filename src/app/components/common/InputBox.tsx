"use client";

import React, { useState, useEffect } from "react";
import { Form, InputNumber, Typography } from "antd";
import type { IInputBox } from "@/types/props";
const { Title } = Typography;

// تابع برای تبدیل اعداد انگلیسی به فارسی
const toPersianDigits = (num: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
};

// تابع برای تبدیل اعداد فارسی به انگلیسی
const toEnglishDigits = (num: string): string => {
  return num.replace(/[۰-۹]/g, (match) => {
    return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(match));
  });
};

export default function InputBox({
  title,
  description,
  rule,
  placeholder,
  value,
  setValue,
}: IInputBox) {
  const [displayValue, setDisplayValue] = useState<number | null>(value ? parseFloat(value) : null);

  useEffect(() => {
    setDisplayValue(value ? parseFloat(value) : null);
  }, [value]);

  const handleSetValue = (value: number | null) => {
    if (value !== null) {
      setValue(value.toString()); // ذخیره‌ی مقدار خام به عنوان string
    } else {
      setValue(""); // اگر مقدار null باشد، مقدار خام را به رشته خالی تنظیم کنید
    }
  };

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
        <InputNumber
          formatter={(value) =>
            toPersianDigits(`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
          }
          parser={(value) => {
            const englishDigits = toEnglishDigits(value?.replace(/\$\s?|(,*)/g, "") || "0");
            return parseFloat(englishDigits); // تبدیل به number
          }}
          onChange={handleSetValue}
          value={displayValue}
          placeholder={placeholder}
          suffix="ریال"
          className="mt-4"
          style={{ width: '100%', height: 52, direction: 'rtl' }}
        />
      </Form.Item>
    </div>
  );
}