import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Brain } from "lucide-react";
import Link from "next/link";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

const UserDetail = async ({ params }: Props) => {
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) return <p className="text-destructive">User no found</p>;

  user.password = "";
  return (
    <div className="lg:grid lg:grid-cols-5 justify-center">
      <Card className="mx-4 mb-4 lg:col-span-3 lg: mr-4">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{user.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p>{user.createdAt.toLocaleDateString()}</p>
        </CardContent>
        <CardFooter>
          <div className="flex-col w-full space-y-3">
            <div className="">
              <Link
                href={`/users/edit/${params.id}`}
                className={`w-full ${buttonVariants({
                  variant: "secondary",
                })}}`}
              >
                <Brain className="mr-2 h-4 w-4" /> Update user account
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
      <div className="col-span-2">
        <Card className="mx-4 mb-4 lg:col-span-2 lg: mr-4">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Total</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Account details</CardDescription>
          </CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;
