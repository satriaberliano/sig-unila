// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import dayjs from "dayjs";
import CardDashboard from "../CardDashboard/CardDashboard";
import MetricCardDashboard from "../MetricCardDashboard/MetricCardDashboard";
import supabaseServer from "@/lib/supabaseServer";
import dynamic from "next/dynamic";
import Loading from "../Loading/Loading";
import FacilityOfFacultyCardDashboard from "../FacilityOfFacultyCardDashboard/FacilityOfFacultyCardDashboard";

// const Map = dynamic(() => import("@/components/Map/Map"), {
//   ssr: false,
//   loading: () => <Loading></Loading>,
// });

const MapAdmin = dynamic(() => import("@/components/MapAdmin/MapAdmin"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

const HeadDashboard = async () => {
  // const supabase = createServerComponentClient({ cookies });

  let { data: fasilitas, error } = await supabaseServer()
    .from("fasilitas")
    .select();

  const { data: faculties, error: error2 } = await supabaseServer()
    .from("fasilitas")
    .select("fakultas")
    .neq("fakultas", "")
    .order("fakultas");

  const uniqueFaculties = [...new Set(faculties.map((item) => item.fakultas))];

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
          titleCard={"Total Fasilitas Keseluruhan"}
        />
        <CardDashboard
          total={faculties.length}
          titleCard={"Total Fasilitas pada Fakultas"}
        />
        <CardDashboard
          total={uniqueFaculties.length}
          titleCard={"Jumlah Fakultas"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
        {/* <MetricCardDashboard /> */}
        <MetricCardDashboard title={"Grafik Penambahan Data Fasilitas"} />
        {/* <MetricCardDashboard title={"Metrik Fasilitas dalam Pemeliharaan"} /> */}
        <FacilityOfFacultyCardDashboard
          title={"Jumlah Fasilitas Berdasarkan Fakultas"}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 pt-5">
        <MapAdmin facilities={fasilitas} height={"h-[26rem]"} />
      </div>
    </div>
  );
};

export default HeadDashboard;
