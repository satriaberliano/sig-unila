"use client";

import assets from "@/assets/assets";
import Loading from "@/components/Admin/Loading/Loading";
import { supabase } from "@/lib/supabase";
import { useFetchData } from "@/zustand/useFetchData";
import dynamic from "next/dynamic";

// ** Import Next
import Image from "next/image";
import Link from "next/link";

// ** Import React
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});

const Fasilitas = () => {
  const [facilities, setFacilities] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  // const [debounceTimeout, setDebounceTimeout] = useState(null);

  const { setFacility } = useFetchData();

  useEffect(() => {
    const fetchFacilities = async () => {
      const { data, error } = await supabase.from("fasilitas").select(`id,
      name,
      description,
      latitude,
      longitude,
      url_image,
      akses,
      kontak (
        nama_kontak,
        nomor_telepon
      ),
      jam_operasional (
        id_jam,
        hari_awal,
        hari_akhir,
        jam_buka,
        jam_tutup
      )`);

      if (error) {
        setFetchError(`Tidak dapat melakukan fetch data Fasilitas`);
        setFacilities(null);
      }

      if (data) {
        setFacilities(data);
        setFetchError(null);
      }
    };

    fetchFacilities();
  }, []);

  const dataFacilityHandler = (val) => {
    setFacility(val);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="bg-white pt-28 pb-24 px-12 sm:px-20 md:px-28 lg:px-32 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-10">Fasilitas</h2>
      <Map
        facilities={facilities}
        search={search}
        height={"h-[28rem]"}
        id="map-container"
      />
      <div className="flex justify-center items-center my-10">
        <input
          className="border-2 p-2 w-full rounded-lg placeholder:text-sm placeholder:px-2"
          type="text"
          value={search}
          placeholder="Cari fasilitas..."
          onChange={handleSearchChange}
        ></input>
      </div>
      <div>
        {fetchError && <p className="text-center">{fetchError}</p>}
        {facilities && facilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
            {facilities
              .filter((value) => {
                if (search === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return value;
                }
                return null;
              })
              .sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                return 0;
              })
              .map((fasilitas, index) => (
                <div
                  className="w-full shadow-md rounded-md overflow-hidden border hover:shadow-slate-400 hover:ease-in hover:duration-500"
                  key={index}
                >
                  <Link
                    href={`fasilitas/${fasilitas.id}`}
                    onClick={() => dataFacilityHandler(fasilitas)}
                  >
                    <Image
                      src={
                        fasilitas.url_image
                          ? fasilitas.url_image
                          : assets.defaultImage
                      }
                      className="aspect-video object-cover"
                      alt={`${fasilitas.name} image`}
                      width={600}
                      height={100}
                    />
                    <div className="p-6 space-y-4">
                      <div className="grid grid-rows-2 gap-y-3">
                        <div className="flex justify-between items-baseline gap-x-3">
                          <h3 className="text-lg font-semibold">
                            {fasilitas.name}
                          </h3>
                          <span
                            className={`flex  h-fit rounded-full p-1 border-2 ${
                              fasilitas.akses === "Umum dan Civitas Akademika"
                                ? "bg-[#25aa1e]"
                                : fasilitas.akses === "Civitas Akademika"
                                ? "bg-[#2163bf]"
                                : fasilitas.akses === "Tidak untuk umum"
                                ? "bg-[#b42f20]"
                                : ""
                            } `}
                          >
                            <FaUser className="text-[10px] text-white" />
                          </span>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${fasilitas.description}`,
                          }}
                          className="desc-content text-sm line-clamp-3"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            {facilities.filter((value) =>
              value.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <p className="col-start-1 col-end-5 text-center italic text-gray-500 p-4 text-sm sm:text-base">
                Tidak ditemukan fasilitas yang cocok dengan pencarian Anda
              </p>
            )}
          </div>
        ) : (
          <p className="text-center content-center italic text-gray-500 p-4">
            Tidak ada fasilitas yang ditampilkan
          </p>
        )}
      </div>
    </div>
  );
};

export default Fasilitas;
