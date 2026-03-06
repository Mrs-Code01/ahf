// "use client";

// import React from "react";
// import Link from "next/link";
// import Support from "../../../../components/Support";
// import { ArrowLeft, CheckCircle2, Award, Heart, Sparkles } from "lucide-react";

// const page = () => {
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
//       title: "Shine Your Teeth: Dental & Financial Aid",
//       date: "February 26, 2011",
//       category: "Health & Empowerment",
//       image: "/images/ahfnig1.jpg",
//       objectives: [
//         "Oral Health Screening",
//         "Business Seed Funding",
//         "Nutritional Support",
//       ],
//       lead: "Widows Welfare Directorate",
//       fullReport: [
//         "Held at the First Baptist Church in Effurun, Delta State, this flagship program targeted 108 widows for a dual-impact intervention. The project was designed to address the unique health and economic vulnerabilities faced by widows in the community.",
//         "Medical practitioners provided comprehensive dental check-ups and oral hygiene education under the theme 'Shine Your Teeth.' To support household food security, every participant was provided with bags of rice and essential breakable plates for their homes.",
//         "The project's most significant impact was the direct financial empowerment of ten widows. Each was provided with ₦15,000 in cash—a critical capital injection designed to boost their small-scale businesses and foster financial independence.",
//       ],
//     },
//     {
//       title: "Widows Training / Empowerment",
//       date: "Year 2015",
//       category: "Health & Empowerment",
//       image: "/images/ahfnig4.jpg",
//       objectives: [
//         "Oral Health Screening",
//         "Business Seed Funding",
//         "Nutritional Support",
//       ],
//       lead: "Widows Welfare Directorate",
//       fullReport: [
//         "In 2015, AHF carried out a skill acquisition project for Widows in Ekiadolor – Benin City, Edo State and a free medical care was administered to widows in attendance. Widows were trained on how to produce soda and liquid soap for the purpose of entrepreneurship. Over 10 widows were empowered with startup capital for their business.",
//       ],
//     },
//     {
//       title: "Rumuekini Vulnerable Women Relief",
//       date: "March 26, 2021",
//       category: "Social Welfare",
//       image: "/images/community-project/rumuekini/Picture5.png",
//       objectives: [
//         "Relief Material Distribution",
//         "Medical Consultation",
//         "Economic Sustenance",
//       ],
//       lead: "Regional Outreach Unit",
//       fullReport: [
//         "As part of a broader rural outreach in Obia-Akpor LGA, Rivers State, AHF specifically prioritized widows and vulnerable women for intensive support. The foundation recognized that widows often bear the heaviest burden in rural economies.",
//         "The intervention included the distribution of comprehensive relief packages containing foodstuff, high-quality clothing, shoes, bags, and bedspreads. These items were selected to provide both immediate comfort and long-term utility for the recipients.",
//         "Beyond material gifts, the widows underwent medical screenings and received necessary drugs. This holistic approach ensured that their physical health was addressed alongside their material needs, reinforcing AHF's commitment to the 'Restore Hope' mission.",
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center py-12">
//       {/* Navigation Section */}
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
//             <Heart size={14} /> Widows Support View
//           </div>
//         </div>
//       </nav>

//       {/* Hero Title Section */}
//       <header className="w-[90%] flex flex-col items-start mb-24">
//         <span
//           className={`${colors.bgRed} text-white text-[10px] font-black px-4 py-1 rounded-sm uppercase tracking-widest mb-6`}
//         >
//           Detailed Project
//         </span>
//         <h1 className="text-6xl md:text-8xl font-black leading-[1.2] tracking-tighter mb-8">
//           Widows <span className={colors.primaryBlue}>Empowerment </span>&{" "}
//           <span className={colors.accentRed}>Advocacy.</span>
//         </h1>
//         <div className="w-24 h-2 ${colors.bgBlue} mb-8"></div>
//       </header>

//       {/* Reports Content */}
//       <main className="w-[90%] flex flex-col gap-56">
//         {stories.map((story, index) => (
//           <section key={index} className="w-full flex flex-col">
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
//               </div>
//             </div>

//             {/* Featured Image */}
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
//                     Direct Impact Verified
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Detailed Body Text */}
//             <div className="w-full flex justify-between flex-wrap items-start">
//               <div className="w-[30%] flex flex-col gap-8 sticky top-[120px] max-[450px]:w-[100%] max-[450px]:top-[0px] max-[450px]:relative max-[450px]:mb-[30px]">
//                 <div className={`${colors.lightBlue} p-8 rounded-3xl`}>
//                   <h4
//                     className={`${colors.primaryBlue} font-black uppercase text-[1.3rem] tracking-widest mb-4`}
//                   >
//                     Welfare Goals
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
//                     Unit Lead
//                   </p>
//                   <p className="font-bold text-slate-800">{story.lead}</p>
//                 </div>
//               </div>

