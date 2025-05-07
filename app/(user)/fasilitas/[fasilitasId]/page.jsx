// "use client";

import DetailFasilitas from "@/components/LandingPage/DetailFasilitas/DetailFasilitas";
import { supabase } from "@/lib/supabase";
import { useFetchData } from "@/zustand/useFetchData";
import { notFound } from "next/navigation";
import React from "react";

const FasilitasLain = async ({ params }) => {
  const { data: facility, error } = await supabase
    .from("fasilitas")
    .select(
      ` id,
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
        )`
    )
    .eq("id", params.fasilitasId);
  // const { facility } = useFetchData();

  return (
    <>
      {facility ? (
        <DetailFasilitas params={params} facility={facility} />
      ) : (
        notFound()
      )}
    </>
  );
};

export default FasilitasLain;
