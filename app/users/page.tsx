import UserForm from "@/components/UserForm";
import React from "react";
import UserDataTable from "./UserDataTable";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

const Users = async () => {
  const users = await prisma.user.findMany();
  const session = await getServerSession(options);

  if (!session?.user) return <p className="text-destructive">Access denied</p>;
  return (
    <div>
      <UserDataTable users={users} />
    </div>
  );
};

export default Users;
