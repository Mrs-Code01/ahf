"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Video,
  FileText,
  Lock,
  Loader,
} from "lucide-react";

export default function StudentLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    setLoading(true);

    // Get payment reference from localStorage (saved during checkout)
    const paymentReference = localStorage.getItem(
      `course_${courseId}_reference`,
    );
    const userEmail = localStorage.getItem("userEmail");

    if (!paymentReference && !userEmail) {
      setHasAccess(false);
      setLoading(false);
      return;
    }

    try {
      // If we have payment reference, use it
      if (paymentReference) {
        const response = await fetch(
          `/api/paystack/check-access?reference=${paymentReference}`,
        );
        const data = await response.json();

        if (data.hasAccess) {
          setHasAccess(true);
          setCourse(data.course);
          setLessons(data.lessons || []);
          if (data.lessons && data.lessons.length > 0) {
            setSelectedLesson(data.lessons[0]);
          }
        } else {
          setHasAccess(false);
        }
      }
      // Otherwise check by email and courseId
      else if (userEmail) {
        const checkResponse = await fetch(
          `/api/courses/${courseId}/check-user-access?email=${userEmail}`,
        );
        const accessData = await checkResponse.json();

        if (accessData.hasAccess) {
          setHasAccess(true);
          // Fetch course and lessons separately
          await fetchCourse();
          await fetchLessons();
        } else {
          setHasAccess(false);
        }
      }
    } catch (error) {
      console.error("Error checking access:", error);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      if (data.success) {
        setCourse(data.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/lessons`);
      const data = await response.json();
      if (data.success) {
        setLessons(data.data || []);
        if (data.data && data.data.length > 0) {
          setSelectedLesson(data.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const handleDownload = async (fileUrl, lessonTitle) => {
    try {
      window.open(fileUrl, "_blank");
    } catch (error) {
      alert("Error downloading file");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin rounded-full h-12 w-12 mx-auto text-blue-600" />
          <p className="mt-4 text-gray-600">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <Lock className="mx-auto text-red-600 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You need to purchase this course to access the lessons.
          </p>
          <button
            onClick={() => router.push(`/courses/${courseId}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View Course Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/courses")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-2"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{course?.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-bold text-lg">Course Content</h2>
                <p className="text-sm text-gray-500">
                  {lessons.length} lessons
                </p>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-all ${
                      selectedLesson?.id === lesson.id
                        ? "bg-blue-50 border-l-4 border-blue-600"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {lesson.content_type === "video" ? (
                          <Video className="text-blue-600" size={20} />
                        ) : (
                          <FileText className="text-green-600" size={20} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {index + 1}. {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {lesson.content_type === "video"
                            ? lesson.video_url
                              ? "YouTube Video"
                              : "Video File"
                            : "PDF Document"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedLesson.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {selectedLesson.content_type === "video"
                        ? "Video Lesson"
                        : "PDF Lesson"}
                    </span>
                    {selectedLesson.file_url && (
                      <button
                        onClick={() =>
                          handleDownload(
                            selectedLesson.file_url,
                            selectedLesson.title,
                          )
                        }
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {/* YouTube Video */}
                  {selectedLesson.content_type === "video" &&
                    selectedLesson.video_url && (
                      <div className="aspect-video">
                        <iframe
                          src={selectedLesson.video_url}
                          className="w-full h-full rounded-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                  {/* Uploaded Video */}
                  {selectedLesson.content_type === "video" &&
                    selectedLesson.file_url &&
                    !selectedLesson.video_url && (
                      <div className="aspect-video">
                        <video
                          src={selectedLesson.file_url}
                          controls
                          className="w-full h-full rounded-lg bg-black"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                  {/* PDF Viewer */}
                  {selectedLesson.content_type === "pdf" &&
                    selectedLesson.file_url && (
                      <div>
                        <iframe
                          src={selectedLesson.file_url}
                          className="w-full h-[600px] rounded-lg border"
                          title={selectedLesson.title}
                        ></iframe>
                        <div className="mt-4 text-center">
                          <button
                            onClick={() =>
                              handleDownload(
                                selectedLesson.file_url,
                                selectedLesson.title,
                              )
                            }
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
                          >
                            <Download size={20} />
                            Download PDF
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">
                  Select a lesson to start learning
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
