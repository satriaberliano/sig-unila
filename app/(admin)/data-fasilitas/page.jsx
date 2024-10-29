// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ContentFacility } from "@/components/Admin/ContentFacility/ContentFacility";
// import { cookies } from "next/headers";
import supabaseServer from "@/lib/supabaseServer";

const DataFasilitas = async () => {
  // const supabase = createServerComponentClient({ cookies });

  // const { data: facilities } = await supabaseServer().from("fasilitas")
  //   .select(`id,
  //     name,
  //     description,
  //     latitude,
  //     longitude,
  //     url_image,
  //     akses,
  //     fakultas,
  //     kontak (
  //       nama_kontak,
  //       nomor_telepon
  //     ),
  //     jam_operasional (
  //       id_jam,
  //       hari_awal,
  //       hari_akhir,
  //       jam_buka,
  //       jam_tutup
  //     )`);

  // console.log(facilities);

  return (
    <div className="px-10 py-16 h-full bg-white">
      <h1 className="text-3xl mb-10 font-medium">Daftar Fasilitas</h1>
      <div className="border-2 border-gray-300 bg-[#F1F1F1] rounded-lg px-8 py-6 space-y-5">
        <ContentFacility
        // facilities={facilities}
        />
      </div>
    </div>
  );
};

export default DataFasilitas;
