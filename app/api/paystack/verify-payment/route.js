import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { reference } = await req.json();

    // 1. Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      },
    );
    const data = await response.json();

    if (data.status && data.data.status === "success") {
      const customerEmail = data.data.customer.email;
      const amount = data.data.amount / 100;

      // Get data from Paystack Metadata
      const courseId = data.data.metadata?.course_id || "general";
      const courseName =
        data.data.metadata?.course_name || "your enrolled course";
      const userName = data.data.metadata?.user_name || "Student";

      // 2. Send the Access Email
      await resend.emails.send({
        from: "AHF Academy <support@ahfnig.org>",
        to: [customerEmail],
        bcc: ["afnig400@gmail.com"],
        subject: `Welcome to ${courseName} - Access Your Course Now!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; color: #1a202c;">
            <div style="background: #4169E1; color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="margin:0;">Welcome to ${courseName}!</h1>
            </div>
            <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                <h2>Hi ${userName}!</h2>
                <p>Congratulations! Your payment of <b>₦${amount.toLocaleString()}</b> has been confirmed.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://www.ahfnig.org/courses/${courseId}/access?ref=${reference}" 
                     style="background-color: #008450; color: #ffffff !important; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                     Access Your Course Now
                  </a>
                </div>

                
                
                <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px;">
                    © ${new Date().getFullYear()} AHF Team
                </p>
            </div>
          </div>
        `,
      });

      return Response.json({
        success: true,
        message: "Verification success and email sent",
      });
    }

    return Response.json(
      { success: false, message: "Payment verification failed" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Backend Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
