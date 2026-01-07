import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  Heart,
  Users,
  User,
  Construction,
  Settings,
  ChevronRight
} from "lucide-react";

const page = () => {
  // Array for Statistics
  const stats = [
    { label: "Projects Completed", value: "24+" },
    { label: "Years of Service", value: "15+" },
    { label: "Lives Impacted", value: "1000+" }
  ];

  // Array for Project Cards with Lucide Icons and Links
  const projects = [
    {
      title: "Hospitalized & Medical Outreach",
      description:
        "Providing free healthcare services and underserved communities.",
      count: "5 projects",
      icon: <Stethoscope size={28} className="text-gray-700" />,
      slug: "medical-outreach"
    },
    {
      title: "Orphans and Vulnerable Children (OVC)",
      description:
        "Supporting orphaned vulnerable children through healthcare, education, and care packages.",
      count: "5 projects",
      icon: <Heart size={28} className="text-gray-700" />,
      slug: "/project-details/orphans"
    },
    {
      title: "Prison Inmates Projects",
      description:
        "Empowering inmates with vocational skills and prison reform.",
      count: "3 projects",
      icon: <Users size={28} className="text-gray-700" />,
      slug: "/project-details/prison"
    },
    {
      title: "Widows Projects",
      description:
        "Providing economic empowerment and relief support to widows in need.",
      count: "2 projects",
      icon: <User size={28} className="text-gray-700" />,
      slug: "widows-empowerment"
    },
    {
      title: "Community Development",
      description:
        "Improving community infrastructure and conducting public awareness campaigns.",
      count: "5 projects",
      icon: <Construction size={28} className="text-gray-700" />,
      slug: "community-development"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center font-sans text-[#333333]">
      {/* Hero Section */}
      <section className="w-[100%] h-[500px] relative overflow-hidden flex flex-col items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
          alt="African community impact"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-[#E5B68A] font-semibold tracking-widest uppercase text-sm mb-4">
            Making a Difference Since 2009
          </p>
          <h1 className="text-white text-6xl font-bold mb-6">
            Our Impact Projects
          </h1>
          <p className="text-white text-xl max-w-[800px] leading-relaxed font-light opacity-90">
            Transforming lives through healthcare, education, development, and
            empowerment programs across Nigeria
          </p>
        </div>
      </section>
      {/* End Hero Section */}

      {/* Stats Section */}
      <section className="w-[90%] mt-20 flex flex-col items-center">
        <p className="text-gray-400 font-medium mb-10">
          Making a Difference Since 2009
        </p>

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
      <section className="w-[90%] mt-24 flex flex-wrap justify-between gap-y-12 mb-24">
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-[31%] border border-gray-100 rounded-[30px] p-10 shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[350px] bg-white hover:translate-y-[-5px] transition-all duration-300 max-[950px]:w-[48%] max-[650px]:w-[100%]"
          >
            <div className="flex flex-col">
              {/* Lucide Icon Container */}
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-8">
                {project.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 leading-tight text-[#1a1a1a]">
                {project.title}
              </h3>

              <p className="text-gray-500 text-[16px] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Card Footer with Link */}
            <div className="flex justify-between items-center mt-12 border-t pt-8 border-gray-50">
              <span className="text-[14px] font-bold text-gray-300 uppercase tracking-tight">
                {project.count}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="group text-[15px] font-bold text-[#1a1a1a] flex items-center gap-1 hover:text-[#D4A373] transition-colors"
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
