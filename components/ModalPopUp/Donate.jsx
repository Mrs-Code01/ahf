"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Heart, Copy, X } from "lucide-react";

const DonateModal = ({ onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Immediate Scroll Lock to prevent background jumping
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const accounts = [
    {
      bank: "Guaranty Trust Bank (GTB)",
      name: "Apiri Hallowed Foundation",
      number: "0024260939",
      color: "bg-[#E32227]"
    },
    {
      bank: "Zenith Bank",
      name: "Apiri Hallowed Foundation",
      number: "1013388378",
      color: "bg-[#4169e1]"
    }
  ];

  const handleCopy = (number, index) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
      {/* Optimized Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[460px] bg-white rounded-[28px] p-6 md:p-10 shadow-2xl animate-in zoom-in-95 fade-in duration-200 will-change-transform">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-[#E32227] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(227,34,39,0.3)] mb-5">
            <Heart className="text-white fill-white" size={30} />
          </div>
          <h2 className="text-[2.4rem] max-[800px]:text-[2.1rem] font-bold text-[#111827] mb-2 tracking-tight">
            Support Our Cause
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-[340px] max-[800px]:text-[1.4rem]">
            Your generosity helps us make a difference. Choose a bank below to
            make your donation.
          </p>
        </div>

        {/* Bank Cards */}
        <div className="space-y-5">
          {accounts.map((acc, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[22px] border border-gray-100 shadow-sm transition-all hover:shadow-md bg-white"
            >
              {/* Bank Header */}
              <div className={`${acc.color} px-6 py-3.5 text-white font-bold text-[15px]`}>
                {acc.bank}
              </div>

              <div className="p-6 relative">
                {/* Account Name */}
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-black mb-1">
                    Account Name
                  </p>
                  <p className="text-[#374151] font-bold text-[17px] max-[800px]:text-[1.5rem]">
                    {acc.name}
                  </p>
                </div>

                {/* Account Number */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-black mb-1">
                    Account Number
                  </p>
                  <p className="text-[#111827] font-mono font-bold text-[26px] tracking-[0.15em] leading-none max-[800px]:text-[2.2rem]">
                    {acc.number}
                  </p>
                </div>

                {/* Copy Button & Feedback */}
                <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
                  {copiedIndex === index && (
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded animate-in fade-in slide-in-from-bottom-1">
                      COPIED!
                    </span>
                  )}
                  <button
                    onClick={() => handleCopy(acc.number, index)}
                    className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500 transition-all active:scale-90"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-[14px] font-medium italic max-[800px]:text-[1.2rem]">
            Thank you for your kindness and support
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DonateModal;