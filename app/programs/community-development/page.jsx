import React from "react";
import Image from "next/image";
import Programs from "../../../components/pages/Program";

const page = () => {
  const data = [
    {
      id: 1,
      title: "Water & Sanitation Projects",
      date: "2012 – Ongoing",
      location: "Underserved Communities",
      description:
        "Implementing sustainable water solutions such as boreholes and water system rehabilitation to improve access to clean and safe water.",
      image: "/images/ahfnig1.jpg"
    },
    {
      id: 2,
      title: "Public Enlightenment & Advocacy",
      date: "2012 – Ongoing",
      location: "Underserved Communities",
      description:
        "Conducting awareness campaigns, seminars, and advocacy programs on health, social issues, and community development.",
      image: "/images/ahfnig1.jpg"
    },
    {
      id: 3,
      title: "Community Welfare Initiatives",
      date: "2012 – Ongoing",
      location: "Underserved Communities",
      description:
        "Providing welfare support, outreach programs, and relief initiatives to improve the well-being of underserved communities.",
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
            Community Development Program
          </h2>
          <p className="text-gray-600 text-[1.5rem] leading-[1.3]">
            This program implements sustainable projects and public
            enlightenment initiatives within underserved communities.
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
