'use client'

// ** Import Next
import assets from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="px-16 py-3 flex items-center justify-between bg-[#0F6EE3] text-white fixed top-0 w-full z-[10000]">
      <Image
        src={assets.logoUnila}
        alt="universitas lampung logo"
        className="w-10"
      />
      <div className="flex space-x-8 text-sm">
        <Link href="/" className={`${pathname === '/' ? "underline font-medium" : "no-underline font-normal"}`}>Beranda</Link>
        <Link href="/fasilitas" className={`${pathname === '/fasilitas' ? "underline font-medium" : "no-underline font-normal"}`}>Fasilitas</Link>
        <Link href="/tentang" className={`${pathname === '/tentang' ? "underline font-medium" : "no-underline font-normal"}`}>Tentang</Link>
        <Link href="/masuk">Masuk</Link>
      </div>
    </nav>
  )
}
