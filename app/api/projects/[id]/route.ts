import connectDB from "@/app/_config/database";
import Project from "@/app/_models/projectModel";
import User from "@/app/_models/userModel";
import { jwtDecode } from "jwt-decode";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    const project = await Project.findByIdAndDelete(id);

    return NextResponse.json({
      status: "success",
      project,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const project = await Project.findById(id);

    return NextResponse.json({
      status: "success",
      project,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const data = await req.json();

    await Project.findByIdAndUpdate(id, data);

    return NextResponse.json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
