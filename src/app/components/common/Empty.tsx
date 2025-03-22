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
    </div>
  )
}