// "use client";

// import React from "react";
// import Link from "next/link";
// import Support from "../../../../components/Support";
// import { ArrowLeft, CheckCircle2, Award, FileText } from "lucide-react";

// const FullProjectDetailsPage = () => {
//   // Brand Colors
//   const colors = {
//     primaryBlue: "text-[#1E40AF]",
//     bgBlue: "bg-[#4169e1]",
//     accentRed: "text-[#DC2626]",
//     bgRed: "bg-[#DC2626]",
//     lightBlue: "bg-[#EFF6FF]",
//     lightRed: "bg-[#FEF2F2]",
//   };

//   const stories = [
//     {
//       title: "Liberty for Orphans: Holistic Welfare",
//       date: "April 18, 2009",
//       category: "Social Welfare",
//       image: "/images/orphans-project/abuja/pic1.JPG",
//       objectives: [
//         "Holistic Welfare",
//         "Educational Support",
//         "Infrastructure Aid",
//       ],
//       lead: "Welfare & Logistics Dept",
//       fullReport: [
//         "Launched on April 18, 2009, this project was designed to address the holistic welfare of orphans. The program began with a recreational outing to Millennium Park, Abuja, involving 20 orphans and members of the NGO from various states.",
//         "Beyond social interaction, the foundation provided critical infrastructure support by assisting the City of Refuge orphanage in Durumi to reconnect their water meter and providing raincoats for the children.",
//         "The initiative also focused on education, successfully sponsoring the school fees for two orphans, Daniel and Susana Bojireh, to ensure their academic journey continued without interruption.",
//       ],
//     },
//     {
//       title: "Liberty for Orphans: Roll Back Malaria",
//       date: "July 16, 2011",
//       category: "Healthcare",
//       image: "/images/ahfnig1.jpg",
//       objectives: [
//         "Malaria Prevention",
//         "Medical Screening",
//         "Essential Provisions",
//       ],
//       lead: "Medical Outreach Team",
//       fullReport: [
//         "Held in Effurun, Delta State, the 2011 program tagged 'Roll Back Malaria' focused on the health and preventative care of orphans in the region.",
//         "Comprehensive malaria testing and treatments were administered to the children. To ensure long-term prevention, treated mosquito nets were distributed alongside essential supplies like clothes, shoes, and writing materials.",
//         "The program benefited children from the Heart of Delta and Saint Anne’s orphanages, blending medical intervention with the provision of basic life necessities.",
//       ],
//     },
//     {
//       title: "Liberty for Orphans: Eye Clinic 2012",
//       date: "September 15, 2012",
//       category: "Healthcare",
//       image: "/images/ahfnig1.jpg",
//       objectives: [
//         "Visual Screening",
//         "Corrective Treatment",
//         "Ophthalmic Advocacy",
//       ],
//       lead: "Hellyncom Eye Clinic",
//       fullReport: [
//         "In collaboration with Hellyncom Eye Clinic, AHF hosted the first 'Free Eye Test and Treatment' event at PICO Hall, PTI, in Effurun.",
//         "The initiative focused on early detection of visual impairments, providing professional screenings and immediate medical treatments for the orphans in attendance.",
//         "The day concluded with the distribution of gift items, ensuring that the children’s medical needs were met in a celebratory and supportive atmosphere.",
//       ],
//     },
//     {
//       title: "Liberty for Orphans: Vision Follow-up",
//       date: "October 15, 2013",
//       category: "Healthcare",
//       image: "/images/ahfnig1.jpg",
//       objectives: [
//         "Patient Reassessment",
//         "Specialized Treatment",
//         "Sustained Recovery",
//       ],
//       lead: "Medical Partnership Office",
//       fullReport: [
//         "The 2013 program served as a critical follow-up to the previous year’s vision initiative. Held at Hellyncom Eye Clinic in Warri, the foundation conducted reassessments for children previously diagnosed with visual defects.",
//         "A total of 13 orphans from Heart of Delta, Eagle Height, and Kings Kid Orphanage benefited from these specialized treatments and corrective care.",
//         "This phase emphasized the foundation's commitment to sustainable health outcomes, ensuring that initial treatments led to long-term recovery for the children.",
//       ],
//     },
//     {
//       title: "Liberty for Orphans: Eye Outreach 2014",
//       date: "August 4, 2014",
//       category: "Healthcare",
//       image: "/images/ahfnig1.jpg",
//       objectives: [
//         "Community Health",
//         "Vision Correction",
//         "Pediatric Support",
//       ],
//       lead: "Hellyncom Medical Team",
//       fullReport: [
//         "Continuing the partnership with Hellyncom Eye Clinic, the 2014 edition was hosted at the First Baptist Church in Effurun, Delta State.",
//         "The clinic provided free eye examinations and specialized treatments for orphans identified with various visual defects, prioritizing those who had no prior access to ophthalmic care.",
//         "The outreach successfully gathered children from multiple homes, further solidifying the foundation's reputation as a key provider of pediatric eye care in the region.",
//       ],
//     },
//     {
//       title: "Liberty for Orphans: Vision Maintenance",
//       date: "December 5, 2015",
//       category: "Healthcare",
//       image: "/images/ahfnig1.jpg",
//       objectives: [
//         "Visual Stability",
//         "Prescription Update",
//         "Consistent Care",
//       ],
//       lead: "Impact Directorate Office",
//       fullReport: [
//         "The 2015 initiative focused on the continued reassessment and treatment of children with visual challenges at the Enerhen-based Hellyncom Eye Clinic.",
//         "By maintaining a consistent schedule of yearly check-ups, AHF ensured that the visual health of the orphans did not deteriorate, providing new prescriptions and treatments where necessary.",
//         "This ongoing medical partnership highlights the importance of consistency in charitable healthcare interventions.",
//       ],
//     },
//     {
//       title: "Liberty for Orphans: Comprehensive Care",
//       date: "December 16, 2017",
//       category: "Healthcare",
//       image: "/images/ahfnig1.jpg",
//       objectives: ["Visual Health", "Psychosocial Fun", "Holiday Outreach"],
//       lead: "AHF Welfare Unit",
//       fullReport: [
//         "The 2017 outreach saw 33 children and their caregivers from Little Saint, Heart of Delta, and Eagles Hand Orphanages receive professional eye care in Enerher, Delta State.",
//         "Beyond medical screenings, the event was designed to be a festive experience, featuring fun activities and gift presentations to uplift the children's spirits during the holiday season.",
//         "Every child in attendance was tested and treated accordingly, ensuring that their vision was protected as they prepared for the upcoming school year.",
//       ],
//     },
//     {
//       title: "Liberty for Orphans: Benin City Eye Clinic",
//       date: "December 1, 2018",
//       category: "Healthcare",
//       image: "/images/ahfnig1.jpg",
//       objectives: [
//         "Critical Case Follow-up",
//         "Expanded Access",
//         "Healthcare Equity",
//       ],
//       lead: "Success Onose Eye Clinic",
//       fullReport: [
//         "The 2018 program expanded to Benin City, held at the AHF branch office in the EDPA Shopping Complex, Ugbowo. Partnering with Success Onose Eye Clinic, we served 45 children from four different homes.",
//         "Beneficiaries included Cornerstone, Edo, Manasseh Ministry, and Our Mummy Orphanage homes. While all children received testing, critical cases were flagged for dedicated long-term follow-up care.",
//         "The day was filled with gift presentations and activities, reinforcing the foundation's mission to provide both professional medical support and emotional encouragement to orphans.",
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center py-12">
//       {/* Navigation Section - 90% */}
//       <nav className="w-[90%] flex justify-between items-center mt-[60px] mb-[40px] border-b border-slate-100 pb-8">
//         <Link
//           href="/projects"
//           className="flex items-center gap-2 text-[1.3rem] font-black tracking-tighter text-slate-400 hover:text-[#1E40AF] transition-all "
//         >
//           <ArrowLeft size={16} />
//           Back To Projects
//         </Link>
//         <div className="flex gap-4">
//           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
//             <FileText size={14} /> Full Reports View
//           </div>
//         </div>
//       </nav>
//       {/* End Navigation */}

