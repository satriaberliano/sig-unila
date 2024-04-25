"use client"

import assets from '@/assets/assets'
import Image from 'next/image'

import { IoAddOutline } from "react-icons/io5";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useModalAddFacility } from '@/zustand/useModalAddFacility';

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


export const ContentFacility = ({ facilities }) => {
  const { setFacility } = useModalAddFacility();

  const router = useRouter();

  const supabase = createClientComponentClient()

  const onDeleteHandler = async (id) => {      
    Swal.fire({
      icon: "warning",
      text: "Apakah anda yakin ingin menghapus?",
      showCancelButton: true,
      confirmButtonColor: "#C93233",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async(result) => {
      if(result.isConfirmed) {
        const { error } = await supabase
          .from('fasilitas')
          .delete()
          .eq('id', id)
        if(!error) {
          Swal.fire({
            title: "Berhasil",
            icon: "success",
            text: "Data Berhasil Dihapus",
          }).then(() => {
            router.refresh();
          })
        } else {
          Swal.fire({
            title: "Gagal",
            icon: "error",
            text: error.message,
          }); 
        }

        router.refresh();
      }
    });
  }

  return (
    <main className="w-full">
      <div className='flex justify-between mb-2'>
        <h2 className='font-medium text-lg'>Daftar Fasilitas</h2>
        {/* Tambahin Tombol Add Fasilitas */}
        <button className='flex items-center text-xs gap-2 rounded-md bg-[#0F6EE3] text-white p-2' onClick={setFacility}>
          <IoAddOutline />
          <span>Tambah</span>
        </button>
      </div>

      <div className='w-full space-y-4'>
        <div className='grid grid-cols-10 text-center text-sm font-medium gap-2'>
          <span className='col-start-1 col-end-2'>No</span>
          <span className='col-start-2 col-end-4'>Gambar</span>
          <span className='col-start-4 col-end-6'>Nama</span>
          <span className='col-start-6 col-end-8'>Deskripsi</span>
          <span className='col-start-8 col-end-10'>Koordinat</span>
        </div>
        {
          facilities && facilities.length > 0 ? (
            <>
              {facilities.map((fasilitas, index) => (
                <div className='bg-gray-200 rounded-lg p-2 py-5 grid grid-cols-10 text-center gap-2' key={index}>
                  <p className='col-start-1 col-end-2 text-sm'>{index+1}</p>
                  <Image alt={`Gambar Fasilitas ${fasilitas.name}`} src={fasilitas.url_image ? fasilitas.url_image : assets.defaultImage} className='mx-auto rounded-md col-start-2 col-end-4' width={100} height={75} />
                  <p className='text-xs col-start-4 col-end-6'>{fasilitas.name || "-"}</p>
                  <p className='text-xs text-left col-start-6 col-end-8'>{fasilitas.description || "-"}</p>
                  <div className='text-xs col-start-8 col-end-10'>
                    {fasilitas.coordinate && true ? (
                      fasilitas.coordinate.map((coordinate, coordIndex) => (
                        <p key={coordIndex}>{coordinate}</p>
                      ))
                    ) : <p>-</p>
                    }
                  </div>
                  <div className='flex justify-center items-center gap-5 col-start-10 col-end-11'>
                    <button className='bg-slate-100 rounded-md p-2' >
                      <HiOutlinePencil />
                    </button>
                    <button className='bg-slate-100 rounded-md p-2' onClick={() => onDeleteHandler(fasilitas.id)}>
                      <HiOutlineTrash />
                    </button>
                  </div>
                </div>
                ))
                
              }
            </>
          ):
          <>
            <p className="text-center italic text-gray-500 p-4">Tidak ada fasilitas</p>
          </>
        }
      </div>
    </main>
  )
}
