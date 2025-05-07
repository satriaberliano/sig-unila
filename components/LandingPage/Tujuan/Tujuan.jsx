import { tujuanList } from "@/constant/list-tujuan";
import Image from "next/image";
import { motion } from "motion/react";

export default function Tujuan() {
  return (
    <div className="bg-[#0F6EE3] py-20 px-10 space-y-15 md:space-y-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-2xl sm:text-3xl  font-semibold text-white text-center mb-8">
          Tujuan SIG UNILA
        </h3>
        <div className="flex flex-col flex-nowrap md:flex-wrap md:flex-row text-center justify-center 2xl:justify-evenly space-y-12 md:space-y-0 lg:gap-x-4">
          {tujuanList.map((data, index) => (
            <div className="flex flex-col items-center max-w-2xl" key={index}>
              <Image
                src={data.image}
                alt={`Gambar tujuan ${index + 1}`}
                className="w-5/12 md:w-8/12"
              />
              <p className="text-white lg:w-96">{data.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
