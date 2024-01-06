
import { Order } from "@/app/models/Order";

import {getServerSession} from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { connectToDB } from "@/app/utils/connectto";
import { NextResponse } from "next/server";

// export async function GET(req) {
//  connectToDB();

//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   const admin = await isAdmin();

//   const url = new URL(req.url);
//   const _id = url.searchParams.get('_id');
//   if (_id) {
//     return Response.json( await Order.findById(_id) );
//   }


//   if (admin) {
//     return Response.json( await Order.find() );
//   }

//   if (userEmail) {
//     return Response.json( await Order.find({userEmail}) );
//   }

// }
export async function GET(req) {
  connectToDB();

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  if (_id) {
    try {
      const order = await Order.findById(_id);
      return NextResponse.json(order || {});
    } catch (error) {
      console.error('Error fetching order by ID:', error.message);
      return NextResponse.json({ error: 'Failed to fetch order by ID' }, { status: 500 });
    }
  }

  try {
    if (admin) {
      const orders = await Order.find();
      return NextResponse.json(orders);
    }

    if (userEmail) {
      const userOrders = await Order.find({ userEmail });
      return NextResponse.json(userOrders);
    }

    return NextResponse.json({});
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}