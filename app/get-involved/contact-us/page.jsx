// "use client";

// import React, { useState } from "react";
// import { Phone, Mail, MapPin, Clock, Send, User, Smartphone, Mail as MailIcon, Globe, MessageSquare } from "lucide-react";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mobileNo: "",
//     email: "",
//     message: "",
//     captcha: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Add submission logic here
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="bg-gray-50 py-40 max-w-[1000px]:pt-[100px] lg:py-32 border-b border-gray-100">
//         <div className="section-container text-center">
//           <span className="text-[#E32227] font-bold text-[1.4rem] uppercase tracking-[0.3em] mb-4 block">
//             Get In Touch
//           </span>
//           <h1 className="text-[4rem] md:text-[5.5rem] font-black text-[#0A1128] leading-tight">
//             Contact <span className="text-[#4169e1]">Our Team</span>
//           </h1>
//           <p className="text-gray-500 text-[1.8rem] max-w-[800px] mx-auto mt-6 leading-relaxed">
//             Have questions or want to support our mission? Reach out to us directly through any of the channels below.
//           </p>
//         </div>
//       </section>

//       {/* Main Content Section */}
//       <section className="py-24 lg:py-32">
//         <div className="section-container">
//           <div className="flex flex-col lg:flex-row gap-20">
            
//             {/* Left Column: Contact Info */}
//             <div className="w-full lg:w-[40%] space-y-12">
//               <div className="space-y-4">
//                 <h2 className="text-[3rem] font-bold text-[#0A1128]">Contact Information</h2>
//                 <div className="w-20 h-1.5 bg-[#4169e1] rounded-full"></div>
//                 <p className="text-[1.7rem] text-gray-600 leading-relaxed mt-4">
//                   We are here to help and answer any question you might have. We look forward to hearing from you.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 gap-8">
//                 {/* Phone Card */}
//                 <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:shadow-lg hover:bg-white group">
//                   <div className="p-4 bg-white text-[#E32227] rounded-2xl shadow-sm group-hover:bg-[#E32227] group-hover:text-white transition-colors">
//                     <Phone size={28} />
//                   </div>
//                   <div>
//                     <h3 className="text-[1.8rem] font-bold text-[#0A1128] mb-2">Phone Lines</h3>
//                     <p className="text-[1.6rem] text-gray-700 font-medium">+234 805 718 0888</p>
//                     <p className="text-[1.6rem] text-gray-500">+234 903 360 0975</p>
//                   </div>
//                 </div>

//                 {/* Email Card */}
//                 <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:shadow-lg hover:bg-white group">
//                   <div className="p-4 bg-white text-[#E32227] rounded-2xl shadow-sm group-hover:bg-[#E32227] group-hover:text-white transition-colors">
//                     <Mail size={28} />
//                   </div>
//                   <div>
//                     <h3 className="text-[1.8rem] font-bold text-[#0A1128] mb-2">Email Address</h3>
//                     <p className="text-[1.6rem] text-gray-700 font-medium">apirihallowedfoundation2017@yahoo.com
//                     </p>
//                   </div>
//                 </div>

//                 {/* Location Card */}
//                 <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:shadow-lg hover:bg-white group">
//                   <div className="p-4 bg-white text-[#E32227] rounded-2xl shadow-sm group-hover:bg-[#E32227] group-hover:text-white transition-colors">
//                     <MapPin size={28} />
//                   </div>
//                   <div>
//                     <h3 className="text-[1.8rem] font-bold text-[#0A1128] mb-2">Head Office</h3>
//                     <p className="text-[1.6rem] text-gray-600 leading-relaxed">
//                       10 Market Road, Jeddo, Okpe LGA, Delta State, Nigeria
//                     </p>
//                   </div>
//                 </div>

