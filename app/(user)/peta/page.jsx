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
      const { data, error } = await supabase
        .from("fasilitas")
        .select(`id, name, latitude, longitude`);

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
      <Map height={"h-[95vh]"} facilities={facilities} search={search} />
    </div>
  );
};

export default Peta;