//       {/* Hero Title Section - 90% */}
//       <header className="w-[90%] flex flex-col items-start mb-24">
//         <span
//           className={`${colors.bgRed} text-white text-[10px] font-black px-4 py-1 rounded-sm uppercase tracking-widest mb-6`}
//         >
//           Detailed Project
//         </span>
//         <h1 className="text-6xl md:text-8xl font-black leading-[1.2] tracking-tighter mb-8">
//           Orphans{" "}
//           <span className={colors.primaryBlue}>And Vulnerable Children </span>
//           (OVC) <span className={colors.accentRed}>Projects.</span>
//         </h1>
//         <div className="w-24 h-2 ${colors.bgBlue} mb-8"></div>
//       </header>
//       {/* End Hero Title */}

//       {/* Reports Content - 90% */}
//       <main className="w-[90%] flex flex-col gap-56">
//         {stories.map((story, index) => (
//           <section key={index} className="w-full flex flex-col">
//             {/* Project Title and Header - Responsive Split */}
//             <div className="w-full flex justify-between items-end mb-12 border-b-2 border-[#cccccc] pb-6">
//               <div className="w-[70%]">
//                 <p
//                   className={`${colors.accentRed} font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2`}
//                 >
//                   <Award size={18} /> {story.category}
//                 </p>
//                 <h2 className="text-4xl md:text-5xl font-black tracking-tight">
//                   {story.title}
//                 </h2>
//               </div>
//               <div className="w-[25%] flex flex-col items-end">
//                 <span className="text-slate-400 text-sm font-bold">
//                   {story.date}
//                 </span>
//                 <span
//                   className={`${colors.primaryBlue} text-lg font-black uppercase italic`}
//                 >
//                   {story.impact}
//                 </span>
//               </div>
//             </div>

