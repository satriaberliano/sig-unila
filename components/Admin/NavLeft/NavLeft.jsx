"use client";

// ** Import Next
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// ** Import Assets
import assets from "@/assets/assets";

// ** Import Icons
import { MdMonitor } from "react-icons/md";
import { FiDatabase } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Swal from "sweetalert2";

export default function NavLeft() {
  const supabase = createClientComponentClient();

  const router = useRouter();
  const pathname = usePathname();

  const onHandlerLogOut = async () => {
    Swal.fire({
      icon: "warning",
      text: "Apakah anda yakin ingin keluar?",
      showCancelButton: true,
      confirmButtonColor: "#0F6EE3",
      cancelButtonColor: "#C93233",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        supabase.auth.signOut().then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Anda Telah Berhasil Logout",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => router.push("/masuk"));
        });
      }
    });
  };

  return (
    <div className="basis-1/6 bg-[#F1F1F1] py-4 h-screen space-y-10">
      <div className="py-8 space-y-4">
        <Image
          src={assets.logoUnila}
          alt="Universitas Lampung logo"
          className="w-2/6 mx-auto"
        ></Image>
        <h3 className="text-lg text-center font-semibold">SIG UNILA</h3>
      </div>

      <div className="space-y-1">
        <Link
          href="/dashboard"
          className={`p-4 flex justify-center items-center gap-4  hover:font-medium ${
            pathname === "/dashboard"
              ? "bg-[#0F6EE3] text-white hover:text-black"
              : "hover:bg-[#0F6EE3] hover:text-white"
          }`}
        >
          <MdMonitor className="text-2xl" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/data-fasilitas"
          className={`p-4 flex justify-center items-center gap-4 hover:font-medium  ${
            pathname === "/data-fasilitas"
              ? "bg-[#0F6EE3] text-white hover:text-black"
              : "hover:bg-[#0F6EE3] hover:text-white"
          }`}
        >
          <FiDatabase className="text-2xl" />
          <span>Data Fasilitas</span>
        </Link>

        <div
          onClick={onHandlerLogOut}
          className="p-4 flex cursor-pointer justify-center items-center gap-4 hover:bg-[#0F6EE3] hover:text-white hover:font-medium "
        >
          <TbLogout2 className="text-2xl" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}
