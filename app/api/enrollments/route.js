import { NextResponse } from "next/server";
import { db } from "../../../lib/supabase";
import { isAdmin } from "../../../lib/auth";

// GET enrollments
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email");

    // Admin can see all enrollments
    if (isAdmin(request)) {
      const enrollments = await db.getAllEnrollments();
      return NextResponse.json({
        success: true,
        data: enrollments
      });
    }

    // Regular users need to provide email
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "Email required" },
        { status: 400 }
      );
    }

    const enrollments = await db.getUserEnrollments(userEmail);

    return NextResponse.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT update enrollment (admin only - for approving payments)
export async function PUT(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Admin only" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { enrollmentId, paymentStatus, accessGranted } = body;

    const enrollment = await db.updateEnrollment(enrollmentId, {
      payment_status: paymentStatus,
      access_granted: accessGranted
    });

    // If payment approved, increase student count
    if (accessGranted && paymentStatus === "completed") {
      await db.incrementStudents(enrollment.course_id);
    }

    return NextResponse.json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
