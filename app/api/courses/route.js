import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

// GET all courses (anyone can access)
export async function GET() {
  try {
    const courses = await db.getCourses();

    return NextResponse.json({
      success: true,
      data: courses
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// POST create new course (admin only)
export async function POST(request) {
  try {
    // Check if user is admin
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Admin only" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Extract number from price string (e.g., "$99" or "₦50000" → 99 or 50000)
    const priceAmount = parseFloat(body.price.replace(/[^0-9.]/g, ""));

    const courseData = {
      title: body.title,
      category: body.category,
      duration: body.duration,
      image: body.image,
      description: body.description,
      instructor: body.instructor,
      price: body.price,
      price_amount: priceAmount,
      modules: body.modules || [],
      students: 0
    };

    const course = await db.createCourse(courseData);

    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
