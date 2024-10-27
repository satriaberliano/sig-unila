"use client";

import React from "react";
import NavLeft from "../NavLeft/NavLeft";
import { useModalFacility } from "@/zustand/useModalFacility";
import ModalAddFacility from "../ModalAddFacility/ModalAddFacility";
import { useSidebar } from "@/zustand/useSidebar";
import ModalEditFacility from "../ModalEditFacility/ModalEditFacility";
import { useImages } from "@/zustand/useImages";
import ModalImageFacility from "../ModalImageFacility/ModalImageFacility";

export default function ContentAdmin({ children }) {
  const { facility, isEdit: isEditFacility } = useModalFacility();
  const { image } = useImages();
  const { open } = useSidebar();

  return (
    <div className="relative flex mt-10 bg-white">
      <div className="mt-6">
        <div
          className={`fixed w-[14rem] ${
            open ? "transform-none" : ""
          } -translate-x-full duration-700 transition-transform z-10 border-r-2`}
        >
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

      {/* Gambar Fasilitas */}
      <div
        className={` ${
          !image ? "hidden" : "fixed -mt-10 w-screen bg-slate-900/75 z-20"
        }`}
      >
        <ModalImageFacility />
      </div>

      {/* <div
        className={` ${
          !isEditFacility
            ? "hidden"
            : "fixed -mt-10 w-screen bg-slate-900/75 z-20"
        }`}
      >
        <ModalEditFacility />
      </div> */}

      <div
        className={`${
          open ? "lg:pl-[14rem]" : "pl-0"
        } h-full w-full duration-700 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}
