import React from 'react'
import ProfileCard from '@/app/components/common/Dashboard/ProfileCard'
import { AiOutlineInfoCircle, AiOutlineCheckCircle, AiOutlineLogout } from "react-icons/ai";
import MenuItem from '@/app/components/common/MenuItem';

export default function Profile() {
  return (
    <div className='mt-20'>
        <ProfileCard />
        <div className='mt-6'>
        <MenuItem icon={<AiOutlineInfoCircle color='#6F0E37' className='text-2xl'/>} text="درباره کوتیک" />
        <MenuItem icon={<AiOutlineCheckCircle color='#6F0E37' className='text-2xl'/>} text="قوانین و شرایط" />
        <MenuItem icon={<AiOutlineLogout color='#6F0E37' className='text-2xl'/>} text="خروج از حساب کاربری" />
        </div>
    </div>
  )
}
