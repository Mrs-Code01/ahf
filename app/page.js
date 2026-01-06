"use client"

import React, {useState} from 'react';
import Link from "next/link"
import { Heart, Globe, Utensils, Activity, Calendar, Star, Quote } from 'lucide-react';
import DonationModal from "../components/DonateModal"

const CharityLandingPage = () => {
  const imgPath = "/images/ahfnig1.jpg";
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Exact layout with rounded overlapping circles */}
      <section className="flex flex-col items-center py-[150px] lg:py-[100px] bg-[#FDF9F1]">
        <div className="w-[90%] flex flex-col lg:flex-row items-center ">
          <div className="w-full lg:w-[50%] mb-12 lg:mb-0 max-[1020px]:pb-[60px]">
            <span className="text-[#E32227] font-bold uppercase text-[1.5rem]">RESTORING HOPE</span>
            <h1 className="text-[4rem] md:text-[5.5rem] font-extrabold mt-6 leading-[1.15]">
            ApiriHallowed Foundation (AHF) 
            </h1>
            <p className="text-[1.8rem] text-gray-800 my-[18px] max-[700px]:text-[1.5rem]">Restoring hope to orphans, inmates, patients and vulnerable communities through love and service.
            </p>
            <div className="flex ">
              <Link href="#" className="w-[160px] py-[10px] block text-[1.8rem] rounded-[10px] border-[1px] text-center mr-[20px] max-[700px]:text-[1.5rem]">Our Programs</Link>
              <Link href="#" className="text-[#ffffff] w-[160px] py-[10px] block text-[1.8rem] rounded-[10px] border-[1px] text-center bg-[#4169e1] border-[#4169e1] max-[700px]:text-[1.5rem]" onClick={() => setShowModal(true)}>Donate Now</Link>
            </div>
          </div>
          <div className="w-full lg:w-[50%] relative flex justify-center lg:justify-end">
            <div className="relative w-[400px] h-[330px] md:w-[450px] md:h-[450px]">
               {/* Main Circle Image */}
               <div className="w-full h-full rounded-full overflow-hidden border-[12px] border-white shadow-2xl">
                  <img src={imgPath} className="w-full h-full object-cover" alt="Hero" />
               </div>
               {/* Top Smaller Circle */}
               <div className="absolute -top-4 -left-4 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-[8px] border-white shadow-xl">
                  <img src={imgPath} className="w-full h-full object-cover" alt="Hero Sub" />
               </div>
               {/* Donor Floating Card */}
               <div className="absolute bottom-10 -left-10 bg-white py-3 px-5 rounded-2xl shadow-2xl flex flex-row items-center border border-gray-50">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-[40px] h-[40px] rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                         <img src={imgPath} className="object-cover h-full w-full" />
                       </div>
                     ))}
                  </div>
                  <div className="ml-4">
                     <p className="text-[1.4rem] font-black text-[#4169e1]">500+</p>
                     <p className="text-[1.2rem] text-gray-400 font-bold uppercase tracking-tighter">Orphans Supported</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      {/* END HERO SECTION */}

      {/* 2. TOP FEATURES BAR */}
      <section className="flex flex-col items-center mt-[100px]">
        <div className="w-[90%] flex flex-col md:flex-row justify-between gap-y-[30px]">
          <div className="w-full md:w-[32%] bg-[#4169e1] p-[20px] rounded-2xl text-white flex flex-row items-center shadow-lg">
            <div className="w-[70px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center mr-5"><Globe size={30}/></div>
            <div><h3 className="font-bold text-[2.5rem]">Mission Led</h3><p className="text-[1.6rem] text-[#ffffff]">Empowering children worldwide.</p></div>
          </div>
          <div className="w-full md:w-[32%] bg-[#E32227] p-7 rounded-2xl text-white flex flex-row items-center shadow-lg">
            <div className="w-[70px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center mr-5"><Heart size={30}/></div>
            <div><h3 className="font-bold text-[2.5rem]">Quick Donation</h3><p className="text-[1.6rem] text-[#ffffff]">Simple steps to save lives.</p></div>
          </div>
          <div className="w-full md:w-[32%] bg-[#0A4D3C] p-7 rounded-2xl text-white flex flex-row items-center shadow-lg">
            <div className="w-[70px] h-[70px] bg-white/20 rounded-xl flex items-center justify-center mr-5"><Utensils size={30}/></div>
            <div><h3 className="font-bold text-[2.5rem]">Food Donation</h3><p className="text-[1.6rem] text-[#ffffff]">Fighting hunger every day.</p></div>
          </div>
        </div>
      </section>
      {/* END FEATURES BAR */}

      {/* 3. ABOUT SECTION - Overlapping staggered images */}
      <section className="flex flex-col items-center py-20 lg:py-32">
        <div className="w-[90%] flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-[48%] flex flex-row relative mb-16 lg:mb-0">
            <div className="w-[55%] h-[400px] max-[1130px]:h-[320px] rounded-[40px] overflow-hidden shadow-2xl z-10 border-4 border-white">
               <img src={imgPath} className="w-full h-full object-cover" alt="About" />
            </div>
            <div className="w-[55%] h-[400px] max-[1130px]:h-[320px] rounded-[40px] overflow-hidden mt-20 -ml-16 shadow-2xl border-4 border-white">
               <img src={imgPath} className="w-full h-full object-cover" alt="About" />
            </div>
            {/* Background decorative shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#4169e1] rounded-full opacity-5 -z-10 blur-3xl"></div>
          </div>
          <div className="w-full lg:w-[48%] lg:pl-10">
            <span className="text-[#E32227] font-bold text-[1.4rem] uppercase tracking-widest">Welcome to AHF</span>
            <h2 className="text-[4rem] mt-5 mb-8 leading-[1.2] max-[700px]:text-[3rem]">You’re the Hope of Others.</h2>
            <p className="text-gray-500 text-[1.8rem] mb-10 max-[700px]:text-[1.5rem]">
              Join us in our journey to make a difference. We provide support for children and families facing hardship. Every donation contributes to education, water, and health.
            </p>
            <div className="flex flex-row justify-between mb-10">
              <div className="w-[48%] border-l-4 border-[#4169e1] pl-5">
                <h4 className="font-bold text-[#4169e1] text-[1.3rem]">Our Mission</h4>
                <p className="text-[1.6rem] text-[#000000] italic mt-2 max-[700px]:text-[1.4rem]">Sustainable growth for local communities.</p>
              </div>
              <div className="w-[48%] border-l-4 border-[#E32227] pl-5">
                <h4 className="font-bold text-[#E32227] text-[1.3rem]">Our Vision</h4>
                <p className="text-[1.6rem] text-[#000000] italic mt-2 max-[700px]:text-[1.4rem]">Empowering the youth for a better tomorrow.</p>
              </div>
            </div>
            <Link href="/about/who-we-are" className="inline-block bg-[#4169e1] text-white px-10 py-4 mt-[20px] rounded-full font-bold text-[1.5rem] uppercase tracking-widest hover:bg-[#E32227] transition-all max-[700px]:text-[1.4rem]">More About Us</Link>
          </div>
        </div>
      </section>
      {/* END ABOUT SECTION */}

      {/* 4. CAMPAIGN PROGRESS SECTION */}
      <section className="flex flex-col items-center py-24 bg-[#f8f9fa]">
        <div className="w-[90%]">
          {/* Featured Highlight Row */}
          <div className="flex flex-col lg:flex-row mb-16 gap-8">
            <div className="w-full lg:w-[45%] h-[350px] max-[1130px]:h-[300px] rounded-3xl overflow-hidden shadow-xl">
               <img src={imgPath} className="w-full h-full object-cover" />
            </div>
            <div className="w-full lg:w-[55%] bg-[#000000] p-10 md:p-14 rounded-3xl text-white flex flex-col justify-center">
               <h2 className="text-[#ffffff] text-[3.5rem] mb-6 max-[700px]:text-[3rem]">Protecting the Welfare and Future of Orphans</h2>
               <p className="text-[#ffffff] text-[1.5rem] mb-10">Providing education, healthcare and welfare support to orphans and vulnerable children since 2009.</p>
               
               <p className="text-[#ffffff] text-[1.5rem] mb-10 "><span className="text-[1.5rem] bg-[#ffffff] text-[#E32227] rounded-[10px] p-[5px] font-bold mr-[10px]">500+</span>children supported</p>
               <p className="text-[#ffffff] text-[1.5rem]"><span className="text-[1.5rem] bg-[#ffffff] text-[#E32227] rounded-[10px] p-[5px] font-bold mr-[10px]">TARGET</span>Reach more orphanage homes</p>
            </div>
          </div>
        </div>
      </section>
      {/* END CAMPAIGN SECTION */}
      {/* END CAMPAIGN SECTION */}
      <section className="w-[90%] my-[100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-y-[70px]">
        {/* Left Content Side */}
        <div className="w-full lg:w-[50%] flex flex-col">
          <h2 className="text-[3.5rem] md:text-[5rem] leading-[1.2] text-gray-900 max-[700px]:text-[3rem]">
            Start <span className="text-[#E32227]">Learning </span> 
            A Skill From Experts
          </h2>
          
          <p className="text-gray-600 text-[1.8rem] max-w-[500px] max-[700px]:text-[1.5rem] mt-[10px]">
            Pick from our online video courses with new additions published every month.
          </p>

          <div>
            <Link href="#" className="inline-block bg-[#4169e1] text-white px-10 py-4 mt-[20px] rounded-full font-bold text-[1.5rem] uppercase tracking-widest hover:bg-[#E32227] transition-all">
              Start Course
            </Link>
          </div>
        </div>
        {/* End Left Content Side */}

        {/* Right Image Side */}
        <div className="w-full lg:w-[45%] relative flex justify-center items-center">
          
          {/* Background Decorative Box */}
          <div className="absolute top-4 right-4 w-full h-[350px] md:h-[500px] border-[10px] border-[#4169e1] opacity-20 -z-10 rounded-lg max-[1130px]:h-[400px]"></div>

          <div className="relative w-full h-[350px] md:h-[500px] bg-[#89CFF0] rounded-lg overflow-visible flex items-end justify-center max-[1130px]:h-[400px]">
            {/* Main Instructor Image */}
            <img 
              src="/images/ahfnig1.jpg" 
              alt="Instructor" 
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Floating Card: Stats (Top Left) */}
            <div className="absolute top-20 -left-10 bg-white p-4 shadow-xl rounded-lg flex items-center gap-3 hidden md:flex">
              <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                <img src="/images/ahfnig1.jpg" className="w-6 h-6 rounded-full" alt="icon" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">8,90,000+</p>
                <p className="text-xs text-gray-500">Free Courses</p>
              </div>
            </div>

            {/* Floating Card: Graph (Bottom Right) */}
            <div className="absolute bottom-10 -right-10 bg-white p-5 shadow-xl rounded-lg md:block w-[180px]">
              <p className="text-sm font-bold text-gray-800 mb-2">Students Enroll</p>
              {/* Simple Flex-based Bar Chart Representation */}
              <div className="flex items-end gap-2 h-16 mb-2">
                <div className="w-3 h-8 bg-[#E32227] rounded-sm"></div>
                <div className="w-3 h-14 bg-[#E32227] rounded-sm"></div>
                <div className="w-3 h-6 bg-[#E32227] rounded-sm"></div>
                <div className="w-3 h-10 bg-[#E32227] rounded-sm"></div>
                <div className="w-3 h-12 bg-[#E32227] rounded-sm"></div>
              </div>
              <p className="text-[10px] text-gray-400">100% this last month</p>
            </div>

            {/* Graduation Cap Icon */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-[#4169e1] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🎓</span>
                </div>
            </div>
          </div>
        </div>
        {/* End Right Image Side */}
      </section>
      {/* 5. DONATION ICON GRID */}
      <section className="flex flex-col items-center py-28">
        <div className="w-[90%] text-center">
          <span className="text-[#E32227] font-bold text-[1.5rem] uppercase tracking-widest">How We Help</span>
          <h2 className="text-[3.5rem] font-black mt-4 mb-20 uppercase max-[700px]:text-[3rem]">Your Donation Means Another Smile.</h2>
          
          <div className="flex flex-wrap flex-row justify-between gap-y-16">
            {[
              {icon: <Globe size={32}/>, title: "Give Education", color: "#4169e1"},
              {icon: <Heart size={32}/>, title: "Pure Water", color: "#E32227"},
              {icon: <Utensils size={32}/>, title: "Healthy Food", color: "#0A4D3C"},
              {icon: <Activity size={32}/>, title: "Medical Care", color: "#E32227"}
            ].map((box, i) => (
              <div key={i} className="w-[48%] lg:w-[24%] flex flex-col items-center">
                <div style={{borderColor: box.color, color: box.color}} className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-6 shadow-sm hover:rotate-12 transition-transform">
                  {box.icon}
                </div>
                <h4 className="font-bold text-[1.8rem] mb-3">{box.title}</h4>
                <p className="text-[1.5rem] text-gray-400 w-[70%] mx-auto leading-relaxed">Providing high-quality care and resources for the vulnerable.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END DONATION ICON GRID */}

      {/* 6. GREEN CTA STRIP */}
      <section className="flex flex-col items-center mb-10">
        <div className="w-[90%] bg-[#0A4D3C] rounded-[40px] p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="uppercase text-[1.3rem] tracking-[0.3em] font-bold mb-6 text-white/70">How to help with us</p>
            <h2 className="text-[3rem] md:text-[4rem] font-bold mb-10 leading-[1.2] text-[#ffffff]">Your donation means a lot for them. <br/> Donate what you can.</h2>
            <button className="bg-[#E32227] text-white px-12 py-5 rounded-full font-black text-[1.5rem] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl cursor-pointer" onClick={() => setShowModal(true)}>Donate Now</button>
          </div>
          {/* Decorative faint patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-10 -mb-10"></div>
        </div>
      </section>
      {showModal && (
        <DonationModal onClose={() => setShowModal(false)} />
      )}
      {/* END CTA STRIP */}

      {/* 7. EVENTS SECTION */}
      <section className="flex flex-col items-center py-28">
        <div className="w-[90%]">
          <div className="text-center mb-16">
             <span className="text-[#E32227] font-bold text-[1.3rem] uppercase tracking-widest">Join Our Upcoming Events</span>
             <h2 className="text-[3.5rem] font-black mt-4 uppercase tracking-tighter">Upcoming Events</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {[
              {t: "World Day Against Child Labour", c: "#E32227", date: "12 JUN"},
              {t: "Raise for Clean Water Initiative", c: "#4169e1", date: "15 JUL"},
              {t: "Health for All Children Program", c: "#1E8449", date: "20 AUG"}
            ].map((event, i) => (
              <div key={i} className="w-full md:w-[31.5%] h-[450px] max-[1130px]:h-[380px] relative rounded-[40px] overflow-hidden group cursor-pointer shadow-lg">
                <img src={imgPath} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-8 flex flex-col justify-end">
                   <div style={{backgroundColor: event.c}} className="absolute top-6 right-6 px-4 py-2 rounded-2xl text-[1.3rem] font-black text-white">
                      {event.date}
                   </div>
                   <h3 className="text-white font-bold text-[2.5rem] mb-4">{event.t}</h3>
                   <div className="flex items-center text-white/80 text-[1.3rem] font-bold uppercase tracking-widest">
                      <Calendar size={14} className="mr-3 text-[#E32227]" /> <span>8:00 AM - 5:00 PM</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END EVENTS */}

      {/* 8. TESTIMONIALS & STATS (Dark Section) */}
      <section className="flex flex-col items-center py-28 bg-[#0D0F12] text-white">
        <div className="w-[90%]">
          {/* Stats Sub-row */}
          <div className="flex flex-wrap flex-row justify-between border-b border-white/10 pb-20 mb-20">
             {[ {n: '500+', t: 'Orphans Supported'}, {n: '200+', t: 'Inmates Trained and Empowered'}, {n: '1000+', t: 'Medical Beneficiaries'}, {n: '10+', t: 'Communities Reached'} ].map((stat, idx) => (
               <div key={idx} className="w-[47%] md:w-[20%] text-center mb-10 md:mb-0 ">
                 <h2 className="text-[3.5rem] md:text-[4rem] font-black text-[#4169e1] mb-2">{stat.n}</h2>
                 <p className="text-[1.5rem] text-gray-500 uppercase font-bold max-[700px]:text-[1.2rem]">{stat.t}</p>
               </div>
             ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-full md:w-[31.5%] bg-white/5 p-10 rounded-[40px] border border-white/10 hover:border-[#E32227]/50 transition-colors relative">
                <Quote className="absolute top-8 right-8 text-[#4169e1] opacity-20" size={60} />
                <div className="flex flex-row text-[#E32227] mb-6 gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-[1.5rem] italic text-gray-400 mb-10 leading-[1.8]">"Chariot foundation has been a beacon of hope for our family. Their transparent process and direct impact are unmatched."</p>
                <div className="flex flex-row items-center">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-[#4169e1] mr-4">
                    <img src={imgPath} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#ffffff] text-[1.5rem]">Brodard Eve</h5>
                    <p className="text-[1.3rem] text-[#4169e1] font-bold uppercase tracking-widest">Global Volunteer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END TESTIMONIALS */}
    </div>
  );
};

export default CharityLandingPage;