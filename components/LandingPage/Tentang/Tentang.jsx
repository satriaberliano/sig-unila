import assets from '@/assets/assets'
import Image from 'next/image'

export default function Tentang() {
  return (
    <div className="flex justify-center items-center p-20 gap-14 flex-col-reverse md:flex-row md:p-24 md:gap-32 lg:py-36 lg:px-32 lg:gap-60">
      <h4 className="text-base text-center md:text-lg md:text-left">
        SIG UNILA merupakan sebuah website yang menyediakan informasi mengenai
        fasilitas yang ada pada Universitas Lampung. SIG UNILA juga
        menyediakan sebuah peta digital Universitas Lampung dengan lokasi dari
        tiap fasilitas
      </h4>
      <Image
        src={assets.logoUnila}
        alt="universitas lampung logo"
        className="w-4/12 md:w-3/12 lg:w-2/12"
      />
    </div>
  )
}
