"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Download, Upload, CheckCircle, Loader, ChevronLeft, ChevronRight } from "lucide-react";

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    motivation: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [membersCurrentPage, setMembersCurrentPage] = useState(1);
  const membersPerPage = 4;

  const allImages = [
    { id: 1, url: "/images/volunteer/ahfnig4.JPG", alt: "Volunteer Activity", caption: "Stress management seminar" },
    { id: 2, url: "/images/volunteer/ahfnig1.JPG", alt: "Volunteer Activity", caption: "Stress management seminar" },
    { id: 3, url: "/images/volunteer/ahfnig2.JPG", alt: "Volunteer Activity", caption: "Stress management seminar" },
    { id: 4, url: "/images/volunteer/ahfnig3.JPG", alt: "Volunteer Activity", caption: "Stress management seminar" },
    { id: 5, url: "/images/volunteer/pic1.JPG", alt: "Volunteer Activity", caption: "Drug abuse seminar/workshop" },
    { id: 6, url: "/images/volunteer/pic2.JPG", alt: "Volunteer Activity", caption: "Drug abuse seminar/workshop" },
    { id: 7, url: "/images/volunteer/pic3.JPG", alt: "Volunteer Activity", caption: "Drug abuse seminar/workshop" },
    { id: 8, url: "/images/volunteer/pic4.JPG", alt: "Volunteer Activity", caption: "Drug abuse seminar/workshop" },
    { id: 9, url: "/images/volunteer/pic5.jpg", alt: "Volunteer Activity", caption: "Ambulance seminar" },
    { id: 10, url: "/images/volunteer/pic6.jpg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer training" },
    { id: 11, url: "/images/volunteer/pic7.JPG", alt: "Volunteer Activity", caption: "Drug abuse seminar/workshop" },
    { id: 12, url: "/images/volunteer/pic8.jpg", alt: "Volunteer Activity", caption: "Ambulance seminar" },
    { id: 13, url: "/images/volunteer/pic9.JPG", alt: "Volunteer Activity", caption: "Good to great training for volunteers and staff" },
    { id: 14, url: "/images/volunteer/pic10.JPG", alt: "Volunteer Activity", caption: "Empowerment leadership summit" },
    { id: 15, url: "/images/volunteer/pic11.jpg", alt: "Volunteer Activity", caption: "Financial management training for prison warders (white house correction)" },
    { id: 16, url: "/images/volunteer/pic12.jpg", alt: "Volunteer Activity", caption: "Inmate skill acquisition workshop" },
    { id: 17, url: "/images/volunteer/pic13.jpg", alt: "Volunteer Activity", caption: "Financial management training for prison warders (white house correction" },
    { id: 18, url: "/images/volunteer/pic14.jpg", alt: "Volunteer Activity", caption: "Inmate skill acquisition workshop" },
    { id: 19, url: "/images/volunteer/pic15.JPG", alt: "Volunteer Activity", caption: "Empowerment leadership summit" },
    { id: 20, url: "/images/volunteer/pic16.JPG", alt: "Volunteer Activity", caption: "Empowerment leadership summit" },
    { id: 21, url: "/images/volunteer/pic17.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation market sensitization program" },
    { id: 22, url: "/images/volunteer/pic18.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation market sensitization program" },
    { id: 23, url: "/images/volunteer/pic19.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation market sensitization program" },
    { id: 24, url: "/images/volunteer/pic20.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation market sensitization program" },
    { id: 25, url: "/images/volunteer/pic21.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation market sensitization program" },
    { id: 26, url: "/images/volunteer/career/pic1.jpeg", alt: "Volunteer Activity", caption: "Workshop on career path for students of Uselu Secondary School, Benin City, Edo State" },
    { id: 27, url: "/images/volunteer/career/pic2.jpeg", alt: "Volunteer Activity", caption: "Workshop on career path for students of Uselu Secondary School, Benin City, Edo State" },
    { id: 28, url: "/images/volunteer/career/pic3.jpeg", alt: "Volunteer Activity", caption: "Workshop on career path for students of Uselu Secondary School, Benin City, Edo State" },
    { id: 29, url: "/images/volunteer/career/pic4.jpeg", alt: "Volunteer Activity", caption: "Workshop on career path for students of Uselu Secondary School, Benin City, Edo State" },
    { id: 30, url: "/images/volunteer/feast/pic1.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer love feast, Benin City" },
    { id: 31, url: "/images/volunteer/feast/pic2.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer love feast, Benin City" },
    { id: 32, url: "/images/volunteer/feast/pic3.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer love feast, Benin City" },
    { id: 33, url: "/images/volunteer/feast/pic4.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer love feast, Benin City" },
    { id: 34, url: "/images/volunteer/feast/pic5.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer love feast, Benin City" },
    { id: 35, url: "/images/volunteer/feast/pic6.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer love feast, Benin City" },
    { id: 36, url: "/images/volunteer/feast/pic7.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer love feast, Benin City" },
    { id: 37, url: "/images/volunteer/feast/pic8.jpeg", alt: "Volunteer Activity", caption: "ApiriHallowed Foundation volunteer love feast, Benin City" },
  ];

  const memberImages = [
    { id: 1, url: "/images/volunteer/members/pic1.jpg", alt: "Volunteer Member" },
    { id: 2, url: "/images/volunteer/members/pic2.jpg", alt: "Volunteer Member" },
    { id: 3, url: "/images/volunteer/members/pic3.jpg", alt: "Volunteer Member" },
    { id: 4, url: "/images/volunteer/members/pic4.jpg", alt: "Volunteer Member" },
    { id: 5, url: "/images/volunteer/members/pic5.jpg", alt: "Volunteer Member" },
    { id: 6, url: "/images/volunteer/members/pic6.jpg", alt: "Volunteer Member" },
    { id: 7, url: "/images/volunteer/members/pic7.jpg", alt: "Volunteer Member" },
    { id: 8, url: "/images/volunteer/members/pic8.jpg", alt: "Volunteer Member" },
    { id: 9, url: "/images/volunteer/members/pic9.jpg", alt: "Volunteer Member" },
    { id: 10, url: "/images/volunteer/members/pic10.jpg", alt: "Volunteer Member" },
    { id: 11, url: "/images/volunteer/members/pic11.JPG", alt: "Volunteer Member" },
    { id: 12, url: "/images/volunteer/members/pic12.JPG", alt: "Volunteer Member" },
    { id: 13, url: "/images/volunteer/members/pic13.JPG", alt: "Volunteer Member" },
  ];

  // Activities Pagination
  const totalPages = Math.ceil(allImages.length / itemsPerPage);
  const indexOfLastImage = currentPage * itemsPerPage;
  const indexOfFirstImage = indexOfLastImage - itemsPerPage;
  const currentImages = allImages.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Members Pagination
  const totalMemberPages = Math.ceil(memberImages.length / membersPerPage);
  const indexOfLastMember = membersCurrentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = memberImages.slice(indexOfFirstMember, indexOfLastMember);

  const paginateMembers = (pageNumber) => {
    setMembersCurrentPage(pageNumber);
    document.getElementById("members-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
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
        "-",
      )}.${fileExt}`;

      console.log("Uploading file:", fileName);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("volunteer-forms")
        .upload(fileName, file);

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
            status: "pending",
          },
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
      <div className="bg-[#000000] mt-[25px] py-[70px]">
        <div className="w-[90%] mx-auto px-4 text-center">
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
      <section id="gallery-section" className="w-full py-16 mt-[50px] flex justify-center bg-[#ffffff]">
        <div className="w-[90%] flex flex-col items-center">
          <h2 className="text-center text-[3rem] font-bold mb-[10px] text-[#262626] max-[800px]:text-[2.5rem]">
            Our Seminar/Workshop Activities
          </h2>
          <p className="text-gray-600 mb-10 text-center text-[1.5rem]">
            Take a look at some of the amazing activities our volunteers
            participated in.
          </p>

          <div className="w-full flex flex-wrap justify-center gap-y-[30px] gap-x-[2%]">
            {currentImages.map((activity) => (
              <div
                key={activity.id}
                className="w-[23.5%] max-[1200px]:w-[31%] max-[800px]:w-[48%] max-[500px]:w-[100%] mb-4 flex flex-col"
              >
                <div className="rounded-xl overflow-hidden shadow-md bg-white p-2 border border-gray-100 h-full flex flex-col">
                  <img
                    src={activity.url}
                    alt={activity.alt}
                    className="w-full h-[280px] object-cover rounded-lg"
                  />
                  <div className="py-4 px-2">
                    <p className="text-gray-800 font-bold text-[1.1rem] leading-tight text-center italic">
                      {activity.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all shadow-sm ${
                      page === currentPage
                        ? "bg-blue-600 text-white scale-110"
                        : "border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
      {/* --- WORKSHOP ACTIVITIES SECTION END --- */}

      {/* --- VOLUNTEER MEMBERS SECTION START --- */}
      <section id="members-section" className="w-full py-16 flex justify-center bg-[#f9f9f9] border-t border-gray-100">
        <div className="w-[90%] flex flex-col items-center">
          <h2 className="text-center text-[3rem] font-bold mb-[10px] text-[#262626] max-[800px]:text-[2.5rem]">
            Volunteer Members
          </h2>
          <p className="text-gray-600 mb-10 text-center text-[1.5rem]">
            Meet some of our volunteer members.
          </p>

          <div className="w-full flex flex-wrap justify-center gap-y-[30px] gap-x-[2%]">
            {currentMembers.map((member) => (
              <div
                key={member.id}
                className="w-[23.5%] max-[1200px]:w-[31%] max-[800px]:w-[48%] max-[500px]:w-[100%] mb-4 flex flex-col"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-3 border border-gray-200 group hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden rounded-xl h-[380px]">
                    <img
                      src={member.url}
                      alt={member.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls for Members */}
          {totalMemberPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => paginateMembers(membersCurrentPage - 1)}
                disabled={membersCurrentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-[#4169e1] hover:text-[#4169e1] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalMemberPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => paginateMembers(page)}
                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all shadow-sm ${
                      page === membersCurrentPage
                        ? "bg-[#4169e1] text-white scale-110 shadow-md"
                        : "border border-gray-200 text-gray-500 hover:border-[#4169e1] hover:text-[#4169e1]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginateMembers(membersCurrentPage + 1)}
                disabled={membersCurrentPage === totalMemberPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-[#4169e1] hover:text-[#4169e1] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
      {/* --- VOLUNTEER MEMBERS SECTION END --- */}
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
