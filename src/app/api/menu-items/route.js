import { MenuItem } from "@/app/models/MenuItem";
import { connectToDB } from "@/app/utils/connectto";

export async function POST(req) {
  connectToDB();
  // console.log(req.json())
  // // const data=await req.json();
  // // console.log(data)
  // return Response.json(true)

  try {
    const data = await req.json();
    console.log(data);
    if (!data) {
      // Handle the case where no JSON data is received
      return Response.json({ error: "No JSON data received" }, { status: 400 });
    }

    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } catch (error) {
    // Handle parsing or other errors
    console.log(error.message);
    return Response.json(
      { error: "Error processing JSON data" },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  connectToDB();
  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);
  return Response.json(true);
}
export async function GET() {
  connectToDB();
  return Response.json(await MenuItem.find());
}
export async function DELETE(req) {
  connectToDB();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await MenuItem.deleteOne({ _id });
  return Response.json(true);
}
