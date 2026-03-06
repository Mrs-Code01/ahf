import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.text();

    // Verify Paystack signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (hash !== request.headers.get("x-paystack-signature")) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    console.log("✅ Paystack webhook received:", event.event);

    if (event.event === "charge.success") {
      const reference = event.data.reference;
      console.log("Payment successful for:", reference);

      // Get the purchase to find course_id
      const { data: purchaseData } = await supabase
        .from("course_purchases")
        .select("course_id")
        .eq("payment_reference", reference)
        .single();

      // Grant access
      const { error } = await supabase
        .from("course_purchases")
        .update({
          payment_status: "success",
          access_granted: true,
          vendy_transaction_id: reference,
        })
        .eq("payment_reference", reference);

      // Increase student count
      if (purchaseData && !error) {
        const { data: course } = await supabase
          .from("courses")
          .select("students")
          .eq("id", purchaseData.course_id)
          .single();

        await supabase
          .from("courses")
          .update({ students: (course?.students || 0) + 1 })
          .eq("id", purchaseData.course_id);

        console.log("✅ Student count increased!");
      }

      if (error) {
        console.error("Failed to grant access:", error);
      } else {
        console.log("✅ Access granted!");
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
