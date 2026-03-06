"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Network } from "lucide-react";

const PartnersPage = () => {
  const partnersImages = [
    "/images/partners/pic1.jpeg",
    "/images/partners/pic2.jpeg",
    "/images/partners/pic3.jpeg",
    "/images/partners/pic4.jpeg",
    "/images/partners/pic5.jpeg",
    "/images/partners/pic6.jpeg",
    "/images/partners/pic7.jpeg",
    "/images/partners/pic8.jpeg",
    "/images/partners/pic9.jpeg",
    "/images/partners/pic10.jpeg",
    "/images/partners/pic11.jpeg",
  ];

    const affiliateImages = [
     "/images/affiliates/pic1.jpeg",
     "/images/affiliates/pic2.jpeg",
     "/images/affiliates/pic3.jpeg",
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Header Section */}
      <section className="bg-gray-50 py-40  lg:py-32 border-b border-gray-100">
        <div className="section-container text-center">
          <span className="text-[#E32227] font-bold text-[1.4rem] uppercase tracking-[0.3em] mb-4 block">
            Our Collaboration
          </span>
          <h1 className="text-[4rem] md:text-[5.5rem] font-black text-[#0A1128] leading-tight">
            Our Partners & <span className="text-[#4169e1]">Affiliates</span>
          </h1>
          <p className="text-gray-500 text-[1.8rem] max-w-[800px] mx-auto mt-6 leading-relaxed">
            Working together with local and international organizations to create lasting impact
            and combat social challenges in our communities.
          </p>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-start gap-16">

            {/* Text Content */}
            <div className="w-full lg:w-[45%] lg:sticky lg:top-52 self-start">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-50 text-[#E32227] rounded-xl">
                  <Handshake size={32} />
                </div>
                <h2 className="text-[3rem] md:text-[3.5rem] font-bold text-[#0A1128]">
                  Our Partnership
                </h2>
              </div>
              <div className="space-y-6 text-[1.8rem] text-gray-600 leading-relaxed">
                <p>
                  Apiri Hallowed Foundation in the year 2022, partnered with{" "}
                  <span className="font-bold text-[#4169e1]">SOS Children village</span> and{" "}
                  <span className="font-bold text-[#4169e1]">India Renaissance</span> as the CBO
                  who mobilized for the Organizations in Egor L.G.A in the project{" "}
                  <span className="italic font-semibold text-[#0A1128]">
                    Combating Human Trafficking in Nigeria
                  </span>.
                </p>
                <p>
                  AHF mobilized and worked with two communities (Useh and Ediaken) within the LGA
                  along with SOS Children Village in carrying out seminars and community engagement
                  and data collection on household and also assisted in forming the VSLA group in
                  Ediaken Community in Uselu, Benin City – Edo State.
                </p>
              </div>
            </div>

            {/* Premium Staggered Image Grid */}
            <div className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              {/* Image 1 - Large Feature */}
              <div className="sm:col-span-2 h-[350px] sm:h-[400px] rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:shadow-blue-100">
                <Image
                  src={partnersImages[0]}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                  alt="Partnership Event"
                  unoptimized
                />
              </div>

              {/* Row 2 - Staggered Pair 2 & 3 */}
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10">
                <Image
                  src={partnersImages[1]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Community Engagement"
                  unoptimized
                />
              </div>
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10 sm:-mt-12 relative z-0 border-4 border-white shadow-2xl">
                <Image
                  src={partnersImages[2]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Field Work"
                  unoptimized
                />
              </div>

              {/* Image 4 - Wide Header style */}
              <div className="sm:col-span-2 h-[300px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src={partnersImages[3]}
                  width={800}
                  height={300}
                  className="w-full h-full object-cover"
                  alt="Project Mobilization"
                  unoptimized
                />
              </div>

              {/* Row 4 - Staggered 5 & 6 */}
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10 sm:mt-8">
                <Image
                  src={partnersImages[4]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Collaborative Session"
                  unoptimized
                />
              </div>
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10">
                <Image
                  src={partnersImages[5]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Training Workshop"
                  unoptimized
                />
              </div>

              {/* Image 7 - Large */}
              <div className="sm:col-span-2 h-[350px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src={partnersImages[6]}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Partnership Recognition"
                  unoptimized
                />
              </div>

              {/* Row 6 - Staggered 8 & 9 */}
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10 sm:-mt-8">
                <Image
                  src={partnersImages[7]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Outreach Coordination"
                  unoptimized
                />
              </div>
              <div className="h-[280px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.05] hover:z-10">
                <Image
                  src={partnersImages[8]}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Data Collection"
                  unoptimized
                />
              </div>

              {/* Image 10 - Medium */}
              <div className="sm:col-span-2 h-[320px] rounded-[30px] overflow-hidden shadow-xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src={partnersImages[9]}
                  width={800}
                  height={320}
                  className="w-full h-full object-cover"
                  alt="Strategic Meeting"
                  unoptimized
                />
              </div>

              {/* Image 11 - Final Large/Wide */}
              <div className="sm:col-span-2 h-[380px] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src={partnersImages[10]}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Mission Accomplished"
                  unoptimized
                />
              </div>

              {/* Decorative Blur Elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-1/2 -left-10 w-32 h-32 bg-red-50/50 rounded-full blur-3xl -z-10"></div>
            </div>

          </div>
        </div>
      </section>


      {/* Affiliate Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="section-container flex flex-col gap-12">

          {/* Affiliate Card */}
          <div className="bg-white rounded-[40px] p-10 lg:p-20 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-12">
            <div className="p-10 bg-[#4169e1] text-white rounded-[30px] shadow-2xl shrink-0">
              <Network size={64} strokeWidth={1.5} />
            </div>
            <div className="space-y-6">
              <h2 className="text-[3rem] md:text-[3.5rem] font-bold text-[#0A1128]">
                Affiliate Network & Organizations
              </h2>
              <div className="space-y-4 text-[1.8rem] text-gray-600 leading-relaxed">
                <p>
                  Apiri Hallowed Foundation (AHF) is a registered member of the{" "}
                  <span className="font-bold text-[#4169e1]">
                    Conference of Non–Governmental Organizations – Edo State (CONGOS)
                  </span>{" "}
                  and is functioning as one of the members of the Executive Council of the Network.
                </p>
                <p className="text-[1.6rem] bg-blue-50 p-6 rounded-2xl border-l-4 border-[#4169e1] italic">
                  Our network allows us to collaborate on policy advocacy, capacity building, and
                  state-wide development projects.
                </p>
              </div>
            </div>
          </div>

          {/* Affiliate Image Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div className="h-[220px] rounded-[30px] overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500">
              <Image
                src={affiliateImages[0]}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                alt="Partnership Event"
                unoptimized
              />
            </div>
            <div className="h-[220px] rounded-[30px] overflow-hidden shadow-xl transition-transform hover:scale-[1.02] duration-500">
              <Image
                src={affiliateImages[1]}
                width={300}
                height={200}
                className="w-full h-full object-cover"
                alt="Community Engagement"
                unoptimized
              />
            </div>
            <div className="h-[220px] rounded-[30px] overflow-hidden shadow-xl transition-transform hover:scale-[1.02] duration-500">
              <Image
                src={affiliateImages[2]}
                width={300}
                height={200}
                className="w-full h-full object-cover"
                alt="Field Work"
                unoptimized
              />
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 text-center">
        <div className="section-container">
          <h3 className="text-[2.5rem] font-bold text-[#0A1128] mb-8">
            Interested in partnering with us?
          </h3>
          <Link
            href="/get-involved/contact-us"
            className="inline-block bg-[#E32227] text-white px-12 py-5 rounded-full font-black text-[1.5rem] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Become a Partner
          </Link>
        </div>
      </section>

    </div>
  );
};

export default PartnersPage;