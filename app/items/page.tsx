import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
const Items = async () => {
  const items = await prisma.item.findMany();

  return (
    <div>
      <Link
        href="/items/new"
        className={buttonVariants({ variant: "default" })}
      >
        Register Item
      </Link>
      <DataTable items={items} />
    </div>
  );
};

export default Items;
