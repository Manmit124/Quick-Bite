import { Category } from "@/app/models/Category";
import { connectToDB } from "@/app/utils/connectto";

export async function POST(req) {
  connectToDB()
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return Response.json(categoryDoc);
}
export async function GET(req, res) {
  connectToDB();
  return Response.json(await Category.find());
}

export async function PUT(req) {
  connectToDB()
  const { _id, name } = await req.json();
  await Category.updateOne({ _id }, { name });
  return Response.json(true);
}