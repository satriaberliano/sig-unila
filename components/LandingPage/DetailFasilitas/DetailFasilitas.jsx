import assets from '@/assets/assets'
import Map from '@/components/Map/Map';
import Image from 'next/image'
import Link from 'next/link';
import { FaMapMarkerAlt } from "react-icons/fa";

export default function DetailFasilitas() {
  return (
    <div className='space-y-36 px-20 py-40'>
      <div className='flex justify-center items-center gap-10'>
        <div className='basis-1/2 flex justify-center items-center'>
          <Image src={assets.fasilitas} alt='Gambar fasilitas' className='w-[30rem] rounded-lg'/>
        </div>
        <div className='basis-1/2 space-y-6'>
          <h2 className='text-2xl font-semibold'>Fasilitas 1</h2>
            <Link className='flex items-center gap-3 text-red-700 w-fit' href='https://maps.app.goo.gl/GRNcpv2Sph2PUytk8' target='_blank'>
              <FaMapMarkerAlt />
              <p className='text-sm'>Navigasi</p>
            </Link>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, voluptates perspiciatis nostrum quos earum iste. Molestiae inventore reiciendis beatae aliquam harum nesciunt officiis error sapiente excepturi nemo eveniet qui a, eos necessitatibus maxime, ratione cupiditate possimus quo blanditiis itaque dolor. Id voluptatibus culpa quaerat excepturi provident quam repellat aliquid officiis deleniti, suscipit incidunt totam voluptatum eaque reiciendis ipsa fugiat? Eos quo aliquam temporibus quibusdam, fuga libero laboriosam repudiandae maiores unde dolore quasi aliquid ipsam alias dicta aperiam quisquam non velit nulla quia laborum amet sint voluptatem rem iusto. Facere fuga exercitationem id explicabo dolorum numquam ab laudantium adipisci sapiente voluptatibus.
          </p>
        </div>
      </div>
      <Map />
    </div>
  )
}
