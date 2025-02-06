import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import connectDB from "./database";
import User from "../_models/userModel";

export async function checkForCookies() {
  await connectDB();
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  if (!session) {
    redirect("/login");
  }
  const { id: userId }: { id: string } = await jwtDecode(session);
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    redirect("/login");
  }
}
