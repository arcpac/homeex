import { Item } from "@prisma/client";
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
interface Props {
  item: Item;
}

const ItemDetail = ({ item }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-5 justify-center">
      <Card className="mx-4 mb-4 lg:col-span-3 lg: mr-4">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{item.title}</CardTitle>
            <ItemStatusBadge status={item.status} />
          </div>
        </CardHeader>
        <CardContent>
          <p>{item.purchaseDate?.toLocaleDateString()}</p>
          <CardDescription className="prose">
            <ReactMarkDown>{item.description}</ReactMarkDown>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex-col w-full space-y-3">
            <div className="">
              <Link
                href={`/items/edit/${item.id}`}
                className={`w-full ${buttonVariants({
                  variant: "secondary",
                })}}`}
              >
                <Brain className="mr-2 h-4 w-4" /> Edit item
              </Link>
            </div>
            <DeleteButton itemId={item.id} />
          </div>
        </CardFooter>
      </Card>
      <div className="col-span-2">
        <Card className="mx-4 mb-4 lg:col-span-2 lg: mr-4">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Total</CardTitle>
              <ItemStatusBadge status={item.status} />
            </div>
          </CardHeader>
          <CardContent>
            <p>{item.purchaseDate?.toLocaleDateString()}</p>
            <CardDescription>50.90</CardDescription>
          </CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ItemDetail;
