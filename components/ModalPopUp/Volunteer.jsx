"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // Import createPortal
import { User, Mail, Phone, MessageSquare, X, Send } from "lucide-react";

const VolunteerModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Immediate Scroll Lock and Body Check
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Volunteer Data:", formData);
    alert("Thank you for signing up!");
    onClose();
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Optimized Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[480px] bg-white rounded-[28px] p-6 md:p-10 shadow-2xl animate-in zoom-in-95 fade-in duration-200 will-change-transform overflow-y-auto max-h-[95vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-[#E32227] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(227,34,39,0.3)] mb-5">
            <User className="text-white fill-white/20" size={30} />
          </div>
          <h2 className="text-[2.2rem] max-[800px]:text-[1.8rem] font-bold text-[#111827] mb-2 tracking-tight">
            Join Our Mission
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-[340px] max-[800px]:text-[1.3rem]">
            Become a volunteer and help us create a lasting impact in our
            community.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-black mb-1.5 block ml-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                required
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#111827] focus:ring-2 focus:ring-[#E32227]/20 focus:border-[#E32227] outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-black mb-1.5 block ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#111827] focus:ring-2 focus:ring-[#E32227]/20 focus:border-[#E32227] outline-none transition-all"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-black mb-1.5 block ml-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#111827] focus:ring-2 focus:ring-[#E32227]/20 focus:border-[#E32227] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-black mb-1.5 block ml-1">
              Why do you want to join?
            </label>
            <div className="relative">
              <MessageSquare
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />
              <textarea
                required
                name="message"
                rows="3"
                placeholder="Tell us a little about yourself..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#111827] focus:ring-2 focus:ring-[#E32227]/20 focus:border-[#E32227] outline-none transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-[#E32227] hover:bg-[#c11b21] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
          >
            <Send size={18} />
            Submit Application
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-[13px] font-medium italic">
            We'll get back to you within 48 hours.
          </p>
        </div>
      </div>
    </div>,
    document.body // Portal target
  );
};

export default VolunteerModal;
