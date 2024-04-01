import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import StatusFilter from "@/components/StatusFilter";
import { Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SearchParams {
  status: Status;
}

const Items = async ({ searchParams }: { searchParams: SearchParams }) => {
  let where = {};
  const session = await getServerSession(options);

  if (!session?.user) return <p className="text-destructive">Access denied</p>;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  if (status) {
    where = {
      status,
    };
  }

  const items = await prisma.item.findMany({
    where,
    include: { owner: true },
  });

  if (!items) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col">
          <Card className="w-[350px]">
            <CardHeader>
              {/* <CardTitle>No items av</CardTitle> */}
              <CardDescription>You have no items available</CardDescription>
            </CardHeader>
            {/* <CardContent>No items available</CardContent> */}
            <CardFooter className="flex justify-between">
              <Link
                href="/items/new"
                className={buttonVariants({ variant: "default" })}
              >
                Register Item
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex gap-2">
        <Link
          href="/items/new"
          className={buttonVariants({ variant: "default" })}
        >
          Register Item
        </Link>
        <StatusFilter />
      </div>
      <DataTable items={items} />
    </div>
  );
};

export default Items;
