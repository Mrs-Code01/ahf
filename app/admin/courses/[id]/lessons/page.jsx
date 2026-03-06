"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Video,
  FileText,
  Upload,
  Loader,
  Youtube,
  Monitor,
} from "lucide-react";

export default function ManageCourseLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newLesson, setNewLesson] = useState({
    title: "",
    content_type: "video",
    video_source: "youtube",
    video_url: "",
    uploaded_file_url: null,
  });

  // ✅ FIX 1: Add courseId dependency
  useEffect(() => {
    if (courseId) {
      console.log("📌 Course ID available:", courseId);
      fetchCourse();
      fetchLessons();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      console.log("🔍 Fetching course...");
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      console.log("📦 Course response:", data);

      if (data.success) {
        setCourse(data.data);
        console.log("✅ Course set:", data.data);
      } else {
        console.error("❌ Course fetch failed:", data);
      }
    } catch (error) {
      console.error("❌ Error fetching course:", error);
    }
  };

  const fetchLessons = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching lessons for course:", courseId);
      const response = await fetch(`/api/courses/${courseId}/lessons`);
      const data = await response.json();
      console.log("📦 Lessons response:", data);

      if (data.success) {
        const lessonsData = data.data || [];
        setLessons(lessonsData);
        console.log("✅ Lessons set:", lessonsData.length, "lessons");
        console.log("📋 Lessons:", lessonsData);
      } else {
        console.error("❌ Lessons fetch failed:", data);
        setLessons([]);
      }
    } catch (error) {
      console.error("❌ Error fetching lessons:", error);
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = newLesson.content_type;

    // Validate file type
    if (fileType === "pdf" && file.type !== "application/pdf") {
      alert("❌ Please select a PDF file");
      return;
    }
    if (fileType === "video" && !file.type.startsWith("video/")) {
      alert("❌ Please select a video file (MP4, MOV, AVI, etc.)");
      return;
    }

    // Validate file size (200MB for video, 20MB for PDF)
    const maxSize = fileType === "video" ? 200 * 1024 * 1024 : 20 * 1024 * 1024;
    const maxSizeMB = fileType === "video" ? "200MB" : "20MB";
    if (file.size > maxSize) {
      alert(`❌ File must be less than ${maxSizeMB}`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // ✅ Step 1: Get a signed upload signature from our server (keeps API secret safe)
      console.log("🔑 Getting upload signature...");
      const sigRes = await fetch("/api/get-upload-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileType }),
      });
      const sigData = await sigRes.json();

      if (!sigData.success) {
        throw new Error("Failed to get upload signature: " + sigData.error);
      }

      const { signature, timestamp, folder, cloudName, apiKey } = sigData;

      // ✅ Step 2: Upload DIRECTLY from browser → Cloudinary (no Next.js server middleman!)
      console.log("📤 Uploading directly to Cloudinary...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("folder", folder);
      formData.append("api_key", apiKey);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${
        fileType === "video" ? "video" : "raw"
      }/upload`;

      // Use XMLHttpRequest for real upload progress tracking
      const uploadedUrl = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const result = JSON.parse(xhr.responseText);
            resolve(result.secure_url);
          } else {
            const errData = JSON.parse(xhr.responseText || "{}");
            reject(new Error(errData.error?.message || "Upload failed"));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
        xhr.addEventListener("abort", () => reject(new Error("Upload was cancelled")));

        xhr.open("POST", cloudinaryUrl);
        xhr.send(formData);
      });

      console.log("✅ Upload complete:", uploadedUrl);
      setUploadProgress(100);
      setNewLesson((prev) => ({ ...prev, uploaded_file_url: uploadedUrl }));
      setTimeout(() => setUploadProgress(0), 1000);

    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("❌ Upload failed: " + error.message);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleAddLesson = async () => {
    console.log("🚀 Adding lesson with data:", newLesson);

    // Validation
    if (!newLesson.title.trim()) {
      alert("❌ Please enter lesson title");
      return;
    }

    if (newLesson.content_type === "video") {
      if (newLesson.video_source === "youtube" && !newLesson.video_url.trim()) {
        alert("❌ Please enter YouTube video URL");
        return;
      }
      if (newLesson.video_source === "upload" && !newLesson.uploaded_file_url) {
        alert("❌ Please upload a video file");
        return;
      }
    } else if (newLesson.content_type === "pdf") {
      if (!newLesson.uploaded_file_url) {
        alert("❌ Please upload a PDF file");
        return;
      }
    }

    try {
      const lessonData = {
        courseId,
        title: newLesson.title,
        content_type: newLesson.content_type,
        order_number: lessons.length + 1,
        video_url: "",
        file_url: "",
      };

      // Set URLs based on content type and source
      if (
        newLesson.content_type === "video" &&
        newLesson.video_source === "youtube"
      ) {
        lessonData.video_url = newLesson.video_url;
        lessonData.file_url = "";
      } else {
        // For uploaded videos or PDFs
        lessonData.file_url = newLesson.uploaded_file_url;
        lessonData.video_url = "";
      }

      console.log("📤 Sending lesson data to API:", lessonData);

      const response = await fetch("/api/courses/add-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });

      const data = await response.json();
      console.log("📥 API response:", data);

      if (data.success) {
        console.log("✅ Lesson added successfully!");
        alert("✅ Lesson added successfully!");

        // Reset modal state
        setShowAddModal(false);
        setNewLesson({
          title: "",
          content_type: "video",
          video_source: "youtube",
          video_url: "",
          uploaded_file_url: null,
        });

        // ✅ FIX 2: Fetch lessons immediately after successful add
        console.log("🔄 Refetching lessons...");
        await fetchLessons();
      } else {
        console.error("❌ Failed to add lesson:", data);
        alert("❌ Failed to add lesson: " + (data.error || data.message));
      }
    } catch (error) {
      console.error("❌ Error adding lesson:", error);
      alert("❌ Error: " + error.message);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!confirm("⚠️ Delete this lesson?")) return;

    try {
      console.log("🗑️ Deleting lesson:", lessonId);
      const response = await fetch("/api/courses/delete-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId }),
      });

      const data = await response.json();
      console.log("📥 Delete response:", data);

      if (data.success) {
        alert("✅ Lesson deleted!");
        await fetchLessons();
      } else {
        alert("❌ Failed to delete lesson");
      }
    } catch (error) {
      console.error("❌ Error deleting lesson:", error);
      alert("❌ Error: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-blue-600" size={48} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="w-full md:max-w-[90%] mx-auto mt-8 md:mt-[70px]">
        <div className="mb-8 md:mb-12 mt-[40px]">
          <button
            onClick={() => router.push("/admin/courses")}
            className="flex items-center gap-2 md:gap-3 text-gray-500 hover:text-gray-900 mb-4 md:mb-6 transition-colors text-base md:text-lg font-medium"
          >
            <ArrowLeft size={20} className="md:w-6 md:h-6" />
            Back to Courses
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2 leading-tight">
                Manage Course Lessons
              </h1>
              <p className="text-gray-500 text-lg md:text-xl font-semibold">{course?.title}</p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 font-bold text-base md:text-lg w-full md:w-auto"
            >
              <Plus size={20} className="md:w-6 md:h-6" />
              Add New Lesson
            </button>
          </div>
        </div>

        {/* ✅ FIX 3: Better empty state and lesson count display */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8 md:mb-12">
          <div className="p-5 md:p-8 border-b bg-gray-50/30 flex justify-between items-center">
            <p className="text-lg md:text-xl text-gray-800 font-bold">
              Total Lessons: <span className="text-blue-600">{lessons.length}</span>
            </p>
          </div>

          {lessons.length === 0 ? (
            <div className="p-16 md:p-32 text-center">
              <p className="text-gray-400 text-xl md:text-2xl font-medium mb-4">
                No lessons yet. Let's add your first one!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:gap-6 p-4 md:p-8">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="group bg-white border-2 border-gray-50 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-8 relative z-10">
                    <div className="flex items-start sm:items-center gap-4 md:gap-8 flex-1">
                      <div className="bg-blue-50 p-4 md:p-6 rounded-xl md:rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
                        {lesson.content_type === "video" ? (
                          <Video size={28} className="md:w-9 md:h-9" />
                        ) : (
                          <FileText size={28} className="md:w-9 md:h-9" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-1 md:mb-2">
                          <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
                            Lesson {index + 1}
                          </span>
                          <span className="text-[10px] md:text-sm font-bold text-gray-300 uppercase tracking-wider">
                            {lesson.content_type === "video" ? (lesson.video_url ? "YouTube" : "Uploaded Video") : "PDF"}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-blue-700 transition-colors leading-tight truncate">
                          {lesson.title}
                        </h3>

                        <div className="mt-2 md:mt-4">
                          {lesson.file_url ? (
                            <a
                              href={lesson.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 md:gap-3 text-sm md:text-base text-blue-600 hover:text-blue-800 font-extrabold transition-all group/link"
                            >
                              <div className="bg-blue-50 p-1.5 md:p-2 rounded-lg group-hover/link:bg-blue-100 transition-colors">
                                <Upload size={16} className="md:w-5 md:h-5" />
                              </div>
                              Access Material
                            </a>
                          ) : lesson.video_url ? (
                            <div className="flex items-center gap-2 text-gray-400">
                                <Monitor size={14} className="md:w-4 md:h-4 shrink-0" />
                                <p className="text-xs md:text-sm font-medium tracking-tight truncate max-w-[200px] md:max-w-md">
                                    {lesson.video_url}
                                </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="self-end sm:self-center text-gray-300 hover:text-red-600 p-3 md:p-4 hover:bg-red-50 rounded-xl md:rounded-2xl transition-all duration-300"
                      title="Delete Lesson"
                    >
                      <Trash2 size={24} className="md:w-7 md:h-7" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Lesson Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300 pt-[100px]">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full p-8 md:p-12 max-h-[60vh] overflow-y-auto border border-gray-100 flex flex-col relative">
            <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter leading-none">Add New Lesson</h2>

            <div className="space-y-5 md:space-y-6">
              {/* Lesson Title */}
              <div>
                <label className="block text-sm md:text-base font-bold text-gray-800 mb-2 md:mb-3">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, title: e.target.value })
                  }
                  placeholder="e.g., Introduction to React Hooks"
                  className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base md:text-lg transition-all"
                />
              </div>

              {/* Content Type */}
              <div>
                <label className="block text-sm md:text-base font-bold text-gray-800 mb-3 md:mb-4">
                  Content Type *
                </label>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setNewLesson({
                        ...newLesson,
                        content_type: "video",
                        video_source: "youtube",
                        video_url: "",
                        uploaded_file_url: null,
                      })
                    }
                    className={`p-4 md:p-6 border-2 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 md:gap-3 ${
                      newLesson.content_type === "video"
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-gray-100 bg-gray-50/50 hover:bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Video size={24} className="md:w-8 md:h-8" />
                    <p className="text-sm md:text-base font-bold">Video Lesson</p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setNewLesson({
                        ...newLesson,
                        content_type: "pdf",
                        video_source: "youtube",
                        video_url: "",
                        uploaded_file_url: null,
                      })
                    }
                    className={`p-4 md:p-6 border-2 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 md:gap-3 ${
                      newLesson.content_type === "pdf"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm"
                        : "border-gray-100 bg-gray-50/50 hover:bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FileText size={24} className="md:w-8 md:h-8" />
                    <p className="text-sm md:text-base font-bold">PDF Document</p>
                  </button>
                </div>
              </div>

              {/* Video Source (only show if content type is video) */}
              {newLesson.content_type === "video" && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                  <label className="block text-sm md:text-base font-bold text-gray-800 mb-3 md:mb-4">
                    Video Source *
                  </label>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setNewLesson({
                          ...newLesson,
                          video_source: "youtube",
                          uploaded_file_url: null,
                        })
                      }
                      className={`p-4 md:p-5 border-2 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 ${
                        newLesson.video_source === "youtube"
                          ? "border-red-600 bg-red-50 text-red-700"
                          : "border-gray-100 bg-gray-50/50 hover:bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Youtube size={20} className="md:w-6 md:h-6" />
                      <p className="text-sm md:text-base font-bold">YouTube</p>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setNewLesson({
                          ...newLesson,
                          video_source: "upload",
                          video_url: "",
                        })
                      }
                      className={`p-4 md:p-5 border-2 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 ${
                        newLesson.video_source === "upload"
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-gray-100 bg-gray-50/50 hover:bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Monitor size={20} className="md:w-6 md:h-6" />
                      <p className="text-sm md:text-base font-bold">Upload MP4</p>
                    </button>
                  </div>
                </div>
              )}

              {/* YouTube URL Input */}
              {newLesson.content_type === "video" &&
                newLesson.video_source === "youtube" && (
                  <div className="animate-in slide-in-from-top-4 duration-300">
                    <label className="block text-base font-bold text-gray-800 mb-3">
                      YouTube Embed URL *
                    </label>
                    <input
                      type="text"
                      value={newLesson.video_url}
                      onChange={(e) =>
                        setNewLesson({
                          ...newLesson,
                          video_url: e.target.value,
                        })
                      }
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-base"
                    />
                    <p className="text-xs text-gray-400 mt-2 italic px-1">
                      Pro tip: Right-click video → Copy embed code → extract the link inside src="..."
                    </p>
                  </div>
                )}

              {/* File Upload (for uploaded videos or PDFs) */}
              {((newLesson.content_type === "video" &&
                newLesson.video_source === "upload") ||
                newLesson.content_type === "pdf") && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                  <label className="block text-base font-bold text-gray-800 mb-3">
                    Upload {newLesson.content_type === "video" ? "Video" : "PDF"} File *
                  </label>

                  {newLesson.uploaded_file_url && (
                    <div className="mb-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 p-2 rounded-full text-white">
                          <Plus size={18} className="rotate-45" /> {/* Using check replacement */}
                        </div>
                        <div>
                          <p className="text-sm text-emerald-800 font-bold">
                            File uploaded successfully!
                          </p>
                          <a
                            href={newLesson.uploaded_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            Preview uploaded file
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <label
                    className={`group block w-full px-6 py-10 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all ${
                      uploading
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                        : "border-blue-200 hover:border-blue-500 hover:bg-blue-50/50"
                    } ${newLesson.uploaded_file_url ? "border-emerald-300 bg-emerald-50/20" : ""}`}
                  >
                    <input
                      type="file"
                      accept={
                        newLesson.content_type === "video"
                          ? "video/*"
                          : ".pdf,application/pdf"
                      }
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-3">
                      {uploading ? (
                        <>
                          <Loader className="animate-spin text-blue-600 mb-2" size={40} />
                          <p className="text-base font-bold text-gray-700">
                            Uploading... {uploadProgress}%
                          </p>
                          <div className="w-full max-w-xs bg-gray-200 rounded-full h-3 mt-1 overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <Upload size={32} />
                          </div>
                          <p className="text-lg font-bold text-gray-800 mt-2">
                            {newLesson.uploaded_file_url ? "Change Selected File" : `Select ${newLesson.content_type === "video" ? "Video" : "PDF"} File`}
                          </p>
                          <p className="text-sm text-gray-500 tracking-wide">
                            {newLesson.content_type === "video" ? "MP4, MOV up to 200MB" : "PDF documents up to 20MB"}
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewLesson({
                      title: "",
                      content_type: "video",
                      video_source: "youtube",
                      video_url: "",
                      uploaded_file_url: null,
                    });
                  }}
                  className="flex-1 px-6 md:px-8 py-3.5 md:py-4 border-2 border-gray-100 rounded-xl md:rounded-2xl font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all text-sm md:text-base order-2 sm:order-1"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLesson}
                  className="flex-1 px-6 md:px-8 py-3.5 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl font-extrabold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed text-sm md:text-base order-1 sm:order-2"
                  disabled={uploading}
                >
                  Add This Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
