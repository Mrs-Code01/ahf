import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ✅ FIX: Disable body size limit for large file uploads (Next.js App Router)
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

// ✅ FIX: Also set runtime to nodejs and maxDuration for large uploads
export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds max for upload

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const fileType = formData.get("fileType"); // "video" or "pdf"

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Validate file type
    if (fileType === "pdf" && file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF files are allowed" },
        { status: 400 },
      );
    }

    if (fileType === "video" && !file.type.startsWith("video/")) {
      return NextResponse.json(
        { success: false, error: "Only video files are allowed" },
        { status: 400 },
      );
    }

    // Validate file size
    const maxSize = fileType === "video" ? 200 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > maxSize) {
      const maxSizeMB = fileType === "video" ? "200MB" : "20MB";
      return NextResponse.json(
        { success: false, error: `File must be less than ${maxSizeMB}` },
        { status: 400 },
      );
    }

    // ✅ FIX: Use stream upload instead of base64 to avoid memory issues with large files
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadOptions = {
      folder: fileType === "video" ? "course-videos" : "course-pdfs",
      resource_type: fileType === "video" ? "video" : "raw",
      chunk_size: 6 * 1024 * 1024, // 6MB chunks for large video uploads
      timeout: 120000, // 2 minute timeout
    };

    // Upload using stream (buffer) — avoids base64 size inflation
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
