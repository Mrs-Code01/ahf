"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

const primaryBlue = "#2563eb";

const courseData = [
  {
    id: 1,
    cat: "Handicraft",
    title: "Izal Production",
    // Use the full URL format for the native video tag
    videoUrl:
      "https://res.cloudinary.com/diuci80dx/video/upload/v1769692714/Izal_Production_20260118_1_s2uhx7.mp4",
  },
];

// Preview window: 9:00 – 10:00
const PREVIEW_START = 540;
const PREVIEW_END = 600;

const FeaturedCourses = () => {
  const [lockedCourses, setLockedCourses] = useState({});
  const videoRefs = useRef({});

  // Jump to the 9-minute mark as soon as metadata is ready
  const handleLoadedMetadata = (e) => {
    e.currentTarget.currentTime = PREVIEW_START;
  };

  const handleTimeUpdate = (e, courseId) => {
    const video = e.currentTarget;
    const currentTime = video.currentTime;

    // Prevent scrubbing before the preview window
    if (currentTime < PREVIEW_START) {
      video.currentTime = PREVIEW_START;
    }

    // Hard stop at 10 minutes
    if (currentTime >= PREVIEW_END) {
      video.pause();
      video.currentTime = PREVIEW_END;
      setLockedCourses((prev) => ({ ...prev, [courseId]: true }));

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <section className="w-[90%] py-32 flex flex-col items-center mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <p
          style={{ color: primaryBlue }}
          className="font-black uppercase text-[1.1rem] tracking-[3px] mb-4"
        >
          Top Courses From Experts
        </p>
        <h2 className="text-[3.5rem] font-bold">Our Featured Courses</h2>
        <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
      </div>

      <div className="w-full flex flex-row flex-wrap justify-center gap-10">
        {courseData.map((course) => (
          <div
            key={course.id}
            className="w-[31%] max-[1130px]:w-[47%] max-[600px]:w-full bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 relative"
          >
            <div className="w-full h-[250px] relative bg-black">
              {/* PREMIUM OVERLAY */}
              {lockedCourses[course.id] && (
                <div className="absolute inset-0 z-20 bg-slate-900/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">
                    Preview Finished
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Switch to premium to unlock courses.
                  </p>
                  <Link
                    href="/courses"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-700"
                  >
                    Go Premium
                  </Link>
                </div>
              )}

              {/* NATIVE VIDEO TAG - Most reliable for React 19 */}
              <video
                ref={(el) => (videoRefs.current[course.id] = el)}
                src={course.videoUrl}
                controls
                className="w-full h-full object-cover"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={(e) => handleTimeUpdate(e, course.id)}
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* BLUR OVERLAY — clean blur over ingredient text, fades in from left */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "62%",
                  height: "90%",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  maskImage: "linear-gradient(to right, transparent 0%, black 18%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%)",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
            </div>

            <div className="p-8 flex flex-col gap-4">
              <p
                style={{ color: primaryBlue }}
                className="text-[1.1rem] font-black uppercase tracking-widest"
              >
                {course.cat}
              </p>
              <h4 className="text-[1.8rem] font-bold text-slate-900 leading-tight">
                {course.title}
              </h4>
              <div className="w-full h-[1px] bg-gray-100 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold">Admin</span>
                <span className="text-blue-600 font-black text-lg">
                  1 MIN PREVIEW
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
