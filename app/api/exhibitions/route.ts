import connectDB from "@/app/_config/database";
import Exhibition from "@/app/_models/exhibitonModel";
import User from "@/app/_models/userModel";
import { jwtDecode } from "jwt-decode";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const params = Object.fromEntries(req.nextUrl.searchParams);

    const exhibitions = await Exhibition.find(params).sort({ duration: -1 });

    return NextResponse.json({
      status: "success",
      results: exhibitions.length,
      exhibitions,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    let token;

    const reqHeaders = await headers();

    const authHeader = reqHeaders.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return NextResponse.json(
        { error: "You are not logged in. Please log in to get access!" },
        { status: 401 },
      );
    }

    const decoded: { id: string } = jwtDecode(token);

    const { id: decodedId } = decoded;

    const currentUser = await User.findById(decodedId);

    if (!currentUser) {
      return NextResponse.json(
        { error: "The user no longer exists" },
        { status: 401 },
      );
    }

    if (currentUser.role !== "admin")
      return NextResponse.json(
        { error: "You are not authorized to access this route" },
        { status: 401 },
      );

    const data = await req.json();

    const exhibition = await Exhibition.create(data);

    return NextResponse.json(
      {
        status: "success",
        exhibition,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
