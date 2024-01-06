import { connectToDB } from "@/app/utils/connectto";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
  connectToDB();
  const data = await req.json();
  const { _id, name, image, ...otherInfo } = data;
  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }
  await User.updateOne(filter, data);

  return Response.json(true);
}

export async function GET(req) {
  try {
    
    connectToDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    let filterUser = {};
    if (_id) {
      filterUser = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      if (!email) {
        return NextResponse.json({});
      }
      filterUser = { email };
    }
    const user = await User.findOne(filterUser).lean();
  
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user', error);
    return NextResponse.json({ error: 'Failed to fetch user' });
  }
}
