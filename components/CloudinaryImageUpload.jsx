"use client";
// components/CloudinaryImageUpload.jsx
// Uses your existing /api/upload route

import { useState, useRef } from "react";

export default function CloudinaryImageUpload({
  value,
  onChange,
  label = "Image",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(value || "");
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    // Show instant local preview while uploading
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setPreview(data.url);
        onChange(data.url); // sends the Cloudinary URL up to your form
      } else {
        setError(data.error || "Upload failed. Please try again.");
        setPreview(value || "");
      }
    } catch (err) {
      setError("Upload failed. Check your internet connection.");
      setPreview(value || "");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      {/* Label */}
      <label
        style={{
          display: "block",
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "#374151",
          marginBottom: "6px",
        }}
      >
        {label}
      </label>

      {preview ? (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            width: "100%",
          }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "100%",
              maxWidth: "340px",
              height: "190px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "2px solid #e5ede8",
              display: "block",
            }}
          />

          {/* Uploading spinner overlay */}
          {uploading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  border: "3px solid rgba(255,255,255,0.3)",
                  borderTop: "3px solid #fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Uploading to Cloudinary...
            </div>
          )}

          {/* Change / Remove buttons */}
          {!uploading && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                display: "flex",
                gap: "6px",
              }}
            >
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "none",
                  borderRadius: "7px",
                  padding: "6px 12px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#2d6a4f",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              >
                📷 Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                style={{
                  background: "rgba(220,38,38,0.88)",
                  border: "none",
                  borderRadius: "7px",
                  padding: "6px 12px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              >
                ✕ Remove
              </button>
            </div>
          )}

          {/* Saved indicator */}
          {!uploading && preview && !preview.startsWith("blob:") && (
            <div
              style={{
                marginTop: "6px",
                fontSize: "0.72rem",
                color: "#2d6a4f",
                fontWeight: 500,
              }}
            >
              ✅ Saved to Cloudinary
            </div>
          )}
        </div>
      ) : (
        /* Upload zone - no image yet */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            width: "100%",
            maxWidth: "340px",
            height: "150px",
            border: "2px dashed #b7e4c7",
            borderRadius: "12px",
            background: "#fafcfb",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#f0f9f3";
            e.currentTarget.style.borderColor = "#52b788";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#fafcfb";
            e.currentTarget.style.borderColor = "#b7e4c7";
          }}
        >
          <span style={{ fontSize: "2.2rem" }}>📷</span>
          <span
            style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2d6a4f" }}
          >
            Tap to select image
          </span>
          <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
            Opens your gallery or camera on phone
          </span>
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: "8px",
            padding: "8px 12px",
            background: "#fee2e2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            color: "#dc2626",
            fontSize: "0.8rem",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
