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
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/courses")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#000000] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <span className="inline-block bg-blue-500 text-white text-sm px-4 py-1 rounded-full font-semibold mb-4">
            {course.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#ffffff]">
            {course.title}
          </h1>
          <p className="text-xl text-blue-100 mb-6">{course.description}</p>

          <div className="flex flex-wrap gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>{course.students || 0} students enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <span>{course.modules?.length || 0} modules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Image */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* About Course */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📖 About This Course
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                👨‍🏫 Instructor
              </h2>
              <p className="text-lg font-semibold text-gray-800">
                {course.instructor}
              </p>
            </div>

            {/* Course Modules */}
            {course.modules && course.modules.length > 0 && course.modules[0] && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  📚 Course Modules
                </h2>
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CheckCircle
                        className="text-green-600 flex-shrink-0 mt-1"
                        size={20}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Module {index + 1}
                        </p>
                        <p className="text-gray-600">{module}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">Course Price</p>
                <p className="text-4xl font-bold text-blue-600">
                  {course.price}
                </p>
              </div>

              <PurchaseButton course={course} />

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-gray-800">
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students</span>
                  <span className="font-semibold text-gray-800">
                    {course.students || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Modules</span>
                  <span className="font-semibold text-gray-800">
                    {course.modules?.length || 0}
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
