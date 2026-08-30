// No dotenv import on purpose.
//
// This file is loaded by the Prisma CLI, including inside the production
// container, where env vars come from the environment rather than a file and
// dotenv would be an extra dependency to resolve. Locally the package.json
// scripts pass --env-file=.env instead.
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Read directly rather than through env(), which throws when the variable
    // is absent. `prisma generate` does not need a connection string, and it
    // runs in the install step of the Docker build where none is set. The
    // entrypoint checks for DATABASE_URL before attempting a migration, so a
    // genuinely missing value still fails loudly at the point it matters.
    url: process.env.DATABASE_URL ?? "",
  },
});
