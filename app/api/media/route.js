import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - Fetch all images
export async function GET() {
  try {
    const { data: images, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching images:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST - Add new image
export async function POST(request) {
  try {
    const { image_url, title, description } = await request.json();

    if (!image_url) {
      return NextResponse.json(
        { success: false, message: "Image URL is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("media")
      .insert({
        image_url,
        title,
        description,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving image:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// DELETE - Delete an image
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Image ID is required" },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("media").delete().eq("id", id);

    if (error) {
      console.error("Error deleting image:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
