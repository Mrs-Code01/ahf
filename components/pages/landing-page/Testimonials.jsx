"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronLeft, Quote } from "lucide-react";

// ==================== DATA ====================

const testimonials = [
  {
    quote:
      "AHF's scholarship program changed my life. From an orphan with no hope, I'm now a university graduate with a bright future ahead.",
    author: "Emmanuel O.",
    role: "OVC Scholarship Beneficiary"
  },
  {
    quote:
      "The vocational training gave me a second chance. After leaving prison, I had no skills, but now I can support my family through tailoring.",
    author: "Sunday I.",
    role: "Reformed Inmate"
  },
  {
    quote:
      "When I lost my husband, I felt the world had ended. AHF's widows empowerment program gave me the seed capital to start my own business.",
    author: "Mama Blessing",
    role: "Widows Program Beneficiary"
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const next = () => {
    setFade(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % testimonials.length);
      setFade(true);
    }, 300);
  };

  const prev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
      setFade(true);
    }, 300);
  };

  return (
    <section className="pb-[150px] bg-white w-full text-center">
      <div className="w-[90%] mx-auto max-w-5xl">
        <p className="text-[1.3rem] font-bold uppercase text-[#E32227] mb-[10px]">
          What People Say About Us
        </p>
        <h2 className="text-[3rem] md:text-[4rem] font-black text-[#262626] mb-20">
          Lives Transformed
        </h2>
        <div className="bg-gray-50 rounded-[3.5rem] p-12 md:p-24 text-left relative shadow-sm min-h-[400px] flex flex-col justify-center">
          <Quote
            className="text-red-600/10 absolute top-10 left-10"
            size={120}
          />

          <div
            className={`transition-all duration-300 transform ${
              fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-[1.8rem] md:text-4xl font-medium text-blue-900 italic mb-12 relative z-10">
              "{testimonials[index].quote}"
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-gray-200 pt-10 mt-auto gap-8">
            <div
              className={`transition-all duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              <h4 className="text-2xl font-black text-blue-900">
                {testimonials[index].author}
              </h4>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                {testimonials[index].role}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={prev}
                className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-90 shadow-sm"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={next}
                className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-90 shadow-sm"
              >
                <ArrowRight size={28} />
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setIndex(i);
                    setFade(true);
                  }, 300);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === i
                    ? "w-12 bg-red-600"
                    : "w-3 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
