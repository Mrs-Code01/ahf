"use client";

import React, { useState } from "react";
import Link from "next/link";
import DonationModal from "../../../../components/ModalPopUp/Donate";
import VolunteerModal from "../../../../components/ModalPopUp/Volunteer";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Bookmark,
  Heart,
  LayoutGrid,
  CheckCircle2,
  Award,
  FileText
} from "lucide-react";

const FullProjectDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Brand Colors
  const colors = {
    primaryBlue: "text-[#1E40AF]",
    bgBlue: "bg-[#4169e1]",
    accentRed: "text-[#DC2626]",
    bgRed: "bg-[#DC2626]",
    lightBlue: "bg-[#EFF6FF]",
    lightRed: "bg-[#FEF2F2]"
  };

  const stories = [
    {
      title: "Fruitful Mind; Productive Life (Sapele)",
      date: "April 24, 2015",
      category: "Vocational Skills",
      image: "/images/ahfnig1.jpg",
      fullReport: [
        "The Sapele project was initiated to address the high rate of recidivism by providing inmates with tangible economic tools. Over a period of three intensive weeks, our team transformed a section of the Sapele Prison into a makeshift chemical laboratory.",
        "Inmates were divided into specialized units. Group A focused on the base chemistry of liquid detergents, while Group B specialized in antiseptic formulations. The training didn't stop at production; we brought in business consultants to teach them about market pricing, cost-benefit analysis, and small-scale manufacturing management.",
        "The result was the successful production of 500 liters of high-grade liquid soap, which was donated back to the prison clinic, immediately improving the hygiene standards of the facility. Each of the 85 participants received a certification recognized by our partner vocational institutes."
      ]
    },
    {
      title: "The Benin Expansion: Scaling Skills",
      date: "May 25, 2015",
      category: "Industrial Production",
      image: "/images/ahfnig1.jpg",
      fullReport: [
        "Building on the momentum from Sapele, the Benin City project at the White House Prison was designed for scale. This phase focused on industrial-grade disinfectants and laundry agents, catering to the larger population of the facility.",
        "We introduced automated mixing equipment and professional-grade safety gear. The curriculum was expanded to include 'Train the Trainer' modules, where 10 standout inmates were coached to become instructors for future batches, ensuring the sustainability of the program long after our team departed.",
        "By the end of the second month, the facility had established a 'Production Cell' capable of meeting all the cleaning needs of the prison, saving the administration significantly on maintenance costs while instilling a profound sense of purpose and dignity in the participating inmates."
      ]
    },
    {
      title: "Stakeholders Workshop on Reformation",
      date: "September 20, 2019",
      category: "Legal & Reform",
      image: "/images/ahfnig1.jpg",
      fullReport: [
        "Policy change is the bedrock of lasting reform. This workshop, held at the University of Benin Faculty of Law, served as a bridge between the street-level reality of prisons and the high-level decision-makers of the Nigerian judicial system.",
        "Key stakeholders including the NBA Chairman and the FIDA President engaged in rigorous debate over the Administration of Criminal Justice Act. We presented raw data and testimonials from our vocational programs to prove that reform is more cost-effective than pure incarceration.",
        "The white paper generated from this workshop was formally adopted by the state justice committee, leading to the fast-tracking of 150 'awaiting trial' cases and a commitment to include vocational training funding in the upcoming fiscal budget for correctional services."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12">
      {/* Navigation Section - 90% */}
      <nav className="w-[90%] flex justify-between items-center mt-[60px] mb-[40px] border-b border-slate-100 pb-8">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-[1.3rem] font-black tracking-tighter text-slate-400 hover:text-[#1E40AF] transition-all "
        >
          <ArrowLeft size={16} />
          Back To Projects
        </Link>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
            <FileText size={14} /> Full Reports View
          </div>
        </div>
      </nav>
      {/* End Navigation */}

      {/* Hero Title Section - 90% */}
      <header className="w-[90%] flex flex-col items-start mb-24">
        <span
          className={`${colors.bgRed} text-white text-[10px] font-black px-4 py-1 rounded-sm uppercase tracking-widest mb-6`}
        >
          Detailed Project
        </span>
        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
          Prison <span className={colors.primaryBlue}>Inmates </span>
          Full <span className={colors.accentRed}>Projects.</span>
        </h1>
        <div className="w-24 h-2 ${colors.bgBlue} mb-8"></div>
      </header>
      {/* End Hero Title */}

      {/* Reports Content - 90% */}
      <main className="w-[90%] flex flex-col gap-56">
        {stories.map((story, index) => (
          <section key={index} className="w-full flex flex-col">
            {/* Project Title and Header - Responsive Split */}
            <div className="w-full flex justify-between items-end mb-12 border-b-2 border-[#cccccc] pb-6">
              <div className="w-[70%]">
                <p
                  className={`${colors.accentRed} font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2`}
                >
                  <Award size={18} /> {story.category}
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                  {story.title}
                </h2>
              </div>
              <div className="w-[25%] flex flex-col items-end">
                <span className="text-slate-400 text-sm font-bold">
                  {story.date}
                </span>
                <span
                  className={`${colors.primaryBlue} text-lg font-black uppercase italic`}
                >
                  {story.impact}
                </span>
              </div>
            </div>

            {/* Featured Image - 90% Full Width */}
            <div className="w-full h-[500px] rounded-[40px] overflow-hidden mb-16 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-70 mb-2">
                  Project Visual Evidence
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-green-400" />
                  <span className="text-xl font-medium tracking-tight">
                    On-site execution verified
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Body Text - 1/3 and 2/3 Split */}
            <div className="w-full flex justify-between flex-wrap items-start">
              {/* Sidebar Info - 30% */}
              <div className="w-[30%] flex flex-col gap-8 sticky top-[120px] max-[450px]:w-[100%] max-[450px]:top-[0px] max-[450px]:relative max-[450px]:mb-[30px]">
                <div className={`${colors.lightBlue} p-8 rounded-3xl`}>
                  <h4
                    className={`${colors.primaryBlue} font-black uppercase text-[1.3rem] tracking-widest mb-4`}
                  >
                    Summary Objectives
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {[
                      "Vocational Training",
                      "Recidivism Reduction",
                      "Economic Empowerment"
                    ].map((obj, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[1.1rem] font-bold text-slate-600"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-1 ${colors.bgRed}`}
                        ></div>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${colors.lightRed} p-8 rounded-3xl`}>
                  <p className="text-[10px] font-black uppercase mb-2">
                    Project Lead
                  </p>
                  <p className="font-bold text-slate-800">
                    Impact Directorate Office
                  </p>
                </div>
              </div>

              {/* Main Content Body - 65% */}
              <div className="w-[65%] flex flex-col gap-10 max-[450px]:w-[100%]">
                {story.fullReport.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-xl leading-[1.8] text-slate-600 text-[1.8rem] max-[700px]:text-[1.5rem]"
                  >
                    {paragraph}
                  </p>
                ))}
                {/* Visual Separator */}
                <div className="w-full h-px bg-slate-200 mt-10"></div>
              </div>
            </div>
          </section>
        ))}
      </main>
      {/* End Reports Content */}

      {/* Shared Footer CTA - 90% */}
      <footer className="w-[90%] mt-40 mb-20">
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

          <div className="flex gap-6">
            <button
              className="bg-[#DC2626] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[1.3rem] hover:scale-105 transition-all shadow-xl cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Donate to Reform
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#1E40AF] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[1.3rem] hover:bg-slate-100 transition-all cursor-pointer"
            >
              Volunteer Today
            </button>
          </div>
          {showModal && <DonationModal onClose={() => setShowModal(false)} />}
          {isModalOpen && (
            <VolunteerModal onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      </footer>
      {/* End Footer */}
    </div>
  );
};

export default FullProjectDetailsPage;
