/*
  Warnings:

  - Added the required column `create_epoch` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folder` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_edit_epoch` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Files" (
    "fileID" TEXT NOT NULL PRIMARY KEY,
    "userID" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "create_epoch" INTEGER NOT NULL,
    "last_edit_epoch" INTEGER NOT NULL
);
INSERT INTO "new_Files" ("fileID", "filename", "url", "userID") SELECT "fileID", "filename", "url", "userID" FROM "Files";
DROP TABLE "Files";
ALTER TABLE "new_Files" RENAME TO "Files";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
