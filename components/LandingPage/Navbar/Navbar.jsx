"use client";

// ** Import Next
import assets from "@/assets/assets";
import { useSidebar } from "@/zustand/useSidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  const pathname = usePathname();
  const { openPublic, setOpenPublic } = useSidebar();

  return (
    <>
      <nav className="px-10 md:px-16 py-3 flex items-center justify-between bg-[#0F6EE3] text-white fixed top-0 w-full z-[10000]">
        <Image
          src={assets.logoUnila}
          alt="universitas lampung logo"
          className="w-10"
        />
        <FiMenu
          className="text-2xl block md:hidden cursor-pointer"
          onClick={setOpenPublic}
        />
        <div className="space-x-8 text-sm hidden md:flex">
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "underline font-semibold"
                : "no-underline font-normal"
            } hover:underline`}
          >
            Beranda
          </Link>
          <Link
            href="/fasilitas"
            className={`${
              pathname === "/fasilitas"
                ? "underline font-semibold"
                : "no-underline font-normal"
            } hover:underline`}
          >
            Fasilitas
          </Link>
          <Link
            href="/peta"
            className={`${
              pathname === "/peta"
                ? "underline font-semibold"
                : "no-underline font-normal"
            } hover:underline`}
          >
            Peta
          </Link>

          <div className="relative">
            <div onClick={() => setDropdown(!dropdown)}>
              <div className="flex justify-between items-center gap-1 cursor-pointer hover:underline">
                <span>Lainnya</span>
                <span className="transition-transform">
                  {dropdown ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </span>
              </div>
            </div>

            {dropdown && (
              <div className="absolute flex flex-col gap-4 bg-[#0F6EE3] mt-6 w-40 rounded-sm px-5 py-6 -z-10 text-sm">
                <Link
                  href="/tentang"
                  onClick={() => setDropdown(false)}
                  className={`${
                    pathname === "/tentang"
                      ? "underline font-semibold"
                      : "no-underline font-normal"
                  } hover:underline`}
                >
                  Tentang
                </Link>
                <Link
                  href="/panduan"
                  onClick={() => setDropdown(false)}
                  className={`${
                    pathname === "/panduan"
                      ? "underline font-semibold"
                      : "no-underline font-normal"
                  } hover:underline`}
                >
                  Panduan
                </Link>
                <Link
                  href="/kontak-kami"
                  onClick={() => setDropdown(false)}
                  className={`${
                    pathname === "/kontak-kami"
                      ? "underline font-semibold"
                      : "no-underline font-normal"
                  } hover:underline`}
                >
                  Kontak Kami
                </Link>
              </div>
            )}
          </div>

          {/* <Link href="/masuk" className="hover:underline">
            Admin
          </Link> */}
        </div>
      </nav>

      <nav
        className={`justify-center items-center flex-col w-full h-full fixed gap-10 z-[10000000] bg-[#0F6EE3] text-white -translate-x-full duration-700 transition-transform flex ${
          openPublic ? "transform-none" : ""
        }`}
      >
        <IoIosClose
          className="block text-4xl absolute top-5 right-5 cursor-pointer"
          onClick={setOpenPublic}
        />
        <Link
          href="/"
          className={`${
            pathname === "/"
              ? "underline font-semibold"
              : "no-underline font-normal"
          } hover:underline`}
          onClick={setOpenPublic}
        >
          Beranda
        </Link>
        <Link
          href="/fasilitas"
          className={`${
            pathname === "/fasilitas"
              ? "underline font-semibold"
              : "no-underline font-normal"
          } hover:underline`}
          onClick={setOpenPublic}
        >
          Fasilitas
        </Link>
        <Link
          href="/peta"
          className={`${
            pathname === "/peta"
              ? "underline font-semibold"
              : "no-underline font-normal"
          } hover:underline`}
          onClick={setOpenPublic}
        >
          Peta
        </Link>
        <Link
          href="/tentang"
          className={`${
            pathname === "/tentang"
              ? "underline font-semibold"
              : "no-underline font-normal"
          } hover:underline`}
          onClick={setOpenPublic}
        >
          Tentang
        </Link>
        <Link
          href="/panduan"
          className={`${
            pathname === "/panduan"
              ? "underline font-semibold"
              : "no-underline font-normal"
          } hover:underline`}
          onClick={setOpenPublic}
        >
          Panduan
        </Link>
        <Link
          href="/kontak-kami"
          className={`${
            pathname === "/kontak-kami"
              ? "underline font-semibold"
              : "no-underline font-normal"
          } hover:underline`}
          onClick={setOpenPublic}
        >
          Kontak Kami
        </Link>
        {/* <Link href="/masuk" className="hover:underline">
          Admin
        </Link> */}
      </nav>
    </>
  );
}
