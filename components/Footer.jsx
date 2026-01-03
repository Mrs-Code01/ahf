import React from "react";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center bg-[#07090C] text-white pt-24 pb-12">
        <div className="w-[90%] text-[1.3rem] flex flex-col md:flex-row justify-between border-b border-white/10 pb-20 gap-8">
          {/* Logo + Mission */}
          <div className="w-full md:w-[24%]">
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

          {/* Quick Links */}
          <div className="w-full md:w-[24%]">
            <h4 className="font-bold uppercase mb-8 text-[#E32227]">
              Quick Links
            </h4>
            <ul className="text-gray-500 space-y-5 font-bold uppercase tracking-widest">
              <Link href="#">
                <li className="hover:text-white cursor-pointer">
                  e-Newsletter
                </li>
              </Link>
              <Link href="#">
                <li className="hover:text-white cursor-pointer">
                  e-Newsletter
                </li>
              </Link>
              <Link href="#">
                <li className="hover:text-white cursor-pointer">
                  e-Newsletter
                </li>
              </Link>
              <Link href="/admin/login">
                <li className="hover:text-white cursor-pointer">Admin Panel</li>
              </Link>
            </ul>
          </div>

          {/* Offices */}
          <div className="w-full md:w-[24%]">
            <h4 className="font-bold uppercase mb-8 text-[#4169e1]">Offices</h4>
            <ul className="text-gray-500 space-y-5 font-bold tracking-normal">
              <li>
                <span className="text-white">Head Quarters:</span>
                <br />
                10 Market Road, Jeddo, Okpe LGA, Delta State, Nigeria.
              </li>
              <li>
                <span className="text-white">Branch Office:</span>
                <br />
                B47, Anglican Plaza, Uselu by Mela Road, Opp. Egor LGA
                Secretariat, Ugbowo, Benin City, Edo State, Nigeria
              </li>
            </ul>
          </div>

          {/* Contact Info + Small Form */}
          <div className="w-full md:w-[24%]">
            <h4 className="font-bold uppercase  mb-8 text-[#4169e1]">
              Contact Info
            </h4>
            <ul className="text-gray-500 space-y-3 tracking-normal mb-6">
              <li className="text-white">+234-8074054834</li>
              <li className="text-white">+234-8053204802</li>
              <li className="text-white">+234-8069316588</li>
            </ul>

            {/* Small Form */}
            <form className="flex flex-col gap-3 text-black">
              <h3 className="text-[#E32227] text-[1.5rem] my-[10px]">
                SEND US A MESSAGE
              </h3>
              <input
                type="text"
                placeholder="First Name"
                className="p-5 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#E32227]"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-5 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#E32227]"
              />
              <textarea
                placeholder="Message"
                rows="3"
                className="p-5 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#E32227]"
              ></textarea>
              <button
                type="submit"
                className="bg-[#E32227] text-white font-bold py-5 px-4 rounded-md hover:bg-[#c71c21] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-[90%] pt-10 flex flex-col md:flex-row justify-between items-center text-gray-600 font-black uppercase tracking-[0.4em] mt-16">
          <p>© 2026 AHF. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <span>Cookies</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
