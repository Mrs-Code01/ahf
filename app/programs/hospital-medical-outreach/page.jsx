import React from "react";
import Image from "next/image";
import Programs from "../../../components/pages/Program";

const page = () => {
  const data = [
    {
      id: 1,
      title: "Hospital Visitations",
      date: "2007 – Ongoing",
      location: "Hospitals & Communities",
      description:
        "Regular visitations to hospitals to provide companionship, encouragement, prayers, and welfare support to patients and their families.",
      image: "/images/ahfnig1.jpg"
    },
    {
      id: 2,
      title: "Medical Outreach & Free Treatment",
      date: "2007 – Ongoing",
      location: "Hospitals & Communities",
      description:
        "Organizing free medical outreaches including eye care, dental care, and basic health screenings for patients and vulnerable community members.",
      image: "/images/ahfnig1.jpg"
    },
    {
      id: 3,
      title: "Emotional & Spiritual Support",
      date: "2007 – Ongoing",
      location: "Hospitals & Communities",
      description:
        "Providing emotional counseling, spiritual guidance, and moral support to patients facing health challenges and long-term illnesses.",
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
            Hospital & Medical Outreach Program
          </h2>
          <p className="text-gray-600 text-[1.5rem] leading-[1.3]">
            This program provides care, relief and emotional support to patients
            in hospitals.
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
