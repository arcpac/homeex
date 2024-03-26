import dynamic from "next/dynamic";
import React from "react";

const ItemForm = dynamic(() => import("@/components/ItemForm"), { ssr: false });

const NewItem = () => {
  return (
    <div>
      <ItemForm />
    </div>
  );
};

export default NewItem;
