-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "countryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "leads" INTEGER NOT NULL DEFAULT 0,
    "ftd" INTEGER NOT NULL DEFAULT 0,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Report_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("countryId", "date", "ftd", "id", "leads", "userId") SELECT "countryId", "date", "ftd", "id", "leads", "userId" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
