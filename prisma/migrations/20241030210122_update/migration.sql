/*
  Warnings:

  - Added the required column `funnelId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Funnel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leads" INTEGER NOT NULL DEFAULT 0,
    "ftd" INTEGER NOT NULL DEFAULT 0,
    "nbt" INTEGER NOT NULL DEFAULT 0,
    "invalid" INTEGER NOT NULL DEFAULT 0,
    "isNetwork" BOOLEAN NOT NULL DEFAULT false,
    "date" DATETIME NOT NULL,
    "countryId" TEXT NOT NULL,
    "funnelId" TEXT NOT NULL,
    CONSTRAINT "Report_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Report_funnelId_fkey" FOREIGN KEY ("funnelId") REFERENCES "Funnel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("countryId", "date", "ftd", "id", "leads") SELECT "countryId", "date", "ftd", "id", "leads" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
