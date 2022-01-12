/*
  Warnings:

  - You are about to alter the column `create_epoch` on the `Files` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - You are about to alter the column `last_edit_epoch` on the `Files` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Files" (
    "fileID" TEXT NOT NULL PRIMARY KEY,
    "userID" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "folder" TEXT NOT NULL DEFAULT '/',
    "create_epoch" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_edit_epoch" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Files" ("create_epoch", "fileID", "filename", "folder", "last_edit_epoch", "url", "userID") SELECT "create_epoch", "fileID", "filename", "folder", "last_edit_epoch", "url", "userID" FROM "Files";
DROP TABLE "Files";
ALTER TABLE "new_Files" RENAME TO "Files";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
