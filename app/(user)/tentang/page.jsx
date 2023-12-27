import assets from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

export default function TentangPage() {
  return (
    <div className='bg-white pt-28 pb-24 px-32 min-h-screen'>
      <h2 className='text-3xl font-semibold text-center'>Tentang</h2>
      <div className='flex justify-center items-center py-16 gap-10'>
        <div className='w-1/2 flex justify-center items-center'>
          <Image src={assets.logoUnila} alt='Universitas Lampung logo' className='w-2/5'/>
        </div>
        <div className='w-1/2 space-y-4'>
          <h3 className='text-2xl font-semibold'>Deskripsi</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores consequuntur possimus earum officia aut impedit, suscipit quidem eum voluptatem culpa quod optio quas, dicta dolore voluptate dolorum nisi tenetur sint beatae? Similique numquam, nemo excepturi sunt, eveniet ratione saepe assumenda, in voluptatibus eum delectus iure ea autem natus! Possimus nemo quae, quo error illum ea minima fugiat, accusantium expedita tempora voluptates perferendis sit suscipit beatae. Impedit expedita laudantium porro numquam id dicta cupiditate debitis et.</p>
        </div>
      </div>

      <div className='flex justify-center items-center py-16 gap-10'>
        <div className='w-1/2 space-y-4'>
          <h3 className='text-2xl font-semibold'>Visi Misi</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores consequuntur possimus earum officia aut impedit, suscipit quidem eum voluptatem culpa quod optio quas, dicta dolore voluptate dolorum nisi tenetur sint beatae? Similique numquam, nemo excepturi sunt, eveniet ratione saepe assumenda, in voluptatibus eum delectus iure ea autem natus! Possimus nemo quae, quo error illum ea minima fugiat, accusantium expedita tempora voluptates perferendis sit suscipit beatae. Impedit expedita laudantium porro numquam id dicta cupiditate debitis et.</p>
        </div>
        <div className='w-1/2 space-y-4'>
          <h3 className='text-2xl font-semibold'>Tugas</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores consequuntur possimus earum officia aut impedit, suscipit quidem eum voluptatem culpa quod optio quas, dicta dolore voluptate dolorum nisi tenetur sint beatae? Similique numquam, nemo excepturi sunt, eveniet ratione saepe assumenda, in voluptatibus eum delectus iure ea autem natus! Possimus nemo quae, quo error illum ea minima fugiat, accusantium expedita tempora voluptates perferendis sit suscipit beatae. Impedit expedita laudantium porro numquam id dicta cupiditate debitis et.</p>
        </div>
      </div>
    </div>
  )
}
