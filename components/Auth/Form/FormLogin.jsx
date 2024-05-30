"use client";

import Loading from "@/components/Admin/Loading/Loading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormLogin = () => {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const router = useRouter();

  const schema = yup.object({
    email: yup
      .string()
      .email("Masukan Email Yang Valid")
      .required("Harap Masukan Email Anda"),
    password: yup.string().required("Harap Masukan Password Anda"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (input) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (!error) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Login Telah Berhasil",
        showConfirmButton: false,
        timer: 2000,
      });

      setLoading(false);
      router.push("/dashboard");
    } else if (error.message === "Invalid login credentials") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Email atau kata sandi salah",
      }).then(() => setLoading(false));
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message,
      }).then(() => setLoading(false));
    }

    router.refresh();
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex justify-center items-center flex-col space-y-4 w-full px-10 py-5"
    >
      <div className="w-full relative">
        <input
          type="email"
          id="email_input"
          placeholder=" "
          {...register("email")}
          className={`p-2 text-sm placeholder:text-xs placeholder:px-2 rounded-md border-2 w-full ${
            errors.email ? "border-red-600" : "border-slate-300"
          } `}
        />
        <label
          className="mb-1 flex items-center absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          for="email_input"
        >
          Email
          {errors?.email && (
            <span className="text-red-600 text-sm ml-2">{`* ${errors.email.message}`}</span>
          )}
        </label>
      </div>
      <div className="w-full relative">
        <input
          type="password"
          placeholder=" "
          {...register("password")}
          className={`p-2 text-sm placeholder:text-xs placeholder:px-2 rounded-md border-2 w-full ${
            errors.password ? "border-red-600" : "border-slate-300"
          }`}
        />
        <label
          className="mb-1 flex items-center absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          for="password_input"
        >
          Password
          {errors?.password && (
            <span className="text-red-600 text-sm ml-2">{`* ${errors.password.message}`}</span>
          )}
        </label>
      </div>
      <button className="w-full border-[1px] text-sm font-semibold p-2 rounded-lg text-white bg-[#0F6EE3]">
        {loading ? <Loading /> : "Masuk"}
      </button>
    </form>
  );
};

export default FormLogin;
