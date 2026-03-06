"use client";

import { useState, useEffect } from "react";
import { X, Video, FileText, Upload, Loader } from "lucide-react";

export default function CourseForm({ course, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    duration: "",
    image: "",
    description: "",
    instructor: "",
    price: "",
    price_amount: "",
    course_type: "video",
    modules: [""],
  });

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        category: course.category || "",
        duration: course.duration || "",
        image: course.image || "",
        description: course.description || "",
        instructor: course.instructor || "",
        price: course.price || "",
        price_amount: course.price_amount || "",
        course_type: course.course_type || "video",
        modules: course.modules || [""],
      });
      setImagePreview(course.image || "");
    }
  }, [course]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("❌ Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("❌ Image must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
        alert("✅ Image uploaded successfully!");
      } else {
        alert("❌ Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredModules = formData.modules.filter((m) => m.trim() !== "");

    const courseData = {
      ...formData,
      modules: filteredModules,
      price_amount: parseFloat(formData.price_amount),
    };

    onSave(courseData);
  };

  const addModule = () => {
    setFormData({ ...formData, modules: [...formData.modules, ""] });
  };

  const removeModule = (index) => {
    const newModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: newModules });
  };

  const updateModule = (index, value) => {
    const newModules = [...formData.modules];
    newModules[index] = value;
    setFormData({ ...formData, modules: newModules });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300 pt-[100px]">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[60vh] overflow-hidden flex flex-col border border-gray-100">
        <div className="p-8 md:p-12 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
            {course ? "Edit Course" : "Add New Course"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 md:p-12 space-y-8 overflow-y-auto"
        >
          {/* Course Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Type *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.course_type === "video"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-300"
                }`}
              >
                <input
                  type="radio"
                  name="course_type"
                  value="video"
                  checked={formData.course_type === "video"}
                  onChange={(e) =>
                    setFormData({ ...formData, course_type: e.target.value })
                  }
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <Video
                    className={
                      formData.course_type === "video"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }
                    size={24}
                  />
                  <div>
                    <p
                      className={`font-semibold ${formData.course_type === "video" ? "text-blue-900" : "text-gray-700"}`}
                    >
                      Video Course
                    </p>
                    <p className="text-xs text-gray-500">Video lessons</p>
                  </div>
                </div>
              </label>

              <label
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.course_type === "pdf"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="course_type"
                  value="pdf"
                  checked={formData.course_type === "pdf"}
                  onChange={(e) =>
                    setFormData({ ...formData, course_type: e.target.value })
                  }
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <FileText
                    className={
                      formData.course_type === "pdf"
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                    size={24}
                  />
                  <div>
                    <p
                      className={`font-semibold ${formData.course_type === "pdf" ? "text-green-900" : "text-gray-700"}`}
                    >
                      PDF/Book Course
                    </p>
                    <p className="text-xs text-gray-500">Downloadable PDFs</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="outline-[0] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Complete React Development Course"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="outline-[0] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Web Development, Business, Design"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
              className="outline-[0] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide a detailed description of what students will learn in this course..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Write a comprehensive description explaining the course content,
              benefits, and what makes it valuable.
            </p>
          </div>

          {/* Image Upload - UPDATED SECTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Thumbnail Image *
            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-[250px] object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            )}

            {/* Upload Button */}
            <label
              className={`block w-full px-4 py-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all ${
                uploading
                  ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                  : "border-blue-300 hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                {uploading ? (
                  <>
                    <Loader className="animate-spin text-blue-600" size={32} />
                    <p className="text-sm text-gray-600">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Upload className="text-blue-600" size={32} />
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload image from your device
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </>
                )}
              </div>
            </label>

            {/* Manual URL Input (Optional) */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">
                Or paste an image URL:
              </p>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => {
                  setFormData({ ...formData, image: e.target.value });
                  setImagePreview(e.target.value);
                }}
                className="outline-[0] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Rest of the form fields remain the same */}
          {/* Instructor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructor Name *
            </label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              className="outline-[0] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., John Doe"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration *
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="outline-[0] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 12 hours, 4 weeks, 200 pages"
              required
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (Display) *
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="outline-[0] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., ₦15,000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Amount (Number) *
              </label>
              <input
                type="number"
                value={formData.price_amount}
                onChange={(e) =>
                  setFormData({ ...formData, price_amount: e.target.value })
                }
                className="outline-[0] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                placeholder="15000"
                required
              />
            </div>
          </div>

          {/* Modules */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What Students Will Learn (Optional)
            </label>
            <div className="space-y-2">
              {formData.modules.map((module, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={module}
                    onChange={(e) => updateModule(index, e.target.value)}
                    className="outline-[0] flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Module ${index + 1}: e.g., Master React Hooks`}
                  />
                  {formData.modules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModule(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addModule}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Module
            </button>
          </div>

          <div className="flex gap-4 pt-8 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 text-lg shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold text-lg shadow-lg hover:shadow-blue-200"
              disabled={uploading}
            >
              {course ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
