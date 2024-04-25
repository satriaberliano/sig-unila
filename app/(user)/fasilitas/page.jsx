"use client"

import assets from '@/assets/assets';
import Map from '@/components/Map/Map'
import { fasilitasList } from '@/constant/fasiltas-list'
import { supabase } from '@/lib/supabase';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Fasilitas() {
  const [facilities, setFacilitites] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      const { data, error } = await supabase.from('fasilitas').select()

      if(error){
        setFetchError(`Couldn't fetch facility data`)
        setFacilitites(null);
        console.log(error)
      }

      if(data){
        setFacilitites(data)
        setFetchError(null);
      }
    }

    fetchFacilities();
  }, [])



  return (
    <div className='bg-white pt-28 pb-24 px-32 min-h-screen'>
      <h2 className='text-3xl font-semibold text-center mb-10'>Fasilitas</h2>
      <Map />
      <div className='flex justify-center items-center my-10'>
        <input className='border-2 p-2 w-full rounded-lg placeholder:text-sm placeholder:px-2' placeholder='Cari fasilitas...'></input>
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {fetchError && (<p>{fetchError}</p>)}
        {facilities && facilities.length > 0 ? (
          <>
            {
              facilities.map((fasilitas, index) => 
              <div className='w-full shadow-md rounded-md overflow-hidden border' key={index}>
                {/* { fasilitas.url_image && ( <Image src={fasilitas.url_image} width="300" height="500"  /> ) } */}
                <Image src={fasilitas.url_image ? fasilitas.url_image : assets.defaultImage} className='aspect-video' alt='facility image' width={500} height={100}/>
                {/* {console.log(fasilitas.url_image)} */}
                <div className='p-6 space-y-4'>
                  <h3 className='text-lg font-semibold'>{fasilitas.name}</h3>
                  <p className='text-sm line-clamp-3'>{fasilitas.description}</p>
                </div>
              </div>
              )
            }
          </>
        ):
        (
          <p className="text-center italic text-gray-500 p-4">Tidak ada fasilitas yang ditampilkan</p>
        )
        }
        {/* {fasilitasList.map((data, index) =>
          <div className='w-full shadow-md rounded-md overflow-hidden border' key={index}>
            <Image src={data.image} className='' alt='facility image' />
            <div className='p-6 space-y-4'>
              <h3 className='text-lg font-semibold'>{data.title}</h3>
              <p className='text-sm line-clamp-4'>{data.description}</p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}
