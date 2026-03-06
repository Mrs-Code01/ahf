"use client";

export default function AddImageButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 font-bold flex items-center gap-2 z-50"
    >
      <span className="text-2xl">+</span>
      <span>Add Image</span>
    </button>
  );
}