//                 {/* Hours Card */}
//                 <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:shadow-lg hover:bg-white group">
//                   <div className="p-4 bg-white text-[#E32227] rounded-2xl shadow-sm group-hover:bg-[#E32227] group-hover:text-white transition-colors">
//                     <Clock size={28} />
//                   </div>
//                   <div>
//                     <h3 className="text-[1.8rem] font-bold text-[#0A1128] mb-2">Support Hours</h3>
//                     <p className="text-[1.6rem] text-gray-700 font-medium">Monday — Friday</p>
//                     <p className="text-[1.6rem] text-gray-500">09:00 AM — 06:00 PM</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column: Contact Form */}
//             <div className="w-full lg:w-[60%]">
//               <div className="bg-white rounded-[40px] p-10 lg:p-16 shadow-2xl border border-gray-50 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 p-12 bg-blue-50/50 rounded-bl-[100px] -mr-10 -mt-10">
//                   <MessageSquare size={48} className="text-[#4169e1] opacity-20" />
//                 </div>
                
//                 <div className="relative z-10">
//                   <h3 className="text-[2.6rem] font-bold text-[#0A1128] mb-10">Send Us a Message</h3>
                  
//                   <form onSubmit={handleSubmit} className="space-y-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                       {/* First Name */}
//                       <div className="space-y-2">
//                         <label className="text-[1.5rem] text-gray-500 font-medium ml-1">First Name *</label>
//                         <div className="relative group">
//                           <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4169e1] transition-colors" />
//                           <input
//                             type="text"
//                             name="firstName"
//                             placeholder="e.g. John"
//                             required
//                             className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-12 pr-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all"
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>

//                       {/* Last Name */}
//                       <div className="space-y-2">
//                         <label className="text-[1.5rem] text-gray-500 font-medium ml-1">Last Name</label>
//                         <div className="relative group">
//                           <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4169e1] transition-colors" />
//                           <input
//                             type="text"
//                             name="lastName"
//                             placeholder="e.g. Doe"
//                             className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-12 pr-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all"
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>

//                       {/* Mobile No */}
//                       <div className="space-y-2">
//                         <label className="text-[1.5rem] text-gray-500 font-medium ml-1">Mobile No *</label>
//                         <div className="relative group">
//                           <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4169e1] transition-colors" />
//                           <input
//                             type="tel"
//                             name="mobileNo"
//                             placeholder="+234..."
//                             required
//                             className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-12 pr-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all"
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>

//                       {/* Email ID */}
//                       <div className="space-y-2">
//                         <label className="text-[1.5rem] text-gray-500 font-medium ml-1">Email ID *</label>
//                         <div className="relative group">
//                           <MailIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4169e1] transition-colors" />
//                           <input
//                             type="email"
//                             name="email"
//                             placeholder="john@example.com"
//                             required
//                             className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-12 pr-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all"
//                             onChange={handleChange}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Message */}
//                     <div className="space-y-2">
//                       <label className="text-[1.5rem] text-gray-500 font-medium ml-1">Your Message</label>
//                       <textarea
//                         name="message"
//                         placeholder="How can we help you?"
//                         rows="5"
//                         className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 px-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all resize-none"
//                         onChange={handleChange}
//                       ></textarea>
//                     </div>

//                     {/* Captcha Section */}
//                     <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
//                       <div className="flex-1 w-full space-y-2">
//                         <label className="text-[1.4rem] text-gray-500 font-medium">Verify Characters *</label>
//                         <input
//                           type="text"
//                           name="captcha"
//                           placeholder="Type characters"
//                           required
//                           className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 text-[1.5rem] focus:outline-none focus:border-[#4169e1]"
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div className="bg-[#0A1128] px-8 py-5 rounded-xl text-white font-serif italic text-[2.2rem] tracking-[0.4em] select-none border-t-2 border-white/10 shadow-inner">
//                         p e r 8 s
//                       </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="pt-4">
//                       <button
//                         type="submit"
//                         className="w-full md:w-auto bg-[#E32227] hover:bg-[#c71c21] text-white px-16 py-6 rounded-2xl font-black text-[1.6rem] uppercase tracking-widest flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-2xl active:scale-[0.98]"
//                       >
//                         Send Message <Send size={20} />
//                       </button>
//                       <p className="text-gray-400 text-[1.3rem] mt-4 text-center md:text-left italic">
//                         * Your privacy is important to us. We never share your details.
//                       </p>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
            
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ContactPage;




