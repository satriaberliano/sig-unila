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
import { useState } from "react";
import { TiMessage } from "react-icons/ti";

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
          }).then(() => router.push("/admin"));
        });
      }
    });
  };

  return (
    <div className="basis-1/6 bg-[#F1F1F1] py-4 h-screen space-y-3 text-xs">
      <div className="py-8 space-y-4 px-4">
        <Image
          src={assets.logoUnila}
          alt="Universitas Lampung logo"
          className="w-2/6 mx-auto"
        ></Image>
        <h3 className="text-base text-center font-bold">
          Sistem Informasi Geografis Universitas Lampung
        </h3>
      </div>

      <div className="space-y-1">
        <Link
          href="/dashboard"
          // flex justify-center items-center
          className={`p-4 grid grid-cols-3 gap-2 hover:font-medium px-10 ${
            pathname === "/dashboard"
              ? "bg-[#0F6EE3] text-white hover:text-black"
              : "hover:bg-[#0F6EE3] hover:text-white"
          }`}
        >
          <MdMonitor className="text-xl col-start-1 col-end-2 justify-self-center" />
          <span className="col-start-2 col-end-4 self-center">Dashboard</span>
        </Link>

        <Link
          href="/data-fasilitas"
          className={`p-4 grid grid-cols-3 gap-2 hover:font-medium px-10  ${
            pathname === "/data-fasilitas"
              ? "bg-[#0F6EE3] text-white hover:text-black"
              : "hover:bg-[#0F6EE3] hover:text-white"
          }
          
          ${
            pathname === "/data-fasilitas/tambah-fasilitas"
              ? "bg-[#0F6EE3] text-white hover:text-black"
              : "hover:bg-[#0F6EE3] hover:text-white"
          }

          `}
        >
          <FiDatabase className="text-xl col-start-1 col-end-2 justify-self-center" />
          <span className="col-start-2 col-end-4 self-center">
            Data Fasilitas
          </span>
        </Link>

        <Link
          href="/pesan-pengguna"
          // flex justify-center items-center
          className={`p-4 grid grid-cols-3 gap-2 hover:font-medium px-10 ${
            pathname === "/pesan-pengguna"
              ? "bg-[#0F6EE3] text-white hover:text-black"
              : "hover:bg-[#0F6EE3] hover:text-white"
          }`}
        >
          <TiMessage className="text-xl col-start-1 col-end-2 justify-self-center" />
          <span className="col-start-2 col-end-4 self-center">
            Pesan Pengguna
          </span>
        </Link>

        <div
          onClick={onHandlerLogOut}
          className="p-4 grid grid-cols-3 gap-2 hover:bg-[#0F6EE3] hover:text-white hover:font-medium px-10 cursor-pointer"
        >
          <TbLogout2 className="text-xl col-start-1 col-end-2 justify-self-center" />
          <span className="col-start-2 col-end-4 self-center">Logout</span>
        </div>
      </div>
    </div>
  );
}
