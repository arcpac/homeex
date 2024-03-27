import prisma from "@/prisma/db";
import { itemSchema } from "@/validationSchemas/items";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = itemSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newItem = await prisma.item.create({
    data: { ...body },
  });

  console.log(newItem);
  return NextResponse.json(newItem, { status: 201 });
}
