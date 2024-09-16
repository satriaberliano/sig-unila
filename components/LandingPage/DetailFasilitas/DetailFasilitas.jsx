"use client";

// ** Import Assets
import assets from "@/assets/assets";
import { useFetchData } from "@/zustand/useFetchData";
import dynamic from "next/dynamic";

// ** Import Next
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ** Import Icons
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { LuClock4 } from "react-icons/lu";

// ** Import Components
// import MapEachFacility from "../MapEachFacility/MapEachFacility";

const MapEachFacility = dynamic(
  () => import("@/components/LandingPage/MapEachFacility/MapEachFacility"),
  {
    ssr: false,
  }
);

const DetailFasilitas = ({ facility: fasilitas }) => {
  return (
    <>
      {
        // facility.map((fasilitas, index) => (
        fasilitas != (null || undefined) ? (
          <div
            className="space-y-36 px-11 md:px-20 py-32 md:py-40"
            key={fasilitas.id}
          >
            <div className="flex flex-col lg:flex-row justify-center lg:items-start gap-10 md:gap-20">
              <div className="md:basis-1/2 flex lg:justify-center md:items-center w-full">
                <Image
                  src={
                    fasilitas.url_image ? fasilitas.url_image : assets.fasilitas
                  }
                  alt={`Gambar fasilitas ${fasilitas.name}`}
                  className=" rounded-lg "
                  width={500}
                  height={600}
                />
              </div>
              <div className=" md:basis-1/2 space-y-8">
                <h2 className="text-3xl font-semibold">{fasilitas.name}</h2>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                  <div className="lg:basis-1/2 space-y-4">
                    <Link
                      className="flex items-center gap-3 text-red-700 w-fit"
                      href={`https://www.google.com/maps/place/${fasilitas.latitude}+${fasilitas.longitude}`}
                      target="_blank"
                      onClick=""
                    >
                      <FaMapMarkerAlt />
                      <p className="text-base font-medium">Navigasi</p>
                    </Link>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center text-lg">
                        <LuClock4 />
                      </div>
                      <div className="flex flex-col text-sm">
                        {fasilitas.jam_operasional
                          ? fasilitas.jam_operasional.map((item) => (
                              <div key={item.id_jam}>
                                <span>{`${item.jam_buka} - ${item.jam_tutup} `}</span>
                                {item.hari_awal === item.hari_akhir ? (
                                  <span>{`(${item.hari_awal})`}</span>
                                ) : (
                                  <span>{`(${item.hari_awal} s.d ${item.hari_akhir})`}</span>
                                )}
                              </div>
                            ))
                          : "No Information"}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm lg:basis-1/2">
                    {fasilitas.akses === "Umum dan Civitas Akademika" ? (
                      <span className="py-2 px-4 text-xs space-x-2 font-semibold text-[#0c3d0a] bg-[#30dd27] rounded-full flex items-center w-fit">
                        <FaUser className="inline" />
                        <span>{`${fasilitas.akses}`}</span>
                      </span>
                    ) : fasilitas.akses === "Civitas Akademika" ? (
                      <span className="py-2 px-4 text-xs space-x-2 font-semibold text-[#0a113d] bg-[#2773dd] rounded-full flex items-center w-fit">
                        <FaUser className="inline" />
                        <span>{`${fasilitas.akses}`}</span>
                      </span>
                    ) : fasilitas.akses === "Tidak untuk umum" ? (
                      <span className="py-2 px-4 text-xs space-x-2 font-semibold text-[#3d0f0a] bg-[#dd3927] rounded-full flex items-center w-fit">
                        <FaUser className="inline" />
                        <span>{`${fasilitas.akses}`}</span>
                      </span>
                    ) : (
                      "Tidak ada informasi akses"
                    )}
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${fasilitas.description}`,
                  }}
                  className="desc-content"
                />
                <div className="text-sm">
                  {fasilitas.kontak ? (
                    <div className="flex items-center gap-2">
                      <BiSolidContact />
                      {fasilitas.kontak.nama_kontak === null ? (
                        <span>{`Kontak: ${fasilitas.kontak.nomor_telepon}`}</span>
                      ) : (
                        <span>{`Kontak: ${fasilitas.kontak.nama_kontak} - ${fasilitas.kontak.nomor_telepon}`}</span>
                      )}
                    </div>
                  ) : (
                    " "
                  )}
                </div>
              </div>
            </div>
            <MapEachFacility
              facilityLat={fasilitas.latitude}
              facilityLong={fasilitas.longitude}
              facilityName={fasilitas.name}
              id="map-each-container"
            />
          </div>
        ) : (
          notFound()
        )
      }
      {/* {params.fasilitasId !== facility.id ? notFound() : ""} */}
      {/* {facility.id !== params.fasilitasId ? notFound() : ""} */}
    </>
  );
};

export default DetailFasilitas;
