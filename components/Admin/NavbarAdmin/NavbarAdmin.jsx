"use client";

// ** Import Icons
import { useSidebar } from "@/zustand/useSidebar";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";

export default function NavbarAdmin() {
  const { open, setOpen } = useSidebar();

  return (
    <div className="bg-[#0F6EE3] fixed top-0 w-full border-b border-gray-300  p-5 flex justify-between items-center px-10 z-10">
      {open ? (
        <GiHamburgerMenu
          className="text-white text-2xl cursor-pointer "
          onClick={setOpen}
        />
      ) : (
        <IoIosArrowForward
          className="text-white text-2xl cursor-pointer "
          onClick={setOpen}
        />
      )}

      <div className="flex justify-between items-center gap-2 text-white">
        <FaUserCircle />
        <span className="text-sm">Admin</span>
      </div>
    </div>
  );
}
