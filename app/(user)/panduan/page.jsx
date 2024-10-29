import assets from "@/assets/assets";
import { faqList } from "@/constant/faq-list";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown, IoMdPin } from "react-icons/io";
import { IoLayers } from "react-icons/io5";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 bg-gray-100 rounded-lg p-6 shadow-lg border-2 border-gray-200 hover:shadow-slate-400 ease-out duration-700">
            <h3 className="text-xl font-semibold text-center md:text-left pb-3 md:pb-0">
              Navigasi Halaman Website
            </h3>
            <ol className="list-disc ml-4 space-y-2 text-sm">
              <li>
                <span className="font-medium">Beranda:</span> Menampilkan
                informasi singkat tentang SIG Universitas Lampung.
              </li>
              <li>
                <span className="font-medium">Fasilitas:</span> Menyediakan
                daftar fasilitas lengkap dengan peta interaktif untuk pencarian
                detail.
              </li>
              <li>
                <span className="font-medium">Peta:</span> Halaman peta
                interaktif untuk mengeksplorasi lokasi-lokasi penting di kampus.
              </li>
              <li>
                <span className="font-medium">Tentang:</span> Informasi tentang
                deskripsi dan tujuan, teknologi yang digunakan, dan tim
                pengembang.
              </li>
              <li>
                <span className="font-medium">Panduan:</span> Informasi dasar
                berupa informasi yang dapat digunakan pengguna dalam menggunakan
                website.
              </li>
              <li>
                <span className="font-medium">Kontak Kami:</span> Layanan untuk
                mengirim pesan atau saran kepada tim SIG UNILA.
              </li>
            </ol>
          </div>

          <div className="space-y-4 bg-gray-100 rounded-lg p-6 shadow-lg border-2 border-gray-200 hover:shadow-slate-400 ease-out duration-700">
            <h3 className="text-xl text-center md:text-left font-semibold pb-3 md:pb-0">
              Cara Penggunaan Peta
            </h3>
            <p className="text-sm">
              Untuk menggunakan peta, Anda dapat mengikuti langkah-langkah
              berikut:
            </p>
            <ol className="list-disc ml-4 space-y-2 text-sm">
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
                <span className="font-medium">Skala Peta:</span> Terdapat di
                kanan bawah peta untuk melihat skala peta
              </li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* <h3 className="text-lg font-semibold">Penjelasan Warna Wilayah</h3> */}
          {/* <div className="space-y-3">
            <h4 className="text-xl font-medium">Ikon</h4>
            <p>
              Pada website SIG UNILA, Anda akan melihat beberapa ikon penting:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-x-3">
                <IoMdPin className="text-3xl text-[#2a9bd3]" />
                <p>Menunjukkan letak fasilitas di peta</p>
              </div>
              <div className="flex items-center gap-x-3">
                <IoLayers className="text-3xl text-[#989d9f]" />
                <p>Menunjukkan layer wilayah fakultas yang ada</p>
              </div>
            </div>
          </div> */}

          <div className="space-y-3 bg-gray-100 rounded-lg p-6 shadow-lg border-2 border-gray-200 hover:shadow-slate-400 ease-out duration-700">
            <h4 className="text-xl font-semibold  text-center md:text-left pb-3 md:pb-0">
              Penjelasan Warna Wilayah pada Peta
            </h4>
            <p className="text-sm">
              Pada peta interaktif, Anda akan melihat beberapa warna penting:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#808080]"></span>
                <p>Mewakili wilayah dari Fakultas Ekonomi dan Bisnis (FEB)</p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#FF0000]"></span>
                <p>Mewakili wilayah dari Fakultas Hukum (FH)</p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#800080]"></span>
                <p>
                  Mewakili wilayah dari Fakultas Keguruan dan Ilmu Pendidikan
                  (FKIP)
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#008000]"></span>
                <p>Mewakili wilayah dari Fakultas Pertanian (FP)</p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#00008B]"></span>
                <p>Mewakili wilayah dari Fakultas Teknik (FT)</p>
              </div>
              <div className="flex items-center gap-x-3">
                <span className="flex w-fit p-3 border-2 bg-[#FFA500]"></span>
                <p>
                  Mewakili wilayah dari Fakultas Ilmu Sosial dan Ilmu Politik
                  (FISIP)
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
                <p>Mewakili wilayah dari Fakultas Kedokeran (FK)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            FAQ (Frequently Asked Question)
          </h3>
          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <details
                className="group [&_summary::-webkit-details-marker]:hidden"
                key={index}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-100 p-4 text-gray-900">
                  <h2 className="font-medium text-sm">Q: {faq.question}</h2>

                  <IoIosArrowDown className="size-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                </summary>

                <p className="mt-4 px-4 leading-relaxed text-gray-700 text-sm">
                  A: {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Video Panduan</h3>
          <p className="text-sm">
            Untuk lebih memahami cara menggunakan fitur di website, silakan
            tonton video panduan berikut:{" "}
            <span className="text-sm">(Video dalam proses pembuatan)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanduanPage;
