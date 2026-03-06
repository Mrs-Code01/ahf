// app/api/events/[id]/route.js

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

// PUT - Admin only: update an event
export async function PUT(request, { params }) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Admin only" },
        { status: 401 },
      );
    }

    const { id } = await params; // ← await added here

    const body = await request.json();

    // Parse activities - accept comma-separated string or array
    let activities = body.activities;
    if (typeof activities === "string") {
      activities = activities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);
    }

    const { data, error } = await supabase
      .from("community_events")
      .update({
        title: body.title,
        subtitle: body.subtitle || null,
        badge_label: body.badge_label || "COMMUNITY INITIATIVE",
        date_text: body.date_text,
        location: body.location,
        activities: activities || [],
        account_name: body.account_name || null,
        account_number: body.account_number || null,
        bank_name: body.bank_name || null,
        cta_text: body.cta_text || "Join Us to Make This a Reality",
        cta_subtext:
          body.cta_subtext || "Your support transforms lives in our community",
        image_url: body.image_url || null,
        is_active: body.is_active !== undefined ? body.is_active : true,
        display_order: body.display_order || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// DELETE - Admin only: delete an event
export async function DELETE(request, { params }) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Admin only" },
        { status: 401 },
      );
    }

    const { id } = await params; // ← await added here

    const { error } = await supabase
      .from("community_events")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
