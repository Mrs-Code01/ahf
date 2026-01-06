import React from "react";
import Image from "next/image";
import Programs from "../../../components/pages/Program";

const page = () => {
  const data = [
    {
      id: 1,
      title: "Vocational Skill Training",
      date: "2015 – Ongoing",
      location: "Correctional Centres",
      description:
        "Providing inmates with practical vocational skills such as soap production, crafts, and other income-generating skills to enhance self-reliance after release.",
      image: "/images/ahfnig1.jpg"
    },
    {
      id: 2,
      title: "Entrepreneurship Development",
      date: "2015 – Ongoing",
      location: "Correctional Centres",
      description:
        "Training inmates on basic entrepreneurship, financial literacy, and small business management to prepare them for sustainable livelihoods.",
      image: "/images/ahfnig1.jpg"
    },
    {
      id: 3,
      title: "Post-Release Reintegration Support",
      date: "2015 – Ongoing",
      location: "Correctional Centres",
      description:
        "Supporting released inmates through counseling, mentorship, and startup assistance to enable successful reintegration into society.",
      image: "/images/ahfnig1.jpg"
    }
  ];

  return (
    <>
      <section
        className="h-[300px] w-full bg-cover bg-center bg-no-repeat flex justify-center items-center mb-[100px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/ahfnig1.jpg')"
        }}
      >
        <Image
          src="/images/brushes/events.png"
          width={200}
          height={200}
          alt="brush stroke"
          className="w-[350px]"
          unoptimized
        />
      </section>
      {/* End of header */}
      {/* End of header */}
      <section className="w-[90%] mx-auto mb-[100px]">
        {/* Intro Section */}
        <div className="w-[50%] mx-auto text-center mb-12 max-[800px]:w-[100%]">
          <h4 className="text-[#E32227] uppercase tracking-widest text-[1.3rem] font-bold mb-2">
            Our Focus Areas
          </h4>
          <h2 className="text-[#1a1a1a] text-[3rem] md:text-4xl font-bold mb-4">
            Prison Reform & Skill Acquisition Program
          </h2>
          <p className="text-gray-600 text-[1.5rem] leading-[1.3]">
            This program is designed to rehabilitate and reintegrate prison
            inmates through skills training, counseling and empowerment.
          </p>
        </div>
        {/* End of Intro */}
        {/* End of Intro */}
        <Programs programs={data} />
      </section>
    </>
  );
};

export default page;
