import assets from '@/assets/assets'
import Image from 'next/image'

export default function Tentang() {
  return (
    <div className="flex justify-center items-center py-36 px-32 gap-60">
      <h4 className="text-lg">
        SIG UNILA merupakan sebuah website yang menyediakan informasi mengenai
        fasilitas yang ada pada Universitas Lampung. SIG UNILA juga
        menyediakan sebuah peta digital Universitas Lampung dengan lokasi dari
        tiap fasilitas
      </h4>
      <Image
        src={assets.logoUnila}
        alt="universitas lampung logo"
        className="w-2/12"
      />
    </div>
  )
}
