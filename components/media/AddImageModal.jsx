"use client";
import { useState, useEffect } from "react";
import { X, Upload, Loader } from "lucide-react";

export default function AddImageModal({ isOpen, onClose, onImageAdded }) {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load Cloudinary widget script
    if (typeof window !== "undefined" && !window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleBrowse = () => {
    setUploading(true);

    window.cloudinary.openUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
        multiple: false,
        maxFiles: 1,
        resourceType: "image",
      },
      (error, result) => {
        setUploading(false);

        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        } else if (error) {
          console.error("Upload error:", error);
          alert("Upload failed. Please try again.");
        }
      },
    );
  };

  const handleSave = async () => {
    if (!imageUrl) {
      alert("Please select an image first!");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          title: title || null,
          description: description || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Image added successfully!");
        onImageAdded();
        handleClose();
      } else {
        alert("Failed to save image");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Error saving image");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setImageUrl("");
    setTitle("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt-[110px] max-[1099px]:mt-[100px]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Image</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image *
            </label>

            <button
              type="button"
              onClick={handleBrowse}
              disabled={uploading}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-all flex flex-col items-center justify-center gap-3"
            >
              {uploading ? (
                <>
                  <Loader className="animate-spin text-blue-600" size={48} />
                  <span className="text-gray-600">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="text-gray-400" size={48} />
                  <span className="text-gray-600 font-medium">
                    Click to browse images
                  </span>
                  <span className="text-sm text-gray-500">
                    From your computer, camera, or URL
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border-2 border-green-500"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                ✓ Uploaded
              </div>
            </div>
          )}

          {/* Title Input (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description Input (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter image description..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!imageUrl || saving}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Saving...
                </>
              ) : (
                "Add Image"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
