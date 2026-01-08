"use client";

import React, { useState } from "react";
import DonationModal from "../components/ModalPopUp/Donate";
import { Heart } from "lucide-react";
import Link from "next/link";

const Volunteer = () => {
  const [showModal, setShowModal] = useState(false);

  const colors = {
    primaryBlue: "text-[#1E40AF]",
    bgBlue: "bg-[#4169e1]",
    accentRed: "text-[#DC2626]",
    bgRed: "bg-[#DC2626]",
    lightBlue: "bg-[#EFF6FF]",
    lightRed: "bg-[#FEF2F2]"
  };
  return (
    <div>
      <footer className="w-[90%] mt-40 mb-20 mx-auto">
        <div
          className={`w-full ${colors.bgBlue} rounded-[50px] p-20 flex flex-col items-center text-center text-white relative overflow-hidden`}
        >
          {/* Background Red Accents */}
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-40"></div>

          <Heart size={48} className="mb-8" fill="white" />
          <h3 className="text-[3.5rem] text-[#ffffff] mb-6 max-w-[700px]">
            Help us write more success stories.
          </h3>
          <p className="text-blue-100 text-[1.5rem] max-w-[600px] mb-12 font-medium opacity-80">
            Your financial partnership allows us to expand these projects to
            every state in the federation.
          </p>

          <div className="flex flex-wrap gap-6">
            <button
              className="bg-[#DC2626] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[1.3rem] hover:scale-105 transition-all shadow-xl cursor-pointer max-[470px]:w-[100%]"
              onClick={() => setShowModal(true)}
            >
              Donate to Reform
            </button>
            <Link
              href="/get-involved/volunteer"
              className="bg-white text-[#1E40AF] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[1.3rem] hover:bg-slate-100 transition-all cursor-pointer max-[470px]:w-[100%]"
            >
              Volunteer Today
            </Link>
          </div>
          {showModal && <DonationModal onClose={() => setShowModal(false)} />}
        </div>
      </footer>
    </div>
  );
};

export default Volunteer;
