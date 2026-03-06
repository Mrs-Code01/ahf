import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Reference required" },
        { status: 400 },
      );
    }

    console.log("Checking access for reference:", reference);

    // Get purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from("course_purchases")
      .select("*")
      .eq("payment_reference", reference)
      .single();

    if (purchaseError || !purchase) {
      console.error("Purchase not found:", purchaseError);
      return NextResponse.json(
        {
          hasAccess: false,
          message: "Purchase not found",
          status: "not_found",
        },
        { status: 404 },
      );
    }

    // Check if access is granted
    if (purchase.access_granted) {
      // Get course details
      const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", purchase.course_id)
        .single();

      // Get lessons
      const { data: lessons } = await supabase
        .from("course_lessons")
        .select("*")
        .eq("course_id", purchase.course_id)
        .order("order_number", { ascending: true });

      return NextResponse.json({
        hasAccess: true,
        purchase,
        course: course || {
          id: purchase.course_id,
          title: purchase.course_name,
        },
        lessons: lessons || [],
      });
    }

    // Access not granted yet
    return NextResponse.json({
      hasAccess: false,
      status: purchase.payment_status,
      purchase,
      message: "Payment pending or not verified",
    });
  } catch (error) {
    console.error("Check access error:", error);
    return NextResponse.json(
      {
        hasAccess: false,
        message: error.message,
        status: "error",
      },
      { status: 500 },
    );
  }
}
