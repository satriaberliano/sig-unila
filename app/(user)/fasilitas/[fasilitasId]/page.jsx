"use client";

import DetailFasilitas from "@/components/LandingPage/DetailFasilitas/DetailFasilitas";
import { supabase } from "@/lib/supabase";
import { useFetchData } from "@/zustand/useFetchData";
import { notFound, usePathname } from "next/navigation";
import React from "react";

const FasilitasLain = ({ params }) => {
  // const { data: facility, error } = await supabase
  //   .from("fasilitas")
  //   .select("*")
  //   .eq("id", params.fasilitasId);
  const { facility } = useFetchData();

  return (
    <>
      {/* {console.log(facility)} */}
      {params.fasilitasId == facility.id ? (
        <DetailFasilitas
          // params={params}
          facility={facility}
        />
      ) : (
        notFound()
      )}
    </>
  );
};

export default FasilitasLain;
