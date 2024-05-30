import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CardDashboard from "../CardDashboard/CardDashboard";
import MetricCardDashboard from "../MetricCardDashboard/MetricCardDashboard";

const HeadDashboard = async () => {
  const supabase = createServerComponentClient({ cookies });

  let { data: fasilitas, error } = await supabase.from("fasilitas").select();

  return (
    <div className="space-y-2 mb-14">
      <h1 className="text-3xl mb-10 font-medium">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5 w-full">
        <CardDashboard
          total={fasilitas.length}
          titleCard={"Jumlah Fasilitas"}
        />
        <CardDashboard total={""} titleCard={"Jumlah Lokasi"} />
        <CardDashboard total={""} titleCard={"No Information"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
        {/* <MetricCardDashboard /> */}
        <div className="flex flex-col shadow-md w-full rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4">
          <h2 className="text-lg font-medium">Overview Metrics</h2>
          <p>Unknown value</p>
        </div>
        <div className="flex flex-col shadow-md w-full rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4">
          <h2 className="text-lg font-medium">Overview Metrics</h2>
          <p>Unknown value</p>
        </div>
      </div>
    </div>
  );
};

export default HeadDashboard;
