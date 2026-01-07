import { NextResponse } from "next/server";
import { db } from "../../../../lib/supabase";
import { isAdmin } from "../../../../lib/auth";

// GET single course (anyone can access)
export async function GET(request, { params }) {
  try {
    // Await params in Next.js 15+
    const { id } = await params;

    const course = await db.getCourse(id);

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT update course (admin only)
export async function PUT(request, { params }) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Admin only" },
        { status: 401 }
      );
    }

    // Await params in Next.js 15+
    const { id } = await params;
    const body = await request.json();
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
      modules: body.modules || []
    };

    const course = await db.updateCourse(id, courseData);

    return NextResponse.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE course (admin only)
export async function DELETE(request, { params }) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Admin only" },
        { status: 401 }
      );
    }

    // Await params in Next.js 15+
    const { id } = await params;

    await db.deleteCourse(id);

    return NextResponse.json({
      success: true,
      data: { message: "Course deleted successfully" }
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
