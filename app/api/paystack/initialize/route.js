import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const {
      courseId,
      courseName,
      amount,
      userName,
      userEmail,
      userPhone,
      reference,
    } = await request.json();

    console.log("=== PAYSTACK PAYMENT STARTED ===");
    console.log("Reference:", reference);

    // Create purchase record
    const { data: purchase, error: dbError } = await supabase
      .from("course_purchases")
      .insert({
        user_email: userEmail,
        user_name: userName,
        course_id: courseId,
        course_name: courseName,
        amount_paid: amount,
        payment_reference: reference,
        payment_status: "pending",
        access_granted: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    console.log("✅ Purchase record created");
    return NextResponse.json({ success: true, reference });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
