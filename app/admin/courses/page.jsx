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
  Clock
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

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/admin/login");
      return;
    }
    setToken(adminToken);
    loadData(adminToken);
  }, []);

  const loadData = async adminToken => {
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

  const loadEnrollments = async adminToken => {
    try {
      const response = await fetch("/api/enrollments", {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setEnrollments(data.data);
      }
    } catch (error) {
      console.error("Error loading enrollments:", error);
    }
  };

  const handleSave = async courseData => {
    try {
      const url = editingCourse
        ? `/api/courses/${editingCourse.id}`
        : "/api/courses";

      const method = editingCourse ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(courseData)
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

  const handleEdit = course => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDelete = async id => {
    if (window.confirm("⚠️ Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
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

  const handleApproveEnrollment = async enrollmentId => {
    if (window.confirm("✅ Approve this payment and grant access?")) {
      try {
        const response = await fetch("/api/enrollments", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            enrollmentId,
            paymentStatus: "completed",
            accessGranted: true
          })
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

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const pendingCount = enrollments.filter(e => e.payment_status === "pending")
    .length;
  const totalRevenue = enrollments
    .filter(e => e.payment_status === "completed")
    .reduce((sum, e) => sum + parseFloat(e.amount_paid), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b sticky top-[30px] z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-[80px]">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                📊 Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm">
                Manage courses and enrollments
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowEnrollments(!showEnrollments)}
                className={`px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-md ${
                  showEnrollments
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-2"
                }`}
              >
                <ShoppingBag size={20} />
                Enrollments {pendingCount > 0 && `(${pendingCount})`}
              </button>
              <button
                onClick={() => {
                  setEditingCourse(null);
                  setShowForm(true);
                }}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-semibold flex items-center gap-2 shadow-md"
              >
                <Plus size={20} />
                Add Course
              </button>
              <button
                onClick={() => router.push("/admin/volunteers")}
                className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition-all font-semibold flex items-center gap-2 shadow-md"
              >
                <Users size={20} />
                Volunteers
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center gap-2 shadow-md"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Courses
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {courses.length}
                </p>
              </div>
              <BookOpen className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Students
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {courses.reduce((sum, c) => sum + (c.students || 0), 0)}
                </p>
              </div>
              <Users className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-800">
                  {pendingCount}
                </p>
              </div>
              <Clock className="text-yellow-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold text-gray-800">
                  ₦{totalRevenue.toLocaleString()}
                </p>
              </div>
              <CheckCircle className="text-purple-600" size={40} />
            </div>
          </div>
        </div>

        {showEnrollments ? (
          /* Enrollments View */
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                💳 Course Enrollments & Payments
              </h2>
              <button
                onClick={() => setShowEnrollments(false)}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Courses
              </button>
            </div>

            {enrollments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <ShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
                <p className="text-gray-500 text-lg">No enrollments yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.map(enrollment => (
                  <div
                    key={enrollment.id}
                    className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
                  >
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          STUDENT
                        </p>
                        <p className="font-bold text-gray-800">
                          {enrollment.user_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {enrollment.user_email}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          COURSE
                        </p>
                        <p className="font-semibold text-gray-800">
                          {enrollment.course_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(
                            enrollment.enrolled_at
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          PAYMENT
                        </p>
                        <p className="font-bold text-gray-800">
                          ₦{enrollment.amount_paid}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">
                          {enrollment.payment_method.replace("_", " ")}
                        </p>
                        {enrollment.transaction_reference && (
                          <p className="text-xs text-gray-500">
                            Ref: {enrollment.transaction_reference}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <span
                          className={`inline-block px-4 py-2 rounded-lg text-sm font-bold text-center ${
                            enrollment.payment_status === "completed"
                              ? "bg-green-100 text-green-800"
                              : enrollment.payment_status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {enrollment.payment_status === "completed"
                            ? "✅ Completed"
                            : enrollment.payment_status === "pending"
                            ? "⏳ Pending"
                            : "❌ Failed"}
                        </span>

                        {enrollment.payment_status === "pending" && (
                          <button
                            onClick={() =>
                              handleApproveEnrollment(enrollment.id)
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold transition-colors"
                          >
                            ✅ Approve Payment
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Courses View */
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📚 All Courses
            </h2>

            {courses.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
                <p className="text-gray-500 text-lg mb-4">No courses yet</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center gap-2"
                >
                  <Plus size={20} />
                  Create Your First Course
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
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
      </div>

      {showForm && (
        <CourseForm
          course={editingCourse}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingCourse(null);
          }}
        />
      )}
    </div>
  );
}
