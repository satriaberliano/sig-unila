import { tujuanList } from '@/constant/list-tujuan'
import Image from 'next/image'

export default function Tujuan() {
  return (
    <div className="bg-[#0F6EE3] py-20 px-10 space-y-24">
    <h3 className="uppercase text-4xl font-semibold text-white text-center">
      Tujuan
    </h3>
    <div className="flex text-center justify-center space-x-20">
      {
        tujuanList.map((data, index) => 
          <div className="flex flex-col items-center space-y-2" key={index}>
            <Image src={data.image} alt="Gambar tujuan 1" className="w-8/12" />
            <p className="text-white w-96">
              {data.description}
            </p>
          </div>
        )
      }
    </div>
  </div>
  )
}
