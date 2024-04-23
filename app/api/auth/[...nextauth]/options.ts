import prisma from "@/prisma/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "email and password",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        if (!user) return null;

        const match = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (match) return user;
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        const { id, username, role, email } = token as {
          id: number;
          email: string;
          username: string;
          role?: string;
        };
        session.user.id = id;
        session.user.email = username || email;
        session.user.role = role || "USER";
      }
      return session;
    },
  },
};

export default options;
