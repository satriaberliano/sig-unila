/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaSort, FaUser, FaSearch } from "react-icons/fa";

import { supabase } from "@/lib/supabase";
import { useFetchData } from "@/zustand/useFetchData";
import assets from "@/assets/assets";

import dynamic from "next/dynamic";
import Fuse from "fuse.js";
import { useRouter, useSearchParams } from "next/navigation";
import PetunjukVisual from "@/components/LandingPage/PetunjukVisual/PetunjukVisual";
import { useFacilities } from "@/zustand/useFacilities";
import { shimmer, toBase64 } from "@/lib/shimmer";
import supabaseLoader from "@/lib/loader";

const MapSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-[28rem] w-full" />
);

const Map = dynamic(() => import("@/components/Map/Map"), {
  loading: () => <MapSkeleton />,
  ssr: false,
});

const Fasilitas = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [facilities, setFacilities] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" atau "desc"
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [mapError, setMapError] = useState(null);

  const { setFacility } = useFetchData();
  // const { setAllFacilities } = useFacilities();

  const faculties = ["FMIPA", "FT", "FEB", "FKIP", "FH", "FP", "FK", "FISIP"];

  useEffect(() => {
    const fetchFacilities = async () => {
      const { data, error } = await supabase.from("fasilitas").select(`
        id,
        name,
        description,
        latitude,
        longitude,
        url_image,
        akses,
        fakultas,
        maintenance,
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
        )
      `);

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

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    router.push(`/fasilitas?${params.toString()}`, { scroll: false });
  }, [search, router]);

  // Konfigurasi Fuse.js
  const fuseOptions = {
    keys: ["name", "description"],
    threshold: 0.3,
    includeScore: true,
  };

  // Inisialisasi Fuse instance
  const fuse = useMemo(
    () => facilities && new Fuse(facilities, fuseOptions),
    [facilities]
  );

  const getFuzzySearchResults = (searchTerm) => {
    if (!fuse || searchTerm === "") return facilities || [];
    const results = fuse.search(searchTerm);
    return results.map((result) => ({ ...result.item, score: result.score }));
  };

  const sortFacilities = (facilities, order) => {
    return [...facilities].sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const filterByFaculty = (facilities, faculty) => {
    if (faculty === "all") return facilities;
    return facilities.filter((facility) => facility.fakultas === faculty);
  };

  const filteredAndSearchedResults = useMemo(() => {
    let results = getFuzzySearchResults(search);
    results = filterByFaculty(results, selectedFaculty);

    if (search !== "") {
      results.sort((a, b) => a.score - b.score);
    } else {
      results = sortFacilities(results, sortOrder);
    }

    return results;
  }, [search, facilities, selectedFaculty, sortOrder]);

  const dataFacilityHandler = (val) => {
    setFacility(val);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleFacultyFilter = (faculty) => {
    setSelectedFaculty((prevFaculty) =>
      prevFaculty === faculty ? "all" : faculty
    );
  };

  const handleMapError = (error) => {
    console.error("Map failed to load:", error);
    setMapError("Peta gagal dimuat. Silakan coba muat ulang halaman.");
  };

  return (
    <div className="bg-white pt-28 pb-24 px-10 sm:px-20 md:px-28 lg:px-32 min-h-screen max-w-screen-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10">Fasilitas</h2>
      {mapError ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 h-[28rem]"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">
            {mapError || "Peta gagal dimuat"}
          </span>
        </div>
      ) : (
        <Map
          facilities={filteredAndSearchedResults}
          height={"h-[28rem]"}
          id="map-container"
          onError={handleMapError}
        />
      )}

      <PetunjukVisual />

      <div className="flex justify-center items-center mt-8 mb-5">
        <div className="relative flex-grow">
          <input
            className="block ps-10 p-3 w-full pl-9 placeholder:text-sm text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            value={search}
            placeholder="Cari Fasilitas..."
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={handleSortToggle}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center whitespace-nowrap min-w-[80px] h-[46px]"
        >
          <FaSort className="mr-2" />
          <span>{sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {faculties.map((faculty) => (
          <button
            key={faculty}
            onClick={() => handleFacultyFilter(faculty)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedFaculty === faculty
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {faculty}
          </button>
        ))}
      </div>

      <div className="mb-10 text-sm text-gray-500">
        Total Fasilitas :{" "}
        {filteredAndSearchedResults
          ? filteredAndSearchedResults.length
          : "Loading"}
      </div>
      <div>
        {fetchError ? (
          <p className="text-center text-red-500">{fetchError}</p>
        ) : !facilities ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 animate-pulse">
            <div className="h-80 w-full shadow-md rounded-md overflow-hidden border bg-gray-200/80"></div>
            <div className="h-80 w-full shadow-md rounded-md overflow-hidden border bg-gray-200/80"></div>
            <div className="h-80 w-full shadow-md rounded-md overflow-hidden border bg-gray-200/80"></div>
            <div className="h-80 w-full shadow-md rounded-md overflow-hidden border bg-gray-200/80"></div>
          </div>
        ) : filteredAndSearchedResults.length === 0 ? (
          <div className="text-center content-center text-gray-500 px-4 py-8 flex flex-col items-center gap-5">
            <Image
              alt="Search Not Found"
              src="/images/search-facility.png"
              width={175}
              height={175}
            />
            <div className="space-y-8">
              <p className="text-[#0F6EE3] ">
                {facilities
                  ? `Fasilitas "${search}" tidak ditemukan berdasarkan masukkan Anda`
                  : "Tidak ada fasilitas yang ditampilkan"}
              </p>
              <p className="text-sm">
                Klik di sini{" "}
                <Link href="/kontak-kami" className="font-medium underline">
                  Kontak Kami
                </Link>{" "}
                untuk menyarankan penambahan fasilitas kepada admin.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
            {filteredAndSearchedResults.map((fasilitas) => (
              <div
                className="w-full shadow-md rounded-md overflow-hidden border hover:shadow-slate-400 hover:ease-in-out hover:duration-700"
                key={fasilitas.id}
              >
                <Link href={`fasilitas/${fasilitas.id}`}>
                  {/* <Image
                    src={fasilitas.url_image || assets.defaultImage}
                    className="aspect-video object-cover"
                    alt={`${fasilitas.name} image`}
                    width={600}
                    height={100}
                  /> */}
                  <Image
                    src={fasilitas.url_image || assets.defaultImage}
                    alt={`${fasilitas.name} image`}
                    width={4640}
                    height={3472}
                    className="aspect-video object-cover"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(4640, 3472)
                    )}`}
                    loading="lazy"
                  />
                  {/* <ImageBlur src={fasilitas.url_image} name={fasilitas.name} /> */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-rows-2 gap-y-3">
                      <div className="flex justify-between items-baseline gap-x-3">
                        <h3 className="text-lg font-semibold">
                          {fasilitas.name}
                        </h3>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: fasilitas.description,
                        }}
                        className="desc-content text-sm line-clamp-3"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fasilitas;
