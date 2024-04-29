'use client'

// ** Import Icons
import { useSidebar } from "@/zustand/useSidebar";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavbarAdmin() {

  const { setOpen } = useSidebar();

  return (
    <div className="bg-[#0F6EE3] fixed top-0 w-full border-b border-gray-300  p-5 flex justify-between items-center px-10 z-10">
      <GiHamburgerMenu className="text-white text-2xl cursor-pointer" onClick={setOpen}/>

      <p className="text-white">Admin</p>
    </div>
  )
}
