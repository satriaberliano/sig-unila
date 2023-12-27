// ** Import Next
import assets from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="px-16 py-3 flex items-center justify-between bg-[#0F6EE3] text-white fixed top-0 w-full z-10">
      <Image
        src={assets.logoUnila}
        alt="universitas lampung logo"
        className="w-10"
      />
      <div className="flex space-x-8 text-sm">
        <Link href="/">Beranda</Link>
        <Link href="/fasilitas">Fasilitas</Link>
        <Link href="/tentang">Tentang</Link>
        <Link href="/masuk">Masuk</Link>
      </div>
    </nav>
  )
}
