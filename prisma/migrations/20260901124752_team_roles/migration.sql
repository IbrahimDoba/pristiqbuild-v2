-- Replace the placeholder roles with the real company ones.
--
-- Postgres cannot drop a value from an enum in place, so the type is rebuilt
-- and the column cast across with an explicit mapping. SALES and EDITOR were
-- never enforced anywhere and no user currently holds them, but the mapping is
-- written out so the migration is correct on any database that does.

ALTER TYPE "UserRole" RENAME TO "UserRole_old";

CREATE TYPE "UserRole" AS ENUM (
  'CO_FOUNDER',
  'ADMIN',
  'MANAGER',
  'CONTENT_SPECIALIST'
);

-- The default references the old type and has to go before the cast.
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;

ALTER TABLE "User"
  ALTER COLUMN "role" TYPE "UserRole"
  USING (
    CASE "role"::text
      WHEN 'SALES'  THEN 'MANAGER'
      WHEN 'EDITOR' THEN 'CONTENT_SPECIALIST'
      ELSE "role"::text
    END
  )::"UserRole";

ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'MANAGER';

DROP TYPE "UserRole_old";
