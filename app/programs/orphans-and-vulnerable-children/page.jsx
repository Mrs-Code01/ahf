import React from "react";
import Image from "next/image";
import Programs from "../../../components/pages/Program";

const page = () => {
  const data = [
    {
      id: 1,
      title: "Education and Scholarship Support",
      date: "2009 – 2018",
      location: "Multiple Communities",
      description:
        "A comprehensive program providing shelter, education, healthcare, and emotional support to orphaned children.",
      image: "/images/ahfnig1.jpg"
    },
    {
      id: 2,
      title: "Healthcare and Medical Intervention",
      date: "Ongoing",
      location: "Rural Communities",
      description:
        "Providing free comprehensive eye examinations and treatments to vulnerable children and community members.",
      image: "/images/ahfnig1.jpg"
    },
    {
      id: 3,
      title: "Welfare and Psychosocial Support",
      date: "Ongoing",
      location: "Nationwide",
      description:
        "Educational scholarships for orphans and children of widows, covering tuition, books, uniforms, and school supplies.",
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
          className="w-[30%]"
          unoptimized
        />
      </section>
      {/* End of header */}
      {/* End of header */}
      <section className="w-[90%] mx-auto mb-[100px]">
        {/* Intro Section */}
        <div className="w-[50%] mx-auto text-center mb-12">
          <h4 className="text-[#E32227] uppercase tracking-widest text-[1.3rem] font-bold mb-2">
            Our Focus Areas
          </h4>
          <h2 className="text-[#1a1a1a] text-[3rem] md:text-4xl font-bold mb-4">
            Orphans & Vulnerable Children (OVC) Program
          </h2>
          <p className="text-gray-600 text-[1.5rem] leading-[1.3]">
            This program focuses on the holistic development, protection and
            empowerment of orphans and vulnerable children.
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
