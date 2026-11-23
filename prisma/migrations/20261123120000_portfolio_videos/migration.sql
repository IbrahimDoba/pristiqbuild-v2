-- AlterTable
ALTER TABLE "PortfolioItem" ADD COLUMN     "videos" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Videos are read back in byte ranges. EXTERNAL keeps the column out of line
-- but uncompressed, so Postgres can fetch a slice without unpacking the whole
-- value. JPEG, WebP and MP4 are already compressed, so nothing is lost.
ALTER TABLE "MediaAsset" ALTER COLUMN "bytes" SET STORAGE EXTERNAL;
