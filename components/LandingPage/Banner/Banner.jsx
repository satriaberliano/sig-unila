// ** Import Next
import assets from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import banner from "../../../public/images/banner2.png";
import { IoNavigate } from "react-icons/io5";
import { useState } from "react";
import { motion } from "motion/react";

export default function Banner() {
  return (
    <div className="relative">
      <Image
        src={banner}
        alt="banner"
        className="w-full h-screen object-cover object-center"
        quality={100}
        placeholder="blur"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-sky-900/90"></div>
      <div className="absolute mt-20 top-0 right-0 bottom-0 left-0 flex justify-center items-center text-white flex-col space-y-6">
        <motion.div
          className="flex flex-col items-center justify-center gap-y-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-center font-semibold drop-shadow-md [text-shadow:_0_2px_0_rgb(0_0_0_/_30%)]">
            Sistem Informasi Geografis <br />
            Universitas Lampung
          </h1>

          <Link
            href="/fasilitas"
            className="flex items-center gap-2 text-sm sm:text-base bg-white text-black font-semibold px-5 py-2 rounded-full "
          >
            {/* <FaBuilding /> */}
            <IoNavigate />
            <span>Jelajahi Fasilitas</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
