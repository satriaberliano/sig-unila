"use client";

// ** Import Assets
import assets from "@/assets/assets";

// ** Import Next
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ** Import Icons
import { FaMapMarkerAlt } from "react-icons/fa";

// ** Import Components
import MapEachFacility from "../MapEachFacility/MapEachFacility";

const DetailFasilitas = ({ facility }) => {
  // if (facility.length == 0) {
  //   notFound();
  // }

  return (
    <>
      {facility && facility.length > 0
        ? facility.map((fasilitas, index) => (
            <div
              className="space-y-36 px-14 md:px-20 py-32 md:py-40"
              key={index}
            >
              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 md:gap-20">
                <div className="basis-1 md:basis-1/2 flex justify-center lg:justify-start items-center w-full">
                  <Image
                    src={
                      fasilitas.url_image
                        ? fasilitas.url_image
                        : assets.fasilitas
                    }
                    alt={`Gambar fasilitas ${fasilitas.name}`}
                    className="w-full rounded-lg"
                    width={500}
                    height={600}
                  />
                </div>
                <div className="basis-1 md:basis-1/2 space-y-6">
                  <h2 className="text-2xl font-semibold">{fasilitas.name}</h2>
                  <Link
                    className="flex items-center gap-3 text-red-700 w-fit"
                    href={`https://www.google.com/maps/place/${fasilitas.latitude}+${fasilitas.longitude}`}
                    target="_blank"
                    onClick=""
                  >
                    <FaMapMarkerAlt />
                    <p className="text-sm">Navigasi</p>
                  </Link>
                  <p className="text-base">{fasilitas.description}</p>
                </div>
              </div>
              <MapEachFacility
                facilityLat={fasilitas.latitude}
                facilityLong={fasilitas.longitude}
                facilityName={fasilitas.name}
              />
            </div>
          ))
        : notFound()}
      {/* {params.fasilitasId !== facility.id ? notFound() : ""} */}
      {/* {facility.id !== params.fasilitasId ? notFound() : ""} */}
    </>
  );
};

export default DetailFasilitas;
