import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@/generated/prisma/client";

/**
 * The half of the auth config that is safe on the Edge Runtime.
 *
 * The proxy runs on the edge, which cannot load Node built-ins. Prisma Client
 * imports node:path and bcrypt is native, so neither can be reached from here.
 * Keeping providers out of this file is what lets the proxy verify a session
 * without dragging the database into the edge bundle.
 *
 * The full config in auth.ts adds the Credentials provider and runs in Node.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: UserRole;
    };
  }
  interface User {
    role: UserRole;
  }
}

export const authConfig = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  trustHost: true,

  // Added in auth.ts, which runs in Node.
  providers: [],

  callbacks: {
    // Role travels in the token, so authorising a page costs no database call.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
