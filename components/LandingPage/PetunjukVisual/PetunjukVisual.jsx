import Link from "next/link";
import React from "react";
import {
  FaExternalLinkAlt,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaUndoAlt,
} from "react-icons/fa";
import { FaPlusMinus } from "react-icons/fa6";

const PetunjukVisual = () => {
  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-md mt-2">
      <div className="flex items-center justify-between  mb-4">
        <h3 className="text-base font-semibold">Petunjuk Penggunaan Peta:</h3>
        <Link href="/panduan" aria-label="Panduan" title="Panduan">
          <FaExternalLinkAlt />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center md:justify-center">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <span className="text-sm">
            Klik marker untuk melihat detail fasilitas
          </span>
        </div>

        <div className="flex items-center md:justify-center">
          <FaPlusMinus className="text-green-500 mr-2" />
          <span className="text-sm">Klik untuk memperbesar/perkecil peta</span>
        </div>
        <div className="flex items-center md:justify-center">
          <FaLayerGroup className="text-purple-500 mr-2" />
          <span className="text-sm">Klik untuk memilih layer</span>
        </div>
        <div className="flex items-center md:justify-center">
          <FaUndoAlt className="text-red-500 mr-2" />
          <span className="text-sm">Reset posisi atau zoom peta</span>
        </div>
      </div>
    </div>
  );
};

export default PetunjukVisual;
