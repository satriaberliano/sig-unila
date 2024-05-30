"use client";

import assets from "@/assets/assets";
import Map from "@/components/Map/Map";
import { supabase } from "@/lib/supabase";

// ** Import Next
import Image from "next/image";
import Link from "next/link";

// ** Import React
import React, { useEffect, useState } from "react";

const Fasilitas = () => {
  const [facilities, setFacilities] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      const { data, error } = await supabase.from("fasilitas").select();

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

  return (
    <div className="bg-white pt-28 pb-24 px-12 sm:px-20 md:px-28 lg:px-32 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-10">Fasilitas</h2>
      <Map facilities={facilities} search={search} />
      <div className="flex justify-center items-center my-10">
        <input
          className="border-2 p-2 w-full rounded-lg placeholder:text-sm placeholder:px-2"
          placeholder="Cari fasilitas..."
          onChange={(e) => {
            // setInterval(setSearch(e.target.value), 10000);
            setSearch(e.target.value);
          }}
        ></input>
      </div>
      <div>
        {fetchError && <p className="text-center">{fetchError}</p>}
        {facilities && facilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                  <Link href={`fasilitas/${fasilitas.id}`}>
                    <Image
                      src={
                        fasilitas.url_image
                          ? fasilitas.url_image
                          : assets.defaultImage
                      }
                      className="aspect-video"
                      alt={`${fasilitas.name} image`}
                      width={600}
                      height={100}
                    />
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold">
                        {fasilitas.name}
                      </h3>
                      <p className="text-sm line-clamp-3">
                        {fasilitas.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            {facilities.filter((value) =>
              value.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <p className="col-start-1 col-end-4 text-center italic text-gray-500 p-4 text-sm sm:text-base">
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
