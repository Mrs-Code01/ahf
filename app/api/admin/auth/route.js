import { NextResponse } from "next/server";
import { verifyAdminCredentials, generateToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const isValid = verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken({ username, role: "admin" });

    return NextResponse.json({
      success: true,
      token,
      user: { username, role: "admin" }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
