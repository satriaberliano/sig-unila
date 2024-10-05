// ** Import Next
import assets from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative">
      <Image
        src={assets.banner}
        alt="banner"
        className="w-full h-screen object-cover object-center"
        quality={100}
        placeholder="blur"
        priority
      />
      <div className="absolute mt-20 top-0 right-0 bottom-0 left-0 flex justify-center items-center text-white flex-col space-y-6">
        <div className="flex flex-col items-center justify-center gap-y-16">
          <h1 className="text-3xl md:text-4xl lg:text-6xl text-center font-semibold drop-shadow-md">
            Sistem Informasi Geografis <br />
            Universitas Lampung
          </h1>

          <Link
            href="/fasilitas"
            className="text-sm sm:text-base border-2 border-white bg-transparent px-5 py-2 rounded-full tracking-wide"
          >
            Jelajahi Fasilitas
          </Link>
        </div>
      </div>
    </div>
  );
}
