-- CreateEnum
CREATE TYPE "PortfolioTag" AS ENUM ('LGS_ROOFING', 'STRUCTURAL', 'CONVENTIONAL', 'IN_DEVELOPMENT', 'MODULAR_STYLE');

-- CreateTable
CREATE TABLE "PortfolioItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "tag" "PortfolioTag" NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "desc" TEXT NOT NULL,
    "body" TEXT,
    "sqm" TEXT,
    "steel" TEXT,
    "waste" TEXT,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PortfolioItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioItem_slug_key" ON "PortfolioItem"("slug");

-- CreateIndex
CREATE INDEX "PortfolioItem_published_sortOrder_idx" ON "PortfolioItem"("published", "sortOrder");

