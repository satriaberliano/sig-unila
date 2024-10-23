/* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import assets from "@/assets/assets";
// import Loading from "@/components/Admin/Loading/Loading";
// import { supabase } from "@/lib/supabase";
// import { useFetchData } from "@/zustand/useFetchData";
// import dynamic from "next/dynamic";

// // ** Import Next
// import Image from "next/image";
// import Link from "next/link";

// // ** Import React
// import React, { useEffect, useState } from "react";
// import { FaUser } from "react-icons/fa";

// const Map = dynamic(() => import("@/components/Map/Map"), {
//   ssr: false,
// });

// const Fasilitas = () => {
//   const [facilities, setFacilities] = useState(null);
//   const [fetchError, setFetchError] = useState(null);
//   const [search, setSearch] = useState("");
//   // const [debounceTimeout, setDebounceTimeout] = useState(null);

//   const { setFacility } = useFetchData();

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       const { data, error } = await supabase.from("fasilitas").select(`id,
//       name,
//       description,
//       latitude,
//       longitude,
//       url_image,
//       akses,
//       kontak (
//         nama_kontak,
//         nomor_telepon
//       ),
//       jam_operasional (
//         id_jam,
//         hari_awal,
//         hari_akhir,
//         jam_buka,
//         jam_tutup
//       )`);

//       if (error) {
//         setFetchError(`Tidak dapat melakukan fetch data Fasilitas`);
//         setFacilities(null);
//       }

//       if (data) {
//         setFacilities(data);
//         setFetchError(null);
//       }
//     };

//     fetchFacilities();
//   }, []);

//   const dataFacilityHandler = (val) => {
//     setFacility(val);
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   return (
//     <div className="bg-white pt-28 pb-24 px-12 sm:px-20 md:px-28 lg:px-32 min-h-screen">
//       <h2 className="text-3xl font-semibold text-center mb-10">Fasilitas</h2>
//       <Map
//         facilities={facilities}
//         search={search}
//         height={"h-[28rem]"}
//         id="map-container"
//       />
//       <div className="flex justify-center items-center my-10">
//         <input
//           className="border-2 p-2 w-full rounded-lg placeholder:text-sm placeholder:px-2"
//           type="text"
//           value={search}
//           placeholder="Cari fasilitas..."
//           onChange={handleSearchChange}
//         ></input>
//       </div>
//       <div>
//         {fetchError && <p className="text-center">{fetchError}</p>}
//         {facilities && facilities.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
//             {facilities
//               .filter((value) => {
//                 if (search === "") {
//                   return value;
//                 } else if (
//                   value.name.toLowerCase().includes(search.toLowerCase())
//                 ) {
//                   return value;
//                 }
//                 return null;
//               })
//               .sort(function (a, b) {
//                 if (a.name.toLowerCase() < b.name.toLowerCase()) {
//                   return -1;
//                 }
//                 if (a.name.toLowerCase() > b.name.toLowerCase()) {
//                   return 1;
//                 }
//                 return 0;
//               })
//               .map((fasilitas, index) => (
//                 <div
//                   className="w-full shadow-md rounded-md overflow-hidden border hover:shadow-slate-400 hover:ease-in hover:duration-500"
//                   key={index}
//                 >
//                   <Link
//                     href={`fasilitas/${fasilitas.id}`}
//                     onClick={() => dataFacilityHandler(fasilitas)}
//                   >
//                     <Image
//                       src={
//                         fasilitas.url_image
//                           ? fasilitas.url_image
//                           : assets.defaultImage
//                       }
//                       className="aspect-video object-cover"
//                       alt={`${fasilitas.name} image`}
//                       width={600}
//                       height={100}
//                     />
//                     <div className="p-6 space-y-4">
//                       <div className="grid grid-rows-2 gap-y-3">
//                         <div className="flex justify-between items-baseline gap-x-3">
//                           <h3 className="text-lg font-semibold">
//                             {fasilitas.name}
//                           </h3>
//                           <span
//                             className={`flex  h-fit rounded-full p-1 border-2 ${
//                               fasilitas.akses === "Umum dan Civitas Akademika"
//                                 ? "bg-[#25aa1e]"
//                                 : fasilitas.akses === "Civitas Akademika"
//                                 ? "bg-[#2163bf]"
//                                 : fasilitas.akses === "Tidak untuk umum"
//                                 ? "bg-[#b42f20]"
//                                 : ""
//                             } `}
//                           >
//                             <FaUser className="text-[10px] text-white" />
//                           </span>
//                         </div>
//                         <div
//                           dangerouslySetInnerHTML={{
//                             __html: `${fasilitas.description}`,
//                           }}
//                           className="desc-content text-sm line-clamp-3"
//                         />
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             {facilities.filter((value) =>
//               value.name.toLowerCase().includes(search.toLowerCase())
//             ).length === 0 && (
//               <p className="col-start-1 col-end-5 text-center italic text-gray-500 p-4 text-sm sm:text-base">
//                 Tidak ditemukan fasilitas yang cocok dengan pencarian Anda
//               </p>
//             )}
//           </div>
//         ) : (
//           <p className="text-center content-center italic text-gray-500 p-4">
//             Tidak ada fasilitas yang ditampilkan
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Fasilitas;
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
        // setAllFacilities(null);
      }

      if (data) {
        setFacilities(data);
        // setAllFacilities(data);
        setFetchError(null);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    // if (sortOrder !== "asc") params.set("sort", sortOrder);
    // if (selectedFaculty !== "all") params.set("faculty", selectedFaculty);

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
    <div className="bg-white pt-28 pb-24 px-12 sm:px-20 md:px-28 lg:px-32 min-h-screen">
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
      {/* <Map
        facilities={filteredAndSearchedResults}
        height={"h-[28rem]"}
        id="map-container"
      /> */}

      <PetunjukVisual />

      <div className="flex justify-center items-center mt-8 mb-5">
        <div className="relative flex-grow">
          <input
            // className="border-[2px] p-2 w-full rounded-lg pl-9 placeholder:text-sm"
            className="block ps-10 p-3 w-full pl-9 placeholder:text-sm text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        {fetchError && <p className="text-center">{fetchError}</p>}
        {/* {searchResults && searchResults.length > 0 ? ( */}
        {filteredAndSearchedResults && filteredAndSearchedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
            {filteredAndSearchedResults.map((fasilitas, index) => (
              <div
                className="w-full shadow-md rounded-md overflow-hidden border hover:shadow-slate-400 hover:ease-in hover:duration-500"
                key={fasilitas.id}
              >
                <Link
                  href={`fasilitas/${fasilitas.id}`}
                  // onClick={() => dataFacilityHandler(fasilitas)}
                >
                  <Image
                    src={fasilitas.url_image || assets.defaultImage}
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
                        {/* <span
                          className={`flex h-fit rounded-full p-1 border-2 ${
                            fasilitas.akses === "Umum dan Civitas Akademika"
                              ? "bg-[#25aa1e]"
                              : fasilitas.akses === "Civitas Akademika"
                              ? "bg-[#2163bf]"
                              : fasilitas.akses === "Tidak untuk umum"
                              ? "bg-[#b42f20]"
                              : ""
                          }`}
                        >
                          <FaUser className="text-[10px] text-white" />
                        </span> */}
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Fasilitas;
