// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import dayjs from "dayjs";
import CardDashboard from "../CardDashboard/CardDashboard";
import MetricCardDashboard from "../MetricCardDashboard/MetricCardDashboard";
import supabaseServer from "@/lib/supabaseServer";
import dynamic from "next/dynamic";
import Loading from "../Loading/Loading";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

const HeadDashboard = async () => {
  // const supabase = createServerComponentClient({ cookies });

  let { data: fasilitas, error } = await supabaseServer()
    .from("fasilitas")
    .select();

  const latLongData = fasilitas.map((facility) => {
    return [facility.latitude, facility.longitude];
  });

  // console.log(latLongData);

  return (
    <div className="space-y-2">
      <h1 className="text-3xl mb-10 font-medium">Dashboard</h1>
      <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-none gap-5 w-full">
        <CardDashboard
          total={fasilitas.length}
          titleCard={"Jumlah Fasilitas"}
        />
        <CardDashboard
          total={latLongData.length}
          titleCard={"Jumlah Lokasi Pin Point"}
        />
        <CardDashboard
          total={""}
          titleCard={"Jumlah Fasilitas dalam Pemeliharaan"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
        {/* <MetricCardDashboard /> */}
        <MetricCardDashboard title={"Metrik Penambahan Data Fasilitas"} />
        <MetricCardDashboard title={"Metrik Fasilitas dalam Pemeliharaan"} />
      </div>

      <div className="grid grid-cols-1 gap-5 pt-5">
        <Map facilities={null} height={"h-[26rem]"} />
      </div>
    </div>
  );
};

export default HeadDashboard;
