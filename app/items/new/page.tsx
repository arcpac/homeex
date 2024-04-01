import options from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import React from "react";

const ItemForm = dynamic(() => import("@/components/ItemForm"), { ssr: false });

const NewItem = async () => {
  const session = await getServerSession(options);

  if (!session?.user) return <p className="text-destructive">Access denied</p>;

  const users = await prisma.user.findMany({
    select: { name: true, id: true },
  });
  const transformedUsers = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  return <ItemForm users={transformedUsers} />;
};

export default NewItem;
