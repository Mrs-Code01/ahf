import { NextResponse } from "next/server";
import { verifyAdminCredentials, generateToken } from "../../../../lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const isValid = verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = generateToken({ username, role: "admin" });

    const response = NextResponse.json({
      success: true,
      token,
      user: { username, role: "admin" },
    });

    // Set a secure httpOnly cookie so the middleware can verify server-side
    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days — matches JWT expiry
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
