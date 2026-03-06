import React from "react";
import Link from "next/link";
import FeaturedCourses from "@/components/FeaturedCourses";

const page = () => {
  const primaryRed = "#E32227";
  const primaryBlue = "#4169e1";
  const mainImg = "/images/ahfnig1.jpg";

  // Array of Objects for Topics
  const topicData = [
    { id: 1, title: "Microsoft Suite", icon: "🎓" },
    { id: 2, title: "Handicraft", icon: "♻️" },
    { id: 3, title: "Coding", icon: "💻" },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-white overflow-x-hidden">
      {/* SECTION 1: HERO SECTION (White Skill Section) */}
      <section className="w-[90%] mx-auto py-[120px] flex max-[800px]:flex-col items-center justify-between gap-10">
        <div className="w-[50%] max-[800px]:w-full flex flex-col items-start gap-6">
          <h1 className="text-[5rem] max-[800px]:text-[4rem] max-[500px]:text-[3.5rem] font-black text-slate-900 leading-[1.1] ">
            Learn a New Skill <br />
            Everyday, Anytime, and Anywhere.
          </h1>
          <p className="text-gray-500 text-[1.8rem] leading-relaxed w-[90%] max-[700px]:text-[1.5rem]">
            50+ Courses covering all tech domains for you to learn and explore
            new opportunities. Learn from Industry Experts and land your Dream
            Job.
          </p>
          <div className="flex flex-row gap-5 mt-4">
            <Link
              href="/courses"
              className="text-[1.5rem] px-10 py-4 bg-[#3b82f6] text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:opacity-90 transition"
            >
              Start Premium Course
            </Link>
          </div>

          {/* Stats Breakdown */}
          <div className="w-full flex flex-row justify-between mt-12 max-[600px]:flex-col max-[600px]:gap-8">
            <div className="w-[30%] max-[600px]:w-full flex flex-col gap-1">
              <span className="text-4xl font-black text-amber-500">50+</span>
              <p className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest">
                Courses to choose from
              </p>
            </div>
            <div className="w-[30%] max-[600px]:w-full flex flex-col gap-1">
              <span className="text-4xl font-black text-blue-600">100+</span>
              <p className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest">
                Students Trained
              </p>
            </div>
            <div className="w-[30%] max-[600px]:w-full flex flex-col gap-1">
              <span className="text-4xl font-black text-orange-600">10+</span>
              <p className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest">
                Professional Trainers
              </p>
            </div>
          </div>
        </div>

        {/* Hero Visual Area */}
        <div className="w-[45%] max-[800px]:w-full flex justify-center relative">
          <div className="w-[500px] h-[500px] max-[600px]:w-full max-[600px]:h-auto relative">
            <img
              src="/images/learning2.jpg"
              alt="Hero Student"
              className="w-full h-full object-cover rounded-full z-10 border-[12px] border-white shadow-2xl"
            />

            {/* Floating Elements Placeholder */}
            <div className="absolute top-10 -left-10 w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center z-20 animate-bounce">
              <span className="text-[40px]">🚀</span>
            </div>
            <div className="absolute bottom-5 -right-5 w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center z-20 animate-bounce">
              <span className="text-[40px]">🏆</span>
            </div>
          </div>
        </div>
      </section>
      {/* END HERO SECTION */}

      {/* SECTION 2: EXPERT SKILLS / ABOUT SECTION */}
      <section className="w-[90%] py-24 flex max-[800px]:flex-col items-center justify-between bg-white gap-y-[60px]">
        <div className="w-[45%] max-[800px]:w-full flex justify-center relative">
          <div className="w-[100%] h-[500px] max-[800px]:h-[400px] relative">
            <img
              src="/images/learning.jpg"
              alt="Expert Learner"
              className="w-full h-full object-cover rounded-[40px] shadow-xl"
            />
            {/* Dotted decorative element */}
            <div
              className="absolute -bottom-8 -left-8 w-32 h-32 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#000 2px, transparent 0)",
                backgroundSize: "15px 15px",
              }}
            ></div>
          </div>
        </div>

        <div className="w-[50%] max-[800px]:w-full flex flex-col gap-6">
          <p
            style={{ color: primaryBlue }}
            className="font-bold uppercase text-[1.3rem] tracking-[3px]"
          >
            Top Courses From Experts
          </p>
          <h2 className="text-[3rem] max-[700px]:text-[2.5rem]">
            Learn New Skills to Go Ahead for Better Future
          </h2>
          <p className="text-[1.8rem] max-[700px]:text-[1.5rem]">
            Get a course today and learn at your own pace. We are here for you.
          </p>

          <div className="flex flex-col gap-5 mt-4">
            {/* Feature Item 1 */}
            <div className="w-full p-6 bg-white shadow-xl rounded-2xl border border-gray-50 flex flex-row items-center gap-6">
              <div className="w-[70px] h-[70px] bg-red-100 flex items-center justify-center rounded-2xl text-3xl">
                🛡️
              </div>
              <div className="w-[75%]">
                <h4 className="font-bold text-[1.8rem] text-slate-800 mb-[10px]">
                  Full Lifetime Access
                </h4>
                <p className="text-[1.3rem] text-gray-400">
                  Purchase a course once and it's yours forever.
                </p>
              </div>
            </div>
            {/* Feature Item 2 */}
            <div className="w-full p-6 bg-white shadow-xl rounded-2xl border border-gray-50 flex flex-row items-center gap-6">
              <div className="w-[70px] h-[70px] bg-orange-100 flex items-center justify-center rounded-2xl text-3xl">
                💬
              </div>
              <div className="w-[75%]">
                <h4 className="font-bold text-[1.8rem] text-slate-800 mb-[10px]">
                  Certification available
                </h4>
                <p className="text-[1.3rem] text-gray-400">
                  Pick desired course, learn and get certified for the next
                  level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END EXPERT SKILLS SECTION */}

      {/* SECTION 3: TOP COURSE TOPICS */}
      <section className="w-[90%] py-[40px] px-[15px] flex flex-col items-center bg-[#f8fafc] rounded-[60px]">
        <div className="flex flex-col items-center text-center mb-16">
          <p
            style={{ color: primaryRed }}
            className="font-black uppercase text-[1.3rem] tracking-[3px] mb-4"
          >
            Course Topics
          </p>
          <h2 className="text-[3.5rem] max-[700px]:text-[3rem]">
            Checkout Our Course Topics
          </h2>
          <div className="w-20 h-1.5 bg-red-500 mt-4 rounded-full"></div>
        </div>

        <div className="w-full flex flex-row max-[1130px]:flex-wrap justify-center gap-6 px-4">
          {topicData.map((topic) => (
            <div
              key={topic.id}
              className="w-[23%] max-[1130px]:w-[46%] max-[600px]:w-full bg-white p-12 rounded-[40px] flex flex-col items-center shadow-sm border border-transparent hover:border-red-500 hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="w-[100px] h-[100px] bg-gray-50 rounded-2xl flex items-center justify-center text-[4rem] mb-6 group-hover:bg-red-50 transition-colors">
                {topic.icon}
              </div>
              <h4 className="font-bold text-[2.5rem] max-[700px]:text-[2rem]">
                {topic.title}
              </h4>
            </div>
          ))}
        </div>
        <p className="text-[1.5rem] mt-[60px] font-medium text-center px-[20px]">
          Interested to view all our premium courses? &nbsp;
          <Link
            href="/courses"
            style={{ color: primaryBlue }}
            className="underline font-black cursor-pointer"
          >
            click here
          </Link>
        </p>
      </section>
      {/* END TOPICS SECTION */}

      {/* SECTION 4: FEATURED COURSES */}
      <FeaturedCourses />
      {/* END FEATURED COURSES SECTION */}
    </div>
  );
};

export default page;
