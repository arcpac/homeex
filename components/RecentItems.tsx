import { Prisma } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

type ItemWIthUser = Prisma.ItemGetPayload<{
  include: { owner: true };
}>;

interface Props {
  items: ItemWIthUser[];
}

const RecentItems = ({ items }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Items</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {items
              ? items.map((item) => (
                  <div className="flex items-center" key={item.id}>
                    {/* <BlogBadges status={blog.status} /> */}
                    <div className="ml-4 space-y-4">
                      <Link href={`items/${item.id}`} className="">
                        {item.title}
                      </Link>
                    </div>
                    <div className="ml-4 space-y-4">
                      <Link href={`items/${item.id}`} className="">
                        {item.owner.email}
                      </Link>
                    </div>
                    <div className="ml-4 space-y-4">
                      <Link href={`items/${item.id}`} className="">
                        {item.status}
                      </Link>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default RecentItems;
