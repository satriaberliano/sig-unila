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
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const MetricCardDashboard = ({ title }) => {
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
    const { data, error } = await supabase
      .from("fasilitas")
      .select("created_at");

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return data;
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

  return (
    <div className="flex flex-col shadow-md w-full h-full rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4 text-black">
      {/* <h2 className="text-lg font-medium">{title}</h2> */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-medium">
          Metrik Penambahan Data Fasilitas
        </h2>
      </div>
      <div className={`flex justify-center items-center w-full h-4/5 `}>
        {facilitiesData ? (
          <Line data={facilitiesData} options={options} />
        ) : (
          <Loading></Loading>
        )}
      </div>
      {/* <Line data={facilitiesData} /> */}
    </div>
  );
};

export default MetricCardDashboard;
