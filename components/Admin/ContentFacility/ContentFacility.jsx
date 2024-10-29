/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import assets from "@/assets/assets";
import Image from "next/image";

import { IoAddOutline } from "react-icons/io5";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useModalFacility } from "@/zustand/useModalFacility";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useImages } from "@/zustand/useImages";
import { BiSearch } from "react-icons/bi";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";

export const ContentFacility = () => {
  const { setFacility, setData, setIsEdit } = useModalFacility();
  const { setImage, setDataImages } = useImages();
  const [facilities, setFacilities] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchDataFacilitites = async () => {
      try {
        const { data: facilities, error } = await supabase.from("fasilitas")
          .select(`id,
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
            )`);

        if (facilities) {
          setFacilities(facilities);
          setFetchError(null);
        }

        if (error) {
          setFetchError(error.message);
          setFacilities(null);
          throw error;
        }
      } catch (error) {
        setFetchError("Gagal memuat data fasilitas");
      } finally {
        setLoading(false);
      }
    };

    fetchDataFacilitites();
  }, []);

  const onDeleteHandler = async (fasilitas) => {
    Swal.fire({
      icon: "warning",
      text: "Apakah anda yakin ingin menghapus?",
      showCancelButton: true,
      confirmButtonColor: "#C93233",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await supabase.storage
          .from("image")
          .remove([`${fasilitas.url_image.slice(72)}`]);

        const { error } = await supabase
          .from("fasilitas")
          .delete()
          .eq("id", fasilitas.id);
        if (!error) {
          Swal.fire({
            title: "Berhasil",
            icon: "success",
            text: "Data Berhasil Dihapus",
          }).then(() => {
            router.refresh();
          });
        } else {
          Swal.fire({
            title: "Gagal",
            icon: "error",
            text: error.message,
          });
        }
      }
    });
  };

  const onEditHandler = (val) => {
    setData(val);
    router.push(`/data-fasilitas/sunting-fasilitas/${val.id}`);
    // setIsEdit();
  };

  const onImageHandler = (val) => {
    setDataImages(val);
    setImage();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const fuseOptions = {
    keys: ["name"],
    threshold: 0.3,
    includeScore: true,
  };

  const fuse = useMemo(
    () => facilities && new Fuse(facilities, fuseOptions),
    [facilities]
  );

  const getFuzzySearchResults = (searchTerm) => {
    if (!fuse || searchTerm === "") return facilities || [];
    const results = fuse.search(searchTerm);
    return results.map((result) => ({ ...result.item, score: result.score }));
  };

  const filteredResults = useMemo(() => {
    let results = getFuzzySearchResults(search);

    return results;
  }, [search]);

  return (
    <main className={`w-full mb-4`}>
      <div className="flex justify-between mb-6">
        <h2 className="font-medium text-lg">Data Fasilitas</h2>
        <div className="flex gap-x-2 gap-y-2 flex-col-reverse  md:flex-row">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari Fasilitas"
              className="border border-gray-400 rounded-lg pe-10 placeholder:text-xs py-2 px-4 md:pr-8 text-xs"
              value={search}
              onChange={handleSearchChange}
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center ">
              <BiSearch className="text-gray-400" />
            </span>
          </div>
          <Link
            className="flex items-center text-xs gap-2 rounded-md bg-[#0F6EE3] text-white p-2 w-fit self-end md:self-auto"
            href="/data-fasilitas/tambah-fasilitas"
          >
            <IoAddOutline />
            <span>Tambah</span>
          </Link>
        </div>
      </div>

      {filteredResults && filteredResults.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y-2 divide-gray-200 text-[10px]">
            <thead className="ltr:text-left rtl:text-right bg-[#0F6EE3]">
              <tr className="py-10 text-sm">
                <th>No</th>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Koordinat</th>
                <th>Jam Operasional</th>
                <th>Kontak</th>
                <th>Akses</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredResults.map((fasilitas, index) => (
                <tr
                  key={fasilitas.id}
                  className=" bg-gray-50 hover:bg-gray-200"
                >
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <div
                      className="cursor-pointer"
                      onClick={() => onImageHandler(fasilitas.url_image)}
                    >
                      <Image
                        alt={`Gambar Fasilitas ${fasilitas.name}`}
                        src={
                          fasilitas.url_image
                            ? fasilitas.url_image
                            : assets.defaultImage
                        }
                        className="rounded-sm mx-auto w-auto h-auto"
                        width={40}
                        height={40}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">{fasilitas.name || "-"}</td>
                  <td
                    className=" line-clamp-5 h-24 border-1"
                    dangerouslySetInnerHTML={{
                      __html: `${fasilitas.description}`,
                    }}
                  ></td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <p>Lat: {fasilitas.latitude || "-"},</p>
                        <p>Long: {fasilitas.longitude || "-"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center">
                      {fasilitas.jam_operasional.map((hour, index) => {
                        return (
                          <div key={index}>
                            <p>
                              Jam : {hour.jam_buka} - {hour.jam_tutup}
                            </p>
                            <p>
                              Hari : {hour.hari_awal} s.d {hour.hari_akhir}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <p>Nama: {fasilitas.kontak?.nama_kontak || "-"}</p>
                        <p>Nomor: {fasilitas.kontak?.nomor_telepon || "-"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {fasilitas.akses || "-"}
                  </td>
                  <td className="space-y-2 text-center align-middle text-base">
                    <div className="flex flex-col items-center gap-y-2">
                      <button
                        className="bg-[#2cbc35] rounded-md p-2 text-white"
                        onClick={() => onEditHandler(fasilitas)}
                      >
                        <HiOutlinePencil />
                      </button>
                      <button
                        className="bg-[#EF4444] rounded-md p-2 text-white"
                        onClick={() => onDeleteHandler(fasilitas)}
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center animate-pulse p-10 py-20">
          Memuat Data Fasilitas...
        </div>
      ) : (
        <div className="flex items-center justify-center italic text-sm p-10">
          {fetchError || "Tidak ada data fasilitas untuk ditampilkan"}
        </div>
      )}
    </main>
  );
};
