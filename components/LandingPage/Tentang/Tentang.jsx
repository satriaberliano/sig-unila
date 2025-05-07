import { motion } from "motion/react";
import assets from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Tentang() {
  return (
    <motion.div
      className="flex justify-center items-center py-20 px-14 sm:p-20 gap-14 flex-col-reverse md:flex-row md:p-24 md:gap-32 lg:py-36 lg:px-32 lg:gap-60"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col items-center md:items-start gap-y-12">
        <h4 className="text-base text-center md:text-lg md:text-left">
          SIG UNILA merupakan sebuah website yang menyediakan informasi mengenai
          fasilitas yang ada pada Universitas Lampung. SIG UNILA juga
          menyediakan sebuah peta digital Universitas Lampung dengan lokasi dari
          tiap fasilitas
        </h4>
        <Link
          href="/tentang"
          className="px-3 py-2 bg-[#0F6EE3] text-white w-fit rounded-md text-sm flex items-center gap-x-4"
        >
          <span>Selengkapnya</span>
          <FaArrowRight />
        </Link>
      </div>
      <Image
        src={assets.logoUnila}
        alt="Logo Universitas Lampung"
        className="w-4/12 md:w-3/12 lg:w-2/12"
      />
    </motion.div>
  );
}
