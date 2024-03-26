import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { userSchema } from "@/validationSchemas/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const duplicate = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (duplicate)
    return NextResponse.json(
      { message: "Unable to create user" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);
  body.password = hashedPassword;
  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
