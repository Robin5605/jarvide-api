/*
  Warnings:

  - The primary key for the `Configs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Configs` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Configs" (
    "guildID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "calc" BOOLEAN NOT NULL DEFAULT true,
    "github" BOOLEAN NOT NULL DEFAULT true,
    "file" BOOLEAN NOT NULL DEFAULT true,
    "codeblock" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Configs" ("calc", "codeblock", "file", "github", "guildID") SELECT "calc", "codeblock", "file", "github", "guildID" FROM "Configs";
DROP TABLE "Configs";
ALTER TABLE "new_Configs" RENAME TO "Configs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
