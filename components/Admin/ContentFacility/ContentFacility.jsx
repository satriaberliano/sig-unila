"use client";

import assets from "@/assets/assets";
import Image from "next/image";

import { IoAddOutline } from "react-icons/io5";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useModalFacility } from "@/zustand/useModalFacility";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const ContentFacility = ({ facilities }) => {
  const { setFacility, setData, setIsEdit } = useModalFacility();
  const router = useRouter();
  const supabase = createClientComponentClient();

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

        // router.refresh();
      }
    });
  };

  const onEditHandler = (val) => {
    setData(val);
    setIsEdit();
  };

  return (
    <main className="w-full mb-4">
      <div className="flex justify-between mb-2">
        <h2 className="font-medium text-lg">Data Fasilitas</h2>
        {/* Tambahin Tombol Add Fasilitas */}
        <button
          className="flex items-center text-xs gap-2 rounded-md bg-[#0F6EE3] text-white p-2"
          onClick={setFacility}
        >
          <IoAddOutline />
          <span>Tambah</span>
        </button>
      </div>

      <table className="w-full table-auto mt-4">
        <tbody className="">
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
          {/* {facilities && facilities.length > 0 ? (
            <> */}
          {facilities.map((fasilitas, index) => (
            <tr key={index} className="p-2 bg-gray-200">
              <td className="text-sm text-center">{index + 1}</td>
              <td>
                <Image
                  alt={`Gambar Fasilitas ${fasilitas.name}`}
                  src={
                    fasilitas.url_image
                      ? fasilitas.url_image
                      : assets.defaultImage
                  }
                  className="mx-auto rounded-md col-start-2 col-end-4"
                  width={75}
                  height={0}
                />
              </td>
              <td className="text-xs">{fasilitas.name || "-"}</td>
              <td className="text-xs ">{fasilitas.description || "-"}</td>
              <td className="text-xs">
                <p>Lat: {fasilitas.latitude || "-"},</p>
                <p>Long: {fasilitas.longitude || "-"}</p>
              </td>
              <td className="text-xs">
                <p>{fasilitas.jam_buka || "-"} s.d</p>
                <p>{fasilitas.jam_tutup || "-"}</p>
              </td>
              <td className="text-xs text-center">{fasilitas.kontak || "-"}</td>
              <td className="text-xs text-center">{fasilitas.akses || "-"}</td>
              <td className="space-y-2 text-center align-middle">
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
              </td>
            </tr>
          ))}
          {/* </>
          ) : (
            <p>Tidak ada data fasilitas</p>
          )} */}
        </tbody>
      </table>

      {/* <div className="w-full space-y-4">
        <div className="grid grid-cols-10 text-center text-sm font-medium gap-2 mt-4">
          <span className="col-start-1 col-end-2">No</span>
          <span className="col-start-2 col-end-4">Gambar</span>
          <span className="col-start-4 col-end-6">Nama</span>
          <span className="col-start-6 col-end-8">Deskripsi</span>
          <span className="col-start-8 col-end-10">Koordinat</span>
          <span className="col-start-10 col-end-11">Aksi</span>
        </div>
        {facilities && facilities.length > 0 ? (
          <>
            {facilities.map((fasilitas, index) => (
              <div
                className="bg-gray-200 rounded-lg p-2 py-4 grid grid-cols-10 text-center gap-2"
                key={index}
              >
                <p className="col-start-1 col-end-2 text-sm">{index + 1}</p>
                <Image
                  alt={`Gambar Fasilitas ${fasilitas.name}`}
                  src={
                    fasilitas.url_image
                      ? fasilitas.url_image
                      : assets.defaultImage
                  }
                  className="mx-auto rounded-md col-start-2 col-end-4"
                  width={75}
                  height={0}
                />
                <p className="text-xs col-start-4 col-end-6">
                  {fasilitas.name || "-"}
                </p>
                <p className="text-xs text-left col-start-6 col-end-8 line-clamp-3">
                  {fasilitas.description || "-"}
                </p>
                <div className="text-xs col-start-8 col-end-10 text-left space-y-2">
                  <p>Latitude : {fasilitas.latitude || "-"},</p>
                  <p>Longitude : {fasilitas.longitude || "-"}</p>
                </div>
                <div className="flex justify-center items-center gap-2 col-start-10 col-end-11 flex-col md:flex-row">
                  <button
                    className="bg-[#2cbc35] rounded-md p-2 text-white"
                    onClick={() => onEditHandler(fasilitas)}
                  >
                    <HiOutlinePencil />
                  </button>
                  <button
                    className="bg-[#EF4444] rounded-md p-2 text-white"
                    onClick={() => onDeleteHandler(fasilitas.id)}
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <p className="text-center italic text-gray-500 p-4">
              Tidak ada data fasilitas
            </p>
          </>
        )}
      </div> */}
    </main>
  );
};
