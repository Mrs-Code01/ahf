"use client";

import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { Search, Filter, BookOpen } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold text-[1.5rem]">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Expansive Hero Section */}
      <div className="bg-[#0F172A] text-white pt-[120px] pb-[80px]">
        <div className="max-w-[90%] mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-none">
            Master Your Skills
          </h1>
          <p className="text-xl md:text-2xl text-blue-100/70 font-medium max-w-3xl leading-relaxed">
            Discover and enroll in our expert-led courses designed to empower your future.
          </p>
        </div>
      </div>

      {/* Modern Search and Filter */}
      <div className="max-w-[90%] mx-auto px-4 -mt-10">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <BookOpen size={16} />
            <span>
              Showing {filteredCourses.length} of {courses.length} courses
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Courses Grid */}
      <div className="max-w-[90%] mx-auto px-4 pt-10 pb-24 md:pb-32">
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">
              {searchTerm || selectedCategory !== "All"
                ? "No courses match your search"
                : "No courses available yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 min-[1300px]:grid-cols-4 gap-8 md:gap-10">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} isAdmin={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
