"use client"

import React from 'react'
import NavLeft from '../NavLeft/NavLeft'
import { useModalAddFacility } from '@/zustand/useModalAddFacility'
import ModalAddFacility from '../ModalAddFacility/ModalAddFacility';
import { useSidebar } from '@/zustand/useSidebar';

export default function ContentAdmin({ children }) {
  const { facility, isEdit: isEditFacility } = useModalAddFacility();
  const { open } = useSidebar();

  return (
    <div className='relative flex mt-10 bg-white'>
      <div className="mt-6">
        <div className={`fixed w-[16rem] ${ open ? "transform-none" : "" } -translate-x-full duration-700 transition-transform`}>
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

      <div className={`${ open ? "pl-[16rem]" : "pl-0"} w-full h-screen duration-700 ease-in-out`}>{children}</div>

    </div>
  )
}
