/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
// import { FaRegSave } from "react-icons/fa";

export const Checkbox = ({ isChecked, checkHandler, index }) => {
  return (
    <>
      <label className="sr-only" htmlFor={`Row-${index}`}>
        Row-{index}
      </label>

      <input
        className="size-5 rounded border-gray-300"
        type="checkbox"
        id={`Row-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      {/* <p className="text-sm">{isChecked ? "checked" : "unchecked"}</p> */}
    </>
  );
};

export default function TabelPesanPengguna() {
  const [pesanPengguna, setPesanPengguna] = useState(null);
  const [fetchPesanError, setFetchPesanError] = useState(null);
  // const [isChecked, setIsChecked] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPesanPengguna = async () => {
      const { data: contacs, error } = await supabase
        .from("kontak_masuk")
        .select(`id, nama, email, subjek, pesan, waktu_kirim, cek_pesan`)
        .order("waktu_kirim", { ascending: false });

      if (error) {
        setFetchPesanError(
          `Galat. Tidak dapat melakukan pengambilan data pesan pengguna`
        );
        setPesanPengguna(null);
      }

      if (contacs) {
        setPesanPengguna(contacs);
        setFetchPesanError(null);
      }
    };

    fetchPesanPengguna();
  }, []);

  // const checkHandler = () => {
  //   setIsChecked(!isChecked);
  // };

  const updateCheckStatus = async (index) => {
    const updatedPesan = pesanPengguna[index];
    const newCheckStatus = !updatedPesan.cek_pesan;

    setPesanPengguna(
      pesanPengguna.map((pesan, currentIndex) =>
        currentIndex === index ? { ...pesan, cek_pesan: newCheckStatus } : pesan
      )
    );

    const { error } = await supabase
      .from("kontak_masuk")
      .update({ cek_pesan: newCheckStatus })
      .eq("id", updatedPesan.id);

    if (error) {
      // console.error("Error updating checkbox status:", error);
      setPesanPengguna(
        pesanPengguna.map((pesan, currentIndex) =>
          currentIndex === index
            ? { ...pesan, cek_pesan: !newCheckStatus }
            : pesan
        )
      );
    }
  };

  return (
    <div>
      {pesanPengguna && pesanPengguna.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-xs">
            <thead className="ltr:text-left rtl:text-right bg-[#0F6EE3] text-sm">
              <tr>
                <th className="px-4 py-2">Cek</th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                  Waktu
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                  Nama
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                  Subjek
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                  Pesan
                </th>
                {/* <th className="px-4 py-2"></th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {pesanPengguna.map((pesan, index) => (
                <tr
                  key={pesan.id}
                  className={`hover:bg-gray-200  ${
                    pesan.cek_pesan
                      ? "bg-[#cee1ff] hover:bg-[#bdd1ea]"
                      : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2 text-center">
                    <form>
                      <Checkbox
                        key={pesan.id}
                        isChecked={pesan.cek_pesan}
                        checkHandler={() => updateCheckStatus(index)}
                        index={index}
                      />
                    </form>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-medium">
                    {new Date(pesan.waktu_kirim).toLocaleString("id-ID")}
                  </td>
                  <td className=" px-4 py-2 text-gray-700">{pesan.email}</td>
                  <td className=" px-4 py-2 font-medium text-gray-700">
                    {pesan.nama}
                  </td>
                  <td className=" px-4 py-2 text-gray-700">{pesan.subjek}</td>
                  <td className=" px-4 py-2 text-gray-700">{pesan.pesan}</td>
                  {/* <td className="whitespace-nowrap px-4 py-2">
                    <button className="inline-block rounded bg-[#0F6EE3] px-4 py-2 text-white hover:bg-[#0F6EE3]">
                      <FaRegSave className="font-medium  text-sm" />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center italic text-sm p-10">
          {fetchPesanError}
        </div>
      )}
    </div>
  );
}
