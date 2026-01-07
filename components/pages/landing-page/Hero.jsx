"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import DonationModal from "../../../components/ModalPopUp/Donate";

const bgImages = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=2000"
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const nextSlide = () => {
    setCurrent(prev => (prev === bgImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? bgImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-zinc-950">
      {/* Background Slider Layer */}
      {bgImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Black Gradient Overlay - High Contrast */}
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

      {/* Static Content */}
      <div className="relative z-20 h-full w-[90%] mx-auto flex flex-col justify-center">
        <div className="w-[70%] space-y-6 max-[700px]:text-center max-[700px]:w-[100%]">
          <span className="inline-block px-5 py-[10px] bg-[#000000] text-white text-[1.2rem] tracking-[5px] font-black uppercase rounded-sm">
            Matthew 25:31-46
          </span>

          <h1 className="text-[4.5rem] md:text-[6rem] font-black text-white leading-[1.2] tracking-tighter">
            Restoring Hope to the
            <span className="text-red-500 italic relative">
              {" "}
              Forgotten.
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-white/10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0 50 5 T 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                />
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl font-light leading-relaxed">
            ApiriHallowed Foundation (AHF) exists to restore hope to the
            impoverished, Prison inmates and Hospital patients, through the
            giving of arms and the message of love.
          </p>

          <div className="flex flex-wrap gap-5 pt-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(220,38,38,0.3)] flex items-center gap-3 mx-auto"
            >
              Support Our Mission <Heart fill="currentColor" size={20} />
            </button>
          </div>
          {showModal && <DonationModal onClose={() => setShowModal(false)} />}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-12 right-[5%] z-3 flex gap-4">
        <button
          onClick={prevSlide}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all bg-black/40 backdrop-blur-md"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all bg-black/40 backdrop-blur-md"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute left-[5%] bottom-14 z-3 flex gap-2">
        {bgImages.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              current === i ? "w-12 bg-red-600" : "w-4 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
