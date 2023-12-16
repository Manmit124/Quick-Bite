import { connectToDB } from "@/app/utils/connectto";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  connectToDB();
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;
 


    await User.updateOne({ email }, data);
  
  return Response.json(true);
}

export async function GET(){
    connectToDB()
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    return Response.json(
        await User.findOne({email})
    )

}