import assets from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";

const PanduanPage = () => {
  return (
    <div className="bg-white pt-28 pb-24 px-12 sm:px-20 md:px-28 lg:px-32 min-h-screen">
      <div className="flex flex-col justify-center items-center pb-12">
        <h2 className="text-3xl font-semibold text-center mb-20 lg:mb-12">
          Panduan
        </h2>
        <div className="flex items-center lg:justify-center gap-x-10">
          <p className="lg:basis-1/2">
            Selamat datang di halaman panduan Sistem Informasi Geografis (SIG)
            Universitas Lampung. Halaman ini akan membantu Anda memahami cara
            menggunakan fitur-fitur utama di website kami, seperti peta
            interaktif, pencarian fasilitas, dan lainnya.
          </p>
          <Image
            src="/images/maps.png"
            alt="Navigasi image"
            className="w-60 rounded-2xl hidden lg:flex"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="space-y-10">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Navigasi Website</h3>
          <ol className="list-disc ml-4 space-y-2">
            <li>
              Beranda: Menampilkan informasi singkat tentang SIG Universitas
              Lampung.
            </li>
            <li>
              Fasilitas: Menyediakan daftar fasilitas lengkap dengan peta
              interaktif untuk pencarian detail.
            </li>
            <li>
              Peta: Halaman peta interaktif untuk mengeksplorasi lokasi-lokasi
              penting di kampus.
            </li>
            <li>
              Tentang: Informasi tentang deskripsi dan tujuan, teknologi yang
              digunakan, dan tim pengembang.
            </li>
            <li>
              Panduan: Informasi dasar berupa informasi yang dapat digunakan
              pengguna dalam menggunakan website.
            </li>
            <li>
              Kontak Kami: Layanan untuk mengirim pesan atau saran kepada tim
              SIG UNILA.
            </li>
            <li>
              Login: Khusus untuk admin yang bertanggung jawab mengelola data
              fasilitas.
            </li>
          </ol>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Penjelasan Ikon dan Warna</h3>
          <div className="space-y-3">
            <h4 className="text-xl font-medium">Ikon</h4>
            <p>
              Pada website SIG UNILA, Anda akan melihat beberapa ikon penting:
            </p>
            <div className="space-y-2">
              <div className="flex items-baseline gap-x-3">
                <span className="flex w-fit rounded-full p-2 border-2 bg-[#25aa1e]">
                  <FaUser className="text-[10px] text-white" />
                </span>
                <p>
                  Menunjukkan fasilitas dapat diakses oleh Umum dan Civitas
                  Akademika
                </p>
              </div>
              <div className="flex items-baseline gap-x-3">
                <span className="flex w-fit rounded-full p-2 border-2 bg-[#2163bf]">
                  <FaUser className="text-[10px] text-white" />
                </span>
                <p>
                  Menunjukkan fasilitas diperuntukkan bagi Civitas Akademika
                </p>
              </div>
              <div className="flex items-baseline gap-x-3">
                <span className="flex w-fit rounded-full p-2 border-2 bg-[#b42f20]">
                  <FaUser className="text-[10px] text-white" />
                </span>
                <p>Menunjukkan fasilitas tidak diperuntukkan untuk umum</p>
              </div>
              <div className="flex items-center gap-x-3">
                <IoMdPin className="text-3xl text-[#2a9bd3]" />
                <p>Menunjukkan letak fasilitas di peta</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-medium">Warna pada peta</h4>
            <p>
              Pada peta interaktif, Anda akan melihat beberapa warna penting:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#808080]"></span>
                <p>Mewakili wilayah dari Fakultas Ekonomi dan Bisnis (FEB)</p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#FF0000]"></span>
                <p>Mewakili wilayah dari fasilitas Fakultas Hukum (FH)</p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#800080]"></span>
                <p>
                  Mewakili wilayah dari fasilitas Fakultas Keguruan dan Ilmu
                  Pendidikan (FKIP)
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#008000]"></span>
                <p>Mewakili wilayah dari Fakultas Pertanian (FP)</p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#00008B]"></span>
                <p>Mewakili wilayah dari fasilitas Fakultas Teknik (FT)</p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#FFA500]"></span>
                <p>
                  Mewakili wilayah dari fasilitas Fakultas Ilmu Sosial dan Ilmu
                  Politik (FISIP)
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#0074AC]"></span>
                <p>
                  Mewakili wilayah dari Fakultas Matematika dan Ilmu Pengetahuan
                  Alam (FMIPA)
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#006200]"></span>
                <p>Mewakili wilayah dari fasilitas Fakultas Kedokeran (FK)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Cara Penggunaan Peta</h3>
          <p>
            Untuk menggunakan peta, Anda dapat mengikuti langkah-langkah
            berikut:
          </p>
          <ol className="list-disc ml-4 space-y-2">
            <li>
              <span className="font-medium">Zoom In/Out:</span> Gunakan tombol
              plus (+) dan minus (-) di sudut kiri atas peta untuk memperbesar
              atau memperkecil tampilan.
            </li>
            <li>
              <span className="font-medium">Geser Peta:</span> Klik dan tahan
              pada peta, lalu geser untuk melihat area lain.
            </li>
            <li>
              <span className="font-medium">Layer Peta:</span> Gunakan tombol
              radio checklist untuk melihat atau menonaktifkan layer peta
            </li>
            <li>
              <span className="font-medium">Letak Fasilitas:</span> Klik ikon
              pin point untuk melihat informasi atau navigasi ke fasilitas
            </li>
            <li>
              <span className="font-medium">Skala Peta:</span> Terdapat di kanan
              bawah peta untuk melihat skala peta
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            FAQ (<i>Frequently Asked Question</i>)
          </h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-medium">
                Q: Bagaimana cara menenemukan fasilitas tertentu di kampus?
              </p>
              <p>
                A: Anda dapat menggunakan fitur pencarian pada halaman fasilitas
                dengan memasukkan input nama fasilitas.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">
                Q: Bagaimana jika fasilitas yang saya cari tidak ada?
              </p>
              <p>
                A: Anda harus memastikan bahwa tidak input yang anda masukkan
                benar. Jika benar tidak ada, Anda dapat menggunakan fitur
                layanan form pada halaman kontak kami atau dapat mengirim
                melalui email kami unila-sig@gmail.com, agar pihak kami
                melakukan peninjauan dan pembaruan fasilitas
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">
                Q: Bagaimana saya melakukan navigasi ke fasilitas tertentu?
              </p>
              <p>
                A: Anda dapat menggunakan tombol navigasi pada halaman detail
                fasiltias atau pada pin point fasilitas di peta.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Video Panduan</h3>
          <p>
            Untuk lebih memahami cara menggunakan fitur di website, silakan
            tonton video panduan berikut:{" "}
            <Link href="#" className="underline">
              Link Video Panduan
            </Link>
            . <span className="text-sm">(Video dalam proses pembuatan)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanduanPage;
