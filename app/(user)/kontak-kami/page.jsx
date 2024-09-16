"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const KontakKamiPage = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  // const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  const schema = yup.object().shape({
    nama_pengguna: yup
      .string()
      .min(3, "Nama minimal 3 karakter")
      .max(50, "Nama maksimal 50 karakter")
      .required("Harap masukkan nama Anda"),
    email_pengguna: yup.string().required("Harap masukkan email Anda"),
    subjek: yup
      .string()
      .min(5, "Subjek minimal 5 karakter")
      .max(100, "Subjek maksimal 100 karakter")
      .required("Harap masukkan subjek"),
    pesan: yup
      .string()
      .min(10, "Pesan minimal 10 karakter")
      .max(500, "Pesan maksimal 500 karakter")
      .required("Harap masukkan pesan"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = async (data) => {
    setIsUpdating(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          title: "Berhasil",
          icon: "success",
          text: "Data berhasil dikirim",
        }).then(() => {
          reset();
          router.refresh();
        });
        // setSubmitted(true);
      } else {
        const result = await response.json();
        Swal.fire({
          title: "Error!",
          text: result.error || "Gagal mengirim pesan, silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
        // setError(result.error || "Gagal mengirim pesan, silakan coba lagi.");
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Ada masalah dalam pengiriman, silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
      // setError("Ada masalah dalam pengiriman, silakan coba lagi.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white pt-28 pb-24 px-12 sm:px-20 md:px-28 lg:px-32 min-h-screen">
      <div className="flex flex-col justify-center items-center pb-12">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Kontak Kami
        </h2>
        <p>
          Jika Anda memiliki pertanyaan, saran, kendala atau hal lainnya
          mengenai SIG UNILA, Anda dapat mengisi formulir di bawah ini!
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col xl:px-20 space-y-2 "
      >
        <div className="space-y-2 lg:space-y-0 lg:space-x-5 pb-4 grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex flex-col space-y-2">
              <label htmlFor="nama_pengguna" className="flex justify-start">
                Nama{" "}
                {errors?.nama_pengguna && (
                  <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.nama_pengguna.message}`}</span>
                )}
              </label>
              <input
                type="text"
                id="nama_pengguna"
                className="border-2 rounded-md pl-2 py-1 text-sm"
                {...register("nama_pengguna")}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email_pengguna" className="flex justify-start">
                Email
                {errors?.email_pengguna && (
                  <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.email_pengguna.message}`}</span>
                )}
              </label>
              <input
                type="email"
                id="email_pengguna"
                className="border-2 rounded-md pl-2 py-1 text-sm"
                {...register("email_pengguna")}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="subjek" className="flex justify-start">
                Subjek
                {errors?.subjek && (
                  <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.subjek.message}`}</span>
                )}
              </label>
              <input
                type="text"
                id="subjek"
                className="border-2 rounded-md pl-2 py-1 text-sm"
                {...register("subjek")}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="pesan" className="flex justify-start">
              Pesan
              {errors?.pesan && (
                <span className="text-red-600 text-xs leading-3 ml-1">{`*${errors.pesan.message}`}</span>
              )}
            </label>
            <textarea
              type="text"
              id="pesan"
              rows={9}
              className="border-2 rounded-md pl-2 py-1 text-sm resize-none"
              {...register("pesan")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className={`flex justify-center items-center w-full gap-x-2 text-base text-white py-2 rounded-md col-start-1 col-end-3 bg-[#0F6EE3] font-medium`}
        >
          {isUpdating ? "Mengirim..." : "Kirim"}
        </button>
      </form>

      {/* {error && <p className="text-center">{error}</p>} */}
    </div>
  );
};

export default KontakKamiPage;
