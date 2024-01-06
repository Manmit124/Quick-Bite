import { Category } from "@/app/models/Category";
import { connectToDB } from "@/app/utils/connectto";
import { isAdmin } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

connectToDB();
export async function POST(req) {
  try {
    const { name } = await req.json();
    if (await isAdmin()) {
      const categoryDoc = await Category.create({ name });
      return NextResponse.json(categoryDoc);
    } else {
      return NextResponse.json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' });
  }
}


export async function GET(req, res) {
  try {
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' });
  }
}

export async function PUT(req) {
  try {
    const { _id, name } = await req.json();

    if (await isAdmin()) {
      await Category.updateOne({ _id }, { name });
      return NextResponse.json(true);
    } else {
      return NextResponse.json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' });
  }
}


export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (await isAdmin()) {
      await Category.deleteOne({ _id });
      return NextResponse.json(true);
    } else {
      return NextResponse.json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' });
  }
}