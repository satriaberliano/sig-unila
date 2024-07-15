/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// ** Import React
import React from "react";

import { useModalFacility } from "@/zustand/useModalFacility";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IoIosClose, IoMdSave } from "react-icons/io";
import Image from "next/image";
import assets from "@/assets/assets";
import { useRouter } from "next/navigation";

const ModalEditFacility = () => {
  const supabase = createClientComponentClient();

  const router = useRouter();

  const { setIsEdit, data: edit } = useModalFacility();
  const [image, setImage] = useState();
  const [imageUpload, setImageUpload] = useState(null);

  const ImageChangeHandler = (e) => {
    const img = e.target.files[0];
    setImageUpload(img);
    setImage(URL.createObjectURL(img));
  };

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    setValue("name", edit.name);
    setValue("description", edit.description);
    setValue("latitude", edit.latitude);
    setValue("longitude", edit.longitude);
    setValue("jam_buka", edit.jam_buka);
    setValue("jam_tutup", edit.jam_tutup);
    setValue("akses", edit.akses);
    setValue("kontak", edit.kontak);
  }, [edit]);

  const onSubmitHandler = async (input) => {
    try {
      // Add New Image
      if (imageUpload) {
        const { data: dataImage, error: errorImage } = await supabase.storage
          .from("image")
          .upload(`fasilitas/${imageUpload.name}`, imageUpload, {
            upsert: true,
          });

        //Delete Old Image
        await supabase.storage
          .from("image")
          .remove([`${edit.url_image.slice(72)}`]);

        //Get Image URL from Storage Supabase
        if (dataImage) {
          const { data: getImages } = supabase.storage
            .from("image")
            .getPublicUrl(dataImage.path);

          const { error } = await supabase
            .from("fasilitas")
            .update([
              {
                url_image: getImages.publicUrl,
                latitude: input.latitude,
                longitude: input.longitude,
                name: input.name,
                description: input.description,
                jam_buka: input.jam_buka,
                jam_tutup: input.jam_tutup,
                kontak: input.kontak,
                akses: input.akses,
              },
            ])
            .eq("id", edit.id)
            .select();

          if (!error) {
            Swal.fire({
              title: "Berhasil",
              icon: "success",
              text: "Data Berhasil Disunting",
            }).then(() => {
              setIsEdit();
              router.refresh();
            });
          } else {
            Swal.fire({
              title: "Gagal",
              icon: "error",
              text: error.message,
            });
          }
        } else {
          Swal.fire({
            title: "Gagal",
            text: errorImage.message,
            icon: "error",
          });
        }
      } else {
        const { error } = await supabase
          .from("fasilitas")
          .update([
            {
              latitude: input.latitude,
              longitude: input.longitude,
              name: input.name,
              description: input.description,
              jam_buka: input.jam_buka,
              jam_tutup: input.jam_tutup,
              kontak: input.kontak,
              akses: input.akses,
            },
          ])
          .eq("id", edit.id)
          .select();

        if (!error) {
          Swal.fire({
            title: "Berhasil",
            icon: "success",
            text: "Data Berhasil Disunting",
          }).then(() => {
            setIsEdit();
            setImage(null);
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
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "warning",
      });
    }
  };

  const closeHandler = () => {
    setIsEdit();
    setImage(null);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-6/12 space-y-5 border-2 p-6 rounded-xl bg-white">
        <div className="flex justify-between items-center border-b-2 pb-4">
          <h2 className="font-semibold text-xl">Edit Fasilitas</h2>
          <button className="text-3xl font-semibold" onClick={closeHandler}>
            <IoIosClose />
          </button>
        </div>

        {/* {console.log(edit.url_image.slice(72))} */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
            <div className="flex flex-col">
              <label className="font-medium">Gambar Fasilitas</label>
              <div className="flex flex-col gap-y-4">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    alt="Gambar Fasilitas"
                    src={image ? image : edit.url_image}
                    className={`aspect-[3/4] border-2 rounded-md text-sm object-cover object-center ${
                      !image && "flex justify-center items-center"
                    }`}
                    fill
                  />
                </div>
                <div className="text-[#0F6EE3] text-xs">
                  <h2 className="text-sm font-medium text-black">Syarat :</h2>
                  <ul>
                    <li className="text-xs">
                      Ukuran gambar harus di bawah 1MB
                    </li>
                    <li className="text-xs">Gambar harus 16 x 9</li>
                  </ul>
                </div>
                <div>
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer text-xs px-3 py-2 rounded-md text-white bg-[#0F6EE3]"
                  >
                    Pilih Berkas
                  </label>
                  <input
                    name="url_image"
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={ImageChangeHandler}
                    className={`border-2 bg-[#E7E7E7] p-2 rounded-lg w-full text-xs font-light hidden`}
                    multiple
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">Nama Fasilitas</h3>
                <input
                  name="name"
                  type="text"
                  className="border-2 rounded-md pl-2 py-1 text-sm"
                  {...register("name")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">Jam Operasional</h3>
                <div className="flex justify-center items-center gap-5">
                  <input
                    type="time"
                    className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                    {...register("jam_buka")}
                  />
                  {"s.d"}
                  <input
                    type="time"
                    className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                    {...register("jam_tutup")}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">Kontak</h3>
                <input
                  type="text"
                  className="border-2 rounded-md pl-2 py-1 text-sm"
                  {...register("kontak")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">Akses</h3>
                <input
                  type="text"
                  className="border-2 rounded-md pl-2 py-1 text-sm"
                  {...register("akses")}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">Deskripsi Fasilitas</h3>
              <textarea
                name="description"
                id=""
                rows="8"
                className="border-2 rounded-md pl-2 py-1 text-xs "
                {...register("description")}
              ></textarea>
            </div>
            <div className="flex flex-col space-y-3">
              <h3 className="font-medium pb-1">Titik Koordinat</h3>
              <div className="w-full space-y-1">
                <h4 className="text-sm">Garis Lintang (Latitude)</h4>
                <input
                  name="latitude"
                  type="text"
                  className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                  {...register("latitude")}
                />
              </div>
              <div className="w-full space-y-1">
                <h4 className="text-sm">Garis Bujur (Longitude)</h4>
                <input
                  name="longitude"
                  type="text"
                  className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                  {...register("longitude")}
                />
              </div>
            </div>
            <button
              type="submit"
              className={`flex justify-center items-center w-full gap-x-2 text-sm text-white py-2 rounded-md col-start-1 col-end-3 bg-[#0F6EE3]`}
            >
              <IoMdSave />
              <p>Simpan</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditFacility;
