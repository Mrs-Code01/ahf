"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Globe,
  Utensils,
  Activity,
  Users,
  MapPin,
  ArrowRight
} from "lucide-react";
import DonationModal from "../components/ModalPopUp/Donate";
import Hero from "../components/pages/landing-page/Hero";
import Stats from "../components/pages/landing-page/Stats";
import Mandates from "../components/pages/landing-page/Mandates";
import Projects from "../components/pages/landing-page/Projects";
import Testimonials from "../components/pages/landing-page/Testimonials";

const CharityLandingPage = () => {
  const imgPath = "/images/ahfnig1.jpg";
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* 1. HERO SECTION - Exact layout with rounded overlapping circles */}
      <Hero />
      <Stats />

      {/* 3. ABOUT SECTION - Overlapping staggered images */}
      <section className="flex flex-col items-center py-20 lg:py-32">
        <div className="w-[90%] flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-[48%] flex flex-row relative mb-16 lg:mb-0">
            <div className="w-[55%] h-[400px] max-[1130px]:h-[320px] rounded-[40px] overflow-hidden shadow-2xl z-10 border-4 border-white">
              <img
                src={imgPath}
                className="w-full h-full object-cover"
                alt="About"
              />
            </div>
            <div className="w-[55%] h-[400px] max-[1130px]:h-[320px] rounded-[40px] overflow-hidden mt-20 -ml-16 shadow-2xl border-4 border-white">
              <img
                src={imgPath}
                className="w-full h-full object-cover"
                alt="About"
              />
            </div>
            {/* Background decorative shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#4169e1] rounded-full opacity-5 -z-10 blur-3xl"></div>
          </div>
          <div className="w-full lg:w-[48%] lg:pl-10 max-[700px]:text-center">
            <span className="text-[#E32227] font-bold text-[1.4rem] uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-[4rem] mt-5 mb-8 leading-[1.2] max-[700px]:text-[3rem]">
              Welcome to AHF
            </h2>
            <p className="text-gray-500 text-[1.8rem] mb-10 max-[700px]:text-[1.5rem]">
              ApiriHallowed Foundation was established on June 3rd 2007,
              inspired by the word of God in Matthew 25: 31  46. It was founded
              by Mr. Apiriala Atedoghu, who is...
            </p>
            <div className="flex flex-row justify-between mb-10">
              <div className="w-[48%] border-l-4 border-[#4169e1] pl-5">
                <h4 className="font-bold text-[#4169e1] text-[1.3rem]">
                  Our Mission
                </h4>
                <p className="text-[1.6rem] text-[#000000] italic mt-2 max-[700px]:text-[1.4rem]">
                  Restore hope to the impoverished, Prison inmates and..
                </p>
              </div>
              <div className="w-[48%] border-l-4 border-[#E32227] pl-5">
                <h4 className="font-bold text-[#E32227] text-[1.3rem]">
                  Our Vision
                </h4>
                <p className="text-[1.6rem] text-[#000000] italic mt-2 max-[700px]:text-[1.4rem]">
                  Improved well-being of Humanity amongst the Poor and...
                </p>
              </div>
            </div>
            <Link
              href="/about/who-we-are"
              className="inline-block bg-[#4169e1] text-white px-10 py-4 mt-[20px] rounded-full font-bold text-[1.5rem] uppercase tracking-widest hover:bg-[#E32227] transition-all max-[700px]:text-[1.4rem]"
            >
              More About Us
            </Link>
          </div>
        </div>
      </section>
      {/* END ABOUT SECTION */}
      <Mandates />
      <Projects />
      {/* END CORE MANDATES */}
      {/* END CORE MANDATES */}
      <section className="w-[90%] my-[100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-y-[70px]">
        {/* Left Content Side */}
        <div className="w-full lg:w-[50%] flex flex-col max-[700px]:text-center">
          <h2 className="text-[3.5rem] md:text-[4rem] leading-[1.2] text-gray-900 max-[700px]:text-[3rem]">
            Start <span className="text-[#E32227]">Learning </span>A Skill From
            Experts
          </h2>

          <p className="text-gray-600 text-[1.8rem] max-w-[500px] max-[700px]:text-[1.5rem] mt-[10px]">
            Pick from our online video courses with new additions published
            every month.
          </p>

          <div>
            <Link
              href="#"
              className="inline-block bg-[#4169e1] text-white px-10 py-4 mt-[20px] rounded-full font-bold text-[1.5rem] uppercase tracking-widest hover:bg-[#E32227] transition-all"
            >
              Start Course
            </Link>
          </div>
        </div>
        {/* End Left Content Side */}

        {/* Right Image Side */}
        <div className="w-full lg:w-[45%] relative flex justify-center items-center">
          <img
            src="/images/ahfnig1.jpg"
            alt="Instructor"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* End Right Image Side */}
      </section>
      {/* 5. DONATION ICON GRID */}
      <section className="flex flex-col items-center py-28">
        <div className="w-[90%] text-center">
          <span className="text-[#E32227] font-bold text-[1.5rem] uppercase tracking-widest">
            How We Help
          </span>
          <h2 className="text-[4rem] font-black mt-4 mb-20 max-[700px]:text-[3rem]">
            Your Donation Means Another Smile.
          </h2>

          <div className="flex flex-wrap flex-row justify-between gap-y-16">
            {[
              {
                icon: <Globe size={32} />,
                title: "Give Education",
                color: "#4169e1"
              },
              {
                icon: <Heart size={32} />,
                title: "Pure Water",
                color: "#E32227"
              },
              {
                icon: <Utensils size={32} />,
                title: "Healthy Food",
                color: "#0A4D3C"
              },
              {
                icon: <Activity size={32} />,
                title: "Medical Care",
                color: "#E32227"
              }
            ].map((box, i) => (
              <div
                key={i}
                className="w-[48%] lg:w-[24%] flex flex-col items-center"
              >
                <div
                  style={{ borderColor: box.color, color: box.color }}
                  className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-6 shadow-sm hover:rotate-12 transition-transform"
                >
                  {box.icon}
                </div>
                <h4 className="font-bold text-[1.8rem] mb-3">{box.title}</h4>
                <p className="text-[1.5rem] text-gray-400 w-[70%] mx-auto leading-relaxed">
                  Providing high-quality care and resources for the vulnerable.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END DONATION ICON GRID */}

      {/* 6. GREEN CTA STRIP */}
      <section className="flex flex-col items-center mb-[100px]">
        <div className="w-[90%] bg-[#0A4D3C] rounded-[40px] p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="uppercase text-[1.3rem] tracking-[0.3em] font-bold mb-6 text-white/70">
              How to help with us
            </p>
            <h2 className="text-[3rem] md:text-[4rem] font-bold mb-10 leading-[1.2] text-[#ffffff]">
              Your donation means a lot for them. <br /> Donate what you can.
            </h2>
            <button
              className="bg-[#E32227] text-white px-12 py-5 rounded-full font-black text-[1.5rem] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Donate Now
            </button>
          </div>
          {/* Decorative faint patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-10 -mb-10"></div>
        </div>
      </section>
      {showModal && <DonationModal onClose={() => setShowModal(false)} />}
      {/* END CTA STRIP */}
      <Testimonials />
      {/* END TESTIMONIALS */}
    </div>
  );
};

export default CharityLandingPage;
