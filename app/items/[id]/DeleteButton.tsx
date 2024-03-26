"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const DeleteButton = ({ itemId }: { itemId: Number }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteItem = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/items/" + itemId);
      setIsDeleting(false);
      router.push("/items");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          className={`w-full ${buttonVariants({
            variant: "destructive",
          })}`}
        >
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className={`w-full ${buttonVariants({
                variant: "destructive",
              })}`}
              onClick={deleteItem}
            >
              Continue
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteButton;
