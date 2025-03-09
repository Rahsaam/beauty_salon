"use client"
import React, { useState, useEffect } from 'react';
import { Input, Tooltip } from 'antd';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

// Function to convert English digits to Persian digits
export const toPersianDigits = (num: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
};

// Function to convert Persian digits to English digits
const toEnglishDigits = (num: string): string => {
  return num
    .replace(/[۰-۹]/g, (match) => {
      return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(match));
    });
};

const PersianPhoneInput = (props: PhoneInputProps) => {
  const { value, onChange } = props;
  const [displayValue, setDisplayValue] = useState(toPersianDigits(value));

  // Sync displayValue with value prop
  useEffect(() => {
    setDisplayValue(toPersianDigits(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    
    // Convert Persian digits to English for validation
    const englishDigits = toEnglishDigits(inputValue);
    
    // Regex to allow only numbers
    const reg = /^[0-9]*$/;
    
    if (reg.test(englishDigits)) {
      // Ensure the first digit is 9
      if (englishDigits.length > 0 && englishDigits[0] !== '9') {
        return;
      }
      
      // Limit to 10 digits
      if (englishDigits.length <= 10) {
        // Store the English digits internally for processing
        onChange(englishDigits);
        // Display Persian digits to the user
        setDisplayValue(toPersianDigits(englishDigits));
      }
    }
  };

  const handleBlur = () => {
    // Additional validation on blur if needed
    const englishDigits = toEnglishDigits(displayValue);
    if (englishDigits.length > 0 && englishDigits.length < 10) {
      // Maybe show a warning or handle incomplete numbers
    }
  };

  // Format for display in tooltip
  const formattedValue = value.length === 10 
    ? toPersianDigits(`${value.substring(0, 3)}-${value.substring(3, 6)}-${value.substring(6, 10)}`) 
    : displayValue;

  const title = value ? (
    <span className="phone-input-title">{formattedValue}</span>
  ) : (
    'بدون 0 وارد کنید'
  );

  return (
    <Tooltip
      trigger={['focus']}
      title={title}
      placement="topLeft"
      classNames={{ root: 'phone-input' }}
    >
      <Input
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="90******** "
        maxLength={10}
        style={{ textAlign: 'left', direction: 'ltr'}}
        className='phoneNumber'
        autoFocus 
      />
    </Tooltip>
  );
};

export default PersianPhoneInput;