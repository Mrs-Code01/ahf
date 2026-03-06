"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import DonateModal from "@/components/ModalPopUp/Donate";

const bgImages = [
  "/images/ahfnig5.jpg",
  "/images/ahfnig2.JPG",
  "/images/ahfnig10.JPG",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const timerRef = useRef(null); // Reference to store the interval

  useEffect(() => {
    setIsClient(true);
    startTimer();
    return () => stopTimer();
  }, []);

  const startTimer = () => {
    stopTimer(); // Clear existing
    timerRef.current = setInterval(nextSlide, 8000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === bgImages.length - 1 ? 0 : prev + 1));
    startTimer(); // Reset the 8s clock on manual click
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? bgImages.length - 1 : prev - 1));
    startTimer(); // Reset the 8s clock on manual click
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-zinc-950">
      {/* Background Slider */}
      {bgImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-transparent z-10" />
          <img
            src={img}
            alt="Foundation Impact"
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ${
              i === current ? "scale-100" : "scale-110"
            }`}
          />
        </div>
      ))}

      {/* Static Content - Lowered Z-index slightly to ensure buttons are on top */}
      <div className="relative z-20 h-full w-[90%] mx-auto flex flex-col justify-center">
        <div className="w-[70%] space-y-6 max-[700px]:text-center max-[700px]:w-[100%]">
          <span className="inline-block px-5 py-[10px] bg-[#000000] text-white text-[1.2rem] tracking-[5px] font-black uppercase rounded-sm">
            Matthew 25:31-46
          </span>

          <h1 className="text-[4.5rem] md:text-[6rem] font-black text-white leading-[1.1] tracking-tighter">
            Restoring Hope to the{" "}
            <span className="text-red-500 italic relative">Forgotten.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl font-light leading-relaxed">
            ApiriHallowed Foundation (AHF) exists to restore hope to the
            impoverished, Prison inmates and Hospital patients, through the
            giving of alms and the message of love.
          </p>

          <div className="flex pt-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 flex items-center gap-3 max-[700px]:mx-auto cursor-pointer"
            >
              Support Our Mission <Heart fill="currentColor" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - High Z-Index and Pointer Events */}
      <div className="absolute bottom-12 right-[5%] z-[100] flex gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all bg-black/60 backdrop-blur-md cursor-pointer pointer-events-auto"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all bg-black/60 backdrop-blur-md cursor-pointer pointer-events-auto"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute left-[5%] bottom-14 z-50 flex gap-2">
        {bgImages.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              current === i ? "w-12 bg-red-600" : "w-4 bg-white/20"
            }`}
          />
        ))}
      </div>

      {isClient && showModal && (
        <DonateModal onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};

export default Hero;
