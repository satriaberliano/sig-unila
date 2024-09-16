import React from "react";
import { RiBuilding4Fill } from "react-icons/ri";
import Loading from "../Loading/Loading";

const CardDashboard = ({ total, titleCard }) => {
  return (
    <div className="relative overflow-hidden shadow-md  rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4">
      <div className="flex flex-col justify-between h-full space-y-3">
        <h2 className="font-medium text-neutral-700">{titleCard}</h2>
        {total ? (
          <p className="text-xl font-semibold">{total || "-"}</p>
        ) : (
          <p className="text-base animate-pulse text-gray-800">Loading...</p>
        )}
      </div>
      {/* <p className="text-xl font-semibold">{total || '-'}</p> */}
      <div className="hidden md:block absolute -bottom-2 right-0">
        <RiBuilding4Fill className="text-[5.5rem] text-neutral-300" />
      </div>
    </div>
  );
};

export default CardDashboard;
