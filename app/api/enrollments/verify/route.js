import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function POST(request) {
  try {
    const { courseId, userEmail, accessCode } = await request.json();

    const { data: enrollment, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("course_id", courseId)
      .eq("user_email", userEmail.toLowerCase())
      .eq("access_code", accessCode)
      .eq("access_granted", true)
      .eq("payment_status", "completed")
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return NextResponse.json({
      success: true,
      hasAccess: !!enrollment,
      enrollment
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
