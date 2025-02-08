/*
  Warnings:

  - You are about to drop the column `date` on the `Report` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sended_date` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
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
    "created_at" DATETIME NOT NULL,
    "sended_date" DATETIME NOT NULL,
    "countryId" TEXT NOT NULL,
    "funnelId" TEXT NOT NULL,
    CONSTRAINT "Report_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Report_funnelId_fkey" FOREIGN KEY ("funnelId") REFERENCES "Funnel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("countryId", "ftd", "funnelId", "id", "invalid", "isNetwork", "leads", "nbt") SELECT "countryId", "ftd", "funnelId", "id", "invalid", "isNetwork", "leads", "nbt" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
