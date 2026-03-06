"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import CourseForm from "@/components/CourseForm";
import {
  Plus,
  LogOut,
  ShoppingBag,
  BookOpen,
  Users,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  CalendarDays,
  LayoutGrid,
  X,
  LayoutDashboard,
} from "lucide-react";

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [token, setToken] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enrollPage, setEnrollPage] = useState(1);
  const ENROLL_PER_PAGE = 8;

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/admin/login");
      return;
    }
    setToken(adminToken);
    loadData(adminToken);
  }, []);

  const loadData = async (adminToken) => {
    await Promise.all([loadCourses(), loadEnrollments(adminToken)]);
    setLoading(false);
  };

  const loadCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const loadEnrollments = async (adminToken) => {
    try {
      const response = await fetch("/api/purchases", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setEnrollments(data.data);
      }
    } catch (error) {
      console.error("Error loading enrollments:", error);
    }
  };

  const handleSave = async (courseData) => {
    try {
      const url = editingCourse
        ? `/api/courses/${editingCourse.id}`
        : "/api/courses";

      const method = editingCourse ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (data.success) {
        await loadCourses();
        setShowForm(false);
        setEditingCourse(null);
        alert(editingCourse ? "✅ Course updated!" : "✅ Course created!");
      } else {
        alert("❌ " + (data.error || "Failed to save course"));
      }
    } catch (error) {
      alert("❌ Error saving course");
      console.error(error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          await loadCourses();
          alert("✅ Course deleted!");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("❌ Error deleting course");
      }
    }
  };

  const handleApproveEnrollment = async (enrollmentId) => {
    if (window.confirm("✅ Approve this payment and grant access?")) {
      try {
        const response = await fetch("/api/enrollments", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            enrollmentId,
            paymentStatus: "completed",
            accessGranted: true,
          }),
        });

        const data = await response.json();

        if (data.success) {
          await loadEnrollments(token);
          await loadCourses();
          alert("✅ Payment approved and access granted!");
        }
      } catch (error) {
        alert("❌ Error approving enrollment");
        console.error(error);
      }
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    // Also clear the httpOnly cookie server-side
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/admin/login");
  };

  const pendingCount = enrollments.filter(
    (e) => e.payment_status === "pending",
  ).length;
  const totalRevenue = enrollments
    .filter(
      (e) => e.payment_status === "completed" || e.payment_status === "success",
    )
    .reduce((sum, e) => sum + parseFloat(e.amount_paid), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="mb-6">
            <img
              src="/logo.png"
              alt="Loading"
              className="w-24 h-24 mx-auto rounded-lg object-cover shadow-md animate-pulse"
            />
          </div>
          <p className="text-gray-600 font-black text-2xl animate-pulse tracking-tight">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`mt-[100px] fixed top-0 left-0 h-full w-[300px] bg-white shadow-2xl z-[120] flex flex-col transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100 bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <LayoutDashboard size={24} />
            </div>
            <span className="font-black text-white text-xl tracking-tighter">
              ADMIN DASHBOARD
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white transition-all bg-gray-800 p-2 rounded-xl mr-[20px]"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-6 py-10 flex flex-col gap-3 overflow-y-auto">
          <button
            onClick={() => {
              setShowEnrollments(!showEnrollments);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-lg transition-all ${
              showEnrollments
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200 translate-x-1"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <ShoppingBag size={22} />
            <span>Enrollments</span>
            {pendingCount > 0 && (
              <span className="ml-auto bg-yellow-400 text-yellow-950 text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setEditingCourse(null);
              setShowForm(true);
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
          >
            <Plus size={22} />
            <span>Create Course</span>
          </button>

          <button
            onClick={() => {
              router.push("/admin/volunteers");
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-lg text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-all"
          >
            <Users size={22} />
            <span>Volunteers</span>
          </button>

          {/* <button
            onClick={() => {
              router.push("/admin/media");
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-lg text-gray-600 hover:bg-orange-50 hover:text-orange-700 transition-all"
          >
            <ImageIcon size={22} />
            <span>Media Library</span>
          </button> */}

          <button
            onClick={() => {
              router.push("/admin/events");
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-lg text-gray-600 hover:bg-rose-50 hover:text-rose-700 transition-all"
          >
            <CalendarDays size={22} />
            <span>Community Events</span>
          </button>
        </nav>

        <div className="px-6 py-8 border-t border-gray-100 mb-[110px]">
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-lg text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={22} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100 mt-[60px]">
        <div className="max-w-[90%] mx-auto px-4 py-6 md:py-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-2">
              Dashboard
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-medium tracking-tight">
              Apiri Hallowed Foundation Learning System
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-3 px-6 py-3.5 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all font-black text-lg shadow-xl shadow-gray-200"
          >
            <LayoutGrid size={24} />
            <span className="hidden sm:inline">Management</span>
            {pendingCount > 0 && (
              <span className="bg-yellow-400 text-yellow-950 text-xs font-black px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-[90%] mx-auto px-4 py-12 md:py-16">
        {/* Modern Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 group hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen size={32} />
              </div>
              <span className="text-gray-300 font-black text-xl">01</span>
            </div>
            <div>
              <p className="text-gray-400 text-lg font-bold uppercase tracking-widest mb-1">Total Courses</p>
              <p className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">
                {courses.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 group hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-8">
              <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Users size={32} />
              </div>
              <span className="text-gray-300 font-black text-xl">02</span>
            </div>
            <div>
              <p className="text-gray-400 text-lg font-bold uppercase tracking-widest mb-1">Total Students</p>
              <p className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">
                {courses.reduce((sum, c) => sum + (c.students || 0), 0)}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 group hover:scale-[1.02] transition-all relative overflow-hidden">
            {pendingCount > 0 && <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rotate-45 translate-x-12 -translate-y-12"></div>}
            <div className="flex items-center justify-between mb-8">
              <div className="bg-yellow-50 p-4 rounded-2xl text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                <Clock size={32} />
              </div>
              <span className="text-gray-300 font-black text-xl">03</span>
            </div>
            <div>
              <p className="text-gray-400 text-lg font-bold uppercase tracking-widest mb-1">Pending Sync</p>
              <p className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter font-mono">
                {pendingCount}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 group hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-8">
              <div className="bg-purple-50 p-4 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <CheckCircle size={32} />
              </div>
              <span className="text-gray-300 font-black text-xl">04</span>
            </div>
            <div>
              <p className="text-gray-400 text-lg font-bold uppercase tracking-widest mb-1">Revenue</p>
              <p className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                ₦{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {showEnrollments ? (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-1">Enrollments</h2>
                <p className="text-gray-400 text-base font-medium">{enrollments.length} total · {pendingCount} pending</p>
              </div>
              <button
                onClick={() => { setShowEnrollments(false); setEnrollPage(1); }}
                className="text-blue-600 hover:text-blue-800 font-bold text-base flex items-center gap-2 group"
              >
                <div className="w-7 h-7 rounded-full border-2 border-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all text-sm">
                  ←
                </div>
                Back to Courses
              </button>
            </div>

            {enrollments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-16 text-center border border-gray-100">
                <ShoppingBag size={40} className="mx-auto mb-4 text-gray-200" />
                <p className="text-xl font-black text-gray-400">No enrollments yet</p>
              </div>
            ) : (() => {
              const totalPages = Math.ceil(enrollments.length / ENROLL_PER_PAGE);
              const paged = enrollments.slice((enrollPage - 1) * ENROLL_PER_PAGE, enrollPage * ENROLL_PER_PAGE);
              return (
                <>
                  {/* Compact table */}
                  <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr_auto] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-widest">
                      <span>Student</span>
                      <span>Course</span>
                      <span>Amount</span>
                      <span>Date</span>
                      <span>Status</span>
                    </div>

                    {/* Rows */}
                    {paged.map((enrollment, idx) => (
                      <div
                        key={enrollment.id}
                        className={`grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_0.8fr_0.8fr_auto] gap-3 md:gap-4 px-6 py-4 items-center border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                        }`}
                      >
                        {/* Student */}
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{enrollment.user_name}</p>
                          <p className="text-gray-400 text-xs truncate">{enrollment.user_email}</p>
                        </div>

                        {/* Course */}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">{enrollment.course_name}</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(enrollment.purchased_at || enrollment.enrolled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>

                        {/* Amount */}
                        <div>
                          <p className="font-bold text-gray-900 text-sm">₦{enrollment.amount_paid}</p>
                          {enrollment.payment_reference && (
                            <p className="text-gray-400 text-xs">#{enrollment.payment_reference.slice(-6)}</p>
                          )}
                        </div>

                        {/* Date (hidden on mobile, shown in course col) */}
                        <div className="hidden md:block"></div>

                        {/* Status + Action */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-black ${
                            enrollment.payment_status === "completed" || enrollment.payment_status === "success"
                              ? "bg-emerald-50 text-emerald-700"
                              : enrollment.payment_status === "pending"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-rose-50 text-rose-700"
                          }`}>
                            {enrollment.payment_status === "completed" || enrollment.payment_status === "success"
                              ? "Completed" : enrollment.payment_status === "pending" ? "Pending" : "Failed"}
                          </span>
                          {enrollment.payment_status === "pending" && (
                            <button
                              onClick={() => handleApproveEnrollment(enrollment.id)}
                              className="bg-emerald-600 text-white px-3 py-1 rounded-full hover:bg-emerald-700 transition-all font-bold text-xs shadow"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <button
                        onClick={() => setEnrollPage(p => Math.max(1, p - 1))}
                        disabled={enrollPage === 1}
                        className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        ←
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setEnrollPage(page)}
                          className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                            page === enrollPage
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setEnrollPage(p => Math.min(totalPages, p + 1))}
                        disabled={enrollPage === totalPages}
                        className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        →
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-2">
                  Learning Content
                </h2>
                <p className="text-gray-500 text-xl font-medium tracking-tight">Active courses currently available to students</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] hover:bg-blue-700 transition-all font-black text-xl shadow-2xl shadow-blue-100 flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={24} />
                New Course
              </button>
            </div>

            {courses.length === 0 ? (
              <div className="bg-white rounded-[3rem] shadow-xl p-32 text-center border border-gray-50">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 text-gray-200">
                  <BookOpen size={64} />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Catalog is empty</h3>
                <p className="text-gray-400 text-xl font-medium mb-10 tracking-tight">Start building your foundation by creating your first course</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gray-900 text-white px-12 py-5 rounded-[2rem] hover:bg-black transition-all font-black text-xl shadow-2xl shadow-gray-200"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isAdmin={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {showForm && (
        <CourseForm
          course={editingCourse}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingCourse(null);
          }}
        />
      )}
    </div>
  );
}