import { User } from "@/app/models/User";
import { connectToDB } from "@/app/utils/connectto";

export async function GET(){
    connectToDB();
    const users=await User.find();

    return Response.json(users)
}