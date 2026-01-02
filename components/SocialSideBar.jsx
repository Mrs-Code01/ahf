import React from "react";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn
} from "react-icons/fa";

const SocialSidebar = () => {
  return (
    <div className="fixed top-1/3 right-0 flex flex-col space-y-2 z-[200]">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 p-3 text-white hover:opacity-80"
      >
        <FaFacebookF size={20} />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-red-600 p-3 text-white hover:opacity-80"
      >
        <FaYoutube size={20} />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 p-3 text-white hover:opacity-80"
      >
        <FaInstagram size={20} />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-500 p-3 text-white hover:opacity-80"
      >
        <FaTwitter size={20} />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 p-3 text-white hover:opacity-80"
      >
        <FaWhatsapp size={20} />
      </a>
      <a
        href="https://www.linkedin.com/company/plastibuild-creative-solutions/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 p-3 text-white hover:opacity-80"
      >
        <FaLinkedinIn size={20} />
      </a>
    </div>
  );
};

export default SocialSidebar;
