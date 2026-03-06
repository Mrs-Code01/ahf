import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoPath = searchParams.get("path");
    const courseId = searchParams.get("courseId");
    const reference = searchParams.get("ref");

    // Verify the purchase
    const { data: purchase } = await supabase
      .from("course_purchases")
      .select("*")
      .eq("payment_reference", reference)
      .eq("course_id", courseId)
      .eq("access_granted", true)
      .single();

    if (!purchase) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Generate signed URL (24 hours)
    const { data: signedData, error } = await supabase.storage
      .from("course-videos")
      .createSignedUrl(videoPath, 86400);

    if (error) {
      return NextResponse.json(
        { error: "Failed to generate video URL" },
        { status: 500 },
      );
    }

    // Redirect to the video
    return NextResponse.redirect(signedData.signedUrl);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
