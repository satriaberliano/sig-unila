// app/api/contact/route.js

import { supabase } from "@/lib/supabase";
import { getClientIp } from "@/utils/getClientIp";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { nama_pengguna, email_pengguna, subjek, pesan } = body;

  // Mendapatkan IP pengguna dari request header
  const clientIp =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.ip;

  // const clientIp = getClientIp(req);

  if (!nama_pengguna || !email_pengguna || !subjek || !pesan) {
    return NextResponse.json(
      { error: "Semua field harus diisi" },
      { status: 400 }
    );
  }

  try {
    // Rate limiting: Batasi pengiriman berdasarkan IP
    const { data: recentEntries, error } = await supabase
      .from("kontak_masuk")
      .select("id, waktu_kirim")
      .eq("ip_address", clientIp)
      // .eq("email", email)
      .order("waktu_kirim", { ascending: false })
      .limit(1);

    if (error) throw new Error(error.message);

    if (recentEntries.length > 0) {
      const lastEntryTime = new Date(recentEntries[0].waktu_kirim);
      const currentTime = new Date();

      // Hitung selisih waktu dalam milidetik (1 jam = 3600000 ms)
      const timeDifference = currentTime - lastEntryTime;
      const timeLimit = 60 * 60 * 1000; // 1 jam

      if (timeDifference < timeLimit) {
        return NextResponse.json(
          {
            error:
              "Terlalu banyak permintaan. Silakan coba lagi setelah 1 jam.",
          },
          { status: 429 }
        );
      }
    }

    // Simpan data ke Supabase
    const { data, error: insertError } = await supabase
      .from("kontak_masuk")
      .insert([
        {
          nama: nama_pengguna,
          email: email_pengguna,
          subjek: subjek,
          pesan: pesan,
          ip_address: clientIp, // Simpan IP pengguna
        },
      ]);

    if (insertError) throw new Error(insertError.message);

    return NextResponse.json(
      { message: "Pesan berhasil dikirim dan disimpan ke database" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ada masalah dengan server atau penyimpanan data" },
      { status: 500 }
    );
  }
}
