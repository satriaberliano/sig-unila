import DetailFasilitas from "@/components/LandingPage/DetailFasilitas/DetailFasilitas";
import { supabase } from "@/lib/supabase";
import { notFound, usePathname } from "next/navigation";
import React from "react";

const FasilitasLain = async ({ params }) => {
  const { data: facility, error } = await supabase
    .from("fasilitas")
    .select("*")
    .eq("id", params.fasilitasId);

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
