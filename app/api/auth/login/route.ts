import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  const { email, password } = await req.json();

  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Invalid email or password" },
      { status: 400 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { success: false, error: "Invalid email or password" },
      { status: 400 }
    );
  }

  // CREATE RESPONSE FIRST
  const res = NextResponse.json({
    success: true,
    message: "Login successful",
    role: user.role,
    redirect:
      user.role === "admin"
        ? "/admin"
        : user.role === "artist"
        ? "/artist"
        : "/dashboard",
  });

  // SET COOKIES ON RESPONSE
  res.cookies.set({
    name: "token",
    value: `loggedin-${user._id}`,
    httpOnly: true,
    path: "/",
  });

  res.cookies.set({
    name: "role",
    value: user.role,
    path: "/",
  });

  return res;
}
