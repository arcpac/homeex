import ItemStatusBadge from "@/components/ui/ItemStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Item, Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";

type BlogWithOwner = Prisma.ItemGetPayload<{
  include: { owner: true };
}>;

interface Props {
  items: BlogWithOwner[]; // array of items
}

const DataTable = ({ items }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link href="">Purchase Date</Link>
              </TableHead>
              <TableHead>
                <Link href="">Item Title</Link>
              </TableHead>
              <TableHead>
                <Link href="">Price</Link>
              </TableHead>
              <TableHead>
                <Link href="">Owner</Link>
              </TableHead>
              <TableHead>
                <Link href="">Status</Link>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} data-href="/">
                <TableCell>
                  {item.purchaseDate?.toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell>
                  <Link href={`/items/${item.id}`}>{item.title}</Link>
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.owner.email || "no owner"}</TableCell>
                <TableCell>
                  <ItemStatusBadge status={item.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
