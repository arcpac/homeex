import prisma from "@/prisma/db";
import dynamic from "next/dynamic";
import React from "react";

const ItemForm = dynamic(() => import("@/components/ItemForm"), { ssr: false });

interface Props {
  params: { id: string };
}

const editItem = async ({ params }: Props) => {
  const item = await prisma?.item.findUnique({
    include: {
      payers: true,
    },
    where: { id: parseInt(params.id) },
  });

  if (!item) return <p className="text-destructive">Item not found</p>;

  const users = await prisma.user.findMany({
    select: { name: true, id: true },
  });

  const defaultOptions = item.payers.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  const transformedUsers = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <ItemForm
      item={item}
      users={transformedUsers}
      defaultOptions={defaultOptions}
    />
  );
};

export default editItem;
