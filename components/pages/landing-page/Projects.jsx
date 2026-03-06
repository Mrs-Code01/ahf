import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Heart, MapPin } from "lucide-react";

const Projects = () => {
  return (
    <section className="py-[100px] bg-[#ffffff] w-full">
      <div className="w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right Image Side */}
          <div className="relative h-[500px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            {/* Using a placeholder gradient to mimic the design's image style */}
            <div className=""></div>
            <Image
              src="/images/community/projects/rumuekini/Picture4.png"
              alt="Community Outreach"
              width={100}
              height={100}
              className="w-full h-full object-cover object-top "
              unoptimized
            />
          </div>
          {/* Left Content Side */}
          <div className="space-y-8 max-[700px]:text-center">
            <span className="inline-block px-4 py-1.5 text-[#E32227] text-[1.3rem] font-bold uppercase">
              Featured Project
            </span>

            <h2 className="text-[3rem] md:text-[4rem] font-bold text-[#1A2B42] leading-tight">
              Rural Community Outreach — Rumuekini 2021
            </h2>

            <p className="text-[1.8rem] text-gray-500">
              In one of our most impactful outreaches, we reached over 115
              community members in Rumuekini, Rivers State, with free medical
              care, foodstuff, and clothing. This project exemplifies our
              commitment to reaching the most underserved communities.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-white px-[20px] py-[50px] rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-[#F9F9F9] rounded-xl text-[#E65F3E]">
                  <Users size={24} />
                </div>
                <div className="text-2xl font-bold text-[#1A2B42] my-[10px]">
                  115+
                </div>
                <div className="text-[1.4rem] text-gray-400 font-medium">
                  People Reached
                </div>
              </div>

              <div className="bg-white px-[20px] py-[50px] rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-[#F9F9F9] rounded-xl text-[#E65F3E]">
                  <Heart size={24} />
                </div>
                <div className="text-2xl font-bold text-[#1A2B42] my-[10px]">
                  Free
                </div>
                <div className="text-[1.4rem] text-gray-400 font-medium">
                  Medical Care
                </div>
              </div>

              <div className="bg-white px-[20px] py-[50px] rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-[#F9F9F9] rounded-xl text-[#E65F3E]">
                  <MapPin size={24} />
                </div>
                <div className="text-2xl font-bold text-[#1A2B42] my-[10px]">
                  Rivers
                </div>
                <div className="text-[1.4rem] text-gray-400 font-medium">
                  State, Nigeria
                </div>
              </div>
            </div>

            <Link
              href="/projects"
              className="inline-block bg-[#4169e1] text-white px-10 py-4 mt-[20px] rounded-full font-bold text-[1.5rem] uppercase tracking-widest hover:bg-[#E32227] transition-all max-[700px]:text-[1.4rem]"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
