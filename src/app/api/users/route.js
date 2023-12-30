import { User } from "@/app/models/User";
import { connectToDB } from "@/app/utils/connectto";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  connectToDB();

  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
