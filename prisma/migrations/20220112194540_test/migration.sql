/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Item";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Configs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guildID" INTEGER NOT NULL,
    "calc" BOOLEAN NOT NULL DEFAULT true,
    "github" BOOLEAN NOT NULL DEFAULT true,
    "file" BOOLEAN NOT NULL DEFAULT true,
    "codeblock" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Configs" ("guildID", "id") SELECT "guildID", "id" FROM "Configs";
DROP TABLE "Configs";
ALTER TABLE "new_Configs" RENAME TO "Configs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
