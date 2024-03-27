import { Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}