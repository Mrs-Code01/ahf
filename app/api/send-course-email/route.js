import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const {
      userName,
      userEmail,
      courseName,
      courseId,
      paymentReference,
      amountPaid,
    } = await request.json();

    // Get all lessons for this course
    const { data: lessons, error: lessonsError } = await supabase
      .from("course_lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("order_number", { ascending: true });

    if (lessonsError) {
      console.error("Error fetching lessons:", lessonsError);
    }

    // Generate direct links for each lesson
    let lessonLinksHtml = "";
    if (lessons && lessons.length > 0) {
      lessonLinksHtml = lessons
        .map((lesson, index) => {
          if (lesson.content_type === "video" && lesson.video_url) {
            // Generate signed URL for video
            const videoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/get-direct-video?path=${encodeURIComponent(lesson.video_url)}&courseId=${courseId}&ref=${paymentReference}`;

            return `
            <div style="background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #2563eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 18px;">📹 Lesson ${index + 1}: ${lesson.title}</h3>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">Video Lesson</p>
              <a href="${videoUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">▶️ Watch Video</a>
            </div>
          `;
          } else if (lesson.content_type === "pdf" && lesson.file_url) {
            return `
            <div style="background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 18px;">📄 Lesson ${index + 1}: ${lesson.title}</h3>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">PDF Document</p>
              <a href="${lesson.file_url}" target="_blank" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">📥 Download PDF</a>
            </div>
          `;
          }
          return "";
        })
        .join("");
    } else {
      lessonLinksHtml = `
        <div style="background: white; padding: 20px; margin: 15px 0; border-radius: 8px; text-align: center;">
          <p style="color: #6b7280;">No lessons available yet. Check back soon!</p>
        </div>
      `;
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: white;
    }
    .header { 
      background:  #4169E1; 
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
      border-radius: 0;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .content { 
      background: #f9fafb; 
      padding: 30px; 
    }
    .content h2 {
      color: #1f2937;
      font-size: 24px;
      margin: 0 0 15px 0;
    }
    .content p {
      color: #4b5563;
      font-size: 16px;
      margin: 10px 0;
    }
    .content strong {
      color: #1f2937;
    }
    .section-title {
      color: #1f2937; 
      font-size: 20px;
      margin: 30px 0 15px 0;
      font-weight: bold;
    }
    .tip-box {
      background: #fef3c7; 
      border-left: 4px solid #f59e0b; 
      padding: 15px; 
      margin: 20px 0; 
      border-radius: 5px;
    }
    .tip-box p {
      margin: 0;
      color: #92400e;
    }
    .details-box {
      background: white; 
      padding: 20px; 
      border-radius: 8px; 
      margin: 20px 0;
      border: 1px solid #e5e7eb;
    }
    .details-box h3 {
      color: #1f2937;
      margin: 0 0 15px 0;
      font-size: 18px;
    }
    .details-box p {
      margin: 5px 0;
      color: #4b5563;
      font-size: 14px;
    }
    .footer { 
      text-align: center; 
      padding: 30px 20px; 
      color: #6b7280; 
      font-size: 14px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to ${courseName}!</h1>
    </div>
    
    <div class="content">
      <h2>Hi ${userName}!</h2>
      
      <p>Congratulations! You just purchased <strong>${courseName}</strong>!</p>
      
      <p>Your payment of <strong>₦${amountPaid.toLocaleString()}</strong> has been confirmed.</p>
      
      <h3 class="section-title">Your Course Materials:</h3>
      
      ${lessonLinksHtml}
      
      <div class="tip-box">
        <p><strong>Important:</strong> Save this email! You can access these links anytime. The links are permanent and will work whenever you need them.</p>
      </div>
      
      <div class="details-box">
        <h3>Purchase Details</h3>
        <p><strong>Course:</strong> ${courseName}</p>
        <p><strong>Amount Paid:</strong> ₦${amountPaid.toLocaleString()}</p>
        <p><strong>Purchase Date:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p><strong>Reference:</strong> ${paymentReference}</p>
      </div>
      
      <p>If you have any questions or need help accessing your course materials, simply reply to this email and we'll assist you.</p>
      
      <p style="margin-top: 20px;">Best regards,<br><strong>AHF Nigeria Team</strong></p>
    </div>
    
    <div class="footer">
      <p><strong>AHF Nigeria | Course Platform</strong></p>
      <p>You received this email because you purchased a course from us.</p>
      <p style="margin-top: 15px; color: #9ca3af; font-size: 12px;">
        This is an automated email. Please do not reply to this message.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const { data, error } = await resend.emails.send({
      from: "AHF Nigeria <onboarding@resend.dev>", // Change to your domain later: noreply@ahfnig.org
      to: [userEmail],
      subject: `✅ Welcome to ${courseName} - Access Your Course Now!`,
      html: emailHtml,
    });

    if (error) {
      console.error("Email send error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send email", error: error },
        { status: 500 },
      );
    }

    console.log("✅ Course access email sent to:", userEmail);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in send-course-email:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