//             {/* Featured Image - 90% Full Width */}
//             <div className="w-full h-[500px] rounded-[40px] overflow-hidden mb-16 shadow-2xl relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//               <img
//                 src={story.image}
//                 alt={story.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-10 left-10 text-white">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle2 size={20} className="text-green-400" />
//                   <span className="text-xl font-medium tracking-tight">
//                     On-site execution verified
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Detailed Body Text - 1/3 and 2/3 Split */}
//             <div className="w-full flex justify-between flex-wrap items-start">
//               {/* Sidebar Info - 30% */}
//               <div className="w-[30%] flex flex-col gap-8 sticky top-[120px] max-[450px]:w-[100%] max-[450px]:top-[0px] max-[450px]:relative max-[450px]:mb-[30px]">
//                 <div className={`${colors.lightBlue} p-8 rounded-3xl`}>
//                   <h4
//                     className={`${colors.primaryBlue} font-black uppercase text-[1.3rem] tracking-widest mb-4`}
//                   >
//                     Summary Objectives
//                   </h4>
//                   <ul className="flex flex-col gap-4">
//                     {story.objectives.map((obj, i) => (
//                       <li
//                         key={i}
//                         className="flex items-start gap-2 text-[1.1rem] font-bold text-slate-600"
//                       >
//                         <div
//                           className={`w-2 h-2 rounded-full mt-1 ${colors.bgRed}`}
//                         ></div>
//                         {obj}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className={`${colors.lightRed} p-8 rounded-3xl`}>
//                   <p className="text-[10px] font-black uppercase mb-2">
//                     Project Lead
//                   </p>
//                   <p className="font-bold text-slate-800">{story.lead}</p>
//                 </div>
//               </div>

//               {/* Main Content Body - 65% */}
//               <div className="w-[65%] flex flex-col gap-10 max-[450px]:w-[100%]">
//                 {story.fullReport.map((paragraph, pIndex) => (
//                   <p
//                     key={pIndex}
//                     className="text-xl leading-[1.8] text-slate-600 text-[1.8rem] max-[700px]:text-[1.5rem]"
//                   >
//                     {paragraph}
//                   </p>
//                 ))}
//                 {/* Visual Separator */}
//                 <div className="w-full h-px bg-slate-200 mt-10"></div>
//               </div>
//             </div>
//           </section>
//         ))}
//       </main>
//       {/* End Reports Content */}
//       <Support />
//       {/* End Footer */}
//     </div>
//   );
// };

