import { MenuItem } from "@/app/models/MenuItem";
import { connectToDB } from "@/app/utils/connectto";

export async function POST(req) {
  connectToDB();

  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}
export async function GET(){
  connectToDB();
  return Response.json(
    await MenuItem.find()
  )
}