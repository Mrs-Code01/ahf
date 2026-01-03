import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <section className="w-full flex justify-center py-[100px] bg-[#FFF9F9]">
      {/* Main Parent Container: 90% width */}
      <div className="w-[90%] flex flex-col items-center justify-center">
        {/* Header Section */}
        <div className="w-full flex flex-col items-center mb-10">
          <span className="text-[#E32227] font-semibold tracking-widest text-[1.3rem] uppercase mb-2">
            Instructors & Students
          </span>
          <h2 className="text-[3rem] md:text-[3.5rem] font-bold text-gray-900 text-center">
            Looking To Learn A Skill?
          </h2>
        </div>
        {/* End Header Section */}

        {/* Card Container */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Single Card: Note - You can duplicate this div for a second card */}
          <div className="w-full md:w-[70%] bg-white px-[30px] py-[60px] rounded-xl shadow-sm flex flex-col items-center text-center border border-gray-100">
            {/* Icon Wrapper */}
            <div className="w-[70px] h-[70px] mb-15 flex items-center justify-center">
              <img
                src="/images/ahfnig1.jpg"
                alt="Icon"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* End Icon Wrapper */}

            <h3 className="text-[2rem] md:text-[2.5rem] font-bold text-gray-800 mb-4">
              Start Here
            </h3>

            <p className="text-gray-500 leading-[1.3] mb-8 w-[80%] text-[1.5rem]">
              We offer courses for everyone regardless of age, background or
              level of experience. Whether you are a complete beginner taking
              your first step, an intermediate learner looking to improve or an
              advance professional seeking mastery, our courses are structured
              to meet you exactly where you are.
            </p>

            {/* Button Group: No flex-1 or flex-basis used */}
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-[30px]">
              <Link
                href="/courses/demo-course"
                className="w-[160px] border border-[#000000] inline-block text-[#000000] px-10 py-4 rounded-full font-bold text-[1.5rem] uppercase"
              >
                Demo
              </Link>

              <Link
                href="/courses"
                className="w-[160px] inline-block bg-[#4169e1] text-white px-10 py-5 rounded-full font-bold text-[1.5rem] uppercase tracking-widest hover:bg-[#E32227] transition-all"
              >
                Start
              </Link>
            </div>
            {/* End Button Group */}
          </div>
          {/* End Single Card */}
        </div>
        {/* End Card Container */}
      </div>
      {/* End Main Parent Container */}
    </section>
  );
};

export default page;
