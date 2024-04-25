"use client"

import React from 'react'
import NavLeft from '../NavLeft/NavLeft'
import { useModalAddFacility } from '@/zustand/useModalAddFacility'
import ModalAddFacility from '../ModalAddFacility/ModalAddFacility';

export default function ContentAdmin({ children }) {
  const { facility, isEdit: isEditFacility } = useModalAddFacility();

  return (
    <div className='relative flex mt-10 bg-white'>
      <div className="mt-6">
        <div className={`fixed w-[16rem]`}>
          <NavLeft />
        </div>
      </div>

      {/* Fasilitas */}
      <div
        className={` ${
          !facility ? "hidden" : "fixed -mt-10 w-screen bg-slate-900/75 z-20"
        }`}
      >
        <ModalAddFacility />
      </div>

      <div className='pl-[16rem] w-full h-screen'>{children}</div>

    </div>
  )
}
