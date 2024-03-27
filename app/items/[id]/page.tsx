import prisma from "@/prisma/db";
import React from "react";
import ItemDetail from "./ItemDetail";

interface Props {
  params: { id: string };
}

const viewItem = async ({ params }: Props) => {
  const item = await prisma.item.findUnique({
    where: { id: parseInt(params.id) },
  });
  const users = await prisma.user.findMany();
  if (!item) return <p className="text-destructive">Item not found.</p>;

  return (
    <div>
      <ItemDetail item={item} users={users} />
    </div>
  );
};

export default viewItem;
