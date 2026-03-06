"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { PlayCircle, Download, Lock, CheckCircle, Loader } from "lucide-react";

export default function CourseAccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.id;
  const reference = searchParams.get("ref");

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [purchase, setPurchase] = useState(null);
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    if (reference) {
      checkAccess();
    }
  }, [reference, checkCount]);

  const checkAccess = async () => {
    try {
      const verifyResponse = await fetch("/api/paystack/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success && verifyData.purchase?.access_granted) {
        setHasAccess(true);
        setPurchase(verifyData.purchase);

        const courseResponse = await fetch(
          `/api/courses/${verifyData.purchase.course_id}`,
        );
        const courseData = await courseResponse.json();
        if (courseData.success) {
          setCourse(courseData.data);
        }

        const lessonsResponse = await fetch(
          `/api/courses/${verifyData.purchase.course_id}/lessons`,
        );
        const lessonsData = await lessonsResponse.json();
        if (lessonsData.success) {
          console.log("📚 LESSONS DATA:", lessonsData.data);
          setLessons(lessonsData.data || []);
        }

        setLoading(false);
        return;
      }

      const response = await fetch(
        `/api/paystack/check-access?reference=${reference}`,
      );
      const data = await response.json();

      if (data.hasAccess) {
        setHasAccess(true);
        setCourse(data.course);
        console.log("📚 LESSONS DATA:", data.lessons);
        setLessons(data.lessons || []);
        setPurchase(data.purchase);
        setLoading(false);
      } else if (data.status === "pending") {
        setPurchase(data.purchase);
        if (checkCount < 10) {
          setTimeout(() => {
            setCheckCount(checkCount + 1);
          }, 3000);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error checking access:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verifying Your Payment
          </h2>
          <p className="text-gray-600 mb-4">
            Please wait while we confirm your payment with Paystack...
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-800">
              {checkCount > 0
                ? `Checking... (Attempt ${checkCount}/10)`
                : "This usually takes a few seconds"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Lock className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Not Granted
          </h2>
          {purchase?.payment_status === "pending" ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Your payment is still being processed. This can take a few
                minutes.
              </p>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <p className="text-sm text-yellow-800 font-medium mb-2">
                  Payment Status: Pending
                </p>
                <p className="text-xs text-yellow-700">
                  Reference: {reference}
                </p>
              </div>
              <button
                onClick={() => {
                  setLoading(true);
                  setCheckCount(0);
                  checkAccess();
                }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                Check Payment Status Again
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                We could not verify your payment. Please contact support.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700">
                  Reference: {reference || "Not provided"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to {course?.title}!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Payment successful! You now have full access to all course content.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Access Granted</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Course Content
          </h2>
          {lessons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No lessons available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {lessons.map((lesson, index) => {
                console.log(`🎥 Lesson ${index + 1}:`, lesson);

                // Check if strings are truthy (not null, undefined, or empty string)
                const hasVideoUrl =
                  lesson.video_url && lesson.video_url.trim() !== "";
                const hasFileUrl =
                  lesson.file_url && lesson.file_url.trim() !== "";

                return (
                  <div
                    key={lesson.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="bg-[#4169E1] text-[#ffffff] px-6 py-4">
                      <h3 className="text-xl font-bold flex items-center gap-3 text-[#ffffff]">
                        {lesson.content_type === "video" ? (
                          <PlayCircle size={24} />
                        ) : (
                          <Download size={24} />
                        )}
                        Lesson {index + 1}: {lesson.title}
                      </h3>
                    </div>

                    <div className="p-6">
                      {/* YouTube Video */}
                      {lesson.content_type === "video" && hasVideoUrl && (
                        <div className="aspect-video mb-4">
                          <iframe
                            src={lesson.video_url}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={lesson.title}
                          />
                        </div>
                      )}

                      {/* Uploaded Video File */}
                      {lesson.content_type === "video" &&
                        hasFileUrl &&
                        !hasVideoUrl && (
                          <div className="aspect-video mb-4">
                            <video
                              src={lesson.file_url}
                              controls
                              className="w-full h-full rounded-lg bg-black"
                              controlsList="nodownload"
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}

                      {/* PDF Document */}
                      {lesson.content_type === "pdf" && hasFileUrl && (
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300 text-center">
                            <Download className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 mb-4">
                              PDF Document Available
                            </p>

                            <a
                              href={lesson.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                            >
                              <Download size={18} />
                              Download PDF
                            </a>
                          </div>

                          <div className="aspect-video">
                            <iframe
                              src={lesson.file_url}
                              className="w-full h-full rounded-lg border border-gray-300"
                              title={lesson.title}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {purchase && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Purchase Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Amount Paid:</span>{" "}
                <span className="font-bold text-green-600">
                  ₦{purchase.amount_paid?.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>{" "}
                <span className="text-gray-800">{purchase.user_email}</span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>{" "}
                <span className="text-gray-800">
                  {new Date(purchase.purchased_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
