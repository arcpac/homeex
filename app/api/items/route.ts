import prisma from "@/prisma/db";
import { itemSchema } from "@/validationSchemas/items";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session)
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });

  const body = await request.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  body.ownerId = user?.id;
  const validation = itemSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newItem = await prisma.item.create({
    data: { ...body },
  });
  return NextResponse.json(newItem, { status: 201 });
}
