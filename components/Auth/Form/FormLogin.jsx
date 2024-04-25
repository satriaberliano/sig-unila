'use client'

import Loading from '@/components/Admin/Loading/Loading';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FormLogin = () => {
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmitHandler = async (input) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    })

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
  }

  return (
    <form method="post" onSubmit={handleSubmit(onSubmitHandler)} className='flex justify-center items-center flex-col space-y-4 w-full px-10 py-5'>
      <input type="email" placeholder='Email' {...register('email')} className={`p-2 text-sm placeholder:text-xs placeholder:px-2 rounded-md border-2 w-full ${errors.email ? "border-red-600" : "border-slate-300"}`} />
      <input type="password" placeholder='Password' {...register('password')} className={`p-2 text-sm placeholder:text-xs placeholder:px-2 rounded-md border-2 w-full ${errors.password ? "border-red-600" : "border-slate-300"}`} />
      <button className='w-full border-2 text-sm font-semibold p-2 rounded-lg text-white bg-[#0F6EE3]'>{loading ? <Loading/> : "Masuk"}</button>
    </form>
  )
}

export default FormLogin