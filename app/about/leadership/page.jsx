import React from "react";
import Image from "next/image";

const page = () => {
  // Array of objects with unique image paths for each member
  const teamMembers = [
    {
      name: "Tseday Tabor",
      role: "Finance and Administration Manager",
      location: "Addis Ababa, Ethiopia",
      image: "/images/ahfnig1.jpg" // Unique image
    },
    {
      name: "Yirga Gebregziabher",
      role: "Strategic Advisor",
      location: "Mekelle, Ethiopia",
      image: "/images/ahfnig1.jpg" // Unique image
    },
    {
      name: "Azeb Seifu",
      role: "Monitoring and Evaluation Manager",
      location: "Addis Ababa, Ethiopia",
      image: "/images/ahfnig1.jpg" // Unique image
    },
    {
      name: "Asmro Mulat Dessie",
      role: "Project Manager",
      location: "Addis Ababa, Ethiopia",
      image: "/images/ahfnig1.jpg" // Unique image
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
          src="/images/brushes/leadership.png"
          width={200}
          height={200}
          alt="brush stroke"
          className="w-[30%]"
          unoptimized
        />
      </section>
      {/* End of header */}
      {/* End of header */}
      <div className="w-[30%] mx-auto mb-[100px]">
        <p className="text-[1.5rem] text-center">
          The management team oversees program execution, partnerships,
          compliance, and daily operations to ensure effectiveness and
          accountability.
        </p>
      </div>
      <section className="w-[90%] mx-auto py-20 bg-white">
        <div className="w-[60%] mx-auto mb-[70px] text-center">
          <h2 className="text-[3rem] text-center mb-[20px]">
            Board of Trustees
          </h2>
          <p className="text-[1.5rem]">
            AHF is incredibly proud of its dedicated, creative, and cohesive
            team who cross borders to harness best practices.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-start">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-12 flex flex-col items-center text-center max-[1130px]:mb-16"
            >
              <div className="w-36 h-36 mb-6 overflow-hidden rounded-full shadow-md border-2 border-gray-50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* End Circular Image */}

              <div className="space-y-2">
                <h3 className="text-[#0A4D3C] text-[1.8rem] font-bold text-xl leading-tight">
                  {member.name}
                </h3>

                <p className=" text-[1.5rem] leading-relaxed max-w-[220px] mx-auto">
                  {member.role}, {member.location}
                </p>
              </div>
              {/* End Text Content */}
            </div>
            /* End Card Container */
          ))}
        </div>
      </section>
      {/* Board of Trustees */}
      {/* Board of Trustees */}
      <section className="w-[90%] mx-auto py-20 bg-white">
        <div className="w-[60%] mx-auto mb-[70px] text-center">
          <h2 className="text-[3rem] text-center mb-[20px]">
            Board of Directors
          </h2>
          <p className="text-[1.5rem]">
            AHF is incredibly proud of its dedicated, creative, and cohesive
            team who cross borders to harness best practices.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-start">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-12 flex flex-col items-center text-center max-[1130px]:mb-16"
            >
              <div className="w-36 h-36 mb-6 overflow-hidden rounded-full shadow-md border-2 border-gray-50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* End Circular Image */}

              <div className="space-y-2">
                <h3 className="text-[#0A4D3C] text-[1.8rem] font-bold text-xl leading-tight">
                  {member.name}
                </h3>

                <p className=" text-[1.5rem] leading-relaxed max-w-[220px] mx-auto">
                  {member.role}, {member.location}
                </p>
              </div>
              {/* End Text Content */}
            </div>
            /* End Card Container */
          ))}
        </div>
      </section>
      {/* Board of Directors */}
      {/* Board of Directors */}
    </>
  );
};

export default page;
