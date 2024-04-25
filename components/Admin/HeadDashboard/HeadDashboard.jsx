import { supabase } from '@/lib/supabase';
import React from 'react'
import { RiBuilding4Fill } from "react-icons/ri";

export default function HeadDashboard() {
  return (
    <div className="space-y-2 mb-14">
      <h1 className="text-3xl mb-10 font-medium">Dashboard</h1>
      <div className='grid grid-cols-3 gap-5 w-full'>
        <div className='relative overflow-hidden shadow-md max-w-lg rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4'>
          <h2 className='font-medium text-neutral-700'>Jumlah Fasilitas</h2>
          <p className='text-xl font-semibold'>20</p>
          <div className='absolute -bottom-2 right-0'>
            <RiBuilding4Fill className='text-[5.5rem] text-neutral-300'/>
          </div>
        </div>
        <div className='relative overflow-hidden shadow-md max-w-lg rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4'>
          <h2 className='font-medium text-neutral-700'>Fasilitas Baru</h2>
          <p className='text-xl font-semibold'>2</p>
          <div className='absolute -bottom-2 right-0'>
            <RiBuilding4Fill className='text-[5.5rem] text-neutral-300'/>
          </div>
        </div>
        <div className='relative overflow-hidden shadow-md max-w-lg rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4'>
          <h2 className='font-medium text-neutral-700'>Fasilitas Baru</h2>
          <p className='text-xl font-semibold'>2</p>
          <div className='absolute -bottom-2 right-0'>
            <RiBuilding4Fill className='text-[5.5rem] text-neutral-300'/>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5 pt-5'>
        <div className='flex flex-col shadow-md max-w-lg rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4'>
          <h2 className='text-lg font-medium'>Overview Metrics</h2>
          <p>Unknown value</p>
        </div>
      </div>
    </div>
  )
}
