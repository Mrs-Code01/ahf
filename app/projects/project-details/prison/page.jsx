// "use client";

// import React, { useState } from "react";
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
//       title: "Fruitful Mind; Productive Life (Sapele)",
//       date: "April 24, 2015",
//       category: "Vocational Skills",
//       image: "/images/ahfnig1.jpg",
//       fullReport: [
//         "The Sapele project in Delta state was initiated to address the high rate of recidivism by providing inmates with tangible economic tools. Over a period of three intensive weeks, our team transformed a section of the Sapele Prison into a makeshift chemical laboratory.",
//         "Inmates were divided into specialized units. Group A focused on the base chemistry of liquid detergents, while Group B specialized in insecticide and air-freshener. The training didn't stop at production; we brought in business consultants to teach them about market pricing, cost-benefit analysis, and small-scale manufacturing management.",
//         "The result was the successful production of 500 liters of high-grade liquid soap, which was donated back to the prison, immediately improving the hygiene standards of the facility.",
//         "Subsequently, the training is still on-going and participants are empowered with start-up capital at their release from income generated from the sales of the product.",
//       ],
//     },
//     {
//       title: "The Benin Expansion: Scaling Skills",
//       date: "May 25, 2015",
//       category: "Industrial Production",
//       image: "/images/ahfnig1.jpg",
//       fullReport: [
//         "Building on the momentum from Oko correctional centre, the Benin City project at the Oko correctional centre was designed for scale. This phase focused on industrial-grade disinfectants and laundry agents, catering to the larger population of the facility.",
//         "We introduced automated mixing equipment and professional-grade safety gear. The curriculum was expanded to include 'Train the Trainer' modules, where 10 standout inmates were coached to become instructors for future batches, ensuring the sustainability of the program long after our team departed.",
//         "By the end of the second month, the facility had established a 'Production Cell' capable of meeting all the cleaning needs of the prison, saving the administration significantly on maintenance costs while instilling a profound sense of purpose and dignity in the participating inmates.",
//       ],
//     },
//     {
//       title:
//         "Stakeholders Workshop on the Nigerian Justice System, Inmates Re-Information, Re-Integration and Reconciliation",
//       date: "September 20, 2019",
//       category: "Legal & Reform",
//       image: "/images/ahfnig1.jpg",
//       fullReport: [
//         "Policy change is the bedrock of lasting reform. This workshop, held at the University of Benin Faculty of Law, served as a bridge between the street-level reality of prisons and the high-level decision-makers of the Nigerian judicial system.",
//         "Key stakeholders present include the commissioner of police, the Dean, staff and students of the Faculty of Law, the NBA Chairman and the FIDA President, Board of Directors, staff and Members of the NGO, media personnels (Bronze FM), the welfare officer (white-house correctioner center), following their individual paper presentations, a rigorous deliberation was carried out amongst all stake holders present and input were made on the way forward on an improved justice system for implementation.",
//         "We presented raw data and testimonials from our vocational programs to prove that reform is more cost-effective than pure incarceration.",
//         "The white paper generated from this workshop was recommended to the state justice committee, leading to the fast-tracking of cases and a commitment to include vocational training funding in the upcoming fiscal budget for correctional services.",
//         "The seminar was covered by Bronze FM and broadcasted on the news.",
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
//           Prison <span className={colors.primaryBlue}>Inmates </span>
//           Full <span className={colors.accentRed}>Projects.</span>
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
//                 <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.3]">
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
//                     {[
//                       "Vocational Training",
//                       "Recidivism Reduction",
//                       "Economic Empowerment",
//                     ].map((obj, i) => (
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
//                   <p className="font-bold text-slate-800">
//                     Impact Directorate Office
//                   </p>
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
import { ArrowLeft, CheckCircle2, Award, FileText, ChevronLeft, ChevronRight } from "lucide-react";

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
      title: "Fruitful Mind; Productive Life (Sapele)",
      date: "April 24, 2015",
      category: "Vocational Skills",
      // 5 images: 1 before writeup + 4 after writeup
      images: [
        "/images/prison/projects/sapele/pic1.jpeg",
        "/images/prison/projects/sapele/pic2.jpeg",
        "/images/prison/projects/sapele/pic3.jpeg",
        "/images/prison/projects/sapele/pic4.jpeg",
        "/images/prison/projects/sapele/pic5.jpeg",
        "/images/prison/projects/sapele/pic6.jpeg",
        "/images/prison/projects/sapele/pic7.jpeg",
        "/images/prison/projects/sapele/pic8.jpeg",
        "https://res.cloudinary.com/diuci80dx/video/upload/v1772809265/fruitfulmind_1_fo3hee.mp4",
        "/images/prison/projects/sapele/empowerment/pic1.jpeg",
        "/images/prison/projects/sapele/empowerment/pic2.jpeg",
        "/images/prison/projects/sapele/empowerment/pic3.jpeg",
      ],
      fullReport: [
        "The Sapele project in Delta state was initiated to address the high rate of recidivism by providing inmates with tangible economic tools. Over a period of three intensive weeks, our team transformed a section of the Sapele Prison into a makeshift chemical laboratory.",
        "Inmates were divided into specialized units. Group A focused on the base chemistry of liquid detergents, while Group B specialized in insecticide and air-freshener. The training didn't stop at production; we brought in business consultants to teach them about market pricing, cost-benefit analysis, and small-scale manufacturing management.",
        "The result was the successful production of 500 liters of high-grade liquid soap, which was donated back to the prison, immediately improving the hygiene standards of the facility.",
        "Subsequently, the training is still on-going and participants are empowered with start-up capital at their release from income generated from the sales of the product.",
      ],
    },
    {
      title: "The Benin Expansion: Scaling Skills",
      date: "May 25, 2015",
      category: "Industrial Production",
      impact: "2 Facilities",
      images: [
        "/images/prison/projects/benin/pic1.jpeg",
        "/images/prison/projects/benin/pic2.jpeg",
        "/images/prison/projects/benin/pic3.jpeg",
        "/images/prison/projects/benin/pic4.jpeg",
      ],
      fullReport: [
        "Building on the momentum from Oko correctional centre, the Benin City project at the Oko correctional centre was designed for scale. This phase focused on industrial-grade disinfectants and laundry agents, catering to the larger population of the facility.",
        "We introduced automated mixing equipment and professional-grade safety gear. The curriculum was expanded to include 'Train the Trainer' modules, where 10 standout inmates were coached to become instructors for future batches, ensuring the sustainability of the program long after our team departed.",
        "By the end of the second month, the facility had established a 'Production Cell' capable of meeting all the cleaning needs of the prison, saving the administration significantly on maintenance costs while instilling a profound sense of purpose and dignity in the participating inmates.",
      ],
    },
    {
      title: "Stakeholders Workshop on the Nigerian Justice System, Inmates Re-Information, Re-Integration and Reconciliation",
      date: "September 20, 2019",
      category: "Legal & Reform",
      impact: "Policy Change",
      images: [
        "/images/prison/projects/stakeholders/pic1.jpg",
        "/images/prison/projects/stakeholders/pic2.jpg",
        "/images/prison/projects/stakeholders/pic3.jpg",
      ],
      fullReport: [
        "Policy change is the bedrock of lasting reform. This workshop, held at the University of Benin Faculty of Law, served as a bridge between the street-level reality of prisons and the high-level decision-makers of the Nigerian judicial system.",
        "Key stakeholders present include the commissioner of police, the Dean, staff and students of the Faculty of Law, the NBA Chairman and the FIDA President, Board of Directors, staff and Members of the NGO, media personnels (Bronze FM), the welfare officer (white-house correctioner center), following their individual paper presentations, a rigorous deliberation was carried out amongst all stake holders present and input were made on the way forward on an improved justice system for implementation.",
        "We presented raw data and testimonials from our vocational programs to prove that reform is more cost-effective than pure incarceration.",
        "The white paper generated from this workshop was recommended to the state justice committee, leading to the fast-tracking of cases and a commitment to include vocational training funding in the upcoming fiscal budget for correctional services.",
        "The seminar was covered by Bronze FM and broadcasted on the news.",
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
          Prison <span className="text-[#1E40AF]">Inmates </span>
          Full <span className="text-[#DC2626]">Projects.</span>
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
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.3]">
                {story.title}
              </h2>
            </div>
            <div className="w-[25%] flex flex-col items-end">
              <span className="text-slate-400 text-sm font-bold">{story.date}</span>
              <span className="text-[#1E40AF] text-lg font-black uppercase italic">
                {story.impact}
              </span>
            </div>
          </div>

          {/* Hero Image (1st of 5) */}
          <div className="w-full h-[500px] rounded-[40px] overflow-hidden mb-16 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
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

          {/* Detailed Body Text - 1/3 and 2/3 Split */}
          <div className="w-full flex justify-between flex-wrap items-start">
            {/* Sidebar Info - 30% */}
            <div className="w-[30%] flex flex-col gap-8 sticky top-[120px] max-[450px]:w-[100%] max-[450px]:top-[0px] max-[450px]:relative max-[450px]:mb-[30px]">
              <div className="bg-[#EFF6FF] p-8 rounded-3xl">
                <h4 className="text-[#1E40AF] font-black uppercase text-[1.3rem] tracking-widest mb-4">
                  Summary Objectives
                </h4>
                <ul className="flex flex-col gap-4">
                  {["Vocational Training", "Recidivism Reduction", "Economic Empowerment"].map(
                    (obj, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[1.1rem] font-bold text-slate-600"
                      >
                        <div className="w-2 h-2 rounded-full mt-1 bg-[#DC2626] flex-shrink-0"></div>
                        {obj}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="bg-[#FEF2F2] p-8 rounded-3xl">
                <p className="text-[10px] font-black uppercase mb-2">Project Lead</p>
                <p className="font-bold text-slate-800">Impact Directorate Office</p>
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

          {/* Additional Photos/Videos after the write-up */}
          <div className="w-full mt-20">
            <h3 className="text-2xl font-black tracking-tight text-slate-800 mb-8 uppercase">
              Project Gallery
            </h3>
            <div className="grid grid-cols-2 gap-10 max-[500px]:grid-cols-1">
              {story.images.slice(1).map((media, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <div className="w-full h-[320px] rounded-[24px] overflow-hidden shadow-lg relative group bg-black">
                    {media.endsWith(".mp4") ? (
                      <video
                        src={media}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        controls
                        muted
                      />
                    ) : (
                      <img
                        src={media}
                        alt={`${story.title} - photo ${idx + 2}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {media.includes("/empowerment/") && (
                    <div className="text-center">
                      <span className="text-[1.6rem] font-medium italic text-slate-700 block">
                        Inmates empowerment from Sapele Correction
                      </span>
                    </div>
                  )}
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
            )
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