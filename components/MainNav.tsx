import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const MainNav = async () => {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <div className="flex justify-between">
      <Link href="/">Dashboard</Link>
      <Link href="/items">Items</Link>
      <Link href="/users">Users</Link>
      <div className="flex-items-center-gap-2">
        {session ? (
          <>
            <p className="text-primary">{session.user.email}</p>
            <Link href="/api/auth/signout?callbackUrl=/">Sign Out</Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/signin">Sign in</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MainNav;
