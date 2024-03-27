import prisma from "@/prisma/db";
import dynamic from "next/dynamic";
import React from "react";

const ItemForm = dynamic(() => import("@/components/ItemForm"), { ssr: false });

interface Props {
  params: { id: string };
}

const editItem = async ({ params }: Props) => {
  const item = await prisma?.item.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!item) return <p className="text-destructive">Item not found</p>;

  return <ItemForm item={item} />;
};

export default editItem;
