import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

/**
 * Full authentication config. Node runtime only.
 *
 * Credentials with JWT sessions rather than the Prisma adapter: the adapter
 * wants three extra tables to persist sessions and OAuth accounts, and this is
 * a handful of internal users with passwords. No OAuth, no reason to write a
 * row per session.
 *
 * Email magic links would be a nicer flow, but nothing can send email yet.
 * Worth revisiting once a mail transport is wired up.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const db = getDb();
        const user = await db.user.findUnique({ where: { email } });

        // Compare against a dummy hash when no user matches, so an unknown
        // address costs the same time as a known one. Returning early would
        // leak which addresses exist.
        const hash =
          user?.passwordHash ??
          "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidin";
        const ok = await bcrypt.compare(password, hash);

        if (!user || !user.passwordHash || !user.isActive || !ok) return null;

        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
