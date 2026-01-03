"use client";

import { Users, Clock, Edit, Trash2 } from "lucide-react";

export default function CourseCard({ course, onEdit, onDelete, isAdmin }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
          {course.category}
        </span>
        <span className="absolute top-3 right-3 bg-green-600 text-white text-sm px-4 py-1 rounded-full font-bold shadow-lg">
          {course.price}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-800 mb-2 text-lg h-14 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b">
          <div className="flex items-center gap-1">
            <Users size={16} className="text-blue-600" />
            <span>{course.students} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-blue-600" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {!isAdmin && (
            <a
              href={`/courses/${course.id}`}
              className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold text-center"
            >
              View Details
            </a>
          )}

          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(course)}
                className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => onDelete(course.id)}
                className="bg-red-100 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
