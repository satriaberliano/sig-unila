// ** Import Next
import assets from '@/assets/assets'
import Image from 'next/image'

export default function Banner() {
  return (
    <div>
      <Image
        src={assets.banner}
        alt="banner"
        className="w-full h-screen object-cover object-center"
        quality={100}
        placeholder='blur'
        priority
      />
      <div className="absolute mt-20 top-0 right-0 bottom-0 left-0 flex justify-center items-center text-white flex-col space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold uppercase">
          Sistem Informasi Geografis <br />
          Universitas Lampung
        </h1>
      </div>
    </div>
  )
}
