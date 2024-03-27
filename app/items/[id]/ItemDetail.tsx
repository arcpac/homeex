import { Item, User } from "@prisma/client";
import React from "react";
import { Brain } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ItemStatusBadge from "@/components/ui/ItemStatusBadge";
import ReactMarkDown from "react-markdown";
import DeleteButton from "./DeleteButton";
import AssignItem from "@/components/AssignItem";
interface Props {
  item: Item;
  users: User[];
}

const ItemDetail = ({ item, users }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg: mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <ItemStatusBadge status={item.status} />
          </div>
          <CardTitle>{item.title}</CardTitle>
          <CardContent className="prose dark:prose-invert">
            <ReactMarkDown>{item.description}</ReactMarkDown>
          </CardContent>
        </CardHeader>
        <CardContent>
          <p>
            Created:
            {item.createdAt.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </CardContent>
        <CardFooter>
          <p>
            Updated:
            {item.updatedAt.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <div>
          <AssignItem item={item} users={users} />
        </div>
        <Link
          href={`/items/edit/${item.id}`}
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Edit Item
        </Link>
        <div>
          <DeleteButton itemId={item.id} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
