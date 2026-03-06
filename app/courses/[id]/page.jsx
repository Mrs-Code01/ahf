"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PurchaseButton from "../../../components/PurchaseButton";
import { Clock, Users, BookOpen, CheckCircle, ArrowLeft } from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.id) {
      loadCourse();
    }
  }, [params.id]);

  const loadCourse = async () => {
    try {
      console.log("Fetching course with ID:", params.id);
      const response = await fetch(`/api/courses/${params.id}`);
      const data = await response.json();

      console.log("Course API response:", data);

      if (data.success) {
        setCourse(data.data);
      } else {
        setError(data.error || "Course not found");
        console.error("Course fetch failed:", data.error);
      }
    } catch (error) {
      console.error("Error loading course:", error);
      setError("Error loading course");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
          <button
            onClick={() => router.push("/courses")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[90%] mx-auto px-4 py-8">
          <button
            onClick={() => router.push("/courses")}
            className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-all font-black text-xl tracking-tight group"
          >
            <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              ←
            </div>
            Back to Courses
          </button>
        </div>
      </div>

      {/* Ultra-Modern Hero Section */}
      <div className="bg-[#0F172A] text-white py-20 md:py-32">
        <div className="max-w-[90%] mx-auto px-4">
          <span className="inline-block bg-blue-600/10 text-blue-400 text-lg px-6 py-2 rounded-full font-black mb-8 border border-blue-500/20 tracking-widest uppercase">
            {course.category}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 text-white tracking-tighter leading-[0.9]">
            {course.title}
          </h1>

          <div className="flex flex-wrap gap-10 text-xl font-bold tracking-tight text-blue-100/60">
            <div className="flex items-center gap-3">
              <Clock size={28} className="text-blue-500" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users size={28} className="text-emerald-500" />
              <span>{course.students || 0} Learners Enrolled</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen size={28} className="text-purple-500" />
              <span>{course.modules?.length || 0} Modules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[90%] mx-auto px-4 py-12">
        <div className="grid grid-cols-8 gap-[20px]">
          {/* Left Column - Course Details */}
          <div className="col-span-6 space-y-8 max-[950px]:col-span-5 max-[650px]:col-span-8">
            {/* Course Image */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden ">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* About Course */}
            <div className="bg-white rounded-[2.5rem] shadow-xl p-10 md:p-14 border border-gray-50">
              <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter">
                Educational Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-xl md:text-2xl font-medium whitespace-pre-wrap">
                {course.description}
              </p>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-[2.5rem] shadow-xl p-10 md:p-14 border border-gray-50">
              <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter uppercase">
                Expert Instructor
              </h2>
              <p className="text-2xl font-bold text-blue-600 bg-blue-50 px-8 py-4 rounded-2xl inline-block border border-blue-100">
                {course.instructor}
              </p>
            </div>

            {/* Course Modules */}
            {course.modules &&
              course.modules.length > 0 &&
              course.modules[0] && (
                <div className="bg-white rounded-[2.5rem] shadow-xl p-10 md:p-14 border border-gray-50">
                  <h2 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter">
                    Learning Path
                  </h2>
                  <div className="space-y-6">
                    {course.modules.map((module, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-6 p-8 bg-gray-50 rounded-[2rem] hover:bg-gray-100 transition-all group"
                      >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-2xl font-black text-gray-900 tracking-tight mb-2">
                            Module {index + 1}
                          </p>
                          <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            {module}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Right Column - Purchase Card */}
          <div className="col-span-2 max-[950px]:col-span-3 max-[650px]:col-span-8">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 sticky top-[120px] border border-gray-100">
              <div className="text-center mb-10">
                <p className="text-gray-400 font-black uppercase tracking-widest text-sm mb-4">Investment</p>
                <div className="text-5xl font-black text-gray-900 tracking-tighter">
                  ₦{course.price_amount?.toLocaleString()}
                </div>
              </div>

              <PurchaseButton course={course} />

              <div className="mt-10 pt-10 border-t border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-bold text-lg">Duration</span>
                  <span className="font-black text-gray-900 text-lg">
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-bold text-lg">Learners</span>
                  <span className="font-black text-gray-900 text-lg">
                    {course.students || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-bold text-lg">Curriculum</span>
                  <span className="font-black text-gray-900 text-lg">
                    {course.modules?.length || 0} Units
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Note:</strong> After purchase, admin will verify
                  your payment within 24 hours and grant you access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
