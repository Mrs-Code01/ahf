"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, Heart, BookOpen, Users } from "lucide-react";

const PACTClubPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Header Section */}
      <section className="bg-gray-50 py-40 lg:py-32 border-b border-gray-100">
        <div className="section-container text-center">
          <span className="text-[#E32227] font-bold text-[1.4rem] uppercase tracking-[0.3em] mb-4 block">
            Special Ministry
          </span>
          <h1 className="text-[4rem] md:text-[5.5rem] font-black text-[#0A1128] leading-tight">
            P.A.C.T — <span className="text-[#4169e1]">Prayer & Counselling Team</span>
          </h1>
          <p className="text-[#E32227] font-bold text-[1.6rem] mt-2 tracking-wide">with Apiriala Atedoghu</p>
          <p className="text-gray-500 text-[1.8rem] max-w-[800px] mx-auto mt-6 leading-relaxed">
            A ministry of prayer, counsel, and outreach, empowering communities through the Word of God and compassionate service to the needy.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-start gap-16">

            {/* Text Content */}
            <div className="w-full lg:w-[55%] lg:sticky lg:top-52">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-50 text-[#E32227] rounded-xl shadow-sm">
                  <Heart size={32} />
                </div>
                <h2 className="text-[3rem] md:text-[3.5rem] font-bold text-[#0A1128]">
                  A Message from the Founder
                </h2>
              </div>

              <div className="space-y-6 text-[1.8rem] text-gray-600 leading-relaxed">
                <p>
                  <span className="font-bold text-[#4169e1]">PACT Club</span> is a ministry of prayer, counseling, 
                  and community outreach led by <span className="font-bold text-[#0A1128]">Apiriala Atedoghu</span>, 
                  dedicated to lifting the spiritually and materially needy through the power of God's Word and compassionate giving.
                </p>
                <p>
                  Rooted in the scripture <span className="italic text-[#0A1128] font-semibold">"For the poor shall never cease out of the land, therefore I command thee saying: thou shalt open thine hand wide unto thy brother, to thy poor and to thy needy in thy land"</span> (Deut 15:11), 
                  PACT Club mobilizes believers to give, serve, and pray for orphans, widows, prison inmates, the sick, and the less privileged.
                </p>
              </div>

              {/* What PACT Offers */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 hover:bg-blue-50 transition-colors">
                  <Phone className="text-[#4169e1] shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-[#0A1128] text-[1.6rem]">Prayer Line</h4>
                    <p className="text-[1.4rem]">Call <strong>+2348057180888</strong> weekdays 9am–6pm, Saturdays 7am–5pm.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-red-50/50 rounded-2xl border border-red-100 hover:bg-red-50 transition-colors">
                  <Clock className="text-[#E32227] shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-[#0A1128] text-[1.6rem]">24-Hour Prayer Group</h4>
                    <p className="text-[1.4rem]">Join 30-minute prayer slots daily from anywhere in the world.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-green-50/50 rounded-2xl border border-green-100 hover:bg-green-50 transition-colors">
                  <BookOpen className="text-green-600 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-[#0A1128] text-[1.6rem]">Counseling Sessions</h4>
                    <p className="text-[1.4rem]">Special counseling every Wednesday from 9am–5pm.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-yellow-50/50 rounded-2xl border border-yellow-100 hover:bg-yellow-50 transition-colors">
                  <Users className="text-yellow-600 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-[#0A1128] text-[1.6rem]">Prayer Conference</h4>
                    <p className="text-[1.4rem]">Coming soon: an interdenominational gathering for extraordinary prayer and manifestation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="w-full lg:w-[45%] flex flex-col gap-6 relative">
              {/* Main Image */}
              <div className="w-full h-[450px] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02]">
                <Image
                  src="/images/pact/pic1.jpg"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  alt="PACT Club Ministry"
                  unoptimized
                />
              </div>

              {/* Scripture Card */}
              <div className="bg-[#0A1128] text-white rounded-[30px] p-8 shadow-2xl">
                <p className="text-[1.5rem] italic leading-relaxed text-gray-300 mb-4">
                  "Blessed is he that considereth the poor; the Lord will deliver him in time of trouble."
                </p>
                <p className="text-[1.4rem] font-bold text-[#4169e1]">Psalm 41:1</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-50 rounded-full -z-10 blur-2xl opacity-60"></div>
              <div className="absolute top-1/3 -left-6 w-24 h-24 bg-blue-50 rounded-full -z-10 blur-2xl opacity-60"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Prayer Request CTA Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="section-container">
          <div className="bg-white rounded-[40px] p-10 lg:p-20 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-12">
            <div className="p-10 bg-[#E32227] text-white rounded-[30px] shadow-2xl shrink-0">
              <Phone size={56} strokeWidth={1.5} />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-[3rem] md:text-[3.5rem] font-bold text-[#0A1128]">
                Submit a Prayer Request
              </h2>
              <p className="text-[1.8rem] text-gray-600 leading-relaxed">
                Do you have a prayer need? Call us at{" "}
                <span className="font-bold text-[#4169e1]">+2348057180888</span>. 
                Our prayer line is open weekdays 9am–6pm and Saturdays 7am–5pm for empowerment, healing, provisions, and upliftment.
              </p>
              <p className="text-[1.6rem] bg-blue-50 p-6 rounded-2xl border-l-4 border-[#4169e1] italic text-gray-600">
                "Call unto me and I will answer thee, and show thee great and mighty things which thou knowest not." (Jer 33:3)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="section-container">
          <h3 className="text-[2.5rem] font-bold text-[#0A1128] mb-8">
            Join the 24-Hour Prayer Group
          </h3>
          <p className="text-[1.8rem] text-gray-500 max-w-[600px] mx-auto mb-12 leading-relaxed">
            Pray with us for just 30 minutes daily, from wherever you are in the world. Provide your name, phone, and email to get started.
          </p>
          <Link
            href="/get-involved/contact-us"
            className="inline-block bg-[#E32227] text-white px-12 py-5 rounded-full font-black text-[1.5rem] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(227,34,39,0.3)]"
          >
            Get Involved
          </Link>
        </div>
      </section>

    </div>
  );
};

export default PACTClubPage;
