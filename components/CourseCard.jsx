"use client";
import { useRouter } from "next/navigation";
import { Edit, Trash2, BookOpen } from "lucide-react";

export default function CourseCard({ course, onEdit, onDelete, isAdmin }) {
  const router = useRouter();

  const handleClick = () => {
    if (!isAdmin) {
      router.push(`/courses/${course.id}`);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 group">
      <div
        onClick={handleClick}
        className={`flex flex-col h-full ${!isAdmin ? "cursor-pointer" : ""}`}
      >
        {/* Course Image - Full width and High Impact */}
        <div className="relative h-64 overflow-hidden">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1E293B] to-[#334155] flex items-center justify-center">
              <BookOpen className="text-white opacity-30" size={80} />
            </div>
          )}
          
          {/* Price Badge - Pinned to Image */}
          <div className="absolute top-6 right-6 bg-[#000000] text-white px-6 py-2.5 rounded-2xl shadow-2xl border border-white/20">
            <span className="text-xl tracking-tighter">
              ₦ {course.price_amount?.toLocaleString() || course.price}
            </span>
          </div>

          {/* Overlay Gradient for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Course Content */}
        <div className="p-8 md:p-10 flex flex-col flex-1">
          <div className="mb-4">
            <span className="text-base md:text-lg font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
              {course.category}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 line-clamp-2 tracking-tighter leading-[1.1]">
            {course.title}
          </h3>

          <p className="text-gray-600 text-lg md:text-xl mb-6 line-clamp-3 font-medium leading-relaxed whitespace-pre-wrap">
            {course.description}
          </p>

          {/* Bottom Section - Pushed to Bottom of Card */}
          <div className="mt-auto space-y-8">
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-lg md:text-xl text-gray-400 font-bold tracking-tight">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                {course.instructor}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                {course.duration}
              </span>
            </div>

            {course.students > 0 && (
              <div className="text-base md:text-lg text-gray-300 font-black uppercase tracking-[0.2em]">
                {course.students} {course.students === 1 ? "student enrolled" : "students enrolled"}
              </div>
            )}

            {!isAdmin && (
              <button
                onClick={handleClick}
                className="w-full bg-[#4169E1] text-white py-5 rounded-[1.5rem] transition-all font-black text-xl cursor-pointer shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] border border-blue-400/20"
              >
                View Details & Enroll
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Admin Buttons - Pinned to Bottom */}
      {isAdmin && (
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3 mt-auto">
          <button
            onClick={() => router.push(`/admin/courses/${course.id}/lessons`)}
            className="flex-1 bg-purple-600 text-white px-3 py-[8px] rounded-lg hover:bg-purple-700 transition-all font-medium flex items-center justify-center gap-2 text-sm"
          >
            <BookOpen size={16} />
            Lessons
          </button>

          <button
            onClick={() => onEdit(course)}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2 text-sm"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete(course.id)}
            className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-all font-medium flex items-center justify-center gap-2 text-sm"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
