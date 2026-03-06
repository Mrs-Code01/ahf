import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { courseId, title, content_type, video_url, file_url, order_number } =
      await request.json();

    console.log("Adding lesson:", { courseId, title, content_type });

    if (!courseId || !title || !content_type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const insertData = {
      course_id: courseId,
      title,
      content_type,
      video_url: video_url || "",
      file_url: file_url || "",
      order_number: order_number || 1,
    };

    const { data, error } = await supabase
      .from("course_lessons")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error adding lesson:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    console.log("Lesson added successfully:", data);

    return NextResponse.json({
      success: true,
      data,
      message: "Lesson added successfully",
    });
  } catch (error) {
    console.error("Error adding lesson:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
