"use client";

import React, { useState } from "react";
import Link from "next/link";
import DonationModal from "@components/ModalPopUp/Donate";
import VolunteerModal from "@components/ModalPopUp/Volunteer";
import { ArrowLeft, Heart, CheckCircle2, Award, FileText } from "lucide-react";

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
      title: "Liberty for Orphans: Holistic Welfare",
      date: "April 18, 2009",
      category: "Social Welfare",
      image: "/images/liberty2009.jpg",
      objectives: [
        "Holistic Welfare",
        "Educational Support",
        "Infrastructure Aid"
      ],
      lead: "Welfare & Logistics Dept",
      fullReport: [
        "Launched on April 18, 2009, this project was designed to address the holistic welfare of orphans. The program began with a recreational outing to Millennium Park, Abuja, involving 20 orphans and members of the NGO.",
        "Beyond social interaction, the foundation provided critical infrastructure support by assisting the City of Refuge orphanage in Durumi to reconnect their water meter and providing raincoats for the children.",
        "The initiative also focused on education, successfully sponsoring the school fees for two orphans, Daniel and Susana Bojireh, to ensure their academic journey continued without interruption."
      ]
    },
    {
      title: "Liberty for Orphans: Regional Outreach",
      date: "May 4, 2010",
      category: "Social Welfare",
      image: "/images/liberty2010.jpg",
      objectives: [
        "Inter-state Coordination",
        "Social Integration",
        "Guardian Engagement"
      ],
      lead: "Regional Program Director",
      fullReport: [
        "The 2010 edition saw a significant expansion in reach. AHF coordinated the transportation of orphans and their guardians from Akwa Ibom, Edo, and Ekiti States to the Federal Capital Territory.",
        "This inter-state collaboration brought together children from diverse backgrounds, including residents of the Abuja Children’s Home, for a unified program of support and empowerment.",
        "By facilitating this logistics-heavy operation, the foundation strengthened its network across Nigeria, ensuring that distance was not a barrier to providing care for vulnerable children."
      ]
    },
    {
      title: "Liberty for Orphans: Roll Back Malaria",
      date: "July 16, 2011",
      category: "Healthcare",
      image: "/images/liberty2011.jpg",
      objectives: [
        "Malaria Prevention",
        "Medical Screening",
        "Essential Provisions"
      ],
      lead: "Medical Outreach Team",
      fullReport: [
        "Held in Effurun, Delta State, the 2011 program tagged 'Roll Back Malaria' focused on the health and preventative care of orphans in the region.",
        "Comprehensive malaria testing and treatments were administered to the children. To ensure long-term prevention, treated mosquito nets were distributed alongside essential supplies like clothes, shoes, and writing materials.",
        "The program benefited children from the Heart of Delta and Saint Anne’s orphanages, blending medical intervention with the provision of basic life necessities."
      ]
    },
    {
      title: "Liberty for Orphans: Eye Clinic 2012",
      date: "September 15, 2012",
      category: "Healthcare",
      image: "/images/liberty2012.jpg",
      objectives: [
        "Visual Screening",
        "Corrective Treatment",
        "Ophthalmic Advocacy"
      ],
      lead: "Hellyncom Eye Clinic",
      fullReport: [
        "In collaboration with Hellyncom Eye Clinic, AHF hosted the first 'Free Eye Test and Treatment' event at PICO Hall, PTI, in Effurun.",
        "The initiative focused on early detection of visual impairments, providing professional screenings and immediate medical treatments for the orphans in attendance.",
        "The day concluded with the distribution of gift items, ensuring that the children’s medical needs were met in a celebratory and supportive atmosphere."
      ]
    },
    {
      title: "Liberty for Orphans: Vision Follow-up",
      date: "October 15, 2013",
      category: "Healthcare",
      image: "/images/liberty2013.jpg",
      objectives: [
        "Patient Reassessment",
        "Specialized Treatment",
        "Sustained Recovery"
      ],
      lead: "Medical Partnership Office",
      fullReport: [
        "The 2013 program served as a critical follow-up to the previous year’s vision initiative. Held at Hellyncom Eye Clinic in Warri, the foundation conducted reassessments for children previously diagnosed with visual defects.",
        "A total of 13 orphans from Heart of Delta, Eagle Height, and Kings Kid Orphanage benefited from these specialized treatments and corrective care.",
        "This phase emphasized the foundation's commitment to sustainable health outcomes, ensuring that initial treatments led to long-term recovery for the children."
      ]
    },
    {
      title: "Liberty for Orphans: Eye Outreach 2014",
      date: "August 4, 2014",
      category: "Healthcare",
      image: "/images/liberty2014.jpg",
      objectives: [
        "Community Health",
        "Vision Correction",
        "Pediatric Support"
      ],
      lead: "Hellyncom Medical Team",
      fullReport: [
        "Continuing the partnership with Hellyncom Eye Clinic, the 2014 edition was hosted at the First Baptist Church in Effurun, Delta State.",
        "The clinic provided free eye examinations and specialized treatments for orphans identified with various visual defects, prioritizing those who had no prior access to ophthalmic care.",
        "The outreach successfully gathered children from multiple homes, further solidifying the foundation's reputation as a key provider of pediatric eye care in the region."
      ]
    },
    {
      title: "Liberty for Orphans: Vision Maintenance",
      date: "December 5, 2015",
      category: "Healthcare",
      image: "/images/liberty2015.jpg",
      objectives: [
        "Visual Stability",
        "Prescription Update",
        "Consistent Care"
      ],
      lead: "Impact Directorate Office",
      fullReport: [
        "The 2015 initiative focused on the continued reassessment and treatment of children with visual challenges at the Enerhen-based Hellyncom Eye Clinic.",
        "By maintaining a consistent schedule of yearly check-ups, AHF ensured that the visual health of the orphans did not deteriorate, providing new prescriptions and treatments where necessary.",
        "This ongoing medical partnership highlights the importance of consistency in charitable healthcare interventions."
      ]
    },
    {
      title: "Liberty for Orphans: Comprehensive Care",
      date: "December 16, 2017",
      category: "Healthcare",
      image: "/images/liberty2017.jpg",
      objectives: ["Visual Health", "Psychosocial Fun", "Holiday Outreach"],
      lead: "AHF Welfare Unit",
      fullReport: [
        "The 2017 outreach saw 33 children and their caregivers from Little Saint, Heart of Delta, and Eagles Hand Orphanages receive professional eye care in Enerher, Delta State.",
        "Beyond medical screenings, the event was designed to be a festive experience, featuring fun activities and gift presentations to uplift the children's spirits during the holiday season.",
        "Every child in attendance was tested and treated accordingly, ensuring that their vision was protected as they prepared for the upcoming school year."
      ]
    },
    {
      title: "Liberty for Orphans: Benin City Eye Clinic",
      date: "December 1, 2018",
      category: "Healthcare",
      image: "/images/liberty2018.jpg",
      objectives: [
        "Critical Case Follow-up",
        "Expanded Access",
        "Healthcare Equity"
      ],
      lead: "Success Onose Eye Clinic",
      fullReport: [
        "The 2018 program expanded to Benin City, held at the AHF branch office in the EDPA Shopping Complex, Ugbowo. Partnering with Success Onose Eye Clinic, we served 45 children from four different homes.",
        "Beneficiaries included Cornerstone, Edo, Manasseh Ministry, and Our Mummy Orphanage homes. While all children received testing, critical cases were flagged for dedicated long-term follow-up care.",
        "The day was filled with gift presentations and activities, reinforcing the foundation's mission to provide both professional medical support and emotional encouragement to orphans."
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
          Orphans{" "}
          <span className={colors.primaryBlue}>And Vulnerable Children </span>
          (OVC) <span className={colors.accentRed}>Projects.</span>
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
                    {story.objectives.map((obj, i) => (
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
                  <p className="font-bold text-slate-800">{story.lead}</p>
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
