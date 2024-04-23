import prisma from "@/prisma/db";
import { userPatchSchema } from "@/validationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userPatchSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  if (body?.password && body.password != "") {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
  } else {
    delete body.password;
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...body,
    },
  });
  return NextResponse.json(updatedUser);
}
