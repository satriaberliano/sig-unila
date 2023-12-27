import { fasilitasList } from '@/constant/fasiltas-list'
import Image from 'next/image'
import React from 'react'

export default function Fasilitas() {
  return (
    <div className='bg-white pt-28 pb-24 px-32 min-h-screen'>
      <h2 className='text-3xl font-semibold text-center'>Fasilitas</h2>
      <div className='flex justify-center items-center my-10'>
        <input className='border-2 p-2 w-full rounded-lg placeholder:text-sm placeholder:px-2' placeholder='Cari fasilitas...'></input>
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {fasilitasList.map((data, index) =>
          <div className='w-full shadow-md rounded-md overflow-hidden border' key={index}>
            <Image src={data.image} className='' />
            <div className='p-6 space-y-4'>
              <h3 className='text-lg font-semibold'>{data.title}</h3>
              <p className='text-sm line-clamp-4'>{data.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
