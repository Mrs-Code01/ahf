import React from "react";
import Image from "next/image";

const page = () => {
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
          src="/images/brushes/ourstory.png"
          width={200}
          height={200}
          alt="brush stroke"
          className="w-[30%]"
          unoptimized
        />
      </section>
      {/* End of header */}
      {/* End of header */}
      <div className="w-[90%] mx-auto mb-[100px] text-center">
        <h2 className="text-[3rem] mb-[10px]">OUR STORY</h2>
        <p className="text-[1.8rem]">
          ApiriHallowed Foundation (AHF) was born out of a deep concern for
          people who are often forgotten by society — orphans, widows, inmates,
          the sick and vulnerable communities. <br />
          <br />
          The foundation began in 2007 as a small faith-driven outreach,
          motivated by compassion and a strong belief that every human life
          deserves dignity, care and opportunity, regardless of background or
          circumstance. What started as occasional hospital visitations and
          welfare support gradually evolved into a structured humanitarian
          mission. Through direct engagement with orphanages, correctional
          centres, hospitals and underserved communities, the need for
          consistent, organized intervention became clear. <br />
          <br />
          AHF responded by expanding its activities to include healthcare
          outreach, educational support, skill acquisition for inmates, public
          enlightenment programs and community development projects. Over the
          years, the foundation has grown from a single outreach initiative into
          a multi-program organization with documented impact across several
          states in Nigeria. Despite this growth, AHF has remained rooted in its
          founding values of compassion, service, integrity and faith. <br />
          <br />
          Today, ApiriHallowed Foundation continues to serve as a bridge of hope
          — restoring dignity, empowering lives and creating pathways for
          long-term transformation among vulnerable populations.
        </p>
      </div>
      <div className="text-center mb-[100px]">
        <h3 className="text-[2.3rem]">Meet The Founder</h3>
        <Image
          src="/images/ahfnig1.jpg"
          width={200}
          height={200}
          alt="founder"
          className="w-[22%] p-[5px] mx-auto my-[20px] h-[300px] rounded-[10px] object-cover object-top"
          unoptimized
        />
        <h3 className="text-[1.8rem] text-[#0A4D3C]">Mr. Apiriala Atedoghu</h3>
        <p className="italic text-[1.5rem]">President</p>
      </div>
    </>
  );
};

export default page;
