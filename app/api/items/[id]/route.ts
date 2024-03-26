import prisma from "@/prisma/db";
import { itemPatchSchema, itemSchema } from "@/validationSchemas/items";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = itemPatchSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const item = await prisma.item.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 400 });

  const updatedItem = await prisma.item.update({
    where: { id: item.id },
    data: {
      ...body,
    },
  });
  console.log(updatedItem);
  return NextResponse.json(updatedItem, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const item = await prisma.item.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!item)
    return NextResponse.json({ error: "Item not found." }, { status: 404 });

  await prisma.item.delete({ where: { id: item.id } });
  return NextResponse.json({ message: "Item deleted." });
}
