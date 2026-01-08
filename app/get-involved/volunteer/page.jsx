"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Download, Upload, CheckCircle, Loader } from "lucide-react";

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    motivation: ""
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!file) {
      alert("Please upload your completed volunteer form");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.motivation
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${formData.fullName.replace(
        /\s+/g,
        "-"
      )}.${fileExt}`;

      console.log("Uploading file:", fileName);

      const {
        data: uploadData,
        error: uploadError
      } = await supabase.storage.from("volunteer-forms").upload(fileName, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log("Upload successful:", uploadData);

      // 2. Save application to database (store just the filename, not full URL)
      const { data: dbData, error: dbError } = await supabase
        .from("volunteer_applications")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            motivation: formData.motivation,
            file_url: fileName, // Just store the filename
            file_name: fileName,
            status: "pending"
          }
        ])
        .select();

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log("Database insert successful:", dbData);

      // Success!
      setSubmitted(true);
      setFormData({ fullName: "", email: "", phone: "", motivation: "" });
      setFile(null);

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Application Submitted! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in volunteering! We'll review your
            application and get back to you within 3-5 business days.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#000000] mt-[5px] py-[60px]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-[3.5rem] font-bold mb-[10px] text-[#ffffff] max-[800px]:text-[3rem]">
            Join Our Volunteer Team
          </h1>
          <p className="text-[1.5rem] text-[#ffffff] max-[800px]:text-[1.4rem]">
            Make a difference in your community. Together, we create positive
            change.
          </p>
        </div>
      </div>
      {/* --- WORKSHOP ACTIVITIES SECTION START --- */}
      <section className="w-full py-16 mt-[50px] flex justify-center bg-[#ffffff]">
        <div className="w-[90%] flex flex-col items-center">
          <h2 className="text-[3rem] font-bold mb-[10px] text-[#262626] max-[800px]:text-[2.5rem]">
            Our Workshop Activities
          </h2>
          <p className="text-gray-600 mb-10 text-center text-[1.5rem]">
            Take a look at some of the amazing activities our volunteers
            participate in.
          </p>

          <div className="w-full flex flex-wrap justify-between gap-y-[30px]">
            {/* Mapping through activities array for a cleaner structure */}
            {[
              {
                id: 1,
                url: "/images/volunteer-activities/ahfnig4.jpg",
                alt: "Students collaborating"
              },
              {
                id: 2,
                url: "/images/volunteer-activities/ahfnig1.jpg",
                alt: "Team meeting"
              },
              {
                id: 3,
                url: "/images/volunteer-activities/ahfnig2.jpg",
                alt: "Group high five"
              },
              {
                id: 4,
                url: "/images/volunteer-activities/ahfnig3.jpg",
                alt: "Friends outdoors"
              },
              {
                id: 5,
                url: "/images/volunteer-activities/ahfnig5.jpg",
                alt: "Community gardening"
              },
              {
                id: 6,
                url: "/images/volunteer-activities/ahfnig6.jpg",
                alt: "Hands joined in unity"
              }
            ].map(activity => (
              <div
                key={activity.id}
                className="w-[32%] max-[800px]:w-[48%] max-[500px]:w-[100%] mb-6"
              >
                <img
                  src={activity.url}
                  alt={activity.alt}
                  className="w-full h-[320px] object-cover object-top rounded-lg shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- WORKSHOP ACTIVITIES SECTION END --- */}
      {/* Form Section */}
      <div className="bg-[#eeeeee] w-[100%] px-4 py-[100px]">
        <div className="bg-white max-w-4xl mx-auto rounded-2xl shadow-xl p-[30px] text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Volunteer Application
          </h2>
          <p className="text-gray-600 mb-8">
            Complete the form below to start your volunteering journey with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Download Form */}
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#4169e1] rounded-full flex items-center justify-center font-bold text-[#ffffff]">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Download Volunteer Form
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Download our official volunteer form template, fill it out, and
                save it to your computer.
              </p>
              <a
                href="/volunteer-form.docx"
                download
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <Download size={20} />
                Download Form (.docx)
              </a>
            </div>

            {/* Step 2: Fill Details */}
            <div className="border-l-4 border-[#4169e1] pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#4169e1] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Your Information
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Why do you want to volunteer? *
                  </label>
                  <textarea
                    name="motivation"
                    required
                    value={formData.motivation}
                    onChange={handleChange}
                    placeholder="Tell us about your motivation to volunteer..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Upload Form */}
            <div className="border-l-4 border-[#e32227] pl-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#e32227] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Upload Completed Form
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Upload the completed volunteer form you downloaded in step 1.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[blue] transition-colors">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <label className="cursor-pointer">
                  <span className="text-[#4169e1] font-semibold hover:text-[blue]">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  PDF, DOC, or DOCX (max 5MB)
                </p>
                {file && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-semibold">
                      ✓ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4169e1] text-white py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
