import connectDB from "@/app/_config/database";
import User from "@/app/_models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();

    if (!data) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 },
      );
    }

    if (data.password !== data.passwordConfirm) {
      return NextResponse.json(
        { error: "Passwords must match" },
        { status: 403 },
      );
    }

    delete data.role;

    const user = await User.create(data);

    return NextResponse.json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
  }
}
