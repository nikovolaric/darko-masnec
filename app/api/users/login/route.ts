import connectDB from "@/app/_config/database";
import { createToken } from "@/app/_config/token";
import User from "@/app/_models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Please provide email and password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return NextResponse.json(
        { error: "Napačen username ali geslo! Prosim poiskusi ponovno!" },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Nimate dovoljenja za vstop!" },
        { status: 401 }
      );
    }

    const token = createToken(user);

    user.password = undefined;

    return NextResponse.json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
