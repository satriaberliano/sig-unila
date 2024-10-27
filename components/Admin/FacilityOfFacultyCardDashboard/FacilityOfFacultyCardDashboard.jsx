"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const supabase = createClientComponentClient();

const FacilityOfFacultyCardDashboard = ({ height }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalFasilitas, setTotalFasilitas] = useState(0);

  useEffect(() => {
    fetchFacilityData();
  }, []);

  const fetchFacilityData = async () => {
    try {
      // Query untuk menghitung jumlah fasilitas per fakultas
      const { data, error } = await supabase
        .from("fasilitas")
        .select(
          `
          fakultas,
          id
        `
        )
        .neq("fakultas", null)
        .order("fakultas")
        .then((result) => {
          if (result.error) throw result.error;

          // Menghitung jumlah fasilitas per fakultas
          const facultyCounts = result.data.reduce((acc, facility) => {
            const fakultas = facility.fakultas;
            acc[fakultas] = (acc[fakultas] || 0) + 1;
            return acc;
          }, {});

          // Menghitung total fasilitas
          const total = result.data.length;
          // console.log(total);
          setTotalFasilitas(total);

          return {
            data: Object.entries(facultyCounts).map(([fakultas, count]) => ({
              fakultas,
              count,
            })),
            total,
          };
        });

      if (error) throw error;

      // setTotalFasilitas(data.total);

      // Menyiapkan data untuk chart
      setChartData({
        labels: data.map((item) => item.fakultas),
        datasets: [
          {
            data: data.map((item) => item.count),
            backgroundColor: [
              "#FF6384", // Merah muda
              "#36A2EB", // Biru
              "#FFCE56", // Kuning
              "#4BC0C0", // Tosca
              "#9966FF", // Ungu
              "#FF9F40", // Oranye
              "#45B7D1", // Biru muda
              "#96D761", // Hijau
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Gagal memuat data fasilitas");
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
          padding: 10,
          boxWidth: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const percentage = ((value / totalFasilitas) * 100).toFixed(1);
            return `${label}: ${value} Fasilitas (${percentage}%)`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    // <div className="flex flex-col shadow-md w-full rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4 text-black">
    //   <h2 className="text-lg font-medium">{title}</h2>
    //   <Pie data={data} className="w-fit" options={options} />
    // </div>
    // <div className="container mx-auto py-8">
    // <div className="flex flex-col shadow-md w-full rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4 text-black">
    <div className="flex flex-col w-full rounded-xl shadow bg-[#F1F1F1] py-6 px-7 text-black h-full">
      <div className="text-center mb-4">
        <h2 className="text-xl font-medium">
          Distribusi Fasilitas per Fakultas
        </h2>
        <p className="text-gray-600 mt-2">Total Fasilitas: {totalFasilitas}</p>
      </div>
      <div className={`flex justify-center items-center w-full h-4/5`}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default FacilityOfFacultyCardDashboard;