"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Phone, Mail, MapPin, Clock, Send, User, Smartphone, Mail as MailIcon, Globe, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const [state, handleFormspreeSubmit] = useForm("xykjbzoy");
  const formRef = useRef(null);

  const [emailInput, setEmailInput] = useState("");
  const [submittedEmails, setSubmittedEmails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    message: "",
    captcha: "",
  });

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      setSubmittedEmails((prev) => [...prev, emailInput.toLowerCase()]);
      setEmailInput("");
      setFormData({
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        message: "",
        captcha: "",
      });
      if (formRef.current) formRef.current.reset();

      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setEmailInput(value);
      if (errorMessage) setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setShowSuccess(false);

    const currentEmail = emailInput.toLowerCase().trim();

    if (submittedEmails.includes(currentEmail)) {
      setErrorMessage("This email has already been used to send a message.");
      return;
    }

    await handleFormspreeSubmit(e);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-40 max-w-[1000px]:pt-[100px] lg:py-32 border-b border-gray-100">
        <div className="section-container text-center">
          <span className="text-[#E32227] font-bold text-[1.4rem] uppercase tracking-[0.3em] mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-[4rem] md:text-[5.5rem] font-black text-[#0A1128] leading-tight">
            Contact <span className="text-[#4169e1]">Our Team</span>
          </h1>
          <p className="text-gray-500 text-[1.8rem] max-w-[800px] mx-auto mt-6 leading-relaxed">
            Have questions or want to support our mission? Reach out to us directly through any of the channels below.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Left Column: Contact Info */}
            <div className="w-full lg:w-[40%] space-y-12">
              <div className="space-y-4">
                <h2 className="text-[3rem] font-bold text-[#0A1128]">Contact Information</h2>
                <div className="w-20 h-1.5 bg-[#4169e1] rounded-full"></div>
                <p className="text-[1.7rem] text-gray-600 leading-relaxed mt-4">
                  We are here to help and answer any question you might have. We look forward to hearing from you.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Phone Card */}
                <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:shadow-lg hover:bg-white group">
                  <div className="p-4 bg-white text-[#E32227] rounded-2xl shadow-sm group-hover:bg-[#E32227] group-hover:text-white transition-colors">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] font-bold text-[#0A1128] mb-2">Phone Lines</h3>
                    <p className="text-[1.6rem] text-gray-700 font-medium">+234 805 718 0888</p>
                    <p className="text-[1.6rem] text-gray-500">+234 903 360 0975</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:shadow-lg hover:bg-white group">
                  <div className="p-4 bg-white text-[#E32227] rounded-2xl shadow-sm group-hover:bg-[#E32227] group-hover:text-white transition-colors">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] font-bold text-[#0A1128] mb-2">Email Address</h3>
                    <p className="text-[1.6rem] text-gray-700 font-medium">apirihallowedfoundation<br/>2017@yahoo.com
                    </p>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:shadow-lg hover:bg-white group">
                  <div className="p-4 bg-white text-[#E32227] rounded-2xl shadow-sm group-hover:bg-[#E32227] group-hover:text-white transition-colors">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] font-bold text-[#0A1128] mb-2">Head Office</h3>
                    <p className="text-[1.6rem] text-gray-600 leading-relaxed">
                      10 Market Road, Jeddo, Okpe LGA, Delta State, Nigeria
                    </p>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:shadow-lg hover:bg-white group">
                  <div className="p-4 bg-white text-[#E32227] rounded-2xl shadow-sm group-hover:bg-[#E32227] group-hover:text-white transition-colors">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] font-bold text-[#0A1128] mb-2">Support Hours</h3>
                    <p className="text-[1.6rem] text-gray-700 font-medium">Monday — Friday</p>
                    <p className="text-[1.6rem] text-gray-500">09:00 AM — 06:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="w-full lg:w-[60%]">
              <div className="bg-white rounded-[40px] p-10 lg:p-16 shadow-2xl border border-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 bg-blue-50/50 rounded-bl-[100px] -mr-10 -mt-10">
                  <MessageSquare size={48} className="text-[#4169e1] opacity-20" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-[2.6rem] font-bold text-[#0A1128] mb-10">Send Us a Message</h3>
                  
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* First Name */}
                      <div className="space-y-2">
                        <label className="text-[1.5rem] text-gray-500 font-medium ml-1">First Name *</label>
                        <div className="relative group">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4169e1] transition-colors" />
                          <input
                            type="text"
                            name="firstName"
                            placeholder="e.g. John"
                            required
                            value={formData.firstName}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-12 pr-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <label className="text-[1.5rem] text-gray-500 font-medium ml-1">Last Name</label>
                        <div className="relative group">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4169e1] transition-colors" />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="e.g. Doe"
                            value={formData.lastName}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-12 pr-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Mobile No */}
                      <div className="space-y-2">
                        <label className="text-[1.5rem] text-gray-500 font-medium ml-1">Mobile No *</label>
                        <div className="relative group">
                          <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4169e1] transition-colors" />
                          <input
                            type="tel"
                            name="mobileNo"
                            placeholder="080..."
                            required
                            value={formData.mobileNo}
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-12 pr-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Email ID */}
                      <div className="space-y-2">
                        <label className="text-[1.5rem] text-gray-500 font-medium ml-1">Email ID *</label>
                        <div className="relative group">
                          <MailIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4169e1] transition-colors" />
                          <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            className={`w-full bg-gray-50 border rounded-2xl py-5 pl-12 pr-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all ${errorMessage ? "border-red-500" : "border-gray-200"}`}
                            onChange={handleChange}
                          />
                        </div>
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-red-500 text-[1.2rem]"
                        />
                        {errorMessage && (
                          <p className="text-red-500 text-[1.3rem] font-bold bg-red-100 p-2 rounded border border-red-500">
                            ⚠️ {errorMessage}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-[1.5rem] text-gray-500 font-medium ml-1">Your Message</label>
                      <textarea
                        name="message"
                        placeholder="How can we help you?"
                        rows="5"
                        value={formData.message}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 px-6 text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-[#4169e1]/20 focus:border-[#4169e1] transition-all resize-none"
                        onChange={handleChange}
                      ></textarea>
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-red-500 text-[1.2rem]"
                      />
                    </div>

                    {/* Captcha Section */}
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                      <div className="flex-1 w-full space-y-2">
                        <label className="text-[1.4rem] text-gray-500 font-medium">Verify Characters *</label>
                        <input
                          type="text"
                          name="captcha"
                          placeholder="Type characters"
                          required
                          value={formData.captcha}
                          className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 text-[1.5rem] focus:outline-none focus:border-[#4169e1]"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="bg-[#0A1128] px-8 py-5 rounded-xl text-white font-serif italic text-[2.2rem] tracking-[0.4em] select-none border-t-2 border-white/10 shadow-inner">
                        p e r 8 s
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={state.submitting}
                        className="w-full md:w-auto bg-[#E32227] hover:bg-[#c71c21] text-white px-16 py-6 rounded-2xl font-black text-[1.6rem] uppercase tracking-widest flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {state.submitting ? "Sending..." : "Send Message"} <Send size={20} />
                      </button>
                      <p className="text-gray-400 text-[1.3rem] mt-4 text-center md:text-left italic">
                        * Your privacy is important to us. We never share your details.
                      </p>

                      {/* Success Message */}
                      {showSuccess && (
                        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
                          <p className="font-bold text-[1.8rem] text-green-600">
                            ✓ Message sent! Thank you.
                          </p>
                          <p className="text-gray-500 text-[1.4rem] mt-1">
                            We'll get back to you as soon as possible.
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;