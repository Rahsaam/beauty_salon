import Image from 'next/image'
import React from 'react'

export default function Empty() {
  return (
    <div className='relative flex justify-center items-center !mt-5'>
      <Image 
        src="/images/Empty.png" 
        alt="Empty State" 
        width={200} 
        height={106} 
      />
      

      {/* <div 
        className='content absolute z-50 w-2 h-2 rounded-full bg-gray-300'
        style={{ top: '46px', left: '153px' }}
      ></div>
      

      <div 
        className='content absolute z-50 w-3 h-2 border-gray-300 border-b-4 rounded-b-full'
        style={{ bottom: '40px', left: '165px' }}
      ></div>
      

      <div 
        className='content absolute z-50 w-2 h-2 rounded-full bg-gray-300'
        style={{ top: '46px', right: '153px' }}
      ></div> */}
    </div>
  )
}