// export default FullProjectDetailsPage;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Support from "../../../../components/Support";
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FullProjectDetailsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Brand Colors
  const colors = {
    primaryBlue: "text-[#1E40AF]",
    bgBlue: "bg-[#4169e1]",
    accentRed: "text-[#DC2626]",
    bgRed: "bg-[#DC2626]",
    lightBlue: "bg-[#EFF6FF]",
    lightRed: "bg-[#FEF2F2]",
  };

  const stories = [
    {
      title: "Liberty for Orphans: Holistic Welfare",
      date: "April 18, 2009",
      category: "Social Welfare",
      images: [
        "/images/orphans/projects/abuja/pic4.JPG",
        "/images/orphans/projects/abuja/pic2.JPG",
        "/images/orphans/projects/abuja/pic3.JPG",
        "/images/orphans/projects/abuja/pic1.JPG",
        "/images/orphans/projects/abuja/pic5.JPG",
      ],
      objectives: [
        "Holistic Welfare",
        "Educational Support",
        "Infrastructure Aid",
      ],
      lead: "Welfare & Logistics Dept",
      fullReport: [
        "Launched on April 18, 2009, this project was designed to address the holistic welfare of orphans. The program began with a recreational outing to Millennium Park, Abuja, involving 20 orphans and members of the NGO from various states.",
        "Beyond social interaction, the foundation provided critical infrastructure support by assisting the City of Refuge orphanage in Durumi to reconnect their water meter and providing raincoats for the children.",
        "The initiative also focused on education, successfully sponsoring the school fees for two orphans, Daniel and Susana Bojireh, to ensure their academic journey continued without interruption.",
      ],
    },
    {
      title: "Liberty for Orphans: Roll Back Malaria",
      date: "July 16, 2011",
      category: "Healthcare",
      images: [
        "/images/orphans/projects/malaria/pic1.JPG",
        "/images/orphans/projects/malaria/pic2.JPG",
        "/images/orphans/projects/malaria/pic3.JPG",
      ],
      objectives: [
        "Malaria Prevention",
        "Medical Screening",
        "Essential Provisions",
      ],
      lead: "Medical Outreach Team",
      fullReport: [
        "Held in Effurun, Delta State, the 2011 program tagged 'Roll Back Malaria' focused on the health and preventative care of orphans in the region.",
        "Comprehensive malaria testing and treatments were administered to the children. To ensure long-term prevention, treated mosquito nets were distributed alongside essential supplies like clothes, shoes, and writing materials.",
        "The program benefited children from the Heart of Delta and Saint Anne's orphanages, blending medical intervention with the provision of basic life necessities.",
      ],
    },
    {
      title: "Liberty for Orphans: Eye Clinic 2012",
      date: "September 15, 2012",
      category: "Healthcare",
      images: [
        "/images/orphans/projects/three/pic1.JPG",
        "/images/orphans/projects/three/pic2.jpg",
        "/images/orphans/projects/three/pic3.jpg",
        "/images/orphans/projects/three/pic4.JPG",
        "/images/orphans/projects/three/pic5.JPG",
      ],
      objectives: [
        "Visual Screening",
        "Corrective Treatment",
        "Ophthalmic Advocacy",
      ],
      lead: "Hellyncom Eye Clinic",
      fullReport: [
        "In collaboration with Hellyncom Eye Clinic, AHF hosted the first 'Free Eye Test and Treatment' event at PICO Hall, PTI, in Effurun.",
        "The initiative focused on early detection of visual impairments, providing professional screenings and immediate medical treatments for the orphans in attendance.",
        "The day concluded with the distribution of gift items, ensuring that the children's medical needs were met in a celebratory and supportive atmosphere.",
      ],
    },
    {
      title: "Liberty for Orphans: Vision Follow-up",
      date: "October 15, 2013",
      category: "Healthcare",
      images: [
        "/images/orphans/projects/followup/pic1.JPG",
        "/images/orphans/projects/followup/pic2.JPG",
        "/images/orphans/projects/followup/pic3.JPG",
        "/images/orphans/projects/followup/pic4.jpg",
        "/images/orphans/projects/followup/pic5.JPG",
      ],
      objectives: [
        "Patient Reassessment",
        "Specialized Treatment",
        "Sustained Recovery",
      ],
      lead: "Medical Partnership Office",
      fullReport: [
        "The 2013 program served as a critical follow-up to the previous year's vision initiative. Held at Hellyncom Eye Clinic in Warri, the foundation conducted reassessments for children previously diagnosed with visual defects.",
        "A total of 13 orphans from Heart of Delta, Eagle Height, and Kings Kid Orphanage benefited from these specialized treatments and corrective care.",
        "This phase emphasized the foundation's commitment to sustainable health outcomes, ensuring that initial treatments led to long-term recovery for the children.",
      ],
    },
    {
      title: "Liberty for Orphans: Eye Outreach 2014",
      date: "August 4, 2014",
      category: "Healthcare",
      images: [
        "/images/orphans/projects/four/pic1.jpg",
        "/images/orphans/projects/four/pic2.jpg",
        "/images/orphans/projects/four/pic3.jpg",
        "/images/orphans/projects/four/pic4.JPG",
        "/images/orphans/projects/four/pic5.jpg",
      ],
      objectives: [
        "Community Health",
        "Vision Correction",
        "Pediatric Support",
      ],
      lead: "Hellyncom Medical Team",
      fullReport: [
        "Continuing the partnership with Hellyncom Eye Clinic, the 2014 edition was hosted at the First Baptist Church in Effurun, Delta State.",
        "The clinic provided free eye examinations and specialized treatments for orphans identified with various visual defects, prioritizing those who had no prior access to ophthalmic care.",
        "The outreach successfully gathered children from multiple homes, further solidifying the foundation's reputation as a key provider of pediatric eye care in the region.",
      ],
    },
    {
      title: "Liberty for Orphans: Vision Maintenance",
      date: "December 5, 2015",
      category: "Healthcare",
      images: [
        "/images/orphans/projects/orphans15/pic1.jpeg",
        "/images/orphans/projects/orphans15/pic2.jpeg",
        "/images/orphans/projects/orphans15/pic3.jpeg",
      ],
      objectives: [
        "Visual Stability",
        "Prescription Update",
        "Consistent Care",
      ],
      lead: "Impact Directorate Office",
      fullReport: [
        "The 2015 initiative focused on the continued reassessment and treatment of children with visual challenges at the Enerhen-based Hellyncom Eye Clinic and BDPA complex Benin City, Edo State.",
        "By maintaining a consistent schedule of yearly check-ups, AHF ensured that the visual health of the orphans did not deteriorate, providing new prescriptions and treatments where necessary.",
        "This ongoing medical partnership highlights the importance of consistency in charitable healthcare interventions.",
      ],
    },
    {
      title: "Liberty for Orphans: Comprehensive Care",
      date: "December 16, 2017",
      category: "Healthcare",
      images: [
        "/images/orphans/projects/orphans17/pic1.jpeg",
      ],
      objectives: ["Visual Health", "Psychosocial Fun", "Holiday Outreach"],
      lead: "AHF Welfare Unit",
      fullReport: [
        "The 2017 outreach saw 33 children and their caregivers from Little Saint, Heart of Delta, and Eagles Hand Orphanages receive professional eye care in Enerher, Delta State.",
        "Beyond medical screenings, the event was designed to be a festive experience, featuring fun activities and gift presentations to uplift the children's spirits during the holiday season.",
        "Every child in attendance was tested and treated accordingly, ensuring that their vision was protected as they prepared for the upcoming school year.",
      ],
    },
    {
      title: "Liberty for Orphans: Benin City Eye Clinic",
      date: "December 1, 2018",
      category: "Healthcare",
      images: [
        "https://res.cloudinary.com/diuci80dx/video/upload/v1772808731/Vid1_1_vdn65i.mp4",
        "https://res.cloudinary.com/diuci80dx/video/upload/v1772807600/Vid2_1_qusfcq.mp4",
        "https://res.cloudinary.com/diuci80dx/video/upload/v1772809303/Vid3_1_z35hyn.mp4",
        "https://res.cloudinary.com/diuci80dx/video/upload/v1772810523/Vid4_1_nsxabv.mp4",
        "https://res.cloudinary.com/diuci80dx/video/upload/v1772810525/Vid5_1_dqtbed.mp4",
      ],
      objectives: [
        "Critical Case Follow-up",
        "Expanded Access",
        "Healthcare Equity",
      ],
      lead: "Success Onose Eye Clinic",
      fullReport: [
        "The 2018 program expanded to Benin City, held at the AHF branch office in the EDPA Shopping Complex, Ugbowo. Partnering with Success Onose Eye Clinic, we served 45 children from four different homes.",
        "Beneficiaries included Cornerstone, Edo, Manasseh Ministry, and Our Mummy Orphanage homes. While all children received testing, critical cases were flagged for dedicated long-term follow-up care.",
        "The day was filled with gift presentations and activities, reinforcing the foundation's mission to provide both professional medical support and emotional encouragement to orphans.",
      ],
    },
  ];

  const totalPages = stories.length;
  const story = stories[currentPage - 1];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    const windowStart = Math.max(1, Math.min(currentPage - 1, totalPages - 3));
    const windowEnd = Math.min(windowStart + 2, totalPages - 1);
    for (let i = windowStart; i <= windowEnd; i++) {
      pages.push(i);
    }
    if (windowEnd < totalPages - 1) {
      pages.push("...");
    }
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12">
      {/* Navigation Section */}
      <nav className="w-[90%] flex justify-between items-center mt-[60px] mb-[40px] border-b border-slate-100 pb-8">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-[1.3rem] font-black tracking-tighter text-slate-400 hover:text-[#1E40AF] transition-all"
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

      {/* Hero Title Section */}
      <header className="w-[90%] flex flex-col items-start mb-24">
        <span className="bg-[#DC2626] text-white text-[10px] font-black px-4 py-1 rounded-sm uppercase tracking-widest mb-6">
          Detailed Project
        </span>
        <h1 className="text-6xl md:text-8xl font-black leading-[1.2] tracking-tighter mb-8">
          Orphans{" "}
          <span className="text-[#1E40AF]">And Vulnerable Children </span>
          (OVC) <span className="text-[#DC2626]">Projects.</span>
        </h1>
        <div className="w-24 h-2 bg-[#4169e1] mb-8"></div>
      </header>

      {/* Single Story Content */}
      <main className="w-[90%] flex flex-col gap-16">
        <section className="w-full flex flex-col">
          {/* Project Title and Header */}
          <div className="w-full flex justify-between items-end mb-12 border-b-2 border-[#cccccc] pb-6">
            <div className="w-[70%]">
              <p className="text-[#DC2626] font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
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
              <span className="text-[#1E40AF] text-lg font-black uppercase italic">
                {story.impact}
              </span>
            </div>
          </div>

          {/* Hero Image (1st of 5) */}
          <div className="w-full h-[500px] rounded-[40px] overflow-hidden mb-16 shadow-2xl relative z-10 bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
            {story.images[0].endsWith(".mp4") ? (
              <video
                src={story.images[0]}
                className="w-full h-full object-cover"
                controls
                muted
              />
            ) : (
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-10 left-10 text-white z-20">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-400" />
                <span className="text-xl font-medium tracking-tight">
                  On-site execution verified
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Body Text */}
          <div className="w-full flex justify-between flex-wrap items-start">
            {/* Sidebar Info - 30% */}
            <div className="w-[30%] flex flex-col gap-8 sticky top-[120px] max-[450px]:w-[100%] max-[450px]:top-[0px] max-[450px]:relative max-[450px]:mb-[30px]">
              <div className="bg-[#EFF6FF] p-8 rounded-3xl">
                <h4 className="text-[#1E40AF] font-black uppercase text-[1.3rem] tracking-widest mb-4">
                  Summary Objectives
                </h4>
                <ul className="flex flex-col gap-4">
                  {story.objectives.map((obj, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[1.1rem] font-bold text-slate-600"
                    >
                      <div className="w-2 h-2 rounded-full mt-1 bg-[#DC2626] flex-shrink-0"></div>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#FEF2F2] p-8 rounded-3xl">
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
              <div className="w-full h-px bg-slate-200 mt-10"></div>
            </div>
          </div>

          {/* 4 Additional Photos after the write-up */}
          <div className="w-full mt-20">
            <h3 className="text-2xl font-black tracking-tight text-slate-800 mb-8 uppercase">
              Project Gallery
            </h3>
            <div className="grid grid-cols-2 gap-6 max-[500px]:grid-cols-1">
              {story.images.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="w-full h-[320px] rounded-[24px] overflow-hidden shadow-lg relative group bg-black"
                >
                  {img.endsWith(".mp4") ? (
                    <video
                      src={img}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      controls
                      muted
                    />
                  ) : (
                    <img
                      src={img}
                      alt={`${story.title} - photo ${idx + 2}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {img.endsWith(".mp4") ? "Video Presentation" : `Photo ${idx + 2}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Pagination */}
      <div className="w-[90%] flex items-center justify-center gap-2 mt-24 mb-12">
        {/* Left Arrow */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-slate-200 text-slate-500 hover:border-[#1E40AF] hover:text-[#1E40AF] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {pageNumbers.map((page, i) =>
            page === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="w-11 h-11 flex items-center justify-center text-slate-400 font-bold text-sm select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-11 h-11 rounded-full font-black text-sm transition-all duration-200 ${
                  page === currentPage
                    ? "bg-[#4169E1] text-white shadow-lg scale-110"
                    : "border-2 border-slate-200 text-slate-500 hover:border-[#1E40AF] hover:text-[#1E40AF]"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-slate-200 text-slate-500 hover:border-[#1E40AF] hover:text-[#1E40AF] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <Support />
    </div>
  );
};

export default FullProjectDetailsPage;
