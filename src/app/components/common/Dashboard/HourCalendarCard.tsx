import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

export default function HourCalendarCard() {
  return (
    <div className='bg-[#F9F4F6] text-[#6F0E37] p-4 rounded-lg mt-4 flex justify-between w-full mb-24'>
        <div>
            <span>ساعت 9:30</span>
        </div>
        <IoIosArrowDown />
    </div>
  )
}
