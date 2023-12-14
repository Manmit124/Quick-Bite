import { User } from "@/app/models/User";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { connectToDB } from "@/app/utils/connectto";

export async function POST(req) {
  
  const body = await req.json();
 connectToDB();
  try {
    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create the user with the hashed password
    const createUser = await User.create({
      email: body.email,
      password: hashedPassword,
    });

    return Response.json(createUser);
  } catch (error) {
    return Response.json({ error: "Error creating user" }, { status: 500 });
  } 
}
