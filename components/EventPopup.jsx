"use client";
// components/EventPopup.jsx
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Calendar, MapPin, Heart } from "lucide-react";

export default function EventPopup() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const json = await res.json();
      if (json.success && json.data.length > 0) {
        setEvents(json.data);
        setTimeout(() => setIsOpen(true), 800);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const close = useCallback(() => setIsOpen(false), []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) close();
  };

  const copyAccountNumber = (number) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen || events.length === 0) return null;

  const event = events[currentIndex];
  const hasMultiple = events.length > 1;

  return (
    <>
      {/* Only animations need this — everything else is Tailwind */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(40px) scale(0.96); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        .ep-overlay { animation: fadeIn 0.35s ease forwards; }
        .ep-modal { animation: slideUp 0.4s cubic-bezier(0.22, 0.68, 0, 1.2) forwards; }
      `}</style>

      {/* OVERLAY */}
      <div
        onClick={handleOverlayClick}
        className="ep-overlay fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/70 backdrop-blur-sm"
      >
        {/* MODAL */}
        <div className="ep-modal relative w-[40%] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-[900px]:w-[60%] max-[550px]:w-[95%] max-h-[92vh] max-[550px]:max-h-[85vh]">
          {/* ── HEADER ── */}
          <div
            className="relative flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#1a3a2a] via-[#2d6a4f] to-[#52b788]"
            style={{ height: "270px" }}
          >
            {event.image_url && (
              <>
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover object-top absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
              </>
            )}

            {/* Nav dots */}
            {hasMultiple && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {events.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="h-1.5 rounded-full transition-all duration-200"
                    style={{
                      width: i === currentIndex ? "16px" : "6px",
                      background:
                        i === currentIndex
                          ? "#fbbf24"
                          : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Badge */}
            <span className="font-catamaran absolute bottom-4 left-4 z-10 text-[1.3rem] font-bold tracking-widest uppercase px-3 py-2 rounded-full bg-[#E32227] text-[#ffffff]">
              {event.badge_label}
            </span>

            {/* Close ✕ */}
            <button
              onClick={close}
              className="absolute top-10 right-10 z-10 w-[4px] h-[4px] rounded-full flex items-center justify-center text-white text-[20px] transition-colors cursor-pointer"
              style={{ background: "rgba(0,0,0,0.4)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.4)")
              }
            >
              ✕
            </button>
          </div>

          {/* ── SCROLLABLE BODY ── */}
          <div className="overflow-y-auto flex-1 px-5 pt-5 pb-2 space-y-3">
            {/* Title + subtitle */}
            <div>
              <h2
                className="font-catamaran text-[2.2rem] font-bold leading-snug"
                style={{ color: "#1a2a1a" }}
              >
                {event.title}
              </h2>
              {event.subtitle && (
                <p className="font-raleway text-[1.3rem] font-semibold mt-0.5 text-[#4169E1]">
                  {event.subtitle}
                </p>
              )}
            </div>

            {/* Date */}
            <div
              className="flex items-start gap-3 rounded-xl p-3"
              style={{ background: "#fafafa", border: "1px solid #000000" }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm">
                <Calendar size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[1.3rem] font-bold tracking-widest uppercase mb-0.5">
                  Date
                </p>
                <p className="text-[1.2rem]" style={{ color: "#2d3a2d" }}>
                  {event.date_text}
                </p>
              </div>
            </div>

            {/* Location */}
            <div
              className="flex items-start gap-3 rounded-xl p-3"
              style={{ background: "#fafafa", border: "1px solid #000000" }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[1.3rem] font-bold tracking-widest uppercase mb-0.5">
                  Location
                </p>
                <p className="text-[1.2rem]">{event.location}</p>
              </div>
            </div>

            {/* Activities */}
            {event.activities?.length > 0 && (
              <div
                className="flex items-start gap-3 rounded-xl p-3"
                style={{ background: "#fafafa", border: "1px solid #000000" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm">
                  <Heart size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[1.3rem] font-bold tracking-widest uppercase mb-0.5">
                    Activities
                  </p>
                  <p className="text-[1.2rem]" style={{ color: "#2d3a2d" }}>
                    {event.activities.join(" · ")}
                  </p>
                </div>
              </div>
            )}

            {/* Account details */}
            {event.account_number && (
              <div
                className="rounded-xl p-4"
                style={{ background: "#fafafa", border: "1px solid #000000" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[1.3rem] font-bold tracking-widest uppercase"
                    style={{ color: "#2d6a4f" }}
                  >
                    Support Account Details
                  </span>
                  <button
                    onClick={() => copyAccountNumber(event.account_number)}
                    className="flex items-center gap-1 text-[1rem] font-medium px-2 py-1 rounded-md border transition-colors"
                    style={{
                      background: copied ? "#d8f3dc" : "#fff",
                      borderColor: copied ? "#52b788" : "#b7e4c7",
                      color: "#2d6a4f",
                    }}
                  >
                    {copied ? "✓ Copied!" : "⧉ Copy"}
                  </button>
                </div>
                {event.account_name && (
                  <p className="text-[1.3rem] text-gray-600 mb-1">
                    Account Name:{" "}
                    <strong className="text-gray-900">
                      {event.account_name}
                    </strong>
                  </p>
                )}
                <p className="text-[1.3rem] text-gray-600 mb-1">
                  Account Number:{" "}
                  <strong className="text-gray-900">
                    {event.account_number}
                  </strong>
                </p>
                {event.bank_name && (
                  <p className="text-[1.2rem] text-gray-600">
                    Bank:{" "}
                    <strong className="text-gray-900">{event.bank_name}</strong>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ── PREV / NEXT ── */}
          {hasMultiple && (
            <div className="flex items-center justify-between px-5 py-2">
              <button
                onClick={() => setCurrentIndex((i) => i - 1)}
                disabled={currentIndex === 0}
                className="text-sm font-medium rounded-lg px-4 py-1.5 transition-colors disabled:opacity-30"
                style={{
                  background: "#f0f9f3",
                  border: "1px solid #d8f3dc",
                  color: "#2d6a4f",
                }}
              >
                ← Prev
              </button>
              <span
                className="text-xs font-medium"
                style={{ color: "#74c69d" }}
              >
                {currentIndex + 1} / {events.length}
              </span>
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                disabled={currentIndex === events.length - 1}
                className="text-sm font-medium rounded-lg px-4 py-1.5 transition-colors disabled:opacity-30"
                style={{
                  background: "#f0f9f3",
                  border: "1px solid #d8f3dc",
                  color: "#2d6a4f",
                }}
              >
                Next →
              </button>
            </div>
          )}

          {/* ── FOOTER CTA ── */}
          <div className="px-5 pb-5 pt-2 flex-shrink-0">
            <button
              onClick={close}
              className="w-full rounded-xl py-3.5 px-5 text-center transition-transform hover:-translate-y-0.5 bg-[#4169E1]"
            >
              <span
                className="block text-white font-bold text-[1.3rem] cursor-pointer"
                onClick={() => router.push(`/get-involved/volunteer`)}
              >
                {event.cta_text}
              </span>
              {/* <span className="block text-white/70 text-xs mt-0.5">
                {event.cta_subtext}
              </span> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
