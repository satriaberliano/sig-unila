import Link from "next/link";
import React from "react";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-8">
      <TbError404 className="text-[15rem] text-[#0F6EE3]" />
      <div className="space-y-4 text-center">
        <h1 className="text-3xl text-center">Halaman Tidak Ditemukan</h1>
        <p>
          {"Kembali ke "}
          <Link href="/" className="font-bold underline">
            Beranda
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
