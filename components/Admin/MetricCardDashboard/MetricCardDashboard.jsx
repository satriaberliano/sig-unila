/* eslint-disable @next/next/no-async-client-component */
"use client";

import dynamic from "next/dynamic";
import "chart.js/auto";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { getMonth, parseISO } from "date-fns";
import { Line } from "react-chartjs-2";
import Loading from "../Loading/Loading";

// const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
//   ssr: false,
//   loading: () => <Loading width={10} />,
// });

const supabase = createClientComponentClient();

const options = {
  // responsive: true,
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
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const MetricCardDashboard = ({ title }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [facilitiesData, setFacilitiesData] = useState({
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        label: "Data Fasilitas",
        data: Array(12).fill(0),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const facilities = await fetchFacilitiesData();
      const groupedData = groupByMonth(facilities);
      setFacilitiesData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: groupedData,
          },
        ],
      }));
    };
    fetchData();
  }, []);

  const fetchFacilitiesData = async () => {
    try {
      const { data, error } = await supabase
        .from("fasilitas")
        .select("created_at");

      if (error) {
        console.error("Error fetching data:", error);
        return [];
      }

      return data;
    } catch {
      setError("Gagal memuat data fasilitas");
    } finally {
      setLoading(false);
    }
  };

  const groupByMonth = (data) => {
    const grouped = Array(12).fill(0);

    data.forEach((facility) => {
      const date = parseISO(facility.created_at);
      const month = getMonth(date);
      grouped[month]++;
    });

    return grouped;
  };

  if (loading) {
    return (
      <div className="flex flex-col shadow-md h-80 rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4 text-black">
        <div className="text-center mb-4">
          <h2 className="text-lg font-medium">
            Metrik Penambahan Data Fasilitas
          </h2>
        </div>
        <div className={`flex justify-center items-center w-full h-4/5 `}>
          <span className="animate-pulse">Memuat data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col shadow-md h-full rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4 text-black">
        <div className="text-center mb-4">
          <h2 className="text-lg font-medium">
            Metrik Penambahan Data Fasilitas
          </h2>
        </div>
        <div className={`flex justify-center items-center w-full h-4/5 `}>
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between shadow-md w-full rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4 text-black">
      <div className="text-center mb-4">
        <h2 className="text-lg font-medium">
          Metrik Penambahan Data Fasilitas
        </h2>
      </div>
      <div className={`flex justify-center items-center w-full h-4/5`}>
        <Line data={facilitiesData} options={options} />
      </div>
    </div>
  );
};

export default MetricCardDashboard;
