"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Youtube } from "lucide-react";

const FacebookIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/search/top/?q=apiri%20hallowed%20foundation%20ahf&__epa__=SEARCH_BOX&__eps__=SERP_TOP_TAB&__hcr__=eyJpZCI6IjEwMDA2ODYzMTE3MjQzNyIsInNvdXJjZSI6IlRZUEVBSEVBRF9QQUdFX01BUktFUiJ9",
    icon: FacebookIcon,
  },
  {
    name: "Linkein",
    href: "https://www.linkedin.com/in/olo-apiriala?originalSubdomain=ng",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@apirihallowedfoundation2935",
    icon: Youtube,
  },
];

const Footer = () => {
  const [state, handleSubmit] = useForm("xykjbzoy");
  const formRef = useRef(null);

  const [emailInput, setEmailInput] = useState("");
  const [submittedEmails, setSubmittedEmails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // 2. Handle what happens when Formspree confirms success
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);

      // Add the email to our "Blocked" list so they can't use it again
      setSubmittedEmails((prev) => [...prev, emailInput.toLowerCase()]);

      // Reset the form fields
      setEmailInput("");
      if (formRef.current) formRef.current.reset();

      // Hide success message after 10 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowSuccess(false); // Hide success message if they start a new submission

    const currentEmail = emailInput.toLowerCase().trim();

    // 3. THE VITAL CHECK: Block if email exists in our local list
    if (submittedEmails.includes(currentEmail)) {
      setErrorMessage("This email has already been used to send a message.");
      return; // Stop the function here
    }

    // 4. If it's a new email, proceed to Formspree
    await handleSubmit(e);
  };
  return (
    <>
      <footer className="flex flex-col items-center bg-[#07090C] text-white pt-24 pb-12">
        <div className="w-[90%] text-[1.3rem] flex flex-col md:flex-row justify-between border-b border-white/10 pb-20 gap-y-[50px]">
          {/* Logo + Mission */}
          <div className="w-full md:w-[24%]">
            <Image
              src="/images/logo.png"
              height={200}
              width={200}
              unoptimized
              alt="logo"
              className=" mt-[-22px] object-cover mb-[20px] max-[768px]:w-[160px]"
            />
            <p className="text-gray-500 leading-relaxed mb-8 text-[1.5rem]">
              Dedicated to providing immediate and lasting change for the
              vulnerable and needy
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full p-[10px] hover:bg-blue-700 transition-all duration-300 shadow-md hover:scale-110"
                >
                  {/* Icon is forced to #ffffff here */}
                  <social.icon size={26} color="#ffffff" />

                  {/* Screen reader label for SEO and accessibility */}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-[24%]">
            <h4 className="font-bold uppercase mb-[10px] text-[#4169e1]">
              Quick Links
            </h4>
            <ul className="text-gray-500 space-y-5">
              <Link href="/courses">
                <li className="hover:text-white cursor-pointer mb-[4px]">
                  Courses
                </li>
              </Link>
              <Link href="/projects">
                <li className="hover:text-white cursor-pointer mb-[4px]">
                  Projects
                </li>
              </Link>
              <Link href="/get-involved/volunteer">
                <li className="hover:text-white cursor-pointer mb-[4px]">
                  Volunteer
                </li>
              </Link>
              <Link href="/admin/login">
                <li className="hover:text-white cursor-pointer">Admin Panel</li>
              </Link>
            </ul>
          </div>

          {/* Offices */}
          <div className="w-full md:w-[24%]">
            <h4 className="font-bold uppercase mb-[10px] text-[#4169e1]">
              Offices
            </h4>
            <ul className="text-gray-500 space-y-5 tracking-normal">
              <li>
                <span className="text-white">Head Quarters:</span>
                <br />
                10 Market Road, Jeddo, Okpe LGA, Delta State, Nigeria
              </li>
              <li>
                <span className="text-white">Branch Office:</span>
                <br />
                B48, Anglican Plaza, Uselu by Mela Road, Opp. Egor LGA
                Secretariat, Ugbowo, Benin City, Edo State, Nigeria
              </li>
            </ul>
          </div>

          {/* Contact Info + Small Form */}
          <div className="w-full md:w-[24%]">
            <h4 className="font-bold uppercase  mb-[10px] text-[#4169e1]">
              Contact Info
            </h4>
            <ul className="text-gray-500 space-y-3 tracking-normal mb-6">
              <li className="hover:text-white cursor-pointer">
                +234-8057180888
              </li>
              <li className="hover:text-white cursor-pointer">
                +234-9033600975
              </li>
              <li className="hover:text-white cursor-pointer">
                +234-7032359421
              </li>
            </ul>

            {/* Small Form */}
            <form
              ref={formRef}
              onSubmit={handleCustomSubmit}
              className="flex flex-col gap-3 text-black"
            >
              <h3 className="text-[#E32227] text-[1.5rem] my-[10px] font-bold">
                SEND US A MESSAGE
              </h3>

              <input
                name="name"
                type="text"
                placeholder="First Name"
                required
                className="p-5 rounded-md bg-white focus:outline-none"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (errorMessage) setErrorMessage(""); // Clear error while typing
                }}
                required
                className={`p-5 rounded-md bg-white focus:outline-none ${errorMessage ? "border-2 border-red-500" : ""}`}
              />

              {/* Error message for duplicate emails */}
              {errorMessage && (
                <p className="text-red-500 text-sm font-bold bg-red-100 p-2 rounded border border-red-500">
                  ⚠️ {errorMessage}
                </p>
              )}

              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500 text-xs"
              />

              <textarea
                name="message"
                placeholder="Message"
                rows="3"
                required
                className="p-5 rounded-md bg-white focus:outline-none"
              ></textarea>

              <button
                type="submit"
                disabled={state.submitting}
                className="bg-[#E32227] cursor-pointer text-white font-bold py-5 px-4 rounded-md hover:bg-[#c71c21] transition-colors disabled:opacity-50"
              >
                {state.submitting ? "Sending..." : "Submit"}
              </button>

              {/* Success Message */}
              {showSuccess && (
                <div className="mt-2 p-3 text-center animate-bounce">
                  <p className="font-bold text-[1.5rem] text-green-600">
                    ✓ Message sent! Thank you.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-[90%] pt-10 text-center">
          <p className="text-[1.3rem]">© 2026 AHF. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
