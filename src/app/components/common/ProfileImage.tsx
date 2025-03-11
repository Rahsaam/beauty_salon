import Image from 'next/image'
import React from 'react'

export default function ProfileImage({hasImage}: {hasImage: boolean}) {
  return (
    <div>
        {hasImage ? (
            <Image src='/images/Profile.png' alt='profile image' width={40} height={40}/>
        )
        :
        (
            <Image src='/images/no_image.jpg' alt='profile image' width={40} height={40}/>
        )}
    </div>
  )
}
