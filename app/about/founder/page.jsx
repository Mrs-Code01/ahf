import React from "react";
import Image from "next/image";

const page = () => {
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
          src="/images/brushes/ourstory.png"
          width={200}
          height={200}
          alt="brush stroke"
          className="w-[350px]"
          unoptimized
        />
      </section>
      <div className="text-center mb-[50px]">
        <h3 className="text-[2.3rem]">Meet The Founder</h3>
        <Image
          src="/images/leaders/leader4.jpg"
          width={200}
          height={200}
          alt="founder"
          className="w-[22%] p-[5px] mx-auto my-[20px] h-[350px] rounded-[20px] border border-[#999999] object-cover object-top max-[900px]:w-[40%] max-[600px]:w-[70%] max-[400px]:w-[90%]"
          unoptimized
        />
        <h3 className="text-[1.8rem] text-[#0A4D3C]">
          Pastor Apiriala Atedoghu
        </h3>
        <p className="italic text-[1.5rem]">President</p>
      </div>
      <div className="w-[90%] mx-auto mb-[100px] text-center">
        <p className="text-[1.8rem] max-[700px]:text-[1.5rem]">
          Pastor Apiriala Atedoghu is the President of Apiri Hallowed
          Foundation, a faith-driven non-governmental organization committed to
          improving the well-being of humanity, particularly among the poor and
          needy, in obedience to God’s calling. <br />
          <br />
          With a heart for service and compassion, he leads initiatives focused
          on widows, orphans and vulnerable children, prison inmates, the
          hospitalized, and underserved communities. Under his leadership, the
          Foundation has successfully implemented scholarship schemes for
          orphans, skill acquisition and empowerment programs for inmates,
          economic empowerment for widows through skills training and start-up
          capital, as well as the provision of clean water for communities.
          <br />
          <br />
          Pastor Atedoghu’s vision is rooted in love, dignity, and sustainable
          transformation for those most in need. He is married with children
        </p>
      </div>

      {/* --- VIDEO SECTION START --- */}
      <div className="w-[90%] max-w-[1000px] mx-auto mb-[100px]">
        <h3 className="text-[2.3rem] text-center mb-8">
          Watch Our Mission in Action
        </h3>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-[20px] shadow-2xl bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/JDLYe6nTSZ8?si=YIvRJPTh5ZIpzyNA"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* --- VIDEO SECTION END --- */}
    </>
  );
};

export default page;
