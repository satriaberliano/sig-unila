import assets from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
// import { IoMdNavigate } from "react-icons/io";

export default function Navigasi() {
  return (
    <div className="relative pb-24">
      <div className="py-24 lg:py-32 px-10 gap-20 md:gap-10 flex justify-center items-center md:items-start lg:justify-around flex-col md:flex-row">
        <Image
          src="/images/maps.png"
          alt="Navigasi image"
          className="w-80 rounded-2xl"
          width={500}
          height={500}
        />
        <div className="text-center space-y-6 my-auto md:p-8">
          <h4 className="font-semibold text-2xl sm:text-3xl">
            Kunjungi Universitas Lampung
          </h4>
          <p>
            Jl. Prof. Dr. Sumantri Brojonegoro No. 1 <br />
            Bandar Lampung, 35145
          </p>
          <Link
            target="_blank"
            href="https://maps.app.goo.gl/GRNcpv2Sph2PUytk8"
            className="flex justify-center items-center bg-[#0F6EE3] rounded-lg p-2 text-white gap-2 w-4/12 mx-auto"
          >
            {/* <IoMdNavigate /> */}
            <FaMapMarkerAlt />
            <span>Navigasi</span>
          </Link>
        </div>
      </div>
      <Image
        src="/images/wave.svg"
        className="w-full absolute -bottom-0 -z-[10000]"
        width={500}
        height={500}
        alt="wave image"
      />
    </div>
  );
}
