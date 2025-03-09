import { useAuth } from '@/context/AuthContext'
import React from 'react'
import ServiceBox from '../common/ServiceBox';
import { categoryOptions, timingOptions } from '@/constance/options';
import { IInputBox, IServiceBox } from '@/types/props';
import InputBox from '../common/InputBox';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function AddNewService() {
    const {myServices, setMyServices, category, setCategory, price, setPrice, timing, setTiming} = useAuth();
    const router = useRouter()
    
    const isFormValid = myServices && category && timing;

    const handleSubmit = () => {
        if (!isFormValid) return;
        router.push('/dashboard')
    }
    const myServicesProps: IServiceBox = {
        title: "نام خدمات",
        description: "نام و دسته‌بندی خدمات خود را وارد کنید.",
        rule: "لطفا نام و خدمات خود را وارد کنید",
        options: categoryOptions,
        placeholder: "دسته بندی",
        isSecondInput: true,
        secondPlaceHolder: 'خدمات',
        secondInputValue: myServices,
        setSecondInputValue: setMyServices,
        selectValue: category,
        setSelectValue: setCategory,
    };

    const priceInputProps: IInputBox = {
        title: "هزینه خدمات",
        description: "مبلغ قابل پرداخت برای انجام خدمات خود را مشخص کنید.",
        rule: "لطفا مبلغ را وارد کنید",
        placeholder: "هزینه رو وارد کنید",
        value: price,
        setValue: setPrice,
    }

    const timingProps: IServiceBox = {
        title: "مدت زمان انجام خدمات",
        description: "مدت زمان لازم برای انجام این خدمات چقدر است؟",
        rule: "لطفا نام و خدمات خود را وارد کنید",
        options: timingOptions,
        placeholder: "مدت زمان",
        isSecondInput: false,
        selectValue: timing,
        setSelectValue: setTiming,
    };


  return (
    <div className='!mt-20'>
        <ServiceBox {...myServicesProps}/>
        <InputBox {...priceInputProps}/>
        <ServiceBox {...timingProps}/>
        <Button
          onClick={handleSubmit}
          type="primary"
          htmlType="submit"
          className="w-full mt-4"
          disabled={!isFormValid}
        >
          ثبت نام
        </Button>
    </div>
  )
}
