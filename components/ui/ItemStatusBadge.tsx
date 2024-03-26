import React from "react";
import { Badge } from "./badge";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
  PAID: { label: "Paid", color: "bg-green-400" },
  OFFSET: { label: "Offset", color: "bg-red-400" },
  PENDING: { label: "Pending", color: "bg-blue-400" },
};

const ItemStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default ItemStatusBadge;
