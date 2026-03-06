"use client";

import React, { useState } from "react";
import {
  Heart,
  Users,
  ArrowRight,
  GraduationCap,
  HandHeart,
  Droplets,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

const mandates = [
  {
    icon: Heart,
    title: "Hospitalized & Medical Outreaches",
    description:
      "Restoring health and comfort to those in hospital wards through medical supplies, care packages, and emotional support.",
    color: "text-red-600",
    bgColor: "bg-red-50",
    link: "/programs/hospital-medical-outreach",
  },
  {
    icon: GraduationCap,
    title: "Orphans & Vulnerable Children (OVC)",
    description:
      "Securing the future through scholarships, eye care programs, and educational support for children who need it most.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    link: "/programs/orphans-and-vulnerable-children",
  },
  {
    icon: Users,
    title: "Prison Inmates (Reformation)",
    description:
      "Skill acquisition and reintegration programs giving inmates a second chance at life with dignity and purpose.",
    color: "text-blue-800",
    bgColor: "bg-blue-50",
    link: "/programs/prison-reform-and-skill-acquisition",
  },
  {
    icon: HandHeart,
    title: "Widows Empowerment",
    description:
      "Empowering widowed women with tools, training, and resources for financial independence and self-sufficiency.",
    color: "text-red-500",
    bgColor: "bg-red-50",
    link: "/programs/widows-support",
  },
  {
    icon: Droplets,
    title: "Community Development",
    description:
      "Providing clean water access and public safety advocacy for rural communities across Nigeria.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    link: "/programs/community-development",
  },
];
const Mandates = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="py-32 bg-gray-50 w-full">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 mb-6 text-[1.3rem] font-black tracking-widest uppercase bg-red-100 text-red-600 rounded-md">
            What We Do
          </span>
          <h2 className="text-[4rem] font-black text-blue-900 tracking-tighter uppercase max-[768px]:text-[3rem]">
            Our Core Mandates
          </h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {mandates.map((m, i) => (
            <div
              key={i}
              className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 border-2 ${
                openIndex === i
                  ? "border-red-600 shadow-xl"
                  : "border-transparent"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${m.bgColor}`}>
                    <m.icon className={m.color} size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tight">
                    {m.title}
                  </h3>
                </div>
                {openIndex === i ? (
                  <ChevronUp className="text-red-600" />
                ) : (
                  <ChevronDown className="text-gray-300" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-10 pb-10 pl-28 animate-in fade-in slide-in-from-top-2">
                  <p className="text-gray-500 text-[1.5rem] leading-relaxed mb-8">
                    {m.description}
                  </p>
                  <Link
                    href={m.link}
                    className="flex items-center gap-2 text-red-600 font-black uppercase text-[1.5rem] group"
                  >
                    Learn More{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mandates;
