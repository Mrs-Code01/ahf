import React from "react";
import { Globe } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center bg-[#07090C] text-white pt-24 pb-12">
        <div className="w-[90%] text-[1.3rem] flex flex-col md:flex-row justify-between border-b border-white/10 pb-20 gap-16">
          <div className="w-full md:w-[30%]">
            <Image
              src="/images/logo.png"
              height={100}
              width={100}
              unoptimized
              alt="logo"
              className="bg-[#ffffff] p-[10px] mb-[20px]"
            />
            <p className="text-gray-500 leading-relaxed mb-8 text-[1.5rem]">
              Dedicated to providing immediate and lasting change for children
              in poverty around the world.
            </p>
            <div className="flex flex-row gap-4">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E32227] transition-colors cursor-pointer"
                >
                  <Globe size={16} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[15%] text-[1.3rem]">
            <h4 className="font-bold uppercase tracking-[0.3em] mb-8 text-[#E32227]">
              Quick Links
            </h4>
            <ul className="text-gray-500 space-y-5 font-bold uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Our Campaign</li>
              <li className="hover:text-white cursor-pointer">
                Upcoming Events
              </li>
              <li className="hover:text-white cursor-pointer">Admin Panel</li>
            </ul>
          </div>
          <div className="w-full md:w-[15%]">
            <h4 className="font-bold  uppercase tracking-[0.3em] mb-8 text-[#4169e1]">
              Support
            </h4>
            <ul className="text-gray-500 space-y-5 font-bold uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer">Terms of Use</li>
              <li className="hover:text-white cursor-pointer">Help Center</li>
            </ul>
          </div>
          <div className="w-full md:w-[25%]">
            <h4 className="font-bold uppercase tracking-[0.3em] mb-8 text-[#4169e1]">
              Contact Info
            </h4>
            <p className="text-gray-500 mb-4">123 Charity Lane, New York, NY</p>
            <p className="text-white font-bold mb-4">+1 (234) 567 890</p>
            <p className="text-[#4169e1] font-bold">contact@chariot.org</p>
          </div>
        </div>
        <div className="w-[90%] pt-10 flex flex-col md:flex-row justify-between items-center text-gray-600 font-black uppercase tracking-[0.4em]">
          <p>© 2024 CHARIOT FOUNDATION. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <span>Sitemap</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
