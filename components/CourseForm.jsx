"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

export default function CourseForm({ course, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    course || {
      title: "",
      category: "Business",
      duration: "",
      image: "",
      description: "",
      instructor: "",
      price: "$99",
      modules: [""]
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  const updateModule = (index, value) => {
    const newModules = [...formData.modules];
    newModules[index] = value;
    setFormData({ ...formData, modules: newModules });
  };

  const addModule = () => {
    setFormData({ ...formData, modules: [...formData.modules, ""] });
  };

  const removeModule = index => {
    const newModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: newModules });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full my-8 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold">
            {course ? "✏️ Edit Course" : "➕ Create New Course"}
          </h2>
          <button
            onClick={onCancel}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5 max-h-[calc(90vh-180px)] overflow-y-auto">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Complete Web Development Bootcamp"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={e =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Programming"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={e =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="e.g., 8 weeks or 40 hours"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price * (e.g., $99 or ₦50000)
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={e =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="$99"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Instructor Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.instructor}
                  onChange={e =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  placeholder="e.g., Dr. Sarah Johnson"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={e =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://example.com/course-image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use Unsplash or any image hosting service
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Describe what students will learn in this course..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Modules
              </label>
              {formData.modules.map((module, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={module}
                    onChange={e => updateModule(index, e.target.value)}
                    placeholder={`Module ${index +
                      1}: e.g., Introduction to React`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.modules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModule(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addModule}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2 font-semibold"
              >
                <Plus size={18} /> Add Another Module
              </button>
            </div>
          </div>

          <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "⏳ Saving..."
                : course
                ? "✅ Update Course"
                : "✅ Create Course"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
