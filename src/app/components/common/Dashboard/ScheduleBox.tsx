import React from 'react'
import ScheduleCard from './ScheduleCard'

export default function ScheduleBox() {
  return (
    <div className='border border-[#EBE1E1] p-4 rounded-lg mt-4 w-full'>
        امروز، 7 اسفند
        <ScheduleCard time='9:30' title='اکستنشن مژه' subtitle='هنگامه شمس'/>
        <ScheduleCard time='9:30' title='اکستنشن مژه' subtitle='هنگامه شمس'/>
    </div>
  )
}
