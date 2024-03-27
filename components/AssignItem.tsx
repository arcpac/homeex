"use client";
import React, { useState } from "react";
import { Item, User } from "@prisma/client";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AssignItem = ({ item, users }: { item: Item; users: User[] }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState("");

  const assignItem = async (userId: string) => {
    setError("");
    setIsAssigning(true);
    await axios
      .patch(`/api/items/${item.id}`, {
        ownerId: userId === "0" ? null : userId,
      })
      .catch(() => {
        setError("Unable to assign blog");
      });
    setIsAssigning(false);
  };

  return (
    <div>
      <Select
        defaultValue={item.ownerId?.toString() || "0"}
        onValueChange={assignItem}
        disabled={isAssigning}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select user.."
            defaultValue={item.ownerId?.toString() || "0"}
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassign</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssignItem;
