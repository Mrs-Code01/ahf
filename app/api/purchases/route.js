import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    console.log("🔍 Fetching purchases...");

    const { data, error } = await supabase.from("course_purchases").select("*");
    // REMOVED: .order("created_at", { ascending: false });

    console.log("📦 Data:", data);
    console.log("❌ Error:", error);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error("💥 Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { enrollmentId, paymentStatus, accessGranted } = body;

    const { data, error } = await supabase
      .from("course_purchases")
      .update({
        payment_status: paymentStatus,
        access_granted: accessGranted,
      })
      .eq("id", enrollmentId)
      .select()
      .single();

    if (error) throw error;

    // Increase student count if approved
    if (accessGranted && paymentStatus === "completed") {
      const { data: course } = await supabase
        .from("courses")
        .select("students")
        .eq("id", data.course_id)
        .single();

      await supabase
        .from("courses")
        .update({ students: (course?.students || 0) + 1 })
        .eq("id", data.course_id);
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
