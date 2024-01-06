import { User } from "@/app/models/User";
import { connectToDB } from "@/app/utils/connectto";
import { isAdmin } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDB();

    if (!(await isAdmin())) {
      return NextResponse.json([]);
    }

    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' });
  }
}