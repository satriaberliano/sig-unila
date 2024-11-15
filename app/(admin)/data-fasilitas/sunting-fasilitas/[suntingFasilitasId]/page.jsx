/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import assets from "@/assets/assets";
import { useImages } from "@/zustand/useImages";

import { useModalFacility } from "@/zustand/useModalFacility";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { IoIosArrowBack, IoMdSave } from "react-icons/io";
import Swal from "sweetalert2";
import RichTextEditor from "@/components/Admin/RichTextEditor/RichTextEditor";
import { HiOutlineTrash } from "react-icons/hi";

const SuntingFasilitasPage = ({ params }) => {
  const [image, setImage] = useState();
  const [imageUpload, setImageUpload] = useState(null);
  const { setData, data: edit } = useModalFacility();

  const [isUpdating, setIsUpdating] = useState(false);

  const supabase = createClientComponentClient();

  const router = useRouter();

  const ImageChangeHandler = (e) => {
    const img = e.target.files[0];

    if (img) {
      setImageUpload(img);
      setImage(URL.createObjectURL(img));

      const maxSizeImage = 3 * 1024 * 1024; // 3MB in bytes

      if (img.size > maxSizeImage) {
        Swal.fire({
          title: "Gagal",
          icon: "warning",
          text: "Ukuran gambar terlalu besar, maksimum 3 MB",
        });

        setError("image", {
          type: "manual",
          message: "Harap unggah gambar fasilitas",
        });

        setImage(null);
        setImageUpload(null);

        e.target.value = null;
      }
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jam_operasional: [
        {
          id_jam: "",
          hari_awal: "",
          hari_akhir: "",
          jam_buka: "",
          jam_tutup: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jam_operasional", // Nama array yang akan dihandle
  });

  useEffect(() => {
    setValue("name", edit.name);
    setValue("description", edit.description);
    setValue("latitude", edit.latitude);
    setValue("longitude", edit.longitude);
    setValue("nama_kontak", edit.kontak.nama_kontak);
    setValue("nomor_telepon", edit.kontak.nomor_telepon);
    setValue("akses", edit.akses);
    setValue("fakultas", edit.fakultas);
    setValue("maintenance", edit.maintenance);

    edit.jam_operasional.forEach((item, index) => {
      setValue(`jam_operasional.${index}.id_jam`, item.id_jam);
      setValue(`jam_operasional.${index}.hari_awal`, item.hari_awal);
      setValue(`jam_operasional.${index}.hari_akhir`, item.hari_akhir);
      setValue(`jam_operasional.${index}.jam_buka`, item.jam_buka);
      setValue(`jam_operasional.${index}.jam_tutup`, item.jam_tutup);
    });
  }, [edit, setValue]);

  const onDeleteJamOperasionalHandler = async (id) => {
    Swal.fire({
      icon: "warning",
      text: "Apakah anda yakin ingin menghapus data jam operasional?",
      showCancelButton: true,
      confirmButtonColor: "#0F6EE3",
      cancelButtonColor: "#C93233",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        supabase
          .from("jam_operasional")
          .delete()
          .eq("id_jam", id)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Anda Berhasil Menghapus Jam Operasional",
              showConfirmButton: false,
              timer: 1250,
            });
          })
          .then(router.refresh());
      }
      router.refresh();
    });
  };

  const onSubmitHandler = async (input) => {
    setIsUpdating(true);
    try {
      //Change To New Image
      if (imageUpload) {
        const { data: dataImage, error: errorImage } = await supabase.storage
          .from("image")
          .upload(`fasilitas/${imageUpload.name}`, imageUpload, {
            upsert: true,
          });

        await supabase.storage
          .from("image")
          .remove([`${edit.url_image.slice(72)}`]);

        //Get Image URL from Storage Supabase
        if (dataImage) {
          const { data: getImages } = supabase.storage
            .from("image")
            .getPublicUrl(dataImage.path);

          const { data: dataFasilitas, error } = await supabase
            .from("fasilitas")
            .update([
              {
                url_image: getImages.publicUrl,
                latitude: input.latitude,
                longitude: input.longitude,
                name: input.name,
                description: input.description,
                akses: input.akses,
                fakultas: input.fakultas,
                maintenance: input.maintenance,
              },
            ])
            .eq("id", edit.id)
            .select();

          const { data: dataKontak, error: errorContact } = await supabase
            .from("kontak")
            .update([
              {
                nama_kontak: input.nama_kontak,
                nomor_telepon: input.nomor_telepon,
              },
            ])
            .eq("id", edit.id)
            .select();

          for (const jam of input.jam_operasional) {
            const { id_jam, hari_awal, hari_akhir, jam_buka, jam_tutup } = jam;

            const { error } = await supabase
              .from("jam_operasional")
              .update([
                {
                  hari_awal,
                  hari_akhir,
                  jam_buka,
                  jam_tutup,
                },
              ])
              .eq("id_jam", id_jam)
              .select();

            if (error) {
              Swal.fire({
                title: "Gagal",
                icon: "error",
                text: error.message,
              });
              return;
            }
          }

          if (!error && !errorContact) {
            Swal.fire({
              title: "Berhasil",
              icon: "success",
              text: "Data berhasil disunting",
            }).then(() => {
              reset();
              setImage(null);
              // setData(undefined);
              router.push("/data-fasilitas");
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
        const { data: dataFasilitas, error } = await supabase
          .from("fasilitas")
          .update([
            {
              latitude: input.latitude,
              longitude: input.longitude,
              name: input.name,
              description: input.description,
              akses: input.akses,
              fakultas: input.fakultas,
              maintenance: input.maintenance,
            },
          ])
          .eq("id", edit.id)
          .select();

        const { data: dataKontak, error: errorContact } = await supabase
          .from("kontak")
          .update([
            {
              nama_kontak: input.nama_kontak,
              nomor_telepon: input.nomor_telepon,
            },
          ])
          .eq("id", edit.id)
          .select();

        // console.log(edit);
        // console.log(input);

        for (const jam of input.jam_operasional) {
          const { id_jam, hari_awal, hari_akhir, jam_buka, jam_tutup } = jam;

          const { error } = await supabase
            .from("jam_operasional")
            .update([
              {
                hari_awal: hari_awal,
                hari_akhir: hari_akhir,
                jam_buka: jam_buka,
                jam_tutup: jam_tutup,
              },
            ])
            .eq("id_jam", id_jam)
            .select();

          if (error) {
            Swal.fire({
              title: "Gagal",
              icon: "error",
              text: error.message,
            });
            return;
          }
        }

        if (!error && !errorContact) {
          Swal.fire({
            title: "Berhasil",
            icon: "success",
            text: "Data berhasil disunting",
          }).then(() => {
            reset();
            setImage(null);
            // setData(undefined);
            router.push("/data-fasilitas");
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
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="">
      <div className="px-10 py-14 h-full space-y-7 p-6 bg-white">
        <div className="flex justify-start items-center border-b-2 pb-4 space-x-5">
          <IoIosArrowBack
            className="cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />
          <h2 className="font-semibold text-xl">Sunting Fasilitas</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-14">
            <div className="flex flex-col space-y-4">
              <label className="font-medium flex justify-start">
                Gambar Fasilitas
              </label>
              <div className="flex flex-col gap-y-4">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    alt="Gambar Fasilitas"
                    src={
                      image
                        ? image
                        : edit?.url_image
                        ? edit?.url_image
                        : assets.defaultImage
                    }
                    className={`aspect-[3/4] border-2 rounded-md text-sm object-cover object-center ${
                      !image && "flex justify-center items-center"
                    }`}
                    fill
                    sizes="(max-width: 768px) 100vw"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#0F6EE3] text-xs">
                    <h2 className="text-sm font-medium text-black">Syarat :</h2>
                    <ul className="list-disc pl-4">
                      <li className="text-xs">
                        Ukuran gambar harus di bawah 3MB
                      </li>
                      <li className="text-xs">Gambar harus 3 x 4</li>
                    </ul>
                  </div>
                  <div>
                    <label
                      htmlFor="imageUpload1"
                      className="cursor-pointer text-xs px-3 py-2 rounded-md text-white bg-[#0F6EE3]"
                    >
                      Pilih Berkas
                    </label>
                    <input
                      name="position"
                      type="file"
                      id="imageUpload1"
                      accept="image/*"
                      onChange={ImageChangeHandler}
                      className={`border-2 bg-[#E7E7E7] p-2 rounded-lg w-full text-xs font-light hidden`}
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <label
                className="font-medium flex justify-start"
                htmlFor="description"
              >
                Deskripsi Fasilitas{" "}
                {errors?.description && (
                  <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.description.message}`}</span>
                )}
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    className="text-xs overflow-hidden h-full"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
                rules={{ required: "Harap masukkan deskripsi fasilitas" }}
              />
            </div>

            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="nama_fasilitas"
                  className="font-medium flex items-start"
                >
                  Nama Fasilitas
                  {errors?.name && (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.name.message}`}</span>
                  )}
                </label>
                <input
                  type="text"
                  id="nama_fasilitas"
                  className="border-2 rounded-md pl-2 py-1 text-sm"
                  {...register("name")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium pb-1 flex items-start">
                  Titik Koordinat
                  {errors?.latitude && errors?.longitude ? (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*Harap masukkan garis bujur dan lintang`}</span>
                  ) : errors?.latitude ? (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.latitude.message}`}</span>
                  ) : errors?.longitude ? (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.longitude.message}`}</span>
                  ) : (
                    ""
                  )}
                </h3>
                <div className="flex gap-5">
                  <div className="w-full space-y-1">
                    <label htmlFor="latitude" className="text-sm">
                      Garis Lintang (Latitude)
                    </label>
                    <input
                      type="text"
                      id="latitude"
                      className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                      {...register("latitude")}
                    />
                  </div>
                  <div className="w-full space-y-1">
                    <label className="text-sm">Garis Bujur (Longitude)</label>
                    <input
                      type="text"
                      id="longitude"
                      className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                      {...register("longitude")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium pb-1 flex justify-start">
                  Kontak
                  {errors?.nama_kontak && errors?.nomor_telepon ? (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*Harap masukkan nama dan nomor telepon kontak`}</span>
                  ) : errors?.nama_kontak ? (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.nama_kontak.message}`}</span>
                  ) : errors?.nomor_telepon ? (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.nomor_telepon.message}`}</span>
                  ) : (
                    ""
                  )}
                </h3>
                <div className="flex gap-5">
                  <div className="w-full space-y-1">
                    <label className="text-sm" htmlFor="nama_kontak">
                      Nama Kontak
                    </label>
                    <input
                      type="text"
                      id="nama_kontak"
                      className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                      {...register("nama_kontak")}
                    />
                  </div>
                  <div className="w-full space-y-1">
                    <label className="text-sm" htmlFor="nomor_kontak">
                      Nomor Kontak
                    </label>
                    <input
                      type="number"
                      id="nomor_kontak"
                      className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                      {...register("nomor_telepon")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  className="font-medium flex justify-start"
                  htmlFor="akses"
                >
                  Akses{" "}
                  {errors?.akses && (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.akses.message}`}</span>
                  )}
                </label>
                <select
                  name="akses"
                  id="akses"
                  type="text"
                  className="border-2 rounded-md pl-2 py-2 text-sm"
                  {...register("akses")}
                >
                  <option value={""}>Pilih Akses</option>
                  <option value={"Umum dan Civitas Akademika"}>
                    Umum dan Civitas Akademika
                  </option>
                  <option value={"Civitas Akademika"}>Civitas Akademika</option>
                  {/* <option value={"Tidak untuk umum"}>Tidak untuk umum</option> */}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  className="font-medium flex justify-start"
                  htmlFor="fakultas"
                >
                  Fakultas{" "}
                </label>
                <select
                  name="fakultas"
                  id="fakultas"
                  type="text"
                  className="border-2 rounded-md pl-2 py-2 text-sm"
                  {...register("fakultas")}
                >
                  <option value={""}>Pilih Fakultas</option>
                  <option value={"FMIPA"}>FMIPA</option>
                  <option value={"FT"}>FT</option>
                  <option value={"FEB"}>FEB</option>
                  <option value={"FKIP"}>FKIP</option>
                  <option value={"FH"}>FH</option>
                  <option value={"FP"}>FP</option>
                  <option value={"FK"}>FK</option>
                  <option value={"FISIP"}>FISIP</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-medium flex justify-start">
                  Apakah fasilitas sedang dilakukan pemeliharaan?{" "}
                  {errors?.maintenance ? (
                    <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.maintenance.message}`}</span>
                  ) : (
                    <span className="text-red-600">*</span>
                  )}
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      value={true}
                      id="radio_yes"
                      // defaultChecked={edit.maintenance}
                      {...register("maintenance")}
                    />
                    <label className="text-sm" htmlFor="radio_yes">
                      Ya
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      value={false}
                      id="radio_no"
                      // defaultChecked={!edit.maintenance}
                      {...register("maintenance")}
                    />
                    <label className="text-sm" htmlFor="radio_no">
                      Tidak
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              {edit.jam_operasional.map((item, index) => (
                <div key={index}>
                  <div className="flex flex-col space-y-3">
                    <h3 className="font-medium">
                      Jam Operasional{" "}
                      {edit.jam_operasional.length > 1 ? `${index + 1}` : ""}
                    </h3>
                    <div className="flex flex-row gap-x-4 w-full">
                      <input
                        type="hidden"
                        {...register(`jam_operasional.${index}.id_jam`)}
                      />
                      <div className="flex flex-col w-full space-y-3">
                        <div className="w-full space-y-1">
                          <h4 className="text-sm flex justify-start">Hari</h4>
                          <div className="flex justify-center items-center gap-5">
                            <select
                              name="hari_awal"
                              type="text"
                              className="border-2 rounded-md pl-2 py-2 text-sm w-full"
                              {...register(
                                `jam_operasional.${index}.hari_awal`
                              )}
                            >
                              <option value={""}>Pilih Hari</option>
                              <option value={"Senin"}>Senin</option>
                              <option value={"Selasa"}>Selasa</option>
                              <option value={"Rabu"}>Rabu</option>
                              <option value={"Kamis"}>Kamis</option>
                              <option value={"Jumat"}>Jumat</option>
                              <option value={"Sabtu"}>Sabtu</option>
                              <option value={"Minggu"}>Minggu</option>
                            </select>
                            {"s.d"}
                            <select
                              name="hari_akhir"
                              type="text"
                              className="border-2 rounded-md pl-2 py-2 text-sm w-full"
                              {...register(
                                `jam_operasional.${index}.hari_akhir`
                              )}
                            >
                              <option value={""}>Pilih Hari</option>
                              <option value={"Senin"}>Senin</option>
                              <option value={"Selasa"}>Selasa</option>
                              <option value={"Rabu"}>Rabu</option>
                              <option value={"Kamis"}>Kamis</option>
                              <option value={"Jumat"}>Jumat</option>
                              <option value={"Sabtu"}>Sabtu</option>
                              <option value={"Minggu"}>Minggu</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-full space-y-1 ">
                          <h4 className="text-sm flex justify-start">Jam</h4>
                          <div className="flex justify-center items-center gap-5">
                            <input
                              type="time"
                              className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                              {...register(`jam_operasional.${index}.jam_buka`)}
                            />
                            {"-"}
                            <input
                              type="time"
                              className="border-2 rounded-md pl-2 py-1 text-sm w-full"
                              {...register(
                                `jam_operasional.${index}.jam_tutup`
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      {/* {edit.jam_operasional.length > 1 && (
                        <button
                          type="button"
                          className="bg-[#e73b3b] rounded-md flex items-center p-2 px-4 text-white text-xl"
                          onClick={() =>
                            onDeleteJamOperasionalHandler(item.id_jam)
                          }
                        >
                          <HiOutlineTrash />
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
              {/* <button
                type="button"
                className="text-sm text-white py-2 rounded-md bg-[#0F6EE3]"
                onClick={() =>
                  append({
                    hari_awal: "",
                    hari_akhir: "",
                    jam_buka: "",
                    jam_tutup: "",
                  })
                }
              >
                Tambah Jam Operasional
              </button> */}
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className={`flex justify-center items-center w-full gap-x-2 text-base text-white py-2 rounded-md col-start-1 col-end-3 bg-[#0F6EE3] font-medium`}
            >
              <IoMdSave />
              <span>{isUpdating ? "Memperbarui..." : "Perbarui"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuntingFasilitasPage;
