import UserForm from "@/components/UserForm";
import React from "react";
import UserDataTable from "./UserDataTable";
import prisma from "@/prisma/db";

const Users = async () => {
  const users = await prisma.user.findMany();
  return (
    <div>
      <UserDataTable users={users} />
    </div>
  );
};

export default Users;
