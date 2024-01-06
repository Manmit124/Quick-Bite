import { MenuItem } from "@/app/models/MenuItem";
import { connectToDB } from "@/app/utils/connectto";
import { isAdmin } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// export async function POST(req) {
//   connectToDB();


//   try {
//     const data = await req.json();
//     console.log(data);
//     if (!data) {
//       // Handle the case where no JSON data is received
//       return Response.json({ error: "No JSON data received" }, { status: 400 });
//     }

//     const menuItemDoc = await MenuItem.create(data);
//     return Response.json(menuItemDoc);
//   } catch (error) {
//     // Handle parsing or other errors
//     console.log(error.message);
//     return Response.json(
//       { error: "Error processing JSON data" },
//       { status: 500 }
//     );
//   }
// }
export async function POST(req) {
  try {
    connectToDB();

    const data = await req.json();

    if (!data) {
      // Handle the case where no JSON data is received
      return NextResponse.json({ error: "No JSON data received" }, { status: 400 });
    }

    const menuItemDoc = await MenuItem.create(data);
    return NextResponse.json(menuItemDoc);
  } catch (error) {
    // Handle parsing or other errors
    console.error('Error creating menu item:', error.message);
    return NextResponse.json({ error: "Error processing JSON data" }, { status: 500 });
  }
}

export async function PUT(req) {
  connectToDB();

  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);

  return NextResponse.json(true);
}


export async function GET() {
  try {
    connectToDB();
    const menuItems = await MenuItem.find();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error.message);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    connectToDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (await isAdmin()) {
      await MenuItem.deleteOne({ _id });
    }

    return NextResponse.json(true);
  } catch (error) {
    console.error('Error deleting menu item:', error.message);
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}