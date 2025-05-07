import React from "react";
import { LuBookOpen, LuBuilding, LuUsers } from "react-icons/lu";
import { motion } from "motion/react";

const StatistikKampus = () => {
  return (
    <section className="bg-gray-100 p-20">
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold mb-20 text-center">
          Statistik Universitas Lampung
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center gap-y-16 md:gap-y-0">
          <div className="space-y-2">
            <LuUsers className="w-12 h-12 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">25,000+</p>
            <p>Mahasiswa</p>
          </div>
          <div className="space-y-2">
            <LuBookOpen className="w-12 h-12 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">100+</p>
            <p>Program Studi</p>
          </div>
          <div className="space-y-2">
            <LuBuilding className="w-12 h-12 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">8</p>
            <p>Fakultas</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StatistikKampus;
