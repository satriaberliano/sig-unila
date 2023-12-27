import assets from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

export default function Masuk() {
  return (
    <div className='min-h-screen px-10 py-20 bg-gradient-to-br from-[#0F6EE3] to-[#dacbcb]'>
      <div className='flex justify-center items-center flex-col space-y-10 bg-white py-16 w-[30rem] mx-auto rounded-lg'>
        <Image src={assets.logoUnila} alt='Universitas Lampung logo' className='w-16'/>
        <h3 className='text-xl font-semibold'>Admin</h3>
        <div className='flex justify-center items-center flex-col space-y-4 w-full px-10 py-5'>
          <input type="text" placeholder='Email' className='p-1 placeholder:text-xs placeholder:px-2 rounded-md border-2 w-full' />
          <input type="password" placeholder='Password' className='p-1 placeholder:text-xs placeholder:px-2 rounded-md border-2 w-full' />
          <button className='w-full border-2 text-sm font-semibold p-2 rounded-lg text-white bg-[#0F6EE3]'>Masuk</button>
        </div>
      </div>
    </div>
  )
}
