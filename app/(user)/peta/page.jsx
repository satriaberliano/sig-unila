"use client";

import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});

const Peta = () => {
  const [facilities, setFacilities] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      const { data, error } = await supabase.from("fasilitas").select(`id,
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

      if (error) {
        setFetchError(`Tidak dapat melakukan fetch data Fasilitas`);
        setFacilities(null);
      }

      if (data) {
        setFacilities(data);
        setFetchError(null);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div className="h-screen pt-16 z-0">
      {/* {console.log(facilities)} */}
      <Map height={"h-[95vh]"} facilities={facilities} search={search} />
    </div>
  );
};

export default Peta;
