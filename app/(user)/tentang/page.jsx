import assets from "@/assets/assets";
import Image from "next/image";
import React from "react";

export default function TentangPage() {
  return (
    <div className="bg-white pt-28 pb-24 px-16 sm:px-20 md:px-28 lg:px-32 min-h-screen">
      <h2 className="text-3xl font-semibold text-center">Tentang</h2>
      <div className="flex justify-center items-center py-16 gap-10">
        <div className="w-1/2 flex justify-center items-center">
          <Image
            src={assets.logoUnila}
            alt="Universitas Lampung logo"
            className="w-full md:w-3/5 lg:w-2/5"
          />
        </div>
      </div>

      <div className="flex justify-center flex-col lg:grid lg:grid-cols-6 pt-14 md:pt-16 gap-5">
        <div className="lg:col-start-2 lg:col-end-6 space-y-4">
          <h3 className="text-2xl font-semibold">Deskripsi</h3>
          <p>
            Sistem Informasi Geografis Universitas Lampung (SIG UNILA) adalah
            sebuah situs web yang dirancang untuk menyediakan informasi
            mendetail mengenai berbagai fasilitas yang tersedia di Universitas
            Lampung. Dengan Sistem Informasi Geografis Universitas Lampung (SIG
            UNILA), pengguna dapat dengan mudah mengakses data tentang setiap
            fasilitas yang ada, seperti gedung perkuliahan, gedung serba guna,
            perpustakaan, fasilitas kesehatan dan fasilitas olahraga. Selain
            itu, Sistem Informasi Geografis Universitas Lampung (SIG UNILA) juga
            dilengkapi dengan peta digital interaktif yang menampilkan lokasi
            setiap fasilitas secara akurat di dalam kampus Universitas Lampung,
            memungkinkan pengguna untuk menavigasi dan menemukan fasilitas yang
            mereka butuhkan dengan lebih mudah.
          </p>
        </div>
      </div>

      <div className="grid grid-row-2 md:grid-cols-6 pt-16 gap-16 md:gap-12">
        {/* flex justify-center flex-col md:flex-row items-center md:w-1/2 self-start*/}
        <div className="w-full md:col-start-1 lg:col-start-2 md:col-end-4 space-y-4">
          <h3 className="text-2xl font-semibold">Manfaat</h3>
          <ol className="list-decimal ml-4">
            <li>
              Penyedia informasi fasilitas yang ada di Universitas Lampung
            </li>
            <li>
              Membantu mahasiswa dan pengunjung dalam mengetahui informasi
              fasilitas di Universitas Lampung
            </li>
            <li>Pemetaan lokasi fasilitas yang ada di Universitas Lampung</li>
          </ol>
        </div>
        <div className="w-full md:col-start-4 lg:col-end-6 md:col-end-7 space-y-4">
          <h3 className="text-2xl font-semibold">Tujuan</h3>
          <ol className="list-decimal ml-4">
            <li>Kemudahan akses informasi</li>
            <li>Peningkatan efektivitas dan efisiensi</li>
            <li>Transparansi dan keterbukaan informasi</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-6 py-14">
        <div className="col-start-2 col-end-6 text-center space-y-6">
          <h3 className="text-2xl font-semibold">Teknologi SIG UNILA</h3>
          <div className="flex justify-center items-center gap-10 rounded-lg">
            <Image
              src="/logos/nextjs-logo.svg"
              className="w-20 h-20"
              alt="Next.js Logo"
              width={10}
              height={10}
            />
            <Image
              src="/logos/tailwindcss-logo.svg"
              className="w-20 h-20"
              alt="Tailwind CSS Logo"
              width={10}
              height={10}
            />
            <Image
              src="/logos/react-leaflet.svg"
              className="w-20 h-20"
              alt="React Leaflet Logo"
              width={10}
              height={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
