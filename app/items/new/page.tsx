import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import React from "react";

const ItemForm = dynamic(() => import("@/components/ItemForm"), { ssr: false });

const NewItem = async () => {
  const session = await getServerSession(options);

  if (!session?.user) return <p className="text-destructive">Access denied</p>;
  return (
    <div>
      <ItemForm />
    </div>
  );
};

export default NewItem;