//               <div className="w-[65%] flex flex-col gap-10 max-[450px]:w-[100%]">
//                 {story.fullReport.map((paragraph, pIndex) => (
//                   <p
//                     key={pIndex}
//                     className="text-xl leading-[1.8] text-slate-600 text-[1.8rem] max-[700px]:text-[1.5rem]"
//                   >
//                     {paragraph}
//                   </p>
//                 ))}
//                 <div className="w-full h-px bg-slate-200 mt-10"></div>
//               </div>
//             </div>
//           </section>
//         ))}
//       </main>
//       <Support />
//     </div>
//   );
// };

// export default page;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Support from "../../../../components/Support";
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const page = () => {
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
      title: "Shine Your Teeth: Dental & Financial Aid",
      date: "February 26, 2011",
      category: "Health & Empowerment",
      images: [
        "/images/widows/projects/teeth/pic1.jpg",
        "/images/widows/projects/teeth/pic2.jpg",
        "/images/widows/projects/teeth/pic3.JPG",
        "/images/widows/projects/teeth/pic4.JPG",
        "/images/widows/projects/teeth/pic5.jpg",
      ],
      objectives: [
        "Oral Health Screening",
        "Business Seed Funding",
        "Nutritional Support",
      ],
      lead: "Widows Welfare Directorate",
      fullReport: [
        "Held at the First Baptist Church in Effurun, Delta State, this flagship program targeted 108 widows for a dual-impact intervention. The project was designed to address the unique health and economic vulnerabilities faced by widows in the community.",
        "Medical practitioners provided comprehensive dental check-ups and oral hygiene education under the theme 'Shine Your Teeth.' To support household food security, every participant was provided with bags of rice and essential breakable plates for their homes.",
        "The project's most significant impact was the direct financial empowerment of ten widows. Each was provided with ₦15,000 in cash—a critical capital injection designed to boost their small-scale businesses and foster financial independence.",
      ],
    },
    {
      title: "Widows Training / Empowerment-Ekiadolor",
      date: "Year 2015",
      category: "Health & Empowerment",
      images: [
        "/images/widows/projects/ekiadolor/pic1.jpg",
        "/images/widows/projects/ekiadolor/pic2.jpg",
        "/images/widows/projects/ekiadolor/pic3.jpg",
        "/images/widows/projects/ekiadolor/pic4.jpg",
        "/images/widows/projects/ekiadolor/pic5.jpg",
      ],
      objectives: [
        "Oral Health Screening",
        "Business Seed Funding",
        "Nutritional Support",
      ],
      lead: "Widows Welfare Directorate",
      fullReport: [
        "In 2015, AHF carried out a skill acquisition project for Widows in Ekiadolor – Benin City, Edo State and a free medical care was administered to widows in attendance. Widows were trained on how to produce soda and liquid soap for the purpose of entrepreneurship. Over 10 widows were empowered with startup capital for their business.",
      ],
    },
    {
      title: "Rumuekini Vulnerable Women Relief",
      date: "March 26, 2021",
      category: "Social Welfare",
      images: [
        "/images/widows/projects/rumuekini/pic1.png",
        "/images/widows/projects/rumuekini/pic2.png",
        "/images/widows/projects/rumuekini/pic3.png",
        "/images/widows/projects/rumuekini/pic4.png",
        "/images/widows/projects/rumuekini/pic5.png",
      ],
      objectives: [
        "Relief Material Distribution",
        "Medical Consultation",
        "Economic Sustenance",
      ],
      lead: "Regional Outreach Unit",
      fullReport: [
        "As part of a broader rural outreach in Obia-Akpor LGA, Rivers State, AHF specifically prioritized widows and vulnerable women for intensive support. The foundation recognized that widows often bear the heaviest burden in rural economies.",
        "The intervention included the distribution of comprehensive relief packages containing foodstuff, high-quality clothing, shoes, bags, and bedspreads. These items were selected to provide both immediate comfort and long-term utility for the recipients.",
        "Beyond material gifts, the widows underwent medical screenings and received necessary drugs. This holistic approach ensured that their physical health was addressed alongside their material needs, reinforcing AHF's commitment to the 'Restore Hope' mission.",
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
            <Heart size={14} /> Widows Support View
          </div>
        </div>
      </nav>

      {/* Hero Title Section */}
      <header className="w-[90%] flex flex-col items-start mb-24">
        <span className="bg-[#DC2626] text-white text-[10px] font-black px-4 py-1 rounded-sm uppercase tracking-widest mb-6">
          Detailed Project
        </span>
        <h1 className="text-6xl md:text-8xl font-black leading-[1.2] tracking-tighter mb-8">
          Widows <span className="text-[#1E40AF]">Empowerment </span>
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
            </div>
          </div>

          {/* Hero Image (1st of 5) */}
          <div className="w-full h-[500px] rounded-[40px] overflow-hidden mb-16 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src={story.images[0]}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-10 text-white z-20">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-400" />
                <span className="text-xl font-medium tracking-tight">
                  Direct Impact Verified
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
                  Welfare Goals
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
                  Unit Lead
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
                  className="w-full h-[320px] rounded-[24px] overflow-hidden shadow-lg relative group"
                >
                  <img
                    src={img}
                    alt={`${story.title} - photo ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Photo {idx + 2} of 5
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

export default page;
