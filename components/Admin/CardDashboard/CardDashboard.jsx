import React from "react";
import { RiBuilding4Fill } from "react-icons/ri";

const CardDashboard = ({ total, titleCard }) => {
  return (
    <div className="relative overflow-hidden shadow-md max-w-lg rounded-xl bg-[#F1F1F1] py-6 px-7 space-y-4">
      <h2 className="font-medium text-neutral-700">{titleCard}</h2>
      <p className="text-xl font-semibold">{total || "-"}</p>
      <div className="hidden md:block absolute -bottom-2 right-0">
        <RiBuilding4Fill className="text-[5.5rem] text-neutral-300" />
      </div>
    </div>
  );
};

export default CardDashboard;
