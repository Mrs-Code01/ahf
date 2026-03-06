import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Stethoscope,
  Heart,
  Users,
  User,
  Construction,
  Settings,
  ChevronRight,
} from "lucide-react";

const page = () => {
  // Array for Statistics
  const stats = [
    { label: "Projects Completed", value: "24+" },
    { label: "Years of Service", value: "15+" },
    { label: "Lives Impacted", value: "1000+" },
  ];

  // Array for Project Cards with Lucide Icons and Links
  const projects = [
    {
      title: "Hospitalized & Medical Outreach",
      description:
        "Providing free healthcare services and underserved communities.",
      count: "Projects",
      icon: <Stethoscope size={28} className="text-gray-700" />,
      slug: "/project-details/hospital",
    },
    {
      title: "Orphans and Vulnerable Children (OVC)",
      description:
        "This is a yearly project carried out by Apiri Hallowed Foundation (AHF) where Orhans and vulnerable children are attended to through free eye test and treatment of Orphans with eye defect. Over the years, AHF has reached out to lots of children in various states in Nigeria and have been able to improve their sight.",
      count: "Projects",
      icon: <Heart size={28} className="text-gray-700" />,
      slug: "/project-details/orphans",
    },
    {
      title: "Prison Inmates",
      description:
        "Apiri Hallowed Foundation (AHF) visits inmates at the correctional centers on a monthly basis with the word of God, gift items and also carries out skill acquisition training for the inmates and empowers them with starter packs / capital on their release from the facility. Over the years, Apiri Hallowed Foundation have empowered lots of inmates and Ex-convicts with skills and startup capital.",
      count: "Projects",
      icon: <Users size={28} className="text-gray-700" />,
      slug: "/project-details/prison",
    },
    {
      title: "Widows/Widowers",
      description:
        "Apiri Hallowed Foundation reach and empowers widows / widowers nationally. AHF carries out skill acquisition and empowerment project for widows and widowers. AHF visits the widows on a monthly basis to check up on them and encourage them.",

      count: "Projects",
      icon: <User size={28} className="text-gray-700" />,
      slug: "/project-details/widows",
    },
    {
      title: "Community Development",
      description:
        "Improving community infrastructure and conducting public awareness campaigns.",
      count: "Projects",
      icon: <Construction size={28} className="text-gray-700" />,
      slug: "/project-details/community",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center text-[#333333] max-[1099px]:mt-[40px]">
      {/* Hero Section */}
      <section className="w-[100%] h-[500px] relative overflow-hidden flex flex-col items-center justify-center text-center">
        <Image
          src="/images/ahfnig5.jpg"
          alt="African community impact"
          width={100}
          height={100}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
          unoptimized
        />
        <div className="relative z-10 flex flex-col items-center px-[5%]">
          <p className="text-[#E32227] font-semibold tracking-widest uppercase text-[1.8rem] mb-4 max-[768px]:text-[1.3rem]">
            Making a Difference Since 2009
          </p>
          <h1 className="text-white text-[6rem] font-bold mb-6 max-[768px]:text-[4.5rem]">
            Our Projects
          </h1>
          <p className="text-white text-[2rem] max-w-[800px] leading-relaxed font-light opacity-90 max-[768px]:text-[1.5rem]">
            Transforming lives through healthcare, education, development, and
            empowerment programs across Nigeria
          </p>
        </div>
      </section>
      {/* End Hero Section */}

      {/* Stats Section */}
      <section className="w-[100%] bg-[#000000] py-[50px] px-[5%] flex flex-col items-center">
        <div className="w-full flex flex-wrap  justify-center gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="w-[240px] border border-gray-200 rounded-2xl py-10 flex flex-col items-center bg-white shadow-sm max-[650px]:w-[100%]"
            >
              <h2 className="text-4xl font-black text-[#1a1a1a] mb-2">
                {stat.value}
              </h2>
              <p className="text-[14px] uppercase tracking-wider text-gray-400 font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* End Stats Section */}

      {/* Projects Container (Using Flex Wrap for Rows) */}
      <section className="w-[100%] bg-[#eeeeee] py-[90px] px-[5%] flex flex-wrap justify-between gap-y-[30px]">
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-[31%] border border-gray-100 rounded-[30px] p-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[350px] bg-white max-[950px]:w-[48%] max-[650px]:w-[100%]"
          >
            <div className="flex flex-col">
              {/* Lucide Icon Container */}
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-8">
                {project.icon}
              </div>

              <h3 className="text-[2.5rem] font-bold mb-4 leading-tight text-[#1a1a1a]">
                {project.title}
              </h3>

              <p className="text-gray-500 text-[16px] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Card Footer with Link */}
            <div className="flex justify-between items-center mt-12 border-t pt-8 border-gray-50">
              <span className="text-[1.5rem] font-bold text-[#E32227] uppercase tracking-tight">
                {project.count}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="group text-[15px] font-bold text-[#1a1a1a] flex items-center gap-1 hover:opacity-[.8] transition-colors"
              >
                View More
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        ))}
      </section>
      {/* End Projects Container */}
    </div>
  );
};

export default page;
