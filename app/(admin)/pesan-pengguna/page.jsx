import TabelPesanPengguna from "@/components/Admin/TabelPesanPengguna/TabelPesanPengguna";

const PesanPenggunaPage = () => {
  return (
    <div className="px-10 py-16 h-full space-y-4">
      <h1 className="text-3xl mb-10 font-medium">Pesan Pengguna</h1>
      <TabelPesanPengguna />
    </div>
  );
};

export default PesanPenggunaPage;
