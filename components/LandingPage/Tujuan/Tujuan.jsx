import { tujuanList } from '@/constant/list-tujuan'
import Image from 'next/image'

export default function Tujuan() {
  return (
    <div className="bg-[#0F6EE3] py-20 px-10 space-y-15 md:space-y-24">
    <h3 className="uppercase text-3xl md:text-4xl font-semibold text-white text-center">
      Tujuan
    </h3>
    <div className="flex flex-col flex-nowrap md:flex-wrap md:flex-row text-center justify-center space-y-12 md:space-y-0 xl:space-x-20">
      {
        tujuanList.map((data, index) => 
          <div className="flex flex-col items-center space-y-2" key={index}>
            <Image src={data.image} alt={`Gambar tujuan ${index+1}`} className="w-6/12 md:w-8/12" />
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
