// app/api/events/route.js
// Place this file at: app/api/events/route.js

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

// GET - Public: fetch all active events (for homepage popup)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("community_events")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// POST - Admin only: create a new event
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Admin only" },
        { status: 401 },
      );
    }

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
      .insert({
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
        is_active: body.is_active !== undefined ? body.is_active : true,
        display_order: body.display_order || 0,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
