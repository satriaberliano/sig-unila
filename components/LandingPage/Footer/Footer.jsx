// ** Import Assets
import assets from '@/assets/assets'

// ** Import Next
import Image from 'next/image'
import Link from 'next/link'

// ** Import Icons
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill, RiFacebookBoxFill, RiYoutubeFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-[#0F6EE3] py-16 md:pt-20 pb-10 px-10 md:px-16 text-white md:space-y-16">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-6 space-y-3 text-center">
          <div className="md:flex md:flex-col justify-start items-start space-y-2 col-start-1 col-end-3 md:col-start-auto md:col-end-auto">
            <Image
              src={assets.logoUnila}
              className="w-20 -mt-2 md:-mt-9 mx-auto md:mx-0"
              alt="logo geomuda indonesia text white"
              />
            <h4 className="font-semibold text-xl text-center md:text-left">SIG UNILA</h4>
            <p className="text-sm text-center md:text-left">Sistem Informasi Geografis Universitas Lampung sebagai penyedia informasi pemetaan fasilitas yang ada</p>
          </div>

          <div className="space-y-5">
            <h4 className="font-semibold text-lg">Website</h4>
              <div className="space-y-1 text-sm flex flex-col">
                <Link href="/">
                  Beranda
                </Link>
                <Link href="/fasilitas">
                  Fasilitas
                </Link>
                <Link href="/tentang">
                  Tentang
                </Link>
              </div>
          </div>

          <div className="space-y-5">
            <h4 className="font-semibold text-lg">
              Alamat
            </h4>
            <p className="text-sm">
            Jl. Prof. Dr. Sumantri Brojonegoro No. 1 <br />
            Bandar Lampung, 35145
            </p>
          </div>

          <div className="space-y-5 col-start-1 col-end-3 md:col-start-auto md:col-end-auto">
            <h4 className="font-semibold text-lg">
              {/* CONTACT */}
              Kontak
            </h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-center items-center gap-2">
                <BsFillTelephoneFill />
                +62-812-3456-7890
              </li>
              <li className="flex justify-center items-center gap-2">
                <MdEmail />
                admin@sigunila.ac.id
              </li>
              <li className="flex justify-center items-center gap-3 text-2xl pt-2">
                <Link href="#" target="_blank">
                  <RiInstagramFill />
                </Link>
                <Link href="#">
                  <RiFacebookBoxFill />
                </Link>
                <Link href="#">
                  <RiYoutubeFill />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-[1px] bg-[#DADADA] my-8"></div>

        <div>
          <p className="font-medium text-sm text-center">© 2023 SIG UNILA. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
