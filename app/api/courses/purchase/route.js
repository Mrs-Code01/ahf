import { NextResponse } from "next/server";
import { db } from "../../../../lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      courseId,
      userEmail,
      userName,
      paymentMethod,
      transactionReference
    } = body;

    // Check required fields
    if (!courseId || !userEmail || !userName) {
      return NextResponse.json(
        { success: false, error: "Please provide name, email, and course" },
        { status: 400 }
      );
    }

    // Get course details
    const course = await db.getCourse(courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await db.checkEnrollment(userEmail, courseId);
    if (existingEnrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "You are already enrolled in this course",
          enrollment: existingEnrollment
        },
        { status: 400 }
      );
    }

    // Generate random access code
    const accessCode =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    // Create enrollment
    const enrollmentData = {
      user_email: userEmail.toLowerCase(),
      user_name: userName,
      course_id: courseId,
      course_name: course.title,
      amount_paid: course.price_amount,
      payment_method: paymentMethod || "bank_transfer",
      transaction_reference: transactionReference || "",
      payment_status: "pending",
      access_granted: false,
      access_code: accessCode
    };

    const enrollment = await db.createEnrollment(enrollmentData);

    return NextResponse.json(
      {
        success: true,
        data: enrollment,
        message:
          "Purchase request submitted! Admin will verify your payment and grant access within 24 hours."
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
