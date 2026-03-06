import React from "react";
import Image from "next/image";

const page = () => {
  // Array of objects with unique image paths for each member
  const teamMembers = [
    {
      name: "Pastor Apiriala Atedoghu",
      role: "President",
      location: "Nigeria",
      image: "/images/leaders/leader4.jpg", // Unique image
    },
    {
      name: "Mrs. Lolia Atedoghu",
      role: "Member board of Trustees",
      location: "Nigeria",
      image: "/images/leaders/leader3.jpg",
    },
    {
      name: "Dr. Bankole Williams Jimba",
      role: "Member board of Trustees",
      location: "Nigeria",
      image: "/images/leaders/leader2.jpg",
    },

    {
      name: "Pastor James Kaka",
      role: "Member Board of Directors",
      location: "Nigeria",
      image: "/images/leaders/leader5.jpg",
    },
    {
      name: "Professor Iwekumo Agbozu",
      role: "Member Board of Directors",
      location: "Nigeria",
      image: "/images/leaders/leader6.jpg",
    },
    {
      name: "Ifeoma Robinson",
      role: "Team Lead - Chief Operating Officer (COO)/Programme Manager",
      location: "Nigeria",
      image: "/images/leaders/leader1.jpg",
    },
    {
      name: "Pst. Edafe Omolo",
      role: "Member Board of Directors",
      location: "Nigeria",
      image: "/images/leaders/leader8.jpeg",
    },
    {
      name: "Mr. Tochukwu Ifemene",
      role: "Member Board of Directors",
      location: "Nigeria",
      image: "/images/leaders/leader7.jpeg",
    },
  ];

  return (
    <>
      <section
        className="h-[300px] w-full bg-cover bg-center bg-no-repeat flex justify-center items-center mb-[100px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/ahfnig1.jpg')",
        }}
      >
        <Image
          src="/images/brushes/leadership.png"
          width={200}
          height={200}
          alt="brush stroke"
          className="w-[350px]"
          unoptimized
        />
      </section>
      {/* End of header */}
      {/* End of header */}
      <div className="w-[30%] mx-auto mb-[100px] max-[800px]:w-[90%]">
        <p className="text-[1.5rem] text-center">
          The management team oversees program execution, partnerships,
          compliance, and daily operations to ensure effectiveness and
          accountability.
        </p>
      </div>
      <section className="w-[90%] mx-auto py-20 bg-white">
        <div className="w-[60%] mx-auto mb-[70px] text-center max-[700px]:w-[100%]">
          <h2 className="text-[3rem] text-center mb-[20px]">Leadership</h2>
          <p className="text-[1.5rem]">
            AHF is incredibly proud of its dedicated, creative, and cohesive
            team who cross borders to harness best practices.
          </p>
        </div>
        <div className="w-[100%] flex flex-wrap justify-center items-start gap-y-[30px]">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-[23%] max-[900px]:w-[48%] max-[450px]:w-[100%] px-4 mb-12 flex flex-col items-center text-center"
            >
              <div className="w-[100%] h-[300px] max-[450px]:h-[400px] mb-6 overflow-hidden shadow-md border-2 border-gray-50 rounded-[20px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover object-top rounded-[20px]"
                  unoptimized
                />
              </div>
              {/* End Circular Image */}

              <div className="space-y-2">
                <h3 className="text-[#0A4D3C] text-[1.8rem] font-bold text-xl leading-tight">
                  {member.name}
                </h3>

                <p className=" text-[1.5rem] leading-relaxed max-w-[220px] mx-auto">
                  {member.role} <br /> {member.location}
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
      <div className="w-[90%] mb-[100px] mx-auto">
        <div className="w-[70%] mx-auto text-center max-[700px]:w-[100%]">
          <h2 className="text-[3rem] max-[700px]:text-[2.5rem] mb-[10px]">
            Values For Excellence
          </h2>
          <p className="text-[1.8rem] max-[700px]:text-[1.5rem]">
            All project / programme personnel of AHF shall possess and maintain
            the following values for excellent performance.
          </p>
        </div>
        <p className="w-[60%] max-[700px]:w-[100%] mx-auto text-[2.5rem] font-[700] my-[30px]  p-[50px] bg-[#e32227] text-center text-[#ffffff] max-[700px]:text-[2rem] rounded-[40px]">
          Love, Discipline, Accountability, Honesty, Integrity, Sincerity and
          Transparency
        </p>
        <p className="text-[1.8rem] max-[700px]:text-[1.5rem]">
          <span className="text-[30px] mr-[10px]">&bull;</span>
          All Project / Programme personnel of AHF shall promote love,
          discipline, accountability, Honesty, Integrity, Sincerity and
          Transparency in all activities.
          <br />
          <span className="text-[30px] mr-[10px]">&bull;</span> Staff behavior
          and conduct must consider and be willing to obey the stated values.
          <br /> <span className="text-[30px] mr-[10px]">&bull;</span>
          Staff and the members of AHF will never hide any information to the
          stakeholders
          <br /> <span className="text-[30px] mr-[10px]">&bull;</span>
          All personnel of AHF must posit the following: Power, riches, Wisdom,
          Strength, Honour, Glory and Blessing (Rev 5:12).
        </p>
      </div>
    </>
  );
};

export default page;
