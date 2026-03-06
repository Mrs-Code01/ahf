"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake, School, Heart, Users, Zap } from "lucide-react";

const LoveCorpClubPage = () => {
  const lccImages = [
    "/images/lcc/pic3.jpg", // Main featured image
    "/images/lcc/pic1.jpg", 
    "/images/lcc/pic2.jpg", 
    "/images/lcc/pic4.jpg",
    "/images/lcc/pic5.jpeg",
    "/images/lcc/pic6.jpeg",
    "/images/lcc/pic7.jpeg",
    "/images/lcc/pic8.jpeg",
    "/images/lcc/pic9.jpeg",
    "/images/lcc/pic10.jpeg",
    "/images/lcc/pic11.jpeg",
    "/images/lcc/pic12.jpeg",
    "/images/lcc/pic13.jpeg",
  ];

  const visitImages = [
    "/images/lcc/visit/pic1.jpeg",
    "/images/lcc/visit/pic2.jpeg",
    "/images/lcc/visit/pic3.jpeg",
    "/images/lcc/visit/pic4.jpeg",
    "/images/lcc/pic5.jpeg", // Using pic5 as the 5th image if pic5.jpeg exists in visit or another appropriate one
  ];

  // Correction: I should check if pic5.jpeg exists in the visit folder based on my previous list_dir
  // list_dir of /images/lcc/visit showed: pic1.jpeg, pic2.jpeg, pic3.jpeg, pic4.jpeg, pic5.jpeg
  const visitImagesCorrected = [
    "/images/lcc/visit/pic1.jpeg",
    "/images/lcc/visit/pic2.jpeg",
    "/images/lcc/visit/pic3.jpeg",
    "/images/lcc/visit/pic4.jpeg",
    "/images/lcc/visit/pic5.jpeg",
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Header Section */}
      <section className="bg-gray-50 py-40 lg:py-32 border-b border-gray-100">
        <div className="section-container text-center">
          <span className="text-[#E32227] font-bold text-[1.4rem] uppercase tracking-[0.3em] mb-4 block">
            Our School Initiative
          </span>
          <h1 className="text-[4rem] md:text-[5.5rem] font-black text-[#0A1128] leading-tight">
            Love Corp <span className="text-[#4169e1]">Club (LCC)</span>
          </h1>
          <p className="text-gray-500 text-[1.8rem] max-w-[800px] mx-auto mt-6 leading-relaxed">
            Empowering students to support orphans and vulnerable children through monthly meetings 
            and proactive outreach.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-start gap-16">

            {/* Text Content */}
            <div className="w-full lg:w-[45%] lg:sticky lg:top-52 self-start">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-50 text-[#E32227] rounded-xl shadow-sm">
                  <School size={32} />
                </div>
                <h2 className="text-[3rem] md:text-[3.5rem] font-bold text-[#0A1128]">
                  About the Club
                </h2>
              </div>
              <div className="space-y-6 text-[1.8rem] text-gray-600 leading-relaxed">
                <p>
                  This is a club established by <span className="font-bold text-[#4169e1]">APiriHallowed Foundation</span> in 
                  secondary schools where the students hold their meetings monthly and mobilize resources 
                  to reach out to the vulnerables.
                </p>
                <p>
                  Particularly focusing on orphans and vulnerable children within the term, they pay 
                  visits to orphanage homes termly with gift items to show them love and support, 
                  fostering a spirit of compassion and service among students.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 transition-colors hover:bg-blue-50">
                    <Heart className="text-[#4169e1] shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-[#0A1128] text-[1.6rem]">School Visits</h4>
                      <p className="text-[1.4rem]">Termly visits to orphanage homes with gift items.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 transition-colors hover:bg-red-50">
                    <Users className="text-[#E32227] shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-[#0A1128] text-[1.6rem]">Mobilization</h4>
                      <p className="text-[1.4rem]">Monthly meetings to coordinate outreach.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-yellow-50/50 rounded-2xl border border-yellow-100 transition-colors hover:bg-yellow-50 sm:col-span-2">
                    <Zap className="text-yellow-600 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-[#0A1128] text-[1.6rem]">Dynamic Impact</h4>
                      <p className="text-[1.4rem]">Encouraging students to take leadership in social responsibility and resource mobilization.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Staggered Image Grid */}
            <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* Image 1 - Large Featured */}
              <div className="sm:col-span-2 h-[350px] sm:h-[450px] rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:shadow-blue-200">
                <Image
                  src={lccImages[0]}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                  alt="LCC Main Activity"
                  unoptimized
                />
              </div>
              
              {/* Image 2 & 3 - Staggered Pair */}
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10">
                <Image
                  src={lccImages[1]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Students Gathering"
                  unoptimized
                />
              </div>

              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10 sm:-mt-12 relative z-0 border-4 border-white shadow-2xl">
                <Image
                  src={lccImages[2]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Outreach Program"
                  unoptimized
                />
              </div>

              {/* Image 4 - Medium Width */}
              <div className="sm:col-span-2 h-[300px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src={lccImages[3]}
                  width={800}
                  height={300}
                  className="w-full h-full object-cover"
                  alt="Group Resource Mobilization"
                  unoptimized
                />
              </div>

              {/* Row 3 - New Images 5 & 6 */}
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10">
                <Image
                  src={lccImages[4]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Club Activities"
                  unoptimized
                />
              </div>
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10 sm:mt-8">
                <Image
                  src={lccImages[5]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Student Leadership"
                  unoptimized
                />
              </div>

              {/* Row 4 - Large Image 7 */}
              <div className="sm:col-span-2 h-[350px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src={lccImages[6]}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="LCC Outreach"
                  unoptimized
                />
              </div>

              {/* Row 5 - Staggered 8 & 9 */}
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10 sm:-mt-8">
                <Image
                  src={lccImages[7]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Community Support"
                  unoptimized
                />
              </div>
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10">
                <Image
                  src={lccImages[8]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Resources for Children"
                  unoptimized
                />
              </div>

              {/* Row 6 - Image 10 (Full) */}
              <div className="sm:col-span-2 h-[300px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src={lccImages[9]}
                  width={800}
                  height={300}
                  className="w-full h-full object-cover"
                  alt="Collaborative Efforts"
                  unoptimized
                />
              </div>

              {/* Row 7 - Staggered 11 & 12 */}
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10">
                <Image
                  src={lccImages[10]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Student Engagement"
                  unoptimized
                />
              </div>
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10 sm:mt-12">
                <Image
                  src={lccImages[11]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Impact Focus"
                  unoptimized
                />
              </div>

              {/* Row 8 - Image 13 (Full) */}
              <div className="sm:col-span-2 h-[350px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src={lccImages[12]}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="LCC Future Plans"
                  unoptimized
                />
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-50 rounded-full -z-10 blur-2xl opacity-60"></div>
              <div className="absolute top-1/2 -left-6 w-24 h-24 bg-blue-50 rounded-full -z-10 blur-2xl opacity-60"></div>
            </div>

          </div>
        </div>
      </section>

      {/* New Visitation Section */}
      <section className="py-24 lg:py-32 bg-gray-50/50">
        <div className="section-container">
          <div className="text-center max-w-[900px] mx-auto mb-20">
            <h2 className="text-[3.5rem] md:text-[4.5rem] font-black text-[#0A1128] mb-8">
              Visitation to our <span className="text-[#E32227]">Mummy Home Orphanage</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#4169e1] mx-auto mb-8 rounded-full"></div>
            <p className="text-[2rem] text-gray-600 leading-relaxed font-medium">
              @Benin City, Edo State by Uselu Secondary School LCC members, representative of 
              <span className="text-[#4169e1] font-bold"> Apiri Hallowed Foundation</span> and the school's club facilitators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Visit Image 1 - Large */}
            <div className="lg:col-span-2 lg:row-span-2 h-[500px] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <Image
                src={visitImagesCorrected[0]}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                alt="Visitation Event 1"
                unoptimized
              />
            </div>
            {/* Visit Image 2 */}
            <div className="h-[235px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.05]">
              <Image
                src={visitImagesCorrected[1]}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                alt="Visitation Event 2"
                unoptimized
              />
            </div>
            {/* Visit Image 3 */}
            <div className="h-[235px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.05]">
              <Image
                src={visitImagesCorrected[2]}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                alt="Visitation Event 3"
                unoptimized
              />
            </div>
            {/* Visit Image 4 */}
            <div className="h-[235px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.05]">
              <Image
                src={visitImagesCorrected[3]}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                alt="Visitation Event 4"
                unoptimized
              />
            </div>
            {/* Visit Image 5 */}
            <div className="md:col-span-2 lg:col-span-1 h-[235px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.05]">
              <Image
                src={visitImagesCorrected[4]}
                width={400}
                height={300}
                className="w-full h-full object-cover"
                alt="Visitation Event 5"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 text-center relative overflow-hidden">
        <div className="section-container relative z-10">
          <h3 className="text-[3rem] font-bold text-[#0A1128] mb-8">
            Interested in supporting our students?
          </h3>
          <p className="text-[1.8rem] text-gray-500 max-w-[600px] mx-auto mb-12">
            Join hands with AHF to empower the next generation of compassionate leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/get-involved/contact-us"
              className="inline-block bg-[#E32227] text-white px-12 py-5 rounded-full font-black text-[1.5rem] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(227,34,39,0.3)]"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LoveCorpClubPage;